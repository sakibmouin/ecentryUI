# Spec: documentation

## Objective

Ship a documentation website that makes the complete React MVP discoverable, teachable, and verifiable. It needs organized component navigation, live previews, editable examples, detailed states and props, and clear styling guidance. The site must have its own visual identity and original content.

## Information architecture

- Global: landing page, quick start, installation and CLI, migration guidance, design foundations, theming, accessibility, component catalog, patterns, troubleshooting, contribution, and release notes. Component navigation is grouped by the families in `SPEC-react-components.md`.
- Every component page includes: purpose and when to use; install command; import and minimal example; live preview with code/source toggle; interactive prop playground; variants and sizes; states; keyboard and screen-reader behavior; anatomy/slots and styling hooks; prop and event reference; controlled/uncontrolled examples; SSR/RTL/color-mode notes; related components; and a link to its catalog matrix row.
- Examples must demonstrate actual registry-installed source, be editable without evaluating arbitrary untrusted code on the docs origin, and support copy/install actions. If a component has no variants, the page says so instead of displaying empty sections. Advanced examples cover composition, forms, validation, async/loading, and responsive use where applicable.
- Search indexes components, guides, props, and example titles. Keyboard navigation, deep links, version labels, and responsive side navigation must work without a mouse. Every page has stable URLs and descriptive titles.

## Playground and reference contract

Playground controls are generated from a typed component metadata schema but may be curated when props are not serializable. The preview and code must reflect the same state. The API table is generated from reviewed public types and enriched with human-written descriptions; internal props are hidden. The source links point to exact versioned registry items. Code examples compile in CI and are tested after registry generation so docs cannot drift.

Provide at least one runnable example for each distinct documented capability in a component contract. Maintain a visible release-version selector or notice so examples are clearly tied to the installed ecentryUI version.

## Proposed structure and commands

Proposed `apps/docs/` holds routes, content, previews, playgrounds, search index, and public assets. `registry/react/` and public type metadata are the sources for install and API tables. Use semantic HTML, accessible headings, code syntax highlighting, responsive layouts, and original typography/color tokens. Proposed commands: `npm run dev:docs`, `npm run build:docs`, `npm run lint`, `npm run typecheck`, `npm run test:docs`, and `npm run test:e2e`. None exist yet.

## Acceptance and testing

Every catalog component page resolves and contains a working default preview, install instructions, API reference, accessibility notes, and at least one interactive example. Search returns expected results for names, aliases, props, and states. Playgrounds synchronize controls, preview, and copyable code. Browser tests cover navigation, theme switching, keyboard-only use, mobile layout, deep links, example errors, and docs build output. CI checks links, code compilation, page metadata, accessibility, and visual baselines at desktop and mobile widths. No critical/serious axe violations or clear layout defects remain at release.

## Boundaries and open decisions

Always disclose which examples need optional dependencies. Ask before changing the public URL scheme. Never ship a playground that executes arbitrary visitor code with access to the docs origin. Open decision: choose static rendering with isolated preview sandboxes by default; confirm the deployment host during implementation planning.
