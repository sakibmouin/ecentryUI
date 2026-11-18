export const alertRegistryItem = {
  id: "alert",
  version: "0.1.0",
  framework: "react",
  files: ["alert.tsx", "alert.css", "index.ts", "styles.d.ts"].map((path) => ({
    source: `packages/react/src/components/alert/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.text", "colors.surface", "colors.focus", "radii.md"],
  docsUrl: "https://ecentry.dev/components/alert/",
  license: "MIT",
} as const;
