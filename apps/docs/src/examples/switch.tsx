import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Switch } from "../../../../packages/react/src/components/switch/switch.js";
import "../../../../packages/react/src/components/switch/switch.css";

export function SwitchExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Switch example"
      >
        <form aria-label="Notifications">
          <Switch
            label="Email notifications"
            name="email"
            defaultChecked
            description="Receive weekly product updates"
          />
          <Switch label="SMS notifications" name="sms" disabled />
          <Switch
            label="Account alerts"
            name="alerts"
            error="Please confirm your preference"
          />
          <button type="reset">Reset switches</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
