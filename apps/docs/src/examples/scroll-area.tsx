import { useRef, useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { ScrollArea } from "../../../../packages/react/src/components/scroll-area/scroll-area.js";
import "../../../../packages/react/src/components/scroll-area/scroll-area.css";

const updates = [
  ["09:12", "Design tokens reviewed"],
  ["09:28", "Navigation draft shared"],
  ["10:04", "Button states approved"],
  ["10:35", "Mobile layout refined"],
  ["11:08", "Accessibility audit passed"],
  ["11:42", "Preview build available"],
  ["12:16", "Documentation updated"],
  ["13:03", "Release notes prepared"],
];

export function ScrollAreaExample() {
  const [dark, setDark] = useState(false);
  const [variant, setVariant] = useState<"hover" | "always">("hover");
  const [size, setSize] = useState<"xs" | "sm" | "md" | "lg">("md");
  const listRef = useRef<HTMLElement>(null);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="scroll-area-demo"
        role="region"
        aria-label="Scroll Area examples"
      >
        <div className="scroll-area-demo-controls">
          <label htmlFor="scroll-variant">Scrollbar</label>
          <select
            id="scroll-variant"
            value={variant}
            onChange={(event) =>
              setVariant(event.target.value as "hover" | "always")
            }
          >
            <option value="hover">On hover</option>
            <option value="always">Always visible</option>
          </select>
          <label htmlFor="scroll-size">Size</label>
          <select
            id="scroll-size"
            value={size}
            onChange={(event) =>
              setSize(event.target.value as "xs" | "sm" | "md" | "lg")
            }
          >
            <option value="xs">Extra small</option>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>
        <span className="scroll-area-demo-label">VERTICAL ACTIVITY</span>
        <ScrollArea
          ref={listRef}
          aria-label="Recent activity"
          variant={variant}
          size={size}
          maxHeight={{ base: 180, md: 220 }}
          className="scroll-area-demo-list"
          data-testid="vertical-scroll-area"
        >
          {updates.map(([time, title]) => (
            <div key={time} className="scroll-area-demo-row">
              <time>{time}</time>
              <span>{title}</span>
            </div>
          ))}
        </ScrollArea>
        <div className="scroll-area-demo-actions">
          <button
            type="button"
            onClick={() =>
              listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
            }
          >
            Scroll to bottom
          </button>
          <button
            type="button"
            onClick={() => listRef.current?.scrollTo({ top: 0 })}
          >
            Scroll to top
          </button>
        </div>
        <span className="scroll-area-demo-label">HORIZONTAL AND RTL</span>
        <ScrollArea
          axis="horizontal"
          variant="always"
          size="sm"
          aria-label="Project stages"
          className="scroll-area-demo-horizontal"
          data-testid="horizontal-scroll-area"
        >
          <div className="scroll-area-demo-track">
            {[
              "Research",
              "Design",
              "Prototype",
              "Review",
              "Build",
              "Launch",
            ].map((stage) => (
              <span key={stage}>{stage}</span>
            ))}
          </div>
        </ScrollArea>
        <ScrollArea
          axis="horizontal"
          dir="rtl"
          aria-label="RTL project stages"
          className="scroll-area-demo-horizontal"
          data-testid="rtl-scroll-area"
        >
          <div className="scroll-area-demo-track">
            {["بحث", "تصميم", "نموذج", "مراجعة", "بناء", "إطلاق"].map(
              (stage) => (
                <span key={stage}>{stage}</span>
              ),
            )}
          </div>
        </ScrollArea>
        <span className="scroll-area-demo-label">BOTH AXES</span>
        <ScrollArea
          axis="both"
          variant="always"
          maxHeight={128}
          maxWidth={300}
          aria-label="Planning matrix"
          className="scroll-area-demo-horizontal"
          data-testid="both-scroll-area"
        >
          <div className="scroll-area-demo-matrix">
            {Array.from({ length: 15 }, (_, index) => (
              <span key={index}>Cell {index + 1}</span>
            ))}
          </div>
        </ScrollArea>
        <button
          type="button"
          className="scroll-area-demo-mode"
          onClick={() => setDark(!dark)}
        >
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
