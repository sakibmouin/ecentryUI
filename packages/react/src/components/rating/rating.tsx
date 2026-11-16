// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

export interface RatingProps {
  label: string;
  name?: string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  max?: number;
  step?: number;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  form?: string;
}

export function Rating({
  label,
  name,
  value,
  defaultValue = 0,
  onValueChange,
  max = 5,
  step = 0.5,
  disabled = false,
  readOnly = false,
  className,
  form,
}: RatingProps) {
  const id = useId();
  const hidden = useRef<HTMLInputElement>(null);
  const dragging = useRef(false);
  const [internal, setInternal] = useState(defaultValue);
  const limit = Math.max(1, Math.floor(max));
  const increment = step > 0 ? step : 0.5;
  const current = Math.min(limit, Math.max(0, value ?? internal));
  const locked = disabled || readOnly;

  useEffect(() => {
    const owner = hidden.current?.form;
    if (!owner) return;
    const reset = () => {
      if (value === undefined) setInternal(defaultValue);
      onValueChange?.(defaultValue);
    };
    owner.addEventListener("reset", reset);
    return () => owner.removeEventListener("reset", reset);
  }, [defaultValue, onValueChange, value]);

  function update(next: number) {
    if (locked) return;
    const rounded = Math.min(
      limit,
      Math.max(0, Math.round(next / increment) * increment),
    );
    if (value === undefined) setInternal(rounded);
    onValueChange?.(rounded);
  }
  function pointerValue(event: PointerEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    if (!box.width) return current;
    const fraction = Math.min(
      1,
      Math.max(0, (event.clientX - box.left) / box.width),
    );
    return (
      (getComputedStyle(event.currentTarget).direction === "rtl"
        ? 1 - fraction
        : fraction) * limit
    );
  }
  function key(event: KeyboardEvent<HTMLDivElement>) {
    if (locked) return;
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    const direction =
      event.key === "ArrowRight"
        ? rtl
          ? -1
          : 1
        : event.key === "ArrowLeft"
          ? rtl
            ? 1
            : -1
          : event.key === "ArrowUp"
            ? 1
            : event.key === "ArrowDown"
              ? -1
              : 0;
    if (direction) {
      event.preventDefault();
      update(current + direction * increment);
    }
    if (event.key === "Home") {
      event.preventDefault();
      update(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      update(limit);
    }
  }
  return (
    <div className={`ec-rating${className ? ` ${className}` : ""}`}>
      <span className="ec-rating__label" id={`${id}-label`}>
        {label}
      </span>
      <div
        className="ec-rating__stars"
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-labelledby={`${id}-label`}
        aria-valuemin={0}
        aria-valuemax={limit}
        aria-valuenow={current}
        aria-valuetext={`${current} out of ${limit} stars`}
        aria-disabled={disabled || undefined}
        aria-readonly={readOnly || undefined}
        onKeyDown={key}
        onPointerDown={(event) => {
          if (locked) return;
          dragging.current = true;
          event.currentTarget.setPointerCapture?.(event.pointerId);
          update(pointerValue(event));
        }}
        onPointerMove={(event) => {
          if (dragging.current) update(pointerValue(event));
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        {Array.from({ length: limit }, (_, index) => (
          <span key={index} className="ec-rating__star" aria-hidden="true">
            <span>☆</span>
            <span
              className="ec-rating__fill"
              style={{
                width: `${Math.min(1, Math.max(0, current - index)) * 100}%`,
              }}
            >
              ★
            </span>
          </span>
        ))}
      </div>
      <input
        ref={hidden}
        type="hidden"
        name={name}
        value={current}
        form={form}
        disabled={disabled}
        readOnly
      />
    </div>
  );
}
