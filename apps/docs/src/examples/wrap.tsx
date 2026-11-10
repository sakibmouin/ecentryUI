import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Wrap } from "../../../../packages/react/src/components/wrap/wrap.js";
import "../../../../packages/react/src/components/wrap/wrap.css";

export function WrapExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="wrap-demo" role="region" aria-label="Wrap examples">
        <span className="wrap-demo-label">RESPONSIVE WRAP</span>
        <Wrap gap={{ base: 8, md: 12 }} data-testid="responsive-wrap">
          {["Design", "Engineering", "Research", "Operations"].map((item) => (
            <span className="wrap-demo-chip" key={item}>
              {item}
            </span>
          ))}
        </Wrap>
        <Wrap dir="rtl" gap={8} data-testid="rtl-wrap">
          <span className="wrap-demo-chip">الأول</span>
          <span className="wrap-demo-chip">الثاني</span>
        </Wrap>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
