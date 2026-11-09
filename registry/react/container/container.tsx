// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";

const widths: Record<string, string> = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "90rem",
};

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  maxWidth?: number | string;
  gutter?: number | string;
  fluid?: boolean;
  centerContent?: boolean;
}

function length(value: number | string) {
  if (typeof value === "string") return widths[value] ?? value;
  if (!Number.isFinite(value) || value < 0)
    throw new RangeError(
      "Container lengths must be non-negative finite numbers",
    );
  return `${value}px`;
}

export const Container = forwardRef<HTMLElement, ContainerProps>(
  function Container(
    {
      as: Element = "div",
      maxWidth,
      gutter,
      fluid = false,
      centerContent = false,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const classes = [
      "ec-container",
      fluid && "ec-container--fluid",
      centerContent && "ec-container--center-content",
      className,
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <Element
        {...rest}
        ref={ref}
        className={classes}
        style={
          {
            ...(maxWidth === undefined
              ? {}
              : { "--ec-container-max-width": length(maxWidth) }),
            ...(gutter === undefined
              ? {}
              : { "--ec-container-gutter": length(gutter) }),
            ...style,
          } as CSSProperties
        }
      />
    );
  },
);
