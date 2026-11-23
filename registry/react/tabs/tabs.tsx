// SPDX-License-Identifier: MIT
import { forwardRef, useId, useState } from "react";
import type { ComponentPropsWithoutRef, KeyboardEvent, ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
  panelTabIndex?: 0 | -1;
}

export interface TabsProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> {
  label: string;
  items: readonly TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  activation?: "automatic" | "manual";
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    label,
    items,
    value,
    defaultValue,
    onValueChange,
    orientation = "horizontal",
    activation = "automatic",
    className,
    ...props
  },
  ref,
) {
  const id = useId();
  const [internal, setInternal] = useState(defaultValue);
  const [focused, setFocused] = useState<string>();
  const enabled = items.filter((item) => !item.disabled);
  const active =
    enabled.find((item) => item.id === (value ?? internal)) ?? enabled[0];
  const entry = enabled.find((item) => item.id === focused) ?? active;

  function select(item: TabItem) {
    if (item.disabled || item.id === active?.id) return;
    onValueChange?.(item.id);
    if (value === undefined) setInternal(item.id);
  }

  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:enabled',
      ),
    );
    const index = tabs.findIndex((tab) => tab === event.target);
    if (index < 0) return;
    const computedDirection = getComputedStyle(event.currentTarget).direction;
    const rtl =
      (computedDirection ||
        event.currentTarget.closest("[dir]")?.getAttribute("dir")) === "rtl";
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
        target = tabs.length - 1;
        break;
      case forward:
        target = (index + 1) % tabs.length;
        break;
      case backward:
        target = (index + tabs.length - 1) % tabs.length;
        break;
      default:
        return;
    }
    event.preventDefault();
    tabs[target]?.focus();
  }

  return (
    <div
      {...props}
      ref={ref}
      className={className ? `ec-tabs ${className}` : "ec-tabs"}
      data-orientation={orientation}
    >
      <div
        className="ec-tabs__list"
        role="tablist"
        aria-label={label}
        aria-orientation={orientation}
        onKeyDown={navigate}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(undefined);
        }}
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            className="ec-tabs__tab"
            aria-selected={item === active}
            aria-controls={`${id}-panel-${index}`}
            tabIndex={item === entry ? 0 : -1}
            disabled={item.disabled}
            onFocus={() => {
              setFocused(item.id);
              if (activation === "automatic") select(item);
            }}
            onClick={(event) => {
              if (
                activation === "manual" ||
                event.currentTarget !==
                  event.currentTarget.ownerDocument.activeElement
              )
                select(item);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="ec-tabs__panel"
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={item !== active}
          tabIndex={item.panelTabIndex ?? 0}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
});
