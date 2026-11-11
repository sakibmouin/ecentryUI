export const closeButtonRegistryItem = {
  id: "close-button",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/close-button/close-button.tsx",
      path: "close-button.tsx",
    },
    {
      source: "packages/react/src/components/close-button/close-button.css",
      path: "close-button.css",
    },
    {
      source: "packages/react/src/components/close-button/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/close-button/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.text", "colors.surface", "colors.focus", "radii.md"],
  docsUrl: "https://ecentry.dev/components/close-button/",
  license: "MIT",
} as const;
