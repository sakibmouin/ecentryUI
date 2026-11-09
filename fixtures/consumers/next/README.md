# Next.js consumer fixture

Run `npm run test:consumer -- next` from the repository root. The runner creates an ignored temporary project, packs the built foundations package, generates a local registry item, runs a clean npm install, and uses the CLI to initialize and add the item. It then builds an App Router static export, checks that the component is present in the server-rendered HTML, and opens the result in a browser to verify hydration and the overridden text token.

`registry-source/sample.tsx` is fixture source for this install test. It is not a public catalog component. The real component tasks will replace the sample in release consumer gates.
