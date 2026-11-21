// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
export interface SkeletonProps extends ComponentPropsWithRef<"div"> {
  loading?: boolean;
  label?: string;
  circle?: boolean;
  width?: number | string;
  height?: number | string;
}
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    {
      loading = true,
      label,
      circle = false,
      width,
      height,
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        {...rest}
        ref={ref}
        className={`ec-skeleton${className ? ` ${className}` : ""}`}
        data-loading={loading}
        data-circle={circle}
        role={loading && label ? "status" : undefined}
        aria-label={loading ? label : undefined}
        aria-hidden={loading && !label ? true : undefined}
        style={{
          ...style,
          width: loading ? width : style?.width,
          height: loading ? height : style?.height,
        }}
      >
        {loading ? (
          <span className="ec-skeleton__shape" aria-hidden="true" />
        ) : (
          children
        )}
      </div>
    );
  },
);
