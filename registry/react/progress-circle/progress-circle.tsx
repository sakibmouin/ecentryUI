// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
export interface ProgressCircleProps extends Omit<
  ComponentPropsWithRef<"div">,
  "children"
> {
  value?: number;
  max?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
}
export const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(
  function ProgressCircle(
    { value, max = 100, label = "Progress", size = "md", className, ...rest },
    ref,
  ) {
    const total = Number.isFinite(max) && max > 0 ? max : 100;
    const current =
      value === undefined || !Number.isFinite(value)
        ? undefined
        : Math.min(total, Math.max(0, value));
    const percentage = current === undefined ? undefined : current / total;
    const circumference = 2 * Math.PI * 20;
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
        className={`ec-progress-circle${className ? ` ${className}` : ""}`}
      >
        <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <circle
            className="ec-progress-circle__track"
            cx="24"
            cy="24"
            r="20"
          />
          <circle
            className="ec-progress-circle__fill"
            cx="24"
            cy="24"
            r="20"
            strokeDasharray={circumference}
            strokeDashoffset={
              percentage === undefined
                ? circumference * 0.7
                : circumference * (1 - percentage)
            }
          />
        </svg>
      </div>
    );
  },
);
