// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
export interface SpinnerProps extends Omit<
  ComponentPropsWithRef<"span">,
  "children"
> {
  label?: string;
  size?: "sm" | "md" | "lg";
}
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner(
    { label = "Loading", size = "md", className, ...rest },
    ref,
  ) {
    return (
      <span
        {...rest}
        ref={ref}
        role="status"
        aria-label={label}
        data-size={size}
        className={`ec-spinner${className ? ` ${className}` : ""}`}
      >
        <span className="ec-spinner__ring" aria-hidden="true" />
      </span>
    );
  },
);
