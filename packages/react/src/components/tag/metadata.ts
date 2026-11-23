export const tagRegistryItem = {
  id: "tag",
  version: "0.1.0",
  framework: "react",
  files: ["tag.tsx", "index.ts", "tag.css", "styles.d.ts"].map((path) => ({
    source: `packages/react/src/components/tag/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text-muted",
    "colors.surface",
    "colors.border",
    "colors.accent",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/tag/",
  license: "MIT",
} as const;
