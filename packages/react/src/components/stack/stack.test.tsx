// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Stack } from "./stack.js";

afterEach(cleanup);

describe("Stack", () => {
  it("renders a semantic host and forwards native attributes and a ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Stack as="section" ref={ref} aria-label="Details" data-testid="stack">
        Content
      </Stack>,
    );
    const stack = screen.getByTestId("stack");
    expect(stack.tagName).toBe("SECTION");
    expect(stack.getAttribute("aria-label")).toBe("Details");
    expect(ref.current).toBe(stack);
  });

  it("emits responsive layout variables and consumes its props", () => {
    render(
      <Stack
        direction={{ base: "column", md: "row" }}
        align="stretch"
        justify={{ base: "start", lg: "space-between" }}
        gap={{ base: 8, sm: "1rem" }}
        data-testid="stack"
      />,
    );
    const stack = screen.getByTestId("stack");
    expect(stack.style.getPropertyValue("--ec-stack-direction-base")).toBe(
      "column",
    );
    expect(stack.style.getPropertyValue("--ec-stack-direction-md")).toBe("row");
    expect(stack.style.getPropertyValue("--ec-stack-justify-lg")).toBe(
      "space-between",
    );
    expect(stack.style.getPropertyValue("--ec-stack-gap-base")).toBe("8px");
    expect(stack.style.getPropertyValue("--ec-stack-gap-sm")).toBe("1rem");
    expect(stack.hasAttribute("direction")).toBe(false);
  });

  it("preserves child order for RTL and lets native style override props", () => {
    render(
      <Stack dir="rtl" gap={8} style={{ gap: 20 }} data-testid="stack">
        <span>First</span>
        <span>Second</span>
      </Stack>,
    );
    const stack = screen.getByTestId("stack");
    expect(stack.style.gap).toBe("20px");
    expect(stack.firstElementChild?.textContent).toBe("First");
    expect(stack.lastElementChild?.textContent).toBe("Second");
  });

  it("rejects non-finite numeric layout values", () => {
    expect(() => render(<Stack gap={Infinity} />)).toThrow(RangeError);
  });
});
