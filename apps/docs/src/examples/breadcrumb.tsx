import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Breadcrumb } from "../../../../packages/react/src/components/breadcrumb/breadcrumb.js";
import "../../../../packages/react/src/components/breadcrumb/breadcrumb.css";

export function BreadcrumbExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Breadcrumb example"
      >
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Button", href: "/components/button/" },
            { label: "Breadcrumb" },
          ]}
        />
        <div dir="rtl">
          <Breadcrumb
            aria-label="RTL breadcrumb"
            separator="›"
            items={[{ label: "الرئيسية", href: "/" }, { label: "التصميم" }]}
          />
        </div>
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
