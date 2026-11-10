// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";

export type GroupResponsiveValue<T> =
  T | Partial<Record<"base" | "sm" | "md" | "lg", T>>;

export interface GroupProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  inline?: boolean;
  attached?: boolean;
  grow?: boolean;
  orientation?: "horizontal" | "vertical";
  gap?: GroupResponsiveValue<string | number>;
}

function gapVars(value: GroupResponsiveValue<string | number> | undefined) {
  const vars: Record<string, string> = {};
  if (value === undefined) return vars;
  const entries =
    typeof value === "object" ? Object.entries(value) : [["base", value]];
  for (const [breakpoint, entry] of entries) {
    if (entry === undefined) continue;
    if (typeof entry === "number" && !Number.isFinite(entry))
      throw new RangeError("Group gap must be finite");
    vars[`--ec-group-gap-${breakpoint}`] =
      typeof entry === "number" ? `${entry}px` : entry;
  }
  return vars;
}

export const Group = forwardRef<HTMLElement, GroupProps>(function Group(
  {
    as: Element = "div",
    inline = false,
    attached = false,
    grow = false,
    orientation = "horizontal",
    gap,
    className,
    style,
    ...rest
  },
  ref,
) {
  return (
    <Element
      {...rest}
      ref={ref}
      data-attached={attached || undefined}
      data-grow={grow || undefined}
      data-orientation={orientation}
      className={`ec-group${inline ? " ec-group--inline" : ""}${className ? ` ${className}` : ""}`}
      style={{ ...gapVars(gap), ...style } as CSSProperties}
    />
  );
});
