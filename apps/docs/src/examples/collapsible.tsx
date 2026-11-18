import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Collapsible } from "../../../../packages/react/src/components/collapsible/collapsible.js";
import "../../../../packages/react/src/components/collapsible/collapsible.css";

export function CollapsibleExample() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Collapsible example"
      >
        <Collapsible title="Order details" defaultOpen>
          Ships within two business days.
        </Collapsible>
        <Collapsible
          title="Controlled details"
          open={open}
          onOpenChange={setOpen}
        >
          You can manage this panel from the button below.
        </Collapsible>
        <button type="button" onClick={() => setOpen(!open)}>
          {open ? "Close details" : "Open details"}
        </button>
        <Collapsible title="Unavailable details" disabled>
          Not available.
        </Collapsible>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
