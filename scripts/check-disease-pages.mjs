import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { checkDiseasePage, checkGuidePage } from '../src/citations.mjs';
import { checkDocumentImages } from '../src/media-check.mjs';

const root = path.resolve('src/content/docs');
const locales = ['en', 'zh-cn', 'ja'];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(md|mdx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

export function checkContentTree(contentRoot = root, options = {}) {
  const errors = [];
  const files = walk(contentRoot);
  const creditsPath = options.creditsPath ?? path.resolve('docs/CREDITS.md');
  const credits = fs.existsSync(creditsPath) ? fs.readFileSync(creditsPath, 'utf8') : '';
  if (!credits) errors.push('docs/CREDITS.md is missing');
  const publicRoot = options.publicRoot ?? path.resolve('public');

  for (const file of files) {
    const rel = path.relative(contentRoot, file).split(path.sep).join('/');
    const top = rel.split('/')[0];
    if (locales.includes(top)) continue;
    for (const locale of locales) {
      const counterpart = path.join(contentRoot, locale, rel);
      if (!fs.existsSync(counterpart)) errors.push(`Missing ${locale} page for ${rel}`);
    }
  }

  for (const file of files) {
    const rel = path.relative(contentRoot, file).split(path.sep).join('/');
    const raw = fs.readFileSync(file, 'utf8');
    errors.push(...checkDocumentImages(rel, raw, { credits, publicRoot }));
    if (rel.endsWith('/index.md') || rel.endsWith('/index.mdx')) continue;
    const isDisease = rel.includes('/diseases/') || rel.startsWith('diseases/');
    const isGuide = rel.includes('/guide/') || rel.startsWith('guide/');
    if (!isDisease && !isGuide) continue;
    const parsed = matter(raw);
    const check = isGuide ? checkGuidePage : checkDiseasePage;
    errors.push(...check(rel, parsed.data ?? {}, parsed.content));
  }

  return { errors, fileCount: files.length };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);

if (isMain) {
  const { errors, fileCount } = checkContentTree();
  if (errors.length) {
    console.error(`Content check failed (${errors.length}):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(
    `Checked ${fileCount} docs pages. Disease and owner-guide frontmatter, citations, and image credits are valid.`,
  );
}
