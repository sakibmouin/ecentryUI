# Repository Guidelines

## Project Structure & Module Organization

This repository currently contains `skills-lock.json` and the skill instructions under `.agents/skills/`. It has no application source, tests, or assets yet. When adding them, keep related code and tests close together, document the chosen layout in a README, and avoid introducing directories with no clear purpose. Treat `skills-lock.json` as the record of installed skills and consult the corresponding `SKILL.md` before using one.

## Build, Test, and Development Commands

No package manifest, build script, or test runner is present, so there are no project commands to run yet. Add the install, development, build, lint, and test commands to the README when the application is introduced. Run those commands from the repository root and keep examples in this guide aligned with the actual scripts.

## Coding Style & Naming Conventions

Follow the formatter and linter configured by the codebase once they exist; do not impose a language style before a language is chosen. Use descriptive names, group files by feature or responsibility, and keep changes small and focused. Prefer simple, maintainable implementations over extra layers built for a one-off task.

## Testing Guidelines

There is no test framework or coverage threshold in this workspace. Add tests alongside new behavior and document their naming pattern and run command when a runner is configured. For bug fixes, reproduce the user-facing issue end to end before changing code, then verify the fix in the same flow. Resolve lint failures and flaky tests before considering work complete.

## Commit & Pull Request Guidelines

This directory has no Git history, so it provides no established commit message convention. Until one is adopted, use concise imperative subjects that describe the change. Keep commits focused. Pull requests should explain the change, link relevant issues, list verification performed, and include screenshots for visible UI changes. Do not add an agent co-author to commits or manually edit generated files or `CHANGELOG.md`.
