export const separatorRegistryItem = {
  id: "separator",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/separator/separator.tsx",
      path: "separator.tsx",
    },
    {
      source: "packages/react/src/components/separator/separator.css",
      path: "separator.css",
    },
    {
      source: "packages/react/src/components/separator/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/separator/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.border", "colors.text.muted"],
  docsUrl: "https://ecentry.dev/components/separator/",
  license: "MIT",
} as const;
