# ecentryUI

ecentryUI is a planned open-source, AI-native UI component library and design platform. The first release focuses on a comprehensive React component catalog, consumer-owned source, accessible interactions, adaptable themes, and detailed documentation. Other frameworks, charts, and AI design tools are planned for later phases.

The specifications are approved. The npm and TypeScript workspace, registry, documentation shell, and first components are in place. The React catalog is being built in the order recorded in `tasks/todo.md`.

- [Read the specifications](docs/specs/README.md)
- [Review the implementation plan](tasks/plan.md)

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
- `npm run test:consumer -- vite` installs a sample item in a clean Vite project and checks its production render.
- `npm run test:consumer -- next` verifies the sample item in a clean Next.js project, including SSR and hydration.
- `npx playwright install chromium` installs the browser used by `npm run test:e2e`.

Foundation, registry, CLI, Button, Input, Dialog, Absolute Center, and Aspect Ratio tests are active. Component and documentation coverage grows with each implementation task.

Licensed under [MIT](LICENSE).
