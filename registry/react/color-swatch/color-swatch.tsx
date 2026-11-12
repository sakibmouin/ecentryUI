// SPDX-License-Identifier: MIT
import { forwardRef, useId } from "react";
import type { ComponentPropsWithRef } from "react";

export interface ColorSwatchProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type" | "value"
> {
  color: string;
  label: string;
  description?: string;
  error?: string;
  loading?: boolean;
}

export const ColorSwatch = forwardRef<HTMLInputElement, ColorSwatchProps>(
  function ColorSwatch(
    {
      color,
      label,
      description,
      error,
      loading = false,
      disabled = false,
      readOnly = false,
      id,
      className,
      onClick,
      "aria-describedby": describedBy,
      ...rest
    },
    ref,
  ) {
    const generated = useId();
    const inputId = id ?? generated;
    const descriptionId = `${inputId}-description`;
    const errorId = `${inputId}-error`;
    const descriptions =
      [describedBy, description && descriptionId, error && errorId]
        .filter(Boolean)
        .join(" ") || undefined;
    return (
      <span className={`ec-color-swatch${className ? ` ${className}` : ""}`}>
        <input
          {...rest}
          ref={ref}
          id={inputId}
          type="radio"
          value={color}
          disabled={disabled || loading}
          readOnly={readOnly}
          aria-readonly={readOnly || undefined}
          aria-busy={loading || undefined}
          aria-invalid={error ? true : rest["aria-invalid"]}
          aria-describedby={descriptions}
          aria-labelledby={`${inputId}-label`}
          onClick={(event) => {
            if (readOnly) event.preventDefault();
            else onClick?.(event);
          }}
        />
        <label htmlFor={inputId}>
          <span
            className="ec-color-swatch__chip"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
          <span className="ec-color-swatch__body">
            <span id={`${inputId}-label`} className="ec-color-swatch__label">
              {label}
            </span>
            {description && (
              <span id={descriptionId} className="ec-color-swatch__description">
                {description}
              </span>
            )}
            {error && (
              <span id={errorId} className="ec-color-swatch__error">
                {error}
              </span>
            )}
          </span>
        </label>
      </span>
    );
  },
);
