// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { DateInput } from "./date-input.js";
afterEach(cleanup);
describe("DateInput", () => {
  it("uses native form value and reset semantics", () => {
    const ref = createRef<HTMLInputElement>();
    const onChange = vi.fn();
    render(
      <form aria-label="Schedule">
        <DateInput
          ref={ref}
          label="Start date"
          name="start"
          defaultValue="2026-11-12"
          onChange={onChange}
        />
        <button type="reset">Reset</button>
      </form>,
    );
    const input = screen.getByLabelText("Start date") as HTMLInputElement;
    expect(ref.current).toBe(input);
    expect(input.type).toBe("date");
    fireEvent.change(input, { target: { value: "2026-11-16" } });
    expect(input.value).toBe("2026-11-16");
    expect(onChange).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(input.value).toBe("2026-11-12");
  });
  it("links help and errors and blocks loading input", () => {
    render(
      <DateInput
        label="End date"
        description="Choose a future date"
        error="Date required"
        loading
      />,
    );
    const input = screen.getByLabelText("End date") as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.getAttribute("aria-busy")).toBe("true");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toContain("error");
  });
});
