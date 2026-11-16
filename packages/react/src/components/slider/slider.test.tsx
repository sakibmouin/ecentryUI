// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Slider } from "./slider.js";

afterEach(cleanup);
describe("Slider", () => {
  it("steps a single value with RTL keys and resets form state", () => {
    const { container } = render(
      <form>
        <Slider
          label="Volume"
          name="volume"
          defaultValue={40}
          min={0}
          max={100}
          step={10}
          dir="rtl"
        />
        <button type="reset">Reset</button>
      </form>,
    );
    const thumb = screen.getByRole("slider", { name: "Volume" });
    fireEvent.keyDown(thumb, { key: "ArrowLeft" });
    expect(thumb.getAttribute("aria-valuenow")).toBe("50");
    fireEvent.keyDown(thumb, { key: "End" });
    expect(thumb.getAttribute("aria-valuenow")).toBe("100");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(
      (container.querySelector('input[name="volume"]') as HTMLInputElement)
        .value,
    ).toBe("40");
  });
  it("constrains range thumbs and reports controlled values", () => {
    const onValueChange = vi.fn();
    render(
      <Slider
        label="Price"
        value={[20, 80]}
        range
        step={10}
        onValueChange={onValueChange}
      />,
    );
    const start = screen.getByRole("slider", { name: "Price start" });
    const end = screen.getByRole("slider", { name: "Price end" });
    fireEvent.keyDown(start, { key: "End" });
    expect(onValueChange).toHaveBeenCalledWith([80, 80]);
    expect(start.getAttribute("aria-valuenow")).toBe("20");
    fireEvent.keyDown(end, { key: "Home" });
    expect(onValueChange).toHaveBeenCalledWith([20, 20]);
  });
  it("supports vertical keyboard increments and read only state", () => {
    const { rerender } = render(
      <Slider
        label="Height"
        defaultValue={20}
        orientation="vertical"
        step={5}
      />,
    );
    const thumb = screen.getByRole("slider", { name: "Height" });
    fireEvent.keyDown(thumb, { key: "ArrowUp" });
    expect(thumb.getAttribute("aria-valuenow")).toBe("25");
    rerender(
      <Slider label="Height" value={25} orientation="vertical" readOnly />,
    );
    fireEvent.keyDown(thumb, { key: "ArrowUp" });
    expect(thumb.getAttribute("aria-valuenow")).toBe("25");
    expect(thumb.getAttribute("aria-readonly")).toBe("true");
  });
});
