export const tooltipRegistryItem = {
  id: "tooltip",
  version: "0.1.0",
  framework: "react",
  files: ["tooltip.tsx", "tooltip.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/tooltip/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.border",
    "colors.background",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/tooltip/",
  license: "MIT",
} as const;
