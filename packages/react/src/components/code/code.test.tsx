// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Code } from "./code.js";

afterEach(cleanup);

describe("Code", () => {
  it("renders semantic inline code and forwards attributes and ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Code ref={ref} aria-label="Command" data-testid="code">
        npm run build
      </Code>,
    );
    const code = screen.getByTestId("code");
    expect(code.tagName).toBe("CODE");
    expect(code.getAttribute("aria-label")).toBe("Command");
    expect(ref.current).toBe(code);
    expect(code.textContent).toBe("npm run build");
    expect(code.hasAttribute("block")).toBe(false);
  });

  it("supports block presentation and a semantic custom host", () => {
    render(
      <Code
        as="pre"
        block
        className="custom"
        style={{ maxWidth: "40ch" }}
        data-testid="code"
      >
        const answer = 42;
      </Code>,
    );
    const code = screen.getByTestId("code");
    expect(code.tagName).toBe("PRE");
    expect(code.getAttribute("data-block")).toBe("true");
    expect(code.className).toContain("ec-code");
    expect(code.className).toContain("custom");
    expect(code.style.maxWidth).toBe("40ch");
  });
});
