// SPDX-License-Identifier: MIT
"use client";
import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";

export type EnvironmentRoot = Document | ShadowRoot;

export interface Environment {
  getRootNode: () => EnvironmentRoot | undefined;
  getDocument: () => Document | undefined;
  getWindow: () => Window | undefined;
}

export interface EnvironmentProviderProps {
  children: ReactNode;
  getRootNode?: Environment["getRootNode"];
}

function createEnvironment(
  getRootNode: Environment["getRootNode"],
): Environment {
  function getDocument() {
    const root = getRootNode();
    if (!root) return undefined;
    return "host" in root ? root.ownerDocument : root;
  }
  return {
    getRootNode,
    getDocument,
    getWindow: () => getDocument()?.defaultView ?? undefined,
  };
}

const Context = createContext(
  createEnvironment(() =>
    typeof document === "undefined" ? undefined : document,
  ),
);

export function useEnvironment() {
  return useContext(Context);
}

export function EnvironmentProvider({
  children,
  getRootNode,
}: EnvironmentProviderProps) {
  const parent = useEnvironment();
  const environment = useMemo(
    () => (getRootNode ? createEnvironment(getRootNode) : parent),
    [getRootNode, parent],
  );
  return <Context.Provider value={environment}>{children}</Context.Provider>;
}
