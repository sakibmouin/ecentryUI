// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

export type MarkProps = HTMLAttributes<HTMLElement>;

export const Mark = forwardRef<HTMLElement, MarkProps>(function Mark(
  { className, ...rest },
  ref,
) {
  return (
    <mark
      {...rest}
      ref={ref}
      className={`ec-mark${className ? ` ${className}` : ""}`}
    />
  );
});
