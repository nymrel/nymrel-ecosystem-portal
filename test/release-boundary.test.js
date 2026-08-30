import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { access, readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';

const read = (relativePath) => readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');

describe('static-site release boundary', () => {
  it('is private and has no npm publication path', async () => {
    const packageJson = JSON.parse(await read('package.json'));

    assert.equal(packageJson.private, true);
    assert.equal(packageJson.packageManager, 'npm@12.0.2');
    assert.equal(packageJson.publishConfig, undefined);
    assert.equal(packageJson.scripts.publish, undefined);
    assert.equal(packageJson.scripts.prepublishOnly, undefined);

    await assert.rejects(access(new URL('../.github/workflows/publish.yml', import.meta.url)));
  });

  it('keeps CI immutable, least-privilege, and fail-closed', async () => {
    const workflow = await read('.github/workflows/ci.yml');

    assert.match(workflow, /permissions: \{\}/u);
    assert.doesNotMatch(workflow, /continue-on-error/u);
    assert.doesNotMatch(workflow, /npm ci \|\|/u);
    assert.doesNotMatch(workflow, /NODE_AUTH_TOKEN/u);

    for (const line of workflow.split(/\r?\n/u)) {
      const match = line.match(/^\s*uses:\s*[^@\s]+@([^\s#]+)/u);
      if (match) {
        assert.match(match[1], /^[0-9a-f]{40}$/u, line.trim());
      }
    }
  });

  it('binds local servers to loopback', async () => {
    const config = await read('vite.config.ts');
    assert.match(config, /host: '127\.0\.0\.1'/u);
    assert.doesNotMatch(config, /host: true/u);
  });

  it('binds the CSP to the exact JSON-LD and omits fabricated trust headers', async () => {
    const [headers, index] = await Promise.all([read('public/_headers'), read('index.html')]);
    const match = index.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/u);
    assert.ok(match);
    const hash = createHash('sha256').update(match[1]).digest('base64');

    assert.match(headers, /default-src 'none'/u);
    assert.ok(headers.includes(`script-src 'self' 'sha256-${hash}'`));
    assert.doesNotMatch(headers, /trustScore=|ucp=enabled|X-XSS-Protection|Authorization/u);
  });
});
