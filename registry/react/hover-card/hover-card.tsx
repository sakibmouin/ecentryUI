// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent, ReactNode } from "react";

export interface HoverCardProps {
  triggerLabel: string;
  title: string;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  className?: string;
  id?: string;
}

export function HoverCard({
  triggerLabel,
  title,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  openDelay = 150,
  closeDelay = 180,
  className,
  id,
}: HoverCardProps) {
  const generated = useId();
  const cardId = id ?? generated;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusOnOpen = useRef(false);
  const pointerInside = useRef(false);
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
    if (open && focusOnOpen.current) {
      cardRef.current
        ?.querySelector<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex="0"]',
        )
        ?.focus();
      focusOnOpen.current = false;
    }
  }, [open]);
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
    openTimer.current = setTimeout(() => change(true), openDelay);
  }
  function scheduleClose() {
    clearTimers();
    closeTimer.current = setTimeout(() => {
      const root = rootRef.current;
      if (
        pointerInside.current ||
        root?.contains(root.ownerDocument.activeElement)
      )
        return;
      change(false);
    }, closeDelay);
  }
  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!rootRef.current?.contains(event.relatedTarget as Node))
      scheduleClose();
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      clearTimers();
      change(false);
      triggerRef.current?.focus();
    } else if (
      event.key === "ArrowDown" &&
      event.target === triggerRef.current
    ) {
      event.preventDefault();
      clearTimers();
      if (open)
        cardRef.current
          ?.querySelector<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex="0"]',
          )
          ?.focus();
      else {
        focusOnOpen.current = true;
        change(true);
      }
    }
  }
  return (
    <div
      ref={rootRef}
      className={`ec-hover-card-root${className ? ` ${className}` : ""}`}
      onMouseEnter={() => {
        pointerInside.current = true;
        scheduleOpen();
      }}
      onMouseLeave={() => {
        pointerInside.current = false;
        scheduleClose();
      }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={cardId}
        onFocus={() => {
          clearTimers();
          change(true);
        }}
        onClick={() => {
          clearTimers();
          change(true);
        }}
      >
        {triggerLabel}
      </button>
      {open && (
        <div
          ref={cardRef}
          id={cardId}
          role="dialog"
          aria-labelledby={`${cardId}-title`}
          className="ec-hover-card"
        >
          <h2 id={`${cardId}-title`}>{title}</h2>
          <div className="ec-hover-card__body">{children}</div>
        </div>
      )}
    </div>
  );
}
