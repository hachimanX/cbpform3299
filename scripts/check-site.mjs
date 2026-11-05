import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const dist = resolve('dist');
const sitemap = readFileSync(resolve(dist, 'sitemap.xml'), 'utf8');
const robots = readFileSync(resolve(dist, 'robots.txt'), 'utf8');
assert.match(robots, /Sitemap:\s+https:\/\/cbpform3299\.com\/sitemap\.xml/);

const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const required = [
  'https://cbpform3299.com/',
  'https://cbpform3299.com/guides/',
  'https://cbpform3299.com/guides/how-to-fill-out-cbp-form-3299/',
  'https://cbpform3299.com/guides/cbp-form-3299-fedex/',
  'https://cbpform3299.com/guides/cbp-form-3299-supplemental-declaration/',
  'https://cbpform3299.com/about/',
  'https://cbpform3299.com/contact/',
  'https://cbpform3299.com/privacy/',
  'https://cbpform3299.com/terms/',
  'https://cbpform3299.com/refund/',
  'https://cbpform3299.com/sitemap/',
];
for (const url of required) assert.ok(locs.includes(url), `sitemap missing ${url}`);
assert.equal(locs.some((url) => url.includes('ai-instructions')), false, 'ai-instructions must stay out of the sitemap');

function fileFor(url) {
  const path = url.replace('https://cbpform3299.com', '') || '/';
  if (path === '/') return resolve(dist, 'index.html');
  return resolve(dist, path.replace(/^\//, ''), 'index.html');
}

const titles = new Map();
const descriptions = new Map();

function readMeta(html, name) {
  const match = html.match(new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, 'i'));
  assert.ok(match, `missing meta ${name}`);
  return match[1];
}

function checkHtml(url, html, { noindex = false } = {}) {
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  assert.ok(title, `missing title for ${url}`);
  const description = readMeta(html, 'description');
  assert.ok(description.length > 40, `short description for ${url}`);
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  const robotsMeta = readMeta(html, 'robots');
  if (noindex) {
    assert.match(robotsMeta, /noindex/);
  } else {
    assert.match(robotsMeta, /index/);
    assert.equal(canonical, url, `canonical mismatch for ${url}: ${canonical}`);
    assert.equal(titles.has(title), false, `duplicate title: ${title}`);
    assert.equal(descriptions.has(description), false, `duplicate description: ${description}`);
  }
  if (canonical && !noindex) {
    titles.set(title, url);
    descriptions.set(description, url);
  } else if (!noindex) {
    throw new Error(`missing canonical for ${url}`);
  } else if (canonical) {
    assert.equal(canonical, url);
  }
  return title;
}

for (const url of locs) {
  const file = fileFor(url);
  assert.equal(existsSync(file), true, `missing file for ${url} -> ${file}`);
  checkHtml(url, readFileSync(file, 'utf8'));
}

const ai = readFileSync(resolve(dist, 'ai-instructions/index.html'), 'utf8');
checkHtml('https://cbpform3299.com/ai-instructions/', ai, { noindex: true });

const notFound = readFileSync(resolve(dist, '404.html'), 'utf8');
assert.match(notFound, /<title>[^<]+<\/title>/);
assert.match(notFound, /name="robots"\s+content="[^"]*noindex/);
assert.match(notFound, /name="description"/);

const jsFiles = readdirSync(resolve(dist, 'assets')).filter((name) => name.endsWith('.js'));
assert.ok(jsFiles.length > 0, 'no built js');
const bundle = jsFiles.map((name) => readFileSync(resolve(dist, 'assets', name), 'utf8')).join('\n');
for (const banned of ['isWatermarked', 'generateCBPForm3299', 'unlockedPurchased']) {
  assert.equal(bundle.includes(banned), false, `client bundle still contains ${banned}`);
}
// Reading ?paid=true is allowed only to reject the old bypass. It must not unlock.
assert.match(bundle, /get\(`paid`\)===`true`/);
assert.match(bundle, /needs_setup/);
const review = readFileSync(resolve('src/components/Wizard/StepReviewExport.tsx'), 'utf8');
assert.match(review, /legacyBypass/);
assert.doesNotMatch(review, /isWatermarked:\s*false/);
assert.doesNotMatch(review, /setUnlockPhase\('unlocked'\)[\s\S]{0,80}legacyBypass/);

console.log(`check-site: ${locs.length} sitemap urls, titles unique, paywall bypass absent from the client bundle`);
