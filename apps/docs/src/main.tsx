import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import { App } from "./app.js";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing documentation root");
const app = <App routePath={window.location.pathname} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
