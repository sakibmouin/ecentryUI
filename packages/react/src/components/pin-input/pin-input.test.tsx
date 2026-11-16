// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { PinInput } from "./pin-input.js";

afterEach(cleanup);
describe("PinInput", () => {
  it("advances per cell, supports paste and Backspace, and resets the form value", () => {
    const { container } = render(
      <form>
        <PinInput
          label="Code"
          name="code"
          length={4}
          defaultValue="12"
          required
        />
        <button type="reset">Reset</button>
      </form>,
    );
    const cells = screen.getAllByRole("textbox");
    expect((cells[0] as HTMLInputElement).value).toBe("1");
    fireEvent.change(cells[2]!, { target: { value: "3" } });
    expect(document.activeElement).toBe(cells[3]!);
    fireEvent.paste(cells[0]!, { clipboardData: { getData: () => "9876" } });
    expect(
      (container.querySelector('input[name="code"]') as HTMLInputElement).value,
    ).toBe("9876");
    fireEvent.keyDown(cells[3]!, { key: "Backspace" });
    expect(
      (container.querySelector('input[name="code"]') as HTMLInputElement).value,
    ).toBe("987");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(
      (container.querySelector('input[name="code"]') as HTMLInputElement).value,
    ).toBe("12");
  });
  it("reports controlled edits, masks digits, and announces errors", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <PinInput
        label="Security code"
        value="12"
        length={4}
        mask
        error="Invalid code"
        onValueChange={onValueChange}
      />,
    );
    const first = screen.getByLabelText(
      "Security code, digit 1 of 4",
    ) as HTMLInputElement;
    expect(first.type).toBe("password");
    fireEvent.change(screen.getByLabelText("Security code, digit 3 of 4"), {
      target: { value: "3" },
    });
    expect(onValueChange).toHaveBeenCalledWith("123");
    expect(
      (container.querySelector('input[type="hidden"]') as HTMLInputElement)
        .value,
    ).toBe("12");
    expect(first.getAttribute("aria-invalid")).toBe("true");
  });
});
