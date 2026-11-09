# Spec: MVP architecture and React API

## Architecture decision for review

Use an npm-workspaces TypeScript monorepo. Author each React component once as readable source, generate its registry payload and documentation examples from that source, and test the installed copy in consumer fixtures. Keep runtime foundations small: CSS variables and an optional appearance provider. Use native HTML controls for simple cases and a mature headless primitive layer for composite widgets when native behavior is insufficient. Choose and pin the primitive per widget during planning, with accessibility evidence before release.

Proposed layout:

```text
apps/docs/                 React documentation site and previews
packages/foundations/      Tokens, CSS, theme schema, appearance
packages/react/            Canonical component source and public types
packages/registry-schema/  Versioned item contract and validation
packages/cli/              Init, add, diff, update, doctor
registry/react/            Generated installable items and metadata
fixtures/consumers/        Vite and Next.js integration projects
docs/specs/                 Approved product contracts
```

The registry source is the primary consumption path. A component may depend on a small versioned behavior package, but its rendered markup, styles, and variants must remain in consumer-owned files. This prevents a hidden package implementation from defeating ownership. No network service is needed after installation.

## API rules

- Simple controls use one component with native props and `ref`, for example `<Button variant="solid" size="md" loading>Save</Button>`. Compound widgets expose a concise root plus named parts, for example `<Dialog.Root><Dialog.Trigger>Open</Dialog.Trigger><Dialog.Content><Dialog.Title>Settings</Dialog.Title></Dialog.Content></Dialog.Root>`. A convenience wrapper may reduce common boilerplate without hiding the compound API.
- Use `value`/`defaultValue`/`onValueChange` for values and `open`/`defaultOpen`/`onOpenChange` for disclosure. Do not invent different control names per component. Event callbacks expose the new value and an event detail when relevant; their order is documented.
- `variant`, `size`, and `color` select design defaults where meaningful. `className` styles the root; `classNames` or `slotProps` targets named parts. `asChild` is available only where composing a native element preserves semantics and refs. Component-specific options remain explicit instead of a universal opaque `config` object.
- Every component exports a public type, a recipe metadata record, and documented slots. Public imports use stable subpaths, such as `@/components/ui/dialog` in consumer projects. Internal hooks are not part of the public API unless deliberately documented.
- The default appearance and theme are ready after `init`; consumers can replace tokens and recipe defaults without adding a style runtime to their application. Styling has a documented layer order and no unqualified global selectors.

## Tooling and quality gate

Use npm workspaces, strict TypeScript, Vitest for pure and component contract tests, Playwright for real-browser interactions and visual baselines, and axe checks as an automated accessibility floor. Manual assistive-technology checks remain required for complex widgets. A repository script named `registry:validate` checks schema, hashes, dependency closure, generated-source consistency, and every install example. `build`, `typecheck`, `lint`, `test`, `test:e2e`, `dev:docs`, and `build:docs` are proposed root scripts, not current commands.

CI must run source tests, generated registry validation, consumer fixture builds, docs example compilation, docs build, accessibility checks, and browser interaction/visual tests before a complete-MVP release. Publish components and CLI under independent semver; record any breaking token or source changes with migration guidance. Do not manually edit generated registry files or a generated changelog.

## Acceptance

One source change updates the registry payload and docs preview without manual duplication. Installing a single component into a clean Vite or Next.js fixture builds and renders without importing unrelated components. A local consumer edit survives update or is presented as an explicit merge conflict. The public API for every catalog item follows the conventions above, and deviations are documented in its component contract and API reference.
