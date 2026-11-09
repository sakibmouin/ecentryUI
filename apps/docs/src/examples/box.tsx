import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Box } from "../../../../packages/react/src/components/box/box.js";
import "../../../../packages/react/src/components/box/box.css";

export function BoxExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="box-demo" role="region" aria-label="Box examples">
        <Box
          as="section"
          aria-label="Responsive card"
          padding={{ base: 16, md: 32 }}
          background="var(--ec-colors-surface)"
          color="var(--ec-colors-text)"
          className="box-demo-card"
          data-testid="responsive-box"
        >
          <span className="box-demo-eyebrow">COMPOSABLE LAYOUT</span>
          <h2>One box, many contexts</h2>
          <p>Use native semantics and design tokens with responsive spacing.</p>
          <Box
            display={{ base: "block", sm: "grid" }}
            gap={{ base: 12, md: 20 }}
            className="box-demo-grid"
            data-testid="responsive-grid"
          >
            <div>First item</div>
            <div>Second item</div>
          </Box>
        </Box>
        <div dir="rtl" className="box-demo-rtl">
          <Box
            as="aside"
            marginInline={{ base: 8, md: 16 }}
            padding={12}
            background="var(--ec-colors-surface)"
            color="var(--ec-colors-text)"
            data-testid="rtl-box"
          >
            مساحة منطقية
          </Box>
        </div>
        <button onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
