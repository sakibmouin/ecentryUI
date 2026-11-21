// SPDX-License-Identifier: MIT
import { forwardRef, useMemo } from "react";
import type { ComponentPropsWithRef } from "react";
import { create } from "qrcode";
export interface QRCodeProps extends Omit<
  ComponentPropsWithRef<"svg">,
  "children"
> {
  value: string;
  label?: string;
  size?: number;
}
export const QRCode = forwardRef<SVGSVGElement, QRCodeProps>(function QRCode(
  { value, label = "QR code", size = 160, className, ...rest },
  ref,
) {
  const symbol = useMemo(
    () => (value ? create(value, { errorCorrectionLevel: "M" }) : null),
    [value],
  );
  if (!symbol) return <span role="status">No QR data</span>;
  const dimension = symbol.modules.size + 8;
  const commands: string[] = [];
  for (let row = 0; row < symbol.modules.size; row++) {
    for (let col = 0; col < symbol.modules.size; col++) {
      if (symbol.modules.get(row, col))
        commands.push(`M${col + 4} ${row + 4}h1v1h-1z`);
    }
  }
  return (
    <svg
      {...rest}
      ref={ref}
      role="img"
      aria-label={label}
      width={size}
      height={size}
      viewBox={`0 0 ${dimension} ${dimension}`}
      shapeRendering="crispEdges"
      className={`ec-qr-code${className ? ` ${className}` : ""}`}
    >
      <rect width={dimension} height={dimension} fill="white" />
      <path d={commands.join("")} fill="black" />
    </svg>
  );
});
