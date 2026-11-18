// SPDX-License-Identifier: MIT
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent, ReactNode } from "react";

export interface PopoverProps {
  triggerLabel: string;
  title: string;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: "top" | "bottom";
  align?: "start" | "end";
  className?: string;
  id?: string;
}

export function Popover({
  triggerLabel,
  title,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom",
  align = "start",
  className,
  id,
}: PopoverProps) {
  const generatedId = useId();
  const popoverId = id ?? generatedId;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const [position, setPosition] = useState({ top: 0, left: 0 });
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
  useLayoutEffect(() => {
    if (!open) return;
    function update() {
      const trigger = triggerRef.current?.getBoundingClientRect();
      const panel = panelRef.current?.getBoundingClientRect();
      if (!trigger || !panel) return;
      const desiredTop =
        placement === "bottom"
          ? trigger.bottom + 8
          : trigger.top - panel.height - 8;
      const oppositeTop =
        placement === "bottom"
          ? trigger.top - panel.height - 8
          : trigger.bottom + 8;
      const top =
        desiredTop + panel.height > window.innerHeight - 8 || desiredTop < 8
          ? oppositeTop
          : desiredTop;
      const desiredLeft =
        align === "start" ? trigger.left : trigger.right - panel.width;
      setPosition({
        top: Math.max(8, Math.min(top, window.innerHeight - panel.height - 8)),
        left: Math.max(
          8,
          Math.min(desiredLeft, window.innerWidth - panel.width - 8),
        ),
      });
    }
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, placement, align]);
  useEffect(() => {
    if (open && !wasOpen.current) {
      panelRef.current
        ?.querySelector<HTMLElement>(
          'button:not(:disabled), a[href], input, [tabindex="0"]',
        )
        ?.focus();
    } else if (!open && wasOpen.current && restoreFocus.current) {
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
    if (event.key === "Escape" && open) {
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
      className={`ec-popover-root${className ? ` ${className}` : ""}`}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={popoverId}
        onClick={() => (open ? close(true) : change(true))}
      >
        {triggerLabel}
      </button>
      {open && (
        <div
          ref={panelRef}
          id={popoverId}
          role="dialog"
          aria-labelledby={`${popoverId}-title`}
          className="ec-popover"
          style={position}
        >
          <div className="ec-popover__header">
            <h2 id={`${popoverId}-title`}>{title}</h2>
            <button
              type="button"
              aria-label={`Close ${title}`}
              onClick={() => close(true)}
            >
              ×
            </button>
          </div>
          <div className="ec-popover__body">{children}</div>
        </div>
      )}
    </div>
  );
}
