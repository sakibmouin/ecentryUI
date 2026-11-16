// SPDX-License-Identifier: MIT
import { forwardRef, useId } from "react";
import type { ChangeEvent, ComponentPropsWithRef } from "react";

export interface TextareaProps extends ComponentPropsWithRef<"textarea"> {
  label: string;
  description?: string;
  error?: string;
  loading?: boolean;
  variant?: "outline" | "filled" | "flushed";
  size?: "sm" | "md" | "lg";
  onValueChange?: (
    value: string,
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      description,
      error,
      loading = false,
      disabled = false,
      variant = "outline",
      size = "md",
      className,
      id,
      onChange,
      onValueChange,
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
      <div
        className={`ec-textarea${className ? ` ${className}` : ""}`}
        data-ec-size={size}
      >
        <label htmlFor={inputId}>{label}</label>
        <textarea
          {...rest}
          ref={ref}
          id={inputId}
          disabled={disabled || loading}
          aria-busy={loading || undefined}
          aria-invalid={error ? true : rest["aria-invalid"]}
          aria-describedby={descriptions}
          data-ec-variant={variant}
          data-ec-size={size}
          onChange={(event) => {
            onChange?.(event);
            onValueChange?.(event.currentTarget.value, event);
          }}
        />
        {description && (
          <span id={descriptionId} className="ec-textarea__description">
            {description}
          </span>
        )}
        {error && (
          <span id={errorId} className="ec-textarea__error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);
