// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Em } from "./em.js";
afterEach(cleanup);
describe("Em", () => {
  it("renders semantic emphasis and forwards ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Em ref={ref} aria-label="Emphasis" data-testid="em">
        Important
      </Em>,
    );
    const em = screen.getByTestId("em");
    expect(em.tagName).toBe("EM");
    expect(em.getAttribute("aria-label")).toBe("Emphasis");
    expect(ref.current).toBe(em);
  });
  it("supports a custom host and style override", () => {
    render(
      <Em as="span" style={{ fontStyle: "normal" }} data-testid="em">
        Text
      </Em>,
    );
    const em = screen.getByTestId("em");
    expect(em.tagName).toBe("SPAN");
    expect(em.className).toContain("ec-em");
    expect(em.style.fontStyle).toBe("normal");
  });
});
