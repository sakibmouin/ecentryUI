export const breadcrumbRegistryItem = {
  id: "breadcrumb",
  version: "0.1.0",
  framework: "react",
  files: ["breadcrumb.tsx", "breadcrumb.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/breadcrumb/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.text", "colors.focus"],
  docsUrl: "https://ecentry.dev/components/breadcrumb/",
  license: "MIT",
} as const;
