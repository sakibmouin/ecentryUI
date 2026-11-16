import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { RadioCard } from "../../../../packages/react/src/components/radio-card/radio-card.js";
import "../../../../packages/react/src/components/radio-card/radio-card.css";

export function RadioCardExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Radio card example"
      >
        <form aria-label="Shipping choice">
          <fieldset>
            <legend>Shipping speed</legend>
            <RadioCard
              label="Standard"
              name="shipping"
              value="standard"
              description="Three business days"
              defaultChecked
            />
            <RadioCard
              label="Express"
              name="shipping"
              value="express"
              description="Next business day"
            />
            <RadioCard
              label="Unavailable"
              name="shipping"
              value="unavailable"
              disabled
            />
          </fieldset>
          <button type="reset">Reset shipping</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
