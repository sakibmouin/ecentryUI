import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import {
  Center,
  Circle,
  Square,
} from "../../../../packages/react/src/components/center/center.js";
import "../../../../packages/react/src/components/center/center.css";

export function CenterExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="center-demo" role="region" aria-label="Center examples">
        <div className="center-demo-grid">
          <div>
            <span className="center-demo-label">BLOCK CENTER</span>
            <Center
              as="section"
              aria-label="Centered panel"
              className="center-demo-panel"
              data-testid="center-panel"
            >
              <span data-testid="center-content">Centered content</span>
            </Center>
          </div>
          <div>
            <span className="center-demo-label">INLINE CENTER</span>
            <p className="center-demo-copy">
              Text flows beside{" "}
              <Center
                inline
                className="center-demo-inline"
                data-testid="inline-center"
              >
                a centered mark
              </Center>{" "}
              naturally.
            </p>
            <div className="center-demo-shapes" dir="rtl">
              <Square
                size={56}
                className="center-demo-square"
                data-testid="square"
              >
                1
              </Square>
              <Circle
                size={56}
                className="center-demo-circle"
                data-testid="circle"
              >
                2
              </Circle>
            </div>
          </div>
        </div>
        <button onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
