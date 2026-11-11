export const markRegistryItem = {
  id: "mark",
  version: "0.1.0",
  framework: "react",
  files: [
    { source: "packages/react/src/components/mark/mark.tsx", path: "mark.tsx" },
    { source: "packages/react/src/components/mark/mark.css", path: "mark.css" },
    { source: "packages/react/src/components/mark/index.ts", path: "index.ts" },
    {
      source: "packages/react/src/components/mark/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/mark/",
  license: "MIT",
} as const;
