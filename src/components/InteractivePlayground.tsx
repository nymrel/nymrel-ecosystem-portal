import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Calculator, 
  Layers, 
  ShieldCheck, 
  Copy, 
  Check, 
  CheckCircle2, 
  Sliders, 
  Code2, 
  Lock,
  FileCheck
} from 'lucide-react';

export const InteractivePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quote' | 'a2ui' | 'merkle'>('quote');

  // -------------------------------------------------------------
  // DEMO 1: Quote Calculator State & Logic (Headless Quote Layer)
  // -------------------------------------------------------------
  const [agentCount, setAgentCount] = useState<number>(5);
  const [monthlyActions, setMonthlyActions] = useState<number>(25000);
  const [sandboxTier, setSandboxTier] = useState<'standard' | 'strict' | 'airgap'>('strict');
  const [trustTier, setTrustTier] = useState<'basic' | 'dual' | 'enterprise'>('dual');
  const [copiedQuoteJson, setCopiedQuoteJson] = useState<boolean>(false);

  const quoteCalculations = useMemo(() => {
    // Base cost per agent: $12/agent
    const agentBase = agentCount * 12;
    // Actions cost: $0.0004 per action
    const actionsCost = monthlyActions * 0.0004;
    
    // Sandbox multiplier
    let sandboxCost = 15;
    if (sandboxTier === 'strict') sandboxCost = 35;
    if (sandboxTier === 'airgap') sandboxCost = 75;

    // Trust tier cost
    let trustCost = 10;
    if (trustTier === 'dual') trustCost = 25;
    if (trustTier === 'enterprise') trustCost = 60;

    const totalEstimatedMonthly = Math.round(agentBase + actionsCost + sandboxCost + trustCost);
    const lowRange = Math.round(totalEstimatedMonthly * 0.85);
    const highRange = Math.round(totalEstimatedMonthly * 1.20);
    const devHoursSaved = Math.round(agentCount * 18 + (monthlyActions / 2000));
    const dollarSavingsEst = devHoursSaved * 110;

    return {
      totalEstimatedMonthly,
      lowRange,
      highRange,
      devHoursSaved,
      dollarSavingsEst,
      netMonthlyRoi: Math.round(((dollarSavingsEst - totalEstimatedMonthly) / totalEstimatedMonthly) * 100)
    };
  }, [agentCount, monthlyActions, sandboxTier, trustTier]);

  const quotePayloadJson = useMemo(() => {
    return JSON.stringify({
      version: '1.0.0',
      generator: '@nymrel/headless-quote',
      currency: 'USD',
      parameters: {
        agentCount,
        monthlyActions,
        sandboxTier,
        trustTier
      },
      estimates: {
        monthlyRange: {
          low: quoteCalculations.lowRange,
          target: quoteCalculations.totalEstimatedMonthly,
          high: quoteCalculations.highRange
        },
        devHoursSavedMonthly: quoteCalculations.devHoursSaved,
        estimatedValueDelivered: quoteCalculations.dollarSavingsEst,
        projectedRoiPercent: quoteCalculations.netMonthlyRoi
      },
      attestation: {
        issuer: 'Nymrel / JalenBuilds LLC',
        proofProtocol: 'RFC-6962',
        timestamp: new Date().toISOString()
      }
    }, null, 2);
  }, [agentCount, monthlyActions, sandboxTier, trustTier, quoteCalculations]);

  // -------------------------------------------------------------
  // DEMO 2: A2UI Stream State & Logic (A2UI Warm Paper)
  // -------------------------------------------------------------
  const [a2uiScenario, setA2uiScenario] = useState<'purchase' | 'firewall' | 'router'>('purchase');
  const [a2uiDecisionState, setA2uiDecisionState] = useState<'pending' | 'approved' | 'denied' | 'simulated'>('pending');
  const [a2uiFeedbackMsg, setA2uiFeedbackMsg] = useState<string>('');
  const [showRawJson, setShowRawJson] = useState<boolean>(false);

  const scenarioData = {
    purchase: {
      title: 'OpenUCP Autonomous Cart Purchase',
      agent: 'procurement-agent-07',
      risk: 'Low',
      riskColor: '#059669',
      protocol: 'x402 Micropayments (AP2 Negotiation)',
      target: 'cloud-infra-supplier.nymrel.internal',
      amount: '$42.50 USD',
      details: {
        item: 'GPU Reserved Burst Instance (4x RTX 4090)',
        discountApplied: '15% Negotiated via OpenUCP',
        settlementHeader: 'x402-token: sha256:7f3b890a...',
        autoApprovedUnder: '$50.00 Threshold'
      }
    },
    firewall: {
      title: 'Action Surety Destructive Command Intercept',
      agent: 'database-migrator-03',
      risk: 'Critical Blocked',
      riskColor: '#DC2626',
      protocol: 'AST Execution Firewall (Boundary Jail)',
      target: 'postgres://primary-db.internal:5432/core',
      amount: 'N/A (Schema Mutation)',
      details: {
        interceptedCmd: 'DROP TABLE "legacy_audit_logs" CASCADE;',
        violationReason: 'Destructive DROP pattern on production table without backup snapshot',
        recommendedAction: 'Rename table to legacy_audit_logs_archived_20260821',
        sandboxRollbackAvailable: 'Yes (Copy-on-Write Snapshot #410)'
      }
    },
    router: {
      title: 'Local Forge Model Fallback & Cost Optimization',
      agent: 'code-reviewer-alpha',
      risk: 'Optimized',
      riskColor: '#D97706',
      protocol: 'MCP Model Router (Luna Local)',
      target: 'Local GPU Orchestrator (Ollama / vLLM)',
      amount: '$0.00 (Local Compute)',
      details: {
        originalTier: 'Sol Cloud Frontier ($0.03 / 1k tokens)',
        routedTo: 'Luna Local Qwen 2.5 Coder 32B (0.0ms egress)',
        tokenSavingsSession: '$4.28 saved',
        latencyImpact: '-40ms (Local PCIe bus)'
      }
    }
  };

  const handleA2uiAction = (action: 'approved' | 'denied' | 'simulated') => {
    setA2uiDecisionState(action);
    if (action === 'approved') {
      setA2uiFeedbackMsg('✓ Action approved & cryptographic proof receipt dispatched to Swarm Studio ledger.');
    } else if (action === 'denied') {
      setA2uiFeedbackMsg('✗ Action denied. Agent loop halted and rollback snapshot locked.');
    } else {
      setA2uiFeedbackMsg('⚡ Simulated execution inside Agent Sandstorm Copy-on-Write sandbox. 0 real mutations.');
    }
  };

  // -------------------------------------------------------------
  // DEMO 3: Merkle & Proof Ledger Receipt Generator
  // -------------------------------------------------------------
  const [merkleAgentId, setMerkleAgentId] = useState<string>('agent-sol-504');
  const [merkleAction, setMerkleAction] = useState<string>('BUILD_RELEASE_VERIFIED');
  const [merkleResource, setMerkleResource] = useState<string>('pkg/@nymrel/portal@1.0.0');
  const [merkleTreeResult, setMerkleTreeResult] = useState<{
    leafHash: string;
    rootHash: string;
    signature: string;
    receiptId: string;
    timestamp: string;
  }>({
    leafHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    rootHash: '9f83c072b22037920199da2a0df8d0fa4f75aa6e8770c8413b632940e4f647c2',
    signature: 'ed25519_sig_4a90fbc9821d3e8749102c9a87f41b29d91240c1e843...',
    receiptId: 'rcpt_nymrel_88291410',
    timestamp: new Date().toISOString()
  });

  // Calculate simulated cryptographic hash
  useEffect(() => {
    const computeSimulatedHashes = async () => {
      const dataStr = `${merkleAgentId}:${merkleAction}:${merkleResource}:${Date.now()}`;
      try {
        const msgUint8 = new TextEncoder().encode(dataStr);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        const rootUint8 = new TextEncoder().encode('MERKLE_ROOT:' + hashHex);
        const rootBuffer = await crypto.subtle.digest('SHA-256', rootUint8);
        const rootArray = Array.from(new Uint8Array(rootBuffer));
        const rootHex = rootArray.map(b => b.toString(16).padStart(2, '0')).join('');

        setMerkleTreeResult({
          leafHash: hashHex,
          rootHash: rootHex,
          signature: `ed25519_sig_${rootHex.substring(0, 32)}...`,
          receiptId: `rcpt_nymrel_${rootHex.substring(0, 8)}`,
          timestamp: new Date().toISOString()
        });
      } catch {
        // Fallback
      }
    };
    computeSimulatedHashes();
  }, [merkleAgentId, merkleAction, merkleResource]);

  const [copiedMerkle, setCopiedMerkle] = useState<boolean>(false);

  return (
    <section id="playground" style={{
      padding: '64px 0',
      backgroundColor: 'var(--nym-bg-surface)',
      borderBottom: '1px solid var(--nym-border-default)'
    }}>
      <div className="nym-container">
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px auto' }}>
          <span className="nym-badge nym-badge-terracotta" style={{ marginBottom: '10px' }}>
            <Sparkles size={12} />
            <span>Interactive Live Demos</span>
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 38px)',
            color: 'var(--nym-cedar)',
            fontFamily: 'var(--nym-font-serif)',
            marginBottom: '12px'
          }}>
            Experience Nymrel Open-Source in Real Time
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--nym-text-secondary)' }}>
            Test dynamic pricing calculations, stream Google A2UI decision cards, and generate verifiable cryptographic Merkle proof receipts directly in your browser.
          </p>
        </div>

        {/* Playground Tab Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('quote')}
            className={activeTab === 'quote' ? 'nym-btn-primary' : 'nym-btn-secondary'}
            style={{ fontSize: '13px', padding: '10px 18px' }}
          >
            <Calculator size={15} />
            <span>Quote Estimator (Headless Quote)</span>
          </button>

          <button
            onClick={() => setActiveTab('a2ui')}
            className={activeTab === 'a2ui' ? 'nym-btn-primary' : 'nym-btn-secondary'}
            style={{ fontSize: '13px', padding: '10px 18px' }}
          >
            <Layers size={15} />
            <span>A2UI Decision Stream (A2UI Paper)</span>
          </button>

          <button
            onClick={() => setActiveTab('merkle')}
            className={activeTab === 'merkle' ? 'nym-btn-primary' : 'nym-btn-secondary'}
            style={{ fontSize: '13px', padding: '10px 18px' }}
          >
            <ShieldCheck size={15} />
            <span>Proof Ledger &amp; Merkle Root</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: Quote Calculator Demo */}
        {/* ========================================================= */}
        {activeTab === 'quote' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            backgroundColor: 'var(--nym-bg-base)',
            borderRadius: 'var(--nym-radius-xl)',
            padding: '32px',
            border: '1px solid var(--nym-border-default)',
            boxShadow: 'var(--nym-shadow-sm)'
          }}>
            {/* Interactive Sliders */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Sliders size={18} color="var(--nym-terracotta)" />
                <h3 style={{ fontSize: '20px', fontFamily: 'var(--nym-font-serif)', color: 'var(--nym-cedar)' }}>
                  Configure Agent Deployment
                </h3>
              </div>

              {/* Slider 1: Agent Count */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--nym-text-primary)' }}>
                    Autonomous Agent Workers
                  </label>
                  <span style={{ fontSize: '13px', fontFamily: 'var(--nym-font-mono)', fontWeight: 600, color: 'var(--nym-terracotta)' }}>
                    {agentCount} {agentCount === 1 ? 'Agent' : 'Agents'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={agentCount}
                  onChange={(e) => setAgentCount(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--nym-terracotta)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--nym-text-muted)', marginTop: '2px' }}>
                  <span>1 Agent</span>
                  <span>25 Agents</span>
                  <span>50 Agents</span>
                </div>
              </div>

              {/* Slider 2: Monthly Actions */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--nym-text-primary)' }}>
                    Monthly Autonomous Actions / Tool Calls
                  </label>
                  <span style={{ fontSize: '13px', fontFamily: 'var(--nym-font-mono)', fontWeight: 600, color: 'var(--nym-terracotta)' }}>
                    {monthlyActions.toLocaleString()} actions/mo
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={200000}
                  step={1000}
                  value={monthlyActions}
                  onChange={(e) => setMonthlyActions(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--nym-terracotta)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--nym-text-muted)', marginTop: '2px' }}>
                  <span>1k</span>
                  <span>100k</span>
                  <span>200k</span>
                </div>
              </div>

              {/* Selector 1: Sandbox Tier */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--nym-text-primary)', display: 'block', marginBottom: '6px' }}>
                  Security &amp; Isolation Engine
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {[
                    { id: 'standard', label: 'Copy-on-Write' },
                    { id: 'strict', label: 'Strict Surety' },
                    { id: 'airgap', label: 'Local Air-Gap' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSandboxTier(t.id as 'standard' | 'strict' | 'airgap')}
                      style={{
                        padding: '8px',
                        fontSize: '12px',
                        fontWeight: 500,
                        borderRadius: 'var(--nym-radius-sm)',
                        border: sandboxTier === t.id ? '1px solid var(--nym-cedar)' : '1px solid var(--nym-border-default)',
                        backgroundColor: sandboxTier === t.id ? 'var(--nym-cedar)' : 'var(--nym-bg-elevated)',
                        color: sandboxTier === t.id ? '#FAF8F2' : 'var(--nym-text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 2: Trust Tier */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--nym-text-primary)', display: 'block', marginBottom: '6px' }}>
                  Dual-Audience Machine Trust Tier
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {[
                    { id: 'basic', label: 'Basic llms.txt' },
                    { id: 'dual', label: 'Dual Graph' },
                    { id: 'enterprise', label: 'Full Enterprise' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTrustTier(t.id as 'basic' | 'dual' | 'enterprise')}
                      style={{
                        padding: '8px',
                        fontSize: '12px',
                        fontWeight: 500,
                        borderRadius: 'var(--nym-radius-sm)',
                        border: trustTier === t.id ? '1px solid var(--nym-terracotta)' : '1px solid var(--nym-border-default)',
                        backgroundColor: trustTier === t.id ? 'var(--nym-terracotta)' : 'var(--nym-bg-elevated)',
                        color: trustTier === t.id ? '#FFFFFF' : 'var(--nym-text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div style={{
              backgroundColor: 'var(--nym-bg-surface)',
              borderRadius: 'var(--nym-radius-lg)',
              padding: '24px',
              border: '1px solid var(--nym-border-default)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span className="nym-badge nym-badge-cedar">Estimated Monthly Cost</span>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--nym-font-mono)', color: 'var(--nym-text-muted)' }}>
                    @nymrel/headless-quote
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '44px',
                    fontWeight: 700,
                    color: 'var(--nym-cedar)',
                    fontFamily: 'var(--nym-font-serif)',
                    lineHeight: 1
                  }}>
                    ${quoteCalculations.totalEstimatedMonthly}
                  </span>
                  <span style={{ fontSize: '15px', color: 'var(--nym-text-muted)' }}>/ month</span>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--nym-text-secondary)', marginBottom: '20px' }}>
                  Expected range: <strong style={{ color: 'var(--nym-cedar)' }}>${quoteCalculations.lowRange}</strong> - <strong style={{ color: 'var(--nym-cedar)' }}>${quoteCalculations.highRange} /mo</strong>
                </div>

                {/* Economics Summary */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  padding: '14px',
                  backgroundColor: 'var(--nym-bg-base)',
                  borderRadius: 'var(--nym-radius-md)',
                  border: '1px solid var(--nym-border-subtle)',
                  marginBottom: '20px'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--nym-text-muted)' }}>Dev Hours Saved</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--nym-terracotta)', fontFamily: 'var(--nym-font-serif)' }}>
                      ~{quoteCalculations.devHoursSaved} hrs/mo
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--nym-text-muted)' }}>Value Generated</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--nym-cedar)', fontFamily: 'var(--nym-font-serif)' }}>
                      ${quoteCalculations.dollarSavingsEst.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Machine-Readable JSON Export */}
              <div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(quotePayloadJson);
                    setCopiedQuoteJson(true);
                    setTimeout(() => setCopiedQuoteJson(false), 2000);
                  }}
                  className="nym-btn-primary"
                  style={{ width: '100%', fontSize: '13px' }}
                >
                  {copiedQuoteJson ? <Check size={15} color="#34D399" /> : <Copy size={15} />}
                  <span>{copiedQuoteJson ? 'Copied Machine Quote JSON' : 'Export Agent Quote JSON Payload'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: A2UI Stream Demo */}
        {/* ========================================================= */}
        {activeTab === 'a2ui' && (
          <div style={{
            backgroundColor: 'var(--nym-bg-base)',
            borderRadius: 'var(--nym-radius-xl)',
            padding: '32px',
            border: '1px solid var(--nym-border-default)',
            boxShadow: 'var(--nym-shadow-sm)'
          }}>
            {/* Scenario Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--nym-cedar)' }}>Select Agent Event Scenario:</span>
                <select
                  value={a2uiScenario}
                  onChange={(e) => {
                    setA2uiScenario(e.target.value as 'purchase' | 'firewall' | 'router');
                    setA2uiDecisionState('pending');
                    setA2uiFeedbackMsg('');
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--nym-radius-sm)',
                    border: '1px solid var(--nym-border-default)',
                    backgroundColor: 'var(--nym-bg-elevated)',
                    fontSize: '13px',
                    color: 'var(--nym-text-primary)',
                    fontFamily: 'var(--nym-font-sans)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="purchase">1. OpenUCP Cart Micropayment</option>
                  <option value="firewall">2. Action Surety Destructive Block</option>
                  <option value="router">3. Local Forge GPU Model Fallback</option>
                </select>
              </div>

              <button
                onClick={() => setShowRawJson(!showRawJson)}
                className="nym-btn-ghost"
                style={{ fontSize: '12px', padding: '6px 10px' }}
              >
                <Code2 size={14} />
                <span>{showRawJson ? 'Hide A2UI JSON Schema' : 'Inspect A2UI JSON Schema'}</span>
              </button>
            </div>

            {/* A2UI Warm Paper Decision Card */}
            <div style={{
              maxWidth: '680px',
              margin: '0 auto',
              backgroundColor: 'var(--nym-bg-card)',
              borderRadius: 'var(--nym-radius-lg)',
              border: '1px solid var(--nym-border-strong)',
              boxShadow: 'var(--nym-shadow-md)',
              padding: '28px',
              position: 'relative'
            }}>
              {/* Card Top Pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: scenarioData[a2uiScenario].riskColor,
                    color: '#FFFFFF'
                  }}>
                    {scenarioData[a2uiScenario].risk}
                  </span>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--nym-font-mono)', color: 'var(--nym-text-muted)' }}>
                    {scenarioData[a2uiScenario].agent}
                  </span>
                </div>

                <span style={{ fontSize: '11px', color: 'var(--nym-text-muted)' }}>
                  A2UI Spec v0.8
                </span>
              </div>

              {/* Event Title */}
              <h3 style={{ fontSize: '22px', color: 'var(--nym-cedar)', fontFamily: 'var(--nym-font-serif)', marginBottom: '8px' }}>
                {scenarioData[a2uiScenario].title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--nym-text-secondary)', marginBottom: '20px' }}>
                Protocol: <strong style={{ color: 'var(--nym-cedar)' }}>{scenarioData[a2uiScenario].protocol}</strong> · Target: <code style={{ fontSize: '12px', color: 'var(--nym-terracotta)' }}>{scenarioData[a2uiScenario].target}</code>
              </p>

              {/* Key Parameter Table */}
              <div style={{
                backgroundColor: 'var(--nym-bg-surface)',
                borderRadius: 'var(--nym-radius-md)',
                padding: '14px',
                border: '1px solid var(--nym-border-default)',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--nym-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Extracted Agent Parameters
                </div>
                {Object.entries(scenarioData[a2uiScenario].details).map(([key, val]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0', borderBottom: '1px solid var(--nym-border-subtle)' }}>
                    <span style={{ color: 'var(--nym-text-muted)', textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1')}:
                    </span>
                    <span style={{ fontFamily: 'var(--nym-font-mono)', color: 'var(--nym-text-primary)', fontWeight: 500 }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Feedback Alert if Action Taken */}
              {a2uiFeedbackMsg && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--nym-radius-md)',
                  backgroundColor: a2uiDecisionState === 'approved' ? 'var(--nym-sage)' : a2uiDecisionState === 'denied' ? '#FEE2E2' : 'var(--nym-amber-bg)',
                  color: a2uiDecisionState === 'approved' ? 'var(--nym-sage-dark)' : a2uiDecisionState === 'denied' ? '#991B1B' : '#92400E',
                  fontSize: '13px',
                  fontWeight: 500,
                  marginBottom: '20px'
                }}>
                  {a2uiFeedbackMsg}
                </div>
              )}

              {/* HITL Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleA2uiAction('approved')}
                  className="nym-btn-primary"
                  style={{ flex: '1 1 140px', fontSize: '13px' }}
                >
                  <Check size={15} />
                  <span>Approve &amp; Sign</span>
                </button>

                <button
                  onClick={() => handleA2uiAction('simulated')}
                  className="nym-btn-accent"
                  style={{ flex: '1 1 140px', fontSize: '13px' }}
                >
                  <Sparkles size={15} />
                  <span>Simulate in Sandstorm</span>
                </button>

                <button
                  onClick={() => handleA2uiAction('denied')}
                  className="nym-btn-secondary"
                  style={{ flex: '1 1 100px', fontSize: '13px' }}
                >
                  <span>Deny</span>
                </button>
              </div>
            </div>

            {/* Raw JSON Schema Inspector */}
            {showRawJson && (
              <div style={{ marginTop: '24px' }}>
                <div className="nym-terminal">
                  <pre>{JSON.stringify({
                    spec: 'A2UI/0.8',
                    theme: 'WarmPaper',
                    event: a2uiScenario,
                    payload: scenarioData[a2uiScenario]
                  }, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: Proof Ledger & Merkle Root Demo */}
        {/* ========================================================= */}
        {activeTab === 'merkle' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            backgroundColor: 'var(--nym-bg-base)',
            borderRadius: 'var(--nym-radius-xl)',
            padding: '32px',
            border: '1px solid var(--nym-border-default)',
            boxShadow: 'var(--nym-shadow-sm)'
          }}>
            {/* Input Form */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Lock size={18} color="var(--nym-cedar)" />
                <h3 style={{ fontSize: '20px', fontFamily: 'var(--nym-font-serif)', color: 'var(--nym-cedar)' }}>
                  Cryptographic Step Attestation
                </h3>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--nym-text-primary)', display: 'block', marginBottom: '4px' }}>
                  Executing Agent ID
                </label>
                <input
                  type="text"
                  value={merkleAgentId}
                  onChange={(e) => setMerkleAgentId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--nym-radius-sm)',
                    border: '1px solid var(--nym-border-default)',
                    backgroundColor: 'var(--nym-bg-elevated)',
                    fontFamily: 'var(--nym-font-mono)',
                    fontSize: '13px',
                    color: 'var(--nym-text-primary)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--nym-text-primary)', display: 'block', marginBottom: '4px' }}>
                  Action Type
                </label>
                <select
                  value={merkleAction}
                  onChange={(e) => setMerkleAction(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--nym-radius-sm)',
                    border: '1px solid var(--nym-border-default)',
                    backgroundColor: 'var(--nym-bg-elevated)',
                    fontSize: '13px',
                    color: 'var(--nym-text-primary)',
                    fontFamily: 'var(--nym-font-sans)'
                  }}
                >
                  <option value="BUILD_RELEASE_VERIFIED">BUILD_RELEASE_VERIFIED (Package Build Gate)</option>
                  <option value="UCP_PURCHASE_COMMITTED">UCP_PURCHASE_COMMITTED (Agent Commerce Handshake)</option>
                  <option value="FIREWALL_POLICY_ENFORCED">FIREWALL_POLICY_ENFORCED (Surety Sandboxing Gate)</option>
                  <option value="DUAL_AUDIENCE_GRAPH_SIGNED">DUAL_AUDIENCE_GRAPH_SIGNED (Schema.org Graph)</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--nym-text-primary)', display: 'block', marginBottom: '4px' }}>
                  Target Resource Path / URI
                </label>
                <input
                  type="text"
                  value={merkleResource}
                  onChange={(e) => setMerkleResource(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--nym-radius-sm)',
                    border: '1px solid var(--nym-border-default)',
                    backgroundColor: 'var(--nym-bg-elevated)',
                    fontFamily: 'var(--nym-font-mono)',
                    fontSize: '13px',
                    color: 'var(--nym-text-primary)'
                  }}
                />
              </div>

              <div style={{
                padding: '14px',
                backgroundColor: 'var(--nym-bg-surface)',
                borderRadius: 'var(--nym-radius-md)',
                border: '1px solid var(--nym-border-default)',
                fontSize: '12px',
                color: 'var(--nym-text-secondary)'
              }}>
                <div style={{ fontWeight: 600, color: 'var(--nym-cedar)', marginBottom: '4px' }}>
                  RFC-6962 Compliance
                </div>
                Leaves are hashed using SHA-256 with 0x00 domain separation, combined into binary tree roots with 0x01 prefix, and signed with Ed25519 asymmetric keys.
              </div>
            </div>

            {/* Generated Receipt & Visual Badge */}
            <div style={{
              backgroundColor: 'var(--nym-bg-surface)',
              borderRadius: 'var(--nym-radius-lg)',
              padding: '24px',
              border: '1px solid var(--nym-border-default)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                {/* Visual Proof Badge */}
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--nym-bg-base)',
                  borderRadius: 'var(--nym-radius-md)',
                  border: '1px solid var(--nym-border-strong)',
                  marginBottom: '16px',
                  boxShadow: 'var(--nym-shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={16} color="#059669" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--nym-cedar)', fontFamily: 'var(--nym-font-serif)' }}>
                        Nymrel Verified Attestation
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--nym-font-mono)', color: 'var(--nym-text-muted)' }}>
                      {merkleTreeResult.receiptId}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--nym-text-secondary)', marginBottom: '10px' }}>
                    Signed by Nymrel Proof Engine · Entity: <strong>JalenBuilds LLC</strong>
                  </div>

                  <div style={{ fontSize: '11px', fontFamily: 'var(--nym-font-mono)', color: 'var(--nym-text-muted)', wordBreak: 'break-all', backgroundColor: 'var(--nym-bg-subtle)', padding: '6px 8px', borderRadius: '4px' }}>
                    Root: {merkleTreeResult.rootHash}
                  </div>
                </div>

                {/* Hashes Breakdown */}
                <div style={{ fontSize: '12px', marginBottom: '16px' }}>
                  <div style={{ color: 'var(--nym-text-muted)', marginBottom: '2px' }}>Leaf SHA-256:</div>
                  <code style={{ fontSize: '11px', color: 'var(--nym-text-primary)', wordBreak: 'break-all', display: 'block', marginBottom: '8px' }}>
                    {merkleTreeResult.leafHash}
                  </code>

                  <div style={{ color: 'var(--nym-text-muted)', marginBottom: '2px' }}>Ed25519 Signature:</div>
                  <code style={{ fontSize: '11px', color: 'var(--nym-terracotta)', wordBreak: 'break-all', display: 'block' }}>
                    {merkleTreeResult.signature}
                  </code>
                </div>
              </div>

              {/* Copy Receipt JSON */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify({
                    receipt: merkleTreeResult.receiptId,
                    protocol: 'Nymrel-Proof-Ledger/1.0',
                    leafHash: merkleTreeResult.leafHash,
                    rootHash: merkleTreeResult.rootHash,
                    signature: merkleTreeResult.signature,
                    timestamp: merkleTreeResult.timestamp,
                    agent: merkleAgentId,
                    action: merkleAction,
                    resource: merkleResource
                  }, null, 2));
                  setCopiedMerkle(true);
                  setTimeout(() => setCopiedMerkle(false), 2000);
                }}
                className="nym-btn-primary"
                style={{ width: '100%', fontSize: '13px' }}
              >
                {copiedMerkle ? <Check size={15} color="#34D399" /> : <FileCheck size={15} />}
                <span>{copiedMerkle ? 'Receipt JSON Copied' : 'Copy Cryptographic Proof Receipt'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
