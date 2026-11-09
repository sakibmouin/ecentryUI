import { AbsoluteCenter } from "../../../../packages/react/src/components/absolute-center/absolute-center.js";
import "../../../../packages/react/src/components/absolute-center/absolute-center.css";

export function AbsoluteCenterExample() {
  return (
    <div
      className="absolute-demo-grid"
      role="region"
      aria-label="Absolute Center examples"
    >
      <div className="absolute-demo-group">
        <span>Both axes</span>
        <div className="absolute-demo-frame" data-testid="both-frame">
          <AbsoluteCenter className="absolute-demo-badge">
            Centered
          </AbsoluteCenter>
        </div>
      </div>
      <div className="absolute-demo-group">
        <span>Horizontal</span>
        <div className="absolute-demo-frame" data-testid="horizontal-frame">
          <AbsoluteCenter axis="horizontal" className="absolute-demo-badge">
            Horizontal
          </AbsoluteCenter>
        </div>
      </div>
      <div className="absolute-demo-group">
        <span>Vertical</span>
        <div className="absolute-demo-frame" data-testid="vertical-frame">
          <AbsoluteCenter axis="vertical" className="absolute-demo-badge">
            Vertical
          </AbsoluteCenter>
        </div>
      </div>
      <div className="absolute-demo-group">
        <span>RTL</span>
        <div className="absolute-demo-frame" data-testid="rtl-frame" dir="rtl">
          <AbsoluteCenter as="span" className="absolute-demo-badge">
            وسط
          </AbsoluteCenter>
        </div>
      </div>
    </div>
  );
}
