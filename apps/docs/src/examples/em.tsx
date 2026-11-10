import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Em } from "../../../../packages/react/src/components/em/em.js";
import "../../../../packages/react/src/components/em/em.css";

export function EmExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="text-demo" role="region" aria-label="Em example">
        <p>
          Read the <Em>important detail</Em> before continuing.
        </p>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
