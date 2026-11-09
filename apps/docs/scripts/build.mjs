import { execFileSync } from "node:child_process";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";
import mdx from "@mdx-js/esbuild";
import remarkGfm from "remark-gfm";

const appRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const repoRoot = path.resolve(appRoot, "../..");
execFileSync(path.join(repoRoot, "node_modules/.bin/vite"), ["build"], {
  cwd: appRoot,
  stdio: "inherit",
});

const ssrFile = path.join(repoRoot, ".local/docs-ssr.mjs");
await mkdir(path.dirname(ssrFile), { recursive: true });
await build({
  entryPoints: [path.join(appRoot, "src/ssr.tsx")],
  outfile: ssrFile,
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  jsx: "automatic",
  loader: { ".css": "empty" },
  plugins: [
    {
      name: "raw-examples",
      setup(plugin) {
        plugin.onResolve({ filter: /\?raw$/ }, (args) => ({
          path: path.resolve(args.resolveDir, args.path.slice(0, -4)),
          namespace: "raw-example",
        }));
        plugin.onLoad(
          { filter: /.*/, namespace: "raw-example" },
          async (args) => ({
            contents: JSON.stringify(await readFile(args.path, "utf8")),
            loader: "js",
          }),
        );
      },
    },
    mdx({ remarkPlugins: [remarkGfm] }),
  ],
});

const { render, routes } = await import(pathToFileURL(ssrFile).href);
const template = await readFile(path.join(appRoot, "dist/index.html"), "utf8");
for (const route of routes) {
  const pageName =
    route === "/" ? "Overview" : route.split("/").filter(Boolean).at(-1);
  const title = `${pageName?.replace(/^./, (letter) => letter.toUpperCase())} | ecentryUI documentation`;
  const html = template
    .replace(
      "<title>ecentryUI documentation</title>",
      `<title>${title}</title>`,
    )
    .replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
  const destination = path.join(appRoot, "dist", route, "index.html");
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html);
}
