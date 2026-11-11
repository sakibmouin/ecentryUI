export const datePickerRegistryItem = {
  id: "date-picker",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/date-picker/date-picker.tsx",
      path: "date-picker.tsx",
    },
    {
      source: "packages/react/src/components/date-picker/date-picker.css",
      path: "date-picker.css",
    },
    {
      source: "packages/react/src/components/date-picker/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/date-picker/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: ["calendar"],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.border",
    "colors.background",
    "colors.text-muted",
    "colors.danger",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/date-picker/",
  license: "MIT",
} as const;
