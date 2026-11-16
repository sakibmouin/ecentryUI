export const nativeSelectRegistryItem = {
  id: "native-select",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/native-select/native-select.tsx",
      path: "native-select.tsx",
    },
    {
      source: "packages/react/src/components/native-select/native-select.css",
      path: "native-select.css",
    },
    {
      source: "packages/react/src/components/native-select/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/native-select/styles.d.ts",
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
  docsUrl: "https://ecentry.dev/components/native-select/",
  license: "MIT",
} as const;
