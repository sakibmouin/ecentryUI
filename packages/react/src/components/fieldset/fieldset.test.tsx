// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Fieldset } from "./fieldset.js";

afterEach(cleanup);
describe("Fieldset", () => {
  it("groups controls and preserves native form reset", () => {
    render(
      <form>
        <Fieldset label="Preferences" description="Choose one">
          <label>
            <input type="radio" name="choice" value="a" defaultChecked />A
          </label>
          <label>
            <input type="radio" name="choice" value="b" />B
          </label>
        </Fieldset>
        <button type="reset">Reset</button>
      </form>,
    );
    const group = screen.getByRole("group", { name: "Preferences" });
    expect(group.getAttribute("aria-describedby")).toContain("description");
    fireEvent.click(screen.getByRole("radio", { name: "B" }));
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(
      (screen.getByRole("radio", { name: "A" }) as HTMLInputElement).checked,
    ).toBe(true);
  });
  it("disables all descendants while loading and links errors", () => {
    render(
      <Fieldset label="Account" error="Choose a value" loading>
        <label>
          <input type="checkbox" />
          Option
        </label>
      </Fieldset>,
    );
    const group = screen.getByRole("group", {
      name: "Account",
    }) as HTMLFieldSetElement;
    expect(group.disabled).toBe(true);
    expect(group.getAttribute("aria-invalid")).toBe("true");
    expect(group.getAttribute("aria-describedby")).toContain("error");
    expect(
      screen.getByRole("checkbox", { name: "Option" }).closest("fieldset")
        ?.disabled,
    ).toBe(true);
  });
});
