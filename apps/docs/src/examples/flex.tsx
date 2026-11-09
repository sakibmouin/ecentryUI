import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import {
  Flex,
  Spacer,
} from "../../../../packages/react/src/components/flex/flex.js";
import "../../../../packages/react/src/components/flex/flex.css";

export function FlexExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div className="flex-demo" role="region" aria-label="Flex examples">
        <span className="flex-demo-label">RESPONSIVE DIRECTION</span>
        <Flex
          as="section"
          aria-label="Responsive items"
          direction={{ base: "column", sm: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: 12, md: 20 }}
          className="flex-demo-row"
          data-testid="responsive-flex"
        >
          <span>First item</span>
          <span>Second item</span>
          <span>Third item</span>
        </Flex>
        <span className="flex-demo-label">SPACER · RTL</span>
        <Flex
          dir="rtl"
          align="center"
          gap={12}
          className="flex-demo-toolbar"
          data-testid="spacer-flex"
        >
          <span>Start</span>
          <Spacer data-testid="spacer" />
          <span>End</span>
        </Flex>
        <button onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
