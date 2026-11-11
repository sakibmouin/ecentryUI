export const checkboxCardRegistryItem = {
  id: "checkbox-card",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/checkbox-card/checkbox-card.tsx",
      path: "checkbox-card.tsx",
    },
    {
      source: "packages/react/src/components/checkbox-card/checkbox-card.css",
      path: "checkbox-card.css",
    },
    {
      source: "packages/react/src/components/checkbox-card/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/checkbox-card/styles.d.ts",
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
  docsUrl: "https://ecentry.dev/components/checkbox-card/",
  license: "MIT",
} as const;
