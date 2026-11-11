// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";

export interface ColorPickerProps {
  label: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  swatches?: string[];
  description?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
}

const defaultColor = "#116E5EFF";
function normalize(value: string): string | undefined {
  if (!/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(value)) return undefined;
  return value.toUpperCase().padEnd(9, "F");
}
function channel(value: number): string {
  return Math.min(255, Math.max(0, Math.round(value)))
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
}

export function ColorPicker({
  label,
  name,
  value,
  defaultValue = defaultColor,
  onChange,
  swatches = ["#116E5E", "#C43843", "#156578", "#75439A"],
  description,
  disabled = false,
  readOnly = false,
  className,
}: ColorPickerProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(
    normalize(defaultValue) ?? defaultColor,
  );
  const current = normalize(value ?? internalValue) ?? defaultColor;
  const [draft, setDraft] = useState(current);
  useEffect(() => setDraft(current), [current]);
  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form) return;
    const reset = () => {
      if (value === undefined)
        setInternalValue(normalize(defaultValue) ?? defaultColor);
    };
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [value, defaultValue]);
  function change(next: string) {
    const normalized = normalize(next);
    if (!normalized || disabled || readOnly) return;
    if (value === undefined) setInternalValue(normalized);
    onChange?.(normalized);
  }
  const rgb = [1, 3, 5].map((start) =>
    parseInt(current.slice(start, start + 2), 16),
  );
  const alpha = parseInt(current.slice(7, 9), 16);
  const locked = disabled || readOnly;
  return (
    <div
      ref={rootRef}
      className={`ec-color-picker${className ? ` ${className}` : ""}`}
    >
      <span className="ec-color-picker__label" id={`${id}-label`}>
        {label}
      </span>
      {description && (
        <span className="ec-color-picker__description" id={`${id}-description`}>
          {description}
        </span>
      )}
      <div className="ec-color-picker__top">
        <span
          className="ec-color-picker__preview"
          role="img"
          aria-label={`Selected color ${current}`}
        >
          <span
            className="ec-color-picker__preview-color"
            style={{ backgroundColor: current }}
          />
        </span>
        <input
          type="color"
          aria-label={`${label} color wheel`}
          value={current.slice(0, 7)}
          disabled={locked}
          onChange={(event) =>
            change(`${event.currentTarget.value}${current.slice(7)}`)
          }
        />
        <label className="ec-color-picker__hex">
          Hex{" "}
          <input
            type="text"
            aria-label={`${label} hex`}
            value={draft}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={!normalize(draft)}
            aria-describedby={description ? `${id}-description` : undefined}
            onChange={(event) => {
              const next = event.currentTarget.value;
              setDraft(next);
              if (normalize(next)) change(next);
            }}
            onBlur={() => {
              if (!normalize(draft)) setDraft(current);
            }}
          />
        </label>
      </div>
      <div className="ec-color-picker__channels">
        {(["Red", "Green", "Blue"] as const).map((channelName, index) => (
          <label key={channelName}>
            {channelName}
            <input
              type="number"
              min="0"
              max="255"
              step="1"
              value={rgb[index]}
              disabled={disabled}
              readOnly={readOnly}
              onChange={(event) => {
                const next = Number(event.currentTarget.value);
                if (!Number.isFinite(next)) return;
                const parts = [...rgb];
                parts[index] = next;
                change(`#${parts.map(channel).join("")}${current.slice(7)}`);
              }}
            />
          </label>
        ))}
      </div>
      <label className="ec-color-picker__alpha">
        Alpha{" "}
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round((alpha / 255) * 100)}
          disabled={locked}
          onChange={(event) =>
            change(
              `${current.slice(0, 7)}${channel((Number(event.currentTarget.value) / 100) * 255)}`,
            )
          }
        />
        <output>{Math.round((alpha / 255) * 100)}%</output>
      </label>
      <div
        className="ec-color-picker__swatches"
        role="group"
        aria-label={`${label} swatches`}
      >
        {swatches.map((swatch) => {
          const normalized = normalize(swatch);
          if (!normalized) return null;
          return (
            <button
              key={normalized}
              type="button"
              aria-label={`Select ${normalized}`}
              aria-pressed={current === normalized}
              disabled={locked}
              style={{ backgroundColor: normalized }}
              onClick={() => change(normalized)}
            />
          );
        })}
      </div>
      {name && <input type="hidden" name={name} value={current} />}
    </div>
  );
}
