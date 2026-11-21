// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
export interface ProgressProps extends Omit<
  ComponentPropsWithRef<"div">,
  "children"
> {
  value?: number;
  max?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
}
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    { value, max = 100, label = "Progress", size = "md", className, ...rest },
    ref,
  ) {
    const total = Number.isFinite(max) && max > 0 ? max : 100;
    const current =
      value === undefined || !Number.isFinite(value)
        ? undefined
        : Math.min(total, Math.max(0, value));
    const percentage =
      current === undefined ? undefined : (current / total) * 100;
    return (
      <div
        {...rest}
        ref={ref}
        role="progressbar"
        aria-label={label}
        aria-valuemin={current === undefined ? undefined : 0}
        aria-valuemax={current === undefined ? undefined : total}
        aria-valuenow={current}
        data-size={size}
        data-indeterminate={current === undefined}
        className={`ec-progress${className ? ` ${className}` : ""}`}
      >
        <span
          className="ec-progress__fill"
          style={
            percentage === undefined ? undefined : { width: `${percentage}%` }
          }
        />
      </div>
    );
  },
);
