// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export interface ActionBarAction {
  id: string;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
}
export interface ActionBarProps {
  label: string;
  triggerLabel: string;
  actions: ActionBarAction[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  id?: string;
}

export function ActionBar({
  label,
  triggerLabel,
  actions,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  id,
}: ActionBarProps) {
  const generated = useId();
  const barId = id ?? generated;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  function change(next: boolean) {
    if (next === open) return;
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }
  useEffect(() => {
    if (open && !wasOpen.current)
      barRef.current
        ?.querySelector<HTMLButtonElement>("button:not(:disabled)")
        ?.focus();
    else if (!open && wasOpen.current) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !barRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      )
        change(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open, controlledOpen]);
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      change(false);
      return;
    }
    const buttons = Array.from(
      barRef.current?.querySelectorAll<HTMLButtonElement>(
        "button:not(:disabled)",
      ) ?? [],
    );
    if (!buttons.length) return;
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      buttons[
        (index + (event.key === "ArrowRight" ? 1 : -1) + buttons.length) %
          buttons.length
      ]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      buttons[event.key === "Home" ? 0 : buttons.length - 1]?.focus();
    }
  }
  return (
    <div className={`ec-action-bar-root${className ? ` ${className}` : ""}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={barId}
        onClick={() => change(!open)}
      >
        {triggerLabel}
      </button>
      {open && (
        <div
          ref={barRef}
          id={barId}
          role="toolbar"
          aria-label={label}
          className="ec-action-bar"
          onKeyDown={handleKeyDown}
        >
          <span className="ec-action-bar__label">{label}</span>
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              disabled={action.disabled}
              onClick={() => {
                action.onSelect();
                change(false);
              }}
            >
              {action.label}
            </button>
          ))}
          <button
            type="button"
            className="ec-action-bar__dismiss"
            aria-label={`Dismiss ${label}`}
            onClick={() => change(false)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
