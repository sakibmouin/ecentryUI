// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export interface ListboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}
export interface ListboxGroup {
  label: string;
  options: ListboxOption[];
}
export interface ListboxProps {
  label: string;
  groups: ListboxGroup[];
  multiple?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Listbox({
  label,
  groups,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  name,
  disabled = false,
  className,
  id,
}: ListboxProps) {
  const generated = useId();
  const listId = id ?? generated;
  const initial = defaultValue ?? (multiple ? [] : "");
  const [internal, setInternal] = useState<string | string[]>(initial);
  const selected = value ?? internal;
  const selectedValues = Array.isArray(selected)
    ? selected
    : selected
      ? [selected]
      : [];
  const options = groups.flatMap((group) => group.options);
  const [active, setActive] = useState(() =>
    options.findIndex((option) => !option.disabled),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const typeahead = useRef("");
  const typeaheadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form) return;
    const reset = () => {
      if (value === undefined) setInternal(initial);
      setActive(options.findIndex((option) => !option.disabled));
    };
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [initial, options, value]);
  useEffect(
    () => () => {
      if (typeaheadTimer.current) clearTimeout(typeaheadTimer.current);
    },
    [],
  );

  function select(index: number) {
    const option = options[index];
    if (!option || option.disabled || disabled) return;
    const next = multiple
      ? selectedValues.includes(option.value)
        ? selectedValues.filter((item) => item !== option.value)
        : [...selectedValues, option.value]
      : option.value;
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
    setActive(index);
    rootRef.current?.focus();
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
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;
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
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      select(active);
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
      const start = Math.max(active, 0);
      for (let offset = 1; offset <= options.length; offset++) {
        const index = (start + offset) % options.length;
        const option = options[index];
        if (
          option &&
          !option.disabled &&
          option.label.toLocaleLowerCase().startsWith(typeahead.current)
        ) {
          setActive(index);
          break;
        }
      }
    }
  }
  let position = 0;
  return (
    <div className={`ec-listbox${className ? ` ${className}` : ""}`}>
      <span id={`${listId}-label`} className="ec-listbox__label">
        {label}
      </span>
      <div
        ref={rootRef}
        id={listId}
        role="listbox"
        tabIndex={disabled ? -1 : 0}
        aria-labelledby={`${listId}-label`}
        aria-multiselectable={multiple || undefined}
        aria-disabled={disabled || undefined}
        aria-activedescendant={
          active >= 0 ? `${listId}-option-${active}` : undefined
        }
        className="ec-listbox__options"
        onKeyDown={handleKeyDown}
      >
        {groups.map((group) => (
          <div
            key={group.label}
            role="group"
            aria-label={group.label}
            className="ec-listbox__group"
          >
            <div className="ec-listbox__heading" aria-hidden="true">
              {group.label}
            </div>
            {group.options.map((option) => {
              const index = position++;
              return (
                <div
                  key={option.value}
                  id={`${listId}-option-${index}`}
                  role="option"
                  aria-selected={selectedValues.includes(option.value)}
                  aria-disabled={option.disabled || undefined}
                  data-active={index === active || undefined}
                  onClick={() => select(index)}
                  className="ec-listbox__option"
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        ))}
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
    </div>
  );
}
