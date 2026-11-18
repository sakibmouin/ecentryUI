import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Tooltip } from "../../../../packages/react/src/components/tooltip/tooltip.js";
import "../../../../packages/react/src/components/tooltip/tooltip.css";

export function TooltipExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Tooltip example"
      >
        <Tooltip
          triggerLabel="Version history"
          content="View earlier saved versions of this project."
        />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
