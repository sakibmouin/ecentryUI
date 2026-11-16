// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Listbox } from "./listbox.js";

afterEach(cleanup);
const groups = [
  {
    label: "Fruit",
    options: [
      { value: "apple", label: "Apple" },
      { value: "apricot", label: "Apricot" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { value: "carrot", label: "Carrot", disabled: true },
      { value: "celery", label: "Celery" },
    ],
  },
];
describe("Listbox", () => {
  it("selects one option with keyboard and moves across groups", () => {
    render(<Listbox label="Food" groups={groups} />);
    const list = screen.getByRole("listbox", { name: "Food" });
    fireEvent.keyDown(list, { key: "ArrowDown" });
    expect(list.getAttribute("aria-activedescendant")).toContain("option-1");
    fireEvent.keyDown(list, { key: "ArrowDown" });
    expect(list.getAttribute("aria-activedescendant")).toContain("option-3");
    fireEvent.keyDown(list, { key: "Enter" });
    expect(
      screen
        .getByRole("option", { name: "Celery" })
        .getAttribute("aria-selected"),
    ).toBe("true");
  });
  it("supports multiple selection, form values and reset", () => {
    render(
      <form aria-label="Choices">
        <Listbox
          label="Food"
          groups={groups}
          name="food"
          multiple
          defaultValue={["apple"]}
        />
        <button type="reset">Reset</button>
      </form>,
    );
    const list = screen.getByRole("listbox", { name: "Food" });
    fireEvent.click(screen.getByRole("option", { name: "Celery" }));
    expect(new FormData(list.closest("form")!).getAll("food")).toEqual([
      "apple",
      "celery",
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(
      screen
        .getByRole("option", { name: "Celery" })
        .getAttribute("aria-selected"),
    ).toBe("false");
  });
  it("typeahead moves the active option and controlled values update", () => {
    function Example() {
      const [value, setValue] = useState<string | string[]>("apple");
      return (
        <Listbox
          label="Food"
          groups={groups}
          value={value}
          onValueChange={setValue}
        />
      );
    }
    render(<Example />);
    const list = screen.getByRole("listbox", { name: "Food" });
    fireEvent.keyDown(list, { key: "c" });
    expect(list.getAttribute("aria-activedescendant")).toContain("option-3");
    fireEvent.keyDown(list, { key: " " });
    expect(
      screen
        .getByRole("option", { name: "Celery" })
        .getAttribute("aria-selected"),
    ).toBe("true");
  });
});
