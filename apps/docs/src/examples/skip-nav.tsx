import {
  SkipNavContent,
  SkipNavLink,
} from "../../../../packages/react/src/components/skip-nav/index.js";

export function SkipNavExample() {
  return (
    <div className="code-demo" style={{ position: "relative" }}>
      <SkipNavLink targetId="skip-nav-example-content">
        Skip to report
      </SkipNavLink>
      <button type="button">Report menu</button>
      <SkipNavContent id="skip-nav-example-content">
        <p>Quarterly report</p>
        <button type="button">Download report</button>
      </SkipNavContent>
    </div>
  );
}
