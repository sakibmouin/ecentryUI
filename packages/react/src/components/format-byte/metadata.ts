export const formatByteRegistryItem = {
  id: "format-byte",
  version: "0.1.0",
  framework: "react",
  files: ["format-byte.tsx", "index.ts"].map((path) => ({
    source: `packages/react/src/components/format-byte/${path}`,
    path,
  })),
  dependencies: ["locale-provider"],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/format-byte/",
  license: "MIT",
} as const;
