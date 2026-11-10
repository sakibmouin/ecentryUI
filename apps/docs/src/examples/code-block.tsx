import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { CodeBlock } from "../../../../packages/react/src/components/code-block/code-block.js";
import "../../../../packages/react/src/components/code-block/code-block.css";

export function CodeBlockExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-block-demo"
        role="region"
        aria-label="Code block example"
      >
        <CodeBlock collapsible data-testid="code-block-example">
          {"export function greet(name) {\n  return `Hello, ${name}`;\n}"}
        </CodeBlock>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
