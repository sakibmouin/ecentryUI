// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Blockquote } from "./blockquote.js";

afterEach(cleanup);

describe("Blockquote", () => {
  it("uses a semantic blockquote host and forwards cite, attributes, and ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Blockquote ref={ref} cite="https://example.com" data-testid="quote">
        A considered sentence.
      </Blockquote>,
    );
    const quote = screen.getByTestId("quote");
    expect(quote.tagName).toBe("BLOCKQUOTE");
    expect(quote.getAttribute("cite")).toBe("https://example.com");
    expect(ref.current).toBe(quote);
    expect(quote.textContent).toContain("A considered sentence.");
  });

  it("supports a semantic custom host and preserves native style overrides", () => {
    render(
      <Blockquote
        as="figure"
        className="custom"
        style={{ maxWidth: "40ch" }}
        aria-label="A quotation"
        data-testid="quote"
      >
        <p>Readable text that can wrap without overflowing.</p>
        <cite>Author</cite>
      </Blockquote>,
    );
    const quote = screen.getByTestId("quote");
    expect(quote.tagName).toBe("FIGURE");
    expect(quote.className).toContain("ec-blockquote");
    expect(quote.className).toContain("custom");
    expect(quote.style.maxWidth).toBe("40ch");
    expect(screen.getByText("Author").tagName).toBe("CITE");
  });
});
