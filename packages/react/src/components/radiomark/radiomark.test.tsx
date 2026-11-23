// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Radiomark } from "./radiomark.js";

afterEach(cleanup);

it("renders a decorative radio mark and reflects change in state", () => {
  const { rerender } = render(<Radiomark data-testid="mark" />);
  const mark = screen.getByTestId("mark");
  expect(mark.getAttribute("aria-hidden")).toBe("true");
  expect(mark.dataset.state).toBe("unchecked");
  rerender(<Radiomark checked label="Standard shipping selected" />);
  expect(screen.getByRole("img", { name: "Standard shipping selected" })).toBe(
    mark,
  );
  expect(mark.dataset.state).toBe("checked");
});
