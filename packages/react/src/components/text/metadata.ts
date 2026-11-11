export const textRegistryItem = {
  id: "text",
  version: "0.1.0",
  framework: "react",
  files: [
    { source: "packages/react/src/components/text/text.tsx", path: "text.tsx" },
    { source: "packages/react/src/components/text/text.css", path: "text.css" },
    { source: "packages/react/src/components/text/index.ts", path: "index.ts" },
    {
      source: "packages/react/src/components/text/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.text"],
  docsUrl: "https://ecentry.dev/components/text/",
  license: "MIT",
} as const;
