export const listboxRegistryItem = {
  id: "listbox",
  version: "0.1.0",
  framework: "react",
  files: ["listbox.tsx", "listbox.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/listbox/${path}`,
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
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/listbox/",
  license: "MIT",
} as const;
