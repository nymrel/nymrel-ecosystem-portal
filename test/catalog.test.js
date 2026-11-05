import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
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
  'nymrel-marketproof',
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
  'awesome-phone-call-agents',
  'noop-flags',
  'nymrel-ecosystem-portal',
  'qr-utm-generator',
  'source-read',
  'token-spend-dashboard',
];

describe('evidence-bounded ecosystem catalog', () => {
  it('contains the captured 32-repository public organization inventory', () => {
    assert.equal(ECOSYSTEM_REPOSITORIES.length, 32);
    assert.deepEqual(
      ECOSYSTEM_REPOSITORIES.map((repository) => repository.id),
      EXPECTED_REPO_IDS,
    );
    assert.equal(new Set(EXPECTED_REPO_IDS).size, EXPECTED_REPO_IDS.length);
  });

  it('binds every observed field to the captured public GitHub metadata', () => {
    const snapshot = JSON.parse(readFileSync(new URL('../docs/catalog-snapshot.json', import.meta.url), 'utf8'));
    assert.equal(CATALOG_CHECKED_AT, snapshot.checkedAt);
    assert.match(CATALOG_CHECKED_AT, /^\d{4}-\d{2}-\d{2} UTC$/u);
    assert.equal(snapshot.repositories.length, ECOSYSTEM_REPOSITORIES.length);
    assert.equal(new Set(snapshot.repositories.map((row) => row.repoName)).size, snapshot.repositories.length);
    for (const repository of ECOSYSTEM_REPOSITORIES) {
      const captured = snapshot.repositories.find((row) => row.repoName === repository.repoName);
      assert.ok(captured, repository.repoName);
      assert.equal(captured.visibility, 'public');
      assert.equal(captured.archived, false);
      assert.equal(repository.sourceDescription, captured.description ?? 'No GitHub repository description was present when this snapshot was captured.');
      assert.equal(repository.primaryLanguage, captured.language ?? 'Not reported');
      assert.equal(repository.defaultBranch, captured.defaultBranch);
      assert.equal(repository.forkOf, captured.parentUrl);
      assert.equal(repository.lastSourceUpdate, captured.lastSourceUpdate);
      assert.deepEqual(repository.release, captured.release);
    }
    assert.equal(snapshot.repositories.find((row) => row.repoName === 'awesome-phone-call-agents')?.fork, true);
    assert.match(ECOSYSTEM_REPOSITORIES.find((row) => row.id === 'awesome-phone-call-agents')?.name ?? '', /\(fork\)/u);
  });

  it('keeps both machine-readable copies generated from the same source snapshot', () => {
    const output = execFileSync(process.execPath, [
      fileURLToPath(new URL('../scripts/generate-llms.mjs', import.meta.url)), '--check',
    ], { encoding: 'utf8' });
    assert.match(output, /llms.txt verified: 32 repositories/);
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

    assert.deepEqual(released.map((repository) => [repository.id, repository.release.tag]), [
      ['nymrel-agent', 'v0.4.0'],
      ['nymrel-swarm-studio', 'v1.0.0'],
      ['source-read', 'v0.2.0'],
    ]);
    assert.ok(released.every((repository) => repository.registryStatus === 'not_assessed'));
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
      'Commerce & Micropayments': 4,
      'Security & Sandboxing': 5,
      'UI & Machine Trust': 7,
      'Developer Tools': 6,
    });
    assert.equal(ECOSYSTEM_METRICS.totalRepos, 32);
    assert.equal(ECOSYSTEM_METRICS.observedGitHubReleases, 3);
    assert.equal(
      ECOSYSTEM_METRICS.primaryEntities,
      'Nymrel (legalName: JalenBuilds LLC)',
    );
  });
});
