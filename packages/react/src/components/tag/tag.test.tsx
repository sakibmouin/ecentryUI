// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Tag } from "./tag.js";

afterEach(cleanup);

it("exposes a named native remove action and honors disabled", () => {
  const remove = vi.fn();
  const { rerender } = render(
    <Tag onRemove={remove} removeLabel="Remove Design">
      Design
    </Tag>,
  );
  const action = screen.getByRole<HTMLButtonElement>("button", {
    name: "Remove Design",
  });
  expect(action.type).toBe("button");
  fireEvent.click(action);
  expect(remove).toHaveBeenCalledTimes(1);
  rerender(
    <Tag onRemove={remove} removeLabel="Remove Design" disabled>
      Design
    </Tag>,
  );
  expect(action.disabled).toBe(true);
  fireEvent.click(action);
  expect(remove).toHaveBeenCalledTimes(1);
});

it("renders static text as a passive label", () => {
  render(
    <Tag variant="accent" size="sm">
      Design
    </Tag>,
  );
  expect(screen.getByText("Design").closest(".ec-tag")).toMatchObject({
    dataset: { variant: "accent", size: "sm" },
  });
  expect(screen.queryByRole("button")).toBeNull();
});
