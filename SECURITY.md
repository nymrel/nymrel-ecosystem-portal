# Security Policy

## Reporting a Vulnerability

We take the security and integrity of the Nymrel open-source ecosystem seriously.

If you discover a security vulnerability in this portal:

1. **Email us directly**: Send details to `contact@nymrel.com`.
2. **Do not create a public issue**: Give the maintainers a reasonable private triage window before public disclosure.
3. **Include reproducer**: Where applicable, provide a minimal test case, reproduction script, or payload demonstration.

## Portal scope

- Client-side catalog rendering and interaction boundaries.
- Build, dependency-lock, response-header, and static artifact integrity.
- Cross-site scripting, unsafe navigation, and exposure of secrets or private data.
- GitHub Actions and dependency-update configuration in this repository.

Security findings in a listed ecosystem repository should be reported against that repository's own security policy. The portal does not distribute an npm package and does not establish a security warranty for catalog entries.

## Supported source

Security fixes target the current default branch. No public npm version of `@nymrel/portal` is supported or advertised.

## Operating Entity
Nymrel is an operating umbrella of **JalenBuilds LLC**.
Security-sensitive changes require review and reproducible validation evidence.
