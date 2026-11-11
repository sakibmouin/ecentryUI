export const dateInputRegistryItem = {
  id: "date-input",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/date-input/date-input.tsx",
      path: "date-input.tsx",
    },
    {
      source: "packages/react/src/components/date-input/date-input.css",
      path: "date-input.css",
    },
    {
      source: "packages/react/src/components/date-input/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/date-input/styles.d.ts",
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
    "colors.danger",
    "colors.text-muted",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/date-input/",
  license: "MIT",
} as const;
