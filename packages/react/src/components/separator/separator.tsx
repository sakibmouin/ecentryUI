// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

export type SeparatorOrientation = "horizontal" | "vertical";
export type SeparatorResponsiveOrientation =
  | SeparatorOrientation
  | Partial<Record<"base" | "sm" | "md" | "lg", SeparatorOrientation>>;

export interface SeparatorProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  orientation?: SeparatorResponsiveOrientation;
  variant?: "solid" | "dashed" | "dotted";
  size?: "xs" | "sm" | "md" | "lg";
  label?: ReactNode;
  labelPlacement?: "start" | "center" | "end";
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLElement, SeparatorProps>(
  function Separator(
    {
      as: Element = "div",
      orientation = "horizontal",
      variant = "solid",
      size = "sm",
      label,
      labelPlacement = "center",
      decorative,
      className,
      role,
      "aria-label": ariaLabel,
      "aria-orientation": ariaOrientation,
      "aria-hidden": ariaHidden,
      ...rest
    },
    ref,
  ) {
    const responsive = typeof orientation === "object";
    const values: Partial<
      Record<"base" | "sm" | "md" | "lg", SeparatorOrientation>
    > = responsive ? orientation : { base: orientation };
    const base = values.base ?? "horizontal";
    const isDecorative = decorative ?? label == null;
    return (
      <Element
        {...rest}
        ref={ref}
        role={
          role ?? (responsive || isDecorative ? "presentation" : "separator")
        }
        aria-label={
          ariaLabel ??
          (typeof label === "string" && !responsive && !isDecorative
            ? label
            : undefined)
        }
        aria-orientation={
          ariaOrientation ?? (!responsive && !isDecorative ? base : undefined)
        }
        aria-hidden={
          ariaHidden ?? (isDecorative && label == null ? true : undefined)
        }
        data-orientation-base={base}
        data-orientation-sm={values.sm}
        data-orientation-md={values.md}
        data-orientation-lg={values.lg}
        data-variant={variant}
        data-size={size}
        data-label-placement={label == null ? undefined : labelPlacement}
        className={`ec-separator${className ? ` ${className}` : ""}`}
      >
        {label == null ? null : (
          <span className="ec-separator-label">{label}</span>
        )}
      </Element>
    );
  },
);
