import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Kbd } from "../../../../packages/react/src/components/kbd/kbd.js";
import "../../../../packages/react/src/components/kbd/kbd.css";

export function KbdExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo"
        role="region"
        aria-label="Keyboard shortcut example"
      >
        <p>
          Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open search.
        </p>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
