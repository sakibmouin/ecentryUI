import { useRef, useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Tag } from "../../../../packages/react/src/components/tag/index.js";

export function TagExample() {
  const [visible, setVisible] = useState(true);
  const [dark, setDark] = useState(false);
  const restore = useRef<HTMLButtonElement>(null);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Tag example"
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Tag size="sm">Research</Tag>
          {visible && (
            <Tag
              variant="accent"
              removeLabel="Remove Design"
              onRemove={() => {
                setVisible(false);
                restore.current?.focus();
              }}
            >
              Design
            </Tag>
          )}
        </div>
        <button type="button" ref={restore} onClick={() => setVisible(true)}>
          Restore Design tag
        </button>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
