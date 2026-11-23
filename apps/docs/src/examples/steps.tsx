import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Steps } from "../../../../packages/react/src/components/steps/index.js";

const items = [
  {
    id: "details",
    label: "Details",
    content: <p>Confirm your contact details.</p>,
  },
  {
    id: "delivery",
    label: "Delivery",
    content: <p>Choose a delivery method.</p>,
  },
  { id: "review", label: "Review", content: <p>Review your order.</p> },
];

export function StepsExample() {
  const [dark, setDark] = useState(false);
  const [linear, setLinear] = useState(true);
  const [vertical, setVertical] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Steps example"
      >
        <Steps
          items={items}
          label="Checkout"
          linear={linear}
          orientation={vertical ? "vertical" : "horizontal"}
        />
        <label>
          <input
            type="checkbox"
            checked={linear}
            onChange={(event) => setLinear(event.target.checked)}
          />{" "}
          Linear navigation
        </label>
        <label>
          <input
            type="checkbox"
            checked={vertical}
            onChange={(event) => setVertical(event.target.checked)}
          />{" "}
          Vertical layout
        </label>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
