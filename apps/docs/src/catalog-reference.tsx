import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import catalog from "virtual:ecentry-docs-catalog";
import { searchDocs } from "./search.js";

export function DocsSearch() {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const showResults = expanded && query.trim().length > 0;
  const results = showResults ? searchDocs(catalog, query) : [];

  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      input.current?.focus();
      setExpanded(false);
      event.preventDefault();
      return;
    }
    if (!showResults || (event.key !== "ArrowDown" && event.key !== "ArrowUp"))
      return;
    const targets = Array.from(
      event.currentTarget.querySelectorAll<
        HTMLInputElement | HTMLAnchorElement
      >("input, a"),
    );
    const index = targets.findIndex((target) => target === event.target);
    if (index < 0) return;
    const step = event.key === "ArrowDown" ? 1 : -1;
    targets[(index + step + targets.length) % targets.length]?.focus();
    event.preventDefault();
  }

  return (
    <div
      role="search"
      className="docs-search"
      onKeyDown={navigate}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setExpanded(false);
      }}
    >
      <input
        ref={input}
        type="search"
        aria-label="Search docs"
        placeholder="Search docs"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setExpanded(true);
        }}
        onFocus={() => setExpanded(true)}
        aria-controls={showResults ? id : undefined}
      />
      {showResults && (
        <div id={id} className="docs-search-results">
          {results.length ? (
            <ul aria-label="Search results">
              {results.map(({ title, href, match }) => (
                <li key={href}>
                  <a href={href}>
                    {title}
                    {match && <code>{match}</code>}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p role="status">No matching docs.</p>
          )}
        </div>
      )}
    </div>
  );
}

export function CatalogReference({ href }: { href: string }) {
  const entry = catalog.find((item) => item.href === href);
  if (!entry) return null;

  return (
    <section aria-labelledby="api-reference">
      <h2 id="api-reference">API reference</h2>
      <p>
        Registry version <code>{entry.version}</code>.
      </p>
      {entry.api.length === 0 && (
        <p>This component uses native element attributes.</p>
      )}
      {entry.api.map(({ name, props }) => {
        const described = props.some((prop) => prop.description);
        return (
          <div
            key={name}
            className="api-scroll"
            role="region"
            aria-label={name}
            tabIndex={0}
          >
            <table>
              <caption>{name}</caption>
              <thead>
                <tr>
                  <th scope="col">Prop</th>
                  <th scope="col">Type</th>
                  <th scope="col">Required</th>
                  {described && <th scope="col">Description</th>}
                </tr>
              </thead>
              <tbody>
                {props.map((prop) => (
                  <tr key={prop.name}>
                    <th scope="row">
                      <code>{prop.name}</code>
                    </th>
                    <td>
                      <code>{prop.type}</code>
                    </td>
                    <td>{prop.required ? "Yes" : "No"}</td>
                    {described && <td>{prop.description}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </section>
  );
}
