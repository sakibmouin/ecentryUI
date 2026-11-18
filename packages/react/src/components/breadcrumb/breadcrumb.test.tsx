// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Breadcrumb } from "./breadcrumb.js";

afterEach(cleanup);
describe("Breadcrumb", () => {
  it("renders navigation links and marks only the final item current", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Breadcrumb
        ref={ref}
        items={[
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs" },
          { label: "API", href: "/api" },
        ]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(ref.current).toBe(nav);
    expect(
      screen.getByRole("link", { name: "Home" }).getAttribute("href"),
    ).toBe("/");
    expect(
      screen.getByRole("link", { name: "Docs" }).getAttribute("href"),
    ).toBe("/docs");
    expect(screen.queryByRole("link", { name: "API" })).toBeNull();
    expect(nav.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
  });
  it("supports custom labels, separators, and loading", () => {
    render(
      <Breadcrumb
        aria-label="Project path"
        loading
        separator="›"
        items={[{ label: "Projects", href: "/projects" }, { label: "Design" }]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Project path" });
    expect(nav.getAttribute("aria-busy")).toBe("true");
    expect(
      nav
        .querySelector(".ec-breadcrumb__separator")
        ?.getAttribute("aria-hidden"),
    ).toBe("true");
    expect(screen.getByText("Design").getAttribute("aria-current")).toBe(
      "page",
    );
  });
});
