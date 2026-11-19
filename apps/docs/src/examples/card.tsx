import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Card } from "../../../../packages/react/src/components/card/card.js";
import "../../../../packages/react/src/components/card/card.css";

export function CardExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Card example"
      >
        <Card
          className="card-demo"
          heading="Release notes"
          description="November update"
          footer={
            <a className="ec-card__link" href="/components/button/">
              Read button guide
            </a>
          }
        >
          <p>New component guidance is ready for review.</p>
        </Card>
        <Card
          className="card-demo"
          heading="Activity"
          variant="elevated"
          loading
        >
          Preparing the latest activity.
        </Card>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
