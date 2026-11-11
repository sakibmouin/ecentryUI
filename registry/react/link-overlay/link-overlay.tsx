// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithRef, HTMLAttributes } from "react";

export type LinkBoxProps = HTMLAttributes<HTMLDivElement>;
export type LinkOverlayProps = ComponentPropsWithRef<"a">;

export const LinkBox = forwardRef<HTMLDivElement, LinkBoxProps>(
  function LinkBox({ className, ...rest }, ref) {
    return (
      <div
        {...rest}
        ref={ref}
        className={`ec-link-box${className ? ` ${className}` : ""}`}
      />
    );
  },
);

export const LinkOverlay = forwardRef<HTMLAnchorElement, LinkOverlayProps>(
  function LinkOverlay({ className, ...rest }, ref) {
    return (
      <a
        {...rest}
        ref={ref}
        className={`ec-link-overlay${className ? ` ${className}` : ""}`}
      />
    );
  },
);
