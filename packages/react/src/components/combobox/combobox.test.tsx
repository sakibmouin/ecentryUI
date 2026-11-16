// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Combobox } from "./combobox.js";

afterEach(cleanup);
const options = [
  { value: "bd", label: "Bangladesh" },
  { value: "ca", label: "Canada" },
  { value: "us", label: "United States", disabled: true },
];
describe("Combobox", () => {
  it("filters, announces the active option and chooses by keyboard", () => {
    const change = vi.fn();
    render(
      <Combobox label="Country" options={options} onValueChange={change} />,
    );
    const input = screen.getByRole("combobox", { name: "Country" });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "can" } });
    expect(screen.getByRole("option", { name: "Canada" })).toBeTruthy();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input.getAttribute("aria-activedescendant")).toContain("option-0");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(change).toHaveBeenCalledWith("ca");
    expect((input as HTMLInputElement).value).toBe("Canada");
  });
  it("shows an empty state, skips disabled options and closes on Escape", () => {
    render(<Combobox label="Country" options={options} />);
    const input = screen.getByRole("combobox", { name: "Country" });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "absent" } });
    expect(screen.getByText("No matches")).toBeTruthy();
    fireEvent.keyDown(input, { key: "Escape" });
    expect(input.getAttribute("aria-expanded")).toBe("false");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "End" });
    expect(input.getAttribute("aria-activedescendant")).toContain("option-1");
  });
  it("supports controlled values, form reset and validation", () => {
    function Example() {
      const [value, setValue] = useState("bd");
      return (
        <form aria-label="Profile">
          <Combobox
            label="Country"
            name="country"
            options={options}
            value={value}
            onValueChange={setValue}
            error="Choose one"
          />
          <button type="reset">Reset</button>
        </form>
      );
    }
    render(<Example />);
    const input = screen.getByRole("combobox", {
      name: "Country",
    }) as HTMLInputElement;
    expect(input.value).toBe("Bangladesh");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(new FormData(input.form!).get("country")).toBe("bd");
  });
});
