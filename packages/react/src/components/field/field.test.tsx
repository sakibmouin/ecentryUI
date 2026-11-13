// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Field } from "./field.js";

afterEach(cleanup);
describe("Field", () => {
  it("labels a native input and resets its value", () => {
    render(
      <form>
        <Field label="Name" description="Public name">
          <input name="name" defaultValue="Ada" />
        </Field>
        <button type="reset">Reset</button>
      </form>,
    );
    const input = screen.getByRole("textbox", {
      name: "Name",
    }) as HTMLInputElement;
    expect(input.getAttribute("aria-describedby")).toContain("description");
    fireEvent.change(input, { target: { value: "Grace" } });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(input.value).toBe("Ada");
  });
  it("propagates validation and disabled states", () => {
    render(
      <Field label="Email" error="Invalid address" required disabled>
        <input type="email" />
      </Field>,
    );
    const input = screen.getByRole("textbox", {
      name: "Email",
    }) as HTMLInputElement;
    expect(input.required).toBe(true);
    expect(input.disabled).toBe(true);
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toContain("error");
  });
});
