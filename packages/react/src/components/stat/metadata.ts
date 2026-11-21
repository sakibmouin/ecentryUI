export const statRegistryItem = {
  id: "stat",
  version: "0.1.0",
  framework: "react",
  files: ["stat.tsx", "stat.css", "index.ts", "styles.d.ts"].map((path) => ({
    source: `packages/react/src/components/stat/${path}`,
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
  docsUrl: "https://ecentry.dev/components/stat/",
  license: "MIT",
} as const;
