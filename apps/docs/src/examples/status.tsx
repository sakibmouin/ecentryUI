import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Status } from "../../../../packages/react/src/components/status/index.js";

export function StatusExample() {
  const [online, setOnline] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Status example"
      >
        <div>
          <Status variant={online ? "success" : "error"}>
            {online ? "Operational" : "Offline"}
          </Status>
        </div>
        <div>
          <Status variant="warning" size="sm" live={false}>
            Scheduled maintenance
          </Status>
        </div>
        <button type="button" onClick={() => setOnline(!online)}>
          {online ? "Set offline" : "Set online"}
        </button>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
