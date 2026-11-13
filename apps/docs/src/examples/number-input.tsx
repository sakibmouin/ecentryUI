import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { NumberInput } from "../../../../packages/react/src/components/number-input/number-input.js";
import "../../../../packages/react/src/components/number-input/number-input.css";

export function NumberInputExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Number input example"
      >
        <form aria-label="Order">
          <NumberInput
            label="Quantity"
            name="quantity"
            defaultValue={2}
            min={0}
            max={10}
            step={1}
          />
          <button type="reset">Reset quantity</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
