export const carouselRegistryItem = {
  id: "carousel",
  version: "0.1.0",
  framework: "react",
  files: ["carousel.tsx", "carousel.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/carousel/${path}`,
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
  ],
  docsUrl: "https://ecentry.dev/components/carousel/",
  license: "MIT",
} as const;
