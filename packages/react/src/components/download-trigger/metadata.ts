export const downloadTriggerRegistryItem = {
  id: "download-trigger",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source:
        "packages/react/src/components/download-trigger/download-trigger.tsx",
      path: "download-trigger.tsx",
    },
    {
      source:
        "packages/react/src/components/download-trigger/download-trigger.css",
      path: "download-trigger.css",
    },
    {
      source: "packages/react/src/components/download-trigger/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/download-trigger/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.accent",
    "colors.accent.hover",
    "colors.background",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/download-trigger/",
  license: "MIT",
} as const;
