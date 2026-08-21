import React, { useState } from 'react';
import { X, Github, ExternalLink, Copy, Check, Layers, Box, CheckCircle2 } from 'lucide-react';
import { EcosystemRepo } from '../data/ecosystem';

interface ToolDetailModalProps {
  repo: EcosystemRepo | null;
  onClose: () => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ repo, onClose }) => {
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  if (!repo) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
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
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 60,
      padding: '20px'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'var(--nym-bg-base)',
        borderRadius: 'var(--nym-radius-xl)',
        border: '1px solid var(--nym-border-strong)',
        boxShadow: 'var(--nym-shadow-lg)',
        maxWidth: '740px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        padding: '32px'
      }} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--nym-bg-surface)',
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
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className="nym-badge nym-badge-terracotta">{repo.category}</span>
            <span className="nym-badge nym-badge-cedar">{repo.version}</span>
            <span className="nym-badge nym-badge-neutral">{repo.license} License</span>
            {repo.zeroDependency && (
              <span className="nym-badge nym-badge-amber">Zero-Dependency</span>
            )}
          </div>

          <h2 style={{
            fontSize: '28px',
            color: 'var(--nym-cedar)',
            fontFamily: 'var(--nym-font-serif)',
            marginBottom: '4px'
          }}>
            {repo.name}
          </h2>
          <div style={{ fontFamily: 'var(--nym-font-mono)', fontSize: '13px', color: 'var(--nym-text-muted)' }}>
            {repo.packageName}
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '15px',
          lineHeight: 1.6,
          color: 'var(--nym-text-secondary)',
          marginBottom: '24px'
        }}>
          {repo.fullDescription}
        </p>

        {/* Installation Terminal */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--nym-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
            Installation &amp; Integration
          </div>
          <div className="nym-terminal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <code>{repo.installSnippet}</code>
            <button
              onClick={() => handleCopy(repo.installSnippet)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#FAF8F2',
                cursor: 'pointer',
                padding: '4px 10px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px'
              }}
            >
              {copiedSnippet ? <Check size={14} color="#34D399" /> : <Copy size={14} />}
              <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          {repo.cliSnippet && (
            <div style={{ marginTop: '8px' }}>
              <div style={{ fontSize: '11px', color: 'var(--nym-text-muted)', marginBottom: '4px' }}>CLI / Quick execution:</div>
              <div className="nym-terminal" style={{ padding: '10px 14px', fontSize: '12px' }}>
                <code>{repo.cliSnippet}</code>
              </div>
            </div>
          )}
        </div>

        {/* Key Features Grid */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--nym-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
            Core Capabilities
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
            {repo.features.map((feature, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '10px 12px',
                backgroundColor: 'var(--nym-bg-surface)',
                borderRadius: 'var(--nym-radius-md)',
                border: '1px solid var(--nym-border-default)',
                fontSize: '13px',
                color: 'var(--nym-text-primary)'
              }}>
                <CheckCircle2 size={16} color="var(--nym-terracotta)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Overview */}
        <div style={{
          padding: '16px',
          backgroundColor: 'var(--nym-bg-subtle)',
          borderRadius: 'var(--nym-radius-md)',
          border: '1px solid var(--nym-border-default)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--nym-cedar)', marginBottom: '6px' }}>
            <Layers size={15} />
            <span>Architecture &amp; Design</span>
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--nym-text-secondary)' }}>
            {repo.architectureOverview}
          </p>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
          {repo.npmUrl && (
            <a
              href={repo.npmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nym-btn-secondary"
              style={{ fontSize: '13px' }}
            >
              <Box size={15} />
              <span>npm Package</span>
              <ExternalLink size={13} color="var(--nym-text-muted)" />
            </a>
          )}
          <a
            href={repo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nym-btn-primary"
            style={{ fontSize: '13px' }}
          >
            <Github size={15} />
            <span>View on GitHub</span>
            <ExternalLink size={13} color="#FAF8F2" />
          </a>
        </div>
      </div>
    </div>
  );
};
