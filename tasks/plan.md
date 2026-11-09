# ecentryUI React MVP implementation plan

**Goal:** Ship the approved React component catalog, source-owned installation, accessible themes, and a complete documentation website.

**Spec:** [Capability map](../docs/specs/CAPABILITY-MAP.md), [architecture and API](../docs/specs/SPEC-architecture-and-api.md), [foundations](../docs/specs/SPEC-design-foundations.md), [components](../docs/specs/SPEC-react-components.md), [interactions](../docs/specs/SPEC-react-interactions.md), [distribution](../docs/specs/SPEC-distribution.md), and [documentation](../docs/specs/SPEC-documentation.md).

**Task list:** [tasks/todo.md](todo.md) is the execution checklist. This plan fixes sequence, interfaces, files, and release gates. The component catalog tasks use one standard contract so each remains a small, independently verifiable slice.

## Status and assumptions

The repository has approved specifications but no application code, package manifest, scripts, or tests. The first implementation task creates the workspace. React is the only MVP framework. Charts, other frameworks, AI tooling, and a visual builder remain later phases. The catalog in `SPEC-react-components.md` is frozen for the MVP. Each component must have polished visual and functional quality, using original ecentryUI source, tokens, assets, and API.

Package analysis informed the component inventory, architecture, and styling decisions. Static analysis does not prove browser behavior. During implementation, capture real-browser interaction and visual evidence for representative components and all complex widgets before considering a row complete. Keep research notes and captures in ignored `.local/`; do not add third-party assets or analysis records to the public repository.

## Architecture and file map

| Path | Responsibility |
| --- | --- |
| `package.json`, `package-lock.json`, `tsconfig.base.json` | npm workspace scripts, dependency lock, strict TS baseline |
| `packages/foundations/src/` | Token schema, semantic values, CSS output, appearance provider |
| `packages/react/src/components/<id>/` | Canonical source, local styles, contract tests for one component |
| `packages/react/src/index.ts` | Reviewed public exports only |
| `packages/registry-schema/src/` | Versioned item manifest, validation, dependency resolution |
| `packages/cli/src/` | `init`, `add`, `diff`, `update`, `doctor` |
| `registry/react/<id>/` | Generated installable source and metadata; never hand-edit |
| `apps/docs/` | Static-rendered guides, component pages, previews, playgrounds, search |
| `fixtures/consumers/vite/`, `fixtures/consumers/next/` | Real install, build, SSR, and customization checks |
| `tasks/todo.md` | Execution status, one bounded task per component and checkpoint |

Core interfaces: `createTheme(config): Theme`, `resolveTokens(theme, appearance): TokenMap`, `renderThemeCss(theme): string`; `RegistryItem` with `id`, `version`, `framework`, `files`, `dependencies`, `peerDependencies`, and `hashes`; `installItems(ids, projectConfig, options): InstallPlan`; shared React naming follows `value/defaultValue/onValueChange` and `open/defaultOpen/onOpenChange`. Lock these public shapes in types and tests before dependent tasks. Use CSS variables and cascade layers for styling; prefer native controls and evaluate a headless primitive per complex widget, starting with Accordion, Dialog, and Combobox. A primitive's license, accessibility, bundle impact, SSR, and consumer-owned source boundary must be reviewed before adoption. Keep each component's API and state metadata beside its source; generate the catalog matrix and API tables from that metadata.

## Work sequence

### 0. Reference and workspace gate

Capture representative desktop/mobile, light/dark, focus, hover, disabled, overlay, and form states. Record layout measurements, token values, animation behavior, and keyboard interactions in `.local/`, which Git ignores. Set an ecentryUI visual direction using original assets. Live browser inspection is required before visual acceptance. Create npm workspaces and one passing smoke test; document executable root commands.

### 1. Foundations and first vertical slice

Implement token schema, resolver, CSS-variable output, appearance behavior, responsive rules, and global focus/motion defaults. Then deliver Button end to end: canonical component, tests, generated registry item, consumer install, docs page, browser flow, and visual baseline. This validates the whole pipeline before multiplying it across the catalog. Follow with Input and Dialog to test native form and overlay architecture. Checkpoint: the three slices install into Vite and Next.js fixtures, both appearances render, SSR hydrates, keyboard flows work, and the docs build passes.

### 2. Catalog waves

Work in dependency order: layout and typography; actions and forms; collections and overlays; disclosure and feedback; data/media; utilities and internationalization. A catalog task owns at most one component's canonical source, style file, contract test, docs page, and public export. Registry files and the catalog matrix are generated. A complex widget may be split into behavior and presentation/docs tasks as shown in the checklist. Every task starts with a failing contract test, then implementation, then focused test and browser verification. Common acceptance: default visual, applicable variants/states, controlled/uncontrolled behavior, native or ARIA semantics, keyboard/touch interaction, light/dark/RTL, docs example, and source install. The component-specific behavior is in `SPEC-react-interactions.md` and its task row. Checkpoints follow each family wave.

### 3. Distribution and docs completion

Finish registry schema validation, deterministic generation, dependency closure, path safety, CLI init/add/dry-run/diff/update/doctor, and local-edit preservation. Finish docs navigation, search, playgrounds, API tables from public types, examples, accessibility guidance, mobile layout, and versioning. Verify every catalog component has a working page and install path. Use a static-rendered React docs site with isolated previews; select the hosting target during execution without changing the public URL contract.

### 4. Release hardening

Run the full unit, type, lint, registry, consumer fixture, browser, accessibility, and visual suites. Review keyboard and screen-reader behavior for complex widgets. Audit bundle composition and optional dependencies. Resolve all failing tests, flaky tests, critical/serious accessibility findings, broken links, and clear visual defects. Publish no complete-MVP claim until every catalog row has completion evidence.

## Verification commands to create in the first tasks

`npm ci`; `npm run build`; `npm run typecheck`; `npm run lint`; `npm test -- --run`; `npm run test:e2e`; `npm run registry:validate`; `npm run build:docs`. These are planned commands, not runnable now. Component tasks use `npm test -- --run packages/react/src/components/<id>/<id>.test.tsx` and a targeted browser test. Every 2-3 tasks, run the focused suite; every wave, run all root gates and install/build both consumer fixtures.

## Review focus

1. A locally edited installed component survives an update, or produces an explicit conflict without data loss.
2. Appearance changes during SSR hydration do not flash the wrong theme or break a portalled overlay.
3. Keyboard focus remains visible and returns to the trigger after nested overlays close.
4. Form controls submit, reset, validate, and announce errors in controlled and uncontrolled modes.
5. Optional heavy components do not enter a consumer bundle that installs only Button.

## Risks and gates

| Risk | Gate |
| --- | --- |
| Benchmark static evidence misses runtime behavior | Real-browser capture and human visual review before component acceptance |
| A shared styling or primitive decision makes later components inconsistent | Validate Button, Input, and Dialog first; freeze contracts after that checkpoint |
| Source-owned updates overwrite user changes | Three-way merge tests and no-write dry runs before enabling update |
| Large catalog creates documentation drift | Generate registry and API metadata from canonical source; compile examples in CI |
| Accessibility regressions in complex widgets | APG contract tests, axe checks, manual assistive-technology matrix |

## Execution boundary

This plan does not authorize implementation by itself. Review the plan and checklist before the first workspace task. No large agent swarm is part of the plan; any parallel agent work requires the user to request it explicitly.
