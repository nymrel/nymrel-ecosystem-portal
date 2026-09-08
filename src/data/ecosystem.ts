/**
 * Evidence-bounded snapshot of the public repositories in the Nymrel GitHub
 * organization. Repository descriptions are owner-supplied GitHub metadata;
 * they are not independent capability, quality, adoption, or revenue proof.
 */

export const CATALOG_CHECKED_AT = '2026-08-30' as const;

export type Category =
  | 'All'
  | 'Agents & Swarms'
  | 'Commerce & Micropayments'
  | 'Security & Sandboxing'
  | 'UI & Machine Trust'
  | 'Developer Tools';

export type RepositoryCategory = Exclude<Category, 'All'>;

export interface ReleaseEvidence {
  status: 'release_observed' | 'no_release_observed';
  tag?: string;
  publishedAt?: string;
}

export interface EcosystemRepo {
  id: string;
  repoName: string;
  name: string;
  category: RepositoryCategory;
  githubUrl: string;
  sourceDescription: string;
  primaryLanguage: string;
  defaultBranch: string;
  lastSourceUpdate: string;
  sourceCheckedAt: typeof CATALOG_CHECKED_AT;
  sourceCheckoutCommand: string;
  release: ReleaseEvidence;
  registryStatus: 'not_assessed';
  licenseStatus: 'not_assessed';
  validationStatus: 'not_assessed_by_portal';
  adoptionStatus: 'not_assessed';
  revenueStatus: 'not_assessed';
}

export const CATEGORIES: readonly Category[] = [
  'All',
  'Agents & Swarms',
  'Commerce & Micropayments',
  'Security & Sandboxing',
  'UI & Machine Trust',
  'Developer Tools',
];

const repo = (
  input: Omit<
    EcosystemRepo,
    | 'githubUrl'
    | 'sourceCheckedAt'
    | 'sourceCheckoutCommand'
    | 'release'
    | 'registryStatus'
    | 'licenseStatus'
    | 'validationStatus'
    | 'adoptionStatus'
    | 'revenueStatus'
  > & { release?: ReleaseEvidence },
): EcosystemRepo => ({
  ...input,
  githubUrl: 'https://github.com/nymrel/' + input.repoName,
  sourceCheckedAt: CATALOG_CHECKED_AT,
  sourceCheckoutCommand: 'git clone https://github.com/nymrel/' + input.repoName + '.git',
  release: input.release ?? { status: 'no_release_observed' },
  registryStatus: 'not_assessed',
  licenseStatus: 'not_assessed',
  validationStatus: 'not_assessed_by_portal',
  adoptionStatus: 'not_assessed',
  revenueStatus: 'not_assessed',
});

export const ECOSYSTEM_REPOSITORIES: readonly EcosystemRepo[] = [
  repo({
    id: 'agent-beacon',
    repoName: 'agent-beacon',
    name: 'Agent Beacon',
    category: 'Agents & Swarms',
    sourceDescription:
      "Zero-dependency agent liveness sentinel, heartbeat monitor, and dead-man's switch watchdog mesh for AI coding fleets",
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-30T08:07:23Z',
  }),
  repo({
    id: 'builderwars',
    repoName: 'builderwars',
    name: 'BuilderWars',
    category: 'Agents & Swarms',
    sourceDescription:
      'Same model. Your harness. Re-run every match yourself. A contest between harnesses with one-command replay verification. No dependencies, MIT.',
    primaryLanguage: 'Python',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-29T12:20:49Z',
  }),
  repo({
    id: 'local-agent-forge',
    repoName: 'local-agent-forge',
    name: 'Local Agent Forge',
    category: 'Agents & Swarms',
    sourceDescription:
      'Zero-cloud local GPU orchestrator, dynamic 85% model router, and MCP server for AI coding agents with token dollar savings ledger',
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-30T08:44:49Z',
  }),
  repo({
    id: 'nymrel-agent',
    repoName: 'nymrel-agent',
    name: 'Nymrel Agent',
    category: 'Agents & Swarms',
    sourceDescription:
      'Explainable multi-model routing with deterministic receipts and no prompt custody.',
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-30T00:24:04Z',
    release: {
      status: 'release_observed',
      tag: 'v0.4.0',
      publishedAt: '2026-08-28T22:57:34Z',
    },
  }),
  repo({
    id: 'nymrel-crawler-mesh',
    repoName: 'nymrel-crawler-mesh',
    name: 'Nymrel Crawler Mesh',
    category: 'Agents & Swarms',
    sourceDescription:
      'Zero-telemetry, high-throughput web crawler and clean markdown extractor built specifically for AI agents and LLMs',
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-30T06:54:49Z',
  }),
  repo({
    id: 'nymrel-mcp-hub',
    repoName: 'nymrel-mcp-hub',
    name: 'Nymrel MCP Hub',
    category: 'Agents & Swarms',
    sourceDescription:
      'No GitHub repository description was present when this snapshot was captured.',
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-30T02:50:44Z',
  }),
  repo({
    id: 'nymrel-plugin',
    repoName: 'nymrel-plugin',
    name: 'Nymrel Plugin',
    category: 'Agents & Swarms',
    sourceDescription:
      'Nymrel universal plugin for ChatGPT, Codex, Claude, and MCP hosts',
    primaryLanguage: 'Python',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-30T01:11:41Z',
  }),
  repo({
    id: 'nymrel-swarm-protocol',
    repoName: 'nymrel-swarm-protocol',
    name: 'Nymrel Swarm Protocol',
    category: 'Agents & Swarms',
    sourceDescription:
      'Universal Multi-Agent Swarm Protocol, Two-Seat Command Studio Contract, and File-Based Bus Engine for AI coding teams',
    primaryLanguage: 'Python',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-29T23:52:55Z',
  }),
  repo({
    id: 'nymrel-swarm-studio',
    repoName: 'nymrel-swarm-studio',
    name: 'Nymrel Swarm Studio',
    category: 'Agents & Swarms',
    sourceDescription:
      'Visual Command Center and Action Surety Deck for Multi-Agent Coding Swarms (Google A2UI v0.8, Warm Paper UI, Merkle SHA-256 Logs)',
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-30T06:42:52Z',
  }),
  repo({
    id: 'presence',
    repoName: 'presence',
    name: 'Presence',
    category: 'Agents & Swarms',
    sourceDescription:
      'An agent hits a step that needs a human. Presence pauses it, buzzes a phone, and resumes once the person has acted. Carries context and attention, never an answer. Zero deps, MIT.',
    primaryLanguage: 'JavaScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-19T07:32:44Z',
  }),
  repo({
    id: 'agentic-ucp-scanner',
    repoName: 'agentic-ucp-scanner',
    name: 'Agentic UCP Scanner',
    category: 'Commerce & Micropayments',
    sourceDescription:
      'Zero-dependency CLI and audit engine for AI Agent Commerce Readiness, UCP, Schema.org JSON-LD, and llms.txt',
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-29T22:25:19Z',
  }),
  repo({
    id: 'headless-quote-layer',
    repoName: 'headless-quote-layer',
    name: 'Headless Quote Layer',
    category: 'Commerce & Micropayments',
    sourceDescription:
      'Zero-dependency embeddable visual quote calculator, dynamic range estimator, and lead capture widget with Warm Paper aesthetics',
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-21T22:09:50Z',
  }),
  repo({
    id: 'open-ucp',
    repoName: 'open-ucp',
    name: 'Open UCP',
    category: 'Commerce & Micropayments',
    sourceDescription:
      'Universal Commerce Protocol (UCP) and AI Agent Micropayments Middleware for Next.js, Express, Fastify, and FastAPI',
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-30T01:55:53Z',
  }),
  repo({
    id: 'agent-action-surety',
    repoName: 'agent-action-surety',
    name: 'Agent Action Surety',
    category: 'Security & Sandboxing',
    sourceDescription:
      'Deny-by-default execution safety envelope and cryptographic SHA-256 Merkle ledger for AI coding swarms',
    primaryLanguage: 'Python',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-29T21:54:25Z',
  }),
  repo({
    id: 'agent-proofchain',
    repoName: 'agent-proofchain',
    name: 'Agent Proofchain',
    category: 'Security & Sandboxing',
    sourceDescription:
      'Provider-neutral admission decisions and tamper-evident action receipts for AI agents.',
    primaryLanguage: 'Python',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-18T10:37:40Z',
  }),
  repo({
    id: 'agent-sandstorm',
    repoName: 'agent-sandstorm',
    name: 'Agent Sandstorm',
    category: 'Security & Sandboxing',
    sourceDescription:
      'Zero-Trust Agent Execution Sandbox with Copy-on-Write Snapshots, 1-Click Rollbacks, and Secret Exfiltration Proxy',
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-30T07:33:58Z',
  }),
  repo({
    id: 'nymrel-proof-ledger',
    repoName: 'nymrel-proof-ledger',
    name: 'Nymrel Proof Ledger',
    category: 'Security & Sandboxing',
    sourceDescription:
      'Zero-dependency cryptographic attestation and proof-of-execution protocol with RFC 6962 Merkle trees and SVG badges',
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-30T04:15:48Z',
  }),
  repo({
    id: 'permitmesh',
    repoName: 'PermitMesh',
    name: 'PermitMesh',
    category: 'Security & Sandboxing',
    sourceDescription:
      'A portable policy-decision profile for AI agents changing software.',
    primaryLanguage: 'Python',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-24T21:25:37Z',
  }),
  repo({
    id: 'a2ui-warm-paper',
    repoName: 'a2ui-warm-paper',
    name: 'A2UI Warm Paper',
    category: 'UI & Machine Trust',
    sourceDescription:
      'Google A2UI v0.8 declarative JSON component library rendered with Nymrel Warm Paper aesthetics',
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-21T21:26:00Z',
  }),
  repo({
    id: 'ai-visibility-scorecard',
    repoName: 'ai-visibility-scorecard',
    name: 'AI Visibility Scorecard',
    category: 'UI & Machine Trust',
    sourceDescription:
      'Grade how findable your site is to ChatGPT, Claude, and Perplexity, with the fixes ranked by impact. Runs in the browser.',
    primaryLanguage: 'JavaScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-21T16:54:30Z',
  }),
  repo({
    id: 'chatgpt-recommends',
    repoName: 'chatgpt-recommends',
    name: 'ChatGPT Recommends',
    category: 'UI & Machine Trust',
    sourceDescription:
      'Check whether ChatGPT recommends your business. Run three buyer-intent prompts, paste the answers, get a scored verdict.',
    primaryLanguage: 'JavaScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-18T10:38:51Z',
  }),
  repo({
    id: 'json-ld-generator',
    repoName: 'json-ld-generator',
    name: 'JSON-LD Generator',
    category: 'UI & Machine Trust',
    sourceDescription:
      'Generate schema.org JSON-LD for LocalBusiness, Product, FAQ and more, or check markup you already have. Runs in the browser.',
    primaryLanguage: 'JavaScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-18T10:38:18Z',
  }),
  repo({
    id: 'llms-txt-generator',
    repoName: 'llms-txt-generator',
    name: 'llms.txt Generator',
    category: 'UI & Machine Trust',
    sourceDescription:
      'Build a publish-ready llms.txt — a short map of your site that AI assistants can read in one pass. Runs in the browser.',
    primaryLanguage: 'JavaScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-18T10:38:03Z',
  }),
  repo({
    id: 'nymrel-machine-trust',
    repoName: 'nymrel-machine-trust',
    name: 'Nymrel Machine Trust',
    category: 'UI & Machine Trust',
    sourceDescription:
      'Dual-Audience Machine Trust and AI Search Engine for Schema.org JSON-LD, llms.txt, and zero DOM drift validation',
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-30T04:42:31Z',
  }),
  repo({
    id: 'nymrel-trust-scorecard',
    repoName: 'nymrel-trust-scorecard',
    name: 'Nymrel Trust Scorecard',
    category: 'UI & Machine Trust',
    sourceDescription:
      'Viral AI Readiness & Machine Trust Web Application (React 18 + Vite + TypeScript) in Nymrel Warm Paper design',
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-21T21:26:16Z',
  }),
  repo({
    id: 'noop-flags',
    repoName: 'noop-flags',
    name: 'Noop Flags',
    category: 'Developer Tools',
    sourceDescription:
      'Find the CLI flags your program accepts and never reads. One file, no dependencies, MIT.',
    primaryLanguage: 'Python',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-29T17:18:09Z',
  }),
  repo({
    id: 'nymrel-ecosystem-portal',
    repoName: 'nymrel-ecosystem-portal',
    name: 'Nymrel Ecosystem Portal',
    category: 'Developer Tools',
    sourceDescription:
      'The official open-source showcase, documentation portal, and interactive hub for the Nymrel autonomous agent suite',
    primaryLanguage: 'TypeScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-24T03:00:11Z',
  }),
  repo({
    id: 'qr-utm-generator',
    repoName: 'qr-utm-generator',
    name: 'QR + UTM Generator',
    category: 'Developer Tools',
    sourceDescription:
      'QR codes with UTM tracking built into the link, so you know which flyer brought them in. Runs in the browser.',
    primaryLanguage: 'JavaScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-18T10:38:33Z',
  }),
  repo({
    id: 'token-spend-dashboard',
    repoName: 'token-spend-dashboard',
    name: 'Token Spend Dashboard',
    category: 'Developer Tools',
    sourceDescription:
      'Paste an Anthropic or OpenAI usage export and get a spend dashboard by day and model. Nothing leaves your device.',
    primaryLanguage: 'JavaScript',
    defaultBranch: 'main',
    lastSourceUpdate: '2026-08-18T10:38:42Z',
  }),
];

const categoryCounts: Readonly<Record<RepositoryCategory, number>> = {
  'Agents & Swarms': ECOSYSTEM_REPOSITORIES.filter(
    (repository) => repository.category === 'Agents & Swarms',
  ).length,
  'Commerce & Micropayments': ECOSYSTEM_REPOSITORIES.filter(
    (repository) => repository.category === 'Commerce & Micropayments',
  ).length,
  'Security & Sandboxing': ECOSYSTEM_REPOSITORIES.filter(
    (repository) => repository.category === 'Security & Sandboxing',
  ).length,
  'UI & Machine Trust': ECOSYSTEM_REPOSITORIES.filter(
    (repository) => repository.category === 'UI & Machine Trust',
  ).length,
  'Developer Tools': ECOSYSTEM_REPOSITORIES.filter(
    (repository) => repository.category === 'Developer Tools',
  ).length,
};

export const ECOSYSTEM_METRICS = {
  totalRepos: ECOSYSTEM_REPOSITORIES.length,
  sourceCheckedAt: CATALOG_CHECKED_AT,
  observedGitHubReleases: ECOSYSTEM_REPOSITORIES.filter(
    (repository) => repository.release.status === 'release_observed',
  ).length,
  categoryCounts,
  primaryEntities: 'Nymrel (legalName: JalenBuilds LLC)',
} as const;
