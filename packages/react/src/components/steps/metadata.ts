export const stepsRegistryItem = {
  id: "steps",
  version: "0.1.0",
  framework: "react",
  files: ["steps.tsx", "steps.css", "index.ts", "styles.d.ts"].map((path) => ({
    source: `packages/react/src/components/steps/${path}`,
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
  docsUrl: "https://ecentry.dev/components/steps/",
  license: "MIT",
} as const;
