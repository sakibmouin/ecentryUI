// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Prose } from "./prose.js";
afterEach(cleanup);
describe("Prose", () => {
  it("renders structured text in a semantic article and forwards its ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Prose ref={ref} aria-label="Guide">
        <h2>Overview</h2>
        <p>Read the details.</p>
      </Prose>,
    );
    const article = screen.getByRole("article", { name: "Guide" });
    expect(ref.current).toBe(article);
    expect(screen.getByRole("heading", { name: "Overview" })).toBeTruthy();
  });
  it("preserves nested markup and custom class names", () => {
    render(
      <Prose className="custom" data-testid="prose">
        <ul>
          <li>One</li>
        </ul>
      </Prose>,
    );
    expect(screen.getByTestId("prose").className).toContain("custom");
    expect(screen.getByRole("listitem").textContent).toBe("One");
  });
});
