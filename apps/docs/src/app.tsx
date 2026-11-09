import { useState } from "react";
import { CounterExample } from "./examples/counter.js";
import { ExamplePanel } from "./example-panel.js";
import counterSource from "./examples/counter.tsx?raw";
import ButtonDocs from "../content/components/button.mdx";
import InputDocs from "../content/components/input.mdx";
import DialogDocs from "../content/components/dialog.mdx";
import AbsoluteCenterDocs from "../content/components/absolute-center.mdx";

export const routes = [
  "/",
  "/guides/examples/",
  "/components/button/",
  "/components/input/",
  "/components/dialog/",
  "/components/absolute-center/",
] as const;

const componentLinks = [
  { title: "Button", href: "/components/button/" },
  { title: "Input", href: "/components/input/" },
  { title: "Dialog", href: "/components/dialog/" },
  { title: "Absolute Center", href: "/components/absolute-center/" },
];

function Home() {
  return (
    <>
      <div className="eyebrow">
        <span className="eyebrow-line" /> React foundations, built for ownership
      </div>
      <h1>
        Build with clarity<span className="accent-dot">.</span>
      </h1>
      <p className="lead">
        A considered component library for interfaces that feel coherent from
        the first screen to the last detail.
      </p>
      <div className="hero-actions">
        <a className="primary-link" href="/guides/examples/">
          Explore examples <span aria-hidden="true">↗</span>
        </a>
        <a className="secondary-link" href="/components/button/">
          Browse components <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="section-divider" />
      <div className="intro-grid">
        <div>
          <span className="section-index">01 / FOUNDATIONS</span>
          <h2>Designed to fit your system</h2>
        </div>
        <p>
          Start with useful defaults, then shape tokens, component source, and
          interaction details around your product. Each piece stays readable and
          close to the code that uses it.
        </p>
      </div>
      <div className="feature-row">
        <div>
          <span className="feature-icon">◌</span>
          <h3>Accessible by design</h3>
          <p>
            Semantic controls, visible focus, and careful keyboard behavior are
            part of the component contract.
          </p>
        </div>
        <div>
          <span className="feature-icon">◐</span>
          <h3>Appearance in sync</h3>
          <p>
            Light and dark values follow one token system, including nested
            surfaces and portals.
          </p>
        </div>
        <div>
          <span className="feature-icon">◇</span>
          <h3>Source you can own</h3>
          <p>
            Install the components you need as editable source in your own
            application.
          </p>
        </div>
      </div>
    </>
  );
}

function Examples() {
  return (
    <>
      <div className="breadcrumb">
        Guides <span>/</span> Examples
      </div>
      <span className="section-index">GUIDE 01</span>
      <h1>Examples</h1>
      <p className="lead">
        See a live preview, then inspect the exact source used to render it.
      </p>
      <h2>Interactive preview</h2>
      <p>
        Use the button below to change its value. Switch to Code to see the
        compiled example source.
      </p>
      <ExamplePanel source={counterSource}>
        <CounterExample />
      </ExamplePanel>
    </>
  );
}

function ComponentPage({ name }: { name: string }) {
  return (
    <>
      <div className="breadcrumb">
        Components <span>/</span> {name}
      </div>
      <span className="section-index">COMPONENT REFERENCE</span>
      <h1>{name}</h1>
      <p className="lead">
        The {name} component reference is being built with live examples,
        states, accessibility notes, and its source-owned install path.
      </p>
      <div className="notice">
        <span className="notice-mark">↗</span>
        <div>
          <strong>Implementation in progress</strong>
          <p>
            This route is ready for the component slice. Its examples and API
            reference will appear when the component source lands.
          </p>
        </div>
      </div>
      <h2>Explore the library</h2>
      <p>
        Visit the <a href="/guides/examples/">examples guide</a> to see how live
        previews and source tabs work.
      </p>
    </>
  );
}

export function App({ routePath }: { routePath: string }) {
  const [navOpen, setNavOpen] = useState(false);
  const route = routePath.endsWith("/") ? routePath : `${routePath}/`;
  const active = componentLinks.find((link) => link.href === route);
  return (
    <div className="site-shell">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="/">
          <span className="brand-symbol" aria-hidden="true">
            e<span>✳</span>
          </span>
          <span>
            ecentry<span className="brand-light">UI</span>
          </span>
        </a>
        <div className="header-right">
          <span className="version-pill">React · 0.0.0</span>
          <button
            className="nav-toggle"
            type="button"
            aria-label={navOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={navOpen}
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>
      <div className="body-shell">
        <aside
          className={`sidebar ${navOpen ? "sidebar-open" : ""}`}
          aria-label="Documentation navigation"
        >
          <nav>
            <div className="nav-group">
              <div className="nav-label">START HERE</div>
              <a href="/" aria-current={route === "/" ? "page" : undefined}>
                Overview
              </a>
              <a
                href="/guides/examples/"
                aria-current={
                  route === "/guides/examples/" ? "page" : undefined
                }
              >
                Examples
              </a>
            </div>
            <div className="nav-group">
              <div className="nav-label">COMPONENTS</div>
              {componentLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={route === link.href ? "page" : undefined}
                >
                  {link.title}
                </a>
              ))}
            </div>
          </nav>
          <div className="sidebar-note">
            <span className="sidebar-note-icon">✳</span>
            <p>Made for thoughtful interfaces and the people building them.</p>
          </div>
        </aside>
        <main id="content" className="main-content">
          <div className="content-inner">
            {route === "/" ? (
              <Home />
            ) : route === "/guides/examples/" ? (
              <Examples />
            ) : route === "/components/button/" ? (
              <ButtonDocs />
            ) : route === "/components/input/" ? (
              <InputDocs />
            ) : route === "/components/dialog/" ? (
              <DialogDocs />
            ) : route === "/components/absolute-center/" ? (
              <AbsoluteCenterDocs />
            ) : active ? (
              <ComponentPage name={active.title} />
            ) : (
              <>
                <h1>Page not found</h1>
                <p>
                  <a href="/">Return to overview</a>
                </p>
              </>
            )}
          </div>
          <footer>
            <span>ecentryUI</span>
            <span>Designed for the details.</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
