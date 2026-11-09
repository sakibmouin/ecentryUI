// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./dialog.js";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.show = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});
afterEach(cleanup);

function Example({
  onOpenChange = vi.fn(),
}: {
  onOpenChange?: React.ComponentProps<typeof DialogRoot>["onOpenChange"];
}) {
  return (
    <DialogRoot onOpenChange={onOpenChange}>
      <DialogTrigger>Open settings</DialogTrigger>
      <DialogContent>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>Change your preferences.</DialogDescription>
        <DialogClose>Done</DialogClose>
      </DialogContent>
    </DialogRoot>
  );
}

describe("Dialog", () => {
  it("opens uncontrolled, associates the trigger, and restores focus after close", () => {
    const onOpenChange = vi.fn();
    render(<Example onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole("button", { name: "Open settings" });
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Settings" });
    expect(dialog.hasAttribute("open")).toBe(true);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-controls")).toBe(dialog.id);
    expect(dialog.getAttribute("aria-describedby")).toBe(
      screen.getByText("Change your preferences.").id,
    );
    fireEvent.click(screen.getByRole("button", { name: "Done" }));
    expect(dialog.hasAttribute("open")).toBe(false);
    expect(document.activeElement).toBe(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(false, {
      reason: "close",
      event: expect.anything(),
    });
  });

  it("requests Escape close and respects controlled veto", () => {
    const onOpenChange = vi.fn();
    render(
      <DialogRoot open onOpenChange={onOpenChange}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Controlled</DialogTitle>
        </DialogContent>
      </DialogRoot>,
    );
    const dialog = screen.getByRole("dialog", { name: "Controlled" });
    fireEvent(dialog, new Event("cancel", { bubbles: true, cancelable: true }));
    expect(dialog.hasAttribute("open")).toBe(true);
    expect(onOpenChange).toHaveBeenCalledWith(false, {
      reason: "escape",
      event: expect.anything(),
    });
  });

  it("updates controlled state through the callback", () => {
    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <DialogRoot open={open} onOpenChange={setOpen}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Controlled</DialogTitle>
            <DialogClose>Close</DialogClose>
          </DialogContent>
        </DialogRoot>
      );
    }
    render(<Controlled />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog", { name: "Controlled" });
    expect(dialog.hasAttribute("open")).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(dialog.hasAttribute("open")).toBe(false);
  });

  it("stacks nested dialogs and restores the inner trigger", () => {
    render(
      <DialogRoot>
        <DialogTrigger>Open outer</DialogTrigger>
        <DialogContent>
          <DialogTitle>Outer</DialogTitle>
          <DialogRoot>
            <DialogTrigger>Open inner</DialogTrigger>
            <DialogContent>
              <DialogTitle>Inner</DialogTitle>
              <DialogClose>Close inner</DialogClose>
            </DialogContent>
          </DialogRoot>
        </DialogContent>
      </DialogRoot>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open outer" }));
    const innerTrigger = screen.getByRole("button", { name: "Open inner" });
    innerTrigger.focus();
    fireEvent.click(innerTrigger);
    expect(
      screen.getByRole("dialog", { name: "Inner" }).hasAttribute("open"),
    ).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Close inner" }));
    expect(document.activeElement).toBe(innerTrigger);
    expect(
      screen.getByRole("dialog", { name: "Outer" }).hasAttribute("open"),
    ).toBe(true);
  });

  it("supports an initially open nonmodal dialog and backdrop opt-out", () => {
    const show = vi.spyOn(HTMLDialogElement.prototype, "show");
    const onOpenChange = vi.fn();
    render(
      <DialogRoot defaultOpen modal={false} onOpenChange={onOpenChange}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent closeOnBackdrop={false}>
          <DialogTitle>Nonmodal</DialogTitle>
        </DialogContent>
      </DialogRoot>,
    );
    const dialog = screen.getByRole("dialog", { name: "Nonmodal" });
    expect(show).toHaveBeenCalledTimes(1);
    fireEvent.click(dialog, { clientX: -10, clientY: -10 });
    expect(dialog.hasAttribute("open")).toBe(true);
    expect(onOpenChange).not.toHaveBeenCalled();
    show.mockRestore();
  });

  it("keeps the parent open when a nested dialog receives Escape", () => {
    render(
      <DialogRoot defaultOpen>
        <DialogTrigger>Outer trigger</DialogTrigger>
        <DialogContent>
          <DialogTitle>Outer</DialogTitle>
          <DialogRoot defaultOpen>
            <DialogTrigger>Inner trigger</DialogTrigger>
            <DialogContent>
              <DialogTitle>Inner</DialogTitle>
            </DialogContent>
          </DialogRoot>
        </DialogContent>
      </DialogRoot>,
    );
    const inner = screen.getByRole("dialog", { name: "Inner" });
    fireEvent(inner, new Event("cancel", { bubbles: true, cancelable: true }));
    expect(inner.hasAttribute("open")).toBe(false);
    expect(
      screen.getByRole("dialog", { name: "Outer" }).hasAttribute("open"),
    ).toBe(true);
  });
});
