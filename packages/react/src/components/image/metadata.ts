export const imageRegistryItem = {
  id: "image",
  version: "0.1.0",
  framework: "react",
  files: ["image.tsx", "image.css", "index.ts", "styles.d.ts"].map((path) => ({
    source: `packages/react/src/components/image/${path}`,
    path,
  })),
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
  docsUrl: "https://ecentry.dev/components/image/",
  license: "MIT",
} as const;
