// SPDX-License-Identifier: MIT
import { Fragment } from "react";
import type { Key, ReactNode } from "react";

export interface ForProps<T> {
  each: readonly T[] | null | undefined;
  children: (item: T, index: number) => ReactNode;
  getKey?: (item: T, index: number) => Key;
  fallback?: ReactNode;
}

export function For<T>({
  each,
  children,
  getKey,
  fallback = null,
}: ForProps<T>) {
  if (!each?.length) return <>{fallback}</>;
  return (
    <>
      {each.map((item, index) => (
        <Fragment key={getKey?.(item, index) ?? index}>
          {children(item, index)}
        </Fragment>
      ))}
    </>
  );
}
