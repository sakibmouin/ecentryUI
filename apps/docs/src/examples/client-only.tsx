import { ClientOnly } from "../../../../packages/react/src/components/client-only/index.js";

export function ClientOnlyExample() {
  return (
    <div className="code-demo">
      <ClientOnly fallback={<p>Checking this browser…</p>}>
        {() => <p>Viewport width: {window.innerWidth} px</p>}
      </ClientOnly>
    </div>
  );
}
