export const splitterRegistryItem = {
  id: "splitter",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/splitter/splitter.tsx",
      path: "splitter.tsx",
    },
    {
      source: "packages/react/src/components/splitter/splitter.css",
      path: "splitter.css",
    },
    {
      source: "packages/react/src/components/splitter/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/splitter/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.border",
    "colors.background",
    "colors.accent",
    "colors.focus",
  ],
  docsUrl: "https://ecentry.dev/components/splitter/",
  license: "MIT",
} as const;
