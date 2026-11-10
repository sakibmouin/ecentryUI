import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Separator } from "../../../../packages/react/src/components/separator/separator.js";
import "../../../../packages/react/src/components/separator/separator.css";

export function SeparatorExample() {
  const [dark, setDark] = useState(false);
  const [variant, setVariant] = useState<"solid" | "dashed" | "dotted">(
    "solid",
  );
  const [size, setSize] = useState<"xs" | "sm" | "md" | "lg">("sm");
  const [placement, setPlacement] = useState<"start" | "center" | "end">(
    "center",
  );
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="separator-demo"
        role="region"
        aria-label="Separator examples"
      >
        <div className="separator-demo-controls">
          <label htmlFor="separator-variant">Line</label>
          <select
            id="separator-variant"
            value={variant}
            onChange={(event) =>
              setVariant(event.target.value as typeof variant)
            }
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
          </select>
          <label htmlFor="separator-size">Weight</label>
          <select
            id="separator-size"
            value={size}
            onChange={(event) => setSize(event.target.value as typeof size)}
          >
            <option value="xs">Extra small</option>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>
        <span className="separator-demo-label">LABELED LINE</span>
        <div className="separator-demo-content">
          <p>Start a new section with a clear visual break.</p>
          <Separator
            label="OR"
            labelPlacement={placement}
            variant={variant}
            size={size}
            data-testid="labeled-separator"
          />
          <p>Continue with another option.</p>
        </div>
        <label
          className="separator-demo-placement"
          htmlFor="separator-placement"
        >
          Label position
          <select
            id="separator-placement"
            value={placement}
            onChange={(event) =>
              setPlacement(event.target.value as typeof placement)
            }
          >
            <option value="start">Start</option>
            <option value="center">Center</option>
            <option value="end">End</option>
          </select>
        </label>
        <span className="separator-demo-label">VERTICAL AND RESPONSIVE</span>
        <div className="separator-demo-responsive">
          <span>Overview</span>
          <Separator
            orientation={{ base: "horizontal", md: "vertical" }}
            data-testid="responsive-separator"
          />
          <span>Details</span>
        </div>
        <div className="separator-demo-vertical">
          <span>Profile</span>
          <Separator
            decorative={false}
            orientation="vertical"
            aria-label="Profile and settings"
            variant="dashed"
            size="md"
            data-testid="vertical-separator"
          />
          <span>Settings</span>
        </div>
        <div dir="rtl" className="separator-demo-rtl">
          <Separator
            label="البداية"
            labelPlacement="start"
            data-testid="rtl-separator"
          />
        </div>
        <button
          type="button"
          className="separator-demo-mode"
          onClick={() => setDark(!dark)}
        >
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
