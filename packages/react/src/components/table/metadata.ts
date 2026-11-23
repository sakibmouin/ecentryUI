export const tableRegistryItem = {
  id: "table",
  version: "0.1.0",
  framework: "react",
  files: ["table.tsx", "table.css", "index.ts", "styles.d.ts"].map((path) => ({
    source: `packages/react/src/components/table/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.text", "colors.border", "colors.surface", "colors.accent"],
  docsUrl: "https://ecentry.dev/components/table/",
  license: "MIT",
} as const;
