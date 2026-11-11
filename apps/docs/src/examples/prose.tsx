import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Prose } from "../../../../packages/react/src/components/prose/prose.js";
import "../../../../packages/react/src/components/prose/prose.css";

export function ProseExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="code-demo" role="region" aria-label="Prose example">
        <Prose aria-label="Getting started guide">
          <h2>A readable page</h2>
          <p>
            Compose paragraphs, links, lists, and code in a calm reading
            measure.
          </p>
          <ul>
            <li>Write clear copy</li>
            <li>Keep structure semantic</li>
          </ul>
          <p>
            Read the <a href="/components/link/">Link guide</a> for navigation.
          </p>
        </Prose>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
