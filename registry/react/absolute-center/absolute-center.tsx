// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ElementType, HTMLAttributes } from "react";

export interface AbsoluteCenterProps extends HTMLAttributes<HTMLElement> {
  axis?: "horizontal" | "vertical" | "both";
  as?: ElementType;
}

export const AbsoluteCenter = forwardRef<HTMLElement, AbsoluteCenterProps>(
  function AbsoluteCenter(
    { axis = "both", as: Element = "div", className, ...rest },
    ref,
  ) {
    return (
      <Element
        {...rest}
        ref={ref}
        data-ec-axis={axis}
        className={
          className ? `ec-absolute-center ${className}` : "ec-absolute-center"
        }
      />
    );
  },
);
