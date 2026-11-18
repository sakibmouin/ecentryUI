// SPDX-License-Identifier: MIT
import type { ComponentPropsWithRef, ReactNode } from "react";

export interface DataListItem {
  label: ReactNode;
  value: ReactNode;
}

export interface DataListProps extends ComponentPropsWithRef<"dl"> {
  items: DataListItem[];
  orientation?: "vertical" | "horizontal";
  loading?: boolean;
  emptyMessage?: string;
}

export function DataList({
  items,
  orientation = "vertical",
  loading = false,
  emptyMessage = "No details available",
  className,
  ...rest
}: DataListProps) {
  return (
    <div className="ec-data-list-wrap">
      <dl
        {...rest}
        className={`ec-data-list${className ? ` ${className}` : ""}`}
        data-orientation={orientation}
        aria-busy={loading || undefined}
      >
        {items.map((item, index) => (
          <div className="ec-data-list__row" key={index}>
            <dt className="ec-data-list__term">{item.label}</dt>
            <dd className="ec-data-list__value">{item.value}</dd>
          </div>
        ))}
      </dl>
      {items.length === 0 && (
        <p className="ec-data-list__status" role="status">
          {loading ? "Loading details" : emptyMessage}
        </p>
      )}
    </div>
  );
}
