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
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { generateRegistryItem } from "@ecentry/registry-schema";

if (process.argv[2] !== "next")
  throw new Error("Expected consumer target: next");
const fixture = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const repo = path.resolve(fixture, "../../..");
const temporaryParent = path.join(repo, ".local/consumer-tests");
await mkdir(temporaryParent, { recursive: true });
const root = await mkdtemp(path.join(temporaryParent, "next-"));

try {
  for (const file of ["package.json", "tsconfig.json", "next.config.mjs"]) {
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
  const cli = path.join(repo, "packages/cli/dist/bin.js");
  execFileSync(process.execPath, [cli, "init", "--yes"], {
    cwd: root,
    stdio: "inherit",
  });
  execFileSync(
    process.execPath,
    [cli, "add", "sample", "--registry", path.join(root, "registry"), "--yes"],
    { cwd: root, stdio: "inherit" },
  );
  for (const component of ["button", "input", "dialog", "absolute-center"]) {
    execFileSync(
      process.execPath,
      [
        cli,
        "add",
        component,
        "--registry",
        path.join(repo, "registry/react"),
        "--yes",
      ],
      { cwd: root, stdio: "inherit" },
    );
  }
  execFileSync("npm", ["run", "build"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
  });
  const html = await readFile(path.join(root, "out/index.html"), "utf8");
  if (
    !html.includes("Next consumer fixture") ||
    !html.includes("Count:") ||
    !html.includes("Installed button") ||
    !html.includes("Installed input")
  ) {
    throw new Error("Next did not render the component into static HTML");
  }

  const server = createServer(async (request, response) => {
    try {
      const pathname = new globalThis.URL(
        request.url ?? "/",
        "http://localhost",
      ).pathname;
      const file = path.join(
        root,
        "out",
        pathname === "/" ? "index.html" : pathname.slice(1),
      );
      const body = await readFile(file);
      response.setHeader(
        "content-type",
        file.endsWith(".js")
          ? "text/javascript"
          : file.endsWith(".css")
            ? "text/css"
            : "text/html",
      );
      response.end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("Next preview did not open a port");
  const browser = await chromium.launch({
    ...(process.env.ECENTRY_CHROMIUM_PATH
      ? { executablePath: process.env.ECENTRY_CHROMIUM_PATH }
      : {}),
  });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${address.port}/`);
    const button = page.getByRole("button", { name: "Count: 0" });
    await button.waitFor({ timeout: 10_000 });
    const color = await button.evaluate(
      (element) => globalThis.getComputedStyle(element).color,
    );
    if (color !== "rgb(20, 45, 36)")
      throw new Error(`Theme override failed: ${color}`);
    await button.click();
    await page
      .getByRole("button", { name: "Count: 1" })
      .waitFor({ timeout: 10_000 });
    const input = page.getByRole("textbox", { name: "Installed input" });
    if ((await input.inputValue()) !== "Ready")
      throw new Error("Next Input did not hydrate its initial value");
    await page.getByRole("button", { name: "Installed dialog" }).click();
    await page
      .getByRole("dialog", { name: "Installed dialog title" })
      .waitFor();
    await page.getByRole("button", { name: "Close dialog" }).click();
    if (
      await page
        .getByRole("dialog", { name: "Installed dialog title" })
        .isVisible()
    )
      throw new Error("Next Dialog did not close after hydration");
    const parent = await page.getByTestId("absolute-parent").boundingBox();
    const center = await page.getByText("Installed center").boundingBox();
    if (
      !parent ||
      !center ||
      Math.abs(center.x + center.width / 2 - (parent.x + parent.width / 2)) > 1
    )
      throw new Error("Next Absolute Center did not center horizontally");
    if (errors.length)
      throw new Error(`Next hydration errors: ${errors.join(" | ")}`);
  } finally {
    await browser.close();
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve(undefined))),
    );
  }
  console.log(
    "Next consumer fixture passed SSR, hydration and production build",
  );
} finally {
  await rm(root, { recursive: true, force: true });
}
