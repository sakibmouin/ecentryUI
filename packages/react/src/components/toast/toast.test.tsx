// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { useState } from "react";
import { Toast } from "./toast.js";
import type { ToastItem } from "./toast.js";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
describe("Toast", () => {
  it("queues messages and advances after dismissing the first", () => {
    render(
      <Toast>
        {(enqueue) => (
          <button
            onClick={() => {
              enqueue({ id: "one", title: "First", duration: 0 });
              enqueue({ id: "two", title: "Second", duration: 0 });
            }}
          >
            Notify
          </button>
        )}
      </Toast>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Notify" }));
    expect(screen.getByRole("status").textContent).toContain("First");
    fireEvent.click(screen.getByRole("button", { name: "Dismiss First" }));
    expect(screen.getByRole("status").textContent).toContain("Second");
  });
  it("runs an action and announces errors", () => {
    const action = vi.fn();
    render(
      <Toast
        defaultItems={[
          {
            id: "error",
            title: "Failed",
            tone: "error",
            duration: 0,
            action: { label: "Retry", onClick: action },
          },
        ]}
      >
        {() => null}
      </Toast>,
    );
    expect(screen.getByRole("alert").textContent).toContain("Failed");
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(action).toHaveBeenCalledOnce();
    expect(screen.queryByRole("alert")).toBeNull();
  });
  it("pauses a timer on hover and supports controlled items", () => {
    vi.useFakeTimers();
    function Example() {
      const [items, setItems] = useState<ToastItem[]>([
        { id: "one", title: "Saved", duration: 100 },
      ]);
      return (
        <Toast items={items} onItemsChange={setItems}>
          {() => null}
        </Toast>
      );
    }
    const { container } = render(<Example />);
    const viewport = container.querySelector(".ec-toast-viewport")!;
    fireEvent.mouseEnter(viewport);
    act(() => vi.advanceTimersByTime(200));
    expect(screen.getByRole("status")).toBeTruthy();
    fireEvent.mouseLeave(viewport);
    act(() => vi.advanceTimersByTime(100));
    expect(screen.queryByRole("status")).toBeNull();
  });
});
