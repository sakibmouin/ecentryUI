// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { DatePicker } from "./date-picker.js";
afterEach(cleanup);
function day(date: string): HTMLButtonElement {
  const button = document.querySelector<HTMLButtonElement>(
    `button[data-date="${date}"]`,
  );
  if (!button) throw new Error(`Missing ${date}`);
  return button;
}
describe("DatePicker", () => {
  it("opens the calendar, selects a date, and submits a native form value", () => {
    const onChange = vi.fn();
    render(
      <form>
        <DatePicker
          label="Arrival"
          name="arrival"
          defaultMonth="2026-11"
          onChange={onChange}
        />
      </form>,
    );
    const trigger = screen.getByRole("button", { name: /Arrival/ });
    fireEvent.click(trigger);
    expect(
      screen.getByRole("dialog", { name: "Arrival calendar" }),
    ).toBeTruthy();
    fireEvent.click(day("2026-11-12"));
    expect(onChange).toHaveBeenCalledWith("2026-11-12");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(
      (document.querySelector('input[name="arrival"]') as HTMLInputElement)
        .value,
    ).toBe("2026-11-12");
  });
  it("keeps range selection open until an end date and resets", () => {
    render(
      <form>
        <DatePicker
          label="Travel"
          name="travel"
          mode="range"
          defaultMonth="2026-11"
        />
        <button type="reset">Reset</button>
      </form>,
    );
    fireEvent.click(screen.getByRole("button", { name: /Travel/ }));
    fireEvent.click(day("2026-11-10"));
    expect(screen.getByRole("dialog")).toBeTruthy();
    fireEvent.click(day("2026-11-12"));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(
      (document.querySelector('input[name="travel-start"]') as HTMLInputElement)
        .value,
    ).toBe("2026-11-10");
    expect(
      (document.querySelector('input[name="travel-end"]') as HTMLInputElement)
        .value,
    ).toBe("2026-11-12");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(
      (document.querySelector('input[name="travel-start"]') as HTMLInputElement)
        .value,
    ).toBe("");
  });
  it("preserves controlled value and prevents unavailable selection", () => {
    const onChange = vi.fn();
    render(
      <DatePicker
        label="Meeting"
        value="2026-11-11"
        defaultMonth="2026-11"
        locale="fr-FR"
        isDateUnavailable={(date) => date === "2026-11-12"}
        onChange={onChange}
      />,
    );
    const trigger = screen.getByRole("button", { name: /Meeting/ });
    expect(trigger.textContent).toMatch(/11 nov/i);
    fireEvent.click(trigger);
    expect(day("2026-11-12").disabled).toBe(true);
    fireEvent.click(day("2026-11-13"));
    expect(onChange).toHaveBeenCalledWith("2026-11-13");
    expect(trigger.textContent).toMatch(/11 nov/i);
  });
  it("closes with Escape and respects disabled state", () => {
    render(
      <>
        <DatePicker label="Open" defaultMonth="2026-11" />
        <DatePicker label="Disabled" disabled />
      </>,
    );
    const trigger = screen.getByRole("button", { name: /Open/ });
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(
      (screen.getByRole("button", { name: /Disabled/ }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });
});
