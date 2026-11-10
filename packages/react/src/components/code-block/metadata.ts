export const codeBlockRegistryItem = {
  id: "code-block",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/code-block/code-block.tsx",
      path: "code-block.tsx",
    },
    {
      source: "packages/react/src/components/code-block/code-block.css",
      path: "code-block.css",
    },
    {
      source: "packages/react/src/components/code-block/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/code-block/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/code-block/",
  license: "MIT",
} as const;
