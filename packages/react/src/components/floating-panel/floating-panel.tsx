// SPDX-License-Identifier: MIT
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type {
  ComponentPropsWithRef,
  CSSProperties,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  Ref,
} from "react";

export interface PanelPosition {
  x: number;
  y: number;
}
export interface PanelSize {
  width: number;
  height: number;
}
export type ResizeAxis = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
export type PanelOpenReason =
  "trigger" | "close" | "escape" | "outside" | "programmatic";
export interface PanelOpenDetail {
  reason: PanelOpenReason;
  event?: Event;
}

export interface FloatingPanelRootProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, detail: PanelOpenDetail) => void;
  position?: PanelPosition;
  defaultPosition?: PanelPosition;
  onPositionChange?: (position: PanelPosition) => void;
  onPositionChangeEnd?: (position: PanelPosition) => void;
  size?: PanelSize;
  defaultSize?: PanelSize;
  onSizeChange?: (size: PanelSize) => void;
  onSizeChangeEnd?: (size: PanelSize) => void;
  minSize?: PanelSize;
  maxSize?: PanelSize;
  draggable?: boolean;
  resizable?: boolean;
  closeOnEscape?: boolean;
  closeOnOutside?: boolean;
  restoreFocus?: boolean;
  allowOverflow?: boolean;
  gridSize?: number;
}

type ButtonProps = ComponentPropsWithRef<"button">;
export type FloatingPanelContentProps = HTMLAttributes<HTMLElement>;
export type FloatingPanelTitleProps = ComponentPropsWithRef<"h2">;
export type FloatingPanelDragHandleProps = ButtonProps;
export interface FloatingPanelResizeHandleProps extends ButtonProps {
  axis: ResizeAxis;
}

interface FloatingPanelContextValue {
  open: boolean;
  position: PanelPosition;
  size: PanelSize;
  draggable: boolean;
  resizable: boolean;
  contentId: string;
  titleId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLElement | null>;
  changeOpen: (next: boolean, detail: PanelOpenDetail) => void;
  startDrag: (event: ReactPointerEvent) => void;
  startResize: (axis: ResizeAxis, event: ReactPointerEvent) => void;
  moveBy: (dx: number, dy: number) => void;
  resizeBy: (axis: ResizeAxis, dx: number, dy: number) => void;
}

const FloatingPanelContext = createContext<FloatingPanelContextValue | null>(
  null,
);
const openPanelOrder: symbol[] = [];

function useFloatingPanel() {
  const context = useContext(FloatingPanelContext);
  if (!context)
    throw new Error("FloatingPanel parts must be inside FloatingPanelRoot");
  return context;
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value);
  else if (ref) ref.current = value;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function FloatingPanelRoot({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  position: controlledPosition,
  defaultPosition = { x: 32, y: 96 },
  onPositionChange,
  onPositionChangeEnd,
  size: controlledSize,
  defaultSize = { width: 360, height: 260 },
  onSizeChange,
  onSizeChangeEnd,
  minSize = { width: 160, height: 100 },
  maxSize = { width: Infinity, height: Infinity },
  draggable = true,
  resizable = true,
  closeOnEscape = true,
  closeOnOutside = false,
  restoreFocus = true,
  allowOverflow = true,
  gridSize = 1,
}: FloatingPanelRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [uncontrolledPosition, setUncontrolledPosition] =
    useState(defaultPosition);
  const [uncontrolledSize, setUncontrolledSize] = useState(defaultSize);
  const open = controlledOpen ?? uncontrolledOpen;
  const position = controlledPosition ?? uncontrolledPosition;
  const size = controlledSize ?? uncontrolledSize;
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const orderId = useRef(Symbol("floating-panel"));
  const wasOpen = useRef(false);
  const closeReason = useRef<PanelOpenReason>("programmatic");
  const pointerCleanup = useRef<(() => void) | null>(null);

  const changeOpen = useCallback(
    (next: boolean, detail: PanelOpenDetail) => {
      if (next === open) return;
      if (!next) closeReason.current = detail.reason;
      if (controlledOpen === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next, detail);
    },
    [open, controlledOpen, onOpenChange],
  );

  const setPosition = useCallback(
    (next: PanelPosition) => {
      const bounded = allowOverflow
        ? next
        : {
            x: clamp(next.x, 0, Math.max(0, window.innerWidth - size.width)),
            y: clamp(next.y, 0, Math.max(0, window.innerHeight - size.height)),
          };
      if (controlledPosition === undefined) setUncontrolledPosition(bounded);
      onPositionChange?.(bounded);
      return bounded;
    },
    [
      allowOverflow,
      size.width,
      size.height,
      controlledPosition,
      onPositionChange,
    ],
  );

  const setSize = useCallback(
    (next: PanelSize) => {
      const bounded = {
        width: clamp(next.width, minSize.width, maxSize.width),
        height: clamp(next.height, minSize.height, maxSize.height),
      };
      if (controlledSize === undefined) setUncontrolledSize(bounded);
      onSizeChange?.(bounded);
      return bounded;
    },
    [
      minSize.width,
      minSize.height,
      maxSize.width,
      maxSize.height,
      controlledSize,
      onSizeChange,
    ],
  );

  const moveBy = (dx: number, dy: number) => {
    if (!draggable) return;
    const next = setPosition({ x: position.x + dx, y: position.y + dy });
    onPositionChangeEnd?.(next);
  };

  function resized(
    axis: ResizeAxis,
    dx: number,
    dy: number,
    startPosition: PanelPosition,
    startSize: PanelSize,
  ) {
    const west = axis.includes("w");
    const north = axis.includes("n");
    const width =
      axis.includes("e") || west
        ? clamp(
            startSize.width + (west ? -dx : dx),
            minSize.width,
            maxSize.width,
          )
        : startSize.width;
    const height =
      axis.includes("s") || north
        ? clamp(
            startSize.height + (north ? -dy : dy),
            minSize.height,
            maxSize.height,
          )
        : startSize.height;
    return {
      size: { width, height },
      position: {
        x: startPosition.x + (west ? startSize.width - width : 0),
        y: startPosition.y + (north ? startSize.height - height : 0),
      },
    };
  }

  const resizeBy = (axis: ResizeAxis, dx: number, dy: number) => {
    if (!resizable) return;
    const next = resized(axis, dx, dy, position, size);
    const boundedSize = setSize(next.size);
    onSizeChangeEnd?.(boundedSize);
    if (next.position.x !== position.x || next.position.y !== position.y) {
      const boundedPosition = setPosition(next.position);
      onPositionChangeEnd?.(boundedPosition);
    }
  };

  function startPointer(event: ReactPointerEvent, axis?: ResizeAxis) {
    if (axis ? !resizable : !draggable) return;
    event.preventDefault();
    pointerCleanup.current?.();
    const pointerId = event.pointerId;
    const originX = event.clientX;
    const originY = event.clientY;
    const startPosition = position;
    const startSize = size;
    let lastPosition = position;
    let lastSize = size;
    const snap = (delta: number) =>
      Math.round(delta / Math.max(1, gridSize)) * Math.max(1, gridSize);
    const move = (pointer: PointerEvent) => {
      if (pointer.pointerId !== pointerId) return;
      const dx = snap(pointer.clientX - originX);
      const dy = snap(pointer.clientY - originY);
      if (axis) {
        const next = resized(axis, dx, dy, startPosition, startSize);
        lastSize = setSize(next.size);
        if (
          next.position.x !== startPosition.x ||
          next.position.y !== startPosition.y
        )
          lastPosition = setPosition(next.position);
      } else {
        lastPosition = setPosition({
          x: startPosition.x + dx,
          y: startPosition.y + dy,
        });
      }
    };
    const end = (pointer: PointerEvent) => {
      if (pointer.pointerId !== pointerId) return;
      cleanup();
      if (axis) onSizeChangeEnd?.(lastSize);
      else onPositionChangeEnd?.(lastPosition);
    };
    const cleanup = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      pointerCleanup.current = null;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    pointerCleanup.current = cleanup;
  }

  useEffect(() => () => pointerCleanup.current?.(), []);

  useEffect(() => {
    if (open && !wasOpen.current) {
      closeReason.current = "programmatic";
      contentRef.current?.focus();
    }
    if (
      !open &&
      wasOpen.current &&
      restoreFocus &&
      closeReason.current !== "outside"
    )
      triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open, restoreFocus]);

  useEffect(() => {
    if (!open) return;
    const token = orderId.current;
    openPanelOrder.push(token);
    return () => {
      const index = openPanelOrder.indexOf(token);
      if (index !== -1) openPanelOrder.splice(index, 1);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const token = orderId.current;
    const keydown = (event: KeyboardEvent) => {
      if (
        event.key !== "Escape" ||
        event.defaultPrevented ||
        !closeOnEscape ||
        openPanelOrder.at(-1) !== token
      )
        return;
      event.preventDefault();
      changeOpen(false, { reason: "escape", event });
    };
    const pointerdown = (event: PointerEvent) => {
      if (!closeOnOutside || openPanelOrder.at(-1) !== token) return;
      const target = event.target;
      if (
        target instanceof Node &&
        (contentRef.current?.contains(target) ||
          triggerRef.current?.contains(target))
      )
        return;
      changeOpen(false, { reason: "outside", event });
    };
    document.addEventListener("keydown", keydown);
    document.addEventListener("pointerdown", pointerdown);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("pointerdown", pointerdown);
    };
  }, [open, closeOnEscape, closeOnOutside, changeOpen]);

  return (
    <FloatingPanelContext.Provider
      value={{
        open,
        position,
        size,
        draggable,
        resizable,
        contentId: `${id}-content`,
        titleId: `${id}-title`,
        triggerRef,
        contentRef,
        changeOpen,
        startDrag: (event) => startPointer(event),
        startResize: (axis, event) => startPointer(event, axis),
        moveBy,
        resizeBy,
      }}
    >
      {children}
    </FloatingPanelContext.Provider>
  );
}

export const FloatingPanelTrigger = forwardRef<HTMLButtonElement, ButtonProps>(
  function FloatingPanelTrigger(
    { type = "button", onClick, ...rest },
    forwardedRef,
  ) {
    const panel = useFloatingPanel();
    return (
      <button
        {...rest}
        ref={(element) => {
          panel.triggerRef.current = element;
          assignRef(forwardedRef, element);
        }}
        type={type}
        aria-haspopup="dialog"
        aria-expanded={panel.open}
        aria-controls={panel.contentId}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented)
            panel.changeOpen(true, {
              reason: "trigger",
              event: event.nativeEvent,
            });
        }}
      />
    );
  },
);

export const FloatingPanelContent = forwardRef<
  HTMLElement,
  FloatingPanelContentProps
>(function FloatingPanelContent({ children, style, ...rest }, forwardedRef) {
  const panel = useFloatingPanel();
  if (!panel.open) return null;
  return (
    <section
      {...rest}
      ref={(element) => {
        panel.contentRef.current = element;
        assignRef(forwardedRef, element);
      }}
      id={panel.contentId}
      role="dialog"
      aria-modal="false"
      aria-labelledby={rest["aria-labelledby"] ?? panel.titleId}
      tabIndex={rest.tabIndex ?? -1}
      style={
        {
          position: "fixed",
          left: panel.position.x,
          top: panel.position.y,
          width: panel.size.width,
          height: panel.size.height,
          zIndex: 1000,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </section>
  );
});

export const FloatingPanelTitle = forwardRef<
  HTMLHeadingElement,
  FloatingPanelTitleProps
>(function FloatingPanelTitle({ ...rest }, ref) {
  const panel = useFloatingPanel();
  return <h2 {...rest} id={panel.titleId} ref={ref} />;
});

export const FloatingPanelDragHandle = forwardRef<
  HTMLButtonElement,
  FloatingPanelDragHandleProps
>(function FloatingPanelDragHandle(
  { type = "button", onPointerDown, onKeyDown, disabled, ...rest },
  ref,
) {
  const panel = useFloatingPanel();
  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      disabled={disabled || !panel.draggable}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (!event.defaultPrevented) panel.startDrag(event);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        const delta = arrowDelta(event);
        if (!delta) return;
        event.preventDefault();
        panel.moveBy(delta.x, delta.y);
      }}
    />
  );
});

export const FloatingPanelResizeHandle = forwardRef<
  HTMLButtonElement,
  FloatingPanelResizeHandleProps
>(function FloatingPanelResizeHandle(
  { axis, type = "button", onPointerDown, onKeyDown, disabled, ...rest },
  ref,
) {
  const panel = useFloatingPanel();
  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      data-axis={axis}
      disabled={disabled || !panel.resizable}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (!event.defaultPrevented) panel.startResize(axis, event);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        const delta = arrowDelta(event);
        if (!delta) return;
        event.preventDefault();
        panel.resizeBy(axis, delta.x, delta.y);
      }}
    />
  );
});

export const FloatingPanelClose = forwardRef<HTMLButtonElement, ButtonProps>(
  function FloatingPanelClose({ type = "button", onClick, ...rest }, ref) {
    const panel = useFloatingPanel();
    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented)
            panel.changeOpen(false, {
              reason: "close",
              event: event.nativeEvent,
            });
        }}
      />
    );
  },
);

function arrowDelta(event: ReactKeyboardEvent) {
  const step = event.shiftKey ? 1 : 10;
  if (event.key === "ArrowLeft") return { x: -step, y: 0 };
  if (event.key === "ArrowRight") return { x: step, y: 0 };
  if (event.key === "ArrowUp") return { x: 0, y: -step };
  if (event.key === "ArrowDown") return { x: 0, y: step };
  return null;
}
