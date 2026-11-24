export const themeRegistryItem = {
  id: "theme",
  version: "0.1.0",
  framework: "react",
  files: ["theme.tsx", "index.ts", "theme.css", "styles.d.ts"].map((path) => ({
    source: `packages/react/src/components/theme/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.text", "colors.background"],
  docsUrl: "https://ecentry.dev/components/theme/",
  license: "MIT",
} as const;
