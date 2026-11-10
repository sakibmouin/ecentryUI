export const emRegistryItem = {
  id: "em",
  version: "0.1.0",
  framework: "react",
  files: [
    { source: "packages/react/src/components/em/em.tsx", path: "em.tsx" },
    { source: "packages/react/src/components/em/em.css", path: "em.css" },
    { source: "packages/react/src/components/em/index.ts", path: "index.ts" },
    {
      source: "packages/react/src/components/em/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/em/",
  license: "MIT",
} as const;
