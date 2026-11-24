import { VisuallyHidden } from "../../../../packages/react/src/components/visually-hidden/index.js";

export function VisuallyHiddenExample() {
  return (
    <div className="code-demo">
      <p>
        <VisuallyHidden>Shipment status: </VisuallyHidden>In transit
      </p>
      <VisuallyHidden revealOnFocus>
        <a href="#tracking-help">Tracking help</a>
      </VisuallyHidden>
      <p id="tracking-help">
        Tracking updates appear when the carrier scans your package.
      </p>
    </div>
  );
}
