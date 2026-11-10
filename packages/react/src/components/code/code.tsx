// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  block?: boolean;
}

export const Code = forwardRef<HTMLElement, CodeProps>(function Code(
  { as: Element = "code", block = false, className, style, ...rest },
  ref,
) {
  return (
    <Element
      {...rest}
      ref={ref}
      data-block={block || undefined}
      className={`ec-code${className ? ` ${className}` : ""}`}
      style={style as CSSProperties}
    />
  );
});
