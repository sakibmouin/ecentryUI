import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Popover } from "../../../../packages/react/src/components/popover/popover.js";
import "../../../../packages/react/src/components/popover/popover.css";

export function PopoverExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Popover example"
      >
        <Popover triggerLabel="Open details" title="Project details">
          <p>Review the current project before making changes.</p>
        </Popover>
        <Popover
          triggerLabel="Open end aligned"
          title="End aligned"
          align="end"
          placement="top"
        >
          <p>This panel aligns to the trigger's end edge.</p>
        </Popover>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
