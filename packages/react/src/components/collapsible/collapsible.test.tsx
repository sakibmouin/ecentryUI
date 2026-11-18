// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Collapsible } from "./collapsible.js";

afterEach(cleanup);
describe("Collapsible", () => {
  it("toggles its associated panel with a native button", () => {
    const onOpenChange = vi.fn();
    render(
      <Collapsible title="Details" onOpenChange={onOpenChange}>
        More information
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: "Details" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("More information")).toBeNull();
    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("region", { name: "Details" }).textContent).toBe(
      "More information",
    );
    expect(trigger.getAttribute("aria-controls")).toBe(
      screen.getByRole("region").id,
    );
    expect(onOpenChange).toHaveBeenCalledWith(true);
    fireEvent.click(trigger);
    expect(screen.queryByRole("region")).toBeNull();
  });
  it("supports controlled and default open state", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Collapsible title="Settings" defaultOpen>
        Options
      </Collapsible>,
    );
    expect(screen.getByRole("region", { name: "Settings" })).toBeTruthy();
    rerender(
      <Collapsible title="Settings" open={false} onOpenChange={onOpenChange}>
        Options
      </Collapsible>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("region")).toBeNull();
  });
  it("locks disabled and loading triggers", () => {
    const { unmount } = render(
      <Collapsible title="Locked" disabled>
        Hidden
      </Collapsible>,
    );
    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true);
    unmount();
    render(
      <Collapsible title="Locked" loading defaultOpen>
        Visible
      </Collapsible>,
    );
    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true);
    expect(screen.getByRole("region").getAttribute("aria-busy")).toBe("true");
  });
});
