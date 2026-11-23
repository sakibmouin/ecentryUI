// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, expect, it } from "vitest";
import { Portal } from "./portal.js";

afterEach(cleanup);

it("renders in the requested destination and supports an inline mode", () => {
  const target = document.createElement("aside");
  const { container, rerender } = render(
    <Portal container={target}>
      <span>Destination</span>
    </Portal>,
  );
  expect(target.textContent).toBe("Destination");
  expect(container.textContent).toBe("");
  rerender(
    <Portal container={target} disabled>
      <span>Destination</span>
    </Portal>,
  );
  expect(container.contains(screen.getByText("Destination"))).toBe(true);
  expect(target.textContent).toBe("");
});

it("omits portalled children from server markup", () => {
  expect(renderToString(<Portal>Client target</Portal>)).toBe("");
  expect(renderToString(<Portal disabled>Inline</Portal>)).toBe("Inline");
});
