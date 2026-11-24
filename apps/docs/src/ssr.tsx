import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { App, routes } from "./app.js";

export { routes };

export function render(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const destination = new Writable({
      write(chunk: Buffer, _encoding, done) {
        chunks.push(chunk);
        done();
      },
      final(done) {
        resolve(Buffer.concat(chunks).toString("utf8"));
        done();
      },
    });
    destination.on("error", reject);
    const stream = renderToPipeableStream(<App routePath={path} />, {
      onAllReady() {
        stream.pipe(destination);
      },
      onError: reject,
    });
  });
}
