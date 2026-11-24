export const visuallyHiddenRegistryItem = {
  id: "visually-hidden",
  version: "0.1.0",
  framework: "react",
  files: [
    "visually-hidden.tsx",
    "index.ts",
    "visually-hidden.css",
    "styles.d.ts",
  ].map((path) => ({
    source: `packages/react/src/components/visually-hidden/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/visually-hidden/",
  license: "MIT",
} as const;
