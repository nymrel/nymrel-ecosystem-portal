import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  CATEGORIES,
  CATALOG_CHECKED_AT,
  ECOSYSTEM_METRICS,
  ECOSYSTEM_REPOSITORIES,
} from '../src/data/ecosystem.ts';

const EXPECTED_REPO_IDS = [
  'agent-beacon',
  'builderwars',
  'local-agent-forge',
  'nymrel-agent',
  'nymrel-crawler-mesh',
  'nymrel-mcp-hub',
  'nymrel-plugin',
  'nymrel-swarm-protocol',
  'nymrel-swarm-studio',
  'presence',
  'agentic-ucp-scanner',
  'headless-quote-layer',
  'open-ucp',
  'agent-action-surety',
  'agent-proofchain',
  'agent-sandstorm',
  'nymrel-proof-ledger',
  'permitmesh',
  'a2ui-warm-paper',
  'ai-visibility-scorecard',
  'chatgpt-recommends',
  'json-ld-generator',
  'llms-txt-generator',
  'nymrel-machine-trust',
  'nymrel-trust-scorecard',
  'noop-flags',
  'nymrel-ecosystem-portal',
  'qr-utm-generator',
  'token-spend-dashboard',
];

describe('evidence-bounded ecosystem catalog', () => {
  it('contains the captured 29-repository public organization inventory', () => {
    assert.equal(ECOSYSTEM_REPOSITORIES.length, 29);
    assert.deepEqual(
      ECOSYSTEM_REPOSITORIES.map((repository) => repository.id),
      EXPECTED_REPO_IDS,
    );
    assert.equal(new Set(EXPECTED_REPO_IDS).size, EXPECTED_REPO_IDS.length);
  });

  it('uses unique canonical GitHub source identities', () => {
    const urls = ECOSYSTEM_REPOSITORIES.map((repository) => repository.githubUrl);
    const names = ECOSYSTEM_REPOSITORIES.map((repository) => repository.repoName);

    assert.equal(new Set(urls).size, urls.length);
    assert.equal(new Set(names).size, names.length);

    for (const repository of ECOSYSTEM_REPOSITORIES) {
      assert.equal(
        repository.githubUrl,
        'https://github.com/nymrel/' + repository.repoName,
      );
      assert.equal(
        repository.sourceCheckoutCommand,
        'git clone ' + repository.githubUrl + '.git',
      );
      assert.equal(repository.sourceCheckedAt, CATALOG_CHECKED_AT);
      assert.match(repository.lastSourceUpdate, /^\d{4}-\d{2}-\d{2}T/u);
      assert.ok(repository.sourceDescription.length > 20);
    }
  });

  it('keeps unverified boundary states explicit instead of inferring them', () => {
    for (const repository of ECOSYSTEM_REPOSITORIES) {
      assert.equal(repository.registryStatus, 'not_assessed');
      assert.equal(repository.licenseStatus, 'not_assessed');
      assert.equal(repository.validationStatus, 'not_assessed_by_portal');
      assert.equal(repository.adoptionStatus, 'not_assessed');
      assert.equal(repository.revenueStatus, 'not_assessed');

      for (const removedClaimField of [
        'packageName',
        'installSnippet',
        'zeroDependency',
        'rating',
        'stars',
        'features',
      ]) {
        assert.equal(
          Object.hasOwn(repository, removedClaimField),
          false,
          repository.id + ' must not carry unsupported ' + removedClaimField,
        );
      }
    }
  });

  it('reports observed GitHub release evidence without treating it as registry proof', () => {
    const released = ECOSYSTEM_REPOSITORIES.filter(
      (repository) => repository.release.status === 'release_observed',
    );

    assert.equal(released.length, 1);
    assert.equal(released[0]?.id, 'nymrel-agent');
    assert.equal(released[0]?.release.tag, 'v0.4.0');
    assert.equal(released[0]?.registryStatus, 'not_assessed');
  });

  it('keeps category totals and entity identity derived from the catalog', () => {
    assert.deepEqual(CATEGORIES, [
      'All',
      'Agents & Swarms',
      'Commerce & Micropayments',
      'Security & Sandboxing',
      'UI & Machine Trust',
      'Developer Tools',
    ]);
    assert.deepEqual(ECOSYSTEM_METRICS.categoryCounts, {
      'Agents & Swarms': 10,
      'Commerce & Micropayments': 3,
      'Security & Sandboxing': 5,
      'UI & Machine Trust': 7,
      'Developer Tools': 4,
    });
    assert.equal(ECOSYSTEM_METRICS.totalRepos, 29);
    assert.equal(ECOSYSTEM_METRICS.observedGitHubReleases, 1);
    assert.equal(
      ECOSYSTEM_METRICS.primaryEntities,
      'Nymrel (legalName: JalenBuilds LLC)',
    );
  });
});
