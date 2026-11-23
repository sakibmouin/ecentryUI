export const formatNumberRegistryItem = {
  id: "format-number",
  version: "0.1.0",
  framework: "react",
  files: ["format-number.tsx", "index.ts"].map((path) => ({
    source: `packages/react/src/components/format-number/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/format-number/",
  license: "MIT",
} as const;
