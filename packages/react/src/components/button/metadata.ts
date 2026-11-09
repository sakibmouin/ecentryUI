export const buttonRegistryItem = {
  id: "button",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/button/button.tsx",
      path: "button.tsx",
    },
    {
      source: "packages/react/src/components/button/button.css",
      path: "button.css",
    },
    {
      source: "packages/react/src/components/button/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/button/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.focus",
    "colors.accent",
    "colors.accent.hover",
    "colors.text",
    "colors.background",
    "colors.danger",
    "motion.duration.fast",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/button/",
  license: "MIT",
} as const;
