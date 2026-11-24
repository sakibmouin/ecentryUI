import { useEffect, useId, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

export function ExamplePanel({
  children,
  source,
}: {
  children: ReactNode;
  source: string;
}) {
  const id = useId();
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const next = tab === "preview" ? "code" : "preview";
      setTab(next);
      document.getElementById(`${id}-example-tab-${next}`)?.focus();
    }
  }
  return (
    <section
      className="example-panel"
      aria-label="Live example"
      aria-busy={!ready || undefined}
    >
      <div
        className="example-tabs"
        role="tablist"
        aria-label="Example view"
        inert={!ready}
        aria-hidden={!ready || undefined}
      >
        <button
          id={`${id}-example-tab-preview`}
          role="tab"
          aria-selected={tab === "preview"}
          tabIndex={tab === "preview" ? 0 : -1}
          onClick={() => setTab("preview")}
          onKeyDown={onTabKeyDown}
        >
          Preview
        </button>
        <button
          id={`${id}-example-tab-code`}
          role="tab"
          aria-selected={tab === "code"}
          tabIndex={tab === "code" ? 0 : -1}
          onClick={() => setTab("code")}
          onKeyDown={onTabKeyDown}
        >
          Code
        </button>
      </div>
      <div
        role="tabpanel"
        inert={!ready}
        aria-hidden={!ready || undefined}
        aria-labelledby={`${id}-example-tab-${tab}`}
        className={tab === "preview" ? "example-preview" : "example-code"}
      >
        {tab === "preview" ? (
          children
        ) : (
          <pre>
            <code>{source}</code>
          </pre>
        )}
      </div>
    </section>
  );
}
