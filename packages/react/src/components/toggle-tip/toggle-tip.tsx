// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent, ReactNode } from "react";

export interface ToggleTipProps {
  label: string;
  title: string;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  id?: string;
}

export function ToggleTip({
  label,
  title,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  id,
}: ToggleTipProps) {
  const generatedId = useId();
  const tipId = id ?? generatedId;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const restoreFocus = useRef(false);
  function change(next: boolean) {
    if (next === open) return;
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }
  function close(restore = false) {
    restoreFocus.current = restore;
    change(false);
  }
  useEffect(() => {
    if (open && !wasOpen.current) panelRef.current?.focus();
    else if (!open && wasOpen.current && restoreFocus.current) {
      triggerRef.current?.focus();
      restoreFocus.current = false;
    }
    wasOpen.current = open;
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open, controlledOpen]);
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (open && event.key === "Escape") {
      event.preventDefault();
      close(true);
    }
  }
  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (open && !event.currentTarget.contains(event.relatedTarget as Node))
      close();
  }
  return (
    <div
      ref={rootRef}
      className={`ec-toggle-tip-root${className ? ` ${className}` : ""}`}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={tipId}
        onClick={() => (open ? close(true) : change(true))}
      >
        ?
      </button>
      {open && (
        <div
          ref={panelRef}
          id={tipId}
          role="dialog"
          aria-labelledby={`${tipId}-title`}
          tabIndex={-1}
          className="ec-toggle-tip"
        >
          <div className="ec-toggle-tip__header">
            <h2 id={`${tipId}-title`}>{title}</h2>
            <button
              type="button"
              aria-label={`Close ${title}`}
              onClick={() => close(true)}
            >
              ×
            </button>
          </div>
          <div className="ec-toggle-tip__body">{children}</div>
        </div>
      )}
    </div>
  );
}
