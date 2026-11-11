import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { CheckboxCard } from "../../../../packages/react/src/components/checkbox-card/checkbox-card.js";
import "../../../../packages/react/src/components/checkbox-card/checkbox-card.css";
export function CheckboxCardExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo"
        role="region"
        aria-label="Checkbox card example"
      >
        <form aria-label="Options">
          <CheckboxCard
            label="Priority support"
            name="priority"
            description="Get help from our team sooner"
          />
          <CheckboxCard label="Unavailable option" disabled />
          <button type="reset">Reset options</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
