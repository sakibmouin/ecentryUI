// SPDX-License-Identifier: MIT
import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

export interface AccordionItem {
  value: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
}

export function Accordion({
  items,
  type = "single",
  value,
  defaultValue,
  onValueChange,
  className,
}: AccordionProps) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue ?? (type === "multiple" ? [] : ""),
  );
  const current = value === undefined ? internalValue : value;
  const expanded = (itemValue: string) =>
    Array.isArray(current)
      ? current.includes(itemValue)
      : current === itemValue;

  function toggle(itemValue: string) {
    const next =
      type === "multiple"
        ? expanded(itemValue)
          ? (Array.isArray(current) ? current : [current]).filter(
              (entry) => entry !== itemValue,
            )
          : [
              ...(Array.isArray(current) ? current : current ? [current] : []),
              itemValue,
            ]
        : expanded(itemValue)
          ? ""
          : itemValue;
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  }

  function onTriggerKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const enabled = items
      .map((item, itemIndex) => (!item.disabled ? itemIndex : -1))
      .filter((itemIndex) => itemIndex >= 0);
    const position = enabled.indexOf(index);
    let next: number | undefined;
    if (event.key === "ArrowDown")
      next = enabled[(position + 1) % enabled.length];
    if (event.key === "ArrowUp")
      next = enabled[(position - 1 + enabled.length) % enabled.length];
    if (event.key === "Home") next = enabled[0];
    if (event.key === "End") next = enabled.at(-1);
    if (next === undefined) return;
    event.preventDefault();
    const triggers = root.current?.querySelectorAll<HTMLButtonElement>(
      ".ec-accordion__trigger",
    );
    triggers?.[next]?.focus();
  }

  return (
    <div
      ref={root}
      className={`ec-accordion${className ? ` ${className}` : ""}`}
    >
      {items.map((item, index) => {
        const open = expanded(item.value);
        const triggerId = `${id}-trigger-${index}`;
        const panelId = `${id}-panel-${index}`;
        return (
          <div
            className="ec-accordion__item"
            key={item.value}
            data-state={open ? "open" : "closed"}
          >
            <h3 className="ec-accordion__heading">
              <button
                id={triggerId}
                className="ec-accordion__trigger"
                type="button"
                aria-controls={panelId}
                aria-expanded={open}
                disabled={item.disabled}
                onClick={() => toggle(item.value)}
                onKeyDown={(event) => onTriggerKeyDown(event, index)}
              >
                <span>{item.title}</span>
                <span className="ec-accordion__indicator" aria-hidden="true">
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              className="ec-accordion__panel"
              role="region"
              aria-labelledby={triggerId}
              hidden={!open}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
