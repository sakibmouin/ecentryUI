export const presenceRegistryItem = {
  id: "presence",
  version: "0.1.0",
  framework: "react",
  files: ["presence.tsx", "index.ts", "presence.css", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/presence/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/presence/",
  license: "MIT",
} as const;
