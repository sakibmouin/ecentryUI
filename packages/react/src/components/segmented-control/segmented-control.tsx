// SPDX-License-Identifier: MIT
import { useId } from "react";

export interface SegmentedControlOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  label: string;
  name: string;
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  description?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  className?: string;
  form?: string;
}

export function SegmentedControl({
  label,
  name,
  options,
  value,
  defaultValue,
  onValueChange,
  description,
  error,
  disabled = false,
  readOnly = false,
  required = false,
  className,
  form,
}: SegmentedControlProps) {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const describedBy =
    [description && descriptionId, error && errorId]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <fieldset
      className={`ec-segmented-control${className ? ` ${className}` : ""}`}
      disabled={disabled}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
    >
      <legend>{label}</legend>
      {description && (
        <p id={descriptionId} className="ec-segmented-control__description">
          {description}
        </p>
      )}
      <div className="ec-segmented-control__segments">
        {options.map((option, index) => {
          const inputId = `${id}-${index}`;
          return (
            <span key={option.value} className="ec-segmented-control__option">
              <input
                id={inputId}
                type="radio"
                name={name}
                form={form}
                value={option.value}
                checked={
                  value === undefined ? undefined : value === option.value
                }
                defaultChecked={
                  value === undefined
                    ? defaultValue === option.value
                    : undefined
                }
                disabled={option.disabled}
                required={required}
                readOnly={readOnly}
                aria-readonly={readOnly || undefined}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy}
                onClick={(event) => {
                  if (readOnly) event.preventDefault();
                }}
                onKeyDown={(event) => {
                  if (
                    readOnly &&
                    [
                      " ",
                      "ArrowLeft",
                      "ArrowRight",
                      "ArrowUp",
                      "ArrowDown",
                    ].includes(event.key)
                  )
                    event.preventDefault();
                }}
                onChange={(event) => {
                  if (!readOnly && event.target.checked)
                    onValueChange?.(option.value);
                }}
              />
              <label htmlFor={inputId}>{option.label}</label>
            </span>
          );
        })}
      </div>
      {error && (
        <p id={errorId} className="ec-segmented-control__error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
