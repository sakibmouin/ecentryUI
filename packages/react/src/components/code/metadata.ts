export const codeRegistryItem = {
  id: "code",
  version: "0.1.0",
  framework: "react",
  files: [
    { source: "packages/react/src/components/code/code.tsx", path: "code.tsx" },
    { source: "packages/react/src/components/code/code.css", path: "code.css" },
    { source: "packages/react/src/components/code/index.ts", path: "index.ts" },
    {
      source: "packages/react/src/components/code/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/code/",
  license: "MIT",
} as const;
