import { AspectRatio } from "../../../../packages/react/src/components/aspect-ratio/aspect-ratio.js";
import "../../../../packages/react/src/components/aspect-ratio/aspect-ratio.css";

export function AspectRatioExample() {
  return (
    <div
      className="aspect-demo-grid"
      role="region"
      aria-label="Aspect Ratio examples"
    >
      <div className="aspect-demo-group aspect-demo-wide">
        <span>Wide · 16:9</span>
        <AspectRatio data-testid="wide-frame">
          <div className="aspect-demo-art aspect-demo-art-wide">
            <strong>Wide media</strong>
            <span>16 / 9</span>
          </div>
        </AspectRatio>
      </div>
      <div className="aspect-demo-group">
        <span>Square · 1:1</span>
        <AspectRatio ratio={1} data-testid="square-frame">
          <div className="aspect-demo-art aspect-demo-art-square">
            <strong>Square</strong>
            <span>1 / 1</span>
          </div>
        </AspectRatio>
      </div>
      <div className="aspect-demo-group">
        <span>Portrait · 3:4</span>
        <AspectRatio ratio={3 / 4} data-testid="portrait-frame">
          <div className="aspect-demo-art aspect-demo-art-portrait">
            <strong>Portrait</strong>
            <span>3 / 4</span>
          </div>
        </AspectRatio>
      </div>
    </div>
  );
}
