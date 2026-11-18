// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { ToggleTip } from "./toggle-tip.js";

afterEach(cleanup);
describe("ToggleTip", () => {
  it("opens with focus and closes on Escape", () => {
    render(
      <ToggleTip label="About privacy" title="Privacy">
        Only you can see this.
      </ToggleTip>,
    );
    const trigger = screen.getByRole("button", { name: "About privacy" });
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Privacy" });
    expect(document.activeElement).toBe(dialog);
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
  it("supports controlled state and outside dismiss", () => {
    const onChange = vi.fn();
    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <ToggleTip
            label="Help"
            title="Help"
            open={open}
            onOpenChange={(next) => {
              onChange(next);
              setOpen(next);
            }}
          >
            Text
          </ToggleTip>
          <button type="button">Outside</button>
        </>
      );
    }
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Help" }));
    expect(onChange).toHaveBeenCalledWith(true);
    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
