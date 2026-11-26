/**
 * Shared citation parsing for the content checker and the page renderer.
 *
 * Marker: [^source-id|locator]
 * The pipe is the separator. A colon would be read as a Markdown directive.
 * source-id matches frontmatter sources[].id
 * locator is the section heading, page, table, or figure in that source.
 * The locator runs to the closing bracket and may contain spaces.
 */

export const CITE_RE = /\[\^([a-z0-9]+(?:-[a-z0-9]+)*)\|([^\]]+)\]/g;
const CITE_TEST = /\[\^([a-z0-9]+(?:-[a-z0-9]+)*)\|([^\]]+)\]/g;
const ANY_FOOTNOTE = /\[\^[^\]]*\]/g;
const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DOI_RE = /^10\.\d{4,9}\/\S+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const evidenceLimitedTitle = {
  en: 'Evidence currently limited',
  'zh-TW': '目前證據有限',
  'zh-CN': '目前证据有限',
  ja: '現時点では根拠が限られる',
};

export const referenceLabels = {
  en: {
    heading: 'References',
    locator: 'Locator',
    tier: 'Tier',
    missing: 'Source id is not defined on this page',
  },
  'zh-TW': {
    heading: '參考文獻',
    locator: '位置',
    tier: '證據等級',
    missing: '本頁未定義這個來源編號',
  },
  'zh-CN': {
    heading: '参考文献',
    locator: '位置',
    tier: '证据等级',
    missing: '本页未定义这个来源编号',
  },
  ja: {
    heading: '参考文献',
    locator: '該当箇所',
    tier: '根拠の等級',
    missing: 'このページにこの出典IDの定義がありません',
  },
};

export function localeFromPath(filePath) {
  const path = String(filePath ?? '').replaceAll('\\', '/');
  if (path.includes('/content/docs/en/')) return 'en';
  if (path.includes('/content/docs/zh-cn/')) return 'zh-CN';
  if (path.includes('/content/docs/ja/')) return 'ja';
  return 'zh-TW';
}

export function normalizeLocator(locator) {
  return String(locator ?? '').trim().replace(/\s+/g, ' ');
}

export function citationKey(id, locator) {
  return `${id}\n${normalizeLocator(locator)}`;
}

export function indexCitations(markdown) {
  const keyToN = new Map();
  const order = [];
  const re = new RegExp(CITE_RE.source, 'g');
  for (const match of String(markdown ?? '').matchAll(re)) {
    const id = match[1];
    const locator = normalizeLocator(match[2]);
    const key = citationKey(id, locator);
    if (!keyToN.has(key)) {
      const n = order.length + 1;
      keyToN.set(key, n);
      order.push({ id, locator, n });
    }
  }
  return { keyToN, order };
}

export function citedSourceIds(markdown) {
  const ids = [];
  const seen = new Set();
  for (const item of indexCitations(markdown).order) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    ids.push(item.id);
  }
  return ids;
}

export function tierCounts(sources, ids) {
  const counts = { 1: 0, 2: 0, 3: 0 };
  const byId = new Map();
  for (const source of sources ?? []) {
    if (source && typeof source === 'object' && source.id) byId.set(source.id, source);
  }
  const seen = new Set();
  for (const id of ids ?? []) {
    if (seen.has(id)) continue;
    seen.add(id);
    const tier = Number(byId.get(id)?.tier);
    if (counts[tier] !== undefined) counts[tier] += 1;
  }
  return counts;
}

export function tierSummary(lang, counts, cited) {
  const c = counts ?? { 1: 0, 2: 0, 3: 0 };
  const lines = {
    en: cited
      ? `Sources cited: ${c[1]} tier 1, ${c[2]} tier 2, ${c[3]} tier 3.`
      : `Sources listed: ${c[1]} tier 1, ${c[2]} tier 2, ${c[3]} tier 3. Sentences are not cited yet.`,
    'zh-TW': cited
      ? `本頁引用：第 1 級 ${c[1]} 項，第 2 級 ${c[2]} 項，第 3 級 ${c[3]} 項。`
      : `已列來源：第 1 級 ${c[1]} 項，第 2 級 ${c[2]} 項，第 3 級 ${c[3]} 項。正文尚未逐句引用。`,
    'zh-CN': cited
      ? `本页引用：第 1 级 ${c[1]} 项，第 2 级 ${c[2]} 项，第 3 级 ${c[3]} 项。`
      : `已列来源：第 1 级 ${c[1]} 项，第 2 级 ${c[2]} 项，第 3 级 ${c[3]} 项。正文尚未逐句引用。`,
    ja: cited
      ? `本文で引用：等級1 ${c[1]} 件、等級2 ${c[2]} 件、等級3 ${c[3]} 件。`
      : `記載した出典：等級1 ${c[1]} 件、等級2 ${c[2]} 件、等級3 ${c[3]} 件。本文はまだ文ごとの引用がありません。`,
  };
  return lines[lang] ?? lines.en;
}

function isRealDate(value) {
  if (!DATE_RE.test(String(value ?? ''))) return false;
  const [year, month, day] = String(value).split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function stripSkippedRegions(markdown) {
  return String(markdown ?? '')
    .replace(/<!--\s*nonclaim-start\s*-->[\s\S]*?<!--\s*nonclaim-end\s*-->/g, '')
    .replace(/```[\s\S]*?```/g, '');
}

function hasProse(text) {
  const bare = text
    .replace(new RegExp(CITE_RE.source, 'g'), '')
    .replace(/<[^>]+>/g, '')
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[[^\]]*]\([^)]*\)/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[#>*_`~[\]()|-]/g, '');
  return /\p{L}/u.test(bare);
}

/**
 * Claim units are paragraphs and list items that make a statement.
 * Headings, code, and regions marked nonclaim are not claim units.
 */
export function claimUnits(markdown) {
  const units = [];
  const blocks = stripSkippedRegions(markdown).split(/\n{2,}/);
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    if (/^<!--\s*nonclaim\s*-->/.test(trimmed)) continue;
    if (/^:::(?:evidence-limited)?\s*$/.test(trimmed)) continue;
    if (/^<!--/.test(trimmed) && /-->$/.test(trimmed) && !hasProse(trimmed)) continue;
    if (/^#{1,6}\s+\S/.test(trimmed) && !trimmed.includes('\n')) continue;
    if (/^(?:[-*+]|\d+\.)\s/m.test(trimmed)) {
      const items = trimmed.split(/\n(?=(?:[-*+]|\d+\.)\s)/);
      for (const item of items) {
        const itemText = item.replace(/^(?:[-*+]|\d+\.)\s+/, '').trim();
        if (!itemText || /^<!--\s*nonclaim\s*-->/.test(itemText)) continue;
        if (hasProse(itemText)) units.push(itemText);
      }
      continue;
    }
    if (hasProse(trimmed)) units.push(trimmed);
  }
  return units;
}

function sourceErrors(source, index, rel) {
  const where = `${rel}: sources[${index}]`;
  const errors = [];
  if (!source || typeof source !== 'object' || Array.isArray(source)) {
    errors.push(`${where} must be an object with id, title, authors, year, tier, and url or doi`);
    return errors;
  }
  if (typeof source.id !== 'string' || !ID_RE.test(source.id)) {
    errors.push(`${where} id must be lowercase words separated by hyphens`);
  }
  if (typeof source.title !== 'string' || !source.title.trim()) errors.push(`${where} title is required`);
  if (typeof source.authors !== 'string' || !source.authors.trim()) {
    errors.push(`${where} authors (people or organization) is required`);
  }
  const year = Number(source.year);
  if (!Number.isInteger(year) || year < 1900 || year > 2100) {
    errors.push(`${where} year must be a four-digit year`);
  }
  const tier = Number(source.tier);
  if (![1, 2, 3].includes(tier)) errors.push(`${where} tier must be 1, 2, or 3`);
  const url = source.url == null || source.url === '' ? '' : String(source.url);
  const doi = source.doi == null || source.doi === '' ? '' : String(source.doi);
  if (!url && !doi) errors.push(`${where} needs a url or a DOI`);
  if (url && !/^https?:\/\/\S+$/.test(url)) errors.push(`${where} url must start with http:// or https://`);
  if (doi && !DOI_RE.test(doi)) errors.push(`${where} doi must look like 10.xxxx/...`);
  return errors;
}

function looseMarkers(unit) {
  const errors = [];
  const matched = new Set();
  for (const match of unit.matchAll(new RegExp(CITE_TEST.source, 'g'))) matched.add(match[0]);
  for (const match of unit.matchAll(new RegExp(ANY_FOOTNOTE.source, 'g'))) {
    if (!matched.has(match[0])) errors.push(match[0]);
  }
  return errors;
}

/**
 * Check one disease page. rel is the path relative to src/content/docs.
 * Full citation coverage applies to literature-checked and vet-reviewed pages.
 * Drafts still need valid sources, dates, and well-formed markers if any exist.
 */
export function checkDiseasePage(rel, data, body) {
  const errors = [];
  const statuses = new Set(['draft', 'literature-checked', 'vet-reviewed']);
  const urgencies = new Set(['emergency', 'soon', 'monitor']);
  if (!data.title || typeof data.title !== 'string') errors.push(`${rel}: title is required`);
  if (!data.en || typeof data.en !== 'string') errors.push(`${rel}: en name is required`);
  if (!statuses.has(data.status)) errors.push(`${rel}: status must be draft, literature-checked, or vet-reviewed`);
  if (!urgencies.has(data.urgency)) errors.push(`${rel}: urgency must be emergency, soon, or monitor`);
  if (!isRealDate(data.last_updated)) errors.push(`${rel}: last_updated must be a real YYYY-MM-DD date`);
  if (!isRealDate(data.last_verified)) errors.push(`${rel}: last_verified must be a real YYYY-MM-DD date`);
  if (!Object.hasOwn(data, 'reviewed_by')) errors.push(`${rel}: reviewed_by must be present`);

  if (!Array.isArray(data.sources) || data.sources.length === 0) {
    errors.push(`${rel}: sources must be a non-empty list of source objects`);
    return errors;
  }

  const byId = new Map();
  data.sources.forEach((source, index) => {
    errors.push(...sourceErrors(source, index, rel));
    if (source && typeof source.id === 'string') {
      if (byId.has(source.id)) errors.push(`${rel}: duplicate source id ${source.id}`);
      byId.set(source.id, source);
    }
  });

  const full = data.status === 'literature-checked' || data.status === 'vet-reviewed';
  const units = claimUnits(body);
  if (full && units.length === 0) errors.push(`${rel}: ${data.status} page has no cited claim text`);
  if (full && String(body ?? '').replace(/\s+/g, '').length < 1500) {
    errors.push(`${rel}: ${data.status} page body is too short`);
  }

  units.forEach((unit, index) => {
    const broken = looseMarkers(unit);
    for (const marker of broken) {
      errors.push(`${rel}: claim ${index + 1} has a citation marker without id and locator: ${marker}`);
    }
    const cites = [...unit.matchAll(new RegExp(CITE_RE.source, 'g'))];
    if (full && cites.length === 0) {
      const preview = unit.replace(/\s+/g, ' ').slice(0, 80);
      errors.push(`${rel}: medical claim has no citation marker: ${preview}`);
    }
    const tiers = [];
    for (const cite of cites) {
      const id = cite[1];
      const locator = normalizeLocator(cite[2]);
      if (!locator) errors.push(`${rel}: citation [^${id}|] needs a locator`);
      const source = byId.get(id);
      if (!source) {
        errors.push(`${rel}: citation references undefined source id ${id}`);
        continue;
      }
      tiers.push(Number(source.tier));
    }
    if (cites.length > 0 && tiers.length === cites.length && tiers.every((tier) => tier === 3)) {
      const preview = unit.replace(/\s+/g, ' ').slice(0, 80);
      errors.push(`${rel}: claim is supported only by tier 3: ${preview}`);
    }
  });

  return errors;
}
