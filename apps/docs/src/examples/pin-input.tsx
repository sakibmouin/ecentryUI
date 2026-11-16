import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { PinInput } from "../../../../packages/react/src/components/pin-input/pin-input.js";
import "../../../../packages/react/src/components/pin-input/pin-input.css";

export function PinInputExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Pin input example"
      >
        <form aria-label="Verification">
          <PinInput
            label="Verification code"
            name="code"
            length={4}
            defaultValue="12"
            description="Enter four digits"
            required
          />
          <PinInput
            label="Masked code"
            name="masked"
            length={4}
            defaultValue="1234"
            mask
            readOnly
          />
          <button type="reset">Reset codes</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
