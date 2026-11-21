// SPDX-License-Identifier: MIT
import { forwardRef, useEffect, useState } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";

export interface ImageProps extends ComponentPropsWithRef<"img"> {
  fallback?: ReactNode;
  fit?: "cover" | "contain";
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, alt, fallback, fit = "cover", className, onError, onLoad, ...rest },
  ref,
) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (failed && fallback !== undefined) {
    return (
      <span
        className="ec-image__fallback"
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
      >
        {fallback}
      </span>
    );
  }
  return (
    <img
      {...rest}
      ref={ref}
      src={src}
      alt={alt}
      data-fit={fit}
      className={`ec-image${className ? ` ${className}` : ""}`}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      onLoad={onLoad}
    />
  );
});
