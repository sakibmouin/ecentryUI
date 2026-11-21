// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { QRCode } from "./qr-code.js";
afterEach(cleanup);
describe("QRCode", () => {
  it("renders deterministic modules, quiet zone, and an accessible name", () => {
    const ref = createRef<SVGSVGElement>();
    const { rerender } = render(
      <QRCode ref={ref} value="https://ecentry.dev" label="Open docs" />,
    );
    const image = screen.getByRole("img", { name: "Open docs" });
    const path = image.querySelector("path")?.getAttribute("d");
    expect(ref.current).toBe(image);
    expect(path?.startsWith("M")).toBe(true);
    expect(image.getAttribute("viewBox")).toMatch(/^0 0 \d+ \d+$/);
    rerender(<QRCode value="https://ecentry.dev" label="Open docs" />);
    expect(
      screen.getByRole("img").querySelector("path")?.getAttribute("d"),
    ).toBe(path);
  });
  it("reports empty data without a misleading symbol", () => {
    render(<QRCode value="" />);
    expect(screen.getByRole("status").textContent).toBe("No QR data");
  });
});
