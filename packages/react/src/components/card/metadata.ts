export const cardRegistryItem = {
  id: "card",
  version: "0.1.0",
  framework: "react",
  files: ["card.tsx", "card.css", "index.ts", "styles.d.ts"].map((path) => ({
    source: `packages/react/src/components/card/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.text", "colors.surface", "radii.md"],
  docsUrl: "https://ecentry.dev/components/card/",
  license: "MIT",
} as const;
