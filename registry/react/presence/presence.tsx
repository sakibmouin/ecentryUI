// SPDX-License-Identifier: MIT
"use client";
import { forwardRef, useEffect, useState } from "react";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";

export interface PresenceProps extends ComponentPropsWithoutRef<"div"> {
  present: boolean;
  exitDuration?: number;
}

export const Presence = forwardRef<HTMLDivElement, PresenceProps>(
  function Presence(
    { present, exitDuration = 150, className, style, ...props },
    ref,
  ) {
    const [retained, setRetained] = useState(present);
    const duration = Number.isFinite(exitDuration)
      ? Math.max(0, exitDuration)
      : 0;

    useEffect(() => {
      if (present) {
        setRetained(true);
      } else if (retained) {
        if (
          duration === 0 ||
          window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        ) {
          setRetained(false);
          return;
        }
        const timer = window.setTimeout(() => setRetained(false), duration);
        return () => window.clearTimeout(timer);
      }
    }, [duration, present, retained]);

    if (!present && (!retained || duration === 0)) return null;

    return (
      <div
        {...props}
        ref={(node) => {
          node?.toggleAttribute("inert", !present);
          if (typeof ref === "function") return ref(node);
          if (ref) ref.current = node;
        }}
        className={className ? `ec-presence ${className}` : "ec-presence"}
        style={
          {
            ...style,
            "--ec-presence-duration": `${duration}ms`,
          } as CSSProperties
        }
        data-state={present ? "present" : "exiting"}
        aria-hidden={!present || props["aria-hidden"]}
      />
    );
  },
);
