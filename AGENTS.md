# Repository Guidelines

## Project Structure & Module Organization

Approved product contracts live in `docs/specs/`, with the implementation sequence in `tasks/plan.md` and `tasks/todo.md`. Installed skill instructions live under `.agents/skills/`, with versions in `skills-lock.json`. There is no application source or test suite yet. Keep future source and tests close together and document the resulting layout in the README.

## Build, Test, and Development Commands

No package manifest, build script, or test runner is present, so there are no project commands to run yet. Add the install, development, build, lint, and test commands to the README when the application is introduced. Run those commands from the repository root and keep examples in this guide aligned with the actual scripts.

## Coding Style & Naming Conventions

Follow the formatter and linter configured by the codebase once they exist; do not impose a language style before a language is chosen. Use descriptive names, group files by feature or responsibility, and keep changes small and focused. Prefer simple, maintainable implementations over extra layers built for a one-off task.

## Testing Guidelines

There is no test framework or coverage threshold in this workspace. Add tests alongside new behavior and document their naming pattern and run command when a runner is configured. For bug fixes, reproduce the user-facing issue end to end before changing code, then verify the fix in the same flow. Resolve lint failures and flaky tests before considering work complete.

## Commit & Pull Request Guidelines

Always apply [git-workflow-and-versioning](.agents/skills/git-workflow-and-versioning/SKILL.md) for changes in this repository. Use focused commits with a descriptive `type: subject` message, as in `docs: clarify component guidance`. Pull requests should explain the change, link relevant issues, list verification performed, and include screenshots for visible UI changes. Do not add an agent co-author to commits or manually edit generated files or `CHANGELOG.md`.
