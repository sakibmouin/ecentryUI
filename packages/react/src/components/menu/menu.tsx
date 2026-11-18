// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent, MouseEvent } from "react";

export interface MenuItem {
  id: string;
  label: string;
  disabled?: boolean;
  children?: MenuItem[];
  onSelect?: () => void;
}
export interface MenuProps {
  triggerLabel: string;
  items: MenuItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  id?: string;
}

export function Menu({
  triggerLabel,
  items,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  id,
}: MenuProps) {
  const generated = useId();
  const menuId = id ?? generated;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const [path, setPath] = useState<string[]>([]);
  const [contextPoint, setContextPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const typeahead = useRef("");
  const typeaheadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasOpen = useRef(false);

  function change(next: boolean) {
    if (next === open) return;
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }
  function close() {
    change(false);
    setPath([]);
    setContextPoint(null);
    triggerRef.current?.focus();
  }
  useEffect(() => {
    if (open && !wasOpen.current)
      menuRef.current
        ?.querySelector<HTMLElement>(
          ':scope > .ec-menu__entry > [role="menuitem"]:not([aria-disabled="true"])',
        )
        ?.focus();
    wasOpen.current = open;
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open, controlledOpen]);
  useEffect(
    () => () => {
      if (typeaheadTimer.current) clearTimeout(typeaheadTimer.current);
    },
    [],
  );

  function openChild(item: MenuItem, depth: number, focusChild = false) {
    if (!item.children?.length || item.disabled) return;
    setPath((current) => [...current.slice(0, depth), item.id]);
    if (focusChild)
      queueMicrotask(() =>
        rootRef.current
          ?.querySelector<HTMLElement>(
            `[data-menu-depth="${depth + 1}"] > .ec-menu__entry > [role="menuitem"]:not([aria-disabled="true"])`,
          )
          ?.focus(),
      );
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    const target = event.target as HTMLElement;
    const menu = target.closest<HTMLElement>('[role="menu"]');
    if (!menu) return;
    const entries = Array.from(
      menu.querySelectorAll<HTMLElement>(
        ':scope > .ec-menu__entry > [role="menuitem"]:not([aria-disabled="true"])',
      ),
    );
    const index = entries.indexOf(target);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      entries[
        (index + (event.key === "ArrowDown" ? 1 : -1) + entries.length) %
          entries.length
      ]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      entries[event.key === "Home" ? 0 : entries.length - 1]?.focus();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      const depth = Number(menu.dataset.menuDepth);
      const item = findItem(target.dataset.itemId ?? "", items);
      if (item) openChild(item, depth, true);
    } else if (event.key === "ArrowLeft") {
      const depth = Number(menu.dataset.menuDepth);
      if (depth > 0) {
        event.preventDefault();
        const parentId = path[depth - 1];
        setPath((current) => current.slice(0, depth - 1));
        queueMicrotask(() =>
          rootRef.current
            ?.querySelector<HTMLElement>(`[data-item-id="${parentId}"]`)
            ?.focus(),
        );
      }
    } else if (
      event.key.length === 1 &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      typeahead.current += event.key.toLocaleLowerCase();
      if (typeaheadTimer.current) clearTimeout(typeaheadTimer.current);
      typeaheadTimer.current = setTimeout(() => {
        typeahead.current = "";
      }, 700);
      const match = entries.find((entry) =>
        entry.textContent?.toLocaleLowerCase().startsWith(typeahead.current),
      );
      match?.focus();
    }
  }
  function handleContextMenu(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setContextPoint({
      x: Math.max(8, Math.min(event.clientX, window.innerWidth - 248)),
      y: Math.max(8, Math.min(event.clientY, window.innerHeight - 280)),
    });
    change(true);
  }
  function renderItems(levelItems: MenuItem[], depth: number): React.ReactNode {
    return levelItems.map((item) => (
      <div className="ec-menu__entry" key={item.id} role="none">
        <button
          type="button"
          role="menuitem"
          tabIndex={-1}
          data-item-id={item.id}
          aria-disabled={item.disabled || undefined}
          aria-haspopup={item.children?.length ? "menu" : undefined}
          aria-expanded={
            item.children?.length ? path[depth] === item.id : undefined
          }
          onMouseEnter={() => {
            if (item.children?.length) openChild(item, depth);
          }}
          onClick={() => {
            if (item.disabled) return;
            if (item.children?.length) openChild(item, depth, true);
            else {
              item.onSelect?.();
              close();
            }
          }}
        >
          {item.label}
          {item.children?.length && <span aria-hidden="true">›</span>}
        </button>
        {item.children?.length && path[depth] === item.id && (
          <div
            role="menu"
            aria-label={`${item.label} submenu`}
            className="ec-menu__sub"
            data-menu-depth={depth + 1}
          >
            {renderItems(item.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  }
  return (
    <div
      ref={rootRef}
      className={`ec-menu-root${className ? ` ${className}` : ""}`}
      onKeyDown={handleKeyDown}
      onBlur={(event: FocusEvent<HTMLDivElement>) => {
        if (
          open &&
          !event.currentTarget.contains(event.relatedTarget as Node)
        ) {
          change(false);
          setPath([]);
          setContextPoint(null);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          setContextPoint(null);
          change(!open);
        }}
        onContextMenu={handleContextMenu}
        onKeyDown={(event) => {
          if (!open && event.key === "ArrowDown") {
            event.preventDefault();
            change(true);
          }
        }}
      >
        {triggerLabel}
      </button>
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={triggerLabel}
          className="ec-menu"
          data-menu-depth={0}
          data-context={contextPoint ? "true" : undefined}
          style={
            contextPoint
              ? { left: contextPoint.x, top: contextPoint.y }
              : undefined
          }
        >
          {renderItems(items, 0)}
        </div>
      )}
    </div>
  );
}

function findItem(id: string, items: MenuItem[]): MenuItem | undefined {
  for (const item of items) {
    if (item.id === id) return item;
    const child = item.children && findItem(id, item.children);
    if (child) return child;
  }
  return undefined;
}
