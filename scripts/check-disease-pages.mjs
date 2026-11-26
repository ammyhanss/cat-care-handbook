import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = path.resolve('src/content/docs');
const locales = ['en', 'zh-cn', 'ja'];
const statuses = new Set(['draft', 'literature-checked', 'vet-reviewed']);
const urgencies = new Set(['emergency', 'soon', 'monitor']);
const errors = [];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(md|mdx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const files = walk(root);

for (const file of files) {
  const rel = path.relative(root, file).split(path.sep).join('/');
  const top = rel.split('/')[0];
  if (locales.includes(top)) continue;
  for (const locale of locales) {
    const counterpart = path.join(root, locale, rel);
    if (!fs.existsSync(counterpart)) {
      errors.push(`Missing ${locale} page for ${rel}`);
    }
  }
}

for (const file of files) {
  const rel = path.relative(root, file).split(path.sep).join('/');
  if (!rel.includes('/diseases/') && !rel.startsWith('diseases/')) continue;
  if (rel.endsWith('/index.md') || rel.endsWith('/index.mdx')) continue;

  const raw = fs.readFileSync(file, 'utf8');
  const parsed = matter(raw);
  const data = parsed.data ?? {};

  if (!data.title || typeof data.title !== 'string') errors.push(`${rel}: title is required`);
  if (!data.en || typeof data.en !== 'string') errors.push(`${rel}: en name is required`);
  if (!statuses.has(data.status)) errors.push(`${rel}: status must be draft, literature-checked, or vet-reviewed`);
  if (!urgencies.has(data.urgency)) errors.push(`${rel}: urgency must be emergency, soon, or monitor`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.last_updated ?? ''))) {
    errors.push(`${rel}: last_updated must be YYYY-MM-DD`);
  }
  if (!Object.hasOwn(data, 'reviewed_by')) errors.push(`${rel}: reviewed_by must be present`);
  if (!Array.isArray(data.sources) || data.sources.length === 0 || data.sources.some((item) => typeof item !== 'string' || !item.trim())) {
    errors.push(`${rel}: sources must be a non-empty list of strings`);
  }

  if (data.status === 'literature-checked' || data.status === 'vet-reviewed') {
    const body = parsed.content.replace(/\s+/g, '');
    if (body.length < 1500) errors.push(`${rel}: ${data.status} page body is too short`);
    const joined = data.sources.join('\n');
    const urls = joined.match(/https?:\/\/\S+/g) ?? [];
    if (urls.length > 0 && !urls.some((url) => parsed.content.includes(url.replace(/[),.;]+$/, '')))) {
      errors.push(`${rel}: body should include at least one source URL from frontmatter`);
    }
  }
}

if (errors.length) {
  console.error(`Disease page check failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Checked ${files.length} docs pages. Disease frontmatter is valid.`);
