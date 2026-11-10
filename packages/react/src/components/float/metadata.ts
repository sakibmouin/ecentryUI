export const floatRegistryItem = {
  id: "float",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/float/float.tsx",
      path: "float.tsx",
    },
    {
      source: "packages/react/src/components/float/float.css",
      path: "float.css",
    },
    {
      source: "packages/react/src/components/float/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/float/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/float/",
  license: "MIT",
} as const;
