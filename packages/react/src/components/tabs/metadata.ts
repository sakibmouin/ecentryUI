export const tabsRegistryItem = {
  id: "tabs",
  version: "0.1.0",
  framework: "react",
  files: ["tabs.tsx", "tabs.css", "index.ts", "styles.d.ts"].map((path) => ({
    source: `packages/react/src/components/tabs/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text-muted",
    "colors.border",
    "colors.accent",
  ],
  docsUrl: "https://ecentry.dev/components/tabs/",
  license: "MIT",
} as const;
