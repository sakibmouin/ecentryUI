// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { For } from "./for.js";

afterEach(cleanup);

it("renders an empty fallback and retains keyed elements on reorder", () => {
  const list = (each: readonly string[]) => (
    <ul>
      <For each={each} getKey={(item) => item} fallback={<li>Empty</li>}>
        {(item, index) => (
          <li>
            {item} {index + 1}
          </li>
        )}
      </For>
    </ul>
  );
  const { rerender } = render(list(["Red", "Blue"]));
  const red = screen.getByText("Red 1");
  rerender(list(["Blue", "Red"]));
  expect(screen.getByText("Red 2")).toBe(red);
  expect(
    within(screen.getByRole("list")).getAllByRole("listitem"),
  ).toHaveLength(2);
  rerender(list([]));
  expect(screen.getByText("Empty")).toBeTruthy();
});
