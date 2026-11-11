// SPDX-License-Identifier: MIT
import { forwardRef, useEffect, useId, useRef } from "react";
import type { ComponentPropsWithRef } from "react";

export interface CheckboxProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type"
> {
  label: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
  loading?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      description,
      error,
      indeterminate = false,
      loading = false,
      disabled = false,
      readOnly = false,
      id,
      className,
      "aria-describedby": describedBy,
      onClick,
      ...rest
    },
    forwardedRef,
  ) {
    const generated = useId();
    const inputId = id ?? generated;
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);
    const descriptionId = `${inputId}-description`;
    const errorId = `${inputId}-error`;
    const descriptions =
      [describedBy, description && descriptionId, error && errorId]
        .filter(Boolean)
        .join(" ") || undefined;
    return (
      <div className={`ec-checkbox${className ? ` ${className}` : ""}`}>
        <input
          {...rest}
          ref={(node) => {
            inputRef.current = node;
            if (typeof forwardedRef === "function") forwardedRef(node);
            else if (forwardedRef) forwardedRef.current = node;
          }}
          id={inputId}
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
        <div className="ec-checkbox__body">
          <label htmlFor={inputId}>{label}</label>
          {description && (
            <span id={descriptionId} className="ec-checkbox__description">
              {description}
            </span>
          )}
          {error && (
            <span id={errorId} className="ec-checkbox__error">
              {error}
            </span>
          )}
        </div>
      </div>
    );
  },
);
