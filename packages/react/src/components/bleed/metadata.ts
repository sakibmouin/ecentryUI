export const bleedRegistryItem = {
  id: "bleed",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/bleed/bleed.tsx",
      path: "bleed.tsx",
    },
    {
      source: "packages/react/src/components/bleed/bleed.css",
      path: "bleed.css",
    },
    {
      source: "packages/react/src/components/bleed/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/bleed/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/bleed/",
  license: "MIT",
} as const;
