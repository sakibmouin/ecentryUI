export const fieldRegistryItem = {
  id: "field",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/field/field.tsx",
      path: "field.tsx",
    },
    {
      source: "packages/react/src/components/field/field.css",
      path: "field.css",
    },
    {
      source: "packages/react/src/components/field/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/field/styles.d.ts",
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
    "colors.danger",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/field/",
  license: "MIT",
} as const;
