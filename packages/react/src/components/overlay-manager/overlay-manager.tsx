// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { MouseEvent, ReactNode, SyntheticEvent } from "react";

export interface ManagedOverlay {
  id: string;
  title: string;
  triggerLabel: string;
  children: ReactNode;
  parentId?: string;
}

export interface OverlayManagerProps {
  overlays: ManagedOverlay[];
  openIds?: string[];
  defaultOpenIds?: string[];
  onOpenIdsChange?: (ids: string[]) => void;
  className?: string;
}

export function OverlayManager({
  overlays,
  openIds: controlledIds,
  defaultOpenIds = [],
  onOpenIdsChange,
  className,
}: OverlayManagerProps) {
  const generatedId = useId();
  const [internalIds, setInternalIds] = useState(defaultOpenIds);
  const openIds = controlledIds ?? internalIds;
  const dialogs = useRef(new Map<string, HTMLDialogElement>());
  const openers = useRef(new Map<string, HTMLButtonElement>());
  const pendingFocus = useRef<string | null>(null);

  function change(ids: string[]) {
    if (controlledIds === undefined) setInternalIds(ids);
    onOpenIdsChange?.(ids);
  }
  function open(id: string, opener: HTMLButtonElement) {
    if (openIds.includes(id)) return;
    openers.current.set(id, opener);
    change([...openIds, id]);
  }
  function close(id: string) {
    const index = openIds.indexOf(id);
    if (index < 0) return;
    pendingFocus.current = id;
    change(openIds.slice(0, index));
  }
  useEffect(() => {
    const active = new Set(openIds);
    for (const [id, dialog] of dialogs.current) {
      if (!active.has(id) && dialog.open) dialog.close();
    }
    for (const id of openIds) {
      const dialog = dialogs.current.get(id);
      if (dialog && !dialog.open) dialog.showModal();
    }
    const top = dialogs.current.get(openIds.at(-1) ?? "");
    top
      ?.querySelector<HTMLButtonElement>(".ec-overlay-manager__close")
      ?.focus();
    const closedId = pendingFocus.current;
    if (closedId) {
      pendingFocus.current = null;
      openers.current.get(closedId)?.focus();
    }
  }, [openIds]);

  function trigger(item: ManagedOverlay) {
    return (
      <button
        key={item.id}
        type="button"
        className="ec-overlay-manager__trigger"
        aria-haspopup="dialog"
        aria-expanded={openIds.includes(item.id)}
        aria-controls={`${generatedId}-${item.id}`}
        onClick={(event) => open(item.id, event.currentTarget)}
      >
        {item.triggerLabel}
      </button>
    );
  }
  function handleBackdrop(event: MouseEvent<HTMLDialogElement>, id: string) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      close(id);
  }
  return (
    <div className={`ec-overlay-manager${className ? ` ${className}` : ""}`}>
      <div className="ec-overlay-manager__triggers">
        {overlays.filter((item) => !item.parentId).map(trigger)}
      </div>
      {overlays.map((item) => (
        <dialog
          key={item.id}
          ref={(element) => {
            if (element) dialogs.current.set(item.id, element);
            else dialogs.current.delete(item.id);
          }}
          id={`${generatedId}-${item.id}`}
          className="ec-overlay-manager__dialog"
          aria-labelledby={`${generatedId}-${item.id}-title`}
          onCancel={(event: SyntheticEvent<HTMLDialogElement, Event>) => {
            event.preventDefault();
            if (openIds.at(-1) === item.id) close(item.id);
          }}
          onClick={(event) => handleBackdrop(event, item.id)}
        >
          <header className="ec-overlay-manager__header">
            <h2 id={`${generatedId}-${item.id}-title`}>{item.title}</h2>
            <button
              type="button"
              className="ec-overlay-manager__close"
              aria-label={`Close ${item.title}`}
              onClick={() => close(item.id)}
            >
              ×
            </button>
          </header>
          <div className="ec-overlay-manager__body">{item.children}</div>
          <div className="ec-overlay-manager__triggers">
            {overlays
              .filter((child) => child.parentId === item.id)
              .map(trigger)}
          </div>
        </dialog>
      ))}
    </div>
  );
}
