export const localeProviderRegistryItem = {
  id: "locale-provider",
  version: "0.1.0",
  framework: "react",
  files: ["locale-provider.tsx", "index.ts"].map((path) => ({
    source: `packages/react/src/components/locale-provider/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/locale-provider/",
  license: "MIT",
} as const;
