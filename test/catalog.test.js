import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  ECOSYSTEM_REPOSITORIES,
  CATEGORIES,
  ECOSYSTEM_METRICS
} from '../src/data/ecosystem.ts';

const EXPECTED_CATEGORIES = [
  'All',
  'Agents & Swarms',
  'Commerce & Micropayments',
  'Security & Sandboxing',
  'UI & Machine Trust',
  'Developer Tools'
];

const EXPECTED_REPO_IDS = [
  'swarm-studio',
  'open-ucp',
  'agent-sandstorm',
  'agentic-ucp-scanner',
  'a2ui-warm-paper',
  'agent-action-surety',
  'nymrel-machine-trust',
  'nymrel-proof-ledger',
  'local-agent-forge',
  'headless-quote-layer',
  'builderwars',
  'crawler-mesh',
  'nymrel-plugin',
  'agent-beacon',
  'trust-scorecard',
  'mcp-hub',
  'swarm-protocol',
  'ai-visibility-scorecard',
  'presence',
  'permitmesh',
  'noop-flags',
  'chatgpt-recommends',
  'token-spend-dashboard',
  'qr-utm-generator',
  'json-ld-generator',
  'llms-txt-generator',
  'agent-proofchain',
  'ecosystem-portal'
];

describe('Nymrel Ecosystem Catalog Integrity Tests', () => {
  it('should contain exactly 28 public repositories (full org catalog)', () => {
    assert.strictEqual(ECOSYSTEM_REPOSITORIES.length, 28, 'Expected exactly 28 public repositories');
    assert.strictEqual(EXPECTED_REPO_IDS.length, 28, 'Expected-repo fixture itself must list 28');
  });

  it('should cover every expected repository id with no duplicates', () => {
    const repoIds = ECOSYSTEM_REPOSITORIES.map(r => r.id);
    EXPECTED_REPO_IDS.forEach(id => {
      assert.ok(repoIds.includes(id), `Missing repository: ${id}`);
    });
    assert.strictEqual(new Set(repoIds).size, repoIds.length, 'Repository ids must be unique');
  });

  it('should contain all required categories', () => {
    assert.deepStrictEqual(CATEGORIES, EXPECTED_CATEGORIES);
  });

  it('should have unique GitHub URLs pointing at the nymrel org', () => {
    const urls = ECOSYSTEM_REPOSITORIES.map(r => r.githubUrl);
    urls.forEach(url => {
      assert.ok(url.startsWith('https://github.com/nymrel/'), `Invalid GitHub URL: ${url}`);
    });
    assert.strictEqual(new Set(urls).size, urls.length, 'GitHub URLs must be unique');
  });

  it('should validate per-repository schema fields', () => {
    ECOSYSTEM_REPOSITORIES.forEach(repo => {
      assert.ok(repo.name && repo.name.length > 0, `Repo ${repo.id} missing name`);
      assert.ok(repo.packageName && repo.packageName.length > 0, `Repo ${repo.id} missing packageName`);
      assert.ok(repo.shortDescription && repo.shortDescription.length > 10, `Repo ${repo.id} missing shortDescription`);
      assert.ok(repo.fullDescription && repo.fullDescription.length > 30, `Repo ${repo.id} missing fullDescription`);
      assert.ok(CATEGORIES.includes(repo.category), `Repo ${repo.id} has invalid category ${repo.category}`);
      assert.ok(['MIT', 'Apache-2.0'].includes(repo.license), `Repo ${repo.id} has unexpected license ${repo.license}`);
      assert.ok(typeof repo.stars === 'number' && repo.stars >= 0, `Repo ${repo.id} stars must be a non-negative number`);
      assert.ok(repo.installSnippet && repo.installSnippet.length > 0, `Repo ${repo.id} missing installSnippet`);
      assert.ok(Array.isArray(repo.features) && repo.features.length >= 3, `Repo ${repo.id} must have >= 3 features`);
      assert.ok(Array.isArray(repo.badges) && repo.badges.length >= 3, `Repo ${repo.id} must have >= 3 badges`);
      assert.ok(Array.isArray(repo.tags) && repo.tags.length >= 3, `Repo ${repo.id} must have >= 3 tags`);
      assert.ok(repo.architectureOverview && repo.architectureOverview.length > 20, `Repo ${repo.id} missing architectureOverview`);
    });
  });

  it('should only advertise install commands that work today (git clone, no fake npm)', () => {
    ECOSYSTEM_REPOSITORIES.forEach(repo => {
      assert.match(
        repo.installSnippet,
        /^git clone https:\/\/github\.com\/nymrel\//,
        `Repo ${repo.id} installSnippet must be a git clone until packages are published`
      );
    });
  });

  it('should verify ecosystem metrics match the actual catalog', () => {
    const zeroDep = ECOSYSTEM_REPOSITORIES.filter(r => r.zeroDependency).length;
    const mit = ECOSYSTEM_REPOSITORIES.filter(r => r.license === 'MIT').length;
    const apache = ECOSYSTEM_REPOSITORIES.filter(r => r.license === 'Apache-2.0').length;

    assert.strictEqual(ECOSYSTEM_METRICS.totalRepos, ECOSYSTEM_REPOSITORIES.length);
    assert.strictEqual(ECOSYSTEM_METRICS.totalRepos, 28);
    assert.strictEqual(ECOSYSTEM_METRICS.zeroDependencyCount, zeroDep, 'zeroDependencyCount drifted from catalog');
    assert.strictEqual(ECOSYSTEM_METRICS.mitLicensed, mit, 'mitLicensed drifted from catalog');
    assert.strictEqual(ECOSYSTEM_METRICS.apacheLicensed, apache, 'apacheLicensed drifted from catalog');
    assert.strictEqual(ECOSYSTEM_METRICS.primaryEntities, 'Nymrel -> JalenBuilds LLC');
  });
});
