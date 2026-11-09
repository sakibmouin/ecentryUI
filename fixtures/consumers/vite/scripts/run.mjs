import { execFileSync } from "node:child_process";
import {
  cp,
  mkdtemp,
  mkdir,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { generateRegistryItem } from "@ecentry/registry-schema";
import { chromium } from "@playwright/test";

const fixture = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
if (process.argv[2] !== "vite")
  throw new Error("Expected consumer target: vite");
const repo = path.resolve(fixture, "../../..");
const temporaryParent = path.join(repo, ".local/consumer-tests");
await mkdir(temporaryParent, { recursive: true });
const root = await mkdtemp(path.join(temporaryParent, "vite-"));
try {
  for (const file of ["package.json", "tsconfig.json", "index.html"]) {
    await cp(path.join(fixture, file), path.join(root, file));
  }
  await cp(path.join(fixture, "src"), path.join(root, "src"), {
    recursive: true,
  });
  const content = await readFile(
    path.join(fixture, "registry-source/sample.tsx"),
    "utf8",
  );
  const payload = generateRegistryItem(
    {
      id: "sample",
      version: "0.1.0",
      framework: "react",
      files: [
        {
          source: "packages/react/src/components/sample/index.tsx",
          path: "index.tsx",
        },
      ],
      dependencies: [],
      peerDependencies: { react: ">=18" },
      tokens: ["colors.text"],
      docsUrl: "https://ecentry.dev/docs/components/sample",
      license: "MIT",
    },
    () => content,
  );
  const registry = path.join(root, "registry/sample");
  await mkdir(registry, { recursive: true });
  await writeFile(
    path.join(registry, "manifest.json"),
    JSON.stringify(payload.manifest),
  );
  await writeFile(path.join(registry, "index.tsx"), content);

  const cli = path.join(repo, "packages/cli/dist/bin.js");
  const packed = JSON.parse(
    execFileSync(
      "npm",
      [
        "pack",
        path.join(repo, "packages/foundations"),
        "--pack-destination",
        root,
        "--ignore-scripts",
        "--json",
      ],
      { cwd: root, encoding: "utf8" },
    ),
  );
  await rename(
    path.join(root, packed[0].filename),
    path.join(root, "foundations.tgz"),
  );
  execFileSync("npm", ["install", "--package-lock-only", "--ignore-scripts"], {
    cwd: root,
    stdio: "inherit",
  });
  execFileSync("npm", ["ci", "--ignore-scripts"], {
    cwd: root,
    stdio: "inherit",
  });
  execFileSync(process.execPath, [cli, "init", "--yes"], {
    cwd: root,
    stdio: "inherit",
  });
  execFileSync(
    process.execPath,
    [cli, "add", "sample", "--registry", path.join(root, "registry"), "--yes"],
    { cwd: root, stdio: "inherit" },
  );
  execFileSync(
    process.execPath,
    [
      cli,
      "add",
      "button",
      "--registry",
      path.join(repo, "registry/react"),
      "--yes",
    ],
    { cwd: root, stdio: "inherit" },
  );
  execFileSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });
  const html = await readFile(path.join(root, "dist/index.html"), "utf8");
  if (!html.includes("assets/index-"))
    throw new Error("Vite output is missing its client bundle");
  const viteModule = pathToFileURL(
    path.join(root, "node_modules/vite/dist/node/index.js"),
  );
  const { preview } = await import(viteModule.href);
  const server = await preview({
    root,
    preview: { host: "127.0.0.1", port: 0 },
  });
  const address = server.httpServer.address();
  if (!address || typeof address === "string")
    throw new Error("Vite preview did not open a port");
  const browser = await chromium.launch({
    ...(process.env.ECENTRY_CHROMIUM_PATH
      ? { executablePath: process.env.ECENTRY_CHROMIUM_PATH }
      : {}),
  });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const response = await page.goto(`http://127.0.0.1:${address.port}/`);
    const sample = page.getByText("Vite consumer ready");
    await sample.waitFor({ timeout: 5_000 }).catch(() => {
      throw new Error(
        `Consumer did not render (HTTP ${response?.status()}): ${errors.join(" | ")}`,
      );
    });
    const color = await sample.evaluate(
      (element) => globalThis.getComputedStyle(element).color,
    );
    if (color !== "rgb(20, 45, 36)")
      throw new Error(`Theme override failed: ${color}`);
    const button = page.getByRole("button", { name: "Installed button" });
    await button.waitFor();
    const background = await button.evaluate(
      (element) => globalThis.getComputedStyle(element).backgroundColor,
    );
    if (background !== "rgb(17, 110, 94)")
      throw new Error(`Installed Button style failed: ${background}`);
  } finally {
    await browser.close();
    await new Promise((resolve, reject) =>
      server.httpServer.close((error) =>
        error ? reject(error) : resolve(undefined),
      ),
    );
  }
  console.log(
    "Vite consumer fixture passed clean install and production build",
  );
} finally {
  await rm(root, { recursive: true, force: true });
}
