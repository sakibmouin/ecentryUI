import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Float } from "../../../../packages/react/src/components/float/float.js";
import type { FloatPlacement } from "../../../../packages/react/src/components/float/float.js";
import "../../../../packages/react/src/components/float/float.css";

const placements: FloatPlacement[] = [
  "top-start",
  "top-center",
  "top-end",
  "middle-start",
  "middle-center",
  "middle-end",
  "bottom-start",
  "bottom-center",
  "bottom-end",
];

export function FloatExample() {
  const [placement, setPlacement] = useState<FloatPlacement>("top-end");
  const [offset, setOffset] = useState(0);
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="float-demo" role="region" aria-label="Float examples">
        <div className="float-demo-controls">
          <label htmlFor="float-placement">Placement</label>
          <select
            id="float-placement"
            value={placement}
            onChange={(event) =>
              setPlacement(event.target.value as FloatPlacement)
            }
          >
            {placements.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <label htmlFor="float-offset">Offset: {offset}px</label>
          <input
            id="float-offset"
            type="range"
            min="0"
            max="16"
            value={offset}
            onChange={(event) => setOffset(Number(event.target.value))}
          />
        </div>
        <div className="float-demo-grid">
          <div>
            <span className="float-demo-label">LTR</span>
            <div className="float-demo-card" data-testid="ltr-parent">
              <span>Anchored item</span>
              <Float
                as="span"
                placement={placement}
                offset={offset}
                className="float-demo-badge"
                aria-label="3 new items"
                data-testid="ltr-float"
              >
                3
              </Float>
            </div>
          </div>
          <div dir="rtl">
            <span className="float-demo-label">RTL</span>
            <div className="float-demo-card" data-testid="rtl-parent">
              <span>عنصر مثبت</span>
              <Float
                as="span"
                placement={placement}
                offset={offset}
                className="float-demo-badge"
                aria-label="3 عناصر جديدة"
                data-testid="rtl-float"
              >
                3
              </Float>
            </div>
          </div>
        </div>
        <span className="float-demo-label">RESPONSIVE PLACEMENT</span>
        <div
          className="float-demo-card float-demo-responsive"
          data-testid="responsive-parent"
        >
          <span>Move from bottom start to top end at 48rem</span>
          <Float
            as="span"
            placement={{ base: "bottom-start", md: "top-end" }}
            className="float-demo-badge"
            aria-label="Responsive indicator"
            data-testid="responsive-float"
          >
            R
          </Float>
        </div>
        <button onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
