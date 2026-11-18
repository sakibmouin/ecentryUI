import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Carousel } from "../../../../packages/react/src/components/carousel/carousel.js";
import "../../../../packages/react/src/components/carousel/carousel.css";

export function CarouselExample() {
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Carousel example"
      >
        <Carousel
          label="Project highlights"
          loop
          autoplay
          interval={5000}
          slides={[
            {
              id: "plan",
              label: "Plan",
              content: (
                <>
                  <span className="carousel-demo-kicker">01 / PLAN</span>
                  <h3 className="carousel-demo-title">
                    Shape the next release
                  </h3>
                  <p>
                    Bring design and engineering decisions into one shared view.
                  </p>
                </>
              ),
            },
            {
              id: "build",
              label: "Build",
              content: (
                <>
                  <span className="carousel-demo-kicker">02 / BUILD</span>
                  <h3 className="carousel-demo-title">Make progress visible</h3>
                  <p>
                    Keep the team aligned as ideas become working components.
                  </p>
                </>
              ),
            },
            {
              id: "ship",
              label: "Ship",
              content: (
                <>
                  <span className="carousel-demo-kicker">03 / SHIP</span>
                  <h3 className="carousel-demo-title">
                    Deliver with confidence
                  </h3>
                  <p>Review what changed and make the handoff clear.</p>
                </>
              ),
            },
          ]}
        />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
