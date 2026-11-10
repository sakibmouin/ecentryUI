export const stackRegistryItem = {
  id: "stack",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/stack/stack.tsx",
      path: "stack.tsx",
    },
    {
      source: "packages/react/src/components/stack/stack.css",
      path: "stack.css",
    },
    {
      source: "packages/react/src/components/stack/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/stack/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/stack/",
  license: "MIT",
} as const;
