// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ChangeEvent, ComponentPropsWithRef } from "react";

export interface InputProps extends Omit<
  ComponentPropsWithRef<"input">,
  "size" | "color"
> {
  variant?: "outline" | "filled" | "flushed";
  size?: "sm" | "md" | "lg";
  color?: "neutral" | "brand" | "danger";
  invalid?: boolean;
  onValueChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
}

export const inputRecipe = {
  slots: ["root"],
  variants: ["outline", "filled", "flushed"],
  sizes: ["sm", "md", "lg"],
  colors: ["neutral", "brand", "danger"],
  defaults: { variant: "outline", size: "md", color: "brand" },
} as const;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    variant = inputRecipe.defaults.variant,
    size = inputRecipe.defaults.size,
    color = inputRecipe.defaults.color,
    invalid = false,
    onChange,
    onValueChange,
    className,
    ...rest
  },
  ref,
) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    onChange?.(event);
    onValueChange?.(value, event);
  }

  return (
    <input
      {...rest}
      ref={ref}
      onChange={handleChange}
      aria-invalid={invalid || rest["aria-invalid"] || undefined}
      data-ec-variant={variant}
      data-ec-size={size}
      data-ec-color={color}
      className={className ? `ec-input ${className}` : "ec-input"}
    />
  );
});
