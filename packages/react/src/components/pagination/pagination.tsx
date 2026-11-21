// SPDX-License-Identifier: MIT
import { forwardRef, useState } from "react";
import type { ComponentPropsWithRef } from "react";

export interface PaginationProps extends Omit<
  ComponentPropsWithRef<"nav">,
  "onChange"
> {
  count: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    {
      count,
      page,
      defaultPage = 1,
      onPageChange,
      siblingCount = 1,
      className,
      "aria-label": label = "Pagination",
      ...rest
    },
    ref,
  ) {
    const total = Math.max(1, Math.floor(Number.isFinite(count) ? count : 1));
    const clamp = (value: number) =>
      Math.min(
        total,
        Math.max(1, Math.floor(Number.isFinite(value) ? value : 1)),
      );
    const [internalPage, setInternalPage] = useState(() => clamp(defaultPage));
    const current = clamp(page ?? internalPage);
    const siblings = Math.max(
      0,
      Math.floor(Number.isFinite(siblingCount) ? siblingCount : 1),
    );
    const visible = new Set([1, total]);
    for (
      let number = Math.max(1, current - siblings);
      number <= Math.min(total, current + siblings);
      number++
    )
      visible.add(number);
    const pages = [...visible].sort((a, b) => a - b);
    const items: Array<number | string> = [];
    pages.forEach((number, index) => {
      const previous = pages[index - 1];
      if (previous !== undefined && number - previous > 1) {
        if (number - previous === 2) items.push(previous + 1);
        else items.push(`gap-${previous}`);
      }
      items.push(number);
    });
    function change(next: number) {
      const target = clamp(next);
      if (target === current) return;
      if (page === undefined) setInternalPage(target);
      onPageChange?.(target);
    }
    return (
      <nav
        {...rest}
        ref={ref}
        aria-label={label}
        className={`ec-pagination${className ? ` ${className}` : ""}`}
      >
        <button
          type="button"
          className="ec-pagination__control"
          disabled={current === 1}
          onClick={() => change(current - 1)}
          aria-label="Previous page"
        >
          Previous
        </button>
        {items.map((item) =>
          typeof item === "number" ? (
            <button
              key={item}
              type="button"
              className="ec-pagination__page"
              aria-label={`Page ${item}`}
              aria-current={item === current ? "page" : undefined}
              onClick={() => change(item)}
            >
              {item}
            </button>
          ) : (
            <span key={item} className="ec-pagination__gap" aria-hidden="true">
              …
            </span>
          ),
        )}
        <button
          type="button"
          className="ec-pagination__control"
          disabled={current === total}
          onClick={() => change(current + 1)}
          aria-label="Next page"
        >
          Next
        </button>
      </nav>
    );
  },
);
