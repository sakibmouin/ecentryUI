// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { MouseEvent, ReactNode, SyntheticEvent } from "react";

export type DrawerPlacement = "left" | "right" | "top" | "bottom";
export interface DrawerProps {
  title: string;
  triggerLabel: string;
  children: ReactNode;
  description?: string;
  placement?: DrawerPlacement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  id?: string;
}

export function Drawer({
  title,
  triggerLabel,
  children,
  description,
  placement = "right",
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  id,
}: DrawerProps) {
  const generated = useId();
  const drawerId = id ?? generated;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  function change(next: boolean) {
    if (next === open) return;
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (!open && dialog.open) dialog.close();
    if (!open && wasOpen.current) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  function handleCancel(event: SyntheticEvent<HTMLDialogElement, Event>) {
    event.preventDefault();
    change(false);
  }
  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      change(false);
  }
  return (
    <div className={`ec-drawer-root${className ? ` ${className}` : ""}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => change(true)}
      >
        {triggerLabel}
      </button>
      <dialog
        ref={dialogRef}
        id={drawerId}
        className="ec-drawer"
        data-ec-placement={placement}
        aria-labelledby={`${drawerId}-title`}
        aria-describedby={description ? `${drawerId}-description` : undefined}
        onCancel={handleCancel}
        onClick={handleClick}
        onClose={() => {
          if (open) change(false);
        }}
      >
        <div className="ec-drawer__header">
          <div>
            <h2 id={`${drawerId}-title`}>{title}</h2>
            {description && <p id={`${drawerId}-description`}>{description}</p>}
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label={`Close ${title}`}
            onClick={() => change(false)}
          >
            ×
          </button>
        </div>
        <div className="ec-drawer__body">{children}</div>
      </dialog>
    </div>
  );
}
