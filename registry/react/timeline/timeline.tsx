// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface TimelineItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  time?: { dateTime: string; label: ReactNode };
}

export interface TimelineProps extends Omit<
  ComponentPropsWithoutRef<"ol">,
  "children"
> {
  items: readonly TimelineItem[];
  currentId?: string;
}

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
  function Timeline({ items, currentId, className, ...props }, ref) {
    return (
      <ol
        role="list"
        {...props}
        ref={ref}
        className={className ? `ec-timeline ${className}` : "ec-timeline"}
      >
        {items.map(({ id, title, description, time }) => (
          <li
            key={id}
            className="ec-timeline__item"
            aria-current={id === currentId ? "true" : undefined}
          >
            <div className="ec-timeline__title">{title}</div>
            {time && (
              <time className="ec-timeline__time" dateTime={time.dateTime}>
                {time.label}
              </time>
            )}
            {description != null && (
              <div className="ec-timeline__description">{description}</div>
            )}
          </li>
        ))}
      </ol>
    );
  },
);
