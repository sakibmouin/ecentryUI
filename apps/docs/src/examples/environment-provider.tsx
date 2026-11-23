import { useRef, useState } from "react";
import {
  EnvironmentProvider,
  useEnvironment,
} from "../../../../packages/react/src/components/environment-provider/index.js";

function Probe() {
  const [result, setResult] = useState("");
  const environment = useEnvironment();
  return (
    <>
      <button
        type="button"
        onClick={() =>
          setResult(
            environment.getRootNode()?.nodeType === 11
              ? "Shadow root"
              : "Document",
          )
        }
      >
        Check root
      </button>
      <output>{result}</output>
    </>
  );
}

export function EnvironmentProviderExample() {
  const root = useRef<ShadowRoot | null>(null);
  return (
    <div className="code-demo">
      <div
        ref={(host) => {
          root.current = host
            ? (host.shadowRoot ?? host.attachShadow({ mode: "open" }))
            : null;
        }}
      />
      <EnvironmentProvider getRootNode={() => root.current ?? undefined}>
        <Probe />
      </EnvironmentProvider>
    </div>
  );
}
