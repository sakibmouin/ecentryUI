// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Container } from "./container.js";

afterEach(cleanup);

describe("Container", () => {
  it("renders a native div with forwarded ref and attributes", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Container ref={ref} data-testid="container" aria-label="Content">
        Hello
      </Container>,
    );
    const container = screen.getByTestId("container");
    expect(container.tagName).toBe("DIV");
    expect(container.className).toContain("ec-container");
    expect(container.getAttribute("aria-label")).toBe("Content");
    expect(ref.current).toBe(container);
  });

  it("supports semantic hosts, size presets, fluid width and centered content", () => {
    render(
      <Container
        as="main"
        maxWidth="lg"
        fluid
        centerContent
        gutter={20}
        data-testid="container"
      >
        Hello
      </Container>,
    );
    const container = screen.getByTestId("container");
    expect(container.tagName).toBe("MAIN");
    expect(container.className).toContain("ec-container--fluid");
    expect(container.className).toContain("ec-container--center-content");
    expect(container.style.getPropertyValue("--ec-container-max-width")).toBe(
      "64rem",
    );
    expect(container.style.getPropertyValue("--ec-container-gutter")).toBe(
      "20px",
    );
    expect(container.hasAttribute("fluid")).toBe(false);
  });

  it("accepts CSS lengths and lets native style override component sizing", () => {
    render(
      <Container
        maxWidth="42ch"
        gutter="2rem"
        style={{ maxWidth: 500 }}
        data-testid="container"
      />,
    );
    const container = screen.getByTestId("container");
    expect(container.style.getPropertyValue("--ec-container-max-width")).toBe(
      "42ch",
    );
    expect(container.style.getPropertyValue("--ec-container-gutter")).toBe(
      "2rem",
    );
    expect(container.style.maxWidth).toBe("500px");
  });
});
