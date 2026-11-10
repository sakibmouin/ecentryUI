import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Stack } from "../../../../packages/react/src/components/stack/stack.js";
import "../../../../packages/react/src/components/stack/stack.css";

export function StackExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="stack-demo" role="region" aria-label="Stack examples">
        <div className="stack-demo-heading">
          <span className="stack-demo-label">RESPONSIVE STACK</span>
          <strong>Keep related content together</strong>
          <p>Stack follows one axis while preserving natural content height.</p>
        </div>
        <Stack
          as="section"
          aria-label="Project summary"
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "center" }}
          justify="space-between"
          gap={{ base: 12, md: 20 }}
          className="stack-demo-items"
          data-testid="responsive-stack"
        >
          {["Overview", "Activity", "Settings"].map((item) => (
            <article key={item} className="stack-demo-card">
              <strong>{item}</strong>
              <span>Workspace section</span>
            </article>
          ))}
        </Stack>
        <Stack
          dir="rtl"
          gap={8}
          className="stack-demo-rtl"
          data-testid="rtl-stack"
        >
          <span>الأول</span>
          <span>الثاني</span>
          <span>الثالث</span>
        </Stack>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
