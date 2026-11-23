export const forRegistryItem = {
  id: "for",
  version: "0.1.0",
  framework: "react",
  files: ["for.tsx", "index.ts"].map((path) => ({
    source: `packages/react/src/components/for/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/for/",
  license: "MIT",
} as const;
