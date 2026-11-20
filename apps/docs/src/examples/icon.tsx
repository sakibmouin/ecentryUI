import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Icon } from "../../../../packages/react/src/components/icon/icon.js";
import "../../../../packages/react/src/components/icon/icon.css";

const star = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="m12 2 3.1 6.4 7.1 1-5.1 5 .9 7.1L12 18.1l-6 3.4.9-7.1-5.1-5 7.1-1L12 2Z" />
  </svg>
);

export function IconExample() {
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo icon-demo"
        role="region"
        aria-label="Icon example"
      >
        <div className="icon-demo-grid">
          <div className="icon-demo-card">
            <span className="icon-demo-caption">Meaningful icon</span>
            <Icon label="Favorite" tone="accent" size="lg">
              {star}
            </Icon>
            <span>Accessible name for standalone meaning</span>
          </div>
          <div className="icon-demo-card">
            <span className="icon-demo-caption">Decorative icon</span>
            <p>
              <Icon tone="muted" size="sm">
                {star}
              </Icon>{" "}
              Favorites
            </p>
            <span>Hidden when nearby text says the same thing</span>
          </div>
          <div className="icon-demo-card">
            <span className="icon-demo-caption">Loading state</span>
            <Icon label="Favorites" loading={loading} size="lg">
              {star}
            </Icon>
            <button type="button" onClick={() => setLoading(!loading)}>
              {loading ? "Finish loading" : "Start loading"}
            </button>
          </div>
        </div>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
