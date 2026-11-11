export const colorPickerRegistryItem = {
  id: "color-picker",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/color-picker/color-picker.tsx",
      path: "color-picker.tsx",
    },
    {
      source: "packages/react/src/components/color-picker/color-picker.css",
      path: "color-picker.css",
    },
    {
      source: "packages/react/src/components/color-picker/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/color-picker/styles.d.ts",
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
  docsUrl: "https://ecentry.dev/components/color-picker/",
  license: "MIT",
} as const;
