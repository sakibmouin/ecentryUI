import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Field } from "../../../../packages/react/src/components/field/field.js";
import "../../../../packages/react/src/components/field/field.css";

export function FieldExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="code-demo" role="region" aria-label="Field example">
        <form aria-label="Profile">
          <Field
            label="Display name"
            description="Shown on your profile"
            required
          >
            <input name="name" defaultValue="Ada" />
          </Field>
          <Field label="Email" error="Enter a valid address">
            <input type="email" name="email" />
          </Field>
          <button type="reset">Reset fields</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
