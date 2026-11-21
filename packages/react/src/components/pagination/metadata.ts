export const paginationRegistryItem = {
  id: "pagination",
  version: "0.1.0",
  framework: "react",
  files: ["pagination.tsx", "pagination.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/pagination/${path}`,
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
    "colors.accent",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/pagination/",
  license: "MIT",
} as const;
