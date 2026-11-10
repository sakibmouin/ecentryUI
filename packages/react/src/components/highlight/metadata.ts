export const highlightRegistryItem = {
  id: "highlight",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/highlight/highlight.tsx",
      path: "highlight.tsx",
    },
    {
      source: "packages/react/src/components/highlight/highlight.css",
      path: "highlight.css",
    },
    {
      source: "packages/react/src/components/highlight/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/highlight/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/highlight/",
  license: "MIT",
} as const;
