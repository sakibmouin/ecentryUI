export const marqueeRegistryItem = {
  id: "marquee",
  version: "0.1.0",
  framework: "react",
  files: ["marquee.tsx", "marquee.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/marquee/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text-muted",
    "colors.border",
    "colors.surface",
    "colors.accent",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/marquee/",
  license: "MIT",
} as const;
