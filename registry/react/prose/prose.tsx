// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

export type ProseProps = HTMLAttributes<HTMLElement>;

export const Prose = forwardRef<HTMLElement, ProseProps>(function Prose(
  { className, ...rest },
  ref,
) {
  return (
    <article
      {...rest}
      ref={ref}
      className={`ec-prose${className ? ` ${className}` : ""}`}
    />
  );
});
