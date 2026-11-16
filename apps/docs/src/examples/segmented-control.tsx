import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { SegmentedControl } from "../../../../packages/react/src/components/segmented-control/segmented-control.js";
import "../../../../packages/react/src/components/segmented-control/segmented-control.css";

export function SegmentedControlExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Segmented control example"
      >
        <form aria-label="View settings">
          <SegmentedControl
            label="Time range"
            name="range"
            defaultValue="day"
            options={[
              { label: "Day", value: "day" },
              { label: "Week", value: "week" },
              { label: "Month", value: "month", disabled: true },
            ]}
          />
          <button type="reset">Reset range</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
