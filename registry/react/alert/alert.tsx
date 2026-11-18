// SPDX-License-Identifier: MIT
import { useId, useState } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";

export interface AlertProps extends Omit<
  ComponentPropsWithRef<"div">,
  "title"
> {
  variant?: "info" | "success" | "warning" | "error";
  title?: ReactNode;
  loading?: boolean;
  action?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function Alert({
  variant = "info",
  title,
  loading = false,
  action,
  dismissible = false,
  onDismiss,
  className,
  children,
  ...rest
}: AlertProps) {
  const [visible, setVisible] = useState(true);
  const titleId = useId();
  if (!visible) return null;
  return (
    <div
      {...rest}
      className={`ec-alert ec-alert--${variant}${className ? ` ${className}` : ""}`}
      role={variant === "error" || variant === "warning" ? "alert" : "status"}
      aria-busy={loading || undefined}
      aria-labelledby={title ? titleId : undefined}
    >
      <span className="ec-alert__symbol" aria-hidden="true">
        {loading
          ? "◌"
          : variant === "success"
            ? "✓"
            : variant === "error"
              ? "!"
              : variant === "warning"
                ? "!"
                : "i"}
      </span>
      <div className="ec-alert__body">
        {title && (
          <strong className="ec-alert__title" id={titleId}>
            {title}
          </strong>
        )}
        {children != null && (
          <div className="ec-alert__content">{children}</div>
        )}
      </div>
      {action && <div className="ec-alert__action">{action}</div>}
      {dismissible && (
        <button
          className="ec-alert__dismiss"
          type="button"
          aria-label="Dismiss alert"
          onClick={(event) => {
            const button = event.currentTarget;
            const controls = Array.from(
              document.querySelectorAll<HTMLElement>(
                'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
              ),
            );
            const position = controls.indexOf(button);
            const next = controls
              .slice(position + 1)
              .find((control) => !button.parentElement?.contains(control));
            const previous = controls
              .slice(0, position)
              .reverse()
              .find((control) => !button.parentElement?.contains(control));
            (next ?? previous)?.focus();
            setVisible(false);
            onDismiss?.();
          }}
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
}
