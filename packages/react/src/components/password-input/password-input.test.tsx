// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { PasswordInput } from "./password-input.js";

afterEach(cleanup);
describe("PasswordInput", () => {
  it("labels, reveals, and resets a native password field", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <form>
        <PasswordInput
          ref={ref}
          label="Password"
          name="password"
          defaultValue="secret"
          description="Use at least eight characters"
        />
        <button type="reset">Reset</button>
      </form>,
    );
    const input = screen.getByLabelText("Password") as HTMLInputElement;
    expect(ref.current).toBe(input);
    expect(input.type).toBe("password");
    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(input.type).toBe("text");
    fireEvent.change(input, { target: { value: "changed" } });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(input.value).toBe("secret");
    expect(input.getAttribute("aria-describedby")).toContain("description");
  });
  it("announces errors and disables loading controls", () => {
    render(<PasswordInput label="Secret" error="Required" loading />);
    const input = screen.getByLabelText("Secret") as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toContain("error");
    expect(
      (
        screen.getByRole("button", {
          name: "Show password",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
  });
});
