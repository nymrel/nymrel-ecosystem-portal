import { useState } from 'react';
import { ArrowDown, Check, Copy, Cpu, Shield, Sparkles, Terminal } from 'lucide-react';
import { ECOSYSTEM_METRICS } from '../data/ecosystem';

interface HeroSectionProps {
  onExploreClick: () => void;
  onEvidenceClick: () => void;
  onQuickstartClick: () => void;
}

type CopyState = 'idle' | 'copied' | 'unavailable';

export const HeroSection = ({
  onExploreClick,
  onEvidenceClick,
  onQuickstartClick,
}: HeroSectionProps) => {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const checkoutCommand =
    'git clone https://github.com/nymrel/nymrel-ecosystem-portal.git';

  const copyCheckout = async () => {
    try {
      await navigator.clipboard.writeText(checkoutCommand);
      setCopyState('copied');
    } catch {
      setCopyState('unavailable');
    }
    window.setTimeout(() => setCopyState('idle'), 2000);
  };

  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <div className="nym-container hero-content">
        <div className="eyebrow-row">
          <span className="nym-badge nym-badge-terracotta">
            <Sparkles size={12} aria-hidden="true" />
            Public source snapshot
          </span>
          <span className="nym-badge nym-badge-cedar">
            <Shield size={12} aria-hidden="true" />
            Evidence-bounded
          </span>
          <span className="nym-badge nym-badge-neutral">
            <Cpu size={12} aria-hidden="true" />
            Checked {ECOSYSTEM_METRICS.sourceCheckedAt}
          </span>
        </div>

        <p className="hero-overline">Nymrel open-source ecosystem</p>
        <h1 id="hero-heading">A clear map of what we have made public.</h1>
        <p className="hero-lede">
          Browse {ECOSYSTEM_METRICS.totalRepos} public Nymrel repositories across agent
          systems, commerce, security, machine trust, and developer tooling. This portal
          reports captured source metadata and observed GitHub release state without
          treating a repository description as independent proof.
        </p>

        <div className="hero-actions">
          <button className="nym-btn-primary hero-action" type="button" onClick={onExploreClick}>
            Browse the snapshot
            <ArrowDown size={16} aria-hidden="true" />
          </button>
          <button className="nym-btn-accent hero-action" type="button" onClick={onEvidenceClick}>
            <Sparkles size={16} aria-hidden="true" />
            Inspect the evidence model
          </button>
          <button className="nym-btn-secondary hero-action" type="button" onClick={onQuickstartClick}>
            <Terminal size={16} aria-hidden="true" />
            Check out source
          </button>
        </div>

        <div className="checkout-strip" aria-label="Portal source checkout command">
          <Terminal size={16} aria-hidden="true" />
          <code>{checkoutCommand}</code>
          <button
            className="checkout-copy"
            type="button"
            onClick={copyCheckout}
            aria-label="Copy portal source checkout command"
          >
            {copyState === 'copied' ? (
              <Check size={15} aria-hidden="true" />
            ) : (
              <Copy size={15} aria-hidden="true" />
            )}
            <span aria-live="polite">
              {copyState === 'copied'
                ? 'Copied'
                : copyState === 'unavailable'
                  ? 'Copy unavailable'
                  : 'Copy'}
            </span>
          </button>
        </div>

        <dl className="hero-metrics">
          <div>
            <dt>Public repositories</dt>
            <dd>{ECOSYSTEM_METRICS.totalRepos}</dd>
          </div>
          <div>
            <dt>Catalog categories</dt>
            <dd>{Object.keys(ECOSYSTEM_METRICS.categoryCounts).length}</dd>
          </div>
          <div>
            <dt>GitHub releases observed</dt>
            <dd>{ECOSYSTEM_METRICS.observedGitHubReleases}</dd>
          </div>
          <div>
            <dt>Registry status</dt>
            <dd className="metric-text">Not assessed</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};
