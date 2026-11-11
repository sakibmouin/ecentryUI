export const checkboxRegistryItem = {
  id: "checkbox",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/checkbox/checkbox.tsx",
      path: "checkbox.tsx",
    },
    {
      source: "packages/react/src/components/checkbox/checkbox.css",
      path: "checkbox.css",
    },
    {
      source: "packages/react/src/components/checkbox/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/checkbox/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.accent",
    "colors.text-muted",
    "colors.danger",
    "colors.focus",
  ],
  docsUrl: "https://ecentry.dev/components/checkbox/",
  license: "MIT",
} as const;
