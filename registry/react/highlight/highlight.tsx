// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes } from "react";
export interface HighlightProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}
export const Highlight = forwardRef<HTMLElement, HighlightProps>(
  function Highlight({ as: Element = "mark", className, style, ...rest }, ref) {
    return (
      <Element
        {...rest}
        ref={ref}
        className={`ec-highlight${className ? ` ${className}` : ""}`}
        style={style as CSSProperties}
      />
    );
  },
);
