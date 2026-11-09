// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { AbsoluteCenter } from "./absolute-center.js";

afterEach(cleanup);

describe("AbsoluteCenter", () => {
  it("centers both axes by default and forwards native props and ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <AbsoluteCenter ref={ref} data-testid="center">
        Centered
      </AbsoluteCenter>,
    );
    const center = screen.getByTestId("center");
    expect(center.tagName).toBe("DIV");
    expect(center.getAttribute("data-ec-axis")).toBe("both");
    expect(center.textContent).toBe("Centered");
    expect(ref.current).toBe(center);
  });

  it("supports each axis and a custom host element", () => {
    render(
      <>
        <AbsoluteCenter
          axis="horizontal"
          as="span"
          className="custom"
          data-testid="horizontal"
        >
          Horizontal
        </AbsoluteCenter>
        <AbsoluteCenter axis="vertical" data-testid="vertical">
          Vertical
        </AbsoluteCenter>
      </>,
    );
    const horizontal = screen.getByTestId("horizontal");
    expect(horizontal.tagName).toBe("SPAN");
    expect(horizontal.className).toContain("custom");
    expect(horizontal.getAttribute("data-ec-axis")).toBe("horizontal");
    expect(screen.getByTestId("vertical").getAttribute("data-ec-axis")).toBe(
      "vertical",
    );
  });
});
