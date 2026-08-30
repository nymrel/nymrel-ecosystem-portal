# Nymrel Public Source Catalog

The Nymrel Ecosystem Portal is an evidence-bounded static catalog for the public
repositories visible in the nymrel GitHub organization. The current source
snapshot contains 29 repositories checked on 2026-08-30.

The portal deliberately separates:

- owner-supplied repository descriptions;
- observed GitHub source and release metadata;
- unassessed registry, license, validation, adoption, and revenue state.

A public repository is not, by itself, proof of a published package, live
deployment, customer activation, external adoption, or revenue.

## Local verification

Use Node 24.20.0 and npm 12.0.2:

~~~powershell
npm ci
npm run check
~~~

npm run check runs Oxlint, TypeScript 7, Node tests, the Vite 8 production
build, and the static release-boundary validator. The portal package is private,
has no package-publication workflow, and treats dist as generated output.

To regenerate both machine-readable catalog copies after an intentional source
snapshot change:

~~~powershell
npm run sync-llms
~~~

## Evidence model

src/data/ecosystem.ts is the catalog source of truth. Every record contains a
canonical GitHub source identity, captured primary language, default branch,
last source update, and observed latest GitHub release state. Fields not proven
by that inventory remain explicit not_assessed states.

Repository descriptions are displayed as “GitHub repository description” and
must not be rewritten into independent portal claims. A repository's own
README, lockfiles, license, tests, release process, and served artifacts remain
authoritative for repository-level acceptance.

## Runtime and release boundary

- React 19.2, TypeScript 7, Vite 8, and Oxlint are exact-lockfile dependencies.
- Development and preview servers bind to loopback.
- CI uses immutable action SHAs, minimum token permissions, locked installs, a
  Node 22/24/26 compatibility matrix, and separate supply-chain checks.
- The static artifact contract enforces CSP integrity, source-map exclusion,
  build-size budgets, and generated-output custody.
- The browser interface includes reduced-motion handling, keyboard search,
  labeled controls, semantic dialogs, visible focus, and responsive layouts.

## Company identity

Nymrel is the public company brand. JalenBuilds LLC is the legal entity. Nymrel
speaks as “we” on company surfaces. Contact: contact@nymrel.com.

## License

The portal source is MIT licensed. Licenses for cataloged repositories are
assessed in their own source trees and are not inferred by this portal.
