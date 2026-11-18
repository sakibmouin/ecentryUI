// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { OverlayManager } from "./overlay-manager.js";

HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "");
};
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
};
afterEach(cleanup);

const overlays = [
  {
    id: "settings",
    title: "Settings",
    triggerLabel: "Open settings",
    children: "Settings content",
  },
  {
    id: "advanced",
    parentId: "settings",
    title: "Advanced",
    triggerLabel: "Open advanced",
    children: "Advanced content",
  },
];

describe("OverlayManager", () => {
  it("opens nested dialogs and closes the topmost with Escape", () => {
    render(<OverlayManager overlays={overlays} />);
    const trigger = screen.getByRole("button", { name: "Open settings" });
    fireEvent.click(trigger);
    expect(
      screen.getByRole("dialog", { name: "Settings" }).hasAttribute("open"),
    ).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Open advanced" }));
    const advanced = screen.getByRole("dialog", { name: "Advanced" });
    expect(advanced.hasAttribute("open")).toBe(true);
    fireEvent(
      advanced,
      new Event("cancel", { bubbles: true, cancelable: true }),
    );
    expect(advanced.hasAttribute("open")).toBe(false);
    expect(
      screen.getByRole("dialog", { name: "Settings" }).hasAttribute("open"),
    ).toBe(true);
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Open advanced" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Close Settings" }));
    expect(document.activeElement).toBe(trigger);
  });
  it("supports controlled overlay stacks", () => {
    const onChange = vi.fn();
    function Example() {
      const [ids, setIds] = useState<string[]>([]);
      return (
        <OverlayManager
          overlays={overlays}
          openIds={ids}
          onOpenIdsChange={(next) => {
            onChange(next);
            setIds(next);
          }}
        />
      );
    }
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Open settings" }));
    expect(onChange).toHaveBeenCalledWith(["settings"]);
  });
});
