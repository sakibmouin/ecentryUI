export const avatarRegistryItem = {
  id: "avatar",
  version: "0.1.0",
  framework: "react",
  files: ["avatar.tsx", "avatar.css", "index.ts", "styles.d.ts"].map(
    (path) => ({
      source: `packages/react/src/components/avatar/${path}`,
      path,
    }),
  ),
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: ["colors.text"],
  docsUrl: "https://ecentry.dev/components/avatar/",
  license: "MIT",
} as const;
