export const menuRegistryItem = {
  id: "menu",
  version: "0.1.0",
  framework: "react",
  files: ["menu.tsx", "menu.css", "index.ts", "styles.d.ts"].map((path) => ({
    source: `packages/react/src/components/menu/${path}`,
    path,
  })),
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
  docsUrl: "https://ecentry.dev/components/menu/",
  license: "MIT",
} as const;
