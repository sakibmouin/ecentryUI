// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Select } from "./select.js";

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
describe("Select", () => {
  it("opens by keyboard, skips disabled options and chooses a value", () => {
    render(<Select label="Food" groups={groups} />);
    const trigger = screen.getByRole("button", {
      name: "Food Choose an option",
    });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    fireEvent.keyDown(trigger, { key: "End" });
    expect(trigger.getAttribute("aria-activedescendant")).toContain("option-3");
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(trigger.textContent).toContain("Celery");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });
  it("supports multiple values, groups, form submission and reset", () => {
    render(
      <form aria-label="Choices">
        <Select
          label="Food"
          groups={groups}
          name="food"
          multiple
          defaultValue={["apple"]}
        />
        <button type="reset">Reset</button>
      </form>,
    );
    const trigger = screen.getByRole("button", { name: /Food Apple/ });
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("option", { name: "Celery" }));
    expect(new FormData(trigger.closest("form")!).getAll("food")).toEqual([
      "apple",
      "celery",
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(trigger.textContent).toContain("Apple");
    expect(trigger.textContent).not.toContain("Celery");
  });
  it("supports controlled selection and Escape", () => {
    function Example() {
      const [value, setValue] = useState<string | string[]>("apple");
      return (
        <Select
          label="Food"
          groups={groups}
          value={value}
          onValueChange={setValue}
        />
      );
    }
    render(<Example />);
    const trigger = screen.getByRole("button", { name: /Food Apple/ });
    fireEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("option", { name: "Apricot" }));
    expect(trigger.textContent).toContain("Apricot");
  });
});
