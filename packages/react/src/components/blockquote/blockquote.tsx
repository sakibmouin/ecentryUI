// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type {
  BlockquoteHTMLAttributes,
  CSSProperties,
  ElementType,
} from "react";

export interface BlockquoteProps extends BlockquoteHTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export const Blockquote = forwardRef<HTMLElement, BlockquoteProps>(
  function Blockquote(
    { as: Element = "blockquote", className, style, ...rest },
    ref,
  ) {
    return (
      <Element
        {...rest}
        ref={ref}
        className={`ec-blockquote${className ? ` ${className}` : ""}`}
        style={style as CSSProperties}
      />
    );
  },
);
