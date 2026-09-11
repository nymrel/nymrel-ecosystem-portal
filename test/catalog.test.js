import { describe, it } from 'node:test';
import assert from 'node:assert';
import { 
  ECOSYSTEM_REPOSITORIES, 
  CATEGORIES, 
  ECOSYSTEM_METRICS 
} from '../src/data/ecosystem.ts';

describe('Nymrel Ecosystem Catalog Integrity Tests', () => {
  it('should contain exactly 10 flagship open-source repositories', () => {
    assert.strictEqual(ECOSYSTEM_REPOSITORIES.length, 10, 'Expected exactly 10 open-source repositories');
  });

  it('should contain all required categories', () => {
    const expectedCategories = [
      'All',
      'Agents & Swarms',
      'Commerce & Micropayments',
      'Security & Sandboxing',
      'UI & Machine Trust'
    ];
    assert.deepStrictEqual(CATEGORIES, expectedCategories);
  });

  it('should validate repository IDs and required schema fields', () => {
    const requiredRepos = [
      'swarm-studio',
      'open-ucp',
      'agent-sandstorm',
      'agentic-ucp-scanner',
      'a2ui-warm-paper',
      'agent-action-surety',
      'nymrel-machine-trust',
      'nymrel-proof-ledger',
      'local-agent-forge',
      'headless-quote-layer'
    ];

    const repoIds = ECOSYSTEM_REPOSITORIES.map(r => r.id);
    requiredRepos.forEach(id => {
      assert.ok(repoIds.includes(id), `Missing repository: ${id}`);
    });

    ECOSYSTEM_REPOSITORIES.forEach(repo => {
      assert.ok(repo.name && repo.name.length > 0, `Repo ${repo.id} missing name`);
      assert.ok(repo.packageName && repo.packageName.length > 0, `Repo ${repo.id} missing packageName`);
      assert.ok(repo.shortDescription && repo.shortDescription.length > 10, `Repo ${repo.id} missing shortDescription`);
      assert.ok(repo.fullDescription && repo.fullDescription.length > 30, `Repo ${repo.id} missing fullDescription`);
      assert.ok(CATEGORIES.includes(repo.category), `Repo ${repo.id} has invalid category ${repo.category}`);
      assert.ok(repo.githubUrl.startsWith('https://github.com/nymrel/'), `Repo ${repo.id} invalid GitHub URL`);
      assert.strictEqual(repo.license, 'MIT', `Repo ${repo.id} must have MIT license`);
      assert.ok(repo.release, `Repo ${repo.id} missing release evidence`);
      assert.ok(Array.isArray(repo.features) && repo.features.length >= 3, `Repo ${repo.id} must have >= 3 features`);
      assert.ok(Array.isArray(repo.badges) && repo.badges.length >= 3, `Repo ${repo.id} must have >= 3 badges`);
      assert.ok(Array.isArray(repo.tags) && repo.tags.length >= 3, `Repo ${repo.id} must have >= 3 tags`);
      assert.ok(repo.architectureOverview && repo.architectureOverview.length > 20, `Repo ${repo.id} missing architectureOverview`);
      assert.ok(repo.zeroDependency === true, `Repo ${repo.id} must maintain zero-dependency core`);
    });
  });

  it('should verify ecosystem metrics structure and entity attribution', () => {
    assert.strictEqual(ECOSYSTEM_METRICS.totalRepos, 10);
    assert.strictEqual(ECOSYSTEM_METRICS.primaryEntities, 'Nymrel -> JalenBuilds LLC');
  });

  it('does not expose unpublished packages as installable', () => {
    ECOSYSTEM_REPOSITORIES.forEach(repo => {
      assert.strictEqual(repo.release.registry, 'unpublished', `${repo.id} must remain unpublished until registry proof exists`);
      assert.deepStrictEqual(repo.release.verifiedStates, [], `${repo.id} must not claim unverified release evidence`);
      assert.strictEqual(repo.npmUrl, undefined, `${repo.id} must not expose an npm package link`);
      assert.strictEqual('installSnippet' in repo, false, `${repo.id} must not expose an install command`);
      assert.strictEqual('cliSnippet' in repo, false, `${repo.id} must not expose a CLI command`);
    });
  });

  it('does not describe Headless Quote Layer as CDN-deliverable', () => {
    const headlessQuote = ECOSYSTEM_REPOSITORIES.find(repo => repo.id === 'headless-quote-layer');
    assert.ok(headlessQuote, 'Headless Quote Layer must remain in the catalog');
    assert.doesNotMatch(
      [...headlessQuote.features, headlessQuote.architectureOverview].join(' '),
      /\b(?:cdn|unpkg|script)\b/i,
      'An unpublished package must not imply CDN delivery'
    );
  });
});
