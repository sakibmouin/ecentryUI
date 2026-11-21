import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Progress } from "../../../../packages/react/src/components/progress/progress.js";
import "../../../../packages/react/src/components/progress/progress.css";
export function ProgressExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Progress example"
      >
        <p>Upload, 64%</p>
        <Progress label="Upload" value={64} />
        <p>Syncing</p>
        <Progress label="Syncing" size="sm" />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
