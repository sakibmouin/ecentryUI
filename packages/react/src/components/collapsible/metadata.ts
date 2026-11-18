export const collapsibleRegistryItem = {
  id: "collapsible",
  version: "0.1.0",
  framework: "react",
  files: ["collapsible.tsx", "collapsible.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/collapsible/${path}`,
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
  docsUrl: "https://ecentry.dev/components/collapsible/",
  license: "MIT",
} as const;
