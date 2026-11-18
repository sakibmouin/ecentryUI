export const badgeRegistryItem = {
  id: "badge",
  version: "0.1.0",
  framework: "react",
  files: ["badge.tsx", "badge.css", "index.ts", "styles.d.ts"].map((path) => ({
    source: `packages/react/src/components/badge/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.text"],
  docsUrl: "https://ecentry.dev/components/badge/",
  license: "MIT",
} as const;
