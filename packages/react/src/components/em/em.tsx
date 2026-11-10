// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";

export interface EmProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export const Em = forwardRef<HTMLElement, EmProps>(function Em(
  { as: Element = "em", className, style, ...rest },
  ref,
) {
  return (
    <Element
      {...rest}
      ref={ref}
      className={`ec-em${className ? ` ${className}` : ""}`}
      style={style as CSSProperties}
    />
  );
});
