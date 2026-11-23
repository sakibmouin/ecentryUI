export const environmentProviderRegistryItem = {
  id: "environment-provider",
  version: "0.1.0",
  framework: "react",
  files: ["environment-provider.tsx", "index.ts"].map((path) => ({
    source: `packages/react/src/components/environment-provider/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/environment-provider/",
  license: "MIT",
} as const;
