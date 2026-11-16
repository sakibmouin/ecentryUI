export const textareaRegistryItem = {
  id: "textarea",
  version: "0.1.0",
  framework: "react",
  files: ["textarea.tsx", "textarea.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/textarea/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text.muted",
    "colors.border",
    "colors.background",
    "colors.surface",
    "colors.danger",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/textarea/",
  license: "MIT",
} as const;
