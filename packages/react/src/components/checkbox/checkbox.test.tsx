// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Checkbox } from "./checkbox.js";
afterEach(cleanup);
describe("Checkbox", () => {
  it("activates through its label and resets with the form", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <form>
        <Checkbox ref={ref} label="Accept terms" name="terms" defaultChecked />
        <button type="reset">Reset</button>
      </form>,
    );
    const input = screen.getByRole("checkbox", {
      name: "Accept terms",
    }) as HTMLInputElement;
    expect(ref.current).toBe(input);
    fireEvent.click(screen.getByText("Accept terms"));
    expect(input.checked).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(input.checked).toBe(true);
  });
  it("supports controlled, indeterminate, validation, and disabled states", () => {
    const onChange = vi.fn();
    render(
      <>
        <Checkbox
          label="Partial"
          indeterminate
          description="Some chosen"
          error="Check this"
        />
        <Checkbox label="Locked" checked onChange={onChange} disabled />
      </>,
    );
    const partial = screen.getByRole("checkbox", {
      name: "Partial",
    }) as HTMLInputElement;
    const locked = screen.getByRole("checkbox", {
      name: "Locked",
    }) as HTMLInputElement;
    expect(partial.indeterminate).toBe(true);
    expect(partial.getAttribute("aria-invalid")).toBe("true");
    expect(partial.getAttribute("aria-describedby")).toContain("error");
    expect(locked.disabled).toBe(true);
    expect(locked.checked).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
  });
});
