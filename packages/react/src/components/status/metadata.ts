export const statusRegistryItem = {
  id: "status",
  version: "0.1.0",
  framework: "react",
  files: ["status.tsx", "status.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/status/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.text"],
  docsUrl: "https://ecentry.dev/components/status/",
  license: "MIT",
} as const;
