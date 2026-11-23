export const checkmarkRegistryItem = {
  id: "checkmark",
  version: "0.1.0",
  framework: "react",
  files: ["checkmark.tsx", "index.ts", "checkmark.css", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/checkmark/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/checkmark/",
  license: "MIT",
} as const;
