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
  for (const component of [
    "button",
    "input",
    "dialog",
    "absolute-center",
    "aspect-ratio",
    "bleed",
    "box",
    "center",
    "container",
    "flex",
    "float",
    "floating-panel",
  ]) {
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
    !html.includes("Installed input") ||
    !html.includes("Installed box") ||
    !html.includes("Centered") ||
    !html.includes("Installed container") ||
    !html.includes("Flex start") ||
    !html.includes("Installed float") ||
    !html.includes("Installed floating panel")
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
    const frame = await page.getByTestId("aspect-frame").boundingBox();
    if (!frame || Math.abs(frame.width / frame.height - 4 / 3) > 0.02)
      throw new Error("Next Aspect Ratio did not keep its ratio");
    const bleedParent = await page.getByTestId("bleed-parent").boundingBox();
    const bleed = await page.getByTestId("bleed-content").boundingBox();
    if (!bleedParent || !bleed || Math.abs(bleed.x - bleedParent.x) > 1)
      throw new Error("Next Bleed did not escape inline padding");
    const box = page.getByTestId("installed-box");
    if (
      (await box.evaluate(
        (element) => globalThis.getComputedStyle(element).padding,
      )) !== "24px"
    )
      throw new Error("Next Box did not apply responsive padding");
    const centerBox = await page.getByTestId("installed-center").boundingBox();
    const centerText = await page.getByText("Centered").boundingBox();
    if (
      !centerBox ||
      !centerText ||
      Math.abs(
        centerText.x +
          centerText.width / 2 -
          (centerBox.x + centerBox.width / 2),
      ) > 1
    )
      throw new Error("Next Center did not center its content");
    const square = await page.getByTestId("installed-square").boundingBox();
    const circle = await page.getByTestId("installed-circle").boundingBox();
    if (
      !square ||
      !circle ||
      Math.abs(square.width - 48) > 1 ||
      Math.abs(circle.height - 48) > 1
    )
      throw new Error("Next Square or Circle did not apply size");
    const container = await page
      .getByTestId("installed-container")
      .boundingBox();
    if (!container || Math.abs(container.width - 400) > 1)
      throw new Error("Next Container did not apply its width cap");
    const flex = page.getByTestId("installed-flex");
    if (
      (await flex.evaluate(
        (element) => globalThis.getComputedStyle(element).flexDirection,
      )) !== "row"
    )
      throw new Error("Next Flex did not apply responsive direction");
    if (
      (await page
        .getByTestId("installed-spacer")
        .evaluate(
          (element) => globalThis.getComputedStyle(element).flexGrow,
        )) !== "1"
    )
      throw new Error("Next Spacer did not grow");
    const floatParent = await page.getByTestId("float-parent").boundingBox();
    const float = await page.getByTestId("installed-float").boundingBox();
    if (
      !floatParent ||
      !float ||
      Math.abs(float.x + float.width / 2 - floatParent.x) > 1 ||
      Math.abs(
        float.y + float.height / 2 - (floatParent.y + floatParent.height),
      ) > 1
    )
      throw new Error("Next Float did not anchor at bottom start");
    await page
      .getByRole("button", { name: "Installed floating panel" })
      .click();
    const panel = page.getByRole("dialog", { name: "Installed panel title" });
    await panel.waitFor();
    await panel.getByRole("button", { name: "Close installed panel" }).click();
    if (await panel.isVisible())
      throw new Error("Next Floating Panel did not close after hydration");
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
