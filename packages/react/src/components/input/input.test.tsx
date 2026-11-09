// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef, useState } from "react";
import { Input } from "./input.js";

afterEach(cleanup);

describe("Input", () => {
  it("renders a native input with defaults, a label, and forwarded ref", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <label>
        Email <Input ref={ref} name="email" type="email" />
      </label>,
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input.tagName).toBe("INPUT");
    expect(input.getAttribute("data-ec-variant")).toBe("outline");
    expect(input.getAttribute("data-ec-size")).toBe("md");
    expect(input.getAttribute("data-ec-color")).toBe("brand");
    expect(ref.current).toBe(input);
  });

  it("keeps native value and reset behavior while notifying both callbacks", () => {
    const onChange = vi.fn();
    const onValueChange = vi.fn();
    render(
      <form aria-label="Profile">
        <Input
          aria-label="Name"
          name="name"
          defaultValue="Ada"
          onChange={onChange}
          onValueChange={onValueChange}
        />
        <button type="reset">Reset</button>
      </form>,
    );
    const input = screen.getByRole("textbox", {
      name: "Name",
    }) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Grace" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("Grace", expect.anything());
    expect(input.value).toBe("Grace");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(input.value).toBe("Ada");
  });

  it("supports controlled values without internal state", () => {
    function Example() {
      const [value, setValue] = useState("A");
      return (
        <Input aria-label="Search" value={value} onValueChange={setValue} />
      );
    }
    render(<Example />);
    const input = screen.getByRole("textbox", {
      name: "Search",
    }) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "AB" } });
    expect(input.value).toBe("AB");
  });

  it("forwards invalid, disabled, read-only, variant, size, and DOM props", () => {
    render(
      <Input
        aria-label="Code"
        variant="filled"
        size="sm"
        color="danger"
        invalid
        disabled
        readOnly
        required
        className="custom"
      />,
    );
    const input = screen.getByRole("textbox", { name: "Code" });
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.hasAttribute("disabled")).toBe(true);
    expect(input.hasAttribute("readonly")).toBe(true);
    expect(input.hasAttribute("required")).toBe(true);
    expect(input.getAttribute("data-ec-variant")).toBe("filled");
    expect(input.getAttribute("data-ec-size")).toBe("sm");
    expect(input.getAttribute("data-ec-color")).toBe("danger");
    expect(input.className).toContain("custom");
  });
});
