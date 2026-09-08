import { useMemo, useState } from 'react';
import { Check, Copy, ExternalLink, GitBranch, Info, Layers } from 'lucide-react';
import {
  CATEGORIES,
  ECOSYSTEM_METRICS,
  ECOSYSTEM_REPOSITORIES,
  type Category,
  type EcosystemRepo,
} from '../data/ecosystem';
import { ToolDetailModal } from './ToolDetailModal';

interface ToolGridProps {
  searchQuery: string;
  onClearSearch: () => void;
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(new Date(value));

export const ToolGrid = ({ searchQuery, onClearSearch }: ToolGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [copiedId, setCopiedId] = useState<string>();
  const [activeRepository, setActiveRepository] = useState<EcosystemRepo>();

  const filteredRepositories = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();

    return ECOSYSTEM_REPOSITORIES.filter((repository) => {
      const categoryMatches =
        selectedCategory === 'All' || repository.category === selectedCategory;
      const textMatches =
        query.length === 0 ||
        [
          repository.name,
          repository.repoName,
          repository.category,
          repository.primaryLanguage,
          repository.sourceDescription,
        ].some((value) => value.toLocaleLowerCase().includes(query));

      return categoryMatches && textMatches;
    });
  }, [searchQuery, selectedCategory]);

  const copyCheckout = async (repository: EcosystemRepo) => {
    try {
      await navigator.clipboard.writeText(repository.sourceCheckoutCommand);
      setCopiedId(repository.id);
      window.setTimeout(() => setCopiedId(undefined), 2000);
    } catch {
      setCopiedId(undefined);
    }
  };

  return (
    <section id="repositories" className="catalog-section" aria-labelledby="catalog-heading">
      <div className="nym-container">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Captured GitHub organization metadata</p>
            <h2 id="catalog-heading">Public repository catalog</h2>
            <p>
              Descriptions below are labeled as owner-supplied GitHub metadata. Open a
              repository and run its own checks before relying on capability or release
              claims.
            </p>
          </div>
          <div className="snapshot-stamp">
            <span>Snapshot</span>
            <strong>{ECOSYSTEM_METRICS.sourceCheckedAt}</strong>
          </div>
        </div>

        <fieldset className="category-filter">
          <legend className="sr-only">Filter repositories by category</legend>
          {CATEGORIES.map((category) => {
            const count =
              category === 'All'
                ? ECOSYSTEM_METRICS.totalRepos
                : ECOSYSTEM_METRICS.categoryCounts[category];
            return (
              <button
                key={category}
                className="filter-button"
                type="button"
                aria-pressed={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                <Layers size={14} aria-hidden="true" />
                <span>{category}</span>
                <span className="filter-count">{count}</span>
              </button>
            );
          })}
        </fieldset>

        <div className="catalog-result-bar" aria-live="polite">
          <span>
            Showing <strong>{filteredRepositories.length}</strong> of{' '}
            {ECOSYSTEM_METRICS.totalRepos} repositories
          </span>
          {(searchQuery.length > 0 || selectedCategory !== 'All') && (
            <button
              className="text-button"
              type="button"
              onClick={() => {
                onClearSearch();
                setSelectedCategory('All');
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredRepositories.length === 0 ? (
          <div className="empty-state">
            <Info size={24} aria-hidden="true" />
            <h3>No repositories match this view</h3>
            <p>Try another source name, language, or category.</p>
            <button
              className="nym-btn-secondary"
              type="button"
              onClick={() => {
                onClearSearch();
                setSelectedCategory('All');
              }}
            >
              Reset catalog
            </button>
          </div>
        ) : (
          <div className="repository-grid">
            {filteredRepositories.map((repository) => (
              <article className="repository-card" key={repository.id}>
                <div className="repository-card-top">
                  <span className="category-label">{repository.category}</span>
                  <span
                    className={
                      repository.release.status === 'release_observed'
                        ? 'evidence-pill evidence-pill-positive'
                        : 'evidence-pill'
                    }
                  >
                    {repository.release.status === 'release_observed'
                      ? 'GitHub release observed'
                      : 'No GitHub release observed'}
                  </span>
                </div>
                <div className="repository-title-row">
                  <div>
                    <h3>{repository.name}</h3>
                    <code>{repository.repoName}</code>
                  </div>
                  <a
                    className="icon-link"
                    href={repository.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={'Open ' + repository.name + ' on GitHub'}
                  >
                    <GitBranch size={18} aria-hidden="true" />
                  </a>
                </div>

                <div className="source-description">
                  <span>GitHub repository description</span>
                  <p>{repository.sourceDescription}</p>
                </div>

                <dl className="repository-facts">
                  <div>
                    <dt>Primary language</dt>
                    <dd>{repository.primaryLanguage}</dd>
                  </div>
                  <div>
                    <dt>Default branch</dt>
                    <dd>{repository.defaultBranch}</dd>
                  </div>
                  <div>
                    <dt>Last source update</dt>
                    <dd>{formatDate(repository.lastSourceUpdate)}</dd>
                  </div>
                  <div>
                    <dt>Portal validation</dt>
                    <dd>Not assessed</dd>
                  </div>
                </dl>

                <div className="repository-card-actions">
                  <button
                    className="nym-btn-secondary"
                    type="button"
                    onClick={() => setActiveRepository(repository)}
                  >
                    <Info size={15} aria-hidden="true" />
                    Evidence details
                  </button>
                  <button
                    className="nym-btn-ghost"
                    type="button"
                    onClick={() => void copyCheckout(repository)}
                    aria-label={
                      (copiedId === repository.id ? 'Copied' : 'Clone') +
                      ': source checkout command for ' +
                      repository.name
                    }
                  >
                    {copiedId === repository.id ? (
                      <Check size={15} aria-hidden="true" />
                    ) : (
                      <Copy size={15} aria-hidden="true" />
                    )}
                    <span>{copiedId === repository.id ? 'Copied' : 'Clone'}</span>
                  </button>
                  <a
                    className="nym-btn-ghost"
                    href={repository.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Source
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <ToolDetailModal
        repository={activeRepository}
        onClose={() => setActiveRepository(undefined)}
      />
    </section>
  );
};
