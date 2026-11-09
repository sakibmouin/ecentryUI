export const boxRegistryItem = {
  id: "box",
  version: "0.1.0",
  framework: "react",
  files: [
    { source: "packages/react/src/components/box/box.tsx", path: "box.tsx" },
    { source: "packages/react/src/components/box/box.css", path: "box.css" },
    { source: "packages/react/src/components/box/index.ts", path: "index.ts" },
    {
      source: "packages/react/src/components/box/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.surface", "colors.text"],
  docsUrl: "https://ecentry.dev/components/box/",
  license: "MIT",
} as const;
