// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Switch } from "./switch.js";

afterEach(cleanup);
describe("Switch", () => {
  it("toggles by label, submits its value, and resets", () => {
    const change = vi.fn();
    const ref = createRef<HTMLInputElement>();
    render(
      <form aria-label="Settings">
        <Switch
          ref={ref}
          label="Alerts"
          name="alerts"
          value="yes"
          defaultChecked
          onChange={change}
        />
        <button type="reset">Reset</button>
      </form>,
    );
    const control = screen.getByRole("switch", {
      name: "Alerts",
    }) as HTMLInputElement;
    expect(ref.current).toBe(control);
    expect(new FormData(control.form!).get("alerts")).toBe("yes");
    fireEvent.click(screen.getByText("Alerts"));
    expect(control.checked).toBe(false);
    expect(change).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(control.checked).toBe(true);
  });
  it("links help and errors and prevents read-only changes", () => {
    render(
      <Switch label="Updates" description="Weekly" error="Required" readOnly />,
    );
    const control = screen.getByRole("switch", {
      name: "Updates",
    }) as HTMLInputElement;
    expect(control.getAttribute("aria-describedby")?.split(" ")).toHaveLength(
      2,
    );
    expect(control.getAttribute("aria-invalid")).toBe("true");
    fireEvent.click(control);
    expect(control.checked).toBe(false);
  });
  it("supports controlled, disabled, loading and required states", () => {
    const { rerender } = render(
      <Switch label="Sync" checked onChange={() => {}} required />,
    );
    const control = screen.getByRole("switch", {
      name: "Sync",
    }) as HTMLInputElement;
    expect(control.checked).toBe(true);
    expect(control.required).toBe(true);
    rerender(<Switch label="Sync" disabled />);
    expect(control.disabled).toBe(true);
    rerender(<Switch label="Sync" loading />);
    expect(control.disabled).toBe(true);
  });
});
