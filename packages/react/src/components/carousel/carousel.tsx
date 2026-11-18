// SPDX-License-Identifier: MIT
import { useEffect, useId, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent, ReactNode } from "react";

export interface CarouselSlide {
  id: string;
  label: string;
  content: ReactNode;
}

export interface CarouselProps {
  label: string;
  slides: CarouselSlide[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  loop?: boolean;
  autoplay?: boolean;
  interval?: number;
  className?: string;
  id?: string;
}

export function Carousel({
  label,
  slides,
  index: controlledIndex,
  defaultIndex = 0,
  onIndexChange,
  loop = false,
  autoplay = false,
  interval = 5000,
  className,
  id,
}: CarouselProps) {
  const generatedId = useId();
  const carouselId = id ?? generatedId;
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const index = Math.max(
    0,
    Math.min(controlledIndex ?? internalIndex, slides.length - 1),
  );
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = slides[index];

  function change(next: number) {
    if (!slides.length) return;
    const target = loop
      ? (next + slides.length) % slides.length
      : Math.max(0, Math.min(next, slides.length - 1));
    if (target === index) return;
    if (controlledIndex === undefined) setInternalIndex(target);
    onIndexChange?.(target);
  }
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const playing =
    autoplay &&
    !userPaused &&
    !reducedMotion &&
    !hovered &&
    !focused &&
    slides.length > 1;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(
      () => change(index + 1),
      Math.max(1000, interval),
    );
    return () => window.clearTimeout(timer);
  }, [playing, index, interval, slides.length, loop, controlledIndex]);
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (
      (event.target as HTMLElement).closest(
        "input, textarea, select, [contenteditable]",
      )
    )
      return;
    const rtl = getComputedStyle(rootRef.current!).direction === "rtl";
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      change(index + ((event.key === "ArrowRight") !== rtl ? 1 : -1));
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      change(event.key === "Home" ? 0 : slides.length - 1);
    }
  }
  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node))
      setFocused(false);
  }
  return (
    <div
      ref={rootRef}
      id={carouselId}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={`ec-carousel${className ? ` ${className}` : ""}`}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
    >
      <div
        className="ec-carousel__viewport"
        aria-live={playing ? "off" : "polite"}
        aria-atomic="true"
      >
        {current && (
          <div
            key={current.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${current.label}`}
            className="ec-carousel__slide"
          >
            {current.content}
          </div>
        )}
      </div>
      {slides.length > 1 && (
        <div className="ec-carousel__controls">
          <button
            type="button"
            aria-label="Previous slide"
            disabled={!loop && index === 0}
            onClick={() => change(index - 1)}
          >
            ‹
          </button>
          <div
            className="ec-carousel__indicators"
            role="group"
            aria-label="Choose slide"
          >
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${slideIndex + 1}: ${slide.label}`}
                aria-current={slideIndex === index ? "true" : undefined}
                onClick={() => change(slideIndex)}
              >
                {slideIndex + 1}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Next slide"
            disabled={!loop && index === slides.length - 1}
            onClick={() => change(index + 1)}
          >
            ›
          </button>
          {autoplay && !reducedMotion && (
            <button
              type="button"
              className="ec-carousel__play"
              aria-label={userPaused ? "Resume autoplay" : "Pause autoplay"}
              onClick={() => setUserPaused(!userPaused)}
            >
              {userPaused ? "Resume" : "Pause"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
