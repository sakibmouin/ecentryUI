// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ElementType, HTMLAttributes } from "react";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: "sm" | "md" | "lg";
  weight?: "regular" | "medium" | "bold";
}

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { as: Element = "span", size = "md", weight = "regular", className, ...rest },
  ref,
) {
  return (
    <Element
      {...rest}
      ref={ref}
      data-ec-size={size}
      data-ec-weight={weight}
      className={`ec-text${className ? ` ${className}` : ""}`}
    />
  );
});
