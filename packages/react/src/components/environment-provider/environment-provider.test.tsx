// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { EnvironmentProvider, useEnvironment } from "./environment-provider.js";

afterEach(cleanup);

it("resolves owner document and window from a shadow root through nested providers", () => {
  const host = document.createElement("div");
  const root = host.attachShadow({ mode: "open" });
  function Probe() {
    const env = useEnvironment();
    return (
      <output>
        {String(
          env.getRootNode() === root &&
            env.getDocument() === document &&
            env.getWindow() === window,
        )}
      </output>
    );
  }
  render(
    <EnvironmentProvider getRootNode={() => root}>
      <EnvironmentProvider>
        <Probe />
      </EnvironmentProvider>
    </EnvironmentProvider>,
  );
  expect(screen.getByText("true")).toBeTruthy();
});

it("can represent an environment whose root is not available yet", () => {
  function Probe() {
    return <output>{String(useEnvironment().getDocument())}</output>;
  }
  render(
    <EnvironmentProvider getRootNode={() => undefined}>
      <Probe />
    </EnvironmentProvider>,
  );
  expect(screen.getByText("undefined")).toBeTruthy();
});
