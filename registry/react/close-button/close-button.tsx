// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";

export interface CloseButtonProps extends ComponentPropsWithRef<"button"> {
  loading?: boolean;
  size?: "sm" | "md" | "lg";
}

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  function CloseButton(
    {
      "aria-label": label = "Close",
      loading = false,
      disabled = false,
      size = "md",
      className,
      type = "button",
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        aria-label={label}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        data-ec-size={size}
        className={`ec-close-button${className ? ` ${className}` : ""}`}
      >
        {loading ? (
          <span className="ec-close-button__spinner" aria-hidden="true" />
        ) : (
          <span aria-hidden="true">×</span>
        )}
        {children}
      </button>
    );
  },
);
