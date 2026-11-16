// SPDX-License-Identifier: MIT
import { forwardRef, useId } from "react";
import type { ComponentPropsWithRef } from "react";

export interface RadioProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type"
> {
  label: string;
  description?: string;
  error?: string;
  loading?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
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
    <span className={`ec-radio${className ? ` ${className}` : ""}`}>
      <input
        {...rest}
        ref={ref}
        id={inputId}
        type="radio"
        disabled={disabled || loading}
        readOnly={readOnly}
        aria-readonly={readOnly || undefined}
        aria-busy={loading || undefined}
        aria-invalid={error ? true : rest["aria-invalid"]}
        aria-labelledby={`${inputId}-label`}
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
      <label htmlFor={inputId}>
        <span id={`${inputId}-label`} className="ec-radio__label">
          {label}
        </span>
        {description && (
          <span id={descriptionId} className="ec-radio__description">
            {description}
          </span>
        )}
        {error && (
          <span id={errorId} className="ec-radio__error">
            {error}
          </span>
        )}
      </label>
    </span>
  );
});
