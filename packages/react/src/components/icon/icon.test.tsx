// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Icon } from "./icon.js";

afterEach(cleanup);

describe("Icon", () => {
  it("hides decorative content from assistive technology by default", () => {
    render(<Icon data-testid="icon">★</Icon>);
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.getByTestId("icon").getAttribute("aria-hidden")).toBe("true");
  });

  it("exposes a meaningful label and keeps SVG content presentational", () => {
    render(
      <Icon label="Favorite" size="lg" tone="accent">
        <svg viewBox="0 0 24 24">
          <path d="M12 2v20" />
        </svg>
      </Icon>,
    );
    const icon = screen.getByRole("img", { name: "Favorite" });
    expect(icon.getAttribute("data-size")).toBe("lg");
    expect(icon.getAttribute("data-tone")).toBe("accent");
    expect(
      icon.querySelector(".ec-icon__content")?.getAttribute("aria-hidden"),
    ).toBe("true");
  });

  it("announces loading, hides the glyph, and restores it when ready", () => {
    const { rerender } = render(
      <Icon label="Upload" loading>
        ↑
      </Icon>,
    );
    const status = screen.getByRole("status", { name: "Loading Upload" });
    expect(status.getAttribute("aria-busy")).toBe("true");
    expect(status.textContent).toBe("");
    rerender(<Icon label="Upload">↑</Icon>);
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByRole("img", { name: "Upload" }).textContent).toBe("↑");
  });

  it("forwards span attributes and its ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Icon ref={ref} title="Favorite" className="custom">
        ★
      </Icon>,
    );
    expect(ref.current?.getAttribute("title")).toBe("Favorite");
    expect(ref.current?.className).toContain("custom");
  });
});
