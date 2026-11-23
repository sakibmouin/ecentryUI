// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface TableProps extends Omit<
  ComponentPropsWithoutRef<"table">,
  "caption"
> {
  caption?: ReactNode;
  scrollLabel?: string;
  density?: "regular" | "compact";
  striped?: boolean;
  loading?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  {
    caption,
    scrollLabel,
    density = "regular",
    striped = false,
    loading = false,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <div
      className="ec-table-scroll"
      role={scrollLabel ? "region" : undefined}
      aria-label={scrollLabel}
      tabIndex={scrollLabel ? 0 : undefined}
    >
      <table
        {...props}
        ref={ref}
        className={className ? `ec-table ${className}` : "ec-table"}
        aria-busy={loading || props["aria-busy"]}
        data-density={density}
        data-striped={striped ? "" : undefined}
      >
        {caption != null && <caption>{caption}</caption>}
        {children}
      </table>
    </div>
  );
});
