import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import {
  LinkBox,
  LinkOverlay,
} from "../../../../packages/react/src/components/link-overlay/link-overlay.js";
import "../../../../packages/react/src/components/link-overlay/link-overlay.css";

export function LinkOverlayExample() {
  const [dark, setDark] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo"
        role="region"
        aria-label="Link overlay example"
      >
        <LinkBox className="link-overlay-demo-card" data-testid="link-card">
          <h2>
            <LinkOverlay href="/components/button/">Button guide</LinkOverlay>
          </h2>
          <p>Inspect the component contract and its examples.</p>
          <button type="button" onClick={() => setSaved(!saved)}>
            {saved ? "Saved" : "Save"}
          </button>
        </LinkBox>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
