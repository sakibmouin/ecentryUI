// SPDX-License-Identifier: MIT
import { useId, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";

export interface CommandItem {
  value: string;
  label: string;
  shortcut?: string;
  disabled?: boolean;
}
export interface CommandGroup {
  label: string;
  items: CommandItem[];
}
export interface CommandProps {
  label: string;
  groups: CommandGroup[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSelect?: (item: CommandItem) => void;
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Command({
  label,
  groups,
  value,
  defaultValue = "",
  onValueChange,
  onSelect,
  placeholder = "Search commands",
  emptyMessage = "No commands found",
  disabled = false,
  className,
  id,
}: CommandProps) {
  const generated = useId();
  const inputId = id ?? generated;
  const listId = `${inputId}-results`;
  const [internal, setInternal] = useState(defaultValue);
  const selected = value ?? internal;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const filteredGroups = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            `${item.label} ${item.shortcut ?? ""}`
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase()),
          ),
        }))
        .filter((group) => group.items.length),
    [groups, query],
  );
  const flat = filteredGroups.flatMap((group) => group.items);
  function choose(item: CommandItem) {
    if (item.disabled) return;
    if (value === undefined) setInternal(item.value);
    onValueChange?.(item.value);
    onSelect?.(item);
  }
  function move(direction: 1 | -1) {
    if (!flat.length) return;
    let index = active;
    for (let tries = 0; tries < flat.length; tries++) {
      index = (index + direction + flat.length) % flat.length;
      if (!flat[index]?.disabled) {
        setActive(index);
        return;
      }
    }
  }
  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      move(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(flat.findIndex((item) => !item.disabled));
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(
        flat.reduce((last, item, index) => (!item.disabled ? index : last), -1),
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = flat[active];
      if (item) choose(item);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setQuery("");
      setActive(-1);
    }
  }
  let position = 0;
  return (
    <div className={`ec-command${className ? ` ${className}` : ""}`}>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="true"
        aria-controls={listId}
        aria-activedescendant={
          active >= 0 ? `${inputId}-option-${active}` : undefined
        }
        autoComplete="off"
        value={query}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
          setActive(-1);
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
      />
      <div
        id={listId}
        role="listbox"
        aria-label={`${label} results`}
        className="ec-command__results"
      >
        {filteredGroups.length ? (
          filteredGroups.map((group) => (
            <div
              key={group.label}
              role="group"
              aria-label={group.label}
              className="ec-command__group"
            >
              <div className="ec-command__heading" aria-hidden="true">
                {group.label}
              </div>
              {group.items.map((item) => {
                const index = position++;
                return (
                  <div
                    key={item.value}
                    id={`${inputId}-option-${index}`}
                    role="option"
                    aria-selected={selected === item.value}
                    aria-disabled={item.disabled || undefined}
                    data-active={index === active || undefined}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => choose(item)}
                    className="ec-command__option"
                  >
                    <span>{item.label}</span>
                    {item.shortcut && <kbd>{item.shortcut}</kbd>}
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div className="ec-command__empty">{emptyMessage}</div>
        )}
      </div>
    </div>
  );
}
