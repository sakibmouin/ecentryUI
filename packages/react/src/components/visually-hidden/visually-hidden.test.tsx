// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { VisuallyHidden } from "./visually-hidden.js";

afterEach(cleanup);

it("provides an accessible name without marking text aria-hidden", () => {
  render(
    <button type="button">
      <VisuallyHidden>Delete report</VisuallyHidden>
    </button>,
  );
  expect(screen.getByRole("button", { name: "Delete report" })).toBeTruthy();
  expect(screen.getByText("Delete report").hasAttribute("aria-hidden")).toBe(
    false,
  );
});
