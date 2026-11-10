export const gridRegistryItem = {
  id: "grid",
  version: "0.1.0",
  framework: "react",
  files: [
    { source: "packages/react/src/components/grid/grid.tsx", path: "grid.tsx" },
    { source: "packages/react/src/components/grid/grid.css", path: "grid.css" },
    { source: "packages/react/src/components/grid/index.ts", path: "index.ts" },
    {
      source: "packages/react/src/components/grid/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/grid/",
  license: "MIT",
} as const;
