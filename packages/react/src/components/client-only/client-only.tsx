// SPDX-License-Identifier: MIT
"use client";
import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";

export interface ClientOnlyProps {
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode;
}

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const ready = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  if (!ready) return fallback;
  return typeof children === "function" ? children() : children;
}
