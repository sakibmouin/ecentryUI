import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Stat } from "../../../../packages/react/src/components/stat/stat.js";
import "../../../../packages/react/src/components/stat/stat.css";
export function StatExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Stat example"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
          }}
        >
          <Stat
            label="Revenue"
            value="$12,480"
            trend="Up 12%"
            trendTone="positive"
            helpText="vs last month"
          />
          <Stat
            label="Visitors"
            value="8,420"
            trend="Down 3%"
            trendTone="negative"
            helpText="vs last month"
          />
        </div>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
