// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { ClipboardEvent, ChangeEvent, KeyboardEvent } from "react";

export interface PinInputProps {
  label: string;
  name?: string;
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  description?: string;
  error?: string;
  mask?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  className?: string;
  form?: string;
}

export function PinInput({
  label,
  name,
  length = 6,
  value,
  defaultValue = "",
  onValueChange,
  description,
  error,
  mask = false,
  disabled = false,
  readOnly = false,
  required = false,
  className,
  form,
}: PinInputProps) {
  const id = useId();
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const hidden = useRef<HTMLInputElement>(null);
  const [internal, setInternal] = useState(
    defaultValue.replace(/\D/g, "").slice(0, length),
  );
  const current = (value ?? internal).replace(/\D/g, "").slice(0, length);
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const describedBy =
    [description && descriptionId, error && errorId]
      .filter(Boolean)
      .join(" ") || undefined;

  useEffect(() => {
    const owner = hidden.current?.form;
    if (!owner) return;
    const reset = () => {
      const initial = defaultValue.replace(/\D/g, "").slice(0, length);
      if (value === undefined) setInternal(initial);
      onValueChange?.(initial);
    };
    owner.addEventListener("reset", reset);
    return () => owner.removeEventListener("reset", reset);
  }, [defaultValue, length, onValueChange, value]);

  function update(next: string) {
    const clean = next.replace(/\D/g, "").slice(0, length);
    if (value === undefined) setInternal(clean);
    onValueChange?.(clean);
  }
  function focus(index: number) {
    inputs.current[Math.max(0, Math.min(length - 1, index))]?.focus();
  }
  function change(index: number, event: ChangeEvent<HTMLInputElement>) {
    const incoming = event.target.value.replace(/\D/g, "");
    if (disabled || readOnly) return;
    if (!incoming) {
      const digits = current.padEnd(length, " ").split("");
      digits[index] = " ";
      update(digits.join("").trimEnd());
      return;
    }
    const digits = current.padEnd(length, " ").split("");
    for (
      let offset = 0;
      offset < incoming.length && index + offset < length;
      offset++
    )
      digits[index + offset] = incoming[offset] ?? "";
    update(digits.join("").trimEnd());
    focus(index + incoming.length);
  }
  function paste(index: number, event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    if (disabled || readOnly) return;
    const incoming = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!incoming) return;
    const digits = current.padEnd(length, " ").split("");
    for (
      let offset = 0;
      offset < incoming.length && index + offset < length;
      offset++
    )
      digits[index + offset] = incoming[offset] ?? "";
    update(digits.join("").trimEnd());
    focus(index + incoming.length);
  }
  function key(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focus(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focus(index + 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      focus(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      focus(length - 1);
    }
    if ((event.key === "Backspace" || event.key === "Delete") && !readOnly) {
      event.preventDefault();
      const target =
        event.key === "Delete" || current[index]
          ? index
          : Math.max(0, index - 1);
      const digits = current.padEnd(length, " ").split("");
      digits[target] = " ";
      update(digits.join("").trimEnd());
      focus(target);
    }
  }
  return (
    <div className={`ec-pin-input${className ? ` ${className}` : ""}`}>
      <div className="ec-pin-input__label" id={`${id}-label`}>
        {label}
      </div>
      {description && (
        <p id={descriptionId} className="ec-pin-input__description">
          {description}
        </p>
      )}
      <div
        className="ec-pin-input__cells"
        role="group"
        aria-labelledby={`${id}-label`}
        aria-describedby={describedBy}
      >
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(node) => {
              inputs.current[index] = node;
            }}
            type={mask ? "password" : "text"}
            inputMode="numeric"
            pattern="[0-9]"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={length}
            value={current[index] ?? ""}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-label={`${label}, digit ${index + 1} of ${length}`}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => change(index, event)}
            onPaste={(event) => paste(index, event)}
            onKeyDown={(event) => key(index, event)}
          />
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
      {error && (
        <p id={errorId} className="ec-pin-input__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
