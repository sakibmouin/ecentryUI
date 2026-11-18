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
import { HoverCard } from "./hover-card.js";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
describe("HoverCard", () => {
  it("opens on focus, moves to content by ArrowDown and closes on Escape", () => {
    render(
      <HoverCard triggerLabel="View profile" title="Profile">
        <a href="#details">Details</a>
      </HoverCard>,
    );
    const trigger = screen.getByRole("button", { name: "View profile" });
    fireEvent.focus(trigger);
    expect(screen.getByRole("dialog", { name: "Profile" })).toBeTruthy();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(document.activeElement).toBe(
      screen.getByRole("link", { name: "Details" }),
    );
    fireEvent.keyDown(screen.getByRole("dialog", { name: "Profile" }), {
      key: "Escape",
    });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
  it("opens after hover delay and closes after pointer leave", () => {
    vi.useFakeTimers();
    const { container } = render(
      <HoverCard
        triggerLabel="View profile"
        title="Profile"
        openDelay={100}
        closeDelay={100}
      >
        Content
      </HoverCard>,
    );
    const root = container.firstElementChild!;
    fireEvent.mouseEnter(root);
    act(() => vi.advanceTimersByTime(100));
    expect(screen.getByRole("dialog", { name: "Profile" })).toBeTruthy();
    fireEvent.mouseLeave(root);
    act(() => vi.advanceTimersByTime(100));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
  it("supports controlled state", () => {
    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <HoverCard
          triggerLabel="View"
          title="Card"
          open={open}
          onOpenChange={setOpen}
        >
          Content
        </HoverCard>
      );
    }
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "View" }));
    expect(screen.getByRole("dialog", { name: "Card" })).toBeTruthy();
  });
});
