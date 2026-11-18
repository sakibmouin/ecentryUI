// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Menu } from "./menu.js";

afterEach(cleanup);
const save = vi.fn();
const items = [
  { id: "open", label: "Open", onSelect: vi.fn() },
  {
    id: "export",
    label: "Export",
    children: [
      { id: "pdf", label: "PDF", onSelect: save },
      { id: "csv", label: "CSV", disabled: true },
    ],
  },
  { id: "delete", label: "Delete", disabled: true },
];
describe("Menu", () => {
  it("opens, navigates nested items and restores focus after selection", () => {
    render(<Menu triggerLabel="File actions" items={items} />);
    const trigger = screen.getByRole("button", { name: "File actions" });
    fireEvent.click(trigger);
    expect(document.activeElement).toBe(
      screen.getByRole("menuitem", { name: "Open" }),
    );
    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });
    expect(document.activeElement).toBe(
      screen.getByRole("menuitem", { name: /Export/ }),
    );
    fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });
    expect(screen.getByRole("menu", { name: "Export submenu" })).toBeTruthy();
    fireEvent.click(screen.getByRole("menuitem", { name: "PDF" }));
    expect(save).toHaveBeenCalled();
    expect(screen.queryByRole("menu", { name: "File actions" })).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
  it("supports typeahead, Escape and context trigger", () => {
    render(<Menu triggerLabel="File actions" items={items} />);
    const trigger = screen.getByRole("button", { name: "File actions" });
    fireEvent.contextMenu(trigger, { clientX: 80, clientY: 100 });
    const menu = screen.getByRole("menu", { name: "File actions" });
    expect(menu.getAttribute("data-context")).toBe("true");
    fireEvent.keyDown(screen.getByRole("menuitem", { name: "Open" }), {
      key: "e",
    });
    expect(document.activeElement).toBe(
      screen.getByRole("menuitem", { name: /Export/ }),
    );
    fireEvent.keyDown(menu, { key: "Escape" });
    expect(screen.queryByRole("menu", { name: "File actions" })).toBeNull();
  });
  it("supports controlled open state", () => {
    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <Menu
          triggerLabel="Actions"
          items={items}
          open={open}
          onOpenChange={setOpen}
        />
      );
    }
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menu", { name: "Actions" })).toBeTruthy();
  });
});
