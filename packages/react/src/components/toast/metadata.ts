export const toastRegistryItem = {
  id: "toast",
  version: "0.1.0",
  framework: "react",
  files: ["toast.tsx", "toast.css", "index.ts", "styles.d.ts"].map((path) => ({
    source: `packages/react/src/components/toast/${path}`,
    path,
  })),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text.muted",
    "colors.border",
    "colors.background",
    "colors.accent",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/toast/",
  license: "MIT",
} as const;
