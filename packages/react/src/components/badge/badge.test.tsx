// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Badge } from "./badge.js";

afterEach(cleanup);
describe("Badge", () => {
  it("renders a plain label with native attributes and ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Badge ref={ref} data-testid="badge">
        Draft
      </Badge>,
    );
    expect(ref.current).toBe(screen.getByTestId("badge"));
    expect(ref.current?.textContent).toBe("Draft");
    expect(ref.current?.className).toContain("ec-badge--neutral");
    expect(ref.current?.hasAttribute("role")).toBe(false);
  });
  it("supports variant, size, and a busy label", () => {
    render(
      <Badge variant="success" size="sm" loading>
        Saving
      </Badge>,
    );
    const badge = screen.getByText("Saving");
    expect(badge.className).toContain("ec-badge--success");
    expect(badge.className).toContain("ec-badge--sm");
    expect(badge.getAttribute("aria-busy")).toBe("true");
  });
});
