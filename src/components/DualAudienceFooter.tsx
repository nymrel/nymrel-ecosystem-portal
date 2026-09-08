import { FileText, GitBranch, Globe, Mail, ShieldCheck } from 'lucide-react';
import { ECOSYSTEM_METRICS } from '../data/ecosystem';

export const DualAudienceFooter = () => (
  <footer className="site-footer">
    <div className="nym-container">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <span className="brand-mark" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
            <strong>Nymrel</strong>
          </div>
          <p>
            We build and run products, services, websites, software, and apps.
            This portal is a bounded view of our public GitHub source, maintained
            under JalenBuilds LLC.
          </p>
          <span className="footer-snapshot">
            {ECOSYSTEM_METRICS.totalRepos} public repositories checked{' '}
            {ECOSYSTEM_METRICS.sourceCheckedAt}
          </span>
        </div>

        <div>
          <h2>
            <ShieldCheck size={17} aria-hidden="true" />
            Evidence boundary
          </h2>
          <p>
            Public source presence is not the same as package publication, validation,
            deployment, adoption, customer activation, or revenue. Those states stay
            explicit and separate throughout this catalog.
          </p>
        </div>

        <nav aria-label="Nymrel ecosystem links">
          <h2>
            <Globe size={17} aria-hidden="true" />
            Open surfaces
          </h2>
          <a href="/llms.txt" target="_blank" rel="noreferrer">
            <FileText size={15} aria-hidden="true" />
            Machine-readable catalog
          </a>
          <a href="https://github.com/nymrel" target="_blank" rel="noreferrer">
            <GitBranch size={15} aria-hidden="true" />
            GitHub organization
          </a>
          <a href="mailto:contact@nymrel.com">
            <Mail size={15} aria-hidden="true" />
            contact@nymrel.com
          </a>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 Nymrel / JalenBuilds LLC.</span>
        <span>Portal source license: MIT. Repository licenses are assessed separately.</span>
      </div>
    </div>
  </footer>
);
