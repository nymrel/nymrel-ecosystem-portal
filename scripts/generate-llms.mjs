/**
 * Regenerate root and public llms.txt from the evidence-bounded source catalog.
 * Requires the repository-pinned Node and npm toolchain.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildPaths } from '../src/data/build-paths.ts';
import {
  ECOSYSTEM_METRICS,
  ECOSYSTEM_REPOSITORIES,
} from '../src/data/ecosystem.ts';

const rootDirectory = join(dirname(fileURLToPath(import.meta.url)), '..');
const lines = [
  '# Nymrel Public Source Catalog',
  '> Evidence-bounded metadata for public repositories in the Nymrel GitHub organization.',
  '',
  '## Entity',
  '- Company brand: Nymrel (https://nymrel.com)',
  '- Legal entity: JalenBuilds LLC',
  '- Contact: contact@nymrel.com',
  '',
  '## Evidence boundary',
  '- Repository descriptions are owner-supplied GitHub metadata, not independent portal validation.',
  '- Source presence does not prove package publication, deployment, adoption, customer activation, or revenue.',
  '- Registry, license, validation, adoption, and revenue states remain unassessed unless stated otherwise.',
  '',
  '## Catalog snapshot',
  '- Public repositories: ' + ECOSYSTEM_METRICS.totalRepos,
  '- Source inventory checked: ' + ECOSYSTEM_METRICS.sourceCheckedAt,
  '- Latest GitHub releases observed: ' + ECOSYSTEM_METRICS.observedGitHubReleases,
];

const categories = [...new Set(ECOSYSTEM_REPOSITORIES.map((repository) => repository.category))];
lines.push('', '## Build on Nymrel',
  'Use one component independently at a boundary in an existing stack. Follow its setup guide for the supported installation path.',
);
for (const path of buildPaths(ECOSYSTEM_REPOSITORIES)) {
  lines.push('', '### ' + path.repository.name + ': ' + path.title,
    '- Use when: ' + path.useWhen,
    '- Contract: ' + path.contract,
    '- Availability: ' + path.availability,
    '- Setup guide: ' + path.guideUrl,
    '- Boundary: ' + path.boundary,
    '- Integration feedback: ' + path.repository.githubUrl + '/issues',
  );
}
lines.push('', 'Integration reports should include the runtime, exact source/artifact version, expected behavior and result; remove credentials and private data. This portal does not measure outside adoption.');
lines.push('', '## Developer walkthrough',
  '- A failed read is not an empty result: https://github.com/nymrel/nymrel-ecosystem-portal/blob/main/docs/EMPTY_IS_NOT_UNAVAILABLE.md',
  '- Runnable consumer: https://github.com/nymrel/nymrel-ecosystem-portal/blob/main/examples/source-check.py',
  '- Uses published Source Read 0.2.0 for complete empty, findings and unavailable cases; later source candidates are labeled separately.',
);
let index = 0;

for (const category of categories) {
  lines.push('', '### ' + category);

  for (const repository of ECOSYSTEM_REPOSITORIES.filter(
    (candidate) => candidate.category === category,
  )) {
    index += 1;
    const release =
      repository.release.status === 'release_observed'
        ? repository.release.tag + ' published ' + repository.release.publishedAt
        : 'No latest GitHub release returned in the captured snapshot';

    lines.push(
      '',
      '#### ' + index + '. ' + repository.name + ' (' + repository.repoName + ')',
      '- Repository: ' + repository.githubUrl,
      ...(repository.forkOf ? ['- GitHub fork of: ' + repository.forkOf] : []),
      '- GitHub description (owner-supplied): ' + repository.sourceDescription,
      '- Primary language: ' + repository.primaryLanguage,
      '- Default branch: ' + repository.defaultBranch,
      '- Last source update observed: ' + repository.lastSourceUpdate,
      '- Latest GitHub release: ' + release,
      '- Source checkout: ' + repository.sourceCheckoutCommand,
      '- Registry: not assessed',
      '- License: not assessed by this catalog; inspect the repository',
      '- Validation, adoption, and revenue: not assessed by this portal',
    );
  }
}

lines.push(
  '',
  '## Portal surfaces',
  '- Human catalog: https://nymrel.com/ecosystem',
  '- GitHub organization: https://github.com/nymrel',
  '',
);

const content = lines.join('\n');
const outputs = [join(rootDirectory, 'llms.txt'), join(rootDirectory, 'public', 'llms.txt')];
if (process.argv.includes('--check')) {
  for (const output of outputs) {
    if (readFileSync(output, 'utf8') !== content) {
      throw new Error(output + ' is stale; run npm run sync-llms.');
    }
  }
} else {
  for (const output of outputs) writeFileSync(output, content);
}
console.log(
  'llms.txt ' + (process.argv.includes('--check') ? 'verified' : 'regenerated') + ': ' + index + ' repositories across ' + categories.length + ' categories.',
);
