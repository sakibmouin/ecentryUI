// SPDX-License-Identifier: MIT
import { cloneElement, useId } from "react";
import type {
  ComponentPropsWithoutRef,
  ReactElement,
  ComponentPropsWithRef,
} from "react";

export interface FieldProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  children: ReactElement<ComponentPropsWithRef<"input">>;
}

export function Field({
  label,
  description,
  error,
  required,
  disabled,
  readOnly,
  children,
  className,
  ...rest
}: FieldProps) {
  const generated = useId();
  const inputId = children.props.id ?? generated;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const describedBy =
    [
      children.props["aria-describedby"],
      description && descriptionId,
      error && errorId,
    ]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <div {...rest} className={`ec-field${className ? ` ${className}` : ""}`}>
      <label className="ec-field__label" htmlFor={inputId}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {cloneElement(children, {
        id: inputId,
        required: required || children.props.required,
        disabled: disabled || children.props.disabled,
        readOnly: readOnly || children.props.readOnly,
        "aria-invalid": error ? true : children.props["aria-invalid"],
        "aria-describedby": describedBy,
      })}
      {description && (
        <span id={descriptionId} className="ec-field__description">
          {description}
        </span>
      )}
      {error && (
        <span id={errorId} className="ec-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
