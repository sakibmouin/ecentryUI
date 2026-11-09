// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";

export interface ButtonProps extends Omit<
  ComponentPropsWithRef<"button">,
  "color"
> {
  variant?: "solid" | "outline" | "ghost" | "text";
  size?: "sm" | "md" | "lg";
  color?: "neutral" | "brand" | "danger";
  loading?: boolean;
  loadingText?: string;
}

export const buttonRecipe = {
  slots: ["root", "spinner", "label"],
  variants: ["solid", "outline", "ghost", "text"],
  sizes: ["sm", "md", "lg"],
  colors: ["neutral", "brand", "danger"],
  defaults: { variant: "solid", size: "md", color: "brand" },
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = buttonRecipe.defaults.variant,
      size = buttonRecipe.defaults.size,
      color = buttonRecipe.defaults.color,
      loading = false,
      loadingText,
      disabled = false,
      type = "button",
      className,
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        data-ec-variant={variant}
        data-ec-size={size}
        data-ec-color={color}
        data-ec-loading={loading ? "" : undefined}
        className={className ? `ec-button ${className}` : "ec-button"}
      >
        {loading && <span className="ec-button-spinner" aria-hidden="true" />}
        <span className="ec-button-label">
          {loading && loadingText ? loadingText : children}
        </span>
        {loading && <span className="ec-visually-hidden">Loading</span>}
      </button>
    );
  },
);
