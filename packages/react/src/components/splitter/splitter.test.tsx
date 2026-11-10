// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { SplitterRoot, SplitterPanel, SplitterHandle } from "./splitter.js";

afterEach(cleanup);

const panels = [
  { id: "nav", minSize: 15, maxSize: 60 },
  { id: "main", minSize: 25 },
  { id: "detail", minSize: 15 },
];

function ThreePanel(
  props: Partial<React.ComponentProps<typeof SplitterRoot>> = {},
) {
  return (
    <SplitterRoot panels={panels} defaultSize={[25, 50, 25]} {...props}>
      <SplitterPanel id="nav">Navigation</SplitterPanel>
      <SplitterHandle
        between={["nav", "main"]}
        aria-label="Resize navigation"
      />
      <SplitterPanel id="main">Main</SplitterPanel>
      <SplitterHandle
        between={["main", "detail"]}
        aria-label="Resize details"
      />
      <SplitterPanel id="detail">Details</SplitterPanel>
    </SplitterRoot>
  );
}

describe("Splitter", () => {
  it("renders three sized panels with associated, keyboard-focusable separators", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ThreePanel ref={ref} />);
    const root = ref.current!;
    const navigation = screen.getByText("Navigation");
    const handle = screen.getByRole("separator", { name: "Resize navigation" });
    expect(root).toHaveProperty("tagName", "DIV");
    expect(navigation.style.flexGrow).toBe("25");
    expect(screen.getByText("Main").style.flexGrow).toBe("50");
    expect(handle.getAttribute("aria-controls")).toBe(navigation.id);
    expect(handle.getAttribute("aria-valuenow")).toBe("25");
    expect(handle.getAttribute("aria-orientation")).toBe("vertical");
    expect(handle.getAttribute("tabindex")).toBe("0");
  });

  it("resizes only adjacent panels by keyboard and obeys both limits", () => {
    render(<ThreePanel keyboardStep={10} />);
    const handle = screen.getByRole("separator", { name: "Resize navigation" });
    fireEvent.keyDown(handle, { key: "ArrowRight" });
    expect(handle.getAttribute("aria-valuenow")).toBe("35");
    expect(screen.getByText("Main").style.flexGrow).toBe("40");
    expect(screen.getByText("Details").style.flexGrow).toBe("25");
    fireEvent.keyDown(handle, { key: "End" });
    expect(handle.getAttribute("aria-valuenow")).toBe("50");
    fireEvent.keyDown(handle, { key: "Home" });
    expect(handle.getAttribute("aria-valuenow")).toBe("15");
  });

  it("keeps a controlled size until the parent updates it", () => {
    const onResize = vi.fn();
    const { rerender } = render(
      <ThreePanel size={[25, 50, 25]} onResize={onResize} />,
    );
    const handle = screen.getByRole("separator", { name: "Resize navigation" });
    fireEvent.keyDown(handle, { key: "ArrowRight" });
    expect(onResize).toHaveBeenCalledWith([30, 45, 25]);
    expect(handle.getAttribute("aria-valuenow")).toBe("25");
    rerender(<ThreePanel size={[30, 45, 25]} onResize={onResize} />);
    expect(handle.getAttribute("aria-valuenow")).toBe("30");
  });

  it("uses vertical keys and reverses horizontal arrows in RTL", () => {
    const { rerender } = render(<ThreePanel dir="rtl" />);
    let handle = screen.getByRole("separator", { name: "Resize navigation" });
    fireEvent.keyDown(handle, { key: "ArrowRight" });
    expect(handle.getAttribute("aria-valuenow")).toBe("20");
    rerender(<ThreePanel orientation="vertical" />);
    handle = screen.getByRole("separator", { name: "Resize navigation" });
    expect(handle.getAttribute("aria-orientation")).toBe("horizontal");
    fireEvent.keyDown(handle, { key: "ArrowDown", shiftKey: true });
    expect(handle.getAttribute("aria-valuenow")).toBe("30");
  });

  it("supports pointer drag, cancellation, and disabled handles", () => {
    const onResizeEnd = vi.fn();
    render(<ThreePanel onResizeEnd={onResizeEnd} />);
    const root = screen.getByText("Navigation").parentElement!;
    root.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      width: 500,
      height: 200,
      top: 0,
      left: 0,
      right: 500,
      bottom: 200,
      toJSON: () => ({}),
    });
    const handle = screen.getByRole("separator", { name: "Resize navigation" });
    fireEvent.pointerDown(handle, { pointerId: 1, button: 0, clientX: 100 });
    fireEvent.pointerMove(handle, { pointerId: 1, clientX: 150 });
    expect(Number(handle.getAttribute("aria-valuenow"))).toBeGreaterThan(25);
    fireEvent.pointerCancel(handle, { pointerId: 1 });
    expect(handle.getAttribute("aria-valuenow")).toBe("25");
    expect(onResizeEnd).not.toHaveBeenCalled();
  });

  it("commits a pointer drag and cancels a later drag with Escape", () => {
    const onResizeStart = vi.fn();
    const onResizeEnd = vi.fn();
    render(
      <ThreePanel onResizeStart={onResizeStart} onResizeEnd={onResizeEnd} />,
    );
    const root = screen.getByText("Navigation").parentElement!;
    root.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      width: 500,
      height: 200,
      top: 0,
      left: 0,
      right: 500,
      bottom: 200,
      toJSON: () => ({}),
    });
    const handle = screen.getByRole("separator", { name: "Resize navigation" });
    fireEvent.pointerDown(handle, { pointerId: 1, button: 0, clientX: 100 });
    fireEvent.pointerMove(handle, { pointerId: 1, clientX: 150 });
    fireEvent.pointerUp(handle, { pointerId: 1 });
    expect(handle.getAttribute("aria-valuenow")).toBe("35");
    expect(onResizeStart).toHaveBeenCalledTimes(1);
    expect(onResizeEnd).toHaveBeenLastCalledWith([35, 40, 25]);
    fireEvent.pointerDown(handle, { pointerId: 2, button: 0, clientX: 150 });
    fireEvent.pointerMove(handle, { pointerId: 2, clientX: 200 });
    fireEvent.keyDown(handle, { key: "Escape" });
    expect(handle.getAttribute("aria-valuenow")).toBe("35");
    expect(onResizeEnd).toHaveBeenCalledTimes(1);
  });

  it("rejects invalid sizes and disables interaction", () => {
    expect(() => render(<ThreePanel defaultSize={[50, 50]} />)).toThrow();
    render(<ThreePanel disabled />);
    const handle = screen.getByRole("separator", { name: "Resize navigation" });
    expect(handle.getAttribute("aria-disabled")).toBe("true");
    fireEvent.keyDown(handle, { key: "ArrowRight" });
    expect(handle.getAttribute("aria-valuenow")).toBe("25");
  });
});
