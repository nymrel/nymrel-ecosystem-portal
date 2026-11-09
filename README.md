# Nymrel Public Source Catalog

The Nymrel Ecosystem Portal is an evidence-bounded static catalog for the public
repositories visible in the nymrel GitHub organization. The current source
snapshot contains 32 repositories checked on 2026-11-05 UTC, including the public
`awesome-phone-call-agents` fork of [CALLE-AI/awesome-phone-call-agents](https://github.com/CALLE-AI/awesome-phone-call-agents).
The captured public GitHub metadata and latest
release responses are recorded in [docs/catalog-snapshot.json](docs/catalog-snapshot.json).

The portal deliberately separates:

- owner-supplied repository descriptions;
- observed GitHub source and release metadata;
- unassessed registry, license, validation, adoption, and revenue state.

A public repository is not, by itself, proof of a published package, live
deployment, customer activation, external adoption, or revenue.

## Build on Nymrel

Start with [A failed read is not an empty result](docs/EMPTY_IS_NOT_UNAVAILABLE.md):
an installed Source Read walkthrough that distinguishes a complete empty
inventory, findings and an unavailable source. It uses the published 0.2.0 API,
with separate, explicit source-candidate paths for later integrations.

For a routing decision, signed task claim or scoped CLI scan, try
[Review the next automation handoff](docs/AUTOMATION_HANDOFFS.md). It offers three
independent local walkthroughs pinned to merged, unreleased source, with
selected/blocked, authenticated-failure and incomplete-scan examples.

The developer entry offers four independent integration paths: Source Read for
known-empty versus unavailable source outcomes; the Nymrel Agent router source
entry for caller-owned model selection; PermitMesh for software-action policy
decisions; and Proof Ledger for artifact receipts and offline verification.
Each path links directly to its repository's setup guide and issue tracker.

The router entry is an unreleased source candidate and is absent from existing
v0.4.1 downloads. The other paths also retain their owning repository's source
installation and release boundaries. No registry installation is inferred from
a package name. `src/data/build-paths.ts` reuses canonical catalog identities and
feeds both the visible entry and generated machine catalog. Recheck its curated
availability notes when a component release changes.

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

The last source update is GitHub's repository-wide `pushed_at` timestamp, which
can include branch pushes. A missing primary language is labeled “Not reported.”
The snapshot query includes public, non-archived forks; it does not assert
original authorship, maturity, or activation for any repository. A GitHub release
is separate from a package registry publication or deployed service.

Repository descriptions are displayed as “GitHub repository description” and
must not be rewritten into independent portal claims. A repository's own
README, lockfiles, license, tests, release process, and served artifacts remain
authoritative for repository-level acceptance.

## Runtime and release boundary

- React 19.3, TypeScript 7, Vite 8, and Oxlint are exact-lockfile dependencies.
- Development and preview servers bind to loopback.
- CI uses immutable action SHAs, minimum token permissions, locked installs, a
  Node 22/24/26 compatibility matrix, and separate supply-chain checks.
- The static artifact contract enforces CSP integrity, source-map exclusion,
  build-size budgets, and generated-output custody.
- The browser interface includes reduced-motion handling, keyboard search,
  labeled controls, semantic dialogs, visible focus, and responsive layouts.

## External open-source contributions

Upstream contribution evidence is tracked in [OPEN_SOURCE.md](OPEN_SOURCE.md).
That index links to the authoritative external pull requests and distinguishes
merged work from active review.

## Company identity

Nymrel is the public company brand. JalenBuilds LLC is the legal entity. Nymrel
speaks as “we” on company surfaces. Contact: contact@nymrel.com.

## License

The portal source is MIT licensed. Licenses for cataloged repositories are
assessed in their own source trees and are not inferred by this portal.
