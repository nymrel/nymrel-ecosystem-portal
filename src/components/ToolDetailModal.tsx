import { useEffect, useId, useRef, useState } from 'react';
import { Check, Copy, ExternalLink, GitBranch, X } from 'lucide-react';
import type { EcosystemRepo } from '../data/ecosystem';

interface ToolDetailModalProps {
  repository: EcosystemRepo | undefined;
  onClose: () => void;
}

const evidenceLabel = (value: string) => value.replaceAll('_', ' ');

export const ToolDetailModal = ({ repository, onClose }: ToolDetailModalProps) => {
  const [copied, setCopied] = useState(false);
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!repository) {
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
  }, [onClose, repository]);

  if (!repository) {
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
      <button className="dialog-scrim" type="button" onClick={onClose} aria-label="Close repository evidence" />
      <dialog
        open
        className="modal-panel"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="dialog-header">
          <div>
            <p className="section-kicker">{repository.category}</p>
            <h2 id={titleId}>{repository.name}</h2>
            <code>{repository.repoName}</code>
          </div>
          <button
            ref={closeButtonRef}
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Close repository evidence"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="dialog-content">
          <div className="source-description source-description-large">
            <span>Owner-supplied GitHub repository description</span>
            <p>{repository.sourceDescription}</p>
          </div>

          <dl className="evidence-list">
            <div>
              <dt>Source inventory checked</dt>
              <dd>{repository.sourceCheckedAt}</dd>
            </div>
            <div>
              <dt>Last source update observed</dt>
              <dd>{repository.lastSourceUpdate}</dd>
            </div>
            <div>
              <dt>Primary language</dt>
              <dd>{repository.primaryLanguage}</dd>
            </div>
            <div>
              <dt>Default branch</dt>
              <dd>{repository.defaultBranch}</dd>
            </div>
            <div>
              <dt>GitHub release state</dt>
              <dd>
                {repository.release.status === 'release_observed'
                  ? 'Observed ' + repository.release.tag + ' on ' + repository.release.publishedAt
                  : 'No latest GitHub release was returned'}
              </dd>
            </div>
            <div>
              <dt>Package registry</dt>
              <dd>{evidenceLabel(repository.registryStatus)}</dd>
            </div>
            <div>
              <dt>License</dt>
              <dd>{evidenceLabel(repository.licenseStatus)}</dd>
            </div>
            <div>
              <dt>Portal validation</dt>
              <dd>{evidenceLabel(repository.validationStatus)}</dd>
            </div>
            <div>
              <dt>External adoption</dt>
              <dd>{evidenceLabel(repository.adoptionStatus)}</dd>
            </div>
            <div>
              <dt>Revenue</dt>
              <dd>{evidenceLabel(repository.revenueStatus)}</dd>
            </div>
          </dl>

          <div className="code-panel">
            <div className="code-panel-label">Source checkout</div>
            <code>{repository.sourceCheckoutCommand}</code>
            <button className="nym-btn-secondary" type="button" onClick={() => void copyCommand()}>
              {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
              <span aria-live="polite">{copied ? 'Copied' : 'Copy command'}</span>
            </button>
          </div>

          <a
            className="nym-btn-primary"
            href={repository.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            <GitBranch size={16} aria-hidden="true" />
            Inspect repository
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </dialog>
    </div>
  );
};
