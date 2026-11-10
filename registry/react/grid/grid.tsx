// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";

export type GridResponsiveValue<T> =
  T | Partial<Record<"base" | "sm" | "md" | "lg", T>>;
type GridLength = string | number;

export interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  inline?: boolean;
  templateColumns?: GridResponsiveValue<CSSProperties["gridTemplateColumns"]>;
  templateRows?: GridResponsiveValue<CSSProperties["gridTemplateRows"]>;
  templateAreas?: GridResponsiveValue<CSSProperties["gridTemplateAreas"]>;
  autoColumns?: GridResponsiveValue<CSSProperties["gridAutoColumns"]>;
  autoRows?: GridResponsiveValue<CSSProperties["gridAutoRows"]>;
  autoFlow?: GridResponsiveValue<CSSProperties["gridAutoFlow"]>;
  gap?: GridResponsiveValue<GridLength>;
  rowGap?: GridResponsiveValue<GridLength>;
  columnGap?: GridResponsiveValue<GridLength>;
  alignItems?: GridResponsiveValue<CSSProperties["alignItems"]>;
  justifyItems?: GridResponsiveValue<CSSProperties["justifyItems"]>;
  alignContent?: GridResponsiveValue<CSSProperties["alignContent"]>;
  justifyContent?: GridResponsiveValue<CSSProperties["justifyContent"]>;
}

export interface GridItemProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  column?: GridResponsiveValue<CSSProperties["gridColumn"]>;
  row?: GridResponsiveValue<CSSProperties["gridRow"]>;
  area?: GridResponsiveValue<CSSProperties["gridArea"]>;
  colSpan?: GridResponsiveValue<number>;
  rowSpan?: GridResponsiveValue<number>;
  colStart?: GridResponsiveValue<string | number>;
  colEnd?: GridResponsiveValue<string | number>;
  rowStart?: GridResponsiveValue<string | number>;
  rowEnd?: GridResponsiveValue<string | number>;
  alignSelf?: GridResponsiveValue<CSSProperties["alignSelf"]>;
  justifySelf?: GridResponsiveValue<CSSProperties["justifySelf"]>;
}

function addVars(
  vars: Record<string, string>,
  prefix: string,
  name: string,
  value: GridResponsiveValue<string | number | undefined> | undefined,
  kind: "css" | "length" | "span" = "css",
) {
  if (value === undefined) return;
  const entries =
    typeof value === "object" ? Object.entries(value) : [["base", value]];
  for (const [breakpoint, entry] of entries) {
    if (entry === undefined) continue;
    if (typeof entry === "number" && !Number.isFinite(entry))
      throw new RangeError("Grid numeric styles must be finite");
    if (kind === "span" && (!Number.isInteger(entry) || Number(entry) < 1))
      throw new RangeError("Grid spans must be positive integers");
    vars[`--ec-${prefix}-${name}-${breakpoint}`] =
      kind === "span"
        ? `span ${entry} / span ${entry}`
        : kind === "length" && typeof entry === "number"
          ? `${entry}px`
          : String(entry);
  }
}

export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  {
    as: Element = "div",
    inline = false,
    templateColumns,
    templateRows,
    templateAreas,
    autoColumns,
    autoRows,
    autoFlow,
    gap,
    rowGap,
    columnGap,
    alignItems,
    justifyItems,
    alignContent,
    justifyContent,
    className,
    style,
    ...rest
  },
  ref,
) {
  const vars: Record<string, string> = {};
  addVars(vars, "grid", "template-columns", templateColumns);
  addVars(vars, "grid", "template-rows", templateRows);
  addVars(vars, "grid", "template-areas", templateAreas);
  addVars(vars, "grid", "auto-columns", autoColumns);
  addVars(vars, "grid", "auto-rows", autoRows);
  addVars(vars, "grid", "auto-flow", autoFlow);
  addVars(vars, "grid", "gap", gap, "length");
  addVars(vars, "grid", "row-gap", rowGap, "length");
  addVars(vars, "grid", "column-gap", columnGap, "length");
  addVars(vars, "grid", "align-items", alignItems);
  addVars(vars, "grid", "justify-items", justifyItems);
  addVars(vars, "grid", "align-content", alignContent);
  addVars(vars, "grid", "justify-content", justifyContent);
  return (
    <Element
      {...rest}
      ref={ref}
      data-ec-grid-row-gap={rowGap === undefined ? undefined : ""}
      data-ec-grid-column-gap={columnGap === undefined ? undefined : ""}
      className={`ec-grid${inline ? " ec-grid--inline" : ""}${className ? ` ${className}` : ""}`}
      style={{ ...vars, ...style } as CSSProperties}
    />
  );
});

export const GridItem = forwardRef<HTMLElement, GridItemProps>(
  function GridItem(
    {
      as: Element = "div",
      column,
      row,
      area,
      colSpan,
      rowSpan,
      colStart,
      colEnd,
      rowStart,
      rowEnd,
      alignSelf,
      justifySelf,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const vars: Record<string, string> = {};
    addVars(
      vars,
      "grid-item",
      "column",
      column ?? colSpan,
      column === undefined ? "span" : "css",
    );
    addVars(
      vars,
      "grid-item",
      "row",
      row ?? rowSpan,
      row === undefined ? "span" : "css",
    );
    addVars(vars, "grid-item", "area", area);
    addVars(vars, "grid-item", "column-start", colStart);
    addVars(vars, "grid-item", "column-end", colEnd);
    addVars(vars, "grid-item", "row-start", rowStart);
    addVars(vars, "grid-item", "row-end", rowEnd);
    addVars(vars, "grid-item", "align-self", alignSelf);
    addVars(vars, "grid-item", "justify-self", justifySelf);
    return (
      <Element
        {...rest}
        ref={ref}
        data-ec-grid-item-area={area === undefined ? undefined : ""}
        data-ec-grid-item-column={
          column === undefined && colSpan === undefined ? undefined : ""
        }
        data-ec-grid-item-row={
          row === undefined && rowSpan === undefined ? undefined : ""
        }
        data-ec-grid-item-column-start={colStart === undefined ? undefined : ""}
        data-ec-grid-item-column-end={colEnd === undefined ? undefined : ""}
        data-ec-grid-item-row-start={rowStart === undefined ? undefined : ""}
        data-ec-grid-item-row-end={rowEnd === undefined ? undefined : ""}
        className={`ec-grid-item${className ? ` ${className}` : ""}`}
        style={{ ...vars, ...style } as CSSProperties}
      />
    );
  },
);
