import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { ColorSwatch } from "../../../../packages/react/src/components/color-swatch/color-swatch.js";
import "../../../../packages/react/src/components/color-swatch/color-swatch.css";

export function ColorSwatchExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Color swatch example"
      >
        <form aria-label="Palette">
          <fieldset>
            <legend>Accent color</legend>
            <ColorSwatch
              color="#116e5e"
              label="Teal"
              name="accent"
              defaultChecked
            />
            <ColorSwatch
              color="#c43843"
              label="Red"
              name="accent"
              description="Warm accent"
            />
            <ColorSwatch
              color="#627272"
              label="Unavailable"
              name="accent"
              disabled
            />
          </fieldset>
          <button type="reset">Reset color</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
