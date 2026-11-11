// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Link } from "./link.js";
afterEach(cleanup);
describe("Link", () => {
  it("navigates with a semantic anchor and forwards the ref", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Link href="/guide" ref={ref}>
        Guide
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Guide" });
    expect(link.getAttribute("href")).toBe("/guide");
    expect(ref.current).toBe(link);
  });
  it("opens external links safely and preserves authored rel values", () => {
    render(
      <Link href="https://example.com" external rel="author">
        Reference
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Reference" });
    expect(link.getAttribute("target")).toBe("_blank");
    expect((link as HTMLAnchorElement).rel.split(" ")).toEqual(
      expect.arrayContaining(["author", "noopener", "noreferrer"]),
    );
    expect(link.textContent).toContain("↗");
  });
  it("secures explicitly targeted new windows", () => {
    render(
      <Link href="/guide" target="_blank">
        Guide
      </Link>,
    );
    expect(screen.getByRole("link").getAttribute("rel")).toContain("noopener");
  });
});
