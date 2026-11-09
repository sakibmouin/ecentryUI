# Vite consumer fixture

Run `npm run test:consumer -- vite` from the repository root. The runner creates an ignored temporary project, packs the built foundations package, generates a local registry item, performs a clean npm install, runs `ecentry init` and `ecentry add`, and builds the Vite application. A browser check then confirms that the installed component renders with the overridden text token. The temporary project is removed after the check.

`registry-source/sample.tsx` is fixture source for this install test, not a public catalog component. The real component tasks will replace the sample in the release consumer gates.
