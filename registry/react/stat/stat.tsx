// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
export interface StatProps extends Omit<
  ComponentPropsWithRef<"dl">,
  "children"
> {
  label: ReactNode;
  value: ReactNode;
  helpText?: ReactNode;
  trend?: ReactNode;
  trendTone?: "positive" | "negative" | "neutral";
  loading?: boolean;
}
export const Stat = forwardRef<HTMLDListElement, StatProps>(function Stat(
  {
    label,
    value,
    helpText,
    trend,
    trendTone = "neutral",
    loading = false,
    className,
    ...rest
  },
  ref,
) {
  return (
    <dl
      {...rest}
      ref={ref}
      aria-busy={loading || undefined}
      className={`ec-stat${className ? ` ${className}` : ""}`}
    >
      <dt className="ec-stat__label">{label}</dt>
      <dd className="ec-stat__value">{value}</dd>
      {(trend !== undefined || helpText !== undefined) && (
        <dd className="ec-stat__context">
          {trend !== undefined && (
            <span className="ec-stat__trend" data-tone={trendTone}>
              {trend}
            </span>
          )}
          {helpText !== undefined && (
            <span className="ec-stat__help">{helpText}</span>
          )}
        </dd>
      )}
    </dl>
  );
});
