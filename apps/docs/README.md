# Documentation site

Run `npm run dev:docs` from the repository root for local editing. `npm run build:docs` creates a static HTML page for each route in `src/app.tsx` and bundles the hydrated React client into `apps/docs/dist/`. Run `npm run preview:docs` to inspect that production output. `npm run test:e2e -- docs-shell` checks direct routes, navigation, mobile layout, and the example tabs.

The current shell includes overview, examples, and routes for the first Button, Input, and Dialog component slices. Component pages are placeholders until their source, contracts, and registry items are complete. `src/examples/counter.tsx` is compiled as a live preview; the Code tab reads that same file during the build. Add new examples through this pattern so displayed source stays aligned with the preview.
