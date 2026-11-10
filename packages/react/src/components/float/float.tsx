// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";

type BlockPosition = "top" | "middle" | "bottom";
type InlinePosition = "start" | "center" | "end";
export type FloatPlacement = `${BlockPosition}-${InlinePosition}`;
export type FloatResponsiveValue<T> =
  T | Partial<Record<"base" | "sm" | "md" | "lg", T>>;

export interface FloatProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  placement?: FloatResponsiveValue<FloatPlacement>;
  offset?: number | string;
  offsetX?: number | string;
  offsetY?: number | string;
}

const blockPositions: Record<BlockPosition, string> = {
  top: "0%",
  middle: "50%",
  bottom: "100%",
};
const inlinePositions: Record<InlinePosition, string> = {
  start: "0%",
  center: "50%",
  end: "100%",
};

function cssLength(value: number | string) {
  if (typeof value === "string") return value;
  if (!Number.isFinite(value))
    throw new RangeError("Float numeric offsets must be finite");
  return `${value}px`;
}

export const Float = forwardRef<HTMLElement, FloatProps>(function Float(
  {
    as: Element = "div",
    placement = "top-end",
    offset,
    offsetX,
    offsetY,
    className,
    style,
    ...rest
  },
  ref,
) {
  const vars: Record<string, string> = {};
  const entries =
    typeof placement === "string"
      ? [["base", placement]]
      : Object.entries(placement);
  for (const [breakpoint, value] of entries) {
    if (!value) continue;
    const [block, inline] = value.split("-") as [BlockPosition, InlinePosition];
    if (!(block in blockPositions) || !(inline in inlinePositions))
      throw new RangeError(`Invalid Float placement: ${value}`);
    vars[`--ec-float-block-${breakpoint}`] = blockPositions[block];
    vars[`--ec-float-inline-${breakpoint}`] = inlinePositions[inline];
  }
  if (offsetX !== undefined || offset !== undefined)
    vars["--ec-float-offset-x"] = cssLength(offsetX ?? offset!);
  if (offsetY !== undefined || offset !== undefined)
    vars["--ec-float-offset-y"] = cssLength(offsetY ?? offset!);
  return (
    <Element
      {...rest}
      ref={ref}
      className={className ? `ec-float ${className}` : "ec-float"}
      style={{ ...vars, ...style } as CSSProperties}
    />
  );
});
