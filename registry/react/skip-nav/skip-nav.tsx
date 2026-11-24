// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

const defaultTarget = "ec-skip-nav-content";

export interface SkipNavLinkProps extends Omit<
  ComponentPropsWithoutRef<"a">,
  "href"
> {
  targetId?: string;
}

export type SkipNavContentProps = ComponentPropsWithoutRef<"div">;

export const SkipNavLink = forwardRef<HTMLAnchorElement, SkipNavLinkProps>(
  function SkipNavLink(
    {
      targetId = defaultTarget,
      children = "Skip to content",
      className,
      ...props
    },
    ref,
  ) {
    return (
      <a
        {...props}
        ref={ref}
        href={`#${encodeURIComponent(targetId)}`}
        className={
          className ? `ec-skip-nav-link ${className}` : "ec-skip-nav-link"
        }
      >
        {children}
      </a>
    );
  },
);

export const SkipNavContent = forwardRef<HTMLDivElement, SkipNavContentProps>(
  function SkipNavContent(
    { id = defaultTarget, tabIndex = -1, ...props },
    ref,
  ) {
    return <div {...props} ref={ref} id={id} tabIndex={tabIndex} />;
  },
);
