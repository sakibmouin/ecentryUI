// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
export interface SelectGroup {
  label: string;
  options: SelectOption[];
}
export interface SelectProps {
  label: string;
  groups: SelectGroup[];
  multiple?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  name?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Select({
  label,
  groups,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  name,
  placeholder = "Choose an option",
  description,
  error,
  required,
  disabled = false,
  className,
  id,
}: SelectProps) {
  const generated = useId();
  const selectId = id ?? generated;
  const listId = `${selectId}-options`;
  const [internal, setInternal] = useState<string | string[]>(
    defaultValue ?? (multiple ? [] : ""),
  );
  const selected = value ?? internal;
  const selectedValues = Array.isArray(selected)
    ? selected
    : selected
      ? [selected]
      : [];
  const options = groups.flatMap((group) => group.options);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const typeahead = useRef("");
  const typeaheadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const descriptionId = `${selectId}-description`;
  const errorId = `${selectId}-error`;
  const describedBy =
    [description && descriptionId, error && errorId]
      .filter(Boolean)
      .join(" ") || undefined;
  const selectedLabels = options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.label);

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form) return;
    const reset = () => {
      if (value === undefined)
        setInternal(defaultValue ?? (multiple ? [] : ""));
      setOpen(false);
    };
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [defaultValue, multiple, value]);
  useEffect(
    () => () => {
      if (typeaheadTimer.current) clearTimeout(typeaheadTimer.current);
    },
    [],
  );

  function show() {
    if (disabled) return;
    const selectedIndex = options.findIndex(
      (option) => selectedValues.includes(option.value) && !option.disabled,
    );
    setActive(
      selectedIndex >= 0
        ? selectedIndex
        : options.findIndex((option) => !option.disabled),
    );
    setOpen(true);
  }
  function choose(index: number) {
    const option = options[index];
    if (!option || option.disabled || disabled) return;
    const next = multiple
      ? selectedValues.includes(option.value)
        ? selectedValues.filter((item) => item !== option.value)
        : [...selectedValues, option.value]
      : option.value;
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
    if (!multiple) setOpen(false);
    setActive(index);
    triggerRef.current?.focus();
  }
  function move(direction: 1 | -1) {
    if (!options.length) return;
    let index = active;
    for (let tries = 0; tries < options.length; tries++) {
      index = (index + direction + options.length) % options.length;
      if (!options[index]?.disabled) {
        setActive(index);
        return;
      }
    }
  }
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (!open && ["ArrowDown", "ArrowUp", " ", "Enter"].includes(event.key)) {
      event.preventDefault();
      show();
      return;
    }
    if (!open) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      move(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(options.findIndex((option) => !option.disabled));
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(
        options.reduce(
          (last, option, index) => (!option.disabled ? index : last),
          -1,
        ),
      );
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(active);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    } else if (
      event.key.length === 1 &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      typeahead.current += event.key.toLocaleLowerCase();
      if (typeaheadTimer.current) clearTimeout(typeaheadTimer.current);
      typeaheadTimer.current = setTimeout(() => {
        typeahead.current = "";
      }, 700);
      const match = options.findIndex(
        (option) =>
          !option.disabled &&
          option.label.toLocaleLowerCase().startsWith(typeahead.current),
      );
      if (match >= 0) setActive(match);
    }
  }
  let position = 0;
  return (
    <div
      ref={rootRef}
      className={`ec-select${className ? ` ${className}` : ""}`}
    >
      <span id={`${selectId}-label`} className="ec-select__label">
        {label}
      </span>
      <div className="ec-select__anchor">
        <button
          ref={triggerRef}
          id={selectId}
          type="button"
          className="ec-select__trigger"
          aria-labelledby={`${selectId}-label ${selectId}-value`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={
            open && active >= 0 ? `${selectId}-option-${active}` : undefined
          }
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          aria-required={required || undefined}
          disabled={disabled}
          onClick={() => {
            if (open) setOpen(false);
            else show();
          }}
          onKeyDown={handleKeyDown}
        >
          <span
            id={`${selectId}-value`}
            data-placeholder={!selectedLabels.length || undefined}
          >
            {selectedLabels.length ? selectedLabels.join(", ") : placeholder}
          </span>
          <span aria-hidden="true">⌄</span>
        </button>
        {open && (
          <div
            id={listId}
            role="listbox"
            aria-label={`${label} options`}
            aria-multiselectable={multiple || undefined}
            className="ec-select__list"
          >
            {groups.map((group) => (
              <div
                key={group.label}
                role="group"
                aria-label={group.label}
                className="ec-select__group"
              >
                <div className="ec-select__heading" aria-hidden="true">
                  {group.label}
                </div>
                {group.options.map((option) => {
                  const index = position++;
                  return (
                    <div
                      key={option.value}
                      id={`${selectId}-option-${index}`}
                      role="option"
                      aria-selected={selectedValues.includes(option.value)}
                      aria-disabled={option.disabled || undefined}
                      data-active={index === active || undefined}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => choose(index)}
                    >
                      {option.label}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
      {name &&
        selectedValues.map((item) => (
          <input
            key={item}
            type="hidden"
            name={name}
            value={item}
            disabled={disabled}
          />
        ))}
      {description && (
        <span id={descriptionId} className="ec-select__description">
          {description}
        </span>
      )}
      {error && (
        <span id={errorId} className="ec-select__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
