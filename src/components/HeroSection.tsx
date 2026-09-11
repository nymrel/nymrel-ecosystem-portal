import React, { useState } from 'react';
import { Terminal, Copy, Check, Sparkles, Shield, Cpu, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onPlaygroundClick: () => void;
  onQuickstartClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onPlaygroundClick,
  onQuickstartClick
}) => {
  const [copied, setCopied] = useState(false);
  const registryNote = 'npm releases are not published (checked 2026-08-21)';

  const handleCopy = () => {
    navigator.clipboard.writeText(registryNote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section style={{
      padding: '56px 0 44px 0',
      position: 'relative',
      borderBottom: '1px solid var(--nym-border-default)',
      background: 'linear-gradient(180deg, rgba(244, 240, 230, 0.5) 0%, rgba(250, 248, 242, 1) 100%)'
    }}>
      <div className="nym-container">
        {/* Top Badges */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '20px'
        }}>
          <span className="nym-badge nym-badge-terracotta">
            <Sparkles size={12} />
            <span>Nymrel source catalog</span>
          </span>
          <span className="nym-badge nym-badge-cedar">
            <Shield size={12} />
            <span>npm status is evidence-gated</span>
          </span>
          <span className="nym-badge nym-badge-neutral">
            <Cpu size={12} />
            <span>Dual-Audience Machine Trust</span>
          </span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 54px)',
          lineHeight: 1.12,
          color: 'var(--nym-text-secondary)',
          maxWidth: '820px',
          marginBottom: '32px'
        }}>
          This portal records ten ecosystem entries and their release evidence. Each listed npm package was unavailable in the registry check on 2026-08-21, so this catalog does not provide package install, CLI, CDN, or usage instructions.
          {/*
          swarm orchestration, Universal Commerce Protocol (UCP) micropayments, execution firewalls, 
          A2UI generative interfaces, and cryptographic proof ledgers—built with signature 
          <strong style={{ color: 'var(--nym-cedar)', fontWeight: 600 }}> Nymrel Warm Paper aesthetics</strong>.
          */}
        </h1>

        {/* CLI Command Box & CTAs */}
        <div style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>
          {/* Quick Install Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--nym-bg-code)',
            borderRadius: 'var(--nym-radius-md)',
            padding: '4px 6px 4px 14px',
            border: '1px solid rgba(42, 51, 46, 0.4)',
            boxShadow: 'var(--nym-shadow-sm)',
            maxWidth: '100%'
          }}>
            <Terminal size={16} color="#A8541F" style={{ marginRight: '10px', flexShrink: 0 }} />
            <code style={{
              fontSize: '13px',
              color: 'var(--nym-text-inverse)',
              fontFamily: 'var(--nym-font-mono)',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              paddingRight: '12px'
            }}>
              {registryNote}
            </code>
            <button
              onClick={handleCopy}
              className="nym-btn-ghost"
              style={{
                color: '#FAF8F2',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '6px 12px',
                fontSize: '12px'
              }}
              title="Copy registry status"
            >
              {copied ? (
                <>
                  <Check size={14} color="#34D399" />
                  <span style={{ color: '#34D399' }}>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy status</span>
                </>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <button
            onClick={onExploreClick}
            className="nym-btn-primary"
            style={{ padding: '12px 24px' }}
          >
            <span>Explore 10 catalog entries</span>
            <ArrowDown size={15} />
          </button>

          <button
            onClick={onPlaygroundClick}
            className="nym-btn-accent"
            style={{ padding: '12px 22px' }}
          >
            <Sparkles size={15} />
            <span>Interactive Playground</span>
          </button>

          <button
            onClick={onQuickstartClick}
            className="nym-btn-secondary"
            style={{ padding: '12px 20px' }}
          >
            <Terminal size={15} />
            <span>Release status</span>
          </button>
        </div>

        {/* Suite Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          padding: '20px 24px',
          backgroundColor: 'var(--nym-bg-elevated)',
          borderRadius: 'var(--nym-radius-lg)',
          border: '1px solid var(--nym-border-default)',
          boxShadow: 'var(--nym-shadow-sm)'
        }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--nym-cedar)', fontFamily: 'var(--nym-font-serif)' }}>
              10 Entries
            </div>
            <div style={{ fontSize: '12px', color: 'var(--nym-text-muted)', fontWeight: 500 }}>
              Source references
            </div>
          </div>

          <div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--nym-terracotta)', fontFamily: 'var(--nym-font-serif)' }}>
              npm releases
            </div>
            <div style={{ fontSize: '12px', color: 'var(--nym-text-muted)', fontWeight: 500 }}>
              Not published in the checked registry
            </div>
          </div>

          <div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--nym-cedar)', fontFamily: 'var(--nym-font-serif)' }}>
              No install proof
            </div>
            <div style={{ fontSize: '12px', color: 'var(--nym-text-muted)', fontWeight: 500 }}>
              #FAF8F2 · #2A332E · #A8541F
            </div>
          </div>

          <div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--nym-cedar)', fontFamily: 'var(--nym-font-serif)' }}>
              Evidence boundaries
            </div>
            <div style={{ fontSize: '12px', color: 'var(--nym-text-muted)', fontWeight: 500 }}>
              No adoption or revenue claims
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
