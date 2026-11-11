// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Kbd } from "./kbd.js";
afterEach(cleanup);
describe("Kbd", () => {
  it("renders a keyboard input element and forwards its ref and native props", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Kbd ref={ref} title="Control key" data-testid="key">
        Ctrl
      </Kbd>,
    );
    const key = screen.getByTestId("key");
    expect(key.tagName).toBe("KBD");
    expect(key.textContent).toBe("Ctrl");
    expect(key.title).toBe("Control key");
    expect(ref.current).toBe(key);
  });
  it("allows a semantic host override", () => {
    render(
      <Kbd as="span" className="custom" data-testid="key">
        Shift
      </Kbd>,
    );
    const key = screen.getByTestId("key");
    expect(key.tagName).toBe("SPAN");
    expect(key.className).toContain("custom");
  });
});
