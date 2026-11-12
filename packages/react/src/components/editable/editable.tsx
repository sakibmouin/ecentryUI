// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

export interface EditableProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSubmit" | "defaultValue"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  validate?: (value: string) => string | undefined;
  label: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}

export function Editable({
  value,
  defaultValue = "",
  onValueChange,
  onSubmit,
  validate,
  label,
  disabled = false,
  readOnly = false,
  placeholder = "Click to edit",
  className,
  ...rest
}: EditableProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const committed = value ?? internalValue;
  const [draft, setDraft] = useState(committed);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string>();
  const errorId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function start() {
    if (disabled || readOnly) return;
    setDraft(committed);
    setError(undefined);
    setEditing(true);
  }
  function cancel() {
    setDraft(committed);
    setError(undefined);
    setEditing(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }
  function submit() {
    const next = draft.trim();
    const issue = validate?.(next);
    if (issue) {
      setError(issue);
      return;
    }
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
    onSubmit?.(next);
    setError(undefined);
    setEditing(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <div {...rest} className={`ec-editable${className ? ` ${className}` : ""}`}>
      {editing ? (
        <div className="ec-editable__editor">
          <input
            ref={inputRef}
            aria-label={label}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setError(undefined);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                submit();
              }
              if (event.key === "Escape") {
                event.preventDefault();
                cancel();
              }
            }}
          />
          <button type="button" onClick={submit}>
            Save
          </button>
          <button type="button" onClick={cancel}>
            Cancel
          </button>
          {error && (
            <span id={errorId} className="ec-editable__error" role="alert">
              {error}
            </span>
          )}
        </div>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          className="ec-editable__trigger"
          onClick={start}
          disabled={disabled || readOnly}
          aria-label={`Edit ${label}`}
        >
          {committed || (
            <span className="ec-editable__placeholder">{placeholder}</span>
          )}
        </button>
      )}
    </div>
  );
}
