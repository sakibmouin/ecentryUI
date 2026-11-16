// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Rating } from "./rating.js";

afterEach(cleanup);
describe("Rating", () => {
  it("changes in half steps by keyboard and resets its form value", () => {
    const { container } = render(
      <form>
        <Rating label="Quality" name="rating" defaultValue={2} />
        <button type="reset">Reset</button>
      </form>,
    );
    const slider = screen.getByRole("slider", { name: "Quality" });
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider.getAttribute("aria-valuenow")).toBe("2.5");
    expect(
      (container.querySelector('input[name="rating"]') as HTMLInputElement)
        .value,
    ).toBe("2.5");
    fireEvent.keyDown(slider, { key: "End" });
    expect(slider.getAttribute("aria-valuenow")).toBe("5");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(slider.getAttribute("aria-valuenow")).toBe("2");
  });
  it("reports controlled values and locks read only selection", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Rating label="Score" value={3.5} onValueChange={onValueChange} />,
    );
    const slider = screen.getByRole("slider", { name: "Score" });
    fireEvent.keyDown(slider, { key: "ArrowUp" });
    expect(onValueChange).toHaveBeenCalledWith(4);
    expect(slider.getAttribute("aria-valuenow")).toBe("3.5");
    rerender(
      <Rating
        label="Score"
        value={3.5}
        readOnly
        onValueChange={onValueChange}
      />,
    );
    onValueChange.mockClear();
    fireEvent.keyDown(slider, { key: "ArrowUp" });
    expect(onValueChange).not.toHaveBeenCalled();
    expect(slider.getAttribute("aria-readonly")).toBe("true");
  });
});
