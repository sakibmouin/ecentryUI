export const clipboardRegistryItem = {
  id: "clipboard",
  version: "0.1.0",
  framework: "react",
  files: ["clipboard.tsx", "clipboard.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/clipboard/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.border",
    "colors.background",
    "colors.surface",
    "colors.focus",
    "radii.md",
    "radii.sm",
  ],
  docsUrl: "https://ecentry.dev/components/clipboard/",
  license: "MIT",
} as const;
