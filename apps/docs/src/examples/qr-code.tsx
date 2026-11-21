import { QRCode } from "../../../../packages/react/src/components/qr-code/qr-code.js";
import "../../../../packages/react/src/components/qr-code/qr-code.css";
export function QRCodeExample() {
  return (
    <div className="code-demo" role="region" aria-label="QR Code example">
      <QRCode value="https://ecentry.dev" label="Open ecentryUI website" />
      <p>Scan to open ecentryUI</p>
    </div>
  );
}
