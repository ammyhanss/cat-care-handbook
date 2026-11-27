import { evidenceLimitedTitle, indexCitations, localeFromPath, referenceLabels } from '../citations.mjs';
import { withSiteBase } from '../site-base.mjs';

function splitCiteText(value, keyToN, seen) {
  const re = /\[\^([a-z0-9]+(?:-[a-z0-9]+)*)\|([^\]]+)\]/g;
  const out = [];
  let last = 0;
  for (const match of value.matchAll(re)) {
    if (match.index > last) out.push({ type: 'text', value: value.slice(last, match.index) });
    const id = match[1];
    const locator = match[2].trim().replace(/\s+/g, ' ');
    const n = keyToN.get(`${id}\n${locator}`);
    if (n) {
      seen.set(n, (seen.get(n) ?? 0) + 1);
      out.push(citeLink(n, seen.get(n)));
    } else {
      out.push({ type: 'text', value: match[0] });
    }
    last = match.index + match[0].length;
  }
  if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
  return out.length ? out : [{ type: 'text', value }];
}

function citeLink(n, occurrence) {
  const properties = {
    class: 'cite',
    href: `#ref-${n}`,
  };
  if (occurrence === 1) properties.id = `cite-${n}`;
  return {
    type: 'link',
    url: `#ref-${n}`,
    data: { hProperties: properties },
    children: [{ type: 'text', value: String(n) }],
  };
}

function sourceHref(source) {
  if (source?.url) return String(source.url);
  if (source?.doi) return `https://doi.org/${source.doi}`;
  return '';
}

function referenceItem(entry, source, labels) {
  const href = sourceHref(source);
  const children = [];
  if (source) {
    children.push({
      type: 'text',
      value: `${source.authors} (${source.year}). ${source.title}. `,
    });
    if (href) {
      children.push({
        type: 'link',
        url: href,
        children: [{ type: 'text', value: href }],
      });
      children.push({ type: 'text', value: '. ' });
    }
    if (source.doi) {
      children.push({ type: 'text', value: `DOI: ${source.doi}. ` });
    }
    children.push({
      type: 'text',
      value: `${labels.locator}: ${entry.locator}. ${labels.tier} ${source.tier}.`,
    });
  } else {
    children.push({
      type: 'text',
      value: `${entry.id}. ${labels.missing}. ${labels.locator}: ${entry.locator}.`,
    });
  }
  return {
    type: 'listItem',
    data: { hProperties: { id: `ref-${entry.n}` } },
    children: [{ type: 'paragraph', children }],
  };
}

function frontmatterSources(ctx) {
  const fromAstro = ctx.data?.astro?.frontmatter?.sources;
  return Array.isArray(fromAstro) ? fromAstro : [];
}

/**
 * Sätteri plugin: numbered citation links, a reference list, and the
 * evidence-limited admonition. Markers use [^id|locator]. A colon would be
 * parsed as a directive, so the id and the locator are separated by a pipe.
 */
export function handbookMarkdownPlugin(ctx) {
  const lang = localeFromPath(ctx.fileURL ? decodeURIComponent(ctx.fileURL.pathname) : '');
  const labels = referenceLabels[lang] ?? referenceLabels.en;
  const title = evidenceLimitedTitle[lang] ?? evidenceLimitedTitle.en;
  const sources = frontmatterSources(ctx);
  const byId = new Map(sources.filter((source) => source && source.id).map((source) => [source.id, source]));
  const { keyToN, order } = indexCitations(ctx.source ?? '');
  const seen = new Map();

  return {
    name: 'handbook-citations',
    image(node, visitor) {
      if (typeof node?.url !== 'string') return;
      const next = withSiteBase(node.url);
      if (next !== node.url) visitor.setField(node, 'url', next);
    },
    text(node, visitor) {
      if (typeof node.value !== 'string' || !node.value.includes('[^')) return;
      const parts = splitCiteText(node.value, keyToN, seen);
      if (parts.length === 1 && parts[0].type === 'text' && parts[0].value === node.value) return;
      visitor.replaceNode(node, parts);
    },
    containerDirective(node) {
      if (node.name !== 'evidence-limited') return;
      return {
        type: 'blockquote',
        data: {
          hName: 'aside',
          hProperties: {
            class: 'evidence-limited',
            role: 'note',
          },
        },
        children: [
          {
            type: 'paragraph',
            data: { hProperties: { class: 'evidence-limited-title' } },
            children: [{ type: 'text', value: title }],
          },
          ...node.children,
        ],
      };
    },
    after(root, visitor) {
      if (order.length === 0) return;
      visitor.appendChild(root, [
        {
          type: 'heading',
          depth: 2,
          children: [{ type: 'text', value: labels.heading }],
        },
        {
          type: 'list',
          ordered: true,
          start: 1,
          data: { hProperties: { class: 'references' } },
          children: order.map((entry) => referenceItem(entry, byId.get(entry.id), labels)),
        },
      ]);
    },
  };
}
