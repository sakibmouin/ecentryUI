// SPDX-License-Identifier: MIT
"use client";
import { useLocale } from "../locale-provider/locale-provider.js";

export interface FormatByteProps {
  value: number;
  locale?: string | string[];
  unitDisplay?: "short" | "narrow" | "long";
  maximumFractionDigits?: number;
}

const scaledUnits = [
  "kilobyte",
  "megabyte",
  "gigabyte",
  "terabyte",
  "petabyte",
];

export function FormatByte({
  value,
  locale,
  unitDisplay = "short",
  maximumFractionDigits = 1,
}: FormatByteProps) {
  const context = useLocale();
  if (!Number.isFinite(value)) return null;
  let amount = value;
  let unit = "byte";
  for (const nextUnit of scaledUnits) {
    if (Math.abs(amount) < 1000) break;
    amount /= 1000;
    unit = nextUnit;
  }
  const formatter = new Intl.NumberFormat(locale ?? context.locale, {
    style: "unit",
    unit,
    unitDisplay,
    maximumFractionDigits,
  });
  return <>{formatter.format(amount)}</>;
}
