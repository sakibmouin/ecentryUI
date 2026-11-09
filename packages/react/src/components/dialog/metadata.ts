export const dialogRegistryItem = {
  id: "dialog",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/dialog/dialog.tsx",
      path: "dialog.tsx",
    },
    {
      source: "packages/react/src/components/dialog/dialog.css",
      path: "dialog.css",
    },
    {
      source: "packages/react/src/components/dialog/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/dialog/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.border",
    "colors.background",
    "colors.text",
    "colors.text.muted",
    "colors.accent",
    "colors.accent.hover",
    "colors.focus",
    "radii.md",
    "radii.lg",
  ],
  docsUrl: "https://ecentry.dev/components/dialog/",
  license: "MIT",
} as const;
