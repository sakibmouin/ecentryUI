// SPDX-License-Identifier: MIT
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import type {
  CSSProperties,
  HTMLAttributes,
  PointerEvent,
  KeyboardEvent,
} from "react";

export interface SplitterPanelDefinition {
  id: string;
  minSize?: number;
  maxSize?: number;
}

export interface SplitterRootProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onResize" | "onResizeStart" | "onResizeEnd"
> {
  panels: SplitterPanelDefinition[];
  size?: number[];
  defaultSize?: number[];
  onResize?: (size: number[]) => void;
  onResizeStart?: () => void;
  onResizeEnd?: (size: number[]) => void;
  orientation?: "horizontal" | "vertical";
  keyboardStep?: number;
  disabled?: boolean;
}

interface SplitterContextValue {
  panels: SplitterPanelDefinition[];
  size: number[];
  orientation: "horizontal" | "vertical";
  keyboardStep: number;
  disabled: boolean;
  rootRef: React.RefObject<HTMLDivElement | null>;
  panelId: (id: string) => string;
  bounds: (index: number, values?: number[]) => [number, number];
  resize: (index: number, left: number, values?: number[]) => number[];
  restore: (values: number[]) => void;
  onResizeStart?: () => void;
  onResizeEnd?: (size: number[]) => void;
}

const SplitterContext = createContext<SplitterContextValue | null>(null);

function useSplitter() {
  const context = useContext(SplitterContext);
  if (!context) throw new Error("Splitter parts must be inside SplitterRoot");
  return context;
}

function validateSizes(panels: SplitterPanelDefinition[], sizes: number[]) {
  if (
    panels.length < 2 ||
    new Set(panels.map((panel) => panel.id)).size !== panels.length
  ) {
    throw new Error("Splitter requires at least two panels with unique IDs");
  }
  if (
    sizes.length !== panels.length ||
    sizes.some((value) => !Number.isFinite(value) || value < 0) ||
    Math.abs(sizes.reduce((sum, value) => sum + value, 0) - 100) > 0.01
  ) {
    throw new RangeError(
      "Splitter sizes must be nonnegative percentages totaling 100",
    );
  }
  panels.forEach((panel, index) => {
    const min = panel.minSize ?? 0;
    const max = panel.maxSize ?? 100;
    if (
      !Number.isFinite(min) ||
      !Number.isFinite(max) ||
      min < 0 ||
      max > 100 ||
      min > max ||
      sizes[index]! < min ||
      sizes[index]! > max
    ) {
      throw new RangeError(
        `Splitter panel ${panel.id} has invalid size limits`,
      );
    }
  });
}

export const SplitterRoot = forwardRef<HTMLDivElement, SplitterRootProps>(
  function SplitterRoot(
    {
      panels,
      size,
      defaultSize,
      onResize,
      onResizeStart,
      onResizeEnd,
      orientation = "horizontal",
      keyboardStep = 5,
      disabled = false,
      className,
      style,
      dir,
      children,
      ...rest
    },
    forwardedRef,
  ) {
    const rootRef = useRef<HTMLDivElement>(null);
    const id = useId();
    const [internalSize, setInternalSize] = useState(
      () => defaultSize ?? panels.map(() => 100 / panels.length),
    );
    const values = size ?? internalSize;
    validateSizes(panels, values);
    if (!Number.isFinite(keyboardStep) || keyboardStep <= 0)
      throw new RangeError("Splitter keyboardStep must be positive");

    const commit = (next: number[]) => {
      if (
        next.every((value, index) => Math.abs(value - values[index]!) < 0.001)
      )
        return;
      if (size === undefined) setInternalSize(next);
      onResize?.(next);
    };
    const bounds = (index: number, current = values): [number, number] => {
      const left = panels[index]!;
      const right = panels[index + 1]!;
      const total = current[index]! + current[index + 1]!;
      return [
        Math.max(left.minSize ?? 0, total - (right.maxSize ?? 100)),
        Math.min(left.maxSize ?? 100, total - (right.minSize ?? 0)),
      ];
    };
    const resize = (index: number, desired: number, current = values) => {
      const [min, max] = bounds(index, current);
      const total = current[index]! + current[index + 1]!;
      const left =
        Math.round(Math.min(max, Math.max(min, desired)) * 100) / 100;
      const next = current.map((value, item) =>
        item === index
          ? left
          : item === index + 1
            ? Math.round((total - left) * 100) / 100
            : value,
      );
      commit(next);
      return next;
    };
    const context: SplitterContextValue = {
      panels,
      size: values,
      orientation,
      keyboardStep,
      disabled,
      rootRef,
      panelId: (panelId) => `${id}-${panelId}`,
      bounds,
      resize,
      restore: (next) => {
        if (size === undefined) setInternalSize(next);
        onResize?.(next);
      },
      ...(onResizeStart ? { onResizeStart } : {}),
      ...(onResizeEnd ? { onResizeEnd } : {}),
    };
    return (
      <SplitterContext.Provider value={context}>
        <div
          {...rest}
          ref={(node) => {
            rootRef.current = node;
            if (typeof forwardedRef === "function") forwardedRef(node);
            else if (forwardedRef) forwardedRef.current = node;
          }}
          dir={dir}
          data-orientation={orientation}
          data-disabled={disabled ? "" : undefined}
          className={`ec-splitter${className ? ` ${className}` : ""}`}
          style={style}
        >
          {children}
        </div>
      </SplitterContext.Provider>
    );
  },
);

export interface SplitterPanelProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

export const SplitterPanel = forwardRef<HTMLDivElement, SplitterPanelProps>(
  function SplitterPanel({ id, className, style, ...rest }, ref) {
    const context = useSplitter();
    const index = context.panels.findIndex((panel) => panel.id === id);
    if (index < 0) throw new Error(`Unknown Splitter panel: ${id}`);
    return (
      <div
        {...rest}
        ref={ref}
        id={context.panelId(id)}
        data-ec-splitter-panel={id}
        className={`ec-splitter-panel${className ? ` ${className}` : ""}`}
        style={
          { flex: `${context.size[index]} 1 0%`, ...style } as CSSProperties
        }
      />
    );
  },
);

export interface SplitterHandleProps extends HTMLAttributes<HTMLDivElement> {
  between: readonly [string, string];
  disabled?: boolean;
}

interface DragState {
  pointerId: number;
  start: number;
  sizes: number[];
  latest: number[];
}

export const SplitterHandle = forwardRef<HTMLDivElement, SplitterHandleProps>(
  function SplitterHandle(
    {
      between,
      disabled = false,
      className,
      onKeyDown,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      ...rest
    },
    ref,
  ) {
    const context = useSplitter();
    const index = context.panels.findIndex((panel) => panel.id === between[0]);
    if (index < 0 || context.panels[index + 1]?.id !== between[1])
      throw new Error("Splitter handle must join adjacent panels");
    const drag = useRef<DragState | null>(null);
    const isDisabled = context.disabled || disabled;
    const [min, max] = context.bounds(index);
    const current = context.size[index]!;
    const horizontal = context.orientation === "horizontal";
    const direction = () =>
      horizontal &&
      context.rootRef.current?.closest("[dir]")?.getAttribute("dir") === "rtl"
        ? -1
        : 1;

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || isDisabled) return;
      if (event.key === "Escape" && drag.current) {
        const active = drag.current;
        context.restore(active.sizes);
        drag.current = null;
        if (event.currentTarget.hasPointerCapture?.(active.pointerId)) {
          event.currentTarget.releasePointerCapture(active.pointerId);
        }
        event.preventDefault();
        return;
      }
      let desired: number | undefined;
      const step = context.keyboardStep * (event.shiftKey ? 2 : 1);
      if (event.key === "Home") desired = min;
      else if (event.key === "End") desired = max;
      else if (horizontal && event.key === "ArrowRight")
        desired = current + step * direction();
      else if (horizontal && event.key === "ArrowLeft")
        desired = current - step * direction();
      else if (!horizontal && event.key === "ArrowDown")
        desired = current + step;
      else if (!horizontal && event.key === "ArrowUp") desired = current - step;
      if (desired === undefined) return;
      event.preventDefault();
      context.onResizeStart?.();
      const next = context.resize(index, desired);
      context.onResizeEnd?.(next);
    };
    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
      onPointerDown?.(event);
      if (event.defaultPrevented || isDisabled || event.button !== 0) return;
      drag.current = {
        pointerId: event.pointerId,
        start: horizontal ? event.clientX : event.clientY,
        sizes: [...context.size],
        latest: [...context.size],
      };
      event.currentTarget.setPointerCapture?.(event.pointerId);
      context.onResizeStart?.();
      event.preventDefault();
    };
    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(event);
      const active = drag.current;
      if (!active || active.pointerId !== event.pointerId) return;
      const root = context.rootRef.current;
      if (!root) return;
      const extent = horizontal
        ? root.getBoundingClientRect().width
        : root.getBoundingClientRect().height;
      if (extent <= 0) return;
      const delta =
        (((horizontal ? event.clientX : event.clientY) - active.start) /
          extent) *
        100 *
        direction();
      active.latest = context.resize(
        index,
        active.sizes[index]! + delta,
        active.sizes,
      );
    };
    const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
      onPointerUp?.(event);
      if (!drag.current || drag.current.pointerId !== event.pointerId) return;
      context.onResizeEnd?.(drag.current.latest);
      drag.current = null;
    };
    const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
      onPointerCancel?.(event);
      if (!drag.current || drag.current.pointerId !== event.pointerId) return;
      context.restore(drag.current.sizes);
      drag.current = null;
    };
    return (
      <div
        {...rest}
        ref={ref}
        role="separator"
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled || undefined}
        aria-orientation={horizontal ? "vertical" : "horizontal"}
        aria-controls={context.panelId(between[0])}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-valuetext={`${current.toFixed(1)}%`}
        data-orientation={context.orientation}
        className={`ec-splitter-handle${className ? ` ${className}` : ""}`}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      />
    );
  },
);
