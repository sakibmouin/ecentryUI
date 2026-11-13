export const editableRegistryItem = {
  id: "editable",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/editable/editable.tsx",
      path: "editable.tsx",
    },
    {
      source: "packages/react/src/components/editable/editable.css",
      path: "editable.css",
    },
    {
      source: "packages/react/src/components/editable/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/editable/styles.d.ts",
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
  docsUrl: "https://ecentry.dev/components/editable/",
  license: "MIT",
} as const;
