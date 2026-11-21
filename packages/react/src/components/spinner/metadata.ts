export const spinnerRegistryItem = {
  id: "spinner",
  version: "0.1.0",
  framework: "react",
  files: ["spinner.tsx", "spinner.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/spinner/${path}`,
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
  docsUrl: "https://ecentry.dev/components/spinner/",
  license: "MIT",
} as const;
