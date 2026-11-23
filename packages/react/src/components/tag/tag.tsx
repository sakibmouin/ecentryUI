// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, MouseEventHandler } from "react";

type TagRemoveProps =
  | { onRemove?: undefined; removeLabel?: undefined; disabled?: undefined }
  | {
      onRemove: MouseEventHandler<HTMLButtonElement>;
      removeLabel: string;
      disabled?: boolean;
    };

export type TagProps = ComponentPropsWithoutRef<"span"> &
  TagRemoveProps & {
    variant?: "neutral" | "accent";
    size?: "sm" | "md";
  };

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    variant = "neutral",
    size = "md",
    onRemove,
    removeLabel,
    disabled,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <span
      {...props}
      ref={ref}
      data-variant={variant}
      data-size={size}
      className={className ? `ec-tag ${className}` : "ec-tag"}
    >
      <span className="ec-tag__label">{children}</span>
      {onRemove && (
        <button
          className="ec-tag__remove"
          type="button"
          aria-label={removeLabel}
          disabled={disabled}
          onClick={onRemove}
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </span>
  );
});
