export const sliderRegistryItem = {
  id: "slider",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/slider/slider.tsx",
      path: "slider.tsx",
    },
    {
      source: "packages/react/src/components/slider/slider.css",
      path: "slider.css",
    },
    {
      source: "packages/react/src/components/slider/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/slider/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.text",
    "colors.border",
    "colors.accent",
    "colors.background",
    "colors.focus",
  ],
  docsUrl: "https://ecentry.dev/components/slider/",
  license: "MIT",
} as const;
