// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { TagsInput } from "./tags-input.js";

afterEach(cleanup);
describe("TagsInput", () => {
  it("adds, removes and resets tags with native form values", () => {
    render(
      <form aria-label="Skills">
        <TagsInput label="Skills" name="skills" defaultValue={["React"]} />
        <button type="reset">Reset</button>
      </form>,
    );
    const field = screen.getByRole("textbox", { name: "Skills" });
    fireEvent.change(field, { target: { value: "TypeScript" } });
    fireEvent.keyDown(field, { key: "Enter" });
    expect(
      screen.getByRole("button", { name: "Remove TypeScript" }),
    ).toBeTruthy();
    expect(
      new FormData((field as HTMLInputElement).form!).getAll("skills"),
    ).toEqual(["React", "TypeScript"]);
    fireEvent.click(screen.getByRole("button", { name: "Remove React" }));
    expect(screen.queryByRole("button", { name: "Remove React" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByRole("button", { name: "Remove React" })).toBeTruthy();
  });
  it("handles paste, deduplication, limits and Backspace", () => {
    render(<TagsInput label="Topics" maxTags={2} />);
    const field = screen.getByRole("textbox", { name: "Topics" });
    fireEvent.paste(field, {
      clipboardData: { getData: () => "One,one,Two,Three" },
    });
    expect(screen.getAllByRole("button", { name: /^Remove / })).toHaveLength(2);
    fireEvent.keyDown(field, { key: "Backspace" });
    expect(screen.getAllByRole("button", { name: /^Remove / })).toHaveLength(1);
  });
  it("edits by keyboard, cancels edits, and supports controlled values", () => {
    const changed = vi.fn();
    function Example() {
      const [value, setValue] = useState(["First"]);
      return (
        <TagsInput
          label="Tags"
          value={value}
          onValueChange={(next) => {
            changed(next);
            setValue(next);
          }}
        />
      );
    }
    render(<Example />);
    fireEvent.keyDown(screen.getByRole("button", { name: /First, press F2/ }), {
      key: "F2",
    });
    const edit = screen.getByRole("textbox", { name: "Edit First" });
    fireEvent.change(edit, { target: { value: "Revised" } });
    fireEvent.keyDown(edit, { key: "Enter" });
    expect(changed).toHaveBeenCalledWith(["Revised"]);
  });
  it("blocks changes when disabled or read-only", () => {
    render(
      <>
        <TagsInput label="Locked" defaultValue={["One"]} readOnly />
        <TagsInput label="Disabled" defaultValue={["Two"]} disabled />
      </>,
    );
    expect(screen.queryByRole("button", { name: "Remove One" })).toBeNull();
    expect(
      (screen.getByRole("textbox", { name: "Disabled" }) as HTMLInputElement)
        .disabled,
    ).toBe(true);
  });
});
