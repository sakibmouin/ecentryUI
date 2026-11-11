// SPDX-License-Identifier: MIT
import { forwardRef, useId } from "react";
import type { ComponentPropsWithRef } from "react";

export interface DateInputProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type"
> {
  label: string;
  description?: string;
  error?: string;
  loading?: boolean;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  function DateInput(
    {
      label,
      description,
      error,
      loading = false,
      disabled = false,
      id,
      className,
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
      <div className={`ec-date-input${className ? ` ${className}` : ""}`}>
        <label htmlFor={inputId}>{label}</label>
        <input
          {...rest}
          ref={ref}
          id={inputId}
          type="date"
          disabled={disabled || loading}
          aria-busy={loading || undefined}
          aria-invalid={error ? true : rest["aria-invalid"]}
          aria-describedby={descriptions}
        />
        {description && (
          <span id={descriptionId} className="ec-date-input__description">
            {description}
          </span>
        )}
        {error && (
          <span id={errorId} className="ec-date-input__error">
            {error}
          </span>
        )}
      </div>
    );
  },
);
