// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Separator } from "./separator.js";

afterEach(cleanup);

describe("Separator", () => {
  it("renders a decorative line with a semantic host and forwarded ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Separator as="span" ref={ref} className="custom" data-testid="line" />,
    );
    const line = screen.getByTestId("line");
    expect(line.tagName).toBe("SPAN");
    expect(line.getAttribute("role")).toBe("presentation");
    expect(line.getAttribute("aria-hidden")).toBe("true");
    expect(line.className).toContain("custom");
    expect(ref.current).toBe(line);
  });

  it("supports named semantic vertical lines, variants, and sizes", () => {
    render(
      <Separator
        decorative={false}
        orientation="vertical"
        variant="dashed"
        size="lg"
        aria-label="Sections"
        data-testid="line"
      />,
    );
    const line = screen.getByTestId("line");
    expect(line.getAttribute("role")).toBe("separator");
    expect(line.getAttribute("aria-orientation")).toBe("vertical");
    expect(line.getAttribute("aria-label")).toBe("Sections");
    expect(line.getAttribute("data-variant")).toBe("dashed");
    expect(line.getAttribute("data-size")).toBe("lg");
    expect(line.hasAttribute("variant")).toBe(false);
  });

  it("labels a line and falls back to presentation for responsive orientation", () => {
    render(
      <>
        <Separator label="OR" labelPlacement="start" data-testid="labeled" />
        <Separator
          orientation={{ base: "horizontal", md: "vertical" }}
          variant="dotted"
          data-testid="responsive"
        />
      </>,
    );
    const labeled = screen.getByTestId("labeled");
    expect(screen.getByText("OR")).toBeTruthy();
    expect(labeled.getAttribute("role")).toBe("separator");
    expect(labeled.getAttribute("aria-label")).toBe("OR");
    expect(labeled.getAttribute("data-label-placement")).toBe("start");
    const responsive = screen.getByTestId("responsive");
    expect(responsive.getAttribute("role")).toBe("presentation");
    expect(responsive.hasAttribute("aria-orientation")).toBe(false);
    expect(responsive.getAttribute("data-orientation-md")).toBe("vertical");
  });
});
