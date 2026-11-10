// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Wrap } from "./wrap.js";

afterEach(cleanup);

describe("Wrap", () => {
  it("renders a semantic host and forwards a ref", () => {
    const ref = createRef<HTMLElement>();
    render(<Wrap as="nav" ref={ref} data-testid="wrap" />);
    expect(screen.getByTestId("wrap").tagName).toBe("NAV");
    expect(ref.current).toBe(screen.getByTestId("wrap"));
  });

  it("emits responsive alignment and independent gaps", () => {
    render(
      <Wrap
        align={{ base: "center", md: "flex-start" }}
        justify="space-between"
        gap={{ base: 8, lg: "1rem" }}
        rowGap={12}
        columnGap={{ sm: 16 }}
        data-testid="wrap"
      />,
    );
    const wrap = screen.getByTestId("wrap");
    expect(wrap.style.getPropertyValue("--ec-wrap-align-md")).toBe(
      "flex-start",
    );
    expect(wrap.style.getPropertyValue("--ec-wrap-gap-base")).toBe("8px");
    expect(wrap.style.getPropertyValue("--ec-wrap-gap-lg")).toBe("1rem");
    expect(wrap.style.getPropertyValue("--ec-wrap-row-gap-base")).toBe("12px");
    expect(wrap.style.getPropertyValue("--ec-wrap-column-gap-sm")).toBe("16px");
    expect(wrap.hasAttribute("align")).toBe(false);
  });

  it("preserves child order for RTL and rejects invalid numeric values", () => {
    render(
      <Wrap dir="rtl" data-testid="wrap">
        <span>First</span>
        <span>Second</span>
      </Wrap>,
    );
    const wrap = screen.getByTestId("wrap");
    expect(wrap.firstElementChild?.textContent).toBe("First");
    expect(wrap.lastElementChild?.textContent).toBe("Second");
    expect(() => render(<Wrap rowGap={Infinity} />)).toThrow(RangeError);
  });
});
