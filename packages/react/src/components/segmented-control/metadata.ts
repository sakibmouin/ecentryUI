export const segmentedControlRegistryItem = {
  id: "segmented-control",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source:
        "packages/react/src/components/segmented-control/segmented-control.tsx",
      path: "segmented-control.tsx",
    },
    {
      source:
        "packages/react/src/components/segmented-control/segmented-control.css",
      path: "segmented-control.css",
    },
    {
      source: "packages/react/src/components/segmented-control/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/segmented-control/styles.d.ts",
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
  docsUrl: "https://ecentry.dev/components/segmented-control/",
  license: "MIT",
} as const;
