// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { NativeSelect } from "./native-select.js";

afterEach(cleanup);
describe("NativeSelect", () => {
  it("labels native options and resets within a form", () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <form>
        <NativeSelect
          ref={ref}
          label="Country"
          name="country"
          defaultValue="bd"
          description="Choose a country"
        >
          <option value="bd">Bangladesh</option>
          <option value="us">United States</option>
        </NativeSelect>
        <button type="reset">Reset</button>
      </form>,
    );
    const select = screen.getByRole("combobox", {
      name: "Country",
    }) as HTMLSelectElement;
    expect(ref.current).toBe(select);
    fireEvent.change(select, { target: { value: "us" } });
    expect(select.value).toBe("us");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(select.value).toBe("bd");
    expect(select.getAttribute("aria-describedby")).toContain("description");
  });
  it("links validation and disables loading selection", () => {
    render(
      <NativeSelect label="Region" error="Required" loading>
        <option value="">Choose</option>
      </NativeSelect>,
    );
    const select = screen.getByRole("combobox", {
      name: "Region",
    }) as HTMLSelectElement;
    expect(select.disabled).toBe(true);
    expect(select.getAttribute("aria-invalid")).toBe("true");
    expect(select.getAttribute("aria-describedby")).toContain("error");
  });
});
