export const flexRegistryItem = {
  id: "flex",
  version: "0.1.0",
  framework: "react",
  files: [
    { source: "packages/react/src/components/flex/flex.tsx", path: "flex.tsx" },
    { source: "packages/react/src/components/flex/flex.css", path: "flex.css" },
    { source: "packages/react/src/components/flex/index.ts", path: "index.ts" },
    {
      source: "packages/react/src/components/flex/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/flex/",
  license: "MIT",
} as const;
