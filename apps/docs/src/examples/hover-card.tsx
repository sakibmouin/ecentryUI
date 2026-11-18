import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { HoverCard } from "../../../../packages/react/src/components/hover-card/hover-card.js";
import "../../../../packages/react/src/components/hover-card/hover-card.css";

export function HoverCardExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Hover card example"
      >
        <HoverCard triggerLabel="Meet the team" title="Design team">
          <p>A small group shaping ecentryUI components.</p>
          <a href="#team-details">Read team details</a>
        </HoverCard>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
