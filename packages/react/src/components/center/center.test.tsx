// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Center, Circle, Square } from "./center.js";

afterEach(cleanup);

describe("Center", () => {
  it("renders a semantic host, forwards native attributes and a ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Center as="section" ref={ref} aria-label="Example" data-testid="center">
        Content
      </Center>,
    );
    const center = screen.getByTestId("center");
    expect(center.tagName).toBe("SECTION");
    expect(center.getAttribute("aria-label")).toBe("Example");
    expect(ref.current).toBe(center);
    expect(center.className).toContain("ec-center");
  });

  it("supports inline layout without leaking its prop", () => {
    render(
      <Center inline className="custom" data-testid="center">
        Content
      </Center>,
    );
    const center = screen.getByTestId("center");
    expect(center.className).toContain("ec-center--inline");
    expect(center.className).toContain("custom");
    expect(center.hasAttribute("inline")).toBe(false);
  });

  it("sizes Square and Circle and lets native styles override size", () => {
    render(
      <>
        <Square size={48} data-testid="square">
          1
        </Square>
        <Circle size="3rem" style={{ width: 72 }} data-testid="circle">
          2
        </Circle>
      </>,
    );
    expect(
      screen.getByTestId("square").style.getPropertyValue("--ec-center-size"),
    ).toBe("48px");
    expect(screen.getByTestId("square").className).toContain("ec-square");
    expect(
      screen.getByTestId("circle").style.getPropertyValue("--ec-center-size"),
    ).toBe("3rem");
    expect(screen.getByTestId("circle").style.width).toBe("72px");
    expect(screen.getByTestId("circle").className).toContain("ec-circle");
  });
});
