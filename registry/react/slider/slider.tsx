// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

export type SliderValue = number | [number, number];

export interface SliderProps {
  label: string;
  name?: string;
  value?: SliderValue;
  defaultValue?: SliderValue;
  onValueChange?: (value: SliderValue) => void;
  min?: number;
  max?: number;
  step?: number;
  range?: boolean;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  form?: string;
}

export function Slider({
  label,
  name,
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  range = false,
  orientation = "horizontal",
  dir,
  disabled = false,
  readOnly = false,
  className,
  form,
}: SliderProps) {
  const id = useId();
  const upper = Math.max(min, max);
  const increment = step > 0 ? step : 1;
  const initial =
    defaultValue ?? (range ? ([min, upper] as [number, number]) : min);
  const [internal, setInternal] = useState<SliderValue>(initial);
  const current = value ?? internal;
  const isRange = range || Array.isArray(current);
  const values: [number, number] = Array.isArray(current)
    ? current
    : [current, current];
  const trackRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragRef = useRef<{ thumb: 0 | 1; start: SliderValue } | null>(null);
  const locked = disabled || readOnly;
  const percent = (n: number) =>
    upper === min ? 0 : ((n - min) / (upper - min)) * 100;
  const direction = (element: Element) =>
    dir ??
    element.closest("[dir]")?.getAttribute("dir") ??
    document.documentElement.dir ??
    "ltr";

  useEffect(() => {
    const owner = hiddenRef.current?.form;
    if (!owner) return;
    const reset = () => {
      if (value === undefined) setInternal(initial);
      onValueChange?.(initial);
    };
    owner.addEventListener("reset", reset);
    return () => owner.removeEventListener("reset", reset);
  }, [initial, onValueChange, value]);

  function normalize(n: number) {
    const rounded = min + Math.round((n - min) / increment) * increment;
    return Math.min(upper, Math.max(min, Number(rounded.toFixed(10))));
  }
  function update(n: number, thumb: 0 | 1) {
    if (locked) return;
    const next = normalize(n);
    const result: SliderValue = isRange
      ? thumb === 0
        ? [Math.min(next, values[1]), values[1]]
        : [values[0], Math.max(next, values[0])]
      : next;
    if (value === undefined) setInternal(result);
    onValueChange?.(result);
  }
  function position(event: PointerEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    if (orientation === "vertical")
      return (
        upper - ((event.clientY - box.top) / (box.height || 1)) * (upper - min)
      );
    const fraction = (event.clientX - box.left) / (box.width || 1);
    return (
      min +
      (direction(event.currentTarget) === "rtl" ? 1 - fraction : fraction) *
        (upper - min)
    );
  }
  function key(event: KeyboardEvent<HTMLDivElement>, thumb: 0 | 1) {
    if (locked) return;
    const rtl = direction(event.currentTarget) === "rtl";
    const delta =
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
    if (delta) {
      event.preventDefault();
      update(values[thumb] + delta * increment, thumb);
    }
    if (event.key === "Home") {
      event.preventDefault();
      update(min, thumb);
    }
    if (event.key === "End") {
      event.preventDefault();
      update(upper, thumb);
    }
    if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      update(
        values[thumb] + (event.key === "PageUp" ? 10 : -10) * increment,
        thumb,
      );
    }
    if (event.key === "Escape" && dragRef.current) {
      event.preventDefault();
      if (value === undefined) setInternal(dragRef.current.start);
      onValueChange?.(dragRef.current.start);
      dragRef.current = null;
    }
  }
  const thumbCount = isRange ? 2 : 1;
  return (
    <div
      className={`ec-slider ec-slider--${orientation}${className ? ` ${className}` : ""}`}
      dir={dir}
    >
      <span id={`${id}-label`} className="ec-slider__label">
        {label}
      </span>
      <div
        ref={trackRef}
        className="ec-slider__track"
        onPointerDown={(event) => {
          if (locked) return;
          const target = position(event);
          const thumb =
            isRange &&
            Math.abs(target - values[0]) > Math.abs(target - values[1])
              ? 1
              : 0;
          dragRef.current = { thumb, start: current };
          event.currentTarget.setPointerCapture?.(event.pointerId);
          thumbRefs.current[thumb]?.focus();
          update(target, thumb);
        }}
        onPointerMove={(event) => {
          if (dragRef.current) update(position(event), dragRef.current.thumb);
        }}
        onPointerUp={() => {
          dragRef.current = null;
        }}
        onPointerCancel={() => {
          if (dragRef.current) {
            if (value === undefined) setInternal(dragRef.current.start);
            onValueChange?.(dragRef.current.start);
            dragRef.current = null;
          }
        }}
      >
        <span
          className="ec-slider__fill"
          style={
            orientation === "vertical"
              ? {
                  bottom: `${isRange ? percent(values[0]) : 0}%`,
                  height: `${isRange ? percent(values[1]) - percent(values[0]) : percent(values[0])}%`,
                }
              : {
                  insetInlineStart: `${isRange ? percent(values[0]) : 0}%`,
                  width: `${isRange ? percent(values[1]) - percent(values[0]) : percent(values[0])}%`,
                }
          }
        />
        {Array.from({ length: thumbCount }, (_, index) => (
          <div
            key={index}
            ref={(node) => {
              thumbRefs.current[index] = node;
            }}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            className="ec-slider__thumb"
            aria-label={
              isRange ? `${label} ${index === 0 ? "start" : "end"}` : label
            }
            aria-valuemin={isRange && index === 1 ? values[0] : min}
            aria-valuemax={isRange && index === 0 ? values[1] : upper}
            aria-valuenow={values[index] ?? min}
            aria-orientation={orientation}
            aria-disabled={disabled || undefined}
            aria-readonly={readOnly || undefined}
            onKeyDown={(event) => key(event, index as 0 | 1)}
            style={
              orientation === "vertical"
                ? { bottom: `${percent(values[index] ?? min)}%` }
                : { insetInlineStart: `${percent(values[index] ?? min)}%` }
            }
          />
        ))}
      </div>
      <input
        ref={hiddenRef}
        type="hidden"
        name={name}
        value={values[0]}
        form={form}
        disabled={disabled}
        readOnly
      />
      {isRange && (
        <input
          type="hidden"
          name={name}
          value={values[1]}
          form={form}
          disabled={disabled}
          readOnly
        />
      )}
    </div>
  );
}
