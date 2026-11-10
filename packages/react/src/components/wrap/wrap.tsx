// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";

export type WrapResponsiveValue<T> =
  T | Partial<Record<"base" | "sm" | "md" | "lg", T>>;

export interface WrapProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  align?: WrapResponsiveValue<CSSProperties["alignItems"]>;
  justify?: WrapResponsiveValue<CSSProperties["justifyContent"]>;
  gap?: WrapResponsiveValue<number | string>;
  rowGap?: WrapResponsiveValue<number | string>;
  columnGap?: WrapResponsiveValue<number | string>;
}

function addVars(
  vars: Record<string, string>,
  name: string,
  value: WrapResponsiveValue<string | number | undefined> | undefined,
) {
  if (value === undefined) return;
  const entries =
    typeof value === "object" ? Object.entries(value) : [["base", value]];
  for (const [breakpoint, entry] of entries) {
    if (entry === undefined) continue;
    if (typeof entry === "number" && !Number.isFinite(entry)) {
      throw new RangeError("Wrap numeric styles must be finite");
    }
    vars[`--ec-wrap-${name}-${breakpoint}`] =
      typeof entry === "number" ? `${entry}px` : String(entry);
  }
}

export const Wrap = forwardRef<HTMLElement, WrapProps>(function Wrap(
  {
    as: Element = "div",
    align,
    justify,
    gap,
    rowGap,
    columnGap,
    className,
    style,
    ...rest
  },
  ref,
) {
  const vars: Record<string, string> = {};
  addVars(vars, "align", align);
  addVars(vars, "justify", justify);
  addVars(vars, "gap", gap);
  addVars(vars, "row-gap", rowGap);
  addVars(vars, "column-gap", columnGap);
  return (
    <Element
      {...rest}
      ref={ref}
      data-ec-wrap-row-gap={rowGap === undefined ? undefined : ""}
      data-ec-wrap-column-gap={columnGap === undefined ? undefined : ""}
      className={`ec-wrap${className ? ` ${className}` : ""}`}
      style={{ ...vars, ...style } as CSSProperties}
    />
  );
});
