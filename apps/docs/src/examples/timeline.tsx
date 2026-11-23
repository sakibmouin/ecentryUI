import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Timeline } from "../../../../packages/react/src/components/timeline/index.js";

const items = [
  {
    id: "received",
    title: "Order received",
    time: { dateTime: "2026-11-20", label: "November 20" },
  },
  {
    id: "packed",
    title: "Packed",
    time: { dateTime: "2026-11-21", label: "November 21" },
  },
  {
    id: "transit",
    title: "Currently in transit",
    time: { dateTime: "2026-11-22", label: "November 22" },
    description: "The carrier has picked up your package.",
  },
];

export function TimelineExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Timeline example"
      >
        <Timeline
          aria-label="Shipment history"
          items={items}
          currentId="transit"
        />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
