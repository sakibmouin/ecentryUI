// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Pagination } from "./pagination.js";
afterEach(cleanup);
describe("Pagination", () => {
  it("navigates within bounds in uncontrolled mode", () => {
    const onPageChange = vi.fn();
    const ref = createRef<HTMLElement>();
    render(
      <Pagination
        ref={ref}
        count={3}
        defaultPage={2}
        onPageChange={onPageChange}
      />,
    );
    expect(ref.current).toBe(
      screen.getByRole("navigation", { name: "Pagination" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(
      screen
        .getByRole("button", { name: "Page 3" })
        .getAttribute("aria-current"),
    ).toBe("page");
    expect(
      screen
        .getByRole("button", { name: "Next page" })
        .hasAttribute("disabled"),
    ).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Previous page" }));
    expect(onPageChange.mock.calls).toEqual([[3], [2]]);
  });
  it("respects controlled state and keyboard activation", () => {
    const onPageChange = vi.fn();
    const { rerender } = render(
      <Pagination count={20} page={10} onPageChange={onPageChange} />,
    );
    expect(screen.getAllByText("…")).toHaveLength(2);
    fireEvent.click(screen.getByRole("button", { name: "Page 11" }));
    expect(onPageChange).toHaveBeenCalledWith(11);
    expect(
      screen
        .getByRole("button", { name: "Page 10" })
        .getAttribute("aria-current"),
    ).toBe("page");
    rerender(<Pagination count={20} page={11} onPageChange={onPageChange} />);
    expect(
      screen
        .getByRole("button", { name: "Page 11" })
        .getAttribute("aria-current"),
    ).toBe("page");
  });
  it("clamps invalid page and count values", () => {
    render(<Pagination count={0} defaultPage={99} />);
    expect(
      screen
        .getByRole("button", { name: "Page 1" })
        .getAttribute("aria-current"),
    ).toBe("page");
    expect(
      screen
        .getByRole("button", { name: "Previous page" })
        .hasAttribute("disabled"),
    ).toBe(true);
  });
});
