// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";

export type ResponsiveValue<T> =
  T | Partial<Record<"base" | "sm" | "md" | "lg", T>>;
type Length = string | number;

export interface BoxProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  as?: ElementType;
  padding?: ResponsiveValue<Length>;
  paddingInline?: ResponsiveValue<Length>;
  margin?: ResponsiveValue<Length>;
  marginInline?: ResponsiveValue<Length>;
  width?: ResponsiveValue<Length>;
  maxWidth?: ResponsiveValue<Length>;
  gap?: ResponsiveValue<Length>;
  background?: ResponsiveValue<string>;
  color?: ResponsiveValue<string>;
  display?: ResponsiveValue<CSSProperties["display"]>;
}

function cssValue(value: Length) {
  if (typeof value === "string") return value;
  if (!Number.isFinite(value))
    throw new RangeError("Box numeric styles must be finite");
  return `${value}px`;
}

function addResponsiveVars(
  vars: Record<string, string>,
  name: string,
  value: ResponsiveValue<Length | undefined> | undefined,
  length = false,
) {
  if (value === undefined) return;
  const entries =
    typeof value === "object" ? Object.entries(value) : [["base", value]];
  for (const [breakpoint, entry] of entries) {
    if (entry !== undefined)
      vars[`--ec-box-${name}-${breakpoint}`] = length
        ? cssValue(entry)
        : String(entry);
  }
}

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  {
    as: Element = "div",
    padding,
    paddingInline,
    margin,
    marginInline,
    width,
    maxWidth,
    gap,
    background,
    color,
    display,
    className,
    style,
    ...rest
  },
  ref,
) {
  const vars: Record<string, string> = {};
  addResponsiveVars(vars, "padding", padding, true);
  addResponsiveVars(vars, "padding-inline", paddingInline, true);
  addResponsiveVars(vars, "margin", margin, true);
  addResponsiveVars(vars, "margin-inline", marginInline, true);
  addResponsiveVars(vars, "width", width, true);
  addResponsiveVars(vars, "max-width", maxWidth, true);
  addResponsiveVars(vars, "gap", gap, true);
  addResponsiveVars(vars, "background", background);
  addResponsiveVars(vars, "color", color);
  addResponsiveVars(vars, "display", display);
  return (
    <Element
      {...rest}
      ref={ref}
      className={className ? `ec-box ${className}` : "ec-box"}
      style={{ ...vars, ...style } as CSSProperties}
    />
  );
});
