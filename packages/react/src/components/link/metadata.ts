export const linkRegistryItem = {
  id: "link",
  version: "0.1.0",
  framework: "react",
  files: [
    { source: "packages/react/src/components/link/link.tsx", path: "link.tsx" },
    { source: "packages/react/src/components/link/link.css", path: "link.css" },
    { source: "packages/react/src/components/link/index.ts", path: "index.ts" },
    {
      source: "packages/react/src/components/link/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/link/",
  license: "MIT",
} as const;
