# Nymrel Open-Source Ecosystem Portal (`@nymrel/portal`)

> **The Open Operating Layer for Autonomous AI Agents, Multi-Agent Swarms & Modern Web**  
> *Under Nymrel · An operating umbrella of JalenBuilds LLC*

[![License: MIT](https://img.shields.io/badge/License-MIT-2A332E.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript: 5.7](https://img.shields.io/badge/TypeScript-5.7-A8541F.svg?style=flat-square)](https://www.typescriptlang.org/)
[![Zero-Dependency Core](https://img.shields.io/badge/Zero--Dependency-100%25-059669.svg?style=flat-square)](https://nymrel.com)
[![Aesthetics](https://img.shields.io/badge/Theme-Warm%20Paper%20%23FAF8F2-FAF8F2.svg?style=flat-square&labelColor=2A332E)](https://nymrel.com)
[![Machine Trust](https://img.shields.io/badge/Machine%20Trust-Dual--Audience%20Schema.org-D97706.svg?style=flat-square)](https://nymrel.com)

---

## 🏛️ Ecosystem Overview

The **Nymrel Ecosystem Portal** is a source catalog and interactive reference for ten Nymrel ecosystem entries. It is not a package registry or an installation guide for those entries.

## Release evidence boundary

On 2026-08-21, each of the ten package names listed in this catalog returned 404 from the npm registry. The portal therefore labels every entry `npm package not published` and deliberately omits package install commands, npm package links, CLI/CDN instructions, and integration examples. The catalog distinguishes typed evidence states—source available, locally validated, registry published, install proven, externally adopted, and revenue proven—but does not assert any state beyond this registry result for the listed entries.

Every engine in the Nymrel suite is built upon four foundational pillars:
1. **Zero-Dependency Supply Chain Safety**: All foundational algorithms (RFC-6962 Merkle trees, AST shell firewalls, x402 micropayments, Schema.org parsers) have zero external runtime dependencies.
2. **Dual-Audience Architecture**: Human visitors experience warm, elegant, distraction-free interfaces, while autonomous AI agents receive verifiable machine trust (`JSON-LD`, `/llms.txt`, and cryptographic proofs).
3. **Nymrel Warm Paper Aesthetic**: High-contrast, tactile, human-centric design tokens (`#FAF8F2` warm cream, `#F4F0E6` linen, `#2A332E` cedar green, `#A8541F` terracotta) with **zero forced dark-mode**.
4. **Permissive Open-Source Licensing**: 100% MIT Licensed with open governance.

---

## 🗺️ Architectural Ecosystem Diagram

```
+===================================================================================+
|                               NYMREL AGENT ECOSYSTEM                              |
+===================================================================================+
                                         |
     +-----------------------------------+-----------------------------------+
     |                                   |                                   |
     v                                   v                                   v
+-----------------------+     +-----------------------+     +-----------------------+
|    AGENTS & SWARMS    |     | COMMERCE & PAYMENTS   |     | SECURITY & SANDBOXING |
+-----------------------+     +-----------------------+     +-----------------------+
|  Swarm Studio         |     |  OpenUCP              |     |  Agent Sandstorm      |
|  (@nymrel/swarm-studio|     |  (@nymrel/open-ucp)   |     |  (@nymrel/agent-sand.)|
|  - Visual command deck|     |  - x402 micropayments |     |  - Copy-on-Write FS   |
|  - Live DAG topology  |     |  - AP2 negotiation    |     |  - Ephemeral rollback |
|                       |     |                       |     |                       |
|  Local Forge          |     |  UCP Scanner          |     |  Agent Surety         |
|  (@nymrel/local-forge)|     |  (agentic-ucp-scanner)|     |  (@nymrel/agent-surety|
|  - Local GPU orchestr.|     |  - 0-100 audit engine |     |  - AST firewall jail  |
|  - MCP Server & Router|     |  - AI crawler linter  |     |  - Command interceptor|
|                       |     |                       |     |                       |
|                       |     |  Headless Quote Layer |     |  Proof Ledger         |
|                       |     |  (@nymrel/headless-q.)|     |  (@nymrel/proof-ledger|
|                       |     |  - Dynamic pricing calc|    |  - RFC-6962 Merkle tree|
|                       |     |  - Agent payload export|    |  - Ed25519 signatures |
+-----------------------+     +-----------------------+     +-----------------------+
                                         |
                                         v
                      +-------------------------------------+
                      |         UI & MACHINE TRUST          |
                      +-------------------------------------+
                      |  A2UI Warm Paper                    |
                      |  (a2ui-warm-paper)                  |
                      |  - Google A2UI v0.8 renderer        |
                      |  - Human-in-the-loop decision cards |
                      |                                     |
                      |  Machine Trust                      |
                      |  (@nymrel/machine-trust)            |
                      |  - Dual-audience Schema.org graph   |
                      |  - Robots.txt & /llms.txt generator |
                      +-------------------------------------+
```

---

## 📦 The 10 Flagship Open-Source Repositories

| Repository | Package Name | Category | Primary Focus | Language |
|---|---|---|---|---|
| **Swarm Studio** | `@nymrel/swarm-studio` | Agents & Swarms | Visual command deck & real-time multi-agent DAG cockpit | TS / React |
| **OpenUCP** | `@nymrel/open-ucp` | Commerce | Universal Commerce Protocol with x402 micropayments | TS / Node |
| **Agent Sandstorm** | `@nymrel/agent-sandstorm` | Security | Zero-Trust Copy-on-Write filesystem & egress sandbox | TS + Python |
| **UCP Scanner** | `agentic-ucp-scanner` | Commerce | Zero-dependency CLI to audit web apps for AI commerce readiness | TS / Node |
| **A2UI Warm Paper** | `a2ui-warm-paper` | UI & Trust | Google A2UI v0.8 declarative JSON component library | TS / React |
| **Agent Surety** | `@nymrel/agent-surety` | Security | Execution firewall, AST command interceptor & audit trail | TS / Node |
| **Machine Trust** | `@nymrel/machine-trust` | UI & Trust | Dual-Audience Schema.org entity graphs & crawler matrix | TS / Node |
| **Proof Ledger** | `@nymrel/proof-ledger` | Security | RFC-6962 Merkle trees & Ed25519 cryptographic attestation | TS + Python |
| **Local Forge** | `@nymrel/local-forge` | Agents & Swarms | Local GPU orchestrator (Ollama/vLLM) & MCP server | TS / Node |
| **Headless Quote Layer** | `@nymrel/headless-quote` | Commerce | Embeddable visual pricing estimator & agent quote export | TS / React |

---

## ⚡ Quickstart

### Running the Portal Locally
```bash
# Clone the repository
git clone https://github.com/nymrel/nymrel-ecosystem-portal.git
cd nymrel-ecosystem-portal

# Install dependencies
npm install

# Start local Vite development server
npm run dev

# Run comprehensive test suite
npm test

# Build production bundle
npm run build
```

---

## 🎨 Warm Paper Design Tokens

| Token Name | Hex Code | Role |
|---|---|---|
| Warm Cream | `#FAF8F2` | Base background & canvas |
| Soft Linen | `#F4F0E6` | Surface containers & secondary cards |
| Cedar Green | `#2A332E` | Primary typography, headers, terminal bg |
| Terracotta | `#A8541F` | Accent actions, badges, focus rings |
| Stone Default | `#E2DDD2` | Structural borders & separators |

---

## 🔒 Security & Dual-Audience Governance

- **Entity Hierarchy**: `parentOrganization: Nymrel -> JalenBuilds LLC`
- **Contact Email**: `contact@nymrel.com`
- **LLM Context**: Available live at `/llms.txt`
- **Robots Posture**: `OAI-SearchBot` and verified AI search crawlers explicitly enabled.

---

## 📄 License

MIT License. Copyright &copy; 2026 Nymrel / JalenBuilds LLC.
