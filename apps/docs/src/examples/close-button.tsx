import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { CloseButton } from "../../../../packages/react/src/components/close-button/close-button.js";
import "../../../../packages/react/src/components/close-button/close-button.css";
export function CloseButtonExample() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(true);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo"
        role="region"
        aria-label="Close button example"
      >
        {open ? (
          <div>
            <span>Dismissible note</span>
            <CloseButton onClick={() => setOpen(false)} />
          </div>
        ) : (
          <p>Note dismissed</p>
        )}
        <CloseButton aria-label="Unavailable close" disabled />
        <CloseButton aria-label="Closing" loading />
        <button type="button" onClick={() => setOpen(true)}>
          Reset
        </button>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
