// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { AnchorHTMLAttributes } from "react";

export interface DownloadTriggerProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "download"
> {
  href: string;
  filename?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const DownloadTrigger = forwardRef<
  HTMLAnchorElement,
  DownloadTriggerProps
>(function DownloadTrigger(
  {
    href,
    filename,
    disabled = false,
    loading = false,
    className,
    children,
    onClick,
    onKeyDown,
    tabIndex,
    ...rest
  },
  ref,
) {
  const locked = disabled || loading;
  return (
    <a
      {...rest}
      ref={ref}
      href={locked ? undefined : href}
      download={locked ? undefined : (filename ?? "")}
      aria-disabled={locked || undefined}
      aria-busy={loading || undefined}
      tabIndex={locked ? -1 : tabIndex}
      className={`ec-download-trigger${className ? ` ${className}` : ""}`}
      onClick={(event) => {
        if (locked) event.preventDefault();
        else onClick?.(event);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && event.key === " " && !locked) {
          event.preventDefault();
          event.currentTarget.click();
        }
      }}
    >
      {loading && (
        <span className="ec-download-trigger__spinner" aria-hidden="true" />
      )}
      {children}
    </a>
  );
});
