// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NumberInput } from "./number-input.js";

afterEach(cleanup);
describe("NumberInput", () => {
  it("steps, clamps, scrubs, and resets an uncontrolled number", () => {
    render(
      <form>
        <NumberInput
          label="Quantity"
          name="quantity"
          defaultValue={2}
          min={0}
          max={5}
          step={2}
        />
        <button type="reset">Reset</button>
      </form>,
    );
    const input = screen.getByRole("spinbutton", {
      name: "Quantity",
    }) as HTMLInputElement;
    fireEvent.click(screen.getByRole("button", { name: "Increase Quantity" }));
    expect(input.value).toBe("4");
    fireEvent.click(screen.getByRole("button", { name: "Increase Quantity" }));
    expect(input.value).toBe("5");
    fireEvent.pointerDown(
      screen.getByRole("slider", { name: "Scrub Quantity" }),
      { clientX: 0, pointerId: 1 },
    );
    fireEvent.pointerMove(
      screen.getByRole("slider", { name: "Scrub Quantity" }),
      { clientX: -32, pointerId: 1 },
    );
    expect(input.value).toBe("1");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(input.value).toBe("2");
  });
  it("reports controlled changes without mutating the value", () => {
    const onValueChange = vi.fn();
    render(
      <NumberInput label="Count" value={3} onValueChange={onValueChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Increase Count" }));
    expect(onValueChange).toHaveBeenCalledWith(4);
    expect(
      (screen.getByRole("spinbutton", { name: "Count" }) as HTMLInputElement)
        .value,
    ).toBe("3");
    fireEvent.keyDown(screen.getByRole("slider", { name: "Scrub Count" }), {
      key: "ArrowLeft",
    });
    expect(onValueChange).toHaveBeenCalledWith(2);
  });
});
