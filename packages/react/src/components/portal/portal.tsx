// SPDX-License-Identifier: MIT
"use client";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useEnvironment } from "../environment-provider/environment-provider.js";

export interface PortalProps {
  children: ReactNode;
  container?: Element | DocumentFragment | null;
  disabled?: boolean;
}

export function Portal({ children, container, disabled = false }: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const environment = useEnvironment();
  useEffect(() => setMounted(true), []);
  if (disabled) return <>{children}</>;
  if (!mounted) return null;

  let destination = container;
  if (destination === undefined) {
    const root = environment.getRootNode();
    destination = root && "body" in root ? root.body : root;
  }
  return destination ? createPortal(children, destination) : null;
}
