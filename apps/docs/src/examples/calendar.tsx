import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Calendar } from "../../../../packages/react/src/components/calendar/calendar.js";
import type { CalendarValue } from "../../../../packages/react/src/components/calendar/calendar.js";
import "../../../../packages/react/src/components/calendar/calendar.css";
export function CalendarExample() {
  const [dark, setDark] = useState(false);
  const [selection, setSelection] = useState<CalendarValue>();
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="code-demo" role="region" aria-label="Calendar example">
        <Calendar
          mode="range"
          defaultMonth="2026-11"
          label="Choose travel dates"
          value={selection}
          onChange={setSelection}
          minDate="2026-11-05"
          isDateUnavailable={(date) => date === "2026-11-13"}
        />
        <p role="status">
          {selection &&
          typeof selection === "object" &&
          !Array.isArray(selection)
            ? `${selection.start}${selection.end ? ` to ${selection.end}` : ""}`
            : "Choose dates"}
        </p>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
