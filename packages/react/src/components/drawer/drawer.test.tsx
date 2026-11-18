// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Drawer } from "./drawer.js";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});
afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});
describe("Drawer", () => {
  it("opens, locks scroll, closes and restores trigger focus", () => {
    render(
      <Drawer title="Settings" triggerLabel="Open settings" placement="left">
        <button>Inside</button>
      </Drawer>,
    );
    const trigger = screen.getByRole("button", { name: "Open settings" });
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Settings" });
    expect(dialog.getAttribute("data-ec-placement")).toBe("left");
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Close Settings" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Close Settings" }));
    expect(dialog.hasAttribute("open")).toBe(false);
    expect(document.body.style.overflow).toBe("");
    expect(document.activeElement).toBe(trigger);
  });
  it("handles Escape and controlled open state", () => {
    const changed = vi.fn();
    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <Drawer
          title="Details"
          triggerLabel="Open details"
          open={open}
          onOpenChange={(next) => {
            changed(next);
            setOpen(next);
          }}
        >
          Body
        </Drawer>
      );
    }
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Open details" }));
    fireEvent(
      screen.getByRole("dialog", { name: "Details" }),
      new Event("cancel", { bubbles: true, cancelable: true }),
    );
    expect(changed).toHaveBeenLastCalledWith(false);
    expect(screen.queryByRole("dialog", { name: "Details" })).toBeNull();
  });
  it("supports uncontrolled default open state", () => {
    render(
      <Drawer
        title="Menu"
        triggerLabel="Open menu"
        defaultOpen
        placement="bottom"
      >
        Content
      </Drawer>,
    );
    expect(
      screen
        .getByRole("dialog", { name: "Menu" })
        .getAttribute("data-ec-placement"),
    ).toBe("bottom");
  });
});
