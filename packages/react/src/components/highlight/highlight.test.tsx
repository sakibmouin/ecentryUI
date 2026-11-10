// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Highlight } from "./highlight.js";
afterEach(cleanup);
describe("Highlight", () => {
  it("renders semantic mark content", () => {
    render(<Highlight data-testid="highlight">Found</Highlight>);
    expect(screen.getByTestId("highlight").tagName).toBe("MARK");
  });
  it("supports a custom host and native styles", () => {
    render(
      <Highlight
        as="span"
        style={{ background: "yellow" }}
        data-testid="highlight"
      >
        Found
      </Highlight>,
    );
    const item = screen.getByTestId("highlight");
    expect(item.tagName).toBe("SPAN");
    expect(item.style.background).toBe("yellow");
  });
});
