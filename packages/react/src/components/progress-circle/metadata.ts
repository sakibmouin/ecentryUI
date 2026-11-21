export const progressCircleRegistryItem = {
  id: "progress-circle",
  version: "0.1.0",
  framework: "react",
  files: [
    "progress-circle.tsx",
    "progress-circle.css",
    "index.ts",
    "styles.d.ts",
  ].map((path) => ({
    source: `packages/react/src/components/progress-circle/${path}`,
    path,
  })),
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
  docsUrl: "https://ecentry.dev/components/progress-circle/",
  license: "MIT",
} as const;
