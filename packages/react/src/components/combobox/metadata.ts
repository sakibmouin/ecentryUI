export const comboboxRegistryItem = {
  id: "combobox",
  version: "0.1.0",
  framework: "react",
  files: ["combobox.tsx", "combobox.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/combobox/${path}`,
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
    "colors.accent",
    "colors.danger",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/combobox/",
  license: "MIT",
} as const;
