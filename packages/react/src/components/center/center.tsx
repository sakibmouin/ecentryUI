// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";

export interface CenterProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  inline?: boolean;
}

export interface SquareProps extends Omit<CenterProps, "inline"> {
  size?: number | string;
}

function cssSize(size: number | string) {
  if (typeof size === "string") return size;
  if (!Number.isFinite(size) || size < 0)
    throw new RangeError("Square size must be a non-negative finite number");
  return `${size}px`;
}

export const Center = forwardRef<HTMLElement, CenterProps>(function Center(
  { as: Element = "div", inline = false, className, ...rest },
  ref,
) {
  return (
    <Element
      {...rest}
      ref={ref}
      className={`ec-center${inline ? " ec-center--inline" : ""}${className ? ` ${className}` : ""}`}
    />
  );
});

export const Square = forwardRef<HTMLElement, SquareProps>(function Square(
  { size, className, style, ...rest },
  ref,
) {
  return (
    <Center
      {...rest}
      ref={ref}
      className={`ec-square${className ? ` ${className}` : ""}`}
      style={
        {
          ...(size === undefined ? {} : { "--ec-center-size": cssSize(size) }),
          ...style,
        } as CSSProperties
      }
    />
  );
});

export const Circle = forwardRef<HTMLElement, SquareProps>(function Circle(
  { className, ...rest },
  ref,
) {
  return (
    <Square
      {...rest}
      ref={ref}
      className={`ec-circle${className ? ` ${className}` : ""}`}
    />
  );
});
