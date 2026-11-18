export const toggleTipRegistryItem = {
  id: "toggle-tip",
  version: "0.1.0",
  framework: "react",
  files: ["toggle-tip.tsx", "toggle-tip.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/toggle-tip/${path}`,
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
    "colors.focus",
  ],
  docsUrl: "https://ecentry.dev/components/toggle-tip/",
  license: "MIT",
} as const;
