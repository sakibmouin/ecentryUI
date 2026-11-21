export const progressRegistryItem = {
  id: "progress",
  version: "0.1.0",
  framework: "react",
  files: ["progress.tsx", "progress.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/progress/${path}`,
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
  docsUrl: "https://ecentry.dev/components/progress/",
  license: "MIT",
} as const;
