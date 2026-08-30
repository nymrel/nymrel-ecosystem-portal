import { useEffect, useId, useRef } from 'react';
import { GitBranch, Search, Sparkles, Terminal, X } from 'lucide-react';
import { ECOSYSTEM_METRICS } from '../data/ecosystem';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenQuickstart: () => void;
  onOpenEvidence: () => void;
}

export const Header = ({
  searchQuery,
  onSearchChange,
  onOpenQuickstart,
  onOpenEvidence,
}: HeaderProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchId = useId();

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      const target = event.target;
      const isEditing =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.matches('input, textarea, select, [role="textbox"]'));

      if (event.key === '/' && !isEditing) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  return (
    <header className="site-header">
      <div className="nym-container header-layout">
        <a className="brand-lockup" href="#top" aria-label="Nymrel ecosystem home">
          <span className="brand-mark" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 18 12 6l8 12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="14" r="2.2" fill="#C76532" />
            </svg>
          </span>
          <span>
            <span className="brand-row">
              <span className="brand-name">Nymrel</span>
              <span className="brand-kicker">Ecosystem</span>
            </span>
            <span className="brand-subtitle">Public source catalog</span>
          </span>
        </a>

        <div className="search-shell">
          <label className="sr-only" htmlFor={searchId}>
            Search the Nymrel public repository snapshot
          </label>
          <Search size={17} aria-hidden="true" />
          <input
            ref={searchInputRef}
            id={searchId}
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={'Search ' + ECOSYSTEM_METRICS.totalRepos + ' public repositories'}
            aria-keyshortcuts="/"
          />
          {searchQuery.length > 0 ? (
            <button
              className="icon-button"
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear repository search"
            >
              <X size={15} aria-hidden="true" />
            </button>
          ) : (
            <kbd aria-hidden="true">/</kbd>
          )}
        </div>

        <nav className="header-actions" aria-label="Ecosystem actions">
          <button className="nym-btn-secondary compact-action" type="button" onClick={onOpenEvidence}>
            <Sparkles size={15} aria-hidden="true" />
            <span>Evidence</span>
          </button>
          <button className="nym-btn-primary compact-action" type="button" onClick={onOpenQuickstart}>
            <Terminal size={15} aria-hidden="true" />
            <span>Source checkout</span>
          </button>
          <a
            className="nym-btn-ghost github-action"
            href="https://github.com/nymrel"
            target="_blank"
            rel="noreferrer"
            aria-label={'View all ' + ECOSYSTEM_METRICS.totalRepos + ' public Nymrel repositories on GitHub'}
          >
            <GitBranch size={18} aria-hidden="true" />
            <span>{ECOSYSTEM_METRICS.totalRepos}</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
