// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, expect, it } from "vitest";
import { Status } from "./status.js";

afterEach(cleanup);

it("announces updates with text and exposes a decorative indicator", () => {
  const ref = createRef<HTMLSpanElement>();
  const { rerender } = render(<Status ref={ref}>Unknown</Status>);
  const status = screen.getByRole("status");
  expect(status).toBe(ref.current);
  expect(status.dataset.variant).toBe("neutral");
  expect(status.firstElementChild?.getAttribute("aria-hidden")).toBe("true");

  rerender(
    <Status variant="success" size="sm">
      Operational
    </Status>,
  );
  expect(screen.getByRole("status")).toBe(status);
  expect(status.textContent).toBe("Operational");
  expect(status.dataset.variant).toBe("success");
  expect(status.dataset.size).toBe("sm");
});

it("lets static labels opt out of the live region", () => {
  render(<Status live={false}>Offline</Status>);
  expect(screen.getByText("Offline")).toBeTruthy();
  expect(screen.queryByRole("status")).toBeNull();
});
