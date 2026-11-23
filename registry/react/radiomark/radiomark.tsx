// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export interface RadiomarkProps extends ComponentPropsWithoutRef<"span"> {
  checked?: boolean;
  label?: string;
}

export const Radiomark = forwardRef<HTMLSpanElement, RadiomarkProps>(
  function Radiomark({ checked = false, label, className, ...props }, ref) {
    return (
      <span
        {...props}
        ref={ref}
        className={className ? `ec-radiomark ${className}` : "ec-radiomark"}
        data-state={checked ? "checked" : "unchecked"}
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      />
    );
  },
);
