export const skipNavLinkRegistryItem = {
  id: "skip-nav",
  version: "0.1.0",
  framework: "react",
  files: ["skip-nav.tsx", "index.ts", "skip-nav.css", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/skip-nav/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.accent", "colors.surface", "colors.text", "radii.md"],
  docsUrl: "https://ecentry.dev/components/skip-nav/",
  license: "MIT",
} as const;
