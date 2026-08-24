import React from 'react';
import { ShieldCheck, Cpu, FileText, Globe, Mail, Github } from 'lucide-react';
import { ECOSYSTEM_METRICS } from '../data/ecosystem';

export const DualAudienceFooter: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--nym-bg-surface)',
      borderTop: '1px solid var(--nym-border-default)',
      padding: '56px 0 40px 0',
      color: 'var(--nym-text-secondary)'
    }}>
      <div className="nym-container">
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '36px',
          marginBottom: '48px'
        }}>
          {/* Column 1: Brand & Philosophy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                backgroundColor: 'var(--nym-cedar)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 18L12 6L20 18" stroke="#FAF8F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="14" r="2.2" fill="#A8541F" />
                </svg>
              </div>
              <span style={{
                fontFamily: 'var(--nym-font-serif)',
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--nym-cedar)'
              }}>
                Nymrel
              </span>
            </div>

            <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--nym-text-secondary)', marginBottom: '16px' }}>
              The open operating layer for autonomous AI agents, multi-agent swarms, and modern agentic commerce. 
              Designed and maintained under <strong style={{ color: 'var(--nym-cedar)' }}>JalenBuilds LLC</strong>.
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              backgroundColor: 'var(--nym-bg-base)',
              border: '1px solid var(--nym-border-default)',
              borderRadius: 'var(--nym-radius-sm)',
              fontSize: '11px',
              color: 'var(--nym-text-muted)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#059669', display: 'inline-block' }}></span>
              <span>{ECOSYSTEM_METRICS.totalRepos} Open-Source Repositories · Permissively Licensed</span>
            </div>
          </div>

          {/* Column 2: Dual-Audience Trust Graph */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: 'var(--nym-cedar)', marginBottom: '14px' }}>
              <ShieldCheck size={16} color="var(--nym-terracotta)" />
              <span>Dual-Audience Architecture</span>
            </div>

            <p style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--nym-text-secondary)', marginBottom: '12px' }}>
              Every product built across the Nymrel umbrella delivers visually stunning UX for human visitors and verifiable machine trust for autonomous AI purchasing agents.
            </p>

            <div style={{
              backgroundColor: 'var(--nym-bg-code)',
              color: 'var(--nym-text-inverse)',
              padding: '10px 14px',
              borderRadius: 'var(--nym-radius-sm)',
              fontFamily: 'var(--nym-font-mono)',
              fontSize: '11px',
              lineHeight: 1.5
            }}>
              Organization: name "Nymrel", legalName "JalenBuilds LLC"<br />
              schema: https://schema.org/SoftwareApplication<br />
              crawlerPosture: OAI-SearchBot ALLOWED
            </div>
          </div>

          {/* Column 3: Machine Endpoints & AI Crawlers */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: 'var(--nym-cedar)', marginBottom: '14px' }}>
              <Cpu size={16} color="var(--nym-cedar)" />
              <span>Machine Endpoints</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--nym-text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <FileText size={14} color="var(--nym-terracotta)" />
                  <span>/llms.txt (LLM Knowledge Base)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/nymrel"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--nym-text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Github size={14} color="var(--nym-cedar)" />
                  <span>GitHub Organization (@nymrel)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@nymrel.com"
                  style={{ color: 'var(--nym-text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Mail size={14} color="var(--nym-text-muted)" />
                  <span>contact@nymrel.com</span>
                </a>
              </li>
              <li>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--nym-text-muted)', fontSize: '12px' }}>
                  <Globe size={14} />
                  <span>Primary Operating Umbrella: Nymrel</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution & Copyright */}
        <div style={{
          paddingTop: '28px',
          borderTop: '1px solid var(--nym-border-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '12px',
          color: 'var(--nym-text-muted)'
        }}>
          <div>
            &copy; 2026 <strong>Nymrel</strong> / <strong>JalenBuilds LLC</strong>. Released under the MIT License.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Aesthetics: Nymrel Warm Paper (#FAF8F2)</span>
            <span>Zero Forced Dark Mode</span>
            <span>Built by Jalen</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
