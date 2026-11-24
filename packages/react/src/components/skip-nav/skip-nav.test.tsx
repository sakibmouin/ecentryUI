// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { SkipNavContent, SkipNavLink } from "./skip-nav.js";

afterEach(cleanup);

it("renders a native link and a programmatically focusable target", () => {
  render(
    <>
      <SkipNavLink targetId="report">Skip to report</SkipNavLink>
      <SkipNavContent id="report">Report contents</SkipNavContent>
    </>,
  );
  expect(
    screen.getByRole("link", { name: "Skip to report" }).getAttribute("href"),
  ).toBe("#report");
  const target = screen.getByText("Report contents");
  expect(target.id).toBe("report");
  expect(target.tabIndex).toBe(-1);
});
