import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Text } from "../../../../packages/react/src/components/text/text.js";
import "../../../../packages/react/src/components/text/text.css";
export function TextExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="code-demo" role="region" aria-label="Text example">
        <Text as="p" size="lg" weight="bold">
          Clear words for every screen.
        </Text>
        <Text as="p" size="sm">
          Supporting copy wraps naturally across narrow layouts.
        </Text>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
