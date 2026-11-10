import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Code } from "../../../../packages/react/src/components/code/code.js";
import "../../../../packages/react/src/components/code/code.css";

export function CodeExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="code-demo" role="region" aria-label="Code examples">
        <p>
          Run <Code>npm run build</Code> to create a production bundle.
        </p>
        <Code block>{"const ready = true;\nconsole.log(ready);"}</Code>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
