// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Card } from "./card.js";

afterEach(cleanup);
describe("Card", () => {
  it("renders a labelled article with content and footer", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Card
        ref={ref}
        heading="Release notes"
        description="Version 2"
        footer={<a href="/notes">Read notes</a>}
      >
        <p>Three updates.</p>
      </Card>,
    );
    const card = screen.getByRole("article", { name: "Release notes" });
    expect(ref.current).toBe(card);
    expect(card.textContent).toContain("Three updates.");
    expect(screen.getByRole("link", { name: "Read notes" })).toBeTruthy();
  });
  it("supports loading, variants, and a plain content card", () => {
    const { rerender } = render(
      <Card heading="Report" loading variant="elevated">
        Preparing
      </Card>,
    );
    const card = screen.getByRole("article", { name: "Report" });
    expect(card.getAttribute("aria-busy")).toBe("true");
    expect(card.className).toContain("ec-card--elevated");
    rerender(<Card>Plain content</Card>);
    expect(
      screen
        .getByText("Plain content")
        .closest("article")
        ?.hasAttribute("aria-labelledby"),
    ).toBe(false);
  });
});
