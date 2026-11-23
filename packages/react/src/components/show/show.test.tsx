// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Show } from "./show.js";

afterEach(cleanup);

it("renders fallback or evaluates the render function for a truthy value", () => {
  const children = vi.fn((value: { label: string }) => <p>{value.label}</p>);
  const { rerender } = render(
    <Show when={null} fallback="No record">
      {children}
    </Show>,
  );
  expect(screen.getByText("No record")).toBeTruthy();
  expect(children).not.toHaveBeenCalled();
  rerender(<Show when={{ label: "Open" }}>{children}</Show>);
  expect(screen.getByText("Open")).toBeTruthy();
});
