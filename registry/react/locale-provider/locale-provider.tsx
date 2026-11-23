// SPDX-License-Identifier: MIT
"use client";
import { createContext, forwardRef, useContext, useMemo } from "react";
import type { ComponentPropsWithoutRef } from "react";

export interface LocaleContextValue {
  locale: string;
  direction: "ltr" | "rtl";
}

export interface LocaleProviderProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "lang" | "dir"
> {
  locale?: string;
  direction?: LocaleContextValue["direction"];
}

const Context = createContext<LocaleContextValue>({
  locale: "en",
  direction: "ltr",
});

export function useLocale() {
  return useContext(Context);
}

export const LocaleProvider = forwardRef<HTMLDivElement, LocaleProviderProps>(
  function LocaleProvider({ locale, direction, ...props }, ref) {
    const parent = useLocale();
    const effectiveLocale = locale ?? parent.locale;
    const effectiveDirection = direction ?? parent.direction;
    const config = useMemo(
      () => ({ locale: effectiveLocale, direction: effectiveDirection }),
      [effectiveLocale, effectiveDirection],
    );

    return (
      <Context.Provider value={config}>
        <div
          {...props}
          ref={ref}
          lang={effectiveLocale}
          dir={effectiveDirection}
        />
      </Context.Provider>
    );
  },
);
