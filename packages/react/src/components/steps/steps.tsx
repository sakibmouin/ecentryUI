// SPDX-License-Identifier: MIT
import { forwardRef, useState } from "react";
import type { ComponentPropsWithoutRef, KeyboardEvent, ReactNode } from "react";

export interface StepItem {
  id: string;
  label: string;
  content?: ReactNode;
  disabled?: boolean;
}

export interface StepsProps extends Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
> {
  label: string;
  items: readonly StepItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  linear?: boolean;
  orientation?: "horizontal" | "vertical";
  previousLabel?: string;
  nextLabel?: string;
}

export const Steps = forwardRef<HTMLElement, StepsProps>(function Steps(
  {
    label,
    items,
    value,
    defaultValue,
    onValueChange,
    linear = true,
    orientation = "horizontal",
    previousLabel = "Previous",
    nextLabel = "Next",
    className,
    ...props
  },
  ref,
) {
  const [internal, setInternal] = useState(defaultValue);
  const enabled = items.filter((item) => !item.disabled);
  const selected = Math.max(
    0,
    enabled.findIndex((item) => item.id === (value ?? internal)),
  );
  const current = enabled[selected];
  const previous = enabled[selected - 1];
  const next = enabled[selected + 1];
  const available = linear ? enabled.slice(0, selected + 2) : enabled;

  function select(item: StepItem | undefined) {
    if (!item || item.id === current?.id) return;
    if (value === undefined) setInternal(item.id);
    onValueChange?.(item.id);
  }

  function navigate(event: KeyboardEvent<HTMLOListElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;
    const buttons = Array.from(
      event.currentTarget.querySelectorAll("button:enabled"),
    );
    const index = buttons.findIndex((button) => button === event.target);
    if (index < 0) return;
    const rtl =
      getComputedStyle(event.currentTarget).direction === "rtl" ||
      event.currentTarget.closest("[dir]")?.getAttribute("dir") === "rtl";
    const forward =
      orientation === "vertical"
        ? "ArrowDown"
        : rtl
          ? "ArrowLeft"
          : "ArrowRight";
    const backward =
      orientation === "vertical" ? "ArrowUp" : rtl ? "ArrowRight" : "ArrowLeft";
    let target: number;
    switch (event.key) {
      case "Home":
        target = 0;
        break;
      case "End":
        target = buttons.length - 1;
        break;
      case forward:
        target = (index + 1) % buttons.length;
        break;
      case backward:
        target = (index + buttons.length - 1) % buttons.length;
        break;
      default:
        return;
    }
    event.preventDefault();
    (buttons[target] as HTMLButtonElement | undefined)?.focus();
  }

  return (
    <section
      {...props}
      ref={ref}
      aria-label={props["aria-label"] ?? label}
      className={className ? `ec-steps ${className}` : "ec-steps"}
      data-orientation={orientation}
    >
      <ol className="ec-steps__list" onKeyDown={navigate}>
        {items.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              disabled={!available.includes(item)}
              aria-current={item.id === current?.id ? "step" : undefined}
              onClick={() => select(item)}
            >
              <span className="ec-steps__number" aria-hidden="true">
                {index + 1}
              </span>
              {item.label}
            </button>
          </li>
        ))}
      </ol>
      {current && (
        <>
          <progress
            className="ec-steps__progress"
            aria-label={label}
            value={selected + 1}
            max={enabled.length}
          />
          <div className="ec-steps__content">{current.content}</div>
          <div className="ec-steps__controls">
            <button
              type="button"
              aria-disabled={!previous || undefined}
              onClick={() => select(previous)}
            >
              {previousLabel}
            </button>
            <button
              type="button"
              aria-disabled={!next || undefined}
              onClick={() => select(next)}
            >
              {nextLabel}
            </button>
          </div>
        </>
      )}
    </section>
  );
});
