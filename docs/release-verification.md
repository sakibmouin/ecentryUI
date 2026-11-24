# React MVP release verification

The source catalog contains 115 entries with documentation, public APIs, contract tests, browser flows, and installable manifests. [Catalog evidence](catalog-evidence.md)

## Automated evidence

- Clean install, workspace build, typecheck, lint, and formatting checks.
- The first GitHub Actions run passed 324 Vitest tests, 148 Chromium Playwright tests, registry validation, the static documentation build, and both consumer builds. The follow-up Hover Card fix passed a focused browser regression test. [CI run](https://github.com/sakibmouin/ecentryUI/actions/runs/45357436322)
- Axe checks across the catalog's documented previews and interaction flows.
- Vite and Next.js fixtures that install and compile all 115 items. The fixtures also exercise production rendering and Next.js hydration.
- Firefox and WebKit keyboard spot checks for Tabs, Steps, and Skip Nav after hydration.
- Desktop and mobile screenshot captures for Status, Steps, Table, Tabs, Tag, Timeline, Checkmark, Theme, and Skip Nav. Representative light and dark previews were reviewed. Captures for the available appearances are stored in the local `.local/release-visual/` directory.

## Release gaps

The release gate remains open while complex widgets await manual screen-reader verification and the full catalog awaits light and dark visual baselines. The interactive playground currently covers Button. The documentation specification calls for a prop playground on every component page. [Release task](../tasks/todo.md) · [Component specification](specs/SPEC-react-components.md) · [Documentation specification](specs/SPEC-documentation.md)

| Browser and screen reader      | Manual coverage still required                                                         |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| Safari with VoiceOver on macOS | Accessible names, announcements, focus order and restoration, and composite navigation |
| Firefox with NVDA on Windows   | Accessible names, announcements, focus order and restoration, and composite navigation |

Include the complex collection, overlay, date, form, and navigation examples in each manual run. Record the browser and screen reader versions alongside the result.
