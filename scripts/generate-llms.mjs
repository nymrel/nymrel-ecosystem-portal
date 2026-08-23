/**
 * Regenerates llms.txt (repo root + public/) from src/data/ecosystem.ts.
 *
 * The catalog in src/data/ecosystem.ts is the single source of truth.
 * Run after any catalog change:  npm run sync-llms
 * Requires Node >= 22.6 (type stripping) — same as `npm test`.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ECOSYSTEM_REPOSITORIES, ECOSYSTEM_METRICS } from '../src/data/ecosystem.ts';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');

const lines = [];
lines.push('# Nymrel Open-Source Ecosystem Portal');
lines.push('> The Open Operating Layer for Autonomous AI Agents, Swarms & Modern Web');
lines.push('');
lines.push('## Entity & Governance');
lines.push('- Primary Umbrella: Nymrel (https://nymrel.com)');
lines.push('- Parent Legal Entity: JalenBuilds LLC (https://nymrel.com)');
lines.push('- Founder: Jalen');
lines.push('- Contact: contact@nymrel.com');
lines.push('- Licenses: MIT and Apache-2.0 (100% Free & Open Source)');
lines.push('- Aesthetics: Nymrel Warm Paper (#FAF8F2, #F4F0E6, #2A332E, #A8541F, #E2DDD2)');
lines.push('');
lines.push(`## Catalog: ${ECOSYSTEM_METRICS.totalRepos} Public Repositories (synced ${ECOSYSTEM_METRICS.catalogSyncedAt})`);

const categories = [...new Set(ECOSYSTEM_REPOSITORIES.map((r) => r.category))];
let index = 0;
for (const category of categories) {
  lines.push('');
  lines.push(`### ${category}`);
  for (const repo of ECOSYSTEM_REPOSITORIES.filter((r) => r.category === category)) {
    index += 1;
    lines.push('');
    lines.push(`#### ${index}. ${repo.name} (${repo.packageName})`);
    lines.push(`- Repository: ${repo.githubUrl}`);
    if (repo.homepageUrl) lines.push(`- Homepage: ${repo.homepageUrl}`);
    lines.push(`- Description: ${repo.shortDescription}`);
    lines.push(`- Install: ${repo.installSnippet}`);
  }
}

lines.push('');
lines.push('## Machine Discoverability & AI Crawlers');
lines.push('- OAI-SearchBot: Allowed');
lines.push('- ClaudeBot: Allowed');
lines.push('- GPTBot: Training disallow, Search allow');
lines.push('- PerplexityBot: Allowed');
lines.push('- Sitemap: https://nymrel.com/sitemap.xml');
lines.push('');

const content = lines.join('\n');
writeFileSync(join(rootDir, 'llms.txt'), content);
writeFileSync(join(rootDir, 'public', 'llms.txt'), content);
console.log(`llms.txt regenerated: ${index} repos across ${categories.length} categories.`);
