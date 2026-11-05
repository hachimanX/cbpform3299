import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const config = JSON.parse(readFileSync(resolve('site.config.json'), 'utf8'));
const finePrint = `${config.sellerName} is a brand of ${config.legalEntity}. Registered agent address: ${config.registeredAgentAddress}. Contact: <a href="mailto:${config.sellerEmail}">${config.sellerEmail}</a>`;
const replacements = [
  ['{{SELLER_FINE_PRINT}}', finePrint],
  ['{{SELLER_NAME}}', config.sellerName],
  ['{{SELLER_CONTACT_EMAIL}}', config.sellerEmail],
  ['{{LLC_STATE}}', config.governingState],
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (/\.(html|js|txt|md|xml)$/.test(name)) out.push(path);
  }
  return out;
}

let changed = 0;
for (const file of walk(resolve('dist'))) {
  let text = readFileSync(file, 'utf8');
  const next = replacements.reduce((value, [from, to]) => value.split(from).join(to), text);
  if (next !== text) {
    writeFileSync(file, next);
    changed += 1;
  }
}
console.log(`stamp-seller: updated ${changed} files`);
