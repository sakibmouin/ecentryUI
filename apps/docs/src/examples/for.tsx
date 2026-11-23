import { useState } from "react";
import { For } from "../../../../packages/react/src/components/for/index.js";

export function ForExample() {
  const [items, setItems] = useState(["Design", "Engineering"]);
  return (
    <div className="code-demo">
      <ul aria-label="Teams">
        <For each={items} getKey={(item) => item} fallback={<li>No teams</li>}>
          {(item) => <li>{item}</li>}
        </For>
      </ul>
      <button type="button" onClick={() => setItems([])}>
        Clear teams
      </button>
    </div>
  );
}
