export const passwordInputRegistryItem = {
  id: "password-input",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/password-input/password-input.tsx",
      path: "password-input.tsx",
    },
    {
      source: "packages/react/src/components/password-input/password-input.css",
      path: "password-input.css",
    },
    {
      source: "packages/react/src/components/password-input/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/password-input/styles.d.ts",
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
  docsUrl: "https://ecentry.dev/components/password-input/",
  license: "MIT",
} as const;
