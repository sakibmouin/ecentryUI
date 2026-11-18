export const drawerRegistryItem = {
  id: "drawer",
  version: "0.1.0",
  framework: "react",
  files: ["drawer.tsx", "drawer.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/drawer/${path}`,
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
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/drawer/",
  license: "MIT",
} as const;
