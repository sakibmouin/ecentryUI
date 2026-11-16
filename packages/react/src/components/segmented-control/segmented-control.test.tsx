// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { SegmentedControl } from "./segmented-control.js";

const options = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month", disabled: true },
];
afterEach(cleanup);
describe("SegmentedControl", () => {
  it("selects by label and resets native radio state", () => {
    render(
      <form>
        <SegmentedControl
          label="View"
          name="view"
          options={options}
          defaultValue="day"
          description="Choose a period"
        />
        <button type="reset">Reset</button>
      </form>,
    );
    const day = screen.getByRole("radio", { name: "Day" }) as HTMLInputElement;
    const week = screen.getByRole("radio", {
      name: "Week",
    }) as HTMLInputElement;
    fireEvent.click(screen.getByText("Week"));
    expect(week.checked).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(day.checked).toBe(true);
    expect(
      (screen.getByRole("radio", { name: "Month" }) as HTMLInputElement)
        .disabled,
    ).toBe(true);
  });
  it("reports controlled changes and links validation", () => {
    const onValueChange = vi.fn();
    render(
      <SegmentedControl
        label="View"
        name="view"
        options={options}
        value="day"
        onValueChange={onValueChange}
        error="Invalid choice"
      />,
    );
    fireEvent.click(screen.getByText("Week"));
    expect(onValueChange).toHaveBeenCalledWith("week");
    const day = screen.getByRole("radio", { name: "Day" }) as HTMLInputElement;
    expect(day.checked).toBe(true);
    expect(day.getAttribute("aria-invalid")).toBe("true");
  });
});
