export const iconRegistryItem = {
  id: "icon",
  version: "0.1.0",
  framework: "react",
  files: ["icon.tsx", "icon.css", "index.ts", "styles.d.ts"].map((path) => ({
    source: `packages/react/src/components/icon/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.accent", "colors.text-muted"],
  docsUrl: "https://ecentry.dev/components/icon/",
  license: "MIT",
} as const;
