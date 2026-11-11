// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";

export interface LinkProps extends ComponentPropsWithRef<"a"> {
  external?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { external = false, target, rel, className, children, ...rest },
  ref,
) {
  const resolvedTarget = target ?? (external ? "_blank" : undefined);
  const resolvedRel =
    resolvedTarget === "_blank"
      ? Array.from(
          new Set([
            ...(rel?.split(/\s+/).filter(Boolean) ?? []),
            "noopener",
            "noreferrer",
          ]),
        ).join(" ")
      : rel;
  return (
    <a
      {...rest}
      ref={ref}
      target={resolvedTarget}
      rel={resolvedRel}
      className={`ec-link${className ? ` ${className}` : ""}`}
    >
      {children}
      {external ? (
        <span aria-hidden="true" className="ec-link__external">
          ↗
        </span>
      ) : null}
    </a>
  );
});
