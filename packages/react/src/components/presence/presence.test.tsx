// @vitest-environment jsdom
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Presence } from "./presence.js";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

it("keeps exiting content inert, cancels stale exits, and eventually removes it", () => {
  vi.useFakeTimers();
  const preview = (present: boolean) => (
    <Presence present={present} exitDuration={100}>
      <button type="button">Action</button>
    </Presence>
  );
  const { rerender } = render(preview(true));
  rerender(preview(false));
  const action = screen.getByText("Action");
  expect(action.parentElement?.hasAttribute("inert")).toBe(true);
  expect(action.parentElement?.getAttribute("aria-hidden")).toBe("true");
  rerender(preview(true));
  act(() => vi.advanceTimersByTime(100));
  expect(screen.getByRole("button", { name: "Action" })).toBe(action);
  rerender(preview(false));
  act(() => vi.advanceTimersByTime(100));
  expect(screen.queryByText("Action")).toBeNull();
});
