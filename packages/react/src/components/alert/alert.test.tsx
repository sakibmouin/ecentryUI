// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Alert } from "./alert.js";

afterEach(cleanup);
describe("Alert", () => {
  it("uses polite status for informational and success messages", () => {
    const { rerender } = render(
      <Alert title="Saved">Your changes are available.</Alert>,
    );
    expect(screen.getByRole("status", { name: "Saved" }).textContent).toContain(
      "Your changes are available.",
    );
    rerender(
      <Alert variant="success" title="Complete">
        Done.
      </Alert>,
    );
    expect(screen.getByRole("status", { name: "Complete" })).toBeTruthy();
  });
  it("uses assertive alert semantics for warnings and errors", () => {
    const { rerender } = render(
      <Alert variant="warning" title="Caution">
        Review this.
      </Alert>,
    );
    expect(screen.getByRole("alert", { name: "Caution" })).toBeTruthy();
    rerender(
      <Alert variant="error" title="Failed">
        Try again.
      </Alert>,
    );
    expect(screen.getByRole("alert", { name: "Failed" })).toBeTruthy();
  });
  it("shows loading state and dismisses on demand", () => {
    const onDismiss = vi.fn();
    render(
      <>
        <Alert
          title="Uploading"
          loading
          dismissible
          onDismiss={onDismiss}
          action={<button>Cancel upload</button>}
        >
          Please wait.
        </Alert>
        <button>Next action</button>
      </>,
    );
    const status = screen.getByRole("status", { name: "Uploading" });
    expect(status.getAttribute("aria-busy")).toBe("true");
    expect(screen.getByRole("button", { name: "Cancel upload" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Dismiss alert" }));
    expect(screen.queryByRole("status")).toBeNull();
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Next action" }),
    );
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
