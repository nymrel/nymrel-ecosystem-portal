# Contributing to Nymrel Ecosystem Portal

Thank you for your interest in contributing to the Nymrel open-source ecosystem.

## Core Development Philosophy

1. **Zero-Dependency Policy for Core Libraries**: We maintain zero external third-party dependencies for core algorithmic engines.
2. **Warm Paper Aesthetic**: All user interfaces must adhere to Nymrel Warm Paper design tokens (`#FAF8F2`, `#F4F0E6`, `#2A332E`, `#A8541F`, `#E2DDD2`). Do not force dark mode.
3. **Dual-Audience Requirement**: Web applications must support human UX and machine discoverability (`Schema.org`, `/llms.txt`, `JSON-LD`).
4. **Fail-Closed Validation**: All pull requests must pass the complete `npm run check` contract without ignored failures or lockfile fallbacks.

## Development Workflow

1. Fork and clone the repository.
2. Use Node `24.20.0` and npm `12.0.2`.
3. Install the exact dependency graph: `npm ci`
4. Start the loopback-only development server: `npm run dev`
5. Run lint, strict types, tests, build, and artifact checks: `npm run check`
6. Submit a pull request with a descriptive title and linkable evidence.

## Release boundary

This repository is a private static-site package. Do not add npm publication scripts, tags that publish packages, generated `dist/` files, mutable GitHub Action tags, fallback installs, registry tokens, or provider credentials. A source build does not prove a public deployment.

## Attribution

All contributions become part of the MIT-licensed Nymrel suite under JalenBuilds LLC.
Contact: `contact@nymrel.com`.
