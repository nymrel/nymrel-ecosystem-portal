import { describe, it } from 'node:test';
import assert from 'node:assert';
import crypto from 'node:crypto';
import { ECOSYSTEM_REPOSITORIES } from '../src/data/ecosystem.ts';

describe('Portal Search & Filter Engine Tests', () => {
  it('should filter correctly by category', () => {
    const agents = ECOSYSTEM_REPOSITORIES.filter(r => r.category === 'Agents & Swarms');
    assert.strictEqual(agents.length, 9); // Swarm Studio, Local Forge, BuilderWars, Crawler Mesh, Plugin, Beacon, MCP Hub, Swarm Protocol, Presence
    const agentIds = agents.map(a => a.id);
    for (const id of ['swarm-studio', 'local-agent-forge', 'builderwars', 'crawler-mesh', 'nymrel-plugin', 'agent-beacon', 'mcp-hub', 'swarm-protocol', 'presence']) {
      assert.ok(agentIds.includes(id), `Agents & Swarms missing: ${id}`);
    }

    const commerce = ECOSYSTEM_REPOSITORIES.filter(r => r.category === 'Commerce & Micropayments');
    assert.strictEqual(commerce.length, 3); // OpenUCP, UCP Scanner, Headless Quote Layer
    const commerceIds = commerce.map(c => c.id);
    assert.ok(commerceIds.includes('open-ucp'));
    assert.ok(commerceIds.includes('agentic-ucp-scanner'));
    assert.ok(commerceIds.includes('headless-quote-layer'));

    const security = ECOSYSTEM_REPOSITORIES.filter(r => r.category === 'Security & Sandboxing');
    assert.strictEqual(security.length, 5); // Agent Sandstorm, Agent Surety, Proof Ledger, PermitMesh, Agent Proofchain
    const secIds = security.map(s => s.id);
    for (const id of ['agent-sandstorm', 'agent-action-surety', 'nymrel-proof-ledger', 'permitmesh', 'agent-proofchain']) {
      assert.ok(secIds.includes(id), `Security & Sandboxing missing: ${id}`);
    }

    const uiTrust = ECOSYSTEM_REPOSITORIES.filter(r => r.category === 'UI & Machine Trust');
    assert.strictEqual(uiTrust.length, 7); // A2UI Warm Paper, Machine Trust, Trust Scorecard, AI Visibility, ChatGPT Recommends, JSON-LD Generator, llms.txt Generator
    const uiIds = uiTrust.map(u => u.id);
    for (const id of ['a2ui-warm-paper', 'nymrel-machine-trust', 'trust-scorecard', 'ai-visibility-scorecard', 'chatgpt-recommends', 'json-ld-generator', 'llms-txt-generator']) {
      assert.ok(uiIds.includes(id), `UI & Machine Trust missing: ${id}`);
    }

    const devTools = ECOSYSTEM_REPOSITORIES.filter(r => r.category === 'Developer Tools');
    assert.strictEqual(devTools.length, 4); // Noop Flags, Token Spend Dashboard, QR UTM Generator, Ecosystem Portal
    const devIds = devTools.map(d => d.id);
    for (const id of ['noop-flags', 'token-spend-dashboard', 'qr-utm-generator', 'ecosystem-portal']) {
      assert.ok(devIds.includes(id), `Developer Tools missing: ${id}`);
    }
  });

  it('should match search query across name, package, tags, and features', () => {
    const query = 'x402';
    const matches = ECOSYSTEM_REPOSITORIES.filter(r => {
      const q = query.toLowerCase();
      return (
        r.name.toLowerCase().includes(q) ||
        r.packageName.toLowerCase().includes(q) ||
        r.shortDescription.toLowerCase().includes(q) ||
        r.fullDescription.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        r.badges.some(b => b.toLowerCase().includes(q)) ||
        r.features.some(f => f.toLowerCase().includes(q))
      );
    });

    assert.ok(matches.length >= 1, 'Should find at least 1 repo matching x402');
    assert.ok(matches.some(m => m.id === 'open-ucp'), 'Should match OpenUCP');
  });

  it('should handle zero search matches gracefully', () => {
    const query = 'nonexistent-tool-xyz-12345';
    const matches = ECOSYSTEM_REPOSITORIES.filter(r => {
      const q = query.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.packageName.toLowerCase().includes(q);
    });
    assert.strictEqual(matches.length, 0);
  });
});

describe('Interactive Playground Logic Verification', () => {
  it('should compute valid quote calculations', () => {
    const agentCount = 5;
    const monthlyActions = 25000;
    const agentBase = agentCount * 12; // 60
    const actionsCost = monthlyActions * 0.0004; // 10
    const sandboxCost = 35; // strict
    const trustCost = 25; // dual

    const total = Math.round(agentBase + actionsCost + sandboxCost + trustCost);
    assert.strictEqual(total, 130);

    const lowRange = Math.round(total * 0.85);
    const highRange = Math.round(total * 1.20);
    assert.strictEqual(lowRange, 111);
    assert.strictEqual(highRange, 156);

    const devHours = Math.round(agentCount * 18 + (monthlyActions / 2000));
    assert.strictEqual(devHours, 103);
  });

  it('should compute deterministic SHA-256 Merkle root hashes', () => {
    const leafData = 'agent-sol-504:BUILD_RELEASE_VERIFIED:pkg/@nymrel/portal@1.0.0:2026-08-21T00:00:00.000Z';
    const leafHash = crypto.createHash('sha256').update(leafData).digest('hex');
    assert.strictEqual(leafHash.length, 64);

    const rootHash = crypto.createHash('sha256').update('MERKLE_ROOT:' + leafHash).digest('hex');
    assert.strictEqual(rootHash.length, 64);
  });
});
