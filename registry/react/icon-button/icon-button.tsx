// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";

export interface IconButtonProps extends Omit<
  ComponentPropsWithRef<"button">,
  "children"
> {
  icon: ReactNode;
  "aria-label": string;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "ghost";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon,
      loading = false,
      size = "md",
      variant = "ghost",
      disabled = false,
      type = "button",
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        data-ec-size={size}
        data-ec-variant={variant}
        className={`ec-icon-button${className ? ` ${className}` : ""}`}
      >
        <span
          aria-hidden="true"
          className={
            loading ? "ec-icon-button__spinner" : "ec-icon-button__icon"
          }
        >
          {loading ? null : icon}
        </span>
      </button>
    );
  },
);
