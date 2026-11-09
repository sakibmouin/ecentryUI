import { renderToString } from "react-dom/server";
import { App, routes } from "./app.js";

export { routes };
export function render(path: string): string {
  return renderToString(<App routePath={path} />);
}
