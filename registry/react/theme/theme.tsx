// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export interface ThemeProps extends ComponentPropsWithoutRef<"div"> {
  appearance?: "light" | "dark";
  withBackground?: boolean;
}

export const Theme = forwardRef<HTMLDivElement, ThemeProps>(function Theme(
  { appearance = "light", withBackground = false, className, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      data-ec-theme={appearance}
      data-background={withBackground ? "" : undefined}
      className={className ? `ec-theme ${className}` : "ec-theme"}
    />
  );
});
