import { Bleed } from "../../../../packages/react/src/components/bleed/bleed.js";
import "../../../../packages/react/src/components/bleed/bleed.css";

export function BleedExample() {
  return (
    <div className="bleed-demo-grid" role="region" aria-label="Bleed examples">
      <div className="bleed-demo-group">
        <span>Default inline bleed</span>
        <div className="bleed-demo-inset" data-testid="default-parent">
          <p>Content inside a padded container</p>
          <Bleed className="bleed-demo-surface">
            Edges reach past the padding
          </Bleed>
        </div>
      </div>
      <div className="bleed-demo-group">
        <span>Block and inline</span>
        <div className="bleed-demo-inset" data-testid="block-parent">
          <Bleed inline={16} block={12} className="bleed-demo-surface">
            Expands in both directions
          </Bleed>
        </div>
      </div>
      <div className="bleed-demo-group">
        <span>RTL inline start</span>
        <div className="bleed-demo-inset" dir="rtl" data-testid="rtl-parent">
          <Bleed inline={0} inlineStart={24} className="bleed-demo-surface">
            يمتد من البداية
          </Bleed>
        </div>
      </div>
    </div>
  );
}
