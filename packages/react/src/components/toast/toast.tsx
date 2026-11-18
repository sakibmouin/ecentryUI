// SPDX-License-Identifier: MIT
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  tone?: "info" | "success" | "error";
  duration?: number;
  action?: { label: string; onClick: () => void };
}

export interface ToastProps {
  children: (enqueue: (item: ToastItem) => void) => ReactNode;
  items?: ToastItem[];
  defaultItems?: ToastItem[];
  onItemsChange?: (items: ToastItem[]) => void;
  className?: string;
}

export function Toast({
  children,
  items: controlledItems,
  defaultItems = [],
  onItemsChange,
  className,
}: ToastProps) {
  const [internalItems, setInternalItems] = useState(defaultItems);
  const [paused, setPaused] = useState(false);
  const items = controlledItems ?? internalItems;
  const current = items[0];
  const origin = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;
  function change(next: ToastItem[]) {
    itemsRef.current = next;
    if (controlledItems === undefined) setInternalItems(next);
    onItemsChange?.(next);
  }
  function enqueue(item: ToastItem) {
    origin.current = document.activeElement as HTMLElement;
    const currentItems = itemsRef.current;
    if (currentItems.some((entry) => entry.id === item.id)) return;
    change([...currentItems, item]);
  }
  function dismiss() {
    const focusInside = viewportRef.current?.contains(document.activeElement);
    change(itemsRef.current.slice(1));
    if (focusInside) queueMicrotask(() => origin.current?.focus());
  }
  useEffect(() => {
    if (!current || paused || current.duration === 0) return;
    const timer = setTimeout(() => dismiss(), current.duration ?? 5000);
    return () => clearTimeout(timer);
  }, [current?.id, current?.duration, paused]);
  return (
    <div className={`ec-toast-root${className ? ` ${className}` : ""}`}>
      {children(enqueue)}
      <div
        ref={viewportRef}
        className="ec-toast-viewport"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node))
            setPaused(false);
        }}
      >
        {current && (
          <div
            className="ec-toast"
            data-tone={current.tone ?? "info"}
            role={current.tone === "error" ? "alert" : "status"}
          >
            <div className="ec-toast__content">
              <strong>{current.title}</strong>
              {current.description && <p>{current.description}</p>}
            </div>
            {current.action && (
              <button
                type="button"
                onClick={() => {
                  current.action?.onClick();
                  dismiss();
                }}
              >
                {current.action.label}
              </button>
            )}
            <button
              type="button"
              className="ec-toast__dismiss"
              aria-label={`Dismiss ${current.title}`}
              onClick={dismiss}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
