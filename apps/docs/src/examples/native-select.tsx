import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { NativeSelect } from "../../../../packages/react/src/components/native-select/native-select.js";
import "../../../../packages/react/src/components/native-select/native-select.css";

export function NativeSelectExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Native select example"
      >
        <form aria-label="Profile">
          <NativeSelect
            label="Country"
            name="country"
            defaultValue="bd"
            description="Choose your location"
          >
            <option value="bd">Bangladesh</option>
            <option value="ca">Canada</option>
            <option value="us">United States</option>
          </NativeSelect>
          <button type="reset">Reset country</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
