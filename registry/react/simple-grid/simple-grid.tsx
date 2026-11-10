// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";

export type SimpleGridResponsiveValue<T> =
  T | Partial<Record<"base" | "sm" | "md" | "lg", T>>;
type Length = string | number;

export interface SimpleGridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  columns?: SimpleGridResponsiveValue<number> | undefined;
  minChildWidth?: SimpleGridResponsiveValue<Length> | undefined;
  gap?: SimpleGridResponsiveValue<Length>;
  rowGap?: SimpleGridResponsiveValue<Length>;
  columnGap?: SimpleGridResponsiveValue<Length>;
}

function addVars(
  vars: Record<string, string>,
  name: string,
  value: SimpleGridResponsiveValue<Length> | undefined,
) {
  if (value === undefined) return;
  const entries =
    typeof value === "object" ? Object.entries(value) : [["base", value]];
  for (const [breakpoint, entry] of entries) {
    if (entry === undefined) continue;
    if (
      typeof entry === "number" &&
      (!Number.isFinite(entry) ||
        (name === "columns"
          ? !Number.isInteger(entry) || entry < 1
          : name === "min-width" && entry <= 0))
    ) {
      throw new RangeError(`SimpleGrid ${name} must be a valid positive value`);
    }
    vars[`--ec-simple-grid-${name}-${breakpoint}`] =
      typeof entry === "number" && name !== "columns"
        ? `${entry}px`
        : String(entry);
  }
}

export const SimpleGrid = forwardRef<HTMLElement, SimpleGridProps>(
  function SimpleGrid(
    {
      as: Element = "div",
      columns,
      minChildWidth,
      gap,
      rowGap,
      columnGap,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    if (columns !== undefined && minChildWidth !== undefined) {
      throw new Error("SimpleGrid accepts columns or minChildWidth, not both");
    }
    const vars: Record<string, string> = {};
    addVars(vars, "columns", columns);
    addVars(vars, "min-width", minChildWidth);
    addVars(vars, "gap", gap);
    addVars(vars, "row-gap", rowGap);
    addVars(vars, "column-gap", columnGap);
    return (
      <Element
        {...rest}
        ref={ref}
        data-ec-simple-grid-mode={
          minChildWidth === undefined ? "columns" : "auto-fit"
        }
        data-ec-simple-grid-row-gap={rowGap === undefined ? undefined : ""}
        data-ec-simple-grid-column-gap={
          columnGap === undefined ? undefined : ""
        }
        className={`ec-simple-grid${className ? ` ${className}` : ""}`}
        style={{ ...vars, ...style } as CSSProperties}
      />
    );
  },
);
