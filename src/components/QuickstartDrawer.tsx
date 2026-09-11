import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Sparkles, ChevronRight } from 'lucide-react';
import { ECOSYSTEM_REPOSITORIES, EcosystemRepo } from '../data/ecosystem';

interface QuickstartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickstartDrawer: React.FC<QuickstartDrawerProps> = ({ isOpen, onClose }) => {
  const [selectedRepoId, setSelectedRepoId] = useState<string>('open-ucp');
  const [activeTab, setActiveTab] = useState<'status'>('status');
  const [copied, setCopied] = useState<boolean>(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentRepo = ECOSYSTEM_REPOSITORIES.find(r => r.id === selectedRepoId) || ECOSYSTEM_REPOSITORIES[0];

  const getCommand = () => `${currentRepo.packageName}: npm package not published; no install command is available.`;

  const getUsageSample = (repo: EcosystemRepo) => `${repo.name} has no verified installation or integration evidence in this catalog.`;
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(28, 31, 29, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      justifyContent: 'flex-end',
      zIndex: 70
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'var(--nym-bg-base)',
        borderLeft: '1px solid var(--nym-border-strong)',
        boxShadow: 'var(--nym-shadow-lg)',
        width: '100%',
        maxWidth: '620px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid var(--nym-border-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--nym-bg-surface)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="nym-badge nym-badge-cedar">Release evidence</span>
              <span style={{ fontSize: '12px', color: 'var(--nym-text-muted)' }}>No install availability</span>
            </div>
            <h2 style={{ fontSize: '22px', color: 'var(--nym-cedar)', fontFamily: 'var(--nym-font-serif)' }}>
              Catalog release status
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--nym-bg-elevated)',
              border: '1px solid var(--nym-border-default)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--nym-text-secondary)'
            }}
            aria-label="Close drawer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Drawer Body (Scrollable) */}
        <div style={{ padding: '28px', overflowY: 'auto', flexGrow: 1 }}>
          {/* Select Target Repo */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--nym-text-primary)', display: 'block', marginBottom: '8px' }}>
              Select Ecosystem Engine:
            </label>
            <select
              value={selectedRepoId}
              onChange={(e) => setSelectedRepoId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--nym-radius-md)',
                border: '1px solid var(--nym-border-default)',
                backgroundColor: 'var(--nym-bg-elevated)',
                fontSize: '14px',
                color: 'var(--nym-text-primary)',
                fontFamily: 'var(--nym-font-sans)',
                cursor: 'pointer'
              }}
            >
              {ECOSYSTEM_REPOSITORIES.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name} — {r.packageName} ({r.category})
                </option>
              ))}
            </select>
          </div>

          {/* Package Manager Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'var(--nym-bg-surface)',
            padding: '4px',
            borderRadius: 'var(--nym-radius-md)',
            border: '1px solid var(--nym-border-default)',
            marginBottom: '16px',
            overflowX: 'auto'
          }}>
            {(['status'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--nym-radius-sm)',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === tab ? 'var(--nym-cedar)' : 'transparent',
                  color: activeTab === tab ? '#FAF8F2' : 'var(--nym-text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                REGISTRY STATUS
              </button>
            ))}
          </div>

          {/* Command Terminal Box */}
          <div style={{ marginBottom: '28px' }}>
            <div className="nym-terminal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ whiteSpace: 'pre-wrap' }}>{getCommand()}</code>
              <button
                onClick={() => handleCopy(getCommand())}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: 'none',
                  color: '#FAF8F2',
                  cursor: 'pointer',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  flexShrink: 0,
                  marginLeft: '12px'
                }}
              >
                {copied ? <Check size={14} color="#34D399" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Integration Sample Code */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--nym-cedar)' }}>
                Availability statement
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--nym-font-mono)', color: 'var(--nym-text-muted)' }}>
                No install proof
              </span>
            </div>

            <div className="nym-terminal" style={{ maxHeight: '280px', overflowY: 'auto' }}>
              <pre style={{ margin: 0 }}><code>{getUsageSample(currentRepo)}</code></pre>
            </div>
          </div>

          {/* Zero-Dependency Assurance */}
          <div style={{
            padding: '16px',
            backgroundColor: 'var(--nym-bg-surface)',
            borderRadius: 'var(--nym-radius-md)',
            border: '1px solid var(--nym-border-default)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <Sparkles size={18} color="var(--nym-terracotta)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--nym-cedar)', marginBottom: '2px' }}>
                Evidence boundary
              </div>
              <p style={{ fontSize: '12px', color: 'var(--nym-text-secondary)', lineHeight: 1.45 }}>
                This catalog does not assert local validation, installation success, external adoption, customers, or revenue for an unpublished package.
              </p>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div style={{
          padding: '16px 28px',
          borderTop: '1px solid var(--nym-border-default)',
          backgroundColor: 'var(--nym-bg-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <a
            href={currentRepo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nym-btn-secondary"
            style={{ fontSize: '13px' }}
          >
            <span>GitHub Repository</span>
            <ChevronRight size={14} />
          </a>

          <button
            onClick={onClose}
            className="nym-btn-primary"
            style={{ fontSize: '13px' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
