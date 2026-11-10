import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import {
  SplitterRoot,
  SplitterPanel,
  SplitterHandle,
} from "../../../../packages/react/src/components/splitter/splitter.js";
import "../../../../packages/react/src/components/splitter/splitter.css";

const panels = [
  { id: "navigation", minSize: 15, maxSize: 45 },
  { id: "editor", minSize: 35 },
  { id: "inspector", minSize: 15, maxSize: 40 },
];

export function SplitterExample() {
  const [dark, setDark] = useState(false);
  const [vertical, setVertical] = useState(false);
  const [controlled, setControlled] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [rtl, setRtl] = useState(false);
  const [sizes, setSizes] = useState([25, 50, 25]);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="splitter-demo"
        role="region"
        aria-label="Splitter examples"
      >
        <div className="splitter-demo-heading">
          <div>
            <span className="splitter-demo-kicker">WORKSPACE LAYOUT</span>
            <strong>Make room for your work</strong>
            <p>Drag the dividers or focus one and use the arrow keys.</p>
          </div>
          <button type="button" onClick={() => setDark(!dark)}>
            {dark ? "Light mode" : "Dark mode"}
          </button>
        </div>
        <div className="splitter-demo-controls">
          <label>
            <input
              type="checkbox"
              checked={vertical}
              onChange={(event) => setVertical(event.target.checked)}
            />{" "}
            Vertical
          </label>
          <label>
            <input
              type="checkbox"
              checked={controlled}
              onChange={(event) => setControlled(event.target.checked)}
            />{" "}
            Controlled
          </label>
          <label>
            <input
              type="checkbox"
              checked={rtl}
              onChange={(event) => setRtl(event.target.checked)}
            />{" "}
            RTL
          </label>
          <label>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(event) => setDisabled(event.target.checked)}
            />{" "}
            Locked
          </label>
        </div>
        <SplitterRoot
          panels={panels}
          defaultSize={[25, 50, 25]}
          size={controlled ? sizes : undefined}
          onResize={setSizes}
          orientation={vertical ? "vertical" : "horizontal"}
          dir={rtl ? "rtl" : "ltr"}
          disabled={disabled}
          className="splitter-demo-layout"
          data-testid="splitter-example"
        >
          <SplitterPanel
            id="navigation"
            role="region"
            aria-label="Navigation panel"
            className="splitter-demo-panel"
          >
            <span className="splitter-demo-panel-index">01 / NAVIGATE</span>
            <strong>Pages</strong>
            <span>Overview</span>
            <span>Projects</span>
            <span>Activity</span>
          </SplitterPanel>
          <SplitterHandle
            between={["navigation", "editor"]}
            aria-label="Resize navigation and editor"
          />
          <SplitterPanel
            id="editor"
            role="region"
            aria-label="Editor panel"
            className="splitter-demo-panel splitter-demo-editor"
          >
            <span className="splitter-demo-panel-index">02 / EDIT</span>
            <strong>Project brief</strong>
            <p>
              Give your content the space it needs. Adjust either divider to
              rebalance the workspace.
            </p>
            <span className="splitter-demo-pill">In progress</span>
          </SplitterPanel>
          <SplitterHandle
            between={["editor", "inspector"]}
            aria-label="Resize editor and inspector"
          />
          <SplitterPanel
            id="inspector"
            role="region"
            aria-label="Inspector panel"
            className="splitter-demo-panel"
          >
            <span className="splitter-demo-panel-index">03 / INSPECT</span>
            <strong>Details</strong>
            <span>Updated today</span>
            <span>3 collaborators</span>
          </SplitterPanel>
        </SplitterRoot>
        <div className="splitter-demo-status" aria-live="polite">
          <span>Panel sizes</span>
          <output data-testid="splitter-sizes">
            {sizes.map((value) => `${value.toFixed(0)}%`).join(" / ")}
          </output>
        </div>
      </div>
    </AppearanceProvider>
  );
}
