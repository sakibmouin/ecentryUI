// SPDX-License-Identifier: MIT
import { useId } from "react";
import type { ComponentPropsWithRef } from "react";

export interface FieldsetProps extends ComponentPropsWithRef<"fieldset"> {
  label: string;
  description?: string;
  error?: string;
  loading?: boolean;
}

export function Fieldset({
  label,
  description,
  error,
  loading = false,
  disabled = false,
  className,
  children,
  "aria-describedby": describedBy,
  ...rest
}: FieldsetProps) {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const descriptions =
    [describedBy, description && descriptionId, error && errorId]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <fieldset
      {...rest}
      className={`ec-fieldset${className ? ` ${className}` : ""}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-invalid={error ? true : rest["aria-invalid"]}
      aria-describedby={descriptions}
    >
      <legend className="ec-fieldset__legend">{label}</legend>
      {description && (
        <p id={descriptionId} className="ec-fieldset__description">
          {description}
        </p>
      )}
      <div className="ec-fieldset__content">{children}</div>
      {error && (
        <p id={errorId} className="ec-fieldset__error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
