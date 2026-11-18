export const emptyStateRegistryItem = {
  id: "empty-state",
  version: "0.1.0",
  framework: "react",
  files: ["empty-state.tsx", "empty-state.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/empty-state/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text-muted",
    "colors.border",
    "colors.surface",
    "colors.background",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/empty-state/",
  license: "MIT",
} as const;
