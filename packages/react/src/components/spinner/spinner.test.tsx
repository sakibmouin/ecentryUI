// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Spinner } from "./spinner.js";
afterEach(cleanup);
describe("Spinner", () => {
  it("announces its operation and forwards attributes", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Spinner ref={ref} label="Saving" size="lg" title="Please wait" />);
    const spinner = screen.getByRole("status", { name: "Saving" });
    expect(ref.current).toBe(spinner);
    expect(spinner.getAttribute("data-size")).toBe("lg");
    expect(spinner.getAttribute("title")).toBe("Please wait");
    expect(spinner.firstElementChild?.getAttribute("aria-hidden")).toBe("true");
  });
  it("provides a default loading name", () => {
    render(<Spinner />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeTruthy();
  });
});
