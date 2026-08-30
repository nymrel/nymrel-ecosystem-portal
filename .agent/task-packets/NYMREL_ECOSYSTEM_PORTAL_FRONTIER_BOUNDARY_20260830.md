# Nymrel ecosystem portal frontier release and hosting boundary

- `task_id`: `NYMREL_FULL_OPTIMIZATION_CAMPAIGN_20260829`
- `claim_id`: `codex-nymrel-ecosystem-portal-frontier-boundary-20260830`
- `owner_agent`: `codex`
- `status`: `candidate_ready_for_independent_review`
- `repo`: `nymrel-ecosystem-portal`
- `canonical_base`: `385d55de9db68818cfe9c18d9a9932ac2f224c8f`
- `branch`: `codex/nymrel-ecosystem-portal-frontier-boundary-20260830`
- `worktree`: `C:\Users\johns\Desktop\nymrel-ecosystem-portal-frontier-boundary-20260830`

## Objective

Replace the portal's fail-open package-publication and hosting boundary with a deterministic, least-privilege static-site delivery contract using current stable React/Vite tooling, local-only development listeners, truthful headers, lint/type/test/build/security/performance gates, and exact artifact checks.

## Admission evidence

- Live `origin/main` is `385d55de9db68818cfe9c18d9a9932ac2f224c8f`; no open pull request or active bus claim existed for this repository at admission.
- The primary checkout is three commits behind live `origin/main` and has ten uncommitted catalog/UI/document changes plus `.agent/`; those bytes remain outside this lane.
- The default branch has only `.github/workflows/publish.yml`. It uses mutable action tags, Node 18/20, `npm ci || npm install`, `continue-on-error`, an audit that cannot fail, repository-wide `id-token: write`, and tag-triggered npm publication without an integrated-main ancestry check.
- The repository is a Cloudflare Pages static site but advertises a public npm package boundary and `publishConfig`; no source consumer contract justifies publishing the portal as a library.
- Production headers include a fabricated `X-Machine-Trust` score and UCP assertion, broad CORS/authorization exposure, and a script CSP that permits arbitrary inline script.
- The Vite 6/React 18 baseline is outside current supported/current upstream lines. Current official evidence supports Vite 8.2, React 19.2, TypeScript 7, and Node 22.12+; the accepted local candidate uses type-aware Oxlint with its pinned tsgolint bridge.

## Claimed write scope

- `.agent/task-packets/NYMREL_ECOSYSTEM_PORTAL_FRONTIER_BOUNDARY_20260830.md`
- `.github/dependabot.yml`
- `.github/workflows/ci.yml`
- `.github/workflows/publish.yml`
- `.gitignore`
- `.node-version`
- `.npmrc`
- `.oxlintrc.json`
- `CONTRIBUTING.md`
- `README.md` (current-main runtime, validation, and non-publication truth only)
- `SECURITY.md`
- `dist/**`
- `index.html`
- `llms.txt`
- `package-lock.json`
- `package.json`
- `public/_headers`
- `public/_routes.json`
- `public/llms.txt`
- `scripts/check-portal.mjs`
- `scripts/generate-llms.mjs`
- `src/App.tsx`
- `src/components/DualAudienceFooter.tsx`
- `src/components/Header.tsx`
- `src/components/HeroSection.tsx`
- `src/components/InteractivePlayground.tsx`
- `src/components/QuickstartDrawer.tsx`
- `src/components/ToolDetailModal.tsx`
- `src/components/ToolGrid.tsx`
- `src/data/ecosystem.ts`
- `src/main.tsx`
- `src/styles/theme.css`
- `src/theme/tokens.ts`
- `test/catalog-truth.test.js`
- `test/catalog.test.js` (only the independently reproduced current-main lineage assertion)
- `test/release-boundary.test.js`
- `test/search-filter.test.js`
- `tsconfig.json`
- `vite.config.ts`
- `wrangler.toml`

## No-touch scope

- The dirty primary checkout and all of its uncommitted bytes.
- No remaining primary-checkout implementation path may be overwritten in place. The current-main branch may independently reimplement the same truth-boundary intent only inside this isolated worktree; the primary dirty bytes remain intact for comparison and rollback.
- Catalog facts not returned by the captured public GitHub inventory, public deployment/provider configuration, Cloudflare account state, DNS, secrets, npm ownership, tags, releases, package publication, customer activation, analytics, and revenue.

## Required result

- A private static-site package contract with exact supported Node/npm and deterministic installs.
- Current stable React/Vite runtime and compiler versions, accepted only after the full local ladder passes.
- A fast, committed lint policy plus strict TypeScript, existing tests, build, audit, and artifact validation.
- Fail-closed CI on current supported Node lines with immutable action identities, least privilege, concurrency control, timeouts, and no publish path.
- Loopback-only dev/preview listeners, truthful static response headers, bounded caching/routing, and no fabricated trust score or UCP assertion.
- Generated `dist/` removed from source control and reproducibly rebuilt by CI/provider tooling.
- Exact independent review before any branch publication; no merge, deploy, provider, tag, registry, customer, or revenue claim.

## Validation

- Locked clean install; lint; strict typecheck; existing tests; production build; npm audit.
- Static artifact contract: size budget, no source maps, required route/discoverability files, security headers, and package privacy.
- actionlint, Zizmor confidence threshold, structured-file parsing, and exact scoped diff.
- Local browser/accessibility/performance verification when the built artifact is ready, with every spawned server/browser closed afterward.
- Independent exact-tree acceptance and remote object verification if a draft branch is published.

## Stop conditions

Stop before adopting any dirty primary byte, editing a catalog/marketing claim, weakening a gate to accommodate a failure, creating a tag or registry release, mutating Cloudflare/DNS/provider/account state, deploying, or translating source/build proof into customer, adoption, revenue, or public-production proof.

## Baseline result and bounded scope expansion

- Clean `npm ci`, strict typecheck, production build, and high-severity audit passed on exact `origin/main`; the build produced a 246.50 kB JavaScript asset (70.93 kB gzip) and no audit findings.
- The default branch test ladder is red at 11/12 because `test/catalog.test.js` still expects `Nymrel -> JalenBuilds LLC` after the canonical catalog changed the value to `Nymrel (legalName: JalenBuilds LLC)`.
- The dirty primary copy also retains the old arrow-form assertion and does not contain the current-main repair. The claim therefore adds only this exact test path for an independently derived one-line repair; none of the surrounding dirty primary test changes may be adopted.
- The runtime upgrade would otherwise leave the current-main TypeScript 5.7 badge and npm-oriented validation guidance false. `README.md` is therefore added only for independently authored runtime/check/non-publication truth; the dirty primary README capture is not adopted.

## Browser-discovered scope expansion

- Built-page inspection had zero console warnings/errors and loaded only static resources, but exposed material content and interaction defects: stale `10+` copy against the then-28-entry catalog; unsupported `v1.0.0`, zero-dependency, install, package, and “machine trust” claims; future npm commands for unpublished packages; deterministic price, hours-saved, and value-generated outputs presented without customer or pricing evidence; and weak anchor/dialog/label semantics.
- A prior released/no-push task packet in the dirty primary checkout established the correct evidence-state intent for the older ten-entry catalog. Adoption decision: **adapt** the evidence-state model; **reject** its stale coverage and any future package commands; independently rebuild the current 29-entry surfaces. The old bytes remain untouched.
- The expanded result must make source availability distinct from registry publication, runnable installation, local validation, hosted deployment, external adoption, and revenue. It must remove fabricated commercial outputs and label any local protocol/receipt visualization as an illustrative fixture rather than live agent activity or production attestation.

## Candidate acceptance evidence

- Captured all 29 public repositories returned by the Nymrel GitHub organization inventory on 2026-08-30. Repository descriptions remain explicitly attributed to their owners; license, registry, validation, adoption, and revenue fields remain unassessed.
- Upgraded to React 19.2.8, Vite 8.2.2, TypeScript 7.0.2, Oxlint 1.80.0 with type-aware tsgolint 7.0.2001, Lucide React 1.37.0, Node 24.20.0, and npm 12.0.2.
- Removed the package publication path, generated-dist custody, mutable/fail-open workflow behavior, fabricated headers, third-party runtime fonts, unsupported installation/version/dependency claims, and fake commercial/attestation outputs.
- `npm run check` passes type-aware lint, strict typecheck, 13/13 Node tests, Vite production build, and the artifact contract. The final build is 276,310 raw bytes with a 230,688-byte JavaScript asset and no source maps.
- Production and development dependency audits report zero vulnerabilities. actionlint passes; Zizmor 1.29.0 pedantic reports no findings (three documented package-manager pin suppressions).
- Mobile and desktop Playwright inspection passes search/filter, keyboard focus, source-only checkout, evidence dialogs, Escape close, responsive layout, zero console warnings/errors, and static-only network behavior.
- Lighthouse 13.4.1 scores 100 for performance, accessibility, best practices, and SEO on both mobile and desktop.
- Generated root and public `llms.txt` files are byte-identical. The inline JSON-LD SHA-256 is bound exactly into the deny-by-default CSP.
- The dirty primary checkout remains untouched. No deploy, merge, provider, package, customer, adoption, or revenue state is claimed.
