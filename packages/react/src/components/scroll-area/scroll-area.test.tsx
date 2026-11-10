// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { ScrollArea } from "./scroll-area.js";

afterEach(cleanup);

describe("ScrollArea", () => {
  it("renders a named focusable region and forwards ref and native events", () => {
    const ref = createRef<HTMLElement>();
    const onScroll = vi.fn();
    render(
      <ScrollArea
        as="section"
        aria-label="Updates"
        ref={ref}
        onScroll={onScroll}
        data-testid="area"
      >
        <p>Latest update</p>
      </ScrollArea>,
    );
    const area = screen.getByTestId("area");
    expect(area.tagName).toBe("SECTION");
    expect(area.getAttribute("role")).toBe("region");
    expect(area.tabIndex).toBe(0);
    expect(ref.current).toBe(area);
    fireEvent.scroll(area);
    expect(onScroll).toHaveBeenCalledOnce();
  });

  it("supports axes, variants, sizes, and responsive maximum dimensions", () => {
    render(
      <ScrollArea
        axis="both"
        variant="always"
        size="lg"
        maxHeight={{ base: 160, md: "20rem" }}
        maxWidth={{ base: "100%", lg: 480 }}
        data-testid="area"
      />,
    );
    const area = screen.getByTestId("area");
    expect(area.getAttribute("data-axis")).toBe("both");
    expect(area.getAttribute("data-variant")).toBe("always");
    expect(area.getAttribute("data-size")).toBe("lg");
    expect(
      area.style.getPropertyValue("--ec-scroll-area-max-height-base"),
    ).toBe("160px");
    expect(area.style.getPropertyValue("--ec-scroll-area-max-height-md")).toBe(
      "20rem",
    );
    expect(area.style.getPropertyValue("--ec-scroll-area-max-width-lg")).toBe(
      "480px",
    );
    expect(area.hasAttribute("maxHeight")).toBe(false);
    expect(area.hasAttribute("axis")).toBe(false);
  });

  it("keeps unnamed regions unannounced and respects native overrides", () => {
    render(
      <ScrollArea
        axis="horizontal"
        maxHeight={120}
        tabIndex={-1}
        style={{ maxHeight: 80 }}
        className="custom"
        data-testid="area"
      />,
    );
    const area = screen.getByTestId("area");
    expect(area.hasAttribute("role")).toBe(false);
    expect(area.tabIndex).toBe(-1);
    expect(area.style.maxHeight).toBe("80px");
    expect(area.className).toContain("custom");
    expect(area.getAttribute("data-variant")).toBe("hover");
  });

  it("rejects invalid dimensions", () => {
    expect(() => render(<ScrollArea maxHeight={-1} />)).toThrow(RangeError);
    expect(() => render(<ScrollArea maxWidth={Infinity} />)).toThrow(
      RangeError,
    );
  });
});
