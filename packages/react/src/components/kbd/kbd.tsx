// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ElementType, HTMLAttributes } from "react";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { as: Element = "kbd", className, ...rest },
  ref,
) {
  return (
    <Element
      {...rest}
      ref={ref}
      className={`ec-kbd${className ? ` ${className}` : ""}`}
    />
  );
});
