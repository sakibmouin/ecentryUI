export const selectRegistryItem = {
  id: "select",
  version: "0.1.0",
  framework: "react",
  files: ["select.tsx", "select.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/select/${path}`,
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
    "colors.danger",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/select/",
  license: "MIT",
} as const;
