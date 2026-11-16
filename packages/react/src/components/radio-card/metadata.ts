export const radioCardRegistryItem = {
  id: "radio-card",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/radio-card/radio-card.tsx",
      path: "radio-card.tsx",
    },
    {
      source: "packages/react/src/components/radio-card/radio-card.css",
      path: "radio-card.css",
    },
    {
      source: "packages/react/src/components/radio-card/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/radio-card/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text-muted",
    "colors.border",
    "colors.background",
    "colors.accent",
    "colors.danger",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/radio-card/",
  license: "MIT",
} as const;
