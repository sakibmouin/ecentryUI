// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export interface VisuallyHiddenProps extends ComponentPropsWithoutRef<"span"> {
  revealOnFocus?: boolean;
}

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  function VisuallyHidden({ className, revealOnFocus = false, ...props }, ref) {
    return (
      <span
        {...props}
        ref={ref}
        data-reveal-on-focus={revealOnFocus ? "" : undefined}
        className={
          className
            ? `ec-visually-hidden-content ${className}`
            : "ec-visually-hidden-content"
        }
      />
    );
  },
);
