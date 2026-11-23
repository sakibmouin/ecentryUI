export const clientOnlyRegistryItem = {
  id: "client-only",
  version: "0.1.0",
  framework: "react",
  files: ["client-only.tsx", "index.ts"].map((path) => ({
    source: `packages/react/src/components/client-only/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/client-only/",
  license: "MIT",
} as const;
