// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Radio } from "./radio.js";

afterEach(cleanup);
describe("Radio", () => {
  it("selects by label and resets a native radio group", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <form>
        <fieldset>
          <legend>Plan</legend>
          <Radio
            ref={ref}
            label="Basic"
            name="plan"
            value="basic"
            defaultChecked
          />
          <Radio label="Pro" name="plan" value="pro" />
        </fieldset>
        <button type="reset">Reset</button>
      </form>,
    );
    const basic = screen.getByRole("radio", {
      name: "Basic",
    }) as HTMLInputElement;
    const pro = screen.getByRole("radio", { name: "Pro" }) as HTMLInputElement;
    expect(ref.current).toBe(basic);
    fireEvent.click(screen.getByText("Pro"));
    expect(pro.checked).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(basic.checked).toBe(true);
  });
  it("links errors and preserves read only and loading states", () => {
    render(
      <>
        <Radio label="Locked" readOnly defaultChecked error="Unavailable" />
        <Radio label="Loading" loading />
      </>,
    );
    const locked = screen.getByRole("radio", {
      name: "Locked",
    }) as HTMLInputElement;
    fireEvent.click(locked);
    expect(locked.checked).toBe(true);
    expect(locked.getAttribute("aria-invalid")).toBe("true");
    expect(locked.getAttribute("aria-describedby")).toContain("error");
    expect(
      (screen.getByRole("radio", { name: "Loading" }) as HTMLInputElement)
        .disabled,
    ).toBe(true);
  });
});
