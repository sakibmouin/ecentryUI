export const numberInputRegistryItem = {
  id: "number-input",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/number-input/number-input.tsx",
      path: "number-input.tsx",
    },
    {
      source: "packages/react/src/components/number-input/number-input.css",
      path: "number-input.css",
    },
    {
      source: "packages/react/src/components/number-input/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/number-input/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
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
  docsUrl: "https://ecentry.dev/components/number-input/",
  license: "MIT",
} as const;
