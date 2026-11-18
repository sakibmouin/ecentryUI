// SPDX-License-Identifier: MIT
import type { ComponentPropsWithRef, ReactNode } from "react";

export interface EmptyStateProps extends Omit<
  ComponentPropsWithRef<"div">,
  "title"
> {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  loading?: boolean;
  size?: "default" | "compact";
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  loading = false,
  size = "default",
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div
      {...rest}
      role="group"
      aria-busy={loading || undefined}
      data-size={size}
      className={`ec-empty-state${className ? ` ${className}` : ""}`}
    >
      {icon && (
        <div className="ec-empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="ec-empty-state__title">{title}</h3>
      {description && (
        <p className="ec-empty-state__description">{description}</p>
      )}
      {loading ? (
        <span className="ec-empty-state__loading" role="status">
          Loading
        </span>
      ) : (
        action && <div className="ec-empty-state__action">{action}</div>
      )}
    </div>
  );
}
