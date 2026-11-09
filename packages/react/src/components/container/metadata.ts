export const containerRegistryItem = {
  id: "container",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/container/container.tsx",
      path: "container.tsx",
    },
    {
      source: "packages/react/src/components/container/container.css",
      path: "container.css",
    },
    {
      source: "packages/react/src/components/container/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/container/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/container/",
  license: "MIT",
} as const;
