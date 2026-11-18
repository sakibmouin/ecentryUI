// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { ActionBar } from "./action-bar.js";

afterEach(cleanup);
describe("ActionBar", () => {
  it("opens, focuses actions, navigates and restores focus on Escape", () => {
    const save = vi.fn();
    render(
      <ActionBar
        label="Selected items"
        triggerLabel="Show actions"
        actions={[
          { id: "save", label: "Save", onSelect: save },
          { id: "delete", label: "Delete", onSelect: vi.fn() },
        ]}
      />,
    );
    const trigger = screen.getByRole("button", { name: "Show actions" });
    fireEvent.click(trigger);
    const toolbar = screen.getByRole("toolbar", { name: "Selected items" });
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Save" }),
    );
    fireEvent.keyDown(toolbar, { key: "ArrowRight" });
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Delete" }),
    );
    fireEvent.keyDown(toolbar, { key: "Escape" });
    expect(screen.queryByRole("toolbar")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
  it("skips disabled actions and invokes selection", () => {
    const save = vi.fn();
    render(
      <ActionBar
        label="Actions"
        triggerLabel="Open"
        defaultOpen
        actions={[
          {
            id: "disabled",
            label: "Disabled",
            onSelect: vi.fn(),
            disabled: true,
          },
          { id: "save", label: "Save", onSelect: save },
        ]}
      />,
    );
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Save" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(save).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("toolbar")).toBeNull();
  });
  it("supports controlled open state", () => {
    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <ActionBar
          label="Actions"
          triggerLabel="Open"
          actions={[{ id: "save", label: "Save", onSelect: vi.fn() }]}
          open={open}
          onOpenChange={setOpen}
        />
      );
    }
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("toolbar", { name: "Actions" })).toBeTruthy();
  });
});
