// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbProps extends ComponentPropsWithRef<"nav"> {
  items: readonly BreadcrumbItem[];
  separator?: ReactNode;
  loading?: boolean;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    {
      items,
      separator = "/",
      loading = false,
      className,
      "aria-label": ariaLabel = "Breadcrumb",
      ...rest
    },
    ref,
  ) {
    return (
      <nav
        {...rest}
        ref={ref}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        className={`ec-breadcrumb${className ? ` ${className}` : ""}`}
      >
        <ol className="ec-breadcrumb__list">
          {items.map((item, index) => {
            const current = index === items.length - 1;
            return (
              <li className="ec-breadcrumb__item" key={index}>
                {index > 0 && (
                  <span className="ec-breadcrumb__separator" aria-hidden="true">
                    {separator}
                  </span>
                )}
                {current ? (
                  <span className="ec-breadcrumb__current" aria-current="page">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <a className="ec-breadcrumb__link" href={item.href}>
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);
