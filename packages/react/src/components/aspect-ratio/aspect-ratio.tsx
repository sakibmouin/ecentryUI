// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactElement,
} from "react";

export interface AspectRatioProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  ratio?: number;
  as?: ElementType;
  children: ReactElement;
}

export const AspectRatio = forwardRef<HTMLElement, AspectRatioProps>(
  function AspectRatio(
    {
      ratio = 16 / 9,
      as: Element = "div",
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    if (!Number.isFinite(ratio) || ratio <= 0)
      throw new RangeError(
        "AspectRatio ratio must be a positive finite number",
      );
    return (
      <Element
        {...rest}
        ref={ref}
        className={
          className ? `ec-aspect-ratio ${className}` : "ec-aspect-ratio"
        }
        style={{ "--ec-aspect-ratio": ratio, ...style } as CSSProperties}
      >
        {children}
      </Element>
    );
  },
);
