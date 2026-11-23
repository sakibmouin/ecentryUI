// SPDX-License-Identifier: MIT
"use client";
import { useLocale } from "../locale-provider/locale-provider.js";

export interface FormatNumberProps {
  value: number | bigint;
  locale?: string | string[];
  options?: Intl.NumberFormatOptions;
}

export function FormatNumber({ value, locale, options }: FormatNumberProps) {
  const context = useLocale();
  return (
    <>
      {new Intl.NumberFormat(locale ?? context.locale, options).format(value)}
    </>
  );
}
