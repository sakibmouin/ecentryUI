// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, PointerEvent } from "react";

export interface NumberInputProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "type" | "value" | "defaultValue" | "onChange" | "step" | "min" | "max"
> {
  label: string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberInput({
  label,
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  step = 1,
  disabled = false,
  readOnly = false,
  className,
  id,
  ...rest
}: NumberInputProps) {
  const generated = useId();
  const inputId = id ?? generated;
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{ x: number; value: number } | null>(null);
  const [internal, setInternal] = useState(
    defaultValue === undefined ? "" : String(defaultValue),
  );
  const text = value === undefined ? internal : String(value);
  const numeric = text === "" ? undefined : Number(text);
  const bounded = (next: number) =>
    Math.min(max ?? Infinity, Math.max(min ?? -Infinity, next));

  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;
    const reset = () => {
      if (value === undefined)
        setInternal(defaultValue === undefined ? "" : String(defaultValue));
      onValueChange?.(defaultValue);
    };
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [value, defaultValue, onValueChange]);

  function update(next: number | undefined) {
    if (value === undefined)
      setInternal(next === undefined ? "" : String(next));
    onValueChange?.(next);
  }
  function increment(direction: number) {
    if (disabled || readOnly) return;
    const base = numeric ?? (direction > 0 ? (min ?? 0) : (max ?? 0));
    const next = bounded(Number((base + direction * step).toFixed(10)));
    update(next);
    inputRef.current?.focus();
  }
  function beginDrag(event: PointerEvent<HTMLButtonElement>) {
    if (disabled || readOnly) return;
    dragRef.current = { x: event.clientX, value: numeric ?? 0 };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }
  function moveDrag(event: PointerEvent<HTMLButtonElement>) {
    if (!dragRef.current) return;
    const count = Math.round((event.clientX - dragRef.current.x) / 16);
    update(bounded(Number((dragRef.current.value + count * step).toFixed(10))));
  }
  return (
    <div className={`ec-number-input${className ? ` ${className}` : ""}`}>
      <label htmlFor={inputId}>{label}</label>
      <div className="ec-number-input__controls">
        <button
          type="button"
          className="ec-number-input__scrub"
          role="slider"
          aria-label={`Scrub ${label}`}
          aria-valuemin={min ?? Number.MIN_SAFE_INTEGER}
          aria-valuemax={max ?? Number.MAX_SAFE_INTEGER}
          aria-valuenow={numeric ?? 0}
          disabled={disabled || readOnly}
          onPointerDown={beginDrag}
          onPointerMove={moveDrag}
          onPointerUp={() => {
            dragRef.current = null;
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowUp") {
              event.preventDefault();
              increment(1);
            }
            if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
              event.preventDefault();
              increment(-1);
            }
          }}
        >
          ↔
        </button>
        <input
          {...rest}
          ref={inputRef}
          id={inputId}
          type="number"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          readOnly={readOnly}
          value={text}
          onChange={(event) => {
            const next = event.target.value;
            if (value === undefined) setInternal(next);
            onValueChange?.(next === "" ? undefined : Number(next));
          }}
        />
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={
            disabled ||
            readOnly ||
            (min !== undefined && numeric !== undefined && numeric <= min)
          }
          onClick={() => increment(-1)}
        >
          −
        </button>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={
            disabled ||
            readOnly ||
            (max !== undefined && numeric !== undefined && numeric >= max)
          }
          onClick={() => increment(1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
