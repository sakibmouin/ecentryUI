import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import { generateCatalog } from "./scripts/catalog.mjs";

export default defineConfig({
  plugins: [
    {
      name: "ecentry-docs-catalog",
      resolveId(id) {
        return id === "virtual:ecentry-docs-catalog" ? "\0" + id : undefined;
      },
      async load(id) {
        if (id === "\0virtual:ecentry-docs-catalog") {
          return `export default ${JSON.stringify(await generateCatalog())};`;
        }
      },
    },
    { enforce: "pre", ...mdx({ remarkPlugins: [remarkGfm] }) },
    react({ include: /\.(jsx|js|mdx|tsx|ts)$/ }),
  ],
});
