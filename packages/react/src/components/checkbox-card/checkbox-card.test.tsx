// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { CheckboxCard } from "./checkbox-card.js";
afterEach(cleanup);
describe("CheckboxCard", () => {
  it("selects through the card label and resets in a form", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <form>
        <CheckboxCard
          ref={ref}
          label="Premium support"
          name="support"
          description="Priority help"
        />
        <button type="reset">Reset</button>
      </form>,
    );
    const input = screen.getByRole("checkbox", {
      name: "Premium support",
    }) as HTMLInputElement;
    expect(ref.current).toBe(input);
    fireEvent.click(screen.getByText("Priority help"));
    expect(input.checked).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(input.checked).toBe(false);
  });
  it("exposes validation and lockout states", () => {
    render(
      <>
        <CheckboxCard label="Required plan" error="Choose a plan" />
        <CheckboxCard label="Unavailable plan" disabled />
        <CheckboxCard label="Loading plan" loading />
      </>,
    );
    const required = screen.getByRole("checkbox", { name: "Required plan" });
    expect(required.getAttribute("aria-invalid")).toBe("true");
    expect(required.getAttribute("aria-describedby")).toContain("error");
    expect(
      (
        screen.getByRole("checkbox", {
          name: "Unavailable plan",
        }) as HTMLInputElement
      ).disabled,
    ).toBe(true);
    expect(
      (
        screen.getByRole("checkbox", {
          name: "Loading plan",
        }) as HTMLInputElement
      ).getAttribute("aria-busy"),
    ).toBe("true");
  });
});
