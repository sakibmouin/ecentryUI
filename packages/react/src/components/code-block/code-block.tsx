// SPDX-License-Identifier: MIT
import { forwardRef, useCallback, useId, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";

const tokenPattern =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:const|let|var|function|return|export|import|from|async|await|if|else|class|new|true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b)/g;

function highlightedCode(source: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const match of source.matchAll(tokenPattern)) {
    const position = match.index;
    if (position > cursor) parts.push(source.slice(cursor, position));
    const value = match[0];
    const kind =
      value.startsWith("//") || value.startsWith("/*")
        ? "comment"
        : /^["'`]/.test(value)
          ? "string"
          : /^\d/.test(value)
            ? "number"
            : "keyword";
    parts.push(
      <span data-token={kind} key={position}>
        {value}
      </span>,
    );
    cursor = position + value.length;
  }
  if (cursor < source.length) parts.push(source.slice(cursor));
  return parts;
}

export interface CodeBlockProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onCopy"
> {
  children: string;
  open?: boolean;
  defaultOpen?: boolean;
  collapsible?: boolean;
  copyable?: boolean;
  language?: "javascript" | "typescript";
  onOpenChange?: (open: boolean) => void;
  onCopy?: (code: string) => void;
  copyLabel?: string;
  collapseLabel?: string;
  expandLabel?: string;
}

export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  function CodeBlock(
    {
      children,
      open: controlledOpen,
      defaultOpen = true,
      collapsible = false,
      copyable = true,
      language,
      onOpenChange,
      onCopy,
      copyLabel = "Copy code",
      collapseLabel = "Collapse code",
      expandLabel = "Expand code",
      className,
      ...rest
    },
    ref,
  ) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const [copied, setCopied] = useState(false);
    const instanceId = useId();
    const contentId = `ec-code-block-content-${instanceId.replace(/:/g, "")}`;
    const isOpen = controlledOpen ?? uncontrolledOpen;
    const setOpen = useCallback(
      (nextOpen: boolean) => {
        if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
        onOpenChange?.(nextOpen);
      },
      [controlledOpen, onOpenChange],
    );
    const copy = useCallback(async () => {
      try {
        if (!navigator.clipboard?.writeText) return;
        await navigator.clipboard.writeText(children);
        setCopied(true);
        onCopy?.(children);
        window.setTimeout(() => setCopied(false), 1200);
      } catch {
        setCopied(false);
      }
    }, [children, onCopy]);

    return (
      <div
        {...rest}
        ref={ref}
        className={`ec-code-block${className ? ` ${className}` : ""}`}
        data-open={isOpen ? "true" : "false"}
      >
        <div className="ec-code-block__toolbar">
          {collapsible ? (
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => setOpen(!isOpen)}
            >
              {isOpen ? collapseLabel : expandLabel}
            </button>
          ) : null}
          {copyable ? (
            <button type="button" onClick={copy}>
              {copied ? "Copied" : copyLabel}
            </button>
          ) : null}
        </div>
        <pre id={contentId} hidden={!isOpen}>
          <code>{language ? highlightedCode(children) : children}</code>
        </pre>
      </div>
    );
  },
);
