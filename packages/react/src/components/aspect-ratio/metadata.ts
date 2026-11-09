export const aspectRatioRegistryItem = {
  id: "aspect-ratio",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/aspect-ratio/aspect-ratio.tsx",
      path: "aspect-ratio.tsx",
    },
    {
      source: "packages/react/src/components/aspect-ratio/aspect-ratio.css",
      path: "aspect-ratio.css",
    },
    {
      source: "packages/react/src/components/aspect-ratio/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/aspect-ratio/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/aspect-ratio/",
  license: "MIT",
} as const;
