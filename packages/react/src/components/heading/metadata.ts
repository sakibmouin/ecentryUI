export const headingRegistryItem = {
  id: "heading",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/heading/heading.tsx",
      path: "heading.tsx",
    },
    {
      source: "packages/react/src/components/heading/heading.css",
      path: "heading.css",
    },
    {
      source: "packages/react/src/components/heading/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/heading/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/heading/",
  license: "MIT",
} as const;
