// SPDX-License-Identifier: MIT
import { forwardRef, useId } from "react";
import type { ComponentPropsWithRef } from "react";

export interface CheckboxCardProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type"
> {
  label: string;
  description?: string;
  error?: string;
  loading?: boolean;
}

export const CheckboxCard = forwardRef<HTMLInputElement, CheckboxCardProps>(
  function CheckboxCard(
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
      <div className={`ec-checkbox-card${className ? ` ${className}` : ""}`}>
        <input
          {...rest}
          ref={ref}
          id={inputId}
          aria-labelledby={`${inputId}-label`}
          type="checkbox"
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
        />
        <label htmlFor={inputId} className="ec-checkbox-card__body">
          <span className="ec-checkbox-card__indicator" aria-hidden="true" />
          <span className="ec-checkbox-card__content">
            <span id={`${inputId}-label`} className="ec-checkbox-card__label">
              {label}
            </span>
            {description && (
              <span
                id={descriptionId}
                className="ec-checkbox-card__description"
              >
                {description}
              </span>
            )}
            {error && (
              <span id={errorId} className="ec-checkbox-card__error">
                {error}
              </span>
            )}
          </span>
        </label>
      </div>
    );
  },
);
