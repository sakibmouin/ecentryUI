// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Checkmark } from "./checkmark.js";

afterEach(cleanup);

it("is decorative by default and supports an accessible standalone label", () => {
  const { rerender } = render(<Checkmark data-testid="mark" />);
  expect(screen.getByTestId("mark").getAttribute("aria-hidden")).toBe("true");
  expect(screen.getByTestId("mark").dataset.state).toBe("checked");
  rerender(<Checkmark checked="mixed" label="Some selected" />);
  expect(screen.getByRole("img", { name: "Some selected" }).dataset.state).toBe(
    "mixed",
  );
  rerender(<Checkmark checked={false} label="None selected" />);
  expect(screen.getByRole("img", { name: "None selected" }).dataset.state).toBe(
    "unchecked",
  );
});
