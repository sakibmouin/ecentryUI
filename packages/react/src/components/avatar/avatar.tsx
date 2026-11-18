// SPDX-License-Identifier: MIT
import { forwardRef, useState } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";

export interface AvatarProps extends Omit<
  ComponentPropsWithRef<"span">,
  "children"
> {
  name: string;
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    name,
    src,
    alt,
    fallback,
    size = "md",
    loading = false,
    className,
    ...rest
  },
  ref,
) {
  const [failedSource, setFailedSource] = useState<string>();
  const showImage = Boolean(src && !loading && failedSource !== src);
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toLocaleUpperCase();
  return (
    <span
      {...rest}
      ref={ref}
      className={`ec-avatar ec-avatar--${size}${className ? ` ${className}` : ""}`}
      role="img"
      aria-label={name}
      aria-busy={loading || undefined}
    >
      {showImage ? (
        <img
          className="ec-avatar__image"
          src={src}
          alt={alt ?? ""}
          onError={() => setFailedSource(src)}
        />
      ) : (
        <span className="ec-avatar__fallback" aria-hidden="true">
          {loading ? "…" : (fallback ?? initials)}
        </span>
      )}
    </span>
  );
});
