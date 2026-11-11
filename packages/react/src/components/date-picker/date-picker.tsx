// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Calendar } from "../calendar/calendar.js";
import type { DateRange } from "../calendar/calendar.js";

export type DatePickerValue = string | DateRange | undefined;
export interface DatePickerProps {
  label: string;
  mode?: "single" | "range";
  name?: string;
  value?: DatePickerValue;
  defaultValue?: DatePickerValue;
  onChange?: (value: DatePickerValue) => void;
  locale?: string;
  defaultMonth?: string;
  minDate?: string;
  maxDate?: string;
  isDateUnavailable?: (date: string) => boolean;
  description?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
}

function displayValue(value: DatePickerValue, locale: string): string {
  if (!value) return "";
  const format = (date: string) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeZone: "UTC",
    }).format(new Date(`${date}T12:00:00Z`));
  if (typeof value === "string") return format(value);
  return value.end
    ? `${format(value.start)} - ${format(value.end)}`
    : format(value.start);
}

export function DatePicker({
  label,
  mode = "single",
  name,
  value,
  defaultValue,
  onChange,
  locale = "en-US",
  defaultMonth,
  minDate,
  maxDate,
  isDateUnavailable,
  description,
  error,
  disabled = false,
  readOnly = false,
  className,
}: DatePickerProps) {
  const id = useId();
  const [internalValue, setInternalValue] =
    useState<DatePickerValue>(defaultValue);
  const currentValue = value === undefined ? internalValue : value;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const form = triggerRef.current?.closest("form");
    if (!form) return;
    const reset = () => {
      if (value === undefined) setInternalValue(defaultValue);
      setOpen(false);
    };
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [value, defaultValue]);

  useEffect(() => {
    if (!open) return;
    const first = rootRef.current?.querySelector<HTMLButtonElement>(
      '.ec-calendar__cell button[tabindex="0"]',
    );
    first?.focus();
    const outside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  function closeWithFocus() {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }
  function choose(next: string | string[] | DateRange | undefined) {
    if (Array.isArray(next)) return;
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
    if (mode === "single" || (next && typeof next === "object" && next.end))
      closeWithFocus();
  }
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      closeWithFocus();
    }
  }
  const range =
    currentValue && typeof currentValue === "object" ? currentValue : undefined;
  return (
    <div
      ref={rootRef}
      className={`ec-date-picker${className ? ` ${className}` : ""}`}
      onKeyDown={onKeyDown}
    >
      <span id={`${id}-label`} className="ec-date-picker__label">
        {label}
      </span>
      <button
        ref={triggerRef}
        type="button"
        className="ec-date-picker__trigger"
        aria-labelledby={`${id}-label ${id}-value`}
        aria-describedby={
          [description && `${id}-description`, error && `${id}-error`]
            .filter(Boolean)
            .join(" ") || undefined
        }
        aria-invalid={error ? true : undefined}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? `${id}-popup` : undefined}
        disabled={disabled}
        onClick={() => setOpen(!open)}
      >
        <span id={`${id}-value`}>
          {displayValue(currentValue, locale) ||
            (mode === "range" ? "Choose dates" : "Choose date")}
        </span>
        <span aria-hidden="true">▦</span>
      </button>
      {description && (
        <span id={`${id}-description`} className="ec-date-picker__description">
          {description}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className="ec-date-picker__error">
          {error}
        </span>
      )}
      {name &&
        (mode === "range" ? (
          <>
            <input
              type="hidden"
              name={`${name}-start`}
              value={range?.start ?? ""}
            />
            <input
              type="hidden"
              name={`${name}-end`}
              value={range?.end ?? ""}
            />
          </>
        ) : (
          <input
            type="hidden"
            name={name}
            value={typeof currentValue === "string" ? currentValue : ""}
          />
        ))}
      {open && (
        <div
          id={`${id}-popup`}
          className="ec-date-picker__popup"
          role="dialog"
          aria-label={`${label} calendar`}
        >
          <Calendar
            mode={mode}
            label={`${label} dates`}
            value={currentValue}
            onChange={choose}
            locale={locale}
            defaultMonth={defaultMonth}
            minDate={minDate}
            maxDate={maxDate}
            isDateUnavailable={isDateUnavailable}
            disabled={disabled}
            readOnly={readOnly}
          />
        </div>
      )}
    </div>
  );
}
