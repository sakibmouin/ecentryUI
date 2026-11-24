# ecentryUI

ecentryUI is a planned open-source, AI-native UI component library and design platform. The first release focuses on a comprehensive React component catalog, consumer-owned source, accessible interactions, adaptable themes, and detailed documentation. Other frameworks, charts, and AI design tools are planned for later phases.

The specifications are approved. The npm and TypeScript workspace, registry, documentation shell, and first components are in place. The React catalog is being built in the order recorded in `tasks/todo.md`.

- [Read the specifications](docs/specs/README.md)
- [Review the implementation plan](tasks/plan.md)

## Source updates

Use `ecentry diff <component>` or `ecentry add <component> --diff` to compare local files with the registry. Run `ecentry update <component> --dry-run` to preview a three-way merge. An interactive update shows the proposed changes before asking for confirmation. Keep `ecentry.lock.json` in version control so updates have the installed base for comparison.

If changes overlap, the CLI prints the local, base, and registry versions. Edit the local file to resolve the overlap, then rerun the update. Older installs with no recorded base can be tracked by updating against the original registry snapshot when the source matches it.

Use `ecentry doctor [components] --offline --registry <directory>` to verify configuration, registry integrity, source files, and installed package versions with a local snapshot. Omitting the directory uses the bundled snapshot. Doctor reports that it cannot verify remote freshness. CLI 0.0.x supports registry schema 1. Component versions are recorded independently in each manifest.

## Development

Run these commands from the repository root:

- `npm ci` installs the locked workspace dependencies.
- `npm run build` compiles the TypeScript packages.
- `npm run typecheck` checks package and test types without emitting files.
- `npm run lint` checks source and test files with ESLint.
- `npm run format:check` checks formatting with Prettier.
- `npm test -- --run` runs Vitest once.
- `npm run registry:validate` checks generated component payloads against canonical source.
- `npm run registry:generate` refreshes installable component source from canonical files.
- `npm run dev:docs` starts the documentation site locally.
- `npm run build:docs` creates static documentation pages and client assets.
- `npm run test:docs` checks the generated catalog and documentation search.
- `npm run test:consumer -- vite` installs a sample item in a clean Vite project and checks its production render.
- `npm run test:consumer -- next` verifies the sample item in a clean Next.js project, including SSR and hydration.
- `npx playwright install chromium` installs the browser used by `npm run test:e2e`.

Foundation, registry, CLI, and component tests through Bleed are active. Component and documentation coverage grows with each implementation task.

Licensed under [MIT](LICENSE).
