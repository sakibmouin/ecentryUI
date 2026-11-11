export const kbdRegistryItem = {
  id: "kbd",
  version: "0.1.0",
  framework: "react",
  files: [
    { source: "packages/react/src/components/kbd/kbd.tsx", path: "kbd.tsx" },
    { source: "packages/react/src/components/kbd/kbd.css", path: "kbd.css" },
    { source: "packages/react/src/components/kbd/index.ts", path: "index.ts" },
    {
      source: "packages/react/src/components/kbd/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/kbd/",
  license: "MIT",
} as const;
