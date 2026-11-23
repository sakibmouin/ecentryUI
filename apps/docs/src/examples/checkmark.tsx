import { Checkmark } from "../../../../packages/react/src/components/checkmark/index.js";

export function CheckmarkExample() {
  return (
    <div className="code-demo" role="group" aria-label="Checkmark states">
      <div>
        <Checkmark /> Selected
      </div>
      <div>
        <Checkmark checked="mixed" /> Partially selected
      </div>
      <div>
        <Checkmark checked={false} /> Unselected
      </div>
    </div>
  );
}
