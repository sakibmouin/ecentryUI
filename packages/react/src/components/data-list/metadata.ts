export const dataListRegistryItem = {
  id: "data-list",
  version: "0.1.0",
  framework: "react",
  files: ["data-list.tsx", "data-list.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/data-list/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.text", "colors.text-muted", "colors.border"],
  docsUrl: "https://ecentry.dev/components/data-list/",
  license: "MIT",
} as const;
