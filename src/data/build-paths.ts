import type { EcosystemRepo } from './ecosystem';

/** Curated integration paths. Repository identity stays in the existing catalog. */
const paths = [
  {
    repositoryId: 'source-read',
    title: 'Keep unavailable sources visible',
    useWhen: 'A CI or audit check must distinguish an empty result from a source it could not read.',
    contract: 'Caller-supplied read outcomes → PASS, FAIL or UNKNOWN',
    availability: 'Tagged source · Python 3.11+',
    guidePath: '/blob/main/README.md#install-from-the-tagged-source',
    boundary: 'Your application acquires the source and defines the policy. Source Read preserves the outcome.',
  },
  {
    repositoryId: 'nymrel-agent',
    title: 'Route with metadata you control',
    useWhen: 'An orchestrator or browser worker needs a deterministic selection before calling its own model SDK.',
    contract: 'Model metadata + constraints → selected or blocked plan',
    availability: 'Unreleased router entry · Node / Worker',
    guidePath: '/blob/main/docs/ROUTER_LIBRARY.md',
    boundary: 'The proposed @nymrel/agent/router entry needs its exact source candidate. Existing v0.4.1 downloads lack it; the full package still installs its declared dependencies.',
  },
  {
    repositoryId: 'permitmesh',
    title: 'Check a proposed software action',
    useWhen: 'An agent host needs path, operation, approval and budget checks before dispatching a tool.',
    contract: 'Permit + proposed action → allow / deny + reason codes',
    availability: 'Source candidate · Python 3.11–3.14',
    guidePath: '/blob/main/README.md#thirty-second-demo',
    boundary: 'Your authenticated host enforces the decision, owns nonce consumption and stops denied actions.',
  },
  {
    repositoryId: 'nymrel-proof-ledger',
    title: 'Hand off a verifiable artifact',
    useWhen: 'A build or automation producer needs to send artifact bytes with a receipt another process can verify offline.',
    contract: 'Artifact + signer record → receipt → configured verifier',
    availability: 'Source installation · Node / Python',
    guidePath: '/blob/main/docs/QUICKSTART.md',
    boundary: 'The verifier supplies a trusted key and checks the artifact. A receipt does not establish execution or signer authority.',
  },
] as const;

export const buildPaths = (repositories: readonly EcosystemRepo[]) => paths.map((path) => {
  const repository = repositories.find((entry) => entry.id === path.repositoryId);
  if (!repository) throw new Error('Build path references an unknown catalog repository: ' + path.repositoryId);
  return Object.assign({}, path, { repository, guideUrl: repository.githubUrl + path.guidePath });
});
