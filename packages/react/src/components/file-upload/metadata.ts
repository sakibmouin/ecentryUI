export const fileUploadRegistryItem = {
  id: "file-upload",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/file-upload/file-upload.tsx",
      path: "file-upload.tsx",
    },
    {
      source: "packages/react/src/components/file-upload/file-upload.css",
      path: "file-upload.css",
    },
    {
      source: "packages/react/src/components/file-upload/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/file-upload/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text-muted",
    "colors.border",
    "colors.background",
    "colors.danger",
    "colors.accent",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/file-upload/",
  license: "MIT",
} as const;
