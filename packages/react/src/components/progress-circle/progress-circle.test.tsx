// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ProgressCircle } from "./progress-circle.js";
afterEach(cleanup);
describe("ProgressCircle", () => {
  it("reports bounded determinate value", () => {
    render(<ProgressCircle value={-5} max={50} label="Import" size="lg" />);
    const bar = screen.getByRole("progressbar", { name: "Import" });
    expect(bar.getAttribute("aria-valuenow")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("50");
    expect(bar.getAttribute("data-size")).toBe("lg");
    expect(bar.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
  });
  it("omits value for indeterminate progress", () => {
    render(<ProgressCircle label="Processing" />);
    const bar = screen.getByRole("progressbar", { name: "Processing" });
    expect(bar.hasAttribute("aria-valuenow")).toBe(false);
    expect(bar.getAttribute("data-indeterminate")).toBe("true");
  });
});
