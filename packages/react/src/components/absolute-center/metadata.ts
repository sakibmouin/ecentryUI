export const absoluteCenterRegistryItem = {
  id: "absolute-center",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source:
        "packages/react/src/components/absolute-center/absolute-center.tsx",
      path: "absolute-center.tsx",
    },
    {
      source:
        "packages/react/src/components/absolute-center/absolute-center.css",
      path: "absolute-center.css",
    },
    {
      source: "packages/react/src/components/absolute-center/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/absolute-center/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/absolute-center/",
  license: "MIT",
} as const;
