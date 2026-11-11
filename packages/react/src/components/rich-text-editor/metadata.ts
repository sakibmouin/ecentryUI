export const richTextEditorRegistryItem = {
  id: "rich-text-editor",
  version: "0.1.0",
  framework: "react",
  files: [
    {
      source:
        "packages/react/src/components/rich-text-editor/rich-text-editor.tsx",
      path: "rich-text-editor.tsx",
    },
    {
      source:
        "packages/react/src/components/rich-text-editor/rich-text-editor.css",
      path: "rich-text-editor.css",
    },
    {
      source: "packages/react/src/components/rich-text-editor/index.ts",
      path: "index.ts",
    },
    {
      source: "packages/react/src/components/rich-text-editor/styles.d.ts",
      path: "styles.d.ts",
    },
  ],
  dependencies: [],
  peerDependencies: {
    react: ">=18",
    lexical: "^0.53.0",
    "@lexical/react": "^0.53.0",
    "@lexical/rich-text": "^0.53.0",
    "@lexical/history": "^0.53.0",
    "@lexical/clipboard": "^0.53.0",
  },
  tokens: [
    "colors.border",
    "colors.background",
    "colors.surface",
    "colors.text",
    "colors.focus",
    "radii.md",
  ],
  docsUrl: "https://ecentry.dev/components/rich-text-editor/",
  license: "MIT",
} as const;
