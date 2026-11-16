// SPDX-License-Identifier: MIT
import { forwardRef, useId } from "react";
import type { ComponentPropsWithRef } from "react";

export interface RadioCardProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type"
> {
  label: string;
  description?: string;
  error?: string;
  loading?: boolean;
}

export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
  function RadioCard(
    {
      label,
      description,
      error,
      loading = false,
      disabled = false,
      readOnly = false,
      className,
      id,
      onClick,
      onKeyDown,
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
      <div className={`ec-radio-card${className ? ` ${className}` : ""}`}>
        <input
          {...rest}
          ref={ref}
          id={inputId}
          aria-labelledby={`${inputId}-label`}
          type="radio"
          disabled={disabled || loading}
          readOnly={readOnly}
          aria-readonly={readOnly || undefined}
          aria-busy={loading || undefined}
          aria-invalid={error ? true : rest["aria-invalid"]}
          aria-describedby={descriptions}
          onClick={(event) => {
            if (readOnly) event.preventDefault();
            else onClick?.(event);
          }}
          onKeyDown={(event) => {
            if (
              readOnly &&
              [" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
                event.key,
              )
            )
              event.preventDefault();
            else onKeyDown?.(event);
          }}
        />
        <label htmlFor={inputId} className="ec-radio-card__body">
          <span className="ec-radio-card__indicator" aria-hidden="true" />
          <span className="ec-radio-card__content">
            <span id={`${inputId}-label`} className="ec-radio-card__label">
              {label}
            </span>
            {description && (
              <span id={descriptionId} className="ec-radio-card__description">
                {description}
              </span>
            )}
            {error && (
              <span id={errorId} className="ec-radio-card__error">
                {error}
              </span>
            )}
          </span>
        </label>
      </div>
    );
  },
);
