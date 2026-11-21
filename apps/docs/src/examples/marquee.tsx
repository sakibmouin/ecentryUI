import { Marquee } from "../../../../packages/react/src/components/marquee/marquee.js";
import "../../../../packages/react/src/components/marquee/marquee.css";
export function MarqueeExample() {
  return (
    <div className="code-demo" role="region" aria-label="Marquee example">
      <Marquee>
        <span>Design with clarity</span>
        <span>Build with care</span>
        <span>Ship with confidence</span>
      </Marquee>
    </div>
  );
}
