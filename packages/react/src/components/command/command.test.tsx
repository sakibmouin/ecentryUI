// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Command } from "./command.js";

afterEach(cleanup);
const groups = [
  {
    label: "Files",
    items: [
      { value: "open", label: "Open file", shortcut: "⌘ O" },
      { value: "save", label: "Save file", shortcut: "⌘ S", disabled: true },
    ],
  },
  { label: "View", items: [{ value: "theme", label: "Toggle theme" }] },
];
describe("Command", () => {
  it("searches groups, announces active result and selects by keyboard", () => {
    const selected = vi.fn();
    render(<Command label="Actions" groups={groups} onSelect={selected} />);
    const input = screen.getByRole("combobox", { name: "Actions" });
    expect(screen.getByRole("group", { name: "Files" })).toBeTruthy();
    fireEvent.change(input, { target: { value: "theme" } });
    expect(screen.queryByRole("group", { name: "Files" })).toBeNull();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input.getAttribute("aria-activedescendant")).toContain("option-0");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(selected).toHaveBeenCalledWith(
      expect.objectContaining({ value: "theme" }),
    );
  });
  it("renders shortcuts and empty state, skips disabled items", () => {
    render(<Command label="Actions" groups={groups} />);
    const input = screen.getByRole("combobox", { name: "Actions" });
    expect(screen.getByText("⌘ O")).toBeTruthy();
    fireEvent.keyDown(input, { key: "End" });
    expect(input.getAttribute("aria-activedescendant")).toContain("option-2");
    fireEvent.change(input, { target: { value: "missing" } });
    expect(screen.getByText("No commands found")).toBeTruthy();
    fireEvent.keyDown(input, { key: "Escape" });
    expect((input as HTMLInputElement).value).toBe("");
  });
  it("supports controlled selection and disabled state", () => {
    function Example() {
      const [value, setValue] = useState("open");
      return (
        <Command
          label="Actions"
          groups={groups}
          value={value}
          onValueChange={setValue}
        />
      );
    }
    render(<Example />);
    fireEvent.click(screen.getByRole("option", { name: "Toggle theme" }));
    expect(
      screen
        .getByRole("option", { name: "Toggle theme" })
        .getAttribute("aria-selected"),
    ).toBe("true");
  });
});
