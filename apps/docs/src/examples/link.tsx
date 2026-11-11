import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Link } from "../../../../packages/react/src/components/link/link.js";
import "../../../../packages/react/src/components/link/link.css";

export function LinkExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="code-demo" role="region" aria-label="Link examples">
        <p>
          Explore the <Link href="/components/button/">Button guide</Link> or
          visit{" "}
          <Link href="https://react.dev" external>
            React documentation
          </Link>
          .
        </p>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
