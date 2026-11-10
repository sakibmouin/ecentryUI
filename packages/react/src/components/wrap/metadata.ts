export const wrapRegistryItem = {
  id: "wrap",
  version: "0.1.0",
  framework: "react",
  files: [
    { source: "packages/react/src/components/wrap/wrap.tsx", path: "wrap.tsx" },
    { source: "packages/react/src/components/wrap/wrap.css", path: "wrap.css" },
    { source: "packages/react/src/components/wrap/index.ts", path: "index.ts" },
    {
      source: "packages/react/src/components/wrap/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/wrap/",
  license: "MIT",
} as const;
