export const showRegistryItem = {
  id: "show",
  version: "0.1.0",
  framework: "react",
  files: ["show.tsx", "index.ts"].map((path) => ({
    source: `packages/react/src/components/show/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/show/",
  license: "MIT",
} as const;
