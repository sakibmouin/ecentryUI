export const scrollAreaRegistryItem = {
  id: "scroll-area",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/scroll-area/scroll-area.tsx",
      path: "scroll-area.tsx",
    },
    {
      source: "packages/react/src/components/scroll-area/scroll-area.css",
      path: "scroll-area.css",
    },
    {
      source: "packages/react/src/components/scroll-area/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/scroll-area/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.text.muted", "colors.focus"],
  docsUrl: "https://ecentry.dev/components/scroll-area/",
  license: "MIT",
} as const;
