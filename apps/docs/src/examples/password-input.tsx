import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { PasswordInput } from "../../../../packages/react/src/components/password-input/password-input.js";
import "../../../../packages/react/src/components/password-input/password-input.css";

export function PasswordInputExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Password input example"
      >
        <form aria-label="Credentials">
          <PasswordInput
            label="Password"
            name="password"
            defaultValue="examplepass"
            description="Use at least eight characters"
            required
          />
          <button type="reset">Reset password</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
