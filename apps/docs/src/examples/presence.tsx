import { useState } from "react";
import { Presence } from "../../../../packages/react/src/components/presence/index.js";

export function PresenceExample() {
  const [present, setPresent] = useState(true);
  return (
    <div className="code-demo">
      <button
        type="button"
        aria-expanded={present}
        onClick={() => setPresent(!present)}
      >
        Toggle message
      </button>
      <Presence present={present}>
        <p>Report saved</p>
      </Presence>
    </div>
  );
}
