import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { DatePicker } from "../../../../packages/react/src/components/date-picker/date-picker.js";
import "../../../../packages/react/src/components/date-picker/date-picker.css";
export function DatePickerExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo date-picker-demo"
        role="region"
        aria-label="Date picker example"
      >
        <form aria-label="Book trip">
          <DatePicker
            label="Departure"
            name="departure"
            defaultMonth="2026-11"
            minDate="2026-11-05"
            description="Choose a departure date"
          />
          <DatePicker
            label="Travel range"
            name="travel"
            mode="range"
            defaultMonth="2026-11"
          />
          <button type="reset">Reset trip</button>
        </form>
        <DatePicker label="Unavailable picker" disabled />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
