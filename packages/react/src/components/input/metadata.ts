export const inputRegistryItem = {
  id: "input",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/input/input.tsx",
      path: "input.tsx",
    },
    {
      source: "packages/react/src/components/input/input.css",
      path: "input.css",
    },
    {
      source: "packages/react/src/components/input/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/input/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.border",
    "colors.accent",
    "colors.text",
    "colors.text.muted",
    "colors.background",
    "colors.surface",
    "colors.focus",
    "colors.danger",
    "motion.duration.fast",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/input/",
  license: "MIT",
} as const;
