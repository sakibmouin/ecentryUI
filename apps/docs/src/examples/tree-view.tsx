import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { TreeView } from "../../../../packages/react/src/components/tree-view/tree-view.js";
import "../../../../packages/react/src/components/tree-view/tree-view.css";

const nodes = [
  {
    id: "docs",
    label: "Documents",
    children: [
      { id: "reports", label: "Reports" },
      { id: "plans", label: "Plans" },
    ],
  },
  {
    id: "media",
    label: "Media",
    children: [{ id: "photos", label: "Photos" }],
  },
  { id: "archive", label: "Archive", disabled: true },
];
export function TreeViewExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Tree view example"
      >
        <TreeView
          label="Project files"
          nodes={nodes}
          defaultExpanded={["docs"]}
          defaultValue="reports"
        />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
