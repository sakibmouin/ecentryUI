import { Radiomark } from "../../../../packages/react/src/components/radiomark/index.js";

export function RadiomarkExample() {
  return (
    <div className="code-demo" role="group" aria-label="Radiomark states">
      <div>
        <Radiomark checked /> Selected
      </div>
      <div>
        <Radiomark /> Unselected
      </div>
    </div>
  );
}
