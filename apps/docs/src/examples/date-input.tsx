import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { DateInput } from "../../../../packages/react/src/components/date-input/date-input.js";
import "../../../../packages/react/src/components/date-input/date-input.css";
export function DateInputExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo date-input-demo"
        role="region"
        aria-label="Date input example"
      >
        <form aria-label="Travel dates">
          <DateInput
            label="Departure date"
            name="departure"
            defaultValue="2026-11-12"
            min="2026-11-05"
            description="Select your departure day"
          />
          <button type="reset">Reset dates</button>
        </form>
        <DateInput label="Unavailable date" disabled />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
