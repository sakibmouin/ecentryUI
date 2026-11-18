import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { OverlayManager } from "../../../../packages/react/src/components/overlay-manager/overlay-manager.js";
import "../../../../packages/react/src/components/overlay-manager/overlay-manager.css";

export function OverlayManagerExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Overlay manager example"
      >
        <OverlayManager
          overlays={[
            {
              id: "settings",
              title: "Project settings",
              triggerLabel: "Open settings",
              children: <p>Manage project preferences.</p>,
            },
            {
              id: "advanced",
              parentId: "settings",
              title: "Advanced settings",
              triggerLabel: "Open advanced",
              children: <p>Review advanced project options.</p>,
            },
          ]}
        />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
