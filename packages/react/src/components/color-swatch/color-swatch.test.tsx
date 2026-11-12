// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { ColorSwatch } from "./color-swatch.js";
afterEach(cleanup);
describe("ColorSwatch", () => {
  it("selects a native radio option by label and resets a form", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <form>
        <ColorSwatch
          ref={ref}
          name="theme"
          color="#116E5E"
          label="Teal"
          defaultChecked
        />
        <ColorSwatch name="theme" color="#C43843" label="Red" />
        <button type="reset">Reset</button>
      </form>,
    );
    const teal = screen.getByRole("radio", {
      name: "Teal",
    }) as HTMLInputElement;
    const red = screen.getByRole("radio", { name: "Red" }) as HTMLInputElement;
    expect(ref.current).toBe(teal);
    fireEvent.click(screen.getByText("Red"));
    expect(red.checked).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(teal.checked).toBe(true);
  });
  it("links validation and disables loading options", () => {
    render(
      <>
        <ColorSwatch
          color="#116E5E"
          label="Invalid"
          error="Choose another color"
        />
        <ColorSwatch color="#C43843" label="Loading" loading />
      </>,
    );
    expect(
      screen
        .getByRole("radio", { name: "Invalid" })
        .getAttribute("aria-invalid"),
    ).toBe("true");
    expect(
      screen
        .getByRole("radio", { name: "Invalid" })
        .getAttribute("aria-describedby"),
    ).toContain("error");
    expect(
      (screen.getByRole("radio", { name: "Loading" }) as HTMLInputElement)
        .disabled,
    ).toBe(true);
  });
});
