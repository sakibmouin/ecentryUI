// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { RadioCard } from "./radio-card.js";

afterEach(cleanup);
describe("RadioCard", () => {
  it("selects through a card label and resets within a form", () => {
    render(
      <form>
        <fieldset>
          <legend>Shipping</legend>
          <RadioCard
            label="Standard"
            description="Three days"
            name="shipping"
            value="standard"
            defaultChecked
          />
          <RadioCard label="Express" name="shipping" value="express" />
        </fieldset>
        <button type="reset">Reset</button>
      </form>,
    );
    const standard = screen.getByRole("radio", {
      name: "Standard",
    }) as HTMLInputElement;
    const express = screen.getByRole("radio", {
      name: "Express",
    }) as HTMLInputElement;
    fireEvent.click(screen.getByText("Express"));
    expect(express.checked).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(standard.checked).toBe(true);
    expect(standard.getAttribute("aria-describedby")).toContain("description");
  });
  it("links errors and locks unavailable cards", () => {
    render(
      <>
        <RadioCard label="Invalid" error="Choose another" />
        <RadioCard label="Loading" loading />
      </>,
    );
    const invalid = screen.getByRole("radio", { name: "Invalid" });
    expect(invalid.getAttribute("aria-invalid")).toBe("true");
    expect(invalid.getAttribute("aria-describedby")).toContain("error");
    expect(
      (screen.getByRole("radio", { name: "Loading" }) as HTMLInputElement)
        .disabled,
    ).toBe(true);
  });
});
