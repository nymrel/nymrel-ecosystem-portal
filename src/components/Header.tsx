import React, { useEffect, useRef } from 'react';
import { Search, Github, Terminal, Sparkles, X } from 'lucide-react';
import { ECOSYSTEM_METRICS } from '../data/ecosystem';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenQuickstart: () => void;
  onOpenPlayground: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenQuickstart,
  onOpenPlayground
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: press '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backgroundColor: 'rgba(250, 248, 242, 0.94)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--nym-border-default)',
      padding: '14px 0'
    }}>
      <div className="nym-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Brand Lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--nym-cedar)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--nym-shadow-sm)',
              border: '1px solid rgba(42, 51, 46, 0.2)'
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 18L12 6L20 18" stroke="#FAF8F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="14" r="2.2" fill="#A8541F" />
              </svg>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontFamily: 'var(--nym-font-serif)',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--nym-cedar)',
                  letterSpacing: '-0.03em'
                }}>
                  Nymrel
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '2px 7px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--nym-sage)',
                  color: 'var(--nym-cedar-dark)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  Ecosystem
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--nym-text-muted)', display: 'block', marginTop: '-2px' }}>
                Open-Source Agent Suite · JalenBuilds LLC
              </span>
            </div>
          </a>
        </div>

        {/* Global Search Bar */}
        <div style={{
          flex: '1 1 280px',
          maxWidth: '440px',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--nym-bg-elevated)',
            border: '1px solid var(--nym-border-default)',
            borderRadius: 'var(--nym-radius-md)',
            padding: '7px 12px',
            boxShadow: 'var(--nym-shadow-sm)',
            transition: 'border-color 0.15s ease'
          }}>
            <Search size={16} color="var(--nym-text-muted)" style={{ marginRight: '8px', flexShrink: 0 }} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search 10+ repos, tags, packages (Press '/' to focus)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                fontSize: '13px',
                color: 'var(--nym-text-primary)',
                fontFamily: 'var(--nym-font-sans)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--nym-text-muted)',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
            <kbd style={{
              fontSize: '11px',
              fontFamily: 'var(--nym-font-mono)',
              padding: '2px 5px',
              backgroundColor: 'var(--nym-bg-subtle)',
              border: '1px solid var(--nym-border-default)',
              borderRadius: '4px',
              color: 'var(--nym-text-muted)',
              marginLeft: '6px',
              userSelect: 'none'
            }}>
              /
            </kbd>
          </div>
        </div>

        {/* Quick Actions & GitHub */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onOpenPlayground}
            className="nym-btn-secondary"
            style={{ fontSize: '13px', padding: '8px 14px' }}
          >
            <Sparkles size={15} color="var(--nym-terracotta)" />
            <span>Playground</span>
          </button>

          <button
            onClick={onOpenQuickstart}
            className="nym-btn-primary"
            style={{ fontSize: '13px', padding: '8px 14px' }}
          >
            <Terminal size={15} />
            <span>Quickstart</span>
          </button>

          <a
            href="https://github.com/nymrel"
            target="_blank"
            rel="noopener noreferrer"
            className="nym-btn-ghost"
            style={{ padding: '8px 10px' }}
            aria-label="Nymrel GitHub Organization"
          >
            <Github size={18} />
            <span style={{ fontSize: '12px', fontWeight: 600 }}>{ECOSYSTEM_METRICS.starsTotal.toLocaleString()}+</span>
          </a>
        </div>
      </div>
    </header>
  );
};
