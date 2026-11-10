export const groupRegistryItem = {
  id: "group",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/group/group.tsx",
      path: "group.tsx",
    },
    {
      source: "packages/react/src/components/group/group.css",
      path: "group.css",
    },
    {
      source: "packages/react/src/components/group/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/group/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/group/",
  license: "MIT",
} as const;
