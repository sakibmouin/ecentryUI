import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { ColorPicker } from "../../../../packages/react/src/components/color-picker/color-picker.js";
import "../../../../packages/react/src/components/color-picker/color-picker.css";
export function ColorPickerExample() {
  const [dark, setDark] = useState(false);
  const [color, setColor] = useState("#116E5EFF");
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo"
        role="region"
        aria-label="Color picker example"
      >
        <ColorPicker
          label="Brand color"
          name="brand"
          value={color}
          onChange={setColor}
          description="Choose the accent color and opacity"
        />
        <p role="status">Selected: {color}</p>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
