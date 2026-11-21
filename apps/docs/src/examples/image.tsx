import { Image } from "../../../../packages/react/src/components/image/image.js";
import "../../../../packages/react/src/components/image/image.css";
export function ImageExample() {
  return (
    <div className="code-demo" role="region" aria-label="Image example">
      <Image
        src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27180%27%3E%3Crect width=%27320%27 height=%27180%27 fill=%27%23116e5e%27/%3E%3C/svg%3E"
        alt="Green rectangle"
        width={320}
        height={180}
      />
    </div>
  );
}
