// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";

export interface TagsInputProps {
  label: string;
  name?: string;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (values: string[]) => void;
  maxTags?: number;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  description?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  id?: string;
}

export function TagsInput({
  label,
  name,
  value,
  defaultValue = [],
  onValueChange,
  maxTags = Infinity,
  disabled = false,
  readOnly = false,
  required = false,
  description,
  error,
  placeholder = "Add a tag",
  className,
  id,
}: TagsInputProps) {
  const generated = useId();
  const inputId = id ?? generated;
  const [internal, setInternal] = useState(defaultValue);
  const values = value ?? internal;
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLInputElement>(null);
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const describedBy =
    [description && descriptionId, error && errorId]
      .filter(Boolean)
      .join(" ") || undefined;

  function update(next: string[]) {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  }
  function append(text: string) {
    const additions = text
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
    const next = [...values];
    for (const item of additions) {
      if (next.length >= maxTags) break;
      if (
        !next.some(
          (current) => current.toLocaleLowerCase() === item.toLocaleLowerCase(),
        )
      )
        next.push(item);
    }
    if (next.length !== values.length) update(next);
    setDraft("");
  }
  function remove(index: number) {
    if (disabled || readOnly) return;
    update(values.filter((_, position) => position !== index));
    inputRef.current?.focus();
  }
  function startEdit(index: number) {
    if (disabled || readOnly) return;
    setEditing(index);
    setEditDraft(values[index] ?? "");
    queueMicrotask(() => editRef.current?.focus());
  }
  function saveEdit() {
    if (editing === null) return;
    const nextValue = editDraft.trim();
    if (
      nextValue &&
      !values.some(
        (item, index) =>
          index !== editing &&
          item.toLocaleLowerCase() === nextValue.toLocaleLowerCase(),
      )
    ) {
      update(
        values.map((item, index) => (index === editing ? nextValue : item)),
      );
    }
    setEditing(null);
    inputRef.current?.focus();
  }

  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;
    const reset = () => {
      if (value === undefined) setInternal(defaultValue);
      setDraft("");
      setEditing(null);
    };
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [defaultValue, value]);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (disabled || readOnly) return;
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      append(draft);
    } else if (event.key === "Backspace" && !draft && values.length) {
      event.preventDefault();
      remove(values.length - 1);
    }
  }
  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    const text = event.clipboardData.getData("text");
    if (!/[,\n]/.test(text) || disabled || readOnly) return;
    event.preventDefault();
    append(`${draft}${text}`);
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setDraft(event.currentTarget.value);
  }

  return (
    <div
      className={`ec-tags-input${className ? ` ${className}` : ""}`}
      data-disabled={disabled || undefined}
    >
      <label htmlFor={inputId}>{label}</label>
      <div
        className="ec-tags-input__control"
        onClick={() => inputRef.current?.focus()}
      >
        {values.map((tag, index) => (
          <span className="ec-tags-input__tag" key={`${tag}-${index}`}>
            {editing === index ? (
              <input
                ref={editRef}
                className="ec-tags-input__edit"
                aria-label={`Edit ${tag}`}
                value={editDraft}
                onChange={(event) => setEditDraft(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    saveEdit();
                  }
                  if (event.key === "Escape") {
                    event.preventDefault();
                    setEditing(null);
                    inputRef.current?.focus();
                  }
                }}
                onBlur={saveEdit}
              />
            ) : (
              <>
                <button
                  type="button"
                  className="ec-tags-input__value"
                  onDoubleClick={() => startEdit(index)}
                  onKeyDown={(event) => {
                    if (event.key === "F2") {
                      event.preventDefault();
                      startEdit(index);
                    }
                  }}
                  disabled={disabled}
                  aria-label={`${tag}, press F2 to edit`}
                >
                  {tag}
                </button>
                {!readOnly && (
                  <button
                    type="button"
                    className="ec-tags-input__remove"
                    onClick={(event) => {
                      event.stopPropagation();
                      remove(index);
                    }}
                    disabled={disabled}
                    aria-label={`Remove ${tag}`}
                  >
                    ×
                  </button>
                )}
              </>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          id={inputId}
          className="ec-tags-input__input"
          value={draft}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={() => {
            if (draft.trim()) append(draft);
          }}
          placeholder={values.length ? undefined : placeholder}
          disabled={disabled || readOnly}
          aria-readonly={readOnly || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          aria-label={label}
          required={required && values.length === 0}
        />
      </div>
      {name &&
        values.map((tag, index) => (
          <input
            key={`${tag}-${index}`}
            type="hidden"
            name={name}
            value={tag}
            disabled={disabled}
          />
        ))}
      {description && (
        <span id={descriptionId} className="ec-tags-input__description">
          {description}
        </span>
      )}
      {error && (
        <span id={errorId} className="ec-tags-input__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
