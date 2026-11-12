export const colorSwatchRegistryItem = {
  id: "color-swatch",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/color-swatch/color-swatch.tsx",
      path: "color-swatch.tsx",
    },
    {
      source: "packages/react/src/components/color-swatch/color-swatch.css",
      path: "color-swatch.css",
    },
    {
      source: "packages/react/src/components/color-swatch/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/color-swatch/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.border",
    "colors.background",
    "colors.accent",
    "colors.text-muted",
    "colors.danger",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/color-swatch/",
  license: "MIT",
} as const;
