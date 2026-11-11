// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Calendar } from "./calendar.js";
afterEach(cleanup);
function day(date: string): HTMLButtonElement {
  const button = document.querySelector<HTMLButtonElement>(
    `button[data-date="${date}"]`,
  );
  if (!button) throw new Error(`Missing ${date}`);
  return button;
}
describe("Calendar", () => {
  it("selects dates in uncontrolled and controlled single modes", () => {
    const onChange = vi.fn();
    const view = render(
      <Calendar defaultMonth="2026-11" onChange={onChange} />,
    );
    fireEvent.click(day("2026-11-12"));
    expect(onChange).toHaveBeenCalledWith("2026-11-12");
    expect(day("2026-11-12").getAttribute("aria-pressed")).toBe("true");
    view.rerender(
      <Calendar
        defaultMonth="2026-11"
        value="2026-11-05"
        onChange={onChange}
      />,
    );
    expect(day("2026-11-05").getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(day("2026-11-12"));
    expect(day("2026-11-05").getAttribute("aria-pressed")).toBe("true");
  });
  it("supports range and multiple selection", () => {
    const range = render(<Calendar mode="range" defaultMonth="2026-11" />);
    fireEvent.click(day("2026-11-10"));
    fireEvent.click(day("2026-11-12"));
    expect(day("2026-11-11").getAttribute("aria-pressed")).toBe("true");
    range.unmount();
    render(<Calendar mode="multiple" defaultMonth="2026-11" />);
    fireEvent.click(day("2026-11-10"));
    fireEvent.click(day("2026-11-12"));
    expect(day("2026-11-11").getAttribute("aria-pressed")).toBe("false");
    expect(day("2026-11-12").getAttribute("aria-pressed")).toBe("true");
  });
  it("localizes labels and blocks unavailable dates", () => {
    const onChange = vi.fn();
    render(
      <Calendar
        defaultMonth="2026-11"
        locale="fr-FR"
        minDate="2026-11-05"
        isDateUnavailable={(date) => date === "2026-11-12"}
        onChange={onChange}
      />,
    );
    expect(day("2026-11-12").getAttribute("aria-label")).toMatch(
      /12 novembre 2026/i,
    );
    expect(
      document.querySelector(".ec-calendar__weekday")?.textContent,
    ).toMatch(/lun/i);
    expect(day("2026-11-12").disabled).toBe(true);
    expect(day("2026-11-02").disabled).toBe(true);
    fireEvent.click(day("2026-11-12"));
    expect(onChange).not.toHaveBeenCalled();
  });
  it("moves focus by keyboard across month boundaries", () => {
    render(<Calendar defaultMonth="2026-11" />);
    day("2026-11-01").focus();
    fireEvent.keyDown(day("2026-11-01"), { key: "ArrowLeft" });
    expect(screen.getByText("October 2026")).toBeTruthy();
    expect(document.activeElement?.getAttribute("data-date")).toBe(
      "2026-10-31",
    );
  });
  it("clamps PageDown to the last day of a shorter month", () => {
    render(<Calendar defaultMonth="2026-01" />);
    day("2026-01-31").focus();
    fireEvent.keyDown(day("2026-01-31"), { key: "PageDown" });
    expect(document.activeElement?.getAttribute("data-date")).toBe(
      "2026-02-28",
    );
  });
});
