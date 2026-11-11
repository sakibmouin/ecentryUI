export const calendarRegistryItem = {
  id: "calendar",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source: "packages/react/src/components/calendar/calendar.tsx",
      path: "calendar.tsx",
    },
    {
      source: "packages/react/src/components/calendar/calendar.css",
      path: "calendar.css",
    },
    {
      source: "packages/react/src/components/calendar/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/calendar/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: { react: ">=18" },
  tokens: [
    "colors.border",
    "colors.background",
    "colors.text",
    "colors.text-muted",
    "colors.surface",
    "colors.accent",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/calendar/",
  license: "MIT",
} as const;
