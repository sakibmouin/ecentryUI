export const blockquoteRegistryItem = {
  id: "blockquote",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/blockquote/blockquote.tsx",
      path: "blockquote.tsx",
    },
    {
      source: "packages/react/src/components/blockquote/blockquote.css",
      path: "blockquote.css",
    },
    {
      source: "packages/react/src/components/blockquote/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/blockquote/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/blockquote/",
  license: "MIT",
} as const;
