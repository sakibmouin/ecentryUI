// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";

export interface BadgeProps extends ComponentPropsWithRef<"span"> {
  variant?: "neutral" | "info" | "success" | "warning" | "error";
  size?: "sm" | "md";
  loading?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = "neutral",
    size = "md",
    loading = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <span
      {...rest}
      ref={ref}
      className={`ec-badge ec-badge--${variant} ec-badge--${size}${className ? ` ${className}` : ""}`}
      aria-busy={loading || undefined}
    >
      {loading && <span className="ec-badge__spinner" aria-hidden="true" />}
      {children}
    </span>
  );
});
