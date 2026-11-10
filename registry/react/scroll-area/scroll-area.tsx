// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";

export type ScrollAreaResponsiveValue<T> =
  T | Partial<Record<"base" | "sm" | "md" | "lg", T>>;

export interface ScrollAreaProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  axis?: "vertical" | "horizontal" | "both";
  variant?: "hover" | "always";
  size?: "xs" | "sm" | "md" | "lg";
  maxHeight?: ScrollAreaResponsiveValue<string | number>;
  maxWidth?: ScrollAreaResponsiveValue<string | number>;
}

function dimensionVars(
  vars: Record<string, string>,
  dimension: "height" | "width",
  value: ScrollAreaResponsiveValue<string | number> | undefined,
) {
  if (value === undefined) return;
  const entries =
    typeof value === "object" ? Object.entries(value) : [["base", value]];
  for (const [breakpoint, entry] of entries) {
    if (entry === undefined) continue;
    if (typeof entry === "number" && (!Number.isFinite(entry) || entry < 0))
      throw new RangeError(
        "Scroll Area dimensions must be nonnegative and finite",
      );
    vars[`--ec-scroll-area-max-${dimension}-${breakpoint}`] =
      typeof entry === "number" ? `${entry}px` : entry;
  }
}

export const ScrollArea = forwardRef<HTMLElement, ScrollAreaProps>(
  function ScrollArea(
    {
      as: Element = "div",
      axis = "vertical",
      variant = "hover",
      size = "md",
      maxHeight,
      maxWidth,
      className,
      style,
      role,
      tabIndex = 0,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...rest
    },
    ref,
  ) {
    const vars: Record<string, string> = {};
    dimensionVars(vars, "height", maxHeight);
    dimensionVars(vars, "width", maxWidth);
    return (
      <Element
        {...rest}
        ref={ref}
        role={role ?? (ariaLabel || ariaLabelledBy ? "region" : undefined)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        tabIndex={tabIndex}
        data-axis={axis}
        data-variant={variant}
        data-size={size}
        className={`ec-scroll-area${className ? ` ${className}` : ""}`}
        style={{ ...vars, ...style } as CSSProperties}
      />
    );
  },
);
