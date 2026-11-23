// SPDX-License-Identifier: MIT
export interface FormatNumberProps {
  value: number | bigint;
  locale?: string | string[];
  options?: Intl.NumberFormatOptions;
}

export function FormatNumber({
  value,
  locale = "en",
  options,
}: FormatNumberProps) {
  return <>{new Intl.NumberFormat(locale, options).format(value)}</>;
}
