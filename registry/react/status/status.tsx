// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";

export interface StatusProps extends ComponentPropsWithRef<"span"> {
  variant?: "neutral" | "info" | "success" | "warning" | "error";
  size?: "sm" | "md";
  live?: boolean;
}

export const Status = forwardRef<HTMLSpanElement, StatusProps>(function Status(
  {
    variant = "neutral",
    size = "md",
    live = true,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <span
      role={live ? "status" : undefined}
      {...props}
      ref={ref}
      data-variant={variant}
      data-size={size}
      className={className ? `ec-status ${className}` : "ec-status"}
    >
      <span className="ec-status__indicator" aria-hidden="true" />
      {children}
    </span>
  );
});
