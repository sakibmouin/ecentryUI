// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Editable } from "./editable.js";

afterEach(cleanup);
describe("Editable", () => {
  it("edits and submits an uncontrolled value with Enter", () => {
    const onSubmit = vi.fn();
    render(<Editable label="Title" defaultValue="Old" onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole("button", { name: /Edit Title:/ }));
    const input = screen.getByRole("textbox", { name: "Title" });
    fireEvent.change(input, { target: { value: "New" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(
      screen.getByRole("button", { name: /Edit Title:/ }).textContent,
    ).toBe("New");
    expect(onSubmit).toHaveBeenCalledWith("New");
  });
  it("cancels with Escape and validates before submission", () => {
    render(
      <Editable
        label="Name"
        defaultValue="Saved"
        validate={(value) => (value ? undefined : "Required")}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Edit Name:/ }));
    const input = screen.getByRole("textbox", { name: "Name" });
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByRole("alert").textContent).toBe("Required");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.getByRole("button", { name: /Edit Name:/ }).textContent).toBe(
      "Saved",
    );
  });
  it("reports controlled submissions without changing its value", () => {
    const onValueChange = vi.fn();
    render(
      <Editable label="Name" value="Saved" onValueChange={onValueChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Edit Name:/ }));
    fireEvent.change(screen.getByRole("textbox", { name: "Name" }), {
      target: { value: "Requested" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onValueChange).toHaveBeenCalledWith("Requested");
    expect(screen.getByRole("button", { name: /Edit Name:/ }).textContent).toBe(
      "Saved",
    );
  });
});
