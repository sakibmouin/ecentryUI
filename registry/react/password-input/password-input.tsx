// SPDX-License-Identifier: MIT
import { forwardRef, useId, useState } from "react";
import type { ComponentPropsWithRef } from "react";

export interface PasswordInputProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type"
> {
  label: string;
  description?: string;
  error?: string;
  loading?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      label,
      description,
      error,
      loading = false,
      disabled = false,
      readOnly = false,
      className,
      id,
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
    const [visible, setVisible] = useState(false);
    return (
      <div className={`ec-password-input${className ? ` ${className}` : ""}`}>
        <label htmlFor={inputId}>{label}</label>
        <div className="ec-password-input__control">
          <input
            {...rest}
            ref={ref}
            id={inputId}
            type={visible ? "text" : "password"}
            disabled={disabled || loading}
            readOnly={readOnly}
            aria-busy={loading || undefined}
            aria-invalid={error ? true : rest["aria-invalid"]}
            aria-describedby={descriptions}
          />
          <button
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            disabled={disabled || loading}
            onClick={() => setVisible(!visible)}
          >
            {visible ? "Hide" : "Show"}
          </button>
        </div>
        {description && (
          <span id={descriptionId} className="ec-password-input__description">
            {description}
          </span>
        )}
        {error && (
          <span id={errorId} className="ec-password-input__error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);
