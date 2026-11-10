export const floatingPanelRegistryItem = {
  id: "floating-panel",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/floating-panel/floating-panel.tsx",
      path: "floating-panel.tsx",
    },
    {
      source: "packages/react/src/components/floating-panel/floating-panel.css",
      path: "floating-panel.css",
    },
    {
      source: "packages/react/src/components/floating-panel/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/floating-panel/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18", "react-dom": ">=18" },
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
  docsUrl: "https://ecentry.dev/components/floating-panel/",
  license: "MIT",
} as const;
