// SPDX-License-Identifier: MIT
import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithRef } from "react";

export interface ClipboardProps extends Omit<
  ComponentPropsWithRef<"div">,
  "onCopy"
> {
  value: string;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  onCopy?: (value: string) => void;
  onError?: (error: unknown) => void;
}

export function Clipboard({
  value,
  label = "Copy",
  disabled = false,
  loading = false,
  onCopy,
  onError,
  className,
  ...rest
}: ClipboardProps) {
  const [status, setStatus] = useState<
    "idle" | "copying" | "success" | "error"
  >("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    setStatus("copying");
    clearTimeout(timer.current);
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(value);
      setStatus("success");
      onCopy?.(value);
    } catch (error) {
      setStatus("error");
      onError?.(error);
    }
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <div
      {...rest}
      role="group"
      aria-label={rest["aria-label"] ?? "Clipboard"}
      aria-busy={loading || status === "copying" || undefined}
      className={`ec-clipboard${className ? ` ${className}` : ""}`}
    >
      <span className="ec-clipboard__value">{value}</span>
      <button
        type="button"
        className="ec-clipboard__button"
        disabled={disabled || loading || status === "copying"}
        onClick={copy}
      >
        {label}
      </button>
      <span className="ec-clipboard__status" role="status" aria-live="polite">
        {status === "success"
          ? "Copied"
          : status === "error"
            ? "Copy failed"
            : ""}
      </span>
    </div>
  );
}
