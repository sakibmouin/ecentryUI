import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Group } from "../../../../packages/react/src/components/group/group.js";
import "../../../../packages/react/src/components/group/group.css";

export function GroupExample() {
  const [dark, setDark] = useState(false);
  const [view, setView] = useState("Week");
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="group-demo" role="region" aria-label="Group examples">
        <span className="group-demo-label">ATTACHED CONTROLS</span>
        <Group
          attached
          role="group"
          aria-label="Time range"
          data-testid="attached-group"
        >
          {["Day", "Week", "Month"].map((item) => (
            <button
              key={item}
              type="button"
              className="group-demo-button"
              aria-pressed={view === item}
              onClick={() => setView(item)}
            >
              {item}
            </button>
          ))}
        </Group>
        <span className="group-demo-label">GROW TO FILL</span>
        <Group
          grow
          gap={{ base: 8, md: 16 }}
          role="group"
          aria-label="Actions"
          data-testid="grow-group"
        >
          <button type="button" className="group-demo-button">
            Edit
          </button>
          <button type="button" className="group-demo-button">
            Share
          </button>
          <button type="button" className="group-demo-button">
            Archive
          </button>
        </Group>
        <span className="group-demo-label">RTL ATTACHMENT</span>
        <Group
          attached
          dir="rtl"
          role="group"
          aria-label="RTL actions"
          data-testid="rtl-group"
        >
          <button type="button" className="group-demo-button">
            الأول
          </button>
          <button type="button" className="group-demo-button">
            الثاني
          </button>
        </Group>
        <button
          type="button"
          className="group-demo-mode"
          onClick={() => setDark(!dark)}
        >
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
