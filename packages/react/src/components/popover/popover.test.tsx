// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Popover } from "./popover.js";

afterEach(cleanup);
describe("Popover", () => {
  it("opens, focuses content, closes with Escape and restores trigger focus", () => {
    render(
      <Popover triggerLabel="Open details" title="Details">
        <p>Content</p>
      </Popover>,
    );
    const trigger = screen.getByRole("button", { name: "Open details" });
    fireEvent.click(trigger);
    const panel = screen.getByRole("dialog", { name: "Details" });
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Close Details" }),
    );
    fireEvent.keyDown(panel, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
  it("closes on outside pointer and supports controlled state", () => {
    const onChange = vi.fn();
    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Popover
            triggerLabel="Open"
            title="Panel"
            open={open}
            onOpenChange={(next) => {
              onChange(next);
              setOpen(next);
            }}
          >
            Body
          </Popover>
          <button type="button">Outside</button>
        </>
      );
    }
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(onChange).toHaveBeenCalledWith(true);
    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(onChange).toHaveBeenCalledWith(false);
  });
});
