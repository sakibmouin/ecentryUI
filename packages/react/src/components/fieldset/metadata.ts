export const fieldsetRegistryItem = {
  id: "fieldset",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/fieldset/fieldset.tsx",
      path: "fieldset.tsx",
    },
    {
      source: "packages/react/src/components/fieldset/fieldset.css",
      path: "fieldset.css",
    },
    {
      source: "packages/react/src/components/fieldset/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/fieldset/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text-muted",
    "colors.border",
    "colors.danger",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/fieldset/",
  license: "MIT",
} as const;
