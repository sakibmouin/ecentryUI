// SPDX-License-Identifier: MIT
import { forwardRef, useId, useRef } from "react";
import type { ComponentPropsWithRef } from "react";

export interface NativeSelectProps extends ComponentPropsWithRef<"select"> {
  label: string;
  description?: string;
  error?: string;
  loading?: boolean;
  readOnly?: boolean;
}

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect(
    {
      label,
      description,
      error,
      loading = false,
      disabled = false,
      readOnly = false,
      className,
      id,
      onFocus,
      onMouseDown,
      onKeyDown,
      onChange,
      "aria-describedby": describedBy,
      children,
      ...rest
    },
    ref,
  ) {
    const generated = useId();
    const selectId = id ?? generated;
    const descriptionId = `${selectId}-description`;
    const errorId = `${selectId}-error`;
    const descriptions =
      [describedBy, description && descriptionId, error && errorId]
        .filter(Boolean)
        .join(" ") || undefined;
    const lockedValue = useRef("");
    return (
      <div className={`ec-native-select${className ? ` ${className}` : ""}`}>
        <label htmlFor={selectId}>{label}</label>
        <select
          {...rest}
          ref={ref}
          id={selectId}
          disabled={disabled || loading}
          aria-readonly={readOnly || undefined}
          aria-busy={loading || undefined}
          aria-invalid={error ? true : rest["aria-invalid"]}
          aria-describedby={descriptions}
          onFocus={(event) => {
            lockedValue.current = event.currentTarget.value;
            onFocus?.(event);
          }}
          onMouseDown={(event) => {
            if (readOnly) event.preventDefault();
            else onMouseDown?.(event);
          }}
          onKeyDown={(event) => {
            if (readOnly && !["Tab", "Shift", "Escape"].includes(event.key))
              event.preventDefault();
            else onKeyDown?.(event);
          }}
          onChange={(event) => {
            if (readOnly) {
              event.currentTarget.value = lockedValue.current;
              return;
            }
            onChange?.(event);
          }}
        >
          {children}
        </select>
        {description && (
          <span id={descriptionId} className="ec-native-select__description">
            {description}
          </span>
        )}
        {error && (
          <span id={errorId} className="ec-native-select__error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);
