export const actionBarRegistryItem = {
  id: "action-bar",
  version: "0.1.0",
  framework: "react",
  files: ["action-bar.tsx", "action-bar.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/action-bar/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.border",
    "colors.background",
    "colors.surface",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/action-bar/",
  license: "MIT",
} as const;
