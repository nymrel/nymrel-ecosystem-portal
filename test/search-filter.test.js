import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { ECOSYSTEM_REPOSITORIES } from '../src/data/ecosystem.ts';

const search = (query, category = 'All') => {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return ECOSYSTEM_REPOSITORIES.filter((repository) => {
    const categoryMatches =
      category === 'All' || repository.category === category;
    const textMatches =
      normalizedQuery.length === 0 ||
      [
        repository.name,
        repository.repoName,
        repository.category,
        repository.primaryLanguage,
        repository.sourceDescription,
      ].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));

    return categoryMatches && textMatches;
  });
};

describe('catalog search and filter behavior', () => {
  it('filters the five evidence categories at their captured counts', () => {
    assert.equal(search('', 'Agents & Swarms').length, 10);
    assert.equal(search('', 'Commerce & Micropayments').length, 3);
    assert.equal(search('', 'Security & Sandboxing').length, 5);
    assert.equal(search('', 'UI & Machine Trust').length, 7);
    assert.equal(search('', 'Developer Tools').length, 4);
  });

  it('searches source identity, owner description, category, and language', () => {
    assert.deepEqual(
      search('micropayments').map((repository) => repository.id),
      ['agentic-ucp-scanner', 'headless-quote-layer', 'open-ucp'],
    );
    assert.ok(search('python').some((repository) => repository.id === 'permitmesh'));
    assert.ok(
      search('machine trust').some(
        (repository) => repository.id === 'nymrel-machine-trust',
      ),
    );
    assert.deepEqual(
      search('nymrel-agent').map((repository) => repository.id),
      ['nymrel-agent'],
    );
  });

  it('combines category and text filters and permits an empty result', () => {
    assert.deepEqual(
      search('typescript', 'Commerce & Micropayments').map(
        (repository) => repository.id,
      ),
      ['agentic-ucp-scanner', 'headless-quote-layer', 'open-ucp'],
    );
    assert.deepEqual(search('nonexistent-tool-xyz-12345'), []);
  });
});

describe('evidence fixture boundary', () => {
  it('does not convert catalog metadata into validation, adoption, or revenue proof', () => {
    for (const repository of ECOSYSTEM_REPOSITORIES) {
      const fixture = {
        source: repository.githubUrl,
        release: repository.release,
        portalAssessment: {
          validation: repository.validationStatus,
          adoption: repository.adoptionStatus,
          revenue: repository.revenueStatus,
        },
      };

      assert.equal(fixture.portalAssessment.validation, 'not_assessed_by_portal');
      assert.equal(fixture.portalAssessment.adoption, 'not_assessed');
      assert.equal(fixture.portalAssessment.revenue, 'not_assessed');
    }
  });
});
