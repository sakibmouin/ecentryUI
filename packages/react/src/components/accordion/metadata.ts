export const accordionRegistryItem = {
  id: "accordion",
  version: "0.1.0",
  framework: "react",
  files: ["accordion.tsx", "accordion.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/accordion/${path}`,
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
  docsUrl: "https://ecentry.dev/components/accordion/",
  license: "MIT",
} as const;
