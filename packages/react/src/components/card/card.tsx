// SPDX-License-Identifier: MIT
import { forwardRef, useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";

export interface CardProps extends Omit<
  ComponentPropsWithRef<"article">,
  "title"
> {
  heading?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  variant?: "outline" | "elevated";
  loading?: boolean;
}

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  {
    heading,
    description,
    footer,
    variant = "outline",
    loading = false,
    className,
    children,
    "aria-labelledby": labelledBy,
    ...rest
  },
  ref,
) {
  const headingId = useId();
  return (
    <article
      {...rest}
      ref={ref}
      className={`ec-card ec-card--${variant}${className ? ` ${className}` : ""}`}
      aria-labelledby={labelledBy ?? (heading ? headingId : undefined)}
      aria-busy={loading || undefined}
    >
      {(heading || description) && (
        <header className="ec-card__header">
          {heading && (
            <h3 className="ec-card__heading" id={headingId}>
              {heading}
            </h3>
          )}
          {description && <p className="ec-card__description">{description}</p>}
        </header>
      )}
      {children != null && <div className="ec-card__body">{children}</div>}
      {footer != null && <footer className="ec-card__footer">{footer}</footer>}
    </article>
  );
});
