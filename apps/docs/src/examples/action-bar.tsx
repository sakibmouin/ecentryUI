import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { ActionBar } from "../../../../packages/react/src/components/action-bar/action-bar.js";
import "../../../../packages/react/src/components/action-bar/action-bar.css";

export function ActionBarExample() {
  const [dark, setDark] = useState(false);
  const [message, setMessage] = useState("No action selected");
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Action bar example"
      >
        <ActionBar
          label="Selected items"
          triggerLabel="Show actions for 3 items"
          actions={[
            {
              id: "archive",
              label: "Archive",
              onSelect: () => setMessage("Archived 3 items"),
            },
            {
              id: "share",
              label: "Share",
              onSelect: () => setMessage("Shared 3 items"),
            },
            {
              id: "delete",
              label: "Delete",
              onSelect: () => setMessage("Deleted 3 items"),
              disabled: true,
            },
          ]}
        />
        <p aria-live="polite">{message}</p>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
