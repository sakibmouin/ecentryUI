export const portalRegistryItem = {
  id: "portal",
  version: "0.1.0",
  framework: "react",
  files: ["portal.tsx", "index.ts"].map((path) => ({
    source: `packages/react/src/components/portal/${path}`,
    path,
  })),
  dependencies: ["environment-provider"],
  peerDependencies: { react: ">=18", "react-dom": ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/portal/",
  license: "MIT",
} as const;
