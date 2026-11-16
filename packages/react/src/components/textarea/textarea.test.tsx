// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef, useState } from "react";
import { Textarea } from "./textarea.js";

afterEach(cleanup);
describe("Textarea", () => {
  it("labels and describes the field and forwards the ref", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(
      <Textarea
        ref={ref}
        label="Message"
        description="Add a note"
        error="Required"
      />,
    );
    const field = screen.getByRole("textbox", { name: "Message" });
    expect(ref.current).toBe(field);
    expect(field.getAttribute("aria-describedby")?.split(" ")).toHaveLength(2);
    expect(field.getAttribute("aria-invalid")).toBe("true");
  });
  it("supports native value, submission, reset and value callback", () => {
    const onValueChange = vi.fn();
    render(
      <form aria-label="Note">
        <Textarea
          label="Note"
          name="note"
          defaultValue="Initial"
          onValueChange={onValueChange}
        />
        <button type="reset">Reset</button>
      </form>,
    );
    const field = screen.getByRole("textbox", {
      name: "Note",
    }) as HTMLTextAreaElement;
    fireEvent.change(field, { target: { value: "Changed" } });
    expect(onValueChange).toHaveBeenCalledWith("Changed", expect.anything());
    expect(new FormData(field.form!).get("note")).toBe("Changed");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(field.value).toBe("Initial");
  });
  it("supports controlled and disabled, loading, read-only, size and variants", () => {
    function Example() {
      const [value, setValue] = useState("A");
      return (
        <Textarea
          label="Bio"
          value={value}
          onValueChange={setValue}
          variant="filled"
          size="lg"
          readOnly
        />
      );
    }
    render(<Example />);
    const field = screen.getByRole("textbox", {
      name: "Bio",
    }) as HTMLTextAreaElement;
    expect(field.value).toBe("A");
    expect(field.readOnly).toBe(true);
    expect(field.dataset.ecVariant).toBe("filled");
    expect(field.dataset.ecSize).toBe("lg");
    cleanup();
    render(<Textarea label="Bio" loading />);
    expect(
      (screen.getByRole("textbox", { name: "Bio" }) as HTMLTextAreaElement)
        .disabled,
    ).toBe(true);
  });
});
