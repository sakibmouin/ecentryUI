export const timelineRegistryItem = {
  id: "timeline",
  version: "0.1.0",
  framework: "react",
  files: ["timeline.tsx", "index.ts", "timeline.css", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/timeline/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text-muted",
    "colors.border",
    "colors.accent",
  ],
  docsUrl: "https://ecentry.dev/components/timeline/",
  license: "MIT",
} as const;
