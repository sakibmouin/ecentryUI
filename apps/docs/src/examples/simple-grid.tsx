import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { SimpleGrid } from "../../../../packages/react/src/components/simple-grid/simple-grid.js";
import "../../../../packages/react/src/components/simple-grid/simple-grid.css";

export function SimpleGridExample() {
  const [dark, setDark] = useState(false);
  const [mode, setMode] = useState<"columns" | "auto">("columns");
  const [spacing, setSpacing] = useState(16);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="simple-grid-demo"
        role="region"
        aria-label="Simple Grid examples"
      >
        <div className="simple-grid-demo-header">
          <div>
            <span className="simple-grid-demo-kicker">LAYOUT STUDY</span>
            <strong>Cards, arranged simply</strong>
            <p>Pick a track count or let the cards fit themselves.</p>
          </div>
          <button type="button" onClick={() => setDark(!dark)}>
            {dark ? "Light mode" : "Dark mode"}
          </button>
        </div>
        <div className="simple-grid-demo-controls">
          <div>
            <label htmlFor="simple-grid-mode">Layout</label>
            <select
              id="simple-grid-mode"
              value={mode}
              onChange={(event) => setMode(event.target.value as typeof mode)}
            >
              <option value="columns">Responsive columns</option>
              <option value="auto">Auto fit</option>
            </select>
          </div>
          <div>
            <label htmlFor="simple-grid-gap">Gap</label>
            <select
              id="simple-grid-gap"
              value={spacing}
              onChange={(event) => setSpacing(Number(event.target.value))}
            >
              <option value={8}>Compact</option>
              <option value={16}>Comfortable</option>
              <option value={24}>Spacious</option>
            </select>
          </div>
        </div>
        <SimpleGrid
          as="section"
          aria-label="Project cards"
          columns={mode === "columns" ? { base: 1, sm: 2, lg: 3 } : undefined}
          minChildWidth={mode === "auto" ? 150 : undefined}
          gap={spacing}
          data-testid="simple-grid-example"
        >
          {[
            "Overview",
            "Analytics",
            "Projects",
            "Messages",
            "Calendar",
            "Settings",
          ].map((title, index) => (
            <article className="simple-grid-demo-card" key={title}>
              <span className="simple-grid-demo-icon" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{title}</strong>
              <span>Workspace section</span>
            </article>
          ))}
        </SimpleGrid>
        <div className="simple-grid-demo-footer">
          <span>Six cards</span>
          <span>Responsive by default</span>
        </div>
        <span className="simple-grid-demo-kicker">RIGHT TO LEFT</span>
        <SimpleGrid columns={3} gap={8} dir="rtl" data-testid="simple-grid-rtl">
          <span className="simple-grid-demo-rtl">الأول</span>
          <span className="simple-grid-demo-rtl">الثاني</span>
          <span className="simple-grid-demo-rtl">الثالث</span>
        </SimpleGrid>
      </div>
    </AppearanceProvider>
  );
}
