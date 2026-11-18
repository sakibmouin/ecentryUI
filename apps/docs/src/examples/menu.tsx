import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Menu } from "../../../../packages/react/src/components/menu/menu.js";
import "../../../../packages/react/src/components/menu/menu.css";

export function MenuExample() {
  const [dark, setDark] = useState(false);
  const [message, setMessage] = useState("No action selected");
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Menu example"
      >
        <Menu
          triggerLabel="File actions"
          items={[
            {
              id: "open",
              label: "Open",
              onSelect: () => setMessage("Opened file"),
            },
            {
              id: "export",
              label: "Export",
              children: [
                {
                  id: "pdf",
                  label: "PDF",
                  onSelect: () => setMessage("Exported PDF"),
                },
                {
                  id: "csv",
                  label: "CSV",
                  onSelect: () => setMessage("Exported CSV"),
                },
              ],
            },
            { id: "delete", label: "Delete", disabled: true },
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
