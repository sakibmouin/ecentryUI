import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Checkbox } from "../../../../packages/react/src/components/checkbox/checkbox.js";
import "../../../../packages/react/src/components/checkbox/checkbox.css";
export function CheckboxExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo checkbox-demo"
        role="region"
        aria-label="Checkbox example"
      >
        <form aria-label="Preferences">
          <Checkbox
            label="Email updates"
            name="updates"
            defaultChecked
            description="Receive occasional product news"
          />
          <Checkbox label="Disabled option" disabled />
          <Checkbox label="Read-only option" readOnly defaultChecked />
          <button type="reset">Reset preferences</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
