import { useState } from "react";
import { Portal } from "../../../../packages/react/src/components/portal/index.js";

export function PortalExample() {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [inline, setInline] = useState(false);
  return (
    <div className="code-demo">
      <div role="group" aria-label="Source">
        <Portal container={target} disabled={inline}>
          <p>Traveling content</p>
        </Portal>
      </div>
      <div ref={setTarget} role="group" aria-label="Destination" />
      <label>
        <input
          type="checkbox"
          checked={inline}
          onChange={(event) => setInline(event.target.checked)}
        />{" "}
        Render inline
      </label>
    </div>
  );
}
