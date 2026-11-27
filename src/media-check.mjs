import fs from 'node:fs';
import path from 'node:path';
import { SITE_BASE } from './site-base.mjs';

const MD_IMAGE = /!\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(?:\s+(?:"[^"]*"|'[^']*'))?\s*\)/g;
const HTML_IMAGE = /<img\b[^>]*>/gi;

function stripFences(markdown) {
  return String(markdown ?? '').replace(/```[\s\S]*?```/g, '');
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  if (!match) return null;
  return match[1] ?? match[2] ?? match[3] ?? '';
}

/**
 * Images in prose. Alt may be empty; the checker reports that separately.
 * Fenced code is ignored so an example of image syntax is not a page image.
 */
export function findImages(markdown) {
  const source = stripFences(markdown);
  const images = [];
  for (const match of source.matchAll(MD_IMAGE)) {
    images.push({ alt: match[1], src: match[2], kind: 'markdown' });
  }
  for (const match of source.matchAll(HTML_IMAGE)) {
    const tag = match[0];
    images.push({
      alt: attr(tag, 'alt'),
      src: attr(tag, 'src') ?? '',
      kind: 'html',
    });
  }
  return images;
}

function isRemote(src) {
  return /^[a-z][a-z0-9+.-]*:/i.test(src) || src.startsWith('//');
}

function isSvg(src) {
  const pathOnly = src.split('?')[0].split('#')[0];
  return pathOnly.toLowerCase().endsWith('.svg');
}

/**
 * Map a local image URL to a path under public/.
 * Accepts /diagrams/name.svg and /cat-care-handbook/diagrams/name.svg.
 */
export function publicFileForImage(src, base = SITE_BASE) {
  const pathOnly = src.split('?')[0].split('#')[0];
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  let pathname = pathOnly;
  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
    pathname = pathname.slice(prefix.length) || '/';
  }
  if (!pathname.startsWith('/')) return null;
  const rel = pathname.replace(/^\/+/, '');
  if (!rel || rel.split('/').some((part) => part === '..' || part === '.')) return { error: 'escape' };
  return { repoPath: path.posix.join('public', rel) };
}

/**
 * Every image needs alt text and a credits entry.
 * SVG files must live in the repository. Root-relative paths are required so the
 * site base can be prefixed at build time.
 */
export function checkDocumentImages(rel, markdown, options = {}) {
  const errors = [];
  const credits = String(options.credits ?? '');
  const publicRoot = options.publicRoot ?? path.resolve('public');
  const base = options.base ?? SITE_BASE;
  const images = findImages(markdown);

  images.forEach((image, index) => {
    const where = `${rel}: image ${index + 1}`;
    const src = String(image.src ?? '').trim();
    const alt = image.alt == null ? '' : String(image.alt).trim();
    if (!alt) errors.push(`${where} has no alt text${src ? `: ${src}` : ''}`);
    if (!src) {
      errors.push(`${where} has no src`);
      return;
    }
    if (isRemote(src)) {
      if (isSvg(src)) errors.push(`${where} SVG images must be local files: ${src}`);
      if (!credits.includes(src)) errors.push(`${where} has no credits entry for ${src}`);
      return;
    }
    if (!src.startsWith('/')) {
      errors.push(
        `${where} must use a root-relative path starting with / so ${base} can be prefixed: ${src}`,
      );
      return;
    }
    const local = publicFileForImage(src, base);
    if (!local || local.error) {
      errors.push(`${where} has an unsafe path: ${src}`);
      return;
    }
    const abs = path.join(publicRoot, path.relative('public', local.repoPath));
    if (!fs.existsSync(abs)) errors.push(`${where} file is missing: ${local.repoPath}`);
    if (isSvg(src) && !abs.toLowerCase().endsWith('.svg')) {
      errors.push(`${where} SVG images must be local files: ${src}`);
    }
    if (!credits.includes(local.repoPath)) {
      errors.push(`${where} has no credits entry for ${local.repoPath}`);
    }
  });

  return errors;
}
