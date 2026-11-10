// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Group } from "./group.js";

afterEach(cleanup);

describe("Group", () => {
  it("renders a semantic host and preserves child button behavior", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Group as="nav" ref={ref} aria-label="Actions" data-testid="group">
        <button type="button">Save</button>
        <button type="button">Cancel</button>
      </Group>,
    );
    const group = screen.getByTestId("group");
    expect(group.tagName).toBe("NAV");
    expect(ref.current).toBe(group);
    expect(screen.getByRole("button", { name: "Save" })).toBe(
      group.firstElementChild,
    );
  });

  it("emits attached, grow, orientation, and responsive gap", () => {
    render(
      <Group
        attached
        grow
        orientation="vertical"
        gap={{ base: 8, md: "1rem" }}
        data-testid="group"
      >
        <button>One</button>
        <button>Two</button>
      </Group>,
    );
    const group = screen.getByTestId("group");
    expect(group.getAttribute("data-attached")).toBe("true");
    expect(group.getAttribute("data-grow")).toBe("true");
    expect(group.getAttribute("data-orientation")).toBe("vertical");
    expect(group.style.getPropertyValue("--ec-group-gap-base")).toBe("8px");
    expect(group.hasAttribute("orientation")).toBe(false);
  });

  it("supports inline display, native overrides, and rejects invalid gaps", () => {
    render(<Group inline gap={8} style={{ gap: 20 }} data-testid="group" />);
    expect(screen.getByTestId("group").className).toContain("ec-group--inline");
    expect(screen.getByTestId("group").style.gap).toBe("20px");
    expect(() => render(<Group gap={Infinity} />)).toThrow(RangeError);
  });
});
