import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Sparkles, ChevronRight } from 'lucide-react';
import { ECOSYSTEM_REPOSITORIES, EcosystemRepo } from '../data/ecosystem';

interface QuickstartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickstartDrawer: React.FC<QuickstartDrawerProps> = ({ isOpen, onClose }) => {
  const [selectedRepoId, setSelectedRepoId] = useState<string>('open-ucp');
  const [activeTab, setActiveTab] = useState<'npm' | 'pnpm' | 'bun' | 'pip' | 'git' | 'cdn'>('npm');
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

  const getCommand = () => {
    switch (activeTab) {
      case 'npm':
        return `npm install ${currentRepo.packageName}`;
      case 'pnpm':
        return `pnpm add ${currentRepo.packageName}`;
      case 'bun':
        return `bun add ${currentRepo.packageName}`;
      case 'pip':
        return currentRepo.pypiUrl ? `pip install ${currentRepo.id}` : `# Note: ${currentRepo.name} is primarily distributed on npm\nnpm install ${currentRepo.packageName}`;
      case 'git':
        return `git clone ${currentRepo.githubUrl}.git\ncd ${currentRepo.githubUrl.split('/').pop()}\nnpm install\nnpm test`;
      case 'cdn':
        return `<script src="https://unpkg.com/${currentRepo.packageName}/dist/index.min.js"></script>`;
      default:
        return `npm install ${currentRepo.packageName}`;
    }
  };

  const getUsageSample = (repo: EcosystemRepo) => {
    if (repo.id === 'open-ucp') {
      return `import { UCPClient, createPaymentHeader } from '@nymrel/open-ucp';

// 1. Initialize Autonomous Agent Purchasing Client
const ucp = new UCPClient({
  agentId: 'agent-sol-01',
  budgetLimitUsd: 100.00
});

// 2. Discover & Negotiate Cart
const cart = await ucp.negotiateCart('https://merchant.example.com/api/ucp');

// 3. Settle with x402 Micropayment Header
const receipt = await ucp.checkout(cart, {
  paymentProof: createPaymentHeader({ amount: cart.totalUsd })
});

console.log('Purchase committed with Proof ID:', receipt.proofId);`;
    }

    if (repo.id === 'agent-action-surety') {
      return `import { SuretyFirewall } from '@nymrel/agent-surety';

// 1. Initialize Zero-Dependency Host Firewall
const firewall = new SuretyFirewall({
  strictMode: true,
  rootWorkspace: process.cwd(),
  blockDestructiveShellPatterns: true
});

// 2. Intercept Agent Proposed Tool Calls
const decision = await firewall.inspectCommand('rm -rf dist/ && tsc');

if (decision.allowed) {
  await firewall.executeWithMerkleLog('build-step', () => {
    // safe execution inside jail
  });
}`;
    }

    if (repo.id === 'nymrel-proof-ledger') {
      return `import { MerkleTree, createAttestationReceipt } from '@nymrel/proof-ledger';

// 1. Build RFC-6962 Merkle Tree of Agent Execution Steps
const tree = new MerkleTree(['STEP_1_INIT', 'STEP_2_MUTATE_SRC', 'STEP_3_TEST_PASS']);
const rootHash = tree.getRoot();

// 2. Sign cryptographic receipt
const receipt = createAttestationReceipt({
  agentId: 'agent-sol-504',
  rootHash,
  entity: 'JalenBuilds LLC'
});

console.log('Valid proof receipt generated:', receipt.receiptId);`;
    }

    if (repo.id === 'a2ui-warm-paper') {
      return `import React from 'react';
import { A2UIDecisionCard, WarmPaperProvider } from 'a2ui-warm-paper';

export function AgentWorkflowApp() {
  return (
    <WarmPaperProvider>
      <A2UIDecisionCard
        agentName="procurement-agent"
        riskLevel="Low"
        title="Approve API Token Top-up"
        amount="$25.00"
        onApprove={(payload) => console.log('Approved:', payload)}
        onDeny={() => console.log('Denied')}
      />
    </WarmPaperProvider>
  );
}`;
    }

    return `import { init } from '${repo.packageName}';

// Initialize ${repo.name} with Nymrel Defaults
init({
  entity: 'Nymrel / JalenBuilds LLC',
  theme: 'WarmPaper'
});

console.log('${repo.name} ready for autonomous agent execution.');`;
  };

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
              <span className="nym-badge nym-badge-cedar">Developer Quickstart</span>
              <span style={{ fontSize: '12px', color: 'var(--nym-text-muted)' }}>1-Line Install</span>
            </div>
            <h2 style={{ fontSize: '22px', color: 'var(--nym-cedar)', fontFamily: 'var(--nym-font-serif)' }}>
              Integrate Nymrel Engines
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
            {(['npm', 'pnpm', 'bun', 'pip', 'git', 'cdn'] as const).map(tab => (
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
                {tab.toUpperCase()}
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
                Usage Example ({currentRepo.primaryLanguage})
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--nym-font-mono)', color: 'var(--nym-text-muted)' }}>
                ESM / Node 18+
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
                Zero Supply-Chain Risk
              </div>
              <p style={{ fontSize: '12px', color: 'var(--nym-text-secondary)', lineHeight: 1.45 }}>
                All core Nymrel algorithms are implemented with 0 external third-party dependencies. No nested npm bloat, no transient CVE vulnerabilities, and 100% auditable source code.
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
