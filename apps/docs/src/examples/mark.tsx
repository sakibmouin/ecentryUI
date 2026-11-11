import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Mark } from "../../../../packages/react/src/components/mark/mark.js";
import "../../../../packages/react/src/components/mark/mark.css";

export function MarkExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="code-demo" role="region" aria-label="Mark example">
        <p>
          The <Mark>important passage</Mark> deserves attention.
        </p>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
