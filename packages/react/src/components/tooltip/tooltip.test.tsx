// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { useState } from "react";
import { Tooltip } from "./tooltip.js";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
describe("Tooltip", () => {
  it("appears on focus, associates text and dismisses on Escape", () => {
    render(<Tooltip triggerLabel="Info" content="Helpful text" />);
    const trigger = screen.getByRole("button", { name: "Info" });
    fireEvent.focus(trigger);
    const tip = screen.getByRole("tooltip");
    expect(trigger.getAttribute("aria-describedby")).toBe(tip.id);
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(document.activeElement).not.toBe(tip);
  });
  it("respects hover delay and controlled state", () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <Tooltip
          triggerLabel="Info"
          content="Helpful text"
          open={open}
          onOpenChange={(next) => {
            onChange(next);
            setOpen(next);
          }}
          openDelay={100}
          closeDelay={100}
        />
      );
    }
    const { container } = render(<Example />);
    const root = container.firstElementChild!;
    fireEvent.mouseEnter(root);
    act(() => vi.advanceTimersByTime(100));
    expect(screen.getByRole("tooltip")).toBeTruthy();
    fireEvent.mouseLeave(root);
    act(() => vi.advanceTimersByTime(100));
    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(onChange).toHaveBeenCalledWith(false);
  });
});
