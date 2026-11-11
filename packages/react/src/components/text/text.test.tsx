// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Text } from "./text.js";
afterEach(cleanup);
describe("Text", () => {
  it("renders inline text by default and forwards the ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Text ref={ref} data-testid="text">
        Hello
      </Text>,
    );
    const text = screen.getByTestId("text");
    expect(text.tagName).toBe("SPAN");
    expect(text.textContent).toBe("Hello");
    expect(ref.current).toBe(text);
  });
  it("allows semantic paragraph markup, sizing, and native attributes", () => {
    render(
      <Text as="p" size="lg" weight="bold" lang="en" data-testid="text">
        A long paragraph
      </Text>,
    );
    const text = screen.getByTestId("text");
    expect(text.tagName).toBe("P");
    expect(text.getAttribute("data-ec-size")).toBe("lg");
    expect(text.getAttribute("data-ec-weight")).toBe("bold");
    expect(text.getAttribute("lang")).toBe("en");
  });
});
