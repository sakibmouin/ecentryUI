import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Radio } from "../../../../packages/react/src/components/radio/radio.js";
import "../../../../packages/react/src/components/radio/radio.css";

export function RadioExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Radio example"
      >
        <form aria-label="Plan choice">
          <fieldset>
            <legend>Choose a plan</legend>
            <Radio
              label="Basic"
              name="plan"
              value="basic"
              defaultChecked
              description="For personal use"
            />
            <Radio
              label="Pro"
              name="plan"
              value="pro"
              description="For teams"
            />
            <Radio
              label="Unavailable"
              name="plan"
              value="unavailable"
              disabled
            />
          </fieldset>
          <button type="reset">Reset plan</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
