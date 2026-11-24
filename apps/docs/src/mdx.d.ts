declare module "*.mdx" {
  import type { ComponentType } from "react";
  const Content: ComponentType;
  export default Content;
}

declare module "virtual:ecentry-docs-catalog" {
  const catalog: import("./catalog-types.js").CatalogEntry[];
  export default catalog;
}
