export const radioRegistryItem = {
  id: "radio",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/radio/radio.tsx",
      path: "radio.tsx",
    },
    {
      source: "packages/react/src/components/radio/radio.css",
      path: "radio.css",
    },
    {
      source: "packages/react/src/components/radio/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/radio/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text-muted",
    "colors.accent",
    "colors.danger",
    "colors.focus",
  ],
  docsUrl: "https://ecentry.dev/components/radio/",
  license: "MIT",
} as const;
