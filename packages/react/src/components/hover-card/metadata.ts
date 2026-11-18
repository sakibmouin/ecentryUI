export const hoverCardRegistryItem = {
  id: "hover-card",
  version: "0.1.0",
  framework: "react",
  files: ["hover-card.tsx", "hover-card.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/hover-card/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text.muted",
    "colors.border",
    "colors.background",
    "colors.accent",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/hover-card/",
  license: "MIT",
} as const;
