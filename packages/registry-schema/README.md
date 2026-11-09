# Registry schema

`@ecentry/registry-schema` creates a versioned React item manifest from canonical component source. `generateRegistryItem` reads declared files, produces their SHA-256 hashes, and sorts file and dependency records for stable output. `validateRegistry` checks IDs, paths, hashes, package ranges, and the dependency graph. It returns dependency-first order for installation.

Place generated items under `registry/react/<id>/` with `manifest.json` and payload files. The canonical source for `registry/react/button/button.tsx` is `packages/react/src/components/button/button.tsx`. Run `npm run registry:validate` from the repository root to check every generated item against its canonical source. Generated items must be produced by the registry build, never edited by hand.

The manifest declares `schemaVersion: 1`, component `version`, `framework: "react"`, `files`, `hashes`, registry `dependencies`, optional `npmDependencies`, `peerDependencies`, required `tokens`, an HTTPS `docsUrl`, and `license: "MIT"`. No executable commands are accepted.
