// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
}
export interface TreeViewProps {
  label: string;
  nodes: TreeNode[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}
interface VisibleNode {
  node: TreeNode;
  parent: string | undefined;
  level: number;
  position: number;
  setSize: number;
}

export function TreeView({
  label,
  nodes,
  value,
  defaultValue = "",
  onValueChange,
  expanded,
  defaultExpanded = [],
  onExpandedChange,
  disabled = false,
  className,
  id,
}: TreeViewProps) {
  const generated = useId();
  const treeId = id ?? generated;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selected = value ?? internalValue;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const openIds = expanded ?? internalExpanded;
  const [activeId, setActiveId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const typeahead = useRef("");
  const typeaheadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visible: VisibleNode[] = [];
  function collect(items: TreeNode[], level: number, parent?: string) {
    items.forEach((node, index) => {
      visible.push({
        node,
        parent,
        level,
        position: index + 1,
        setSize: items.length,
      });
      if (node.children?.length && openIds.includes(node.id))
        collect(node.children, level + 1, node.id);
    });
  }
  collect(nodes, 1);
  const activeIndex = visible.findIndex(({ node }) => node.id === activeId);
  const currentIndex =
    activeIndex >= 0
      ? activeIndex
      : visible.findIndex(({ node }) => !node.disabled);
  const active = visible[currentIndex];
  useEffect(
    () => () => {
      if (typeaheadTimer.current) clearTimeout(typeaheadTimer.current);
    },
    [],
  );

  function select(node: TreeNode) {
    if (disabled || node.disabled) return;
    if (value === undefined) setInternalValue(node.id);
    onValueChange?.(node.id);
    setActiveId(node.id);
    rootRef.current?.focus();
  }
  function toggle(node: TreeNode, next?: boolean) {
    if (disabled || node.disabled || !node.children?.length) return;
    const isOpen = openIds.includes(node.id);
    const shouldOpen = next ?? !isOpen;
    const nextIds = shouldOpen
      ? [...openIds, node.id]
      : openIds.filter((item) => item !== node.id);
    if (expanded === undefined) setInternalExpanded(nextIds);
    onExpandedChange?.(nextIds);
    if (!shouldOpen) {
      let parent = active?.parent;
      while (parent) {
        if (parent === node.id) {
          setActiveId(node.id);
          break;
        }
        parent = visible.find((item) => item.node.id === parent)?.parent;
      }
    }
    rootRef.current?.focus();
  }
  function move(direction: 1 | -1) {
    if (!visible.length) return;
    let index = currentIndex;
    for (let tries = 0; tries < visible.length; tries++) {
      index = (index + direction + visible.length) % visible.length;
      const item = visible[index];
      if (item && !item.node.disabled) {
        setActiveId(item.node.id);
        return;
      }
    }
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled || !active) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      move(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveId(visible.find((item) => !item.node.disabled)?.node.id ?? null);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveId(
        [...visible].reverse().find((item) => !item.node.disabled)?.node.id ??
          null,
      );
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      if (active.node.children?.length && !openIds.includes(active.node.id))
        toggle(active.node, true);
      else if (active.node.children?.length)
        setActiveId(
          active.node.children.find((child) => !child.disabled)?.id ??
            active.node.id,
        );
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (active.node.children?.length && openIds.includes(active.node.id))
        toggle(active.node, false);
      else if (active.parent) setActiveId(active.parent);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select(active.node);
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
      for (let offset = 1; offset <= visible.length; offset++) {
        const item = visible[(currentIndex + offset) % visible.length];
        if (
          item &&
          !item.node.disabled &&
          item.node.label.toLocaleLowerCase().startsWith(typeahead.current)
        ) {
          setActiveId(item.node.id);
          break;
        }
      }
    }
  }
  return (
    <div className={`ec-tree-view${className ? ` ${className}` : ""}`}>
      <span id={`${treeId}-label`} className="ec-tree-view__label">
        {label}
      </span>
      <div
        ref={rootRef}
        id={treeId}
        role="tree"
        tabIndex={disabled ? -1 : 0}
        aria-labelledby={`${treeId}-label`}
        aria-disabled={disabled || undefined}
        aria-activedescendant={
          active ? `${treeId}-${active.node.id}` : undefined
        }
        onKeyDown={handleKeyDown}
        className="ec-tree-view__tree"
      >
        {visible.map(({ node, level, position, setSize }) => (
          <div
            key={node.id}
            id={`${treeId}-${node.id}`}
            role="treeitem"
            aria-level={level}
            aria-posinset={position}
            aria-setsize={setSize}
            aria-expanded={
              node.children?.length ? openIds.includes(node.id) : undefined
            }
            aria-selected={selected === node.id}
            aria-disabled={node.disabled || undefined}
            data-active={active?.node.id === node.id || undefined}
            style={{ paddingInlineStart: `${(level - 1) * 18 + 8}px` }}
            className="ec-tree-view__item"
            onClick={() => select(node)}
          >
            {node.children?.length ? (
              <button
                type="button"
                aria-label={`${openIds.includes(node.id) ? "Collapse" : "Expand"} ${node.label}`}
                tabIndex={-1}
                disabled={disabled || node.disabled}
                onClick={(event) => {
                  event.stopPropagation();
                  toggle(node);
                }}
              >
                {openIds.includes(node.id) ? "⌄" : "›"}
              </button>
            ) : (
              <span className="ec-tree-view__spacer" aria-hidden="true" />
            )}
            <span>{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
