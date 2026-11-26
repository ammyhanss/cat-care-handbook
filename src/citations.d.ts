export const CITE_RE: RegExp;

export const evidenceLimitedTitle: Record<string, string>;

export const referenceLabels: Record<
  string,
  { heading: string; locator: string; tier: string; missing: string }
>;

export function localeFromPath(filePath: string | undefined): string;

export function normalizeLocator(locator: string): string;

export function citationKey(id: string, locator: string): string;

export function indexCitations(markdown: string): {
  keyToN: Map<string, number>;
  order: Array<{ id: string; locator: string; n: number }>;
};

export function citedSourceIds(markdown: string): string[];

export function tierCounts(
  sources: Array<{ id?: string; tier?: number }>,
  ids: string[],
): { 1: number; 2: number; 3: number };

export function tierSummary(
  lang: string,
  counts: { 1: number; 2: number; 3: number },
  cited: boolean,
): string;

export function claimUnits(markdown: string): string[];

export function checkDiseasePage(
  rel: string,
  data: Record<string, unknown>,
  body: string,
  options?: { requireUrgency?: boolean },
): string[];

export function checkGuidePage(rel: string, data: Record<string, unknown>, body: string): string[];
