import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { ProgressCircle } from "../../../../packages/react/src/components/progress-circle/progress-circle.js";
import "../../../../packages/react/src/components/progress-circle/progress-circle.css";
export function ProgressCircleExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Progress Circle example"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <ProgressCircle label="Upload" value={72} size="lg" />
          <ProgressCircle label="Processing" size="sm" />
        </div>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
