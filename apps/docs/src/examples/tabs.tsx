import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Tabs } from "../../../../packages/react/src/components/tabs/index.js";

const items = [
  {
    id: "overview",
    label: "Overview",
    content: <p>Review your project activity.</p>,
  },
  {
    id: "members",
    label: "Members",
    content: <p>Manage access to your project.</p>,
  },
  {
    id: "billing",
    label: "Billing",
    content: <p>View your invoices.</p>,
    disabled: true,
  },
];

export function TabsExample() {
  const [dark, setDark] = useState(false);
  const [manual, setManual] = useState(false);
  const [vertical, setVertical] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Tabs example"
      >
        <Tabs
          label="Project settings"
          items={items}
          activation={manual ? "manual" : "automatic"}
          orientation={vertical ? "vertical" : "horizontal"}
        />
        <label>
          <input
            type="checkbox"
            checked={manual}
            onChange={(event) => setManual(event.target.checked)}
          />{" "}
          Manual activation
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
