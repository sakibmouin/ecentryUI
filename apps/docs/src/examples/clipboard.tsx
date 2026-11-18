import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Clipboard } from "../../../../packages/react/src/components/clipboard/clipboard.js";
import "../../../../packages/react/src/components/clipboard/clipboard.css";

export function ClipboardExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Clipboard example"
      >
        <Clipboard value="https://ecentry.dev" />
        <Clipboard value="Unavailable code" disabled />
        <Clipboard value="Preparing value" loading />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
