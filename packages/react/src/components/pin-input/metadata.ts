export const pinInputRegistryItem = {
  id: "pin-input",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/pin-input/pin-input.tsx",
      path: "pin-input.tsx",
    },
    {
      source: "packages/react/src/components/pin-input/pin-input.css",
      path: "pin-input.css",
    },
    {
      source: "packages/react/src/components/pin-input/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/pin-input/styles.d.ts",
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
  docsUrl: "https://ecentry.dev/components/pin-input/",
  license: "MIT",
} as const;
