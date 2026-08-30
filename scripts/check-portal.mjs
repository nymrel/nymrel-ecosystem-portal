import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fromRoot = (...segments) => path.join(root, ...segments);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function read(relativePath) {
  return readFile(fromRoot(relativePath), 'utf8');
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(entries.map(async (entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return collectFiles(absolutePath);
    }
    return entry.isFile() ? [absolutePath] : [];
  }));

  return nestedFiles.flat();
}

const packageJson = JSON.parse(await read('package.json'));
const packageLock = JSON.parse(await read('package-lock.json'));
const ciWorkflow = await read('.github/workflows/ci.yml');
const headers = await read('public/_headers');
const sourceIndex = await read('index.html');
const viteConfig = await read('vite.config.ts');

assert(packageJson.private === true, 'The portal must remain a private static-site package.');
assert(packageJson.packageManager === 'npm@12.0.2', 'packageManager must pin npm@12.0.2.');
assert(packageJson.engines?.node === '>=22.22.2 <27', 'The supported Node range drifted.');
assert(packageJson.engines?.npm === '>=12.0.2 <13', 'The supported npm range drifted.');
assert(packageJson.publishConfig === undefined, 'A static portal must not expose publishConfig.');
assert(packageJson.scripts?.publish === undefined, 'A static portal must not expose an npm publish script.');
assert(packageJson.scripts?.prepublishOnly === undefined, 'A static portal must not expose a prepublish hook.');
assert(packageLock.lockfileVersion === 3, 'package-lock.json must use lockfileVersion 3.');
assert(packageLock.packages?.['']?.name === '@nymrel/portal', 'The lockfile root identity drifted.');
assert(packageLock.packages?.['']?.engines?.node === packageJson.engines.node, 'The lockfile Node policy drifted.');

await access(fromRoot('.github/workflows/ci.yml'));
let publishWorkflowExists = true;
try {
  await access(fromRoot('.github/workflows/publish.yml'));
} catch {
  publishWorkflowExists = false;
}
assert(!publishWorkflowExists, 'The fail-open npm publication workflow must remain removed.');
assert(ciWorkflow.includes('permissions: {}'), 'CI must default to no token permissions.');
assert(!ciWorkflow.includes('continue-on-error'), 'CI must not suppress step failures.');
assert(!ciWorkflow.includes('npm ci ||'), 'CI must not fall back from the lockfile.');
assert(!ciWorkflow.includes('NODE_AUTH_TOKEN'), 'CI must not carry a registry token.');

for (const line of ciWorkflow.split(/\r?\n/u)) {
  const match = line.match(/^\s*uses:\s*[^@\s]+@([^\s#]+)/u);
  if (match) {
    assert(/^[0-9a-f]{40}$/u.test(match[1]), `Workflow action is not pinned to a full commit: ${line.trim()}`);
  }
}

assert(viteConfig.includes("host: '127.0.0.1'"), 'Vite dev and preview servers must bind to loopback.');
assert(!viteConfig.includes('host: true'), 'Vite must not bind development servers to every interface.');
assert(headers.includes("default-src 'none'"), 'The deployed CSP must start deny-by-default.');
assert(!headers.includes("script-src 'self' 'unsafe-inline'"), 'Inline executable script must not be broadly allowed.');
assert(!headers.includes('trustScore='), 'Response headers must not fabricate a trust score.');
assert(!headers.includes('ucp=enabled'), 'Response headers must not fabricate UCP enablement.');
assert(!headers.includes('Authorization'), 'Static CORS headers must not advertise authorization input.');
assert(!headers.includes('X-XSS-Protection'), 'The obsolete X-XSS-Protection header must stay removed.');

const jsonLdMatch = sourceIndex.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/u);
assert(jsonLdMatch, 'index.html must contain the Organization JSON-LD graph.');
const jsonLdHash = createHash('sha256').update(jsonLdMatch[1]).digest('base64');
assert(headers.includes(`'sha256-${jsonLdHash}'`), 'The CSP hash must match the exact inline JSON-LD bytes.');

const trackedDist = execFileSync('git', ['ls-files', '-z', 'dist'], {
  cwd: root,
  encoding: 'utf8'
});
assert(trackedDist.length === 0, 'Generated dist/ artifacts must not be tracked.');

const distRoot = fromRoot('dist');
const requiredFiles = ['index.html', '_headers', '_routes.json', 'llms.txt', 'robots.txt'];
await Promise.all(requiredFiles.map((relativePath) => access(path.join(distRoot, relativePath))));

const builtFiles = await collectFiles(distRoot);
assert(builtFiles.length > requiredFiles.length, 'The production build did not emit application assets.');
assert(!builtFiles.some((file) => file.endsWith('.map')), 'Production source maps must remain disabled.');

const fileSizes = await Promise.all(builtFiles.map(async (file) => ({
  file,
  bytes: (await stat(file)).size
})));
const totalBytes = fileSizes.reduce((total, entry) => total + entry.bytes, 0);
const largestJavaScriptBytes = fileSizes
  .filter((entry) => entry.file.endsWith('.js'))
  .reduce((largest, entry) => Math.max(largest, entry.bytes), 0);

assert(totalBytes <= 450 * 1024, `Production artifact exceeds the 450 KiB raw budget: ${totalBytes} bytes.`);
assert(largestJavaScriptBytes <= 320 * 1024, `Largest JavaScript asset exceeds 320 KiB: ${largestJavaScriptBytes} bytes.`);

const builtIndex = await read('dist/index.html');
assert(!builtIndex.includes('/src/main.tsx'), 'Built HTML still references source TypeScript.');
assert(builtIndex.includes('/assets/'), 'Built HTML must reference fingerprinted application assets.');
assert(await read('dist/_headers') === headers, 'The built response-header contract drifted from public/_headers.');

console.log(JSON.stringify({
  status: 'PORTAL_ARTIFACT_VALID',
  files: builtFiles.length,
  totalBytes,
  largestJavaScriptBytes,
  jsonLdCspHash: `sha256-${jsonLdHash}`
}, null, 2));
