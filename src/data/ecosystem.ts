/**
 * Nymrel Open-Source Ecosystem Catalog
 * Complete structured directory of all 28 public Nymrel repositories,
 * synced against the GitHub org inventory on 2026-08-23.
 *
 * Data integrity rules:
 * - `stars` mirrors the real GitHub stargazer count (no estimates).
 * - `npmUrl` / `pypiUrl` are only set when the package actually exists
 *   on the registry. None are published yet, so they are absent.
 * - `installSnippet` always uses a command that works today (git clone).
 */

export type Category = 
  | 'All'
  | 'Agents & Swarms'
  | 'Commerce & Micropayments'
  | 'Security & Sandboxing'
  | 'UI & Machine Trust'
  | 'Developer Tools';

export interface EcosystemRepo {
  id: string;
  name: string;
  packageName: string;
  shortDescription: string;
  fullDescription: string;
  category: Exclude<Category, 'All'>;
  githubUrl: string;
  npmUrl?: string;
  pypiUrl?: string;
  homepageUrl?: string;
  version?: string;
  license: string;
  zeroDependency: boolean;
  installSnippet: string;
  cliSnippet?: string;
  badges: string[];
  features: string[];
  architectureOverview: string;
  primaryLanguage: 'TypeScript' | 'TypeScript / Node' | 'Dual (TS + Python)' | 'TypeScript / React' | 'Python' | 'JavaScript';
  tags: string[];
  rating: number; // 1-5
  stars: number;
}

export const CATEGORIES: Category[] = [
  'All',
  'Agents & Swarms',
  'Commerce & Micropayments',
  'Security & Sandboxing',
  'UI & Machine Trust',
  'Developer Tools'
];

const clone = (repo: string) => `git clone https://github.com/nymrel/${repo}.git`;

export const ECOSYSTEM_REPOSITORIES: EcosystemRepo[] = [
  {
    id: 'swarm-studio',
    name: 'Swarm Studio',
    packageName: '@nymrel/swarm-studio',
    shortDescription: 'Visual command deck for multi-agent coding swarms with Warm Paper aesthetics and A2UI streaming components.',
    fullDescription: 'Swarm Studio is the visual command deck and coordination cockpit for autonomous multi-agent developer swarms. It features live DAG execution trees, Google A2UI v0.8 streaming decision cards, agent lease health telemetry, and cryptographic Action Surety audit logging.',
    category: 'Agents & Swarms',
    githubUrl: 'https://github.com/nymrel/nymrel-swarm-studio',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('nymrel-swarm-studio'),
    badges: ['v1.0.0', 'MIT', 'Warm Paper #FAF8F2', 'A2UI v0.8', 'Live DAG Topology'],
    features: [
      'Multi-agent lease coordinator with fencing generations',
      'Interactive DAG execution tree and dependency tracking',
      'Real-time streaming A2UI human-in-the-loop decision cards',
      'Integrated Action Surety Merkle audit trail'
    ],
    architectureOverview: 'Event-driven React 18 client communicating over WebSocket and Server-Sent Events to local and remote agent worker loops. Rendered in Nymrel Warm Paper design tokens.',
    primaryLanguage: 'TypeScript / React',
    tags: ['swarms', 'multi-agent', 'visual-deck', 'a2ui', 'dag', 'warm-paper'],
    rating: 5,
    stars: 0
  },
  {
    id: 'open-ucp',
    name: 'OpenUCP',
    packageName: '@nymrel/open-ucp',
    shortDescription: 'Zero-dependency Universal Commerce Protocol (UCP) & Agentic Purchasing Engine with x402 micropayments.',
    fullDescription: 'OpenUCP is the foundational open-source protocol engine enabling AI agents to discover, negotiate, and execute purchases autonomously. Implements RFC-compliant x402 HTTP micropayment headers, AP2 multi-party negotiation, and cryptographically verified cart commitments.',
    category: 'Commerce & Micropayments',
    githubUrl: 'https://github.com/nymrel/open-ucp',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('open-ucp'),
    badges: ['v1.0.0', 'MIT', 'Zero-Dependency', 'x402 Protocol', 'AP2 Negotiation'],
    features: [
      'Zero-dependency core running natively on Node.js 18+, Bun, and Cloudflare Workers',
      'x402 HTTP status code micropayment handler with instant settlement',
      'Agent-to-Merchant dynamic price and SKU negotiation protocol',
      'Drop-in middleware for Next.js, Express, Fastify, and FastAPI'
    ],
    architectureOverview: 'Lightweight pure TypeScript state machine that wraps standard HTTP request/response pipelines into machine-negotiable commerce sessions.',
    primaryLanguage: 'TypeScript / Node',
    tags: ['ucp', 'x402', 'agentic-commerce', 'micropayments', 'ap2', 'checkout'],
    rating: 5,
    stars: 0
  },
  {
    id: 'agent-sandstorm',
    name: 'Agent Sandstorm',
    packageName: '@nymrel/agent-sandstorm',
    shortDescription: 'Zero-Trust Agent Execution Sandbox & Copy-on-Write Workspace Isolation Engine with instant rollback.',
    fullDescription: 'Agent Sandstorm enforces strict boundary containment around autonomous coding agents. It wraps filesystem mutations in an ephemeral Copy-on-Write overlay, proxies network requests to mask secret tokens, and halts runaway loops via hard financial/token spend limiters.',
    category: 'Security & Sandboxing',
    githubUrl: 'https://github.com/nymrel/agent-sandstorm',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('agent-sandstorm'),
    badges: ['v1.0.0', 'MIT', 'Zero-Trust', 'Copy-on-Write', 'Dual TS/Python'],
    features: [
      'Copy-on-Write (CoW) overlay filesystem with 1-click snapshot rollback',
      'Transparent secret exfiltration firewall with regex and entropy masking',
      'Hard budget caps on execution tokens, API spend, and wall-clock duration',
      'Dual-runtime support for TypeScript/Node.js and Python 3.10+'
    ],
    architectureOverview: 'Intercepts system FS calls and network sockets using native Node/Python hooking without requiring heavyweight Docker or VM hypervisors.',
    primaryLanguage: 'Dual (TS + Python)',
    tags: ['sandbox', 'zero-trust', 'cow-filesystem', 'rollback', 'security', 'spend-limiter'],
    rating: 5,
    stars: 0
  },
  {
    id: 'agentic-ucp-scanner',
    name: 'UCP Scanner',
    packageName: 'agentic-ucp-scanner',
    shortDescription: 'Zero-dependency CLI & audit engine to verify websites for AI Agent Commerce Readiness and JSON-LD trust.',
    fullDescription: 'The Agentic UCP Scanner scans any URL, fixture, or web app to test if autonomous AI purchasing agents can successfully discover goods, negotiate pricing, and complete checkout. Generates a 0-100 Agent Commerce Readiness score and machine-readable audit artifacts.',
    category: 'Commerce & Micropayments',
    githubUrl: 'https://github.com/nymrel/agentic-ucp-scanner',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('agentic-ucp-scanner'),
    badges: ['v1.0.0', 'MIT', 'Zero-Dependency', 'Audit Score 0-100', 'JSON-LD Verifier'],
    features: [
      'Comprehensive 7-layer AI Commerce readiness evaluation',
      'JSON-LD Schema.org product, price, and entity validation',
      'AI crawler posture audit (OAI-SearchBot, ClaudeBot, GPTBot, Perplexity)',
      'Automated /llms.txt and /robots.txt compliance grader'
    ],
    architectureOverview: 'Pure streaming HTML parser and schema validator that checks machine discoverability and UCP endpoint headers in under 200ms.',
    primaryLanguage: 'TypeScript / Node',
    tags: ['ucp', 'scanner', 'audit', 'seo', 'json-ld', 'llms-txt', 'ai-crawler'],
    rating: 5,
    stars: 0
  },
  {
    id: 'a2ui-warm-paper',
    name: 'A2UI Warm Paper',
    packageName: 'a2ui-warm-paper',
    shortDescription: 'Google A2UI (Agent-to-UI) declarative JSON specification component system in Nymrel Warm Paper aesthetics.',
    fullDescription: 'A2UI Warm Paper is the premier open-source React implementation of Google’s Agent-to-UI specification. It turns agent JSON payloads into beautiful, interactive, human-in-the-loop decision cards, diff inspectors, and parameter tables without forced dark-mode.',
    category: 'UI & Machine Trust',
    githubUrl: 'https://github.com/nymrel/a2ui-warm-paper',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('a2ui-warm-paper'),
    badges: ['v1.0.0', 'MIT', 'Warm Paper #FAF8F2', 'Google A2UI Spec', 'HITL Workflow'],
    features: [
      'Complete renderer for Google A2UI v0.8 declarative JSON schema',
      'Built-in human confirmation actions: Approve, Deny, Amend, Simulate',
      'Signature Nymrel Warm Paper tokens: warm cream, cedar green, terracotta',
      'Streaming JSON-chunk parser for real-time LLM token rendering'
    ],
    architectureOverview: 'React component library with zero third-party CSS dependencies. Uses CSS variables and semantic HTML elements for fast rendering and accessibility.',
    primaryLanguage: 'TypeScript / React',
    tags: ['a2ui', 'agent-to-ui', 'generative-ui', 'react', 'warm-paper', 'hitl'],
    rating: 5,
    stars: 0
  },
  {
    id: 'agent-action-surety',
    name: 'Agent Surety',
    packageName: 'agent-action-surety',
    shortDescription: 'Deny-by-default execution safety envelope and cryptographic SHA-256 Merkle ledger for AI coding swarms.',
    fullDescription: 'Agent Surety protects host systems from unintended destructive actions during autonomous coding sessions. It inspects shell commands, validates file access paths against frozen project boundaries, and logs all executed tools to a cryptographic SHA-256 Merkle audit chain.',
    category: 'Security & Sandboxing',
    githubUrl: 'https://github.com/nymrel/agent-action-surety',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('agent-action-surety'),
    badges: ['v1.0.0', 'MIT', 'Zero-Dependency', 'Command Interceptor', 'Path Sandbox'],
    features: [
      'AST-based command interceptor blocking destructive patterns (rm -rf, DROP, format)',
      'Deterministic path traversal jail enforcing repository boundary invariants',
      'Cryptographic execution ledger generating SHA-256 Merkle proofs',
      'Custom policy rules via JSON or programmatic Python middleware'
    ],
    architectureOverview: 'Zero-dependency Python engine with deny-by-default interceptor hooks that integrate with any agent framework.',
    primaryLanguage: 'Python',
    tags: ['security', 'firewall', 'sandbox', 'interceptor', 'audit', 'merkle'],
    rating: 5,
    stars: 0
  },
  {
    id: 'nymrel-machine-trust',
    name: 'Machine Trust',
    packageName: '@nymrel/machine-trust',
    shortDescription: 'Dual-Audience Machine Trust & AI Search Discoverability Engine for modern web applications.',
    fullDescription: 'Machine Trust bridges the gap between human visitors and autonomous AI search crawlers. It automatically generates hierarchical Schema.org JSON-LD entity graphs, valid robots.txt with fine-grained crawler permissions, and LLM context files (/llms.txt) for machine comprehension.',
    category: 'UI & Machine Trust',
    githubUrl: 'https://github.com/nymrel/nymrel-machine-trust',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('nymrel-machine-trust'),
    badges: ['v1.0.0', 'MIT', 'Dual-Audience', 'JSON-LD Graph', 'OAI-SearchBot'],
    features: [
      'Dual-Audience rule enforcer: stunning human UX + verifiable machine trust',
      'Automated parentOrganization graph generator (Nymrel -> JalenBuilds LLC)',
      'Crawler matrix manager for OpenAI, Anthropic, Google, and Perplexity',
      'LLM context extractor creating concise, structured /llms.txt files'
    ],
    architectureOverview: 'Zero-dependency build-time and runtime generator with integrations for Next.js App Router, Remix, Astro, and Vite.',
    primaryLanguage: 'TypeScript / Node',
    tags: ['machine-trust', 'dual-audience', 'json-ld', 'schema-org', 'llms-txt', 'seo'],
    rating: 5,
    stars: 0
  },
  {
    id: 'nymrel-proof-ledger',
    name: 'Proof Ledger',
    packageName: '@nymrel/proof-ledger',
    shortDescription: 'Zero-dependency dual-language cryptographic attestation and proof-of-execution protocol library.',
    fullDescription: 'Nymrel Proof Ledger is the cryptographic proof-of-execution standard for autonomous agents. It generates RFC-6962 compliant Merkle trees, Ed25519 digital signatures, and embeddable visual verification badges to prove that an agent executed authorized steps without tampering.',
    category: 'Security & Sandboxing',
    githubUrl: 'https://github.com/nymrel/nymrel-proof-ledger',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('nymrel-proof-ledger'),
    badges: ['v1.0.0', 'MIT', 'Zero-Dependency', 'Ed25519 Signatures', 'RFC-6962 Merkle'],
    features: [
      'RFC-6962 compliant binary Merkle Tree construction and proof path generator',
      'Ed25519 & HMAC-SHA256 asymmetric cryptographic signing and verification',
      'Embeddable Warm Paper SVG and HTML verification receipt badges',
      'Full feature parity across TypeScript/Node.js and Python 3.10+'
    ],
    architectureOverview: 'Cryptographic core implemented using standard Node.js crypto and Python hashlib without any third-party npm or pip dependencies.',
    primaryLanguage: 'Dual (TS + Python)',
    tags: ['cryptography', 'merkle-tree', 'attestation', 'proof-of-execution', 'audit-trail'],
    rating: 5,
    stars: 0
  },
  {
    id: 'local-agent-forge',
    name: 'Local Forge',
    packageName: '@nymrel/local-forge',
    shortDescription: 'Zero-cloud local GPU orchestrator, dynamic model router, and MCP server for agentic workflows.',
    fullDescription: 'Local Forge runs local AI workflows on consumer and workstation GPUs (Ollama, vLLM, LM Studio) while intelligently routing high-reasoning tasks to frontier models. Features a real-time token savings calculator and Model Context Protocol (MCP) server.',
    category: 'Agents & Swarms',
    githubUrl: 'https://github.com/nymrel/local-agent-forge',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('local-agent-forge'),
    badges: ['v1.0.0', 'MIT', 'Local GPU', 'MCP Server', 'Token Economics'],
    features: [
      'Dynamic multi-tier model routing: Luna (Local) -> Terra (Local/Cloud) -> Sol (Frontier)',
      'Model Context Protocol (MCP) server for Cursor, Claude Desktop, and Antigravity',
      'Real-time token savings counter tracking cloud API dollars conserved',
      'Unified API gateway across Ollama, vLLM, LM Studio, and ComfyUI'
    ],
    architectureOverview: 'High-throughput proxy daemon with local health probes, dynamic queue scheduler, and standardized MCP protocol bridge.',
    primaryLanguage: 'TypeScript / Node',
    tags: ['local-ai', 'gpu-orchestration', 'ollama', 'vllm', 'mcp', 'token-savings'],
    rating: 5,
    stars: 0
  },
  {
    id: 'headless-quote-layer',
    name: 'Headless Quote Layer',
    packageName: '@nymrel/headless-quote',
    shortDescription: 'Zero-dependency visual quote calculator, dynamic range estimator, and lead capture engine.',
    fullDescription: 'Headless Quote Layer is a drop-in pricing estimator and lead capture engine with Nymrel Warm Paper aesthetics. It provides dynamic formulas, interactive sliders, autonomous agent JSON exports, and multi-currency formatting in a featherweight bundle.',
    category: 'Commerce & Micropayments',
    githubUrl: 'https://github.com/nymrel/headless-quote-layer',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('headless-quote-layer'),
    badges: ['v1.0.0', 'MIT', 'Embeddable', 'Warm Paper UI', 'Zero-Dependency'],
    features: [
      'Dynamic price formula evaluation with real-time range estimation',
      'Embeddable in any HTML page via single script or React component',
      'Autonomous AI agent quote payload generator with cryptographic attestation',
      'Customizable Warm Paper design presets for SaaS, contractors, and agencies'
    ],
    architectureOverview: 'Framework-agnostic vanilla web component core with first-class React wrappers and standalone CDN distribution.',
    primaryLanguage: 'TypeScript / React',
    tags: ['quote-calculator', 'lead-capture', 'pricing', 'warm-paper', 'estimator'],
    rating: 5,
    stars: 0
  },
  {
    id: 'builderwars',
    name: 'BuilderWars',
    packageName: 'builderwars',
    shortDescription: 'Same model. Your harness. A contest between harnesses with one-command replay verification.',
    fullDescription: 'BuilderWars pits AI coding-agent harnesses against each other on identical models — same model, your harness. Every match can be re-run by anyone with one command, so benchmark results are verifiable instead of take-my-word-for-it. No dependencies, MIT licensed.',
    category: 'Agents & Swarms',
    githubUrl: 'https://github.com/nymrel/builderwars',
    homepageUrl: 'https://nymrel.com/builderwars',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('builderwars'),
    badges: ['MIT', 'Replay Verification', 'No Dependencies'],
    features: [
      'Head-to-head contests between agent harnesses on the same model',
      'One-command replay verification for every recorded match',
      'No dependencies, fully reproducible runs'
    ],
    architectureOverview: 'Replay-first evaluation design: matches are recorded and re-runnable end to end by any participant.',
    primaryLanguage: 'Python',
    tags: ['harness', 'benchmark', 'evaluation', 'replay', 'agents'],
    rating: 4,
    stars: 0
  },
  {
    id: 'crawler-mesh',
    name: 'Crawler Mesh',
    packageName: '@nymrel/crawler-mesh',
    shortDescription: 'Zero-telemetry, high-throughput web crawler and clean markdown extractor built for AI agents and LLMs.',
    fullDescription: 'Crawler Mesh crawls at high throughput without telemetry and extracts clean markdown specifically shaped for AI agents and LLM consumption. Zero runtime dependencies.',
    category: 'Agents & Swarms',
    githubUrl: 'https://github.com/nymrel/nymrel-crawler-mesh',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('nymrel-crawler-mesh'),
    badges: ['v1.0.0', 'MIT', 'Zero Telemetry', 'LLM-Ready Markdown'],
    features: [
      'High-throughput crawling with zero telemetry',
      'Clean markdown extraction tuned for LLM consumption',
      'Zero runtime dependencies'
    ],
    architectureOverview: 'Node.js crawler pipeline that emits clean markdown documents without phoning home.',
    primaryLanguage: 'TypeScript / Node',
    tags: ['crawler', 'markdown', 'llm', 'zero-telemetry', 'scraping'],
    rating: 5,
    stars: 0
  },
  {
    id: 'nymrel-plugin',
    name: 'Website Audit Plugin',
    packageName: '@nymrel/website-audit-plugin',
    shortDescription: 'Nymrel universal plugin for ChatGPT, Codex, Claude, and MCP hosts.',
    fullDescription: 'The Nymrel universal plugin exposes Nymrel website audit tooling directly inside ChatGPT, Codex, Claude, and MCP-compatible hosts, so agents can run audits where the work happens.',
    category: 'Agents & Swarms',
    githubUrl: 'https://github.com/nymrel/nymrel-plugin',
    version: '1.2.0',
    license: 'MIT',
    zeroDependency: false,
    installSnippet: clone('nymrel-plugin'),
    badges: ['v1.2.0', 'MIT', 'Plugin', 'MCP Hosts'],
    features: [
      'Universal plugin surface for ChatGPT, Codex, Claude, and MCP hosts',
      'Website audit tooling exposed to agent hosts',
      'Versioned 1.2.x releases'
    ],
    architectureOverview: 'Plugin adapter layer that bridges external agent hosts to Nymrel website audit capabilities.',
    primaryLanguage: 'Python',
    tags: ['plugin', 'mcp', 'chatgpt', 'codex', 'claude'],
    rating: 4,
    stars: 0
  },
  {
    id: 'agent-beacon',
    name: 'Agent Beacon',
    packageName: '@nymrel/agent-beacon',
    shortDescription: 'Zero-dependency liveness sentinel, heartbeat monitor, and dead-man switch watchdog mesh for AI coding fleets.',
    fullDescription: 'Agent Beacon keeps unattended AI coding fleets honest: agents emit liveness beacons, watchdogs monitor heartbeats across the mesh, and a dead-man switch fires when an agent goes silent.',
    category: 'Agents & Swarms',
    githubUrl: 'https://github.com/nymrel/agent-beacon',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('agent-beacon'),
    badges: ['v1.0.0', 'MIT', 'Zero-Dependency', 'Watchdog Mesh'],
    features: [
      'Agent liveness sentinels with heartbeat monitoring',
      'Dead-man switch watchdog mesh for unattended fleets',
      'Zero runtime dependencies'
    ],
    architectureOverview: 'Heartbeat mesh in which agents emit beacons and watchdogs escalate silence through configurable escalation paths.',
    primaryLanguage: 'TypeScript / Node',
    tags: ['heartbeat', 'watchdog', 'liveness', 'fleet', 'monitoring'],
    rating: 5,
    stars: 0
  },
  {
    id: 'trust-scorecard',
    name: 'Trust Scorecard',
    packageName: '@nymrel/trust-scorecard',
    shortDescription: 'AI readiness and machine trust scorecard web application in Nymrel Warm Paper design.',
    fullDescription: 'Trust Scorecard is an interactive AI readiness and machine trust scoring web application built with React 18, Vite, and TypeScript in the Nymrel Warm Paper design system.',
    category: 'UI & Machine Trust',
    githubUrl: 'https://github.com/nymrel/nymrel-trust-scorecard',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: false,
    installSnippet: clone('nymrel-trust-scorecard'),
    badges: ['v1.0.0', 'MIT', 'React 18 + Vite', 'Warm Paper UI'],
    features: [
      'Interactive AI readiness and machine trust scoring',
      'React 18 + Vite + TypeScript build',
      'Warm Paper design system'
    ],
    architectureOverview: 'React 18 single-page application; scoring logic runs client-side in the browser.',
    primaryLanguage: 'TypeScript / React',
    tags: ['scorecard', 'machine-trust', 'react', 'vite', 'warm-paper'],
    rating: 4,
    stars: 0
  },
  {
    id: 'mcp-hub',
    name: 'MCP Hub',
    packageName: '@nymrel/mcp-hub',
    shortDescription: 'Unified Model Context Protocol server aggregating Nymrel toolchains for Claude, Cursor, Codex, and OpenAI agents.',
    fullDescription: 'MCP Hub is the unified Model Context Protocol (MCP) server for the Nymrel suite. It aggregates Nymrel developer toolchains, execution sandboxes, cryptographic ledgers, and machine-trust engines into a single zero-dependency server for Claude Desktop, Claude Code, Cursor, Codex, and OpenAI agents.',
    category: 'Agents & Swarms',
    githubUrl: 'https://github.com/nymrel/nymrel-mcp-hub',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('nymrel-mcp-hub'),
    badges: ['v1.0.0', 'MIT', 'MCP 2024-11-05', 'Dual TS + Python'],
    features: [
      'Single MCP server aggregating the Nymrel developer toolchain suite',
      'Speaks MCP JSON-RPC 2.0 over stdio to Claude, Cursor, Codex, and OpenAI agents',
      'Dual TypeScript + Python engines with zero dependencies'
    ],
    architectureOverview: 'MCP JSON-RPC 2.0 stdio server fronting the Nymrel toolchain suite behind one configuration entry.',
    primaryLanguage: 'Dual (TS + Python)',
    tags: ['mcp', 'model-context-protocol', 'claude', 'cursor', 'codex'],
    rating: 5,
    stars: 0
  },
  {
    id: 'swarm-protocol',
    name: 'Swarm Protocol',
    packageName: '@nymrel/swarm-protocol',
    shortDescription: 'Universal multi-agent swarm protocol, two-seat command studio contract, and file-based bus engine.',
    fullDescription: 'Swarm Protocol defines a universal Multi-Agent Swarm Protocol, a Two-Seat Command Studio contract, and a file-based bus engine for coordinating autonomous AI coding agents. Ships as zero-runtime-dependency TypeScript and Python implementations.',
    category: 'Agents & Swarms',
    githubUrl: 'https://github.com/nymrel/nymrel-swarm-protocol',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('nymrel-swarm-protocol'),
    badges: ['v1.0.0', 'MIT', 'Zero Runtime Deps', 'TS + Python'],
    features: [
      'Universal Multi-Agent Swarm Protocol',
      'Two-Seat Command Studio contract for paired human + agent operation',
      'File-based bus engine (.swarm) with zero runtime dependencies',
      'TypeScript and Python implementations'
    ],
    architectureOverview: 'File-based bus (.swarm directory) that coordinates agents through claims, leases, and messages on disk.',
    primaryLanguage: 'Dual (TS + Python)',
    tags: ['swarm', 'protocol', 'bus', 'multi-agent', 'coordination'],
    rating: 5,
    stars: 0
  },
  {
    id: 'ai-visibility-scorecard',
    name: 'AI Visibility Scorecard',
    packageName: 'ai-visibility-scorecard',
    shortDescription: 'Grade how findable your site is to ChatGPT, Claude, and Perplexity, with fixes ranked by impact.',
    fullDescription: 'AI Visibility Scorecard grades how findable your site is to ChatGPT, Claude, and Perplexity and ranks the fixes by impact. Runs entirely in the browser.',
    category: 'UI & Machine Trust',
    githubUrl: 'https://github.com/nymrel/ai-visibility-scorecard',
    homepageUrl: 'https://nymrel.com/tools/ai-visibility-scorecard',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('ai-visibility-scorecard'),
    badges: ['MIT', 'Runs in Browser', 'AI Search'],
    features: [
      'Scores AI-search findability across ChatGPT, Claude, and Perplexity',
      'Ranks fixes by impact',
      'Runs entirely in the browser'
    ],
    architectureOverview: 'Static browser tool served from nymrel.com; no backend and no data collection.',
    primaryLanguage: 'JavaScript',
    tags: ['seo', 'ai-visibility', 'geo', 'scorecard', 'browser-tool'],
    rating: 4,
    stars: 0
  },
  {
    id: 'presence',
    name: 'Presence',
    packageName: 'presence-rail',
    shortDescription: 'An agent hits a step that needs a human. Presence pauses it, buzzes a phone, and resumes once the person has acted.',
    fullDescription: 'Presence handles the moment an agent hits a step that needs a human: it pauses the run, buzzes a phone, and resumes once the person has acted. It carries context and attention, never an answer. Zero dependencies, MIT.',
    category: 'Agents & Swarms',
    githubUrl: 'https://github.com/nymrel/presence',
    homepageUrl: 'https://nymrel.com/presence',
    version: '0.1.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('presence'),
    badges: ['v0.1.0', 'MIT', 'Human-in-the-Loop', 'Zero Deps'],
    features: [
      'Pauses agent workflows at human-approval steps',
      'Phone notification with resume-on-action flow',
      'Carries context and attention, never the answer itself',
      'Zero dependencies'
    ],
    architectureOverview: 'Lightweight pause/resume rail inserted into agent workflows at human-in-the-loop checkpoints.',
    primaryLanguage: 'JavaScript',
    tags: ['human-in-the-loop', 'approval', 'notifications', 'agents'],
    rating: 4,
    stars: 0
  },
  {
    id: 'permitmesh',
    name: 'PermitMesh',
    packageName: 'PermitMesh',
    shortDescription: 'A portable policy-decision profile for AI agents changing software. PDP, not PEP.',
    fullDescription: 'PermitMesh is a portable policy-decision profile for AI agents changing software. It is a PDP, not a PEP: it evaluates policy but does not authenticate issuers, sandbox agents, intercept tools, or enforce decisions. Contracts declare who authorized the agent, which repos, refs, channels and paths it may touch, which actions require human approval, limits, fencing generations, one-time operation nonces, and what proof must exist before work is complete.',
    category: 'Security & Sandboxing',
    githubUrl: 'https://github.com/nymrel/PermitMesh',
    homepageUrl: 'https://nymrel.com',
    license: 'Apache-2.0',
    zeroDependency: true,
    installSnippet: clone('PermitMesh'),
    badges: ['Apache-2.0', 'PDP', 'Conformance Suite', 'Alpha'],
    features: [
      'Portable policy-decision profile (PDP) for software-changing agents',
      'Declares authorized repos, refs, channels, paths, actions, and limits',
      'Marks actions requiring human approval and one-time operation nonces',
      'Independent conformance suite; no runtime dependencies'
    ],
    architectureOverview: 'Declarative contract format plus conformance suite; evaluation only, enforcement stays with the calling enforcement point (PEP).',
    primaryLanguage: 'Python',
    tags: ['policy', 'pdp', 'authorization', 'agents', 'conformance'],
    rating: 4,
    stars: 0
  },
  {
    id: 'noop-flags',
    name: 'Noop Flags',
    packageName: 'noop-flags',
    shortDescription: 'Find the CLI flags your program accepts and never reads. One file, no dependencies.',
    fullDescription: 'Noop Flags finds the CLI flags your program accepts and never reads — dead surface area that misleads users and docs. One Python file, no dependencies, MIT.',
    category: 'Developer Tools',
    githubUrl: 'https://github.com/nymrel/noop-flags',
    homepageUrl: 'https://nymrel.com',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('noop-flags'),
    badges: ['MIT', 'Single File', 'No Dependencies'],
    features: [
      'Detects accepted-but-unread CLI flags',
      'Single-file Python tool',
      'No dependencies'
    ],
    architectureOverview: 'Static analysis comparing declared CLI flag definitions against observed reads, packaged as one Python file.',
    primaryLanguage: 'Python',
    tags: ['cli', 'python', 'lint', 'developer-tools'],
    rating: 4,
    stars: 0
  },
  {
    id: 'chatgpt-recommends',
    name: 'ChatGPT Recommends',
    packageName: 'chatgpt-recommends',
    shortDescription: 'Check whether ChatGPT recommends your business: three buyer-intent prompts, paste the answers, get a scored verdict.',
    fullDescription: 'ChatGPT Recommends checks whether ChatGPT recommends your business. Run three buyer-intent prompts, paste the answers, and get a scored verdict. Runs entirely in the browser.',
    category: 'UI & Machine Trust',
    githubUrl: 'https://github.com/nymrel/chatgpt-recommends',
    homepageUrl: 'https://nymrel.com/tools/chatgpt-recommends',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('chatgpt-recommends'),
    badges: ['MIT', 'Runs in Browser', 'Buyer-Intent'],
    features: [
      'Three buyer-intent prompt runs',
      'Paste-in answers scored to a verdict',
      'Runs entirely in the browser'
    ],
    architectureOverview: 'Static browser tool; prompts and scoring run client-side with nothing leaving the device.',
    primaryLanguage: 'JavaScript',
    tags: ['chatgpt', 'visibility', 'buyer-intent', 'browser-tool'],
    rating: 4,
    stars: 0
  },
  {
    id: 'token-spend-dashboard',
    name: 'Token Spend Dashboard',
    packageName: 'token-spend-dashboard',
    shortDescription: 'Paste an Anthropic or OpenAI usage export and get a spend dashboard by day and model. Nothing leaves your device.',
    fullDescription: 'Token Spend Dashboard turns an Anthropic or OpenAI usage export into a spend dashboard by day and model. Everything is parsed locally — nothing leaves your device.',
    category: 'Developer Tools',
    githubUrl: 'https://github.com/nymrel/token-spend-dashboard',
    homepageUrl: 'https://nymrel.com/tools/token-spend-dashboard',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('token-spend-dashboard'),
    badges: ['MIT', 'Runs in Browser', 'Local-Only'],
    features: [
      'Spend dashboard by day and model',
      'Accepts Anthropic and OpenAI usage exports',
      'Fully client-side — nothing leaves your device'
    ],
    architectureOverview: 'Static browser tool parsing usage exports locally in the page.',
    primaryLanguage: 'JavaScript',
    tags: ['tokens', 'spend', 'dashboard', 'anthropic', 'openai'],
    rating: 4,
    stars: 0
  },
  {
    id: 'qr-utm-generator',
    name: 'QR UTM Generator',
    packageName: 'qr-utm-generator',
    shortDescription: 'QR codes with UTM tracking built into the link, so you know which flyer brought them in.',
    fullDescription: 'QR UTM Generator produces QR codes with UTM tracking parameters built into the destination link, so every printed asset attributes its own traffic. Runs in the browser.',
    category: 'Developer Tools',
    githubUrl: 'https://github.com/nymrel/qr-utm-generator',
    homepageUrl: 'https://nymrel.com/tools/qr-utm-generator',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('qr-utm-generator'),
    badges: ['MIT', 'Runs in Browser', 'Attribution'],
    features: [
      'QR codes with UTM parameters baked into the destination link',
      'Campaign attribution per printed asset',
      'Runs entirely in the browser'
    ],
    architectureOverview: 'Static browser tool generating QR codes client-side from UTM-tagged URLs.',
    primaryLanguage: 'JavaScript',
    tags: ['qr', 'utm', 'attribution', 'marketing', 'browser-tool'],
    rating: 4,
    stars: 0
  },
  {
    id: 'json-ld-generator',
    name: 'JSON-LD Generator',
    packageName: 'json-ld-generator',
    shortDescription: 'Generate schema.org JSON-LD for LocalBusiness, Product, FAQ and more, or check markup you already have.',
    fullDescription: 'JSON-LD Generator builds schema.org structured data for LocalBusiness, Product, FAQ and more — or checks markup you already have. Runs in the browser.',
    category: 'UI & Machine Trust',
    githubUrl: 'https://github.com/nymrel/json-ld-generator',
    homepageUrl: 'https://nymrel.com/tools/json-ld-generator',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('json-ld-generator'),
    badges: ['MIT', 'Runs in Browser', 'Schema.org'],
    features: [
      'Generates schema.org JSON-LD for LocalBusiness, Product, FAQ, and more',
      'Validates existing structured data markup',
      'Runs entirely in the browser'
    ],
    architectureOverview: 'Static browser tool producing and checking JSON-LD snippets client-side.',
    primaryLanguage: 'JavaScript',
    tags: ['json-ld', 'schema-org', 'structured-data', 'seo', 'browser-tool'],
    rating: 4,
    stars: 0
  },
  {
    id: 'llms-txt-generator',
    name: 'llms.txt Generator',
    packageName: 'llms-txt-generator',
    shortDescription: 'Build a publish-ready llms.txt — a short map of your site that AI assistants can read in one pass.',
    fullDescription: 'llms.txt Generator builds a publish-ready llms.txt: a short map of your site that AI assistants can read in one pass. Runs in the browser.',
    category: 'UI & Machine Trust',
    githubUrl: 'https://github.com/nymrel/llms-txt-generator',
    homepageUrl: 'https://nymrel.com/tools/llms-txt-generator',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('llms-txt-generator'),
    badges: ['MIT', 'Runs in Browser', 'AI Crawlers'],
    features: [
      'Produces publish-ready llms.txt files',
      'One-pass site map formatted for AI assistants',
      'Runs entirely in the browser'
    ],
    architectureOverview: 'Static browser tool assembling llms.txt content client-side.',
    primaryLanguage: 'JavaScript',
    tags: ['llms-txt', 'ai-crawlers', 'discoverability', 'browser-tool'],
    rating: 4,
    stars: 0
  },
  {
    id: 'agent-proofchain',
    name: 'Agent Proofchain',
    packageName: 'agent-proofchain',
    shortDescription: 'Provider-neutral admission decisions and tamper-evident action receipts for AI agents.',
    fullDescription: 'Agent Proofchain issues provider-neutral admission decisions for AI agent actions and returns tamper-evident receipts proving what was actually done. Zero runtime dependencies (Python stdlib core), MIT.',
    category: 'Security & Sandboxing',
    githubUrl: 'https://github.com/nymrel/agent-proofchain',
    homepageUrl: 'https://nymrel.com',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: clone('agent-proofchain'),
    badges: ['MIT', 'Tamper-Evident', 'Provider-Neutral'],
    features: [
      'Provider-neutral admission decisions for agent actions',
      'Tamper-evident action receipts',
      'Zero runtime dependencies (Python stdlib core)'
    ],
    architectureOverview: 'Python library issuing admission decisions and append-only, tamper-evident receipts for executed actions.',
    primaryLanguage: 'Python',
    tags: ['admission', 'receipts', 'tamper-evident', 'audit', 'python'],
    rating: 4,
    stars: 0
  },
  {
    id: 'ecosystem-portal',
    name: 'Ecosystem Portal',
    packageName: '@nymrel/portal',
    shortDescription: 'This portal: the official open-source showcase, documentation hub, and interactive catalog for the Nymrel agent suite.',
    fullDescription: 'The Nymrel Ecosystem Portal is the official open-source showcase, documentation portal, and interactive hub for the Nymrel autonomous agent suite. It renders the full org catalog with search, category filters, an interactive playground, and a quickstart drawer — plus machine-readable llms.txt for AI crawlers.',
    category: 'Developer Tools',
    githubUrl: 'https://github.com/nymrel/nymrel-ecosystem-portal',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: false,
    installSnippet: clone('nymrel-ecosystem-portal'),
    badges: ['v1.0.0', 'MIT', 'React 18 + Vite', 'Cloudflare Pages'],
    features: [
      'Official showcase and documentation hub for the Nymrel suite',
      'Searchable, category-filtered catalog of every public repository',
      'Interactive playground and quickstart drawer',
      'Machine-readable llms.txt for AI crawlers'
    ],
    architectureOverview: 'React 18 + Vite single-page application deployed on Cloudflare Pages.',
    primaryLanguage: 'TypeScript / React',
    tags: ['portal', 'showcase', 'documentation', 'react', 'vite'],
    rating: 5,
    stars: 0
  }
];

export const ECOSYSTEM_METRICS = {
  totalRepos: 28,
  zeroDependencyCount: 25,
  mitLicensed: 27,
  apacheLicensed: 1,
  categoriesCount: 5,
  starsTotal: 0,
  primaryEntities: 'Nymrel -> JalenBuilds LLC',
  designTheme: 'Warm Paper (#FAF8F2, #2A332E, #A8541F)',
  catalogSyncedAt: '2026-08-23'
};
