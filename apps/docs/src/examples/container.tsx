import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Container } from "../../../../packages/react/src/components/container/container.js";
import "../../../../packages/react/src/components/container/container.css";

export function ContainerExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="container-demo"
        role="region"
        aria-label="Container examples"
      >
        <div className="container-demo-frame">
          <span className="container-demo-label">CONSTRAINED · 30REM</span>
          <Container
            as="section"
            aria-label="Constrained container"
            maxWidth="30rem"
            className="container-demo-panel"
            data-testid="constrained-container"
          >
            <h2>Space for the story</h2>
            <p>
              A readable column stays centered as the surrounding viewport
              grows.
            </p>
          </Container>
        </div>
        <div className="container-demo-frame" dir="rtl">
          <span className="container-demo-label">FLUID · RTL</span>
          <Container
            as="section"
            aria-label="Fluid container"
            fluid
            gutter={20}
            centerContent
            className="container-demo-panel"
            data-testid="fluid-container"
          >
            <span data-testid="fluid-content">عرض مرن واتجاه منطقي</span>
          </Container>
        </div>
        <button onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
