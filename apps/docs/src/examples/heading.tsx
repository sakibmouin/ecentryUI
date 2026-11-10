import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Heading } from "../../../../packages/react/src/components/heading/heading.js";
import "../../../../packages/react/src/components/heading/heading.css";
export function HeadingExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="text-demo" role="region" aria-label="Heading example">
        <Heading>Make the hierarchy clear</Heading>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
