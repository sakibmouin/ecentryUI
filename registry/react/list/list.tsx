// SPDX-License-Identifier: MIT
import { forwardRef } from "react";
import type { HTMLAttributes, LiHTMLAttributes, Ref } from "react";

export interface ListProps extends HTMLAttributes<HTMLElement> {
  ordered?: boolean;
  marker?: "disc" | "decimal" | "none";
}
export type ListItemProps = LiHTMLAttributes<HTMLLIElement>;

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  function List({ ordered = false, marker, className, ...rest }, ref) {
    const listProps = rest;
    const markerValue = marker ?? (ordered ? "decimal" : "disc");
    const classes = `ec-list${className ? ` ${className}` : ""}`;
    return ordered ? (
      <ol
        {...listProps}
        ref={ref as Ref<HTMLOListElement>}
        data-marker={markerValue}
        className={classes}
      />
    ) : (
      <ul
        {...listProps}
        ref={ref as Ref<HTMLUListElement>}
        data-marker={markerValue}
        className={classes}
      />
    );
  },
);

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem({ className, ...rest }, ref) {
    return (
      <li
        {...rest}
        ref={ref}
        className={`ec-list-item${className ? ` ${className}` : ""}`}
      />
    );
  },
);
