// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";
export interface HeadingProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}
export const Heading = forwardRef<HTMLElement, HeadingProps>(function Heading(
  { as: Element = "h2", className, style, ...rest },
  ref,
) {
  return (
    <Element
      {...rest}
      ref={ref}
      className={`ec-heading${className ? ` ${className}` : ""}`}
      style={style as CSSProperties}
    />
  );
});
