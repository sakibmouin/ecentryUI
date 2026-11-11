export const linkOverlayRegistryItem = {
  id: "link-overlay",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/link-overlay/link-overlay.tsx",
      path: "link-overlay.tsx",
    },
    {
      source: "packages/react/src/components/link-overlay/link-overlay.css",
      path: "link-overlay.css",
    },
    {
      source: "packages/react/src/components/link-overlay/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/link-overlay/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [],
  docsUrl: "https://ecentry.dev/components/link-overlay/",
  license: "MIT",
} as const;
