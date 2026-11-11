export const proseRegistryItem = {
  id: "prose",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/prose/prose.tsx",
      path: "prose.tsx",
    },
    {
      source: "packages/react/src/components/prose/prose.css",
      path: "prose.css",
    },
    {
      source: "packages/react/src/components/prose/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/prose/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/prose/",
  license: "MIT",
} as const;
