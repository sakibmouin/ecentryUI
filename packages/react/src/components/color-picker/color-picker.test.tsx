// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ColorPicker } from "./color-picker.js";
afterEach(cleanup);
describe("ColorPicker", () => {
  it("edits RGB channels, hex, and alpha with a canonical form value", () => {
    const onChange = vi.fn();
    render(
      <form>
        <ColorPicker
          label="Accent"
          name="accent"
          defaultValue="#112233"
          onChange={onChange}
        />
      </form>,
    );
    const hidden = document.querySelector(
      'input[name="accent"]',
    ) as HTMLInputElement;
    expect(hidden.value).toBe("#112233FF");
    fireEvent.change(screen.getByRole("spinbutton", { name: "Red" }), {
      target: { value: "255" },
    });
    expect(hidden.value).toBe("#FF2233FF");
    fireEvent.change(screen.getByRole("slider", { name: /Alpha/ }), {
      target: { value: "50" },
    });
    expect(hidden.value).toBe("#FF223380");
    fireEvent.change(screen.getByRole("textbox", { name: "Accent hex" }), {
      target: { value: "#ABCDEF" },
    });
    expect(hidden.value).toBe("#ABCDEFFF");
    expect(onChange).toHaveBeenCalled();
  });
  it("selects swatches and preserves controlled values", () => {
    const onChange = vi.fn();
    render(
      <ColorPicker
        label="Brand"
        value="#112233FF"
        swatches={["#C43843"]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Select #C43843FF" }));
    expect(onChange).toHaveBeenCalledWith("#C43843FF");
    expect(
      (screen.getByRole("textbox", { name: "Brand hex" }) as HTMLInputElement)
        .value,
    ).toBe("#112233FF");
  });
  it("rejects incomplete hex and resets uncontrolled form state", () => {
    render(
      <form>
        <ColorPicker label="Accent" name="accent" defaultValue="#112233" />
        <button type="reset">Reset</button>
      </form>,
    );
    const hex = screen.getByRole("textbox", {
      name: "Accent hex",
    }) as HTMLInputElement;
    fireEvent.change(hex, { target: { value: "#BAD" } });
    expect(hex.getAttribute("aria-invalid")).toBe("true");
    fireEvent.blur(hex);
    expect(hex.value).toBe("#112233FF");
    fireEvent.click(screen.getByRole("button", { name: "Select #C43843FF" }));
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(hex.value).toBe("#112233FF");
  });
  it("locks controls when disabled", () => {
    render(<ColorPicker label="Locked" disabled />);
    expect(
      (screen.getByRole("textbox", { name: "Locked hex" }) as HTMLInputElement)
        .disabled,
    ).toBe(true);
    expect(
      (screen.getByRole("slider", { name: /Alpha/ }) as HTMLInputElement)
        .disabled,
    ).toBe(true);
  });
});
