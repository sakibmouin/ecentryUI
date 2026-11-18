// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export interface TooltipProps {
  triggerLabel: string;
  content: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  className?: string;
  id?: string;
}

export function Tooltip({
  triggerLabel,
  content,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  openDelay = 300,
  closeDelay = 100,
  className,
  id,
}: TooltipProps) {
  const generatedId = useId();
  const tooltipId = id ?? generatedId;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const rootRef = useRef<HTMLSpanElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function change(next: boolean) {
    if (next === open) return;
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }
  function clearTimers() {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }
  useEffect(() => () => clearTimers(), []);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) change(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open, controlledOpen]);
  function scheduleOpen() {
    clearTimers();
    if (open) return;
    openTimer.current = setTimeout(() => change(true), openDelay);
  }
  function scheduleClose() {
    clearTimers();
    closeTimer.current = setTimeout(() => change(false), closeDelay);
  }
  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      clearTimers();
      change(false);
    }
  }
  return (
    <span
      ref={rootRef}
      className={`ec-tooltip-root${className ? ` ${className}` : ""}`}
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        aria-describedby={open ? tooltipId : undefined}
        onFocus={() => {
          clearTimers();
          change(true);
        }}
        onBlur={scheduleClose}
      >
        {triggerLabel}
      </button>
      {open && (
        <span id={tooltipId} role="tooltip" className="ec-tooltip">
          {content}
        </span>
      )}
    </span>
  );
}
