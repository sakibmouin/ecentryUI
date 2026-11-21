export const qrCodeRegistryItem = {
  id: "qr-code",
  version: "0.1.0",
  framework: "react",
  files: ["qr-code.tsx", "qr-code.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/qr-code/${path}`,
      path,
    }),
  ),
  dependencies: [],
  npmDependencies: { qrcode: "^1.5.4" },
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.text-muted",
    "colors.border",
    "colors.surface",
    "colors.accent",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/qr-code/",
  license: "MIT",
} as const;
