# Repository Guidelines

## Project Structure & Module Organization

Approved product contracts live in `docs/specs/`; implementation status is in `tasks/todo.md`. npm workspaces are under `packages/` and `apps/`, with Vitest smoke tests in `tests/` and browser tests in `tests/e2e/`. Installed skill instructions live under `.agents/skills/`, with versions in `skills-lock.json`. Keep component tests beside their source as the catalog is built.

## Build, Test, and Development Commands

Run `npm ci`, `npm run build`, `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test -- --run`, and `npm run test:e2e` from the root. Use `npm run registry:generate` after changing canonical component source, then `npm run registry:validate`. See the [README](README.md) for command details and Playwright setup.

## Coding Style & Naming Conventions

Use strict TypeScript, two-space indentation, Prettier, and the root ESLint config. Use kebab-case component folders and PascalCase React exports. Group files by feature or responsibility and keep changes small and focused.

## Testing Guidelines

Vitest runs `*.test.ts` and `*.test.tsx`; Playwright runs `tests/e2e/*.spec.ts`. Add tests alongside new behavior. For bug fixes, reproduce the user-facing issue end to end before changing code, then verify the fix in the same flow. Resolve lint failures and flaky tests before considering work complete.

## Commit & Pull Request Guidelines

Always apply [git-workflow-and-versioning](.agents/skills/git-workflow-and-versioning/SKILL.md) for changes in this repository. Use focused commits with a descriptive `type: subject` message, as in `docs: clarify component guidance`. Pull requests should explain the change, link relevant issues, list verification performed, and include screenshots for visible UI changes. Do not add an agent co-author to commits or manually edit generated files or `CHANGELOG.md`.
