// SPDX-License-Identifier: MIT
import type { ReactNode } from "react";

export interface ShowProps<T> {
  when: T | null | undefined;
  fallback?: ReactNode;
  children: ReactNode | ((value: NonNullable<T>) => ReactNode);
}

export function Show<T>({ when, fallback = null, children }: ShowProps<T>) {
  if (!when) return <>{fallback}</>;
  return <>{typeof children === "function" ? children(when) : children}</>;
}
