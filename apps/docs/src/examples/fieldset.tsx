import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Fieldset } from "../../../../packages/react/src/components/fieldset/fieldset.js";
import "../../../../packages/react/src/components/fieldset/fieldset.css";

export function FieldsetExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="code-demo" role="region" aria-label="Fieldset example">
        <form aria-label="Preferences">
          <Fieldset
            label="Notifications"
            description="Choose how we contact you"
          >
            <label>
              <input type="radio" name="contact" value="email" defaultChecked />{" "}
              Email
            </label>
            <label>
              <input type="radio" name="contact" value="sms" /> SMS
            </label>
          </Fieldset>
          <button type="reset">Reset preferences</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
