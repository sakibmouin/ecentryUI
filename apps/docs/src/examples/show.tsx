import { useState } from "react";
import { Show } from "../../../../packages/react/src/components/show/index.js";

export function ShowExample() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="code-demo">
      <button type="button" onClick={() => setVisible(!visible)}>
        {visible ? "Hide details" : "Show details"}
      </button>
      <Show when={visible} fallback={<p>Details are hidden.</p>}>
        <p>The report is ready to share.</p>
      </Show>
    </div>
  );
}
