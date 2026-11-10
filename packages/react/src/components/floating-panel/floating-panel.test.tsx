// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import type { ComponentProps } from "react";
import {
  FloatingPanelRoot,
  FloatingPanelTrigger,
  FloatingPanelContent,
  FloatingPanelTitle,
  FloatingPanelDragHandle,
  FloatingPanelResizeHandle,
  FloatingPanelClose,
} from "./floating-panel.js";

afterEach(cleanup);

function Example(
  props: Omit<ComponentProps<typeof FloatingPanelRoot>, "children">,
) {
  return (
    <FloatingPanelRoot {...props}>
      <FloatingPanelTrigger>Open panel</FloatingPanelTrigger>
      <FloatingPanelContent>
        <FloatingPanelTitle>Notes</FloatingPanelTitle>
        <FloatingPanelDragHandle>Move panel</FloatingPanelDragHandle>
        <p>Panel body</p>
        <FloatingPanelResizeHandle axis="se">
          Resize panel
        </FloatingPanelResizeHandle>
        <FloatingPanelResizeHandle axis="w">
          Resize west
        </FloatingPanelResizeHandle>
        <FloatingPanelClose>Close panel</FloatingPanelClose>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}

describe("FloatingPanel", () => {
  it("opens, labels content, closes on Escape, and restores trigger focus", () => {
    const onOpenChange = vi.fn();
    render(<Example onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole("button", { name: "Open panel" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Notes" });
    expect(dialog.getAttribute("aria-modal")).toBe("false");
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(document.activeElement).toBe(dialog);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(onOpenChange).toHaveBeenLastCalledWith(
      false,
      expect.objectContaining({ reason: "escape" }),
    );
  });

  it("moves with pointer and keyboard and resizes within limits", () => {
    const onPositionChange = vi.fn();
    const onSizeChange = vi.fn();
    render(
      <Example
        defaultOpen
        defaultPosition={{ x: 40, y: 80 }}
        defaultSize={{ width: 300, height: 200 }}
        minSize={{ width: 200, height: 150 }}
        maxSize={{ width: 400, height: 300 }}
        onPositionChange={onPositionChange}
        onSizeChange={onSizeChange}
      />,
    );
    const dialog = screen.getByRole("dialog", { name: "Notes" });
    const drag = screen.getByRole("button", { name: "Move panel" });
    const resize = screen.getByRole("button", { name: "Resize panel" });
    expect(dialog.style.left).toBe("40px");
    expect(dialog.style.top).toBe("80px");
    fireEvent.pointerDown(drag, { pointerId: 1, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(window, { pointerId: 1, clientX: 130, clientY: 115 });
    fireEvent.pointerUp(window, { pointerId: 1 });
    expect(dialog.style.left).toBe("70px");
    expect(dialog.style.top).toBe("95px");
    drag.focus();
    fireEvent.keyDown(drag, { key: "ArrowLeft" });
    expect(dialog.style.left).toBe("60px");
    expect(onPositionChange).toHaveBeenCalled();
    fireEvent.pointerDown(resize, { pointerId: 2, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(window, { pointerId: 2, clientX: 250, clientY: 250 });
    fireEvent.pointerUp(window, { pointerId: 2 });
    expect(dialog.style.width).toBe("400px");
    expect(dialog.style.height).toBe("300px");
    fireEvent.keyDown(resize, { key: "ArrowLeft" });
    expect(dialog.style.width).toBe("390px");
    expect(onSizeChange).toHaveBeenCalled();
  });

  it("supports controlled state and optional outside dismissal", () => {
    const onOpenChange = vi.fn();
    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <Example
          open={open}
          onOpenChange={(next, detail) => {
            onOpenChange(next, detail);
            setOpen(next);
          }}
          closeOnOutside
        />
      );
    }
    render(<Controlled />);
    fireEvent.click(screen.getByRole("button", { name: "Open panel" }));
    expect(screen.getByRole("dialog", { name: "Notes" })).toBeTruthy();
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(onOpenChange).toHaveBeenLastCalledWith(
      false,
      expect.objectContaining({ reason: "outside" }),
    );
  });

  it("disables pointer and keyboard manipulation when requested", () => {
    render(<Example defaultOpen draggable={false} resizable={false} />);
    const dialog = screen.getByRole("dialog", { name: "Notes" });
    fireEvent.keyDown(screen.getByRole("button", { name: "Move panel" }), {
      key: "ArrowRight",
    });
    fireEvent.keyDown(screen.getByRole("button", { name: "Resize panel" }), {
      key: "ArrowRight",
    });
    expect(dialog.style.left).toBe("32px");
    expect(dialog.style.width).toBe("360px");
  });

  it("updates controlled position and size through keyboard callbacks", () => {
    const onPositionChange = vi.fn();
    const onSizeChange = vi.fn();
    function ControlledRect() {
      const [position, setPosition] = useState({ x: 12, y: 24 });
      const [size, setSize] = useState({ width: 240, height: 180 });
      return (
        <Example
          defaultOpen
          position={position}
          size={size}
          onPositionChange={(next) => {
            onPositionChange(next);
            setPosition(next);
          }}
          onSizeChange={(next) => {
            onSizeChange(next);
            setSize(next);
          }}
        />
      );
    }
    render(<ControlledRect />);
    const dialog = screen.getByRole("dialog", { name: "Notes" });
    fireEvent.keyDown(screen.getByRole("button", { name: "Move panel" }), {
      key: "ArrowRight",
      shiftKey: true,
    });
    expect(dialog.style.left).toBe("13px");
    fireEvent.keyDown(screen.getByRole("button", { name: "Resize panel" }), {
      key: "ArrowDown",
    });
    expect(dialog.style.height).toBe("190px");
    expect(onPositionChange).toHaveBeenLastCalledWith({ x: 13, y: 24 });
    expect(onSizeChange).toHaveBeenLastCalledWith({ width: 240, height: 190 });
  });

  it("closes only the topmost panel on Escape and leaves persistent panels open on outside input", () => {
    render(
      <>
        <Example defaultOpen />
        <Example defaultOpen />
      </>,
    );
    expect(screen.getAllByRole("dialog", { name: "Notes" })).toHaveLength(2);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getAllByRole("dialog", { name: "Notes" })).toHaveLength(1);
    fireEvent.pointerDown(document.body);
    expect(screen.getAllByRole("dialog", { name: "Notes" })).toHaveLength(1);
  });

  it("snaps movement, constrains overflow, and keeps the opposite edge fixed while resizing west", () => {
    render(
      <Example
        defaultOpen
        defaultPosition={{ x: 40, y: 60 }}
        defaultSize={{ width: 300, height: 200 }}
        gridSize={10}
        allowOverflow={false}
      />,
    );
    const dialog = screen.getByRole("dialog", { name: "Notes" });
    const drag = screen.getByRole("button", { name: "Move panel" });
    fireEvent.pointerDown(drag, { pointerId: 3, clientX: 0, clientY: 0 });
    fireEvent.pointerMove(window, { pointerId: 3, clientX: 17, clientY: 17 });
    fireEvent.pointerUp(window, { pointerId: 3 });
    expect(dialog.style.left).toBe("60px");
    expect(dialog.style.top).toBe("80px");
    const west = screen.getByRole("button", { name: "Resize west" });
    fireEvent.pointerDown(west, { pointerId: 4, clientX: 0, clientY: 0 });
    fireEvent.pointerMove(window, { pointerId: 4, clientX: 50, clientY: 0 });
    fireEvent.pointerUp(window, { pointerId: 4 });
    expect(dialog.style.left).toBe("110px");
    expect(dialog.style.width).toBe("250px");
    fireEvent.pointerDown(drag, { pointerId: 5, clientX: 0, clientY: 0 });
    fireEvent.pointerMove(window, {
      pointerId: 5,
      clientX: 3000,
      clientY: 3000,
    });
    fireEvent.pointerUp(window, { pointerId: 5 });
    expect(dialog.style.left).toBe(`${window.innerWidth - 250}px`);
    expect(dialog.style.top).toBe(`${window.innerHeight - 200}px`);
  });
});
