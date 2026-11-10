// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";

export type StackResponsiveValue<T> =
  T | Partial<Record<"base" | "sm" | "md" | "lg", T>>;

export interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  direction?: StackResponsiveValue<CSSProperties["flexDirection"]>;
  align?: StackResponsiveValue<CSSProperties["alignItems"]>;
  justify?: StackResponsiveValue<CSSProperties["justifyContent"]>;
  gap?: StackResponsiveValue<number | string>;
}

function addVars(
  vars: Record<string, string>,
  name: string,
  value: StackResponsiveValue<string | number | undefined> | undefined,
  pixels = false,
) {
  if (value === undefined) return;
  const entries =
    typeof value === "object" ? Object.entries(value) : [["base", value]];
  for (const [breakpoint, entry] of entries) {
    if (entry === undefined) continue;
    if (typeof entry === "number" && !Number.isFinite(entry)) {
      throw new RangeError("Stack numeric styles must be finite");
    }
    vars[`--ec-stack-${name}-${breakpoint}`] =
      pixels && typeof entry === "number" ? `${entry}px` : String(entry);
  }
}

export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  {
    as: Element = "div",
    direction,
    align,
    justify,
    gap,
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
  addVars(vars, "gap", gap, true);

  return (
    <Element
      {...rest}
      ref={ref}
      className={`ec-stack${className ? ` ${className}` : ""}`}
      style={{ ...vars, ...style } as CSSProperties}
    />
  );
});
