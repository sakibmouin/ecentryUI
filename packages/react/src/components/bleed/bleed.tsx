// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";

export type BleedAmount = number | string;

export interface BleedProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  inline?: BleedAmount;
  block?: BleedAmount;
  inlineStart?: BleedAmount;
  inlineEnd?: BleedAmount;
  blockStart?: BleedAmount;
  blockEnd?: BleedAmount;
}

function cssLength(amount: BleedAmount) {
  if (typeof amount === "string") return amount;
  if (!Number.isFinite(amount) || amount < 0)
    throw new RangeError("Bleed amounts must be nonnegative finite numbers");
  return `${amount}px`;
}

export const Bleed = forwardRef<HTMLElement, BleedProps>(function Bleed(
  {
    as: Element = "div",
    inline = 16,
    block = 0,
    inlineStart,
    inlineEnd,
    blockStart,
    blockEnd,
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
      className={className ? `ec-bleed ${className}` : "ec-bleed"}
      style={
        {
          "--ec-bleed-inline-start": cssLength(inlineStart ?? inline),
          "--ec-bleed-inline-end": cssLength(inlineEnd ?? inline),
          "--ec-bleed-block-start": cssLength(blockStart ?? block),
          "--ec-bleed-block-end": cssLength(blockEnd ?? block),
          ...style,
        } as CSSProperties
      }
    />
  );
});
