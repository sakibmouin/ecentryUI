import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Spinner } from "../../../../packages/react/src/components/spinner/spinner.js";
import "../../../../packages/react/src/components/spinner/spinner.css";
export function SpinnerExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Spinner example"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Spinner label="Loading small item" size="sm" />
          <Spinner label="Saving report" />
          <Spinner label="Loading dashboard" size="lg" />
        </div>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
