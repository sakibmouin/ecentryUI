// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Clipboard } from "./clipboard.js";

afterEach(cleanup);
describe("Clipboard", () => {
  it("copies the exact value and announces success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    const onCopy = vi.fn();
    render(<Clipboard value="<safe>" onCopy={onCopy} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("<safe>"));
    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toBe("Copied"),
    );
    expect(onCopy).toHaveBeenCalledWith("<safe>");
    expect(screen.getByText("<safe>").innerHTML).toBe("&lt;safe&gt;");
  });
  it("announces permission failure and permits retry", async () => {
    const writeText = vi
      .fn()
      .mockRejectedValueOnce(new Error("denied"))
      .mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    const onError = vi.fn();
    render(<Clipboard value="retry" onError={onError} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toBe("Copy failed"),
    );
    expect(onError).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toBe("Copied"),
    );
  });
  it("does not copy while disabled or loading", () => {
    const writeText = vi.fn();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    const { rerender } = render(<Clipboard value="x" disabled />);
    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true);
    rerender(<Clipboard value="x" loading />);
    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true);
    expect(screen.getByRole("group").getAttribute("aria-busy")).toBe("true");
    expect(writeText).not.toHaveBeenCalled();
  });
});
