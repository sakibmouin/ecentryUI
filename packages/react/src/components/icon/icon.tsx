// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";

export interface IconProps extends ComponentPropsWithRef<"span"> {
  label?: string;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "inherit" | "accent" | "muted";
}

export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  {
    label,
    loading = false,
    size = "md",
    tone = "inherit",
    children,
    className,
    ...rest
  },
  ref,
) {
  return (
    <span
      {...rest}
      ref={ref}
      className={`ec-icon${className ? ` ${className}` : ""}`}
      data-size={size}
      data-tone={tone}
      role={loading ? "status" : label ? "img" : undefined}
      aria-label={loading ? `Loading${label ? ` ${label}` : ""}` : label}
      aria-hidden={!loading && !label ? true : undefined}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <span className="ec-icon__spinner" aria-hidden="true" />
      ) : (
        <span className="ec-icon__content" aria-hidden="true">
          {children}
        </span>
      )}
    </span>
  );
});
