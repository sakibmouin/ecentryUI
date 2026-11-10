import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Blockquote } from "../../../../packages/react/src/components/blockquote/blockquote.js";
import "../../../../packages/react/src/components/blockquote/blockquote.css";

export function BlockquoteExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="blockquote-demo"
        role="region"
        aria-label="Blockquote example"
      >
        <Blockquote cite="A design note">
          The details are not decoration. They are where an interface earns
          trust.
          <cite>A design note</cite>
        </Blockquote>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
