import { useMemo, useState } from 'react';
import { Check, Copy, FileCheck, Info } from 'lucide-react';
import {
  CATALOG_CHECKED_AT,
  ECOSYSTEM_REPOSITORIES,
} from '../data/ecosystem';

export const InteractivePlayground = () => {
  const [repositoryId, setRepositoryId] = useState(
    ECOSYSTEM_REPOSITORIES[0]?.id ?? '',
  );
  const [copied, setCopied] = useState(false);
  const repository =
    ECOSYSTEM_REPOSITORIES.find((candidate) => candidate.id === repositoryId) ??
    ECOSYSTEM_REPOSITORIES[0];

  const snapshot = useMemo(() => {
    if (!repository) {
      return {};
    }

    return {
      schema: 'nymrel.portal.source-snapshot.v1',
      capturedAt: CATALOG_CHECKED_AT,
      source: {
        kind: 'github_public_repository_metadata',
        url: repository.githubUrl,
        descriptionAttribution: 'repository_owner_supplied',
      },
      repository: {
        name: repository.repoName,
        category: repository.category,
        primaryLanguage: repository.primaryLanguage,
        defaultBranch: repository.defaultBranch,
        lastSourceUpdate: repository.lastSourceUpdate,
        latestGitHubRelease: repository.release,
      },
      portalAssessment: {
        registry: repository.registryStatus,
        license: repository.licenseStatus,
        validation: repository.validationStatus,
        adoption: repository.adoptionStatus,
        revenue: repository.revenueStatus,
      },
      disclaimer:
        'Illustrative snapshot generated from the portal catalog. It is not a live repository probe or production attestation.',
    };
  }, [repository]);

  if (!repository) {
    return null;
  }

  const serializedSnapshot = JSON.stringify(snapshot, null, 2);

  const copySnapshot = async () => {
    try {
      await navigator.clipboard.writeText(serializedSnapshot);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="evidence-explorer"
      className="evidence-section"
      aria-labelledby="evidence-heading"
    >
      <div className="nym-container">
        <div className="section-heading evidence-heading">
          <div>
            <p className="section-kicker">Illustrative local fixture</p>
            <h2 id="evidence-heading">Inspect the catalog evidence contract</h2>
            <p>
              See exactly what the portal knows, what it merely repeats from GitHub, and
              what remains unassessed. This browser-generated JSON is not a live probe,
              signed receipt, or production validation.
            </p>
          </div>
          <span className="fixture-badge">
            <Info size={15} aria-hidden="true" />
            Fixture — not attestation
          </span>
        </div>

        <div className="evidence-workbench">
          <div className="evidence-controls">
            <FileCheck size={28} aria-hidden="true" />
            <h3>Repository source record</h3>
            <p>
              Select a public repository to render the same bounded fields used by the
              catalog cards and machine-readable context.
            </p>

            <label className="field-label" htmlFor="evidence-repository">
              Repository
            </label>
            <select
              id="evidence-repository"
              value={repository.id}
              onChange={(event) => setRepositoryId(event.target.value)}
            >
              {ECOSYSTEM_REPOSITORIES.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name}
                </option>
              ))}
            </select>

            <dl className="evidence-summary">
              <div>
                <dt>Description source</dt>
                <dd>Repository owner metadata</dd>
              </div>
              <div>
                <dt>Release observation</dt>
                <dd>{repository.release.status.replaceAll('_', ' ')}</dd>
              </div>
              <div>
                <dt>Validation</dt>
                <dd>Not assessed by portal</dd>
              </div>
            </dl>
          </div>

          <div className="json-panel">
            <div className="json-panel-header">
              <span>nymrel.portal.source-snapshot.v1</span>
              <button
                className="nym-btn-ghost"
                type="button"
                onClick={() => void copySnapshot()}
              >
                {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                <span aria-live="polite">{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre>
              <code>{serializedSnapshot}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
