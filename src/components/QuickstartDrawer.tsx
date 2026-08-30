import { useEffect, useId, useRef, useState } from 'react';
import { Check, Copy, ExternalLink, Terminal, X } from 'lucide-react';
import { ECOSYSTEM_REPOSITORIES } from '../data/ecosystem';

interface QuickstartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickstartDrawer = ({ isOpen, onClose }: QuickstartDrawerProps) => {
  const [repositoryId, setRepositoryId] = useState(ECOSYSTEM_REPOSITORIES[0]?.id ?? '');
  const [copied, setCopied] = useState(false);
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const repository =
    ECOSYSTEM_REPOSITORIES.find((candidate) => candidate.id === repositoryId) ??
    ECOSYSTEM_REPOSITORIES[0];

  useEffect(() => {
    if (!isOpen) {
      return () => undefined;
    }

    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !repository) {
    return null;
  }

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(repository.sourceCheckoutCommand);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="dialog-layer">
      <button className="dialog-scrim" type="button" onClick={onClose} aria-label="Close source checkout" />
      <dialog
        open
        className="drawer-panel"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="dialog-header">
          <div>
            <p className="section-kicker">Source-first boundary</p>
            <h2 id={titleId}>Check out a repository</h2>
          </div>
          <button
            ref={closeButtonRef}
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Close source checkout"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="dialog-content">
          <p className="boundary-note">
            This portal does not assert that these projects are published to npm, PyPI,
            Bun, or a CDN. Clone source, read the repository instructions, and run its
            own verification before use.
          </p>

          <label className="field-label" htmlFor="quickstart-repository">
            Public repository
          </label>
          <select
            id="quickstart-repository"
            value={repository.id}
            onChange={(event) => setRepositoryId(event.target.value)}
          >
            {ECOSYSTEM_REPOSITORIES.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name}
              </option>
            ))}
          </select>

          <div className="code-panel">
            <div className="code-panel-label">
              <Terminal size={15} aria-hidden="true" />
              Source checkout
            </div>
            <code>{repository.sourceCheckoutCommand}</code>
            <button className="nym-btn-secondary" type="button" onClick={() => void copyCommand()}>
              {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
              <span aria-live="polite">{copied ? 'Copied' : 'Copy command'}</span>
            </button>
          </div>

          <ol className="checkout-steps">
            <li>Open the repository README and local contribution instructions.</li>
            <li>Inspect its lockfiles, supported runtimes, license, and release boundary.</li>
            <li>Run the repository’s own tests and security checks in an isolated checkout.</li>
          </ol>

          <a
            className="nym-btn-primary"
            href={repository.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open {repository.repoName}
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </dialog>
    </div>
  );
};
