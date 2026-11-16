export const commandRegistryItem = {
  id: "command",
  version: "0.1.0",
  framework: "react",
  files: ["command.tsx", "command.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/command/${path}`,
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
    "colors.surface",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/command/",
  license: "MIT",
} as const;
