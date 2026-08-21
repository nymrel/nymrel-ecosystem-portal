/**
 * Nymrel Open-Source Ecosystem Catalog
 * Complete structured directory of all 10 Nymrel open-source repositories.
 */

export type Category = 
  | 'All'
  | 'Agents & Swarms'
  | 'Commerce & Micropayments'
  | 'Security & Sandboxing'
  | 'UI & Machine Trust';

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
  version: string;
  license: string;
  zeroDependency: boolean;
  installSnippet: string;
  cliSnippet?: string;
  badges: string[];
  features: string[];
  architectureOverview: string;
  primaryLanguage: 'TypeScript' | 'TypeScript / Node' | 'Dual (TS + Python)' | 'TypeScript / React';
  tags: string[];
  rating: number; // 1-5
  starsEstimate: number;
}

export const CATEGORIES: Category[] = [
  'All',
  'Agents & Swarms',
  'Commerce & Micropayments',
  'Security & Sandboxing',
  'UI & Machine Trust'
];

export const ECOSYSTEM_REPOSITORIES: EcosystemRepo[] = [
  {
    id: 'swarm-studio',
    name: 'Swarm Studio',
    packageName: '@nymrel/swarm-studio',
    shortDescription: 'Visual command deck for multi-agent coding swarms with Warm Paper aesthetics and A2UI streaming components.',
    fullDescription: 'Swarm Studio is the visual command deck and coordination cockpit for autonomous multi-agent developer swarms. It features live DAG execution trees, Google A2UI v0.8 streaming decision cards, agent lease health telemetry, and cryptographic Action Surety audit logging.',
    category: 'Agents & Swarms',
    githubUrl: 'https://github.com/nymrel/nymrel-swarm-studio',
    npmUrl: 'https://www.npmjs.com/package/@nymrel/swarm-studio',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: 'npm install @nymrel/swarm-studio',
    cliSnippet: 'npx @nymrel/swarm-studio dev',
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
    starsEstimate: 342
  },
  {
    id: 'open-ucp',
    name: 'OpenUCP',
    packageName: '@nymrel/open-ucp',
    shortDescription: 'Zero-dependency Universal Commerce Protocol (UCP) & Agentic Purchasing Engine with x402 micropayments.',
    fullDescription: 'OpenUCP is the foundational open-source protocol engine enabling AI agents to discover, negotiate, and execute purchases autonomously. Implements RFC-compliant x402 HTTP micropayment headers, AP2 multi-party negotiation, and cryptographically verified cart commitments.',
    category: 'Commerce & Micropayments',
    githubUrl: 'https://github.com/nymrel/open-ucp',
    npmUrl: 'https://www.npmjs.com/package/@nymrel/open-ucp',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: 'npm install @nymrel/open-ucp',
    cliSnippet: 'npx open-ucp serve --port 4020',
    badges: ['v1.0.0', 'MIT', 'Zero-Dependency', 'x402 Protocol', 'AP2 Negotiation'],
    features: [
      'Zero-dependency core running natively on Node.js 18+, Bun, and Cloudflare Workers',
      'x402 HTTP status code micropayment handler with instant settlement',
      'Agent-to-Merchant dynamic price and SKU negotiation protocol',
      'Drop-in middleware for Next.js, Express, Fastify, and Hono'
    ],
    architectureOverview: 'Lightweight pure TypeScript state machine that wraps standard HTTP request/response pipelines into machine-negotiable commerce sessions.',
    primaryLanguage: 'TypeScript / Node',
    tags: ['ucp', 'x402', 'agentic-commerce', 'micropayments', 'ap2', 'checkout'],
    rating: 5,
    starsEstimate: 512
  },
  {
    id: 'agent-sandstorm',
    name: 'Agent Sandstorm',
    packageName: '@nymrel/agent-sandstorm',
    shortDescription: 'Zero-Trust Agent Execution Sandbox & Copy-on-Write Workspace Isolation Engine with instant rollback.',
    fullDescription: 'Agent Sandstorm enforces strict boundary containment around autonomous coding agents. It wraps filesystem mutations in an ephemeral Copy-on-Write overlay, proxies network requests to mask secret tokens, and halts runaway loops via hard financial/token spend limiters.',
    category: 'Security & Sandboxing',
    githubUrl: 'https://github.com/nymrel/agent-sandstorm',
    npmUrl: 'https://www.npmjs.com/package/@nymrel/agent-sandstorm',
    pypiUrl: 'https://pypi.org/project/agent-sandstorm/',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: 'npm install @nymrel/agent-sandstorm',
    cliSnippet: 'npx sandstorm exec --isolation strict "npm test"',
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
    starsEstimate: 428
  },
  {
    id: 'agentic-ucp-scanner',
    name: 'UCP Scanner',
    packageName: 'agentic-ucp-scanner',
    shortDescription: 'Zero-dependency CLI & audit engine to verify websites for AI Agent Commerce Readiness and JSON-LD trust.',
    fullDescription: 'The Agentic UCP Scanner scans any URL, fixture, or web app to test if autonomous AI purchasing agents can successfully discover goods, negotiate pricing, and complete checkout. Generates a 0-100 Agent Commerce Readiness score and machine-readable audit artifacts.',
    category: 'Commerce & Micropayments',
    githubUrl: 'https://github.com/nymrel/agentic-ucp-scanner',
    npmUrl: 'https://www.npmjs.com/package/agentic-ucp-scanner',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: 'npm install agentic-ucp-scanner',
    cliSnippet: 'npx agentic-ucp-scanner audit https://nymrel.com',
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
    starsEstimate: 295
  },
  {
    id: 'a2ui-warm-paper',
    name: 'A2UI Warm Paper',
    packageName: 'a2ui-warm-paper',
    shortDescription: 'Google A2UI (Agent-to-UI) declarative JSON specification component system in Nymrel Warm Paper aesthetics.',
    fullDescription: 'A2UI Warm Paper is the premier open-source React implementation of Google’s Agent-to-UI specification. It turns agent JSON payloads into beautiful, interactive, human-in-the-loop decision cards, diff inspectors, and parameter tables without forced dark-mode.',
    category: 'UI & Machine Trust',
    githubUrl: 'https://github.com/nymrel/a2ui-warm-paper',
    npmUrl: 'https://www.npmjs.com/package/a2ui-warm-paper',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: 'npm install a2ui-warm-paper',
    cliSnippet: 'npx a2ui preview ./decision-card.json',
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
    starsEstimate: 620
  },
  {
    id: 'agent-action-surety',
    name: 'Agent Surety',
    packageName: '@nymrel/agent-surety',
    shortDescription: 'Zero-dependency execution firewall, path sandbox, command interceptor, and cryptographic audit ledger.',
    fullDescription: 'Agent Surety protects host systems from unintended destructive actions during autonomous coding sessions. It inspects shell commands, validates file access paths against frozen project boundaries, and logs all executed tools to a cryptographic Merkle audit chain.',
    category: 'Security & Sandboxing',
    githubUrl: 'https://github.com/nymrel/agent-action-surety',
    npmUrl: 'https://www.npmjs.com/package/@nymrel/agent-surety',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: 'npm install @nymrel/agent-surety',
    cliSnippet: 'npx agent-surety guard --strict',
    badges: ['v1.0.0', 'MIT', 'Zero-Dependency', 'Command Interceptor', 'Path Sandbox'],
    features: [
      'AST-based command interceptor blocking destructive patterns (rm -rf, DROP, format)',
      'Deterministic path traversal jail enforcing repository boundary invariants',
      'Cryptographic execution ledger generating SHA-256 Merkle proofs',
      'Custom policy rules via JSON or programmatic TypeScript middleware'
    ],
    architectureOverview: 'Zero-dependency Node.js engine with synchronous and asynchronous firewall interceptor hooks that integrate with any agent framework.',
    primaryLanguage: 'TypeScript / Node',
    tags: ['security', 'firewall', 'sandbox', 'interceptor', 'audit', 'merkle'],
    rating: 5,
    starsEstimate: 384
  },
  {
    id: 'nymrel-machine-trust',
    name: 'Machine Trust',
    packageName: '@nymrel/machine-trust',
    shortDescription: 'Dual-Audience Machine Trust & AI Search Discoverability Engine for modern web applications.',
    fullDescription: 'Machine Trust bridges the gap between human visitors and autonomous AI search crawlers. It automatically generates hierarchical Schema.org JSON-LD entity graphs, valid robots.txt with fine-grained crawler permissions, and LLM context files (/llms.txt) for machine comprehension.',
    category: 'UI & Machine Trust',
    githubUrl: 'https://github.com/nymrel/nymrel-machine-trust',
    npmUrl: 'https://www.npmjs.com/package/@nymrel/machine-trust',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: 'npm install @nymrel/machine-trust',
    cliSnippet: 'npx machine-trust generate --out ./public',
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
    starsEstimate: 476
  },
  {
    id: 'nymrel-proof-ledger',
    name: 'Proof Ledger',
    packageName: '@nymrel/proof-ledger',
    shortDescription: 'Zero-dependency dual-language cryptographic attestation and proof-of-execution protocol library.',
    fullDescription: 'Nymrel Proof Ledger is the cryptographic proof-of-execution standard for autonomous agents. It generates RFC-6962 compliant Merkle trees, Ed25519 digital signatures, and embeddable visual verification badges to prove that an agent executed authorized steps without tampering.',
    category: 'Security & Sandboxing',
    githubUrl: 'https://github.com/nymrel/nymrel-proof-ledger',
    npmUrl: 'https://www.npmjs.com/package/@nymrel/proof-ledger',
    pypiUrl: 'https://pypi.org/project/nymrel-proof-ledger/',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: 'npm install @nymrel/proof-ledger',
    cliSnippet: 'npx proof-ledger verify ./receipt.json',
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
    starsEstimate: 390
  },
  {
    id: 'local-agent-forge',
    name: 'Local Forge',
    packageName: '@nymrel/local-forge',
    shortDescription: 'Zero-cloud local GPU orchestrator, dynamic model router, and MCP server for agentic workflows.',
    fullDescription: 'Local Forge runs local AI workflows on consumer and workstation GPUs (Ollama, vLLM, LM Studio) while intelligently routing high-reasoning tasks to frontier models. Features a real-time token savings calculator and Model Context Protocol (MCP) server.',
    category: 'Agents & Swarms',
    githubUrl: 'https://github.com/nymrel/local-agent-forge',
    npmUrl: 'https://www.npmjs.com/package/@nymrel/local-forge',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: 'npm install @nymrel/local-forge',
    cliSnippet: 'npx local-forge mcp --port 3333',
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
    starsEstimate: 580
  },
  {
    id: 'headless-quote-layer',
    name: 'Headless Quote Layer',
    packageName: '@nymrel/headless-quote',
    shortDescription: 'Zero-dependency visual quote calculator, dynamic range estimator, and lead capture engine.',
    fullDescription: 'Headless Quote Layer is a drop-in pricing estimator and lead capture engine with Nymrel Warm Paper aesthetics. It provides dynamic formulas, interactive sliders, autonomous agent JSON exports, and multi-currency formatting in a featherweight bundle.',
    category: 'Commerce & Micropayments',
    githubUrl: 'https://github.com/nymrel/headless-quote-layer',
    npmUrl: 'https://www.npmjs.com/package/@nymrel/headless-quote',
    version: '1.0.0',
    license: 'MIT',
    zeroDependency: true,
    installSnippet: 'npm install @nymrel/headless-quote',
    cliSnippet: '<script src="https://unpkg.com/@nymrel/headless-quote/dist/quote-layer.min.js"></script>',
    badges: ['v1.0.0', 'MIT', 'Embeddable', 'Warm Paper UI', 'Zero-Dependency'],
    features: [
      'Dynamic price formula evaluation with real-time range estimation',
      'Embeddable in any HTML page via single unpkg script or React component',
      'Autonomous AI agent quote payload generator with cryptographic attestation',
      'Customizable Warm Paper design presets for SaaS, contractors, and agencies'
    ],
    architectureOverview: 'Framework-agnostic vanilla web component core with first-class React wrappers and standalone CDN distribution.',
    primaryLanguage: 'TypeScript / React',
    tags: ['quote-calculator', 'lead-capture', 'pricing', 'warm-paper', 'estimator'],
    rating: 5,
    starsEstimate: 365
  }
];

export const ECOSYSTEM_METRICS = {
  totalRepos: 10,
  zeroDependencyCount: 10,
  mitLicensed: 10,
  categoriesCount: 4,
  starsTotal: 4392,
  primaryEntities: 'Nymrel -> JalenBuilds LLC',
  designTheme: 'Warm Paper (#FAF8F2, #2A332E, #A8541F)'
};
