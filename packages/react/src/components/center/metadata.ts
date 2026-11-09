export const centerRegistryItem = {
  id: "center",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/center/center.tsx",
      path: "center.tsx",
    },
    {
      source: "packages/react/src/components/center/center.css",
      path: "center.css",
    },
    {
      source: "packages/react/src/components/center/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/center/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/center/",
  license: "MIT",
} as const;
