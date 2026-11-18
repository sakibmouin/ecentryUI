export const overlayManagerRegistryItem = {
  id: "overlay-manager",
  version: "0.1.0",
  framework: "react",
  files: [
    "overlay-manager.tsx",
    "overlay-manager.css",
    "index.ts",
    "styles.d.ts",
  ].map((path) => ({
    source: `packages/react/src/components/overlay-manager/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text.muted",
    "colors.border",
    "colors.background",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/overlay-manager/",
  license: "MIT",
} as const;
