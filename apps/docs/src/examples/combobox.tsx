import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Combobox } from "../../../../packages/react/src/components/combobox/combobox.js";
import "../../../../packages/react/src/components/combobox/combobox.css";

const countries = [
  { value: "bd", label: "Bangladesh" },
  { value: "ca", label: "Canada" },
  { value: "jp", label: "Japan" },
  { value: "us", label: "United States" },
];
export function ComboboxExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Combobox example"
      >
        <form aria-label="Travel preferences">
          <Combobox
            label="Country"
            options={countries}
            name="country"
            defaultValue="bd"
            description="Search or use the arrow keys"
          />
          <Combobox
            label="Next stop"
            options={countries}
            error="Choose a destination"
          />
          <button type="reset">Reset country</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
