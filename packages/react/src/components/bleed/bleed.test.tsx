// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Bleed } from "./bleed.js";

afterEach(cleanup);

describe("Bleed", () => {
  it("bleeds 16px inline by default and forwards native props and ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Bleed ref={ref} data-testid="bleed">
        Content
      </Bleed>,
    );
    const bleed = screen.getByTestId("bleed");
    expect(bleed.tagName).toBe("DIV");
    expect(bleed.style.getPropertyValue("--ec-bleed-inline-start")).toBe(
      "16px",
    );
    expect(bleed.style.getPropertyValue("--ec-bleed-inline-end")).toBe("16px");
    expect(ref.current).toBe(bleed);
  });

  it("supports block and per-edge overrides with a custom element", () => {
    render(
      <Bleed
        as="section"
        inline="2rem"
        inlineEnd={8}
        block={12}
        blockStart={4}
        className="custom"
        data-testid="bleed"
      >
        Content
      </Bleed>,
    );
    const bleed = screen.getByTestId("bleed");
    expect(bleed.tagName).toBe("SECTION");
    expect(bleed.style.getPropertyValue("--ec-bleed-inline-start")).toBe(
      "2rem",
    );
    expect(bleed.style.getPropertyValue("--ec-bleed-inline-end")).toBe("8px");
    expect(bleed.style.getPropertyValue("--ec-bleed-block-start")).toBe("4px");
    expect(bleed.style.getPropertyValue("--ec-bleed-block-end")).toBe("12px");
    expect(bleed.className).toContain("custom");
  });
});
