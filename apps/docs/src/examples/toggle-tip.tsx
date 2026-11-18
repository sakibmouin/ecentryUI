import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { ToggleTip } from "../../../../packages/react/src/components/toggle-tip/toggle-tip.js";
import "../../../../packages/react/src/components/toggle-tip/toggle-tip.css";

export function ToggleTipExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Toggle tip example"
      >
        <span>Project visibility</span>
        <ToggleTip label="About project visibility" title="Project visibility">
          <p>Only project members can view private workspaces.</p>
        </ToggleTip>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
