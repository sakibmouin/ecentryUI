// SPDX-License-Identifier: MIT
import { useId, useState } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";

export interface CollapsibleProps extends Omit<
  ComponentPropsWithRef<"div">,
  "title"
> {
  title: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Collapsible({
  title,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  loading = false,
  className,
  children,
  ...rest
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const expanded = open ?? internalOpen;
  const id = useId();
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;
  function toggle() {
    const next = !expanded;
    if (open === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }
  return (
    <div
      {...rest}
      className={`ec-collapsible${className ? ` ${className}` : ""}`}
      data-state={expanded ? "open" : "closed"}
    >
      <button
        id={triggerId}
        className="ec-collapsible__trigger"
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        disabled={disabled || loading}
        onClick={toggle}
      >
        <span>{title}</span>
        <span className="ec-collapsible__indicator" aria-hidden="true">
          +
        </span>
      </button>
      {expanded && (
        <div
          id={panelId}
          className="ec-collapsible__panel"
          role="region"
          aria-labelledby={triggerId}
          aria-busy={loading || undefined}
        >
          {children}
        </div>
      )}
    </div>
  );
}
