import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Highlight } from "../../../../packages/react/src/components/highlight/highlight.js";
import "../../../../packages/react/src/components/highlight/highlight.css";
export function HighlightExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="text-demo" role="region" aria-label="Highlight example">
        <p>
          Search results <Highlight>match this phrase</Highlight>.
        </p>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
