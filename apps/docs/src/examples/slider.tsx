import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Slider } from "../../../../packages/react/src/components/slider/slider.js";
import "../../../../packages/react/src/components/slider/slider.css";

export function SliderExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Slider example"
      >
        <form aria-label="Slider settings">
          <Slider
            label="Volume"
            name="volume"
            defaultValue={40}
            step={10}
            dir="rtl"
          />
          <Slider
            label="Price range"
            name="price"
            defaultValue={[20, 80]}
            range
            step={10}
          />
          <Slider
            label="Height"
            name="height"
            defaultValue={30}
            orientation="vertical"
            step={10}
          />
          <button type="reset">Reset sliders</button>
        </form>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
