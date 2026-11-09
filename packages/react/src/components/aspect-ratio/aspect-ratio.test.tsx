// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { AspectRatio } from "./aspect-ratio.js";

afterEach(cleanup);

describe("AspectRatio", () => {
  it("uses a 16:9 default and preserves native media accessibility", () => {
    const ref = createRef<HTMLElement>();
    render(
      <AspectRatio ref={ref} data-testid="frame">
        <iframe title="Demo video" src="about:blank" />
      </AspectRatio>,
    );
    const frame = screen.getByTestId("frame");
    expect(frame.tagName).toBe("DIV");
    expect(frame.style.getPropertyValue("--ec-aspect-ratio")).toBe(
      String(16 / 9),
    );
    expect(screen.getByTitle("Demo video").tagName).toBe("IFRAME");
    expect(ref.current).toBe(frame);
  });

  it("supports numeric ratios, a custom host, and style overrides", () => {
    render(
      <AspectRatio
        as="figure"
        ratio={1}
        style={{ maxWidth: 200 }}
        className="custom"
        data-testid="frame"
      >
        <img alt="Landscape" src="about:blank" />
      </AspectRatio>,
    );
    const frame = screen.getByTestId("frame");
    expect(frame.tagName).toBe("FIGURE");
    expect(frame.style.getPropertyValue("--ec-aspect-ratio")).toBe("1");
    expect(frame.style.maxWidth).toBe("200px");
    expect(frame.className).toContain("custom");
  });

  it("rejects nonpositive or nonfinite ratios", () => {
    expect(() =>
      render(
        <AspectRatio ratio={0}>
          <span />
        </AspectRatio>,
      ),
    ).toThrow(RangeError);
    expect(() =>
      render(
        <AspectRatio ratio={Infinity}>
          <span />
        </AspectRatio>,
      ),
    ).toThrow(RangeError);
  });
});
