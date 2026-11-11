export const iconButtonRegistryItem = {
  id: "icon-button",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/icon-button/icon-button.tsx",
      path: "icon-button.tsx",
    },
    {
      source: "packages/react/src/components/icon-button/icon-button.css",
      path: "icon-button.css",
    },
    {
      source: "packages/react/src/components/icon-button/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/icon-button/styles.d.ts",
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
  docsUrl: "https://ecentry.dev/components/icon-button/",
  license: "MIT",
} as const;
