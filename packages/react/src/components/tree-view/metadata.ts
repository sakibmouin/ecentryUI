export const treeViewRegistryItem = {
  id: "tree-view",
  version: "0.1.0",
  framework: "react",
  files: ["tree-view.tsx", "tree-view.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/tree-view/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text.muted",
    "colors.border",
    "colors.background",
    "colors.surface",
    "colors.accent",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/tree-view/",
  license: "MIT",
} as const;
