// SPDX-License-Identifier: MIT
import { forwardRef, useState } from "react";
import type { ComponentPropsWithRef } from "react";

export interface MarqueeProps extends ComponentPropsWithRef<"div"> {
  duration?: number;
}

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  function Marquee({ children, duration = 20, className, ...rest }, ref) {
    const [paused, setPaused] = useState(false);
    return (
      <div
        {...rest}
        ref={ref}
        className={`ec-marquee${className ? ` ${className}` : ""}`}
        data-paused={paused}
      >
        <div className="ec-marquee__viewport">
          <div
            className="ec-marquee__track"
            style={{ animationDuration: `${Math.max(1, duration)}s` }}
          >
            <div className="ec-marquee__group">{children}</div>
            <div className="ec-marquee__group" aria-hidden="true">
              {children}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="ec-marquee__pause"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Resume animation" : "Pause animation"}
        >
          {paused ? "Play" : "Pause"}
        </button>
      </div>
    );
  },
);
