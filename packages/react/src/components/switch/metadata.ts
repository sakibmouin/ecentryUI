export const switchRegistryItem = {
  id: "switch",
  version: "0.1.0",
  framework: "react",
  files: ["switch.tsx", "switch.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/switch/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text.muted",
    "colors.border",
    "colors.surface",
    "colors.accent",
    "colors.background",
    "colors.danger",
    "colors.focus",
    "motion.duration.fast",
  ],
  docsUrl: "https://ecentry.dev/components/switch/",
  license: "MIT",
} as const;
