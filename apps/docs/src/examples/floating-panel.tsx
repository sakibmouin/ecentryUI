import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import {
  FloatingPanelRoot,
  FloatingPanelTrigger,
  FloatingPanelPortal,
  FloatingPanelContent,
  FloatingPanelHeader,
  FloatingPanelTitle,
  FloatingPanelDragHandle,
  FloatingPanelStageButton,
  FloatingPanelClose,
  FloatingPanelBody,
  FloatingPanelResizeHandle,
} from "../../../../packages/react/src/components/floating-panel/floating-panel.js";
import "../../../../packages/react/src/components/floating-panel/floating-panel.css";

export function FloatingPanelExample() {
  const [dark, setDark] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: 240 });
  const [size, setSize] = useState({ width: 370, height: 270 });
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="floating-panel-demo"
        role="region"
        aria-label="Floating Panel examples"
      >
        <div className="floating-panel-demo-intro">
          <span className="float-demo-label">INTERACTIVE WORKSPACE</span>
          <p>
            Open the panel, drag its handle, resize a corner, or use the arrow
            keys while a handle is focused.
          </p>
          <div className="floating-panel-demo-actions">
            <FloatingPanelRoot
              position={position}
              onPositionChange={setPosition}
              size={size}
              onSizeChange={setSize}
              minSize={{ width: 260, height: 160 }}
            >
              <FloatingPanelTrigger
                onClick={(event) => {
                  const width = Math.min(370, window.innerWidth - 32);
                  const trigger = event.currentTarget.getBoundingClientRect();
                  setSize({ width, height: 270 });
                  setPosition({
                    x: Math.max(
                      16,
                      Math.min(trigger.left, window.innerWidth - width - 16),
                    ),
                    y: Math.max(
                      72,
                      Math.min(trigger.top - 300, window.innerHeight - 286),
                    ),
                  });
                }}
              >
                Open floating panel
              </FloatingPanelTrigger>
              <FloatingPanelPortal>
                <FloatingPanelContent>
                  <FloatingPanelHeader>
                    <FloatingPanelDragHandle
                      title="Move panel"
                      aria-label="Move panel"
                    >
                      ⠿
                    </FloatingPanelDragHandle>
                    <FloatingPanelTitle>Workspace notes</FloatingPanelTitle>
                    <FloatingPanelStageButton
                      stage="minimized"
                      title="Minimize"
                      aria-label="Minimize"
                    >
                      −
                    </FloatingPanelStageButton>
                    <FloatingPanelStageButton
                      stage="default"
                      title="Restore"
                      aria-label="Restore"
                    >
                      ▢
                    </FloatingPanelStageButton>
                    <FloatingPanelStageButton
                      stage="maximized"
                      title="Maximize"
                      aria-label="Maximize"
                    >
                      □
                    </FloatingPanelStageButton>
                    <FloatingPanelClose title="Close" aria-label="Close panel">
                      ×
                    </FloatingPanelClose>
                  </FloatingPanelHeader>
                  <FloatingPanelBody>
                    <p className="floating-panel-note">
                      Keep ideas in view while you work.
                    </p>
                    <p>
                      Move this panel by pointer or keyboard. Resize it from the
                      lower right corner. Use Escape to close it.
                    </p>
                    <span className="floating-panel-tag">Draft</span>
                  </FloatingPanelBody>
                  <FloatingPanelResizeHandle
                    axis="se"
                    aria-label="Resize panel"
                  />
                </FloatingPanelContent>
              </FloatingPanelPortal>
            </FloatingPanelRoot>
            <button
              type="button"
              className="floating-panel-mode"
              onClick={() => setDark(!dark)}
            >
              {dark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>
      </div>
    </AppearanceProvider>
  );
}
