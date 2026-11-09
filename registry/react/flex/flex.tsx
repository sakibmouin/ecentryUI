// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";

export type FlexResponsiveValue<T> =
  T | Partial<Record<"base" | "sm" | "md" | "lg", T>>;

export interface FlexProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "align" | "wrap"
> {
  as?: ElementType;
  inline?: boolean;
  direction?: FlexResponsiveValue<CSSProperties["flexDirection"]>;
  align?: FlexResponsiveValue<CSSProperties["alignItems"]>;
  justify?: FlexResponsiveValue<CSSProperties["justifyContent"]>;
  wrap?: FlexResponsiveValue<CSSProperties["flexWrap"]>;
  gap?: FlexResponsiveValue<number | string>;
  basis?: CSSProperties["flexBasis"];
  grow?: number;
  shrink?: number;
}

export interface SpacerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

function addVars(
  vars: Record<string, string>,
  name: string,
  value: FlexResponsiveValue<string | number | undefined> | undefined,
  pixels = false,
) {
  if (value === undefined) return;
  const entries =
    typeof value === "object" ? Object.entries(value) : [["base", value]];
  for (const [breakpoint, entry] of entries) {
    if (entry === undefined) continue;
    if (typeof entry === "number" && !Number.isFinite(entry))
      throw new RangeError("Flex numeric styles must be finite");
    vars[`--ec-flex-${name}-${breakpoint}`] =
      pixels && typeof entry === "number" ? `${entry}px` : String(entry);
  }
}

export const Flex = forwardRef<HTMLElement, FlexProps>(function Flex(
  {
    as: Element = "div",
    inline = false,
    direction,
    align,
    justify,
    wrap,
    gap,
    basis,
    grow,
    shrink,
    className,
    style,
    ...rest
  },
  ref,
) {
  const vars: Record<string, string> = {};
  addVars(vars, "direction", direction);
  addVars(vars, "align", align);
  addVars(vars, "justify", justify);
  addVars(vars, "wrap", wrap);
  addVars(vars, "gap", gap, true);
  addVars(vars, "basis", basis, true);
  addVars(vars, "grow", grow);
  addVars(vars, "shrink", shrink);
  return (
    <Element
      {...rest}
      ref={ref}
      className={`ec-flex${inline ? " ec-flex--inline" : ""}${className ? ` ${className}` : ""}`}
      style={{ ...vars, ...style } as CSSProperties}
    />
  );
});

export const Spacer = forwardRef<HTMLElement, SpacerProps>(function Spacer(
  { as: Element = "div", className, ...rest },
  ref,
) {
  return (
    <Element
      {...rest}
      ref={ref}
      className={`ec-spacer${className ? ` ${className}` : ""}`}
    />
  );
});
