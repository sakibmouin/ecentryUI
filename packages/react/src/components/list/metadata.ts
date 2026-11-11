export const listRegistryItem = {
  id: "list",
  version: "0.1.0",
  framework: "react",
  files: [
    { source: "packages/react/src/components/list/list.tsx", path: "list.tsx" },
    { source: "packages/react/src/components/list/list.css", path: "list.css" },
    { source: "packages/react/src/components/list/index.ts", path: "index.ts" },
    {
      source: "packages/react/src/components/list/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/list/",
  license: "MIT",
} as const;
