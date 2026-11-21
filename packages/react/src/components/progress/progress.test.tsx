// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Progress } from "./progress.js";
afterEach(cleanup);
describe("Progress", () => {
  it("reports bounded determinate progress", () => {
    render(<Progress value={150} max={80} label="Upload" size="lg" />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar.getAttribute("aria-valuenow")).toBe("80");
    expect(bar.getAttribute("aria-valuemax")).toBe("80");
    expect(bar.querySelector("span")?.getAttribute("style")).toContain("100%");
    expect(bar.getAttribute("data-size")).toBe("lg");
  });
  it("does not announce a value while indeterminate", () => {
    render(<Progress label="Syncing" />);
    const bar = screen.getByRole("progressbar", { name: "Syncing" });
    expect(bar.hasAttribute("aria-valuenow")).toBe(false);
    expect(bar.getAttribute("data-indeterminate")).toBe("true");
  });
});
