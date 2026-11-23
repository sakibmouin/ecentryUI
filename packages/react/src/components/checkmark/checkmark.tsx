// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export interface CheckmarkProps extends ComponentPropsWithoutRef<"span"> {
  checked?: boolean | "mixed";
  label?: string;
}

export const Checkmark = forwardRef<HTMLSpanElement, CheckmarkProps>(
  function Checkmark(
    { checked = true, label, className, children, ...props },
    ref,
  ) {
    return (
      <span
        {...props}
        ref={ref}
        className={className ? `ec-checkmark ${className}` : "ec-checkmark"}
        data-state={
          checked === "mixed" ? "mixed" : checked ? "checked" : "unchecked"
        }
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      >
        {children}
      </span>
    );
  },
);
