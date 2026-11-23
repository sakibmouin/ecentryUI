export const radiomarkRegistryItem = {
  id: "radiomark",
  version: "0.1.0",
  framework: "react",
  files: ["radiomark.tsx", "index.ts", "radiomark.css", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/radiomark/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/radiomark/",
  license: "MIT",
} as const;
