// SPDX-License-Identifier: MIT
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export interface DateRange {
  start: string;
  end?: string;
}
export type CalendarValue = string | string[] | DateRange | undefined;
export interface CalendarProps {
  mode?: "single" | "range" | "multiple";
  value?: CalendarValue;
  defaultValue?: CalendarValue;
  onChange?: (value: CalendarValue) => void;
  locale?: string;
  weekStartsOn?: number;
  month?: string;
  defaultMonth?: string;
  onMonthChange?: (month: string) => void;
  minDate?: string;
  maxDate?: string;
  isDateUnavailable?: (date: string) => boolean;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
  className?: string;
}

function parseDate(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`);
}
function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
function addDays(iso: string, count: number): string {
  const date = parseDate(iso);
  date.setUTCDate(date.getUTCDate() + count);
  return isoDate(date);
}
function addMonths(month: string, count: number): string {
  const date = parseDate(`${month}-01`);
  date.setUTCMonth(date.getUTCMonth() + count);
  return isoDate(date).slice(0, 7);
}
function shiftMonthDate(iso: string, count: number): string {
  const target = addMonths(iso.slice(0, 7), count);
  const last = parseDate(
    addDays(`${addMonths(target, 1)}-01`, -1),
  ).getUTCDate();
  return `${target}-${String(Math.min(Number(iso.slice(8)), last)).padStart(2, "0")}`;
}
function initialMonth(value: CalendarValue): string {
  const date =
    typeof value === "string"
      ? value
      : Array.isArray(value)
        ? value[0]
        : value?.start;
  return date?.slice(0, 7) ?? isoDate(new Date()).slice(0, 7);
}
function selected(
  value: CalendarValue,
  mode: NonNullable<CalendarProps["mode"]>,
  date: string,
): boolean {
  if (mode === "single") return value === date;
  if (mode === "multiple") return Array.isArray(value) && value.includes(date);
  if (!value || typeof value === "string" || Array.isArray(value)) return false;
  return date >= value.start && date <= (value.end ?? value.start);
}

export function Calendar({
  mode = "single",
  value,
  defaultValue,
  onChange,
  locale = "en-US",
  weekStartsOn,
  month,
  defaultMonth,
  onMonthChange,
  minDate,
  maxDate,
  isDateUnavailable,
  disabled = false,
  readOnly = false,
  label = "Calendar",
  className,
}: CalendarProps) {
  const [internalValue, setInternalValue] =
    useState<CalendarValue>(defaultValue);
  const currentValue = value === undefined ? internalValue : value;
  const [internalMonth, setInternalMonth] = useState(
    defaultMonth ?? initialMonth(value ?? defaultValue),
  );
  const currentMonth = month ?? internalMonth;
  const [focusedDate, setFocusedDate] = useState(`${currentMonth}-01`);
  const rootRef = useRef<HTMLDivElement>(null);
  const pendingFocusRef = useRef(false);
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const dayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    timeZone: "UTC",
  });
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
    timeZone: "UTC",
  });
  const localeInfo = new Intl.Locale(locale) as Intl.Locale & {
    getWeekInfo?: () => { firstDay: number };
  };
  const firstDay =
    weekStartsOn ?? (localeInfo.getWeekInfo?.().firstDay ?? 7) % 7;
  const first = `${currentMonth}-01`;
  const firstWeekday = (parseDate(first).getUTCDay() - firstDay + 7) % 7;
  const daysInMonth =
    parseDate(addMonths(currentMonth, 1) + "-01").getTime() -
    parseDate(first).getTime();
  const count = Math.round(daysInMonth / 86_400_000);
  const cells = Array.from(
    { length: Math.ceil((firstWeekday + count) / 7) * 7 },
    (_, index) => {
      const day = index - firstWeekday + 1;
      return day >= 1 && day <= count
        ? `${currentMonth}-${String(day).padStart(2, "0")}`
        : null;
    },
  );

  useEffect(() => {
    if (!pendingFocusRef.current) return;
    const button = rootRef.current?.querySelector<HTMLButtonElement>(
      `button[data-date="${focusedDate}"]`,
    );
    button?.focus();
    pendingFocusRef.current = false;
  }, [focusedDate, currentMonth]);

  function setMonth(next: string) {
    if (month === undefined) setInternalMonth(next);
    onMonthChange?.(next);
  }
  function unavailable(date: string) {
    return (
      disabled ||
      (minDate !== undefined && date < minDate) ||
      (maxDate !== undefined && date > maxDate) ||
      !!isDateUnavailable?.(date)
    );
  }
  const activeDate =
    focusedDate.slice(0, 7) === currentMonth && !unavailable(focusedDate)
      ? focusedDate
      : cells.find((date) => date && !unavailable(date));
  function choose(date: string) {
    if (unavailable(date) || readOnly) return;
    let next: CalendarValue;
    if (mode === "single") next = date;
    else if (mode === "multiple") {
      const dates = Array.isArray(currentValue) ? currentValue : [];
      next = dates.includes(date)
        ? dates.filter((item) => item !== date)
        : [...dates, date].sort();
    } else {
      const range =
        currentValue &&
        typeof currentValue === "object" &&
        !Array.isArray(currentValue)
          ? currentValue
          : undefined;
      next =
        range && !range.end && date >= range.start
          ? { start: range.start, end: date }
          : { start: date };
    }
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  }
  function onDayKeyDown(event: KeyboardEvent<HTMLButtonElement>, date: string) {
    let next: string | undefined;
    if (event.key === "ArrowRight") next = addDays(date, 1);
    if (event.key === "ArrowLeft") next = addDays(date, -1);
    if (event.key === "ArrowDown") next = addDays(date, 7);
    if (event.key === "ArrowUp") next = addDays(date, -7);
    if (event.key === "Home")
      next = addDays(date, -((parseDate(date).getUTCDay() - firstDay + 7) % 7));
    if (event.key === "End")
      next = addDays(
        date,
        6 - ((parseDate(date).getUTCDay() - firstDay + 7) % 7),
      );
    if (event.key === "PageDown") next = shiftMonthDate(date, 1);
    if (event.key === "PageUp") next = shiftMonthDate(date, -1);
    if (!next) return;
    event.preventDefault();
    const direction = ["ArrowLeft", "ArrowUp", "PageUp", "Home"].includes(
      event.key,
    )
      ? -1
      : 1;
    for (let attempt = 0; attempt < 366 && unavailable(next); attempt++)
      next = addDays(next, direction);
    if (unavailable(next)) return;
    pendingFocusRef.current = true;
    if (next.slice(0, 7) !== currentMonth) setMonth(next.slice(0, 7));
    setFocusedDate(next);
  }

  return (
    <div
      ref={rootRef}
      className={`ec-calendar${className ? ` ${className}` : ""}`}
    >
      <div className="ec-calendar__header">
        <button
          type="button"
          aria-label="Previous month"
          disabled={disabled}
          onClick={() => setMonth(addMonths(currentMonth, -1))}
        >
          ‹
        </button>
        <span aria-live="polite">{formatter.format(parseDate(first))}</span>
        <button
          type="button"
          aria-label="Next month"
          disabled={disabled}
          onClick={() => setMonth(addMonths(currentMonth, 1))}
        >
          ›
        </button>
      </div>
      <div className="ec-calendar__weekdays" aria-hidden="true">
        {Array.from({ length: 7 }, (_, index) => (
          <span className="ec-calendar__weekday" key={index}>
            {dayFormatter.format(
              parseDate(addDays("2026-11-01", (firstDay + index) % 7)),
            )}
          </span>
        ))}
      </div>
      <div role="grid" aria-label={label} className="ec-calendar__grid">
        {Array.from({ length: cells.length / 7 }, (_, rowIndex) => (
          <div role="row" className="ec-calendar__row" key={rowIndex}>
            {cells.slice(rowIndex * 7, rowIndex * 7 + 7).map((date, index) => (
              <span
                role="gridcell"
                key={index}
                className="ec-calendar__cell"
                aria-selected={
                  date ? selected(currentValue, mode, date) : undefined
                }
              >
                {date && (
                  <button
                    type="button"
                    data-date={date}
                    aria-label={dateFormatter.format(parseDate(date))}
                    aria-pressed={selected(currentValue, mode, date)}
                    disabled={unavailable(date)}
                    tabIndex={date === activeDate ? 0 : -1}
                    onFocus={() => setFocusedDate(date)}
                    onClick={() => choose(date)}
                    onKeyDown={(event) => onDayKeyDown(event, date)}
                  >
                    {Number(date.slice(8))}
                  </button>
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
