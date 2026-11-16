import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Command } from "../../../../packages/react/src/components/command/command.js";
import "../../../../packages/react/src/components/command/command.css";

const groups = [
  {
    label: "Files",
    items: [
      { value: "open", label: "Open file", shortcut: "⌘ O" },
      { value: "save", label: "Save file", shortcut: "⌘ S" },
    ],
  },
  {
    label: "View",
    items: [
      { value: "theme", label: "Toggle theme", shortcut: "⌘ T" },
      {
        value: "sidebar",
        label: "Show sidebar",
        shortcut: "⌘ B",
        disabled: true,
      },
    ],
  },
];
export function CommandExample() {
  const [dark, setDark] = useState(false);
  const [selected, setSelected] = useState("None");
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Command example"
      >
        <Command
          label="Quick actions"
          groups={groups}
          onSelect={(item) => setSelected(item.label)}
        />
        <p aria-live="polite">Selected: {selected}</p>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
