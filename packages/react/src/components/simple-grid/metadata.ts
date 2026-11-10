export const simpleGridRegistryItem = {
  id: "simple-grid",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/simple-grid/simple-grid.tsx",
      path: "simple-grid.tsx",
    },
    {
      source: "packages/react/src/components/simple-grid/simple-grid.css",
      path: "simple-grid.css",
    },
    {
      source: "packages/react/src/components/simple-grid/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/simple-grid/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/simple-grid/",
  license: "MIT",
} as const;
