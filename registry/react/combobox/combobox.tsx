// SPDX-License-Identifier: MIT
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}
export interface ComboboxProps {
  label: string;
  options: ComboboxOption[];
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  id?: string;
}

export function Combobox({
  label,
  options,
  name,
  value,
  defaultValue = "",
  onValueChange,
  placeholder = "Choose an option",
  emptyMessage = "No matches",
  description,
  error,
  required,
  disabled = false,
  readOnly = false,
  className,
  id,
}: ComboboxProps) {
  const generated = useId();
  const inputId = id ?? generated;
  const listId = `${inputId}-options`;
  const [internal, setInternal] = useState(defaultValue);
  const selected = value ?? internal;
  const selectedLabel =
    options.find((option) => option.value === selected)?.label ?? "";
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      ),
    [options, query],
  );
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const describedBy =
    [description && descriptionId, error && errorId]
      .filter(Boolean)
      .join(" ") || undefined;

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);
  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;
    const reset = () => {
      if (value === undefined) setInternal(defaultValue);
      setOpen(false);
      setQuery("");
    };
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [defaultValue, value]);

  function show() {
    if (disabled || readOnly) return;
    setQuery("");
    setOpen(true);
    setActive(-1);
  }
  function choose(option: ComboboxOption) {
    if (option.disabled) return;
    if (value === undefined) setInternal(option.value);
    onValueChange?.(option.value);
    setOpen(false);
    setQuery("");
  }
  function move(direction: 1 | -1) {
    if (!open) {
      show();
      return;
    }
    if (!filtered.length) return;
    let index = active;
    for (let tries = 0; tries < filtered.length; tries++) {
      index = (index + direction + filtered.length) % filtered.length;
      if (!filtered[index]?.disabled) {
        setActive(index);
        return;
      }
    }
  }
  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (disabled || readOnly) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      move(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Home" && open) {
      event.preventDefault();
      setActive(filtered.findIndex((option) => !option.disabled));
    } else if (event.key === "End" && open) {
      event.preventDefault();
      setActive(
        filtered.reduce(
          (last, option, index) => (!option.disabled ? index : last),
          -1,
        ),
      );
    } else if (event.key === "Enter" && open) {
      event.preventDefault();
      const option = filtered[active];
      if (option) choose(option);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      setQuery("");
    }
  }
  const activeOption = filtered[active];
  return (
    <div
      ref={rootRef}
      className={`ec-combobox${className ? ` ${className}` : ""}`}
    >
      <label htmlFor={inputId}>{label}</label>
      <div className="ec-combobox__control">
        <input
          ref={inputRef}
          id={inputId}
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={
            open && activeOption ? `${inputId}-option-${active}` : undefined
          }
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          aria-readonly={readOnly || undefined}
          value={open ? query : selectedLabel}
          onFocus={show}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setOpen(true);
            setActive(-1);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
        />
        <button
          type="button"
          aria-label={open ? "Close options" : "Show options"}
          aria-controls={listId}
          aria-expanded={open}
          disabled={disabled || readOnly}
          onClick={() => {
            if (open) setOpen(false);
            else {
              show();
              inputRef.current?.focus();
            }
          }}
        >
          ⌄
        </button>
      </div>
      {open && (
        <div
          id={listId}
          role="listbox"
          className="ec-combobox__list"
          aria-label={`${label} options`}
        >
          {filtered.length ? (
            filtered.map((option, index) => (
              <div
                key={option.value}
                id={`${inputId}-option-${index}`}
                role="option"
                aria-selected={option.value === selected}
                aria-disabled={option.disabled || undefined}
                data-active={index === active || undefined}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="ec-combobox__empty">{emptyMessage}</div>
          )}
        </div>
      )}
      {name && (
        <input type="hidden" name={name} value={selected} disabled={disabled} />
      )}
      {description && (
        <span id={descriptionId} className="ec-combobox__description">
          {description}
        </span>
      )}
      {error && (
        <span id={errorId} className="ec-combobox__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
