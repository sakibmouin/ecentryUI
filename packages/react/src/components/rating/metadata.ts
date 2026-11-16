export const ratingRegistryItem = {
  id: "rating",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/rating/rating.tsx",
      path: "rating.tsx",
    },
    {
      source: "packages/react/src/components/rating/rating.css",
      path: "rating.css",
    },
    {
      source: "packages/react/src/components/rating/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/rating/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text-muted",
    "colors.accent",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/rating/",
  license: "MIT",
} as const;
