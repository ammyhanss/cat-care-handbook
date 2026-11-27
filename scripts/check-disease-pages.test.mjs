import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { checkDiseasePage, checkGuidePage, claimUnits } from '../src/citations.mjs';
import { checkDocumentImages } from '../src/media-check.mjs';
import { withSiteBase } from '../src/site-base.mjs';

const tier2 = {
  id: 'lee-2020',
  title: 'An update',
  authors: 'Lee DB',
  year: 2020,
  doi: '10.1016/j.cvsm.2020.04.002',
  url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7194110/',
  tier: 2,
};

const tier1 = {
  id: 'aafp-2022',
  title: 'Diagnosis guidelines',
  authors: 'Thayer V, et al.',
  year: 2022,
  doi: '10.1177/1098612X221118761',
  tier: 1,
};

const tier3 = {
  id: 'merck-oral',
  title: 'Oral inflammatory disease',
  authors: 'Merck Veterinary Manual',
  year: 2024,
  url: 'https://www.merckvetmanual.com/example',
  tier: 3,
};

function page(overrides = {}) {
  return {
    title: 'Example',
    en: 'Example disease',
    status: 'literature-checked',
    reviewed_by: '',
    last_updated: '2026-11-26',
    last_verified: '2026-11-26',
    urgency: 'soon',
    sources: [tier1, tier2],
    ...overrides,
  };
}

const cited = 'The mouth is painful.[^lee-2020|Introduction]\n\n'.repeat(40);

test('a literature-checked paragraph without a marker fails', () => {
  const errors = checkDiseasePage('en/diseases/oral/fcgs.md', page(), `${cited}Antibiotics finish this disease.`);
  assert.ok(errors.some((error) => error.includes('no citation marker')));
});

test('a citation to an undefined source id fails', () => {
  const errors = checkDiseasePage(
    'diseases/oral/fcgs.md',
    page(),
    `${cited}Pain is marked.[^missing-id|Introduction]`,
  );
  assert.ok(errors.some((error) => error.includes('undefined source id missing-id')));
});

test('a source without tier fails', () => {
  const sources = [{ ...tier2, tier: undefined }];
  const errors = checkDiseasePage('diseases/oral/fcgs.md', page({ sources, status: 'draft' }), '## Outline\n');
  assert.ok(errors.some((error) => error.includes('tier must be 1, 2, or 3')));
});

test('a source without url or DOI fails', () => {
  const sources = [{ ...tier2, url: undefined, doi: undefined }];
  const errors = checkDiseasePage('diseases/oral/fcgs.md', page({ sources, status: 'draft' }), '## Outline\n');
  assert.ok(errors.some((error) => error.includes('needs a url or a DOI')));
});

test('a claim supported only by tier 3 fails', () => {
  const errors = checkDiseasePage(
    'diseases/oral/fcgs.md',
    page({ sources: [tier2, tier3] }),
    `${cited}This comes only from a textbook.[^merck-oral|Chapter 1]`,
  );
  assert.ok(errors.some((error) => error.includes('supported only by tier 3')));
});

test('tier 3 is allowed beside a tier 1 or tier 2 source', () => {
  const errors = checkDiseasePage(
    'diseases/oral/fcgs.md',
    page({ sources: [tier2, tier3] }),
    `${cited}Extraction is the main treatment.[^lee-2020|Surgical Treatment][^merck-oral|Chapter 1]`,
  );
  assert.equal(
    errors.some((error) => error.includes('supported only by tier 3')),
    false,
  );
});

test('missing last_verified fails', () => {
  const errors = checkDiseasePage(
    'diseases/oral/fcgs.md',
    page({ last_verified: undefined, status: 'draft' }),
    '## Outline\n',
  );
  assert.ok(errors.some((error) => error.includes('last_verified')));
});

test('a draft may omit citation markers when sources are valid', () => {
  const errors = checkDiseasePage(
    'diseases/endocrine/diabetes.md',
    page({ status: 'draft', sources: [tier1] }),
    '## In one sentence\n\n## Common signs\n',
  );
  assert.deepEqual(errors, []);
});

test('a draft still rejects a broken citation marker', () => {
  const errors = checkDiseasePage(
    'diseases/endocrine/diabetes.md',
    page({ status: 'draft', sources: [tier1] }),
    'Insulin is used.[^not-a-source|Treatment]\n',
  );
  assert.ok(errors.some((error) => error.includes('undefined source id not-a-source')));
});

test('a marker without a locator is rejected', () => {
  const errors = checkDiseasePage('diseases/oral/fcgs.md', page(), `${cited}Pain is marked.[^lee-2020]`);
  assert.ok(errors.some((error) => error.includes('without id and locator')));
});

test('nonclaim regions and headings are not medical claims', () => {
  const units = claimUnits(`## Heading only

<!-- nonclaim --> This page does not give doses.

<!-- nonclaim-start -->
Further reading is not a medical claim about the disease.
<!-- nonclaim-end -->

The mucosa is inflamed.[^lee-2020|Introduction]
`);
  assert.equal(units.length, 1);
  assert.match(units[0], /mucosa is inflamed/);
});

test('a guide page does not require urgency', () => {
  const { urgency: _urgency, ...withoutUrgency } = page();
  const errors = checkGuidePage('en/guide/litter.md', withoutUrgency, cited);
  assert.equal(
    errors.some((error) => error.includes('urgency')),
    false,
  );
});

test('a guide page still requires a citation and last_verified', () => {
  const { urgency: _urgency, ...withoutUrgency } = page();
  const missingCite = checkGuidePage(
    'guide/litter.md',
    withoutUrgency,
    `${cited}Scoop the box on a schedule that the source never states.`,
  );
  assert.ok(missingCite.some((error) => error.includes('no citation marker')));
  const missingDate = checkGuidePage(
    'guide/litter.md',
    { ...withoutUrgency, last_verified: undefined },
    cited,
  );
  assert.ok(missingDate.some((error) => error.includes('last_verified')));
});

test('root-relative diagram URLs gain the site base once', () => {
  assert.equal(withSiteBase('/diagrams/bcs.svg'), '/cat-care-handbook/diagrams/bcs.svg');
  assert.equal(
    withSiteBase('/cat-care-handbook/diagrams/bcs.svg'),
    '/cat-care-handbook/diagrams/bcs.svg',
  );
  assert.equal(withSiteBase('https://example.com/a.svg'), 'https://example.com/a.svg');
});

test('an image without alt text fails', () => {
  const errors = checkDocumentImages('guide/litter.md', '![](/diagrams/litter-setup.svg)\n', {
    credits: 'public/diagrams/litter-setup.svg',
    publicRoot: fs.mkdtempSync(path.join(os.tmpdir(), 'handbook-img-')),
  });
  assert.ok(errors.some((error) => error.includes('no alt text')));
});

test('a remote SVG fails and a local SVG needs a credits entry and a file', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'handbook-img-'));
  fs.mkdirSync(path.join(dir, 'diagrams'));
  fs.writeFileSync(path.join(dir, 'diagrams', 'bcs.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  const remote = checkDocumentImages('guide/food-and-body.md', '![score](https://example.com/bcs.svg)\n', {
    credits: 'https://example.com/bcs.svg',
    publicRoot: dir,
  });
  assert.ok(remote.some((error) => error.includes('SVG images must be local files')));
  const missingCredit = checkDocumentImages('guide/food-and-body.md', '![score](/diagrams/bcs.svg)\n', {
    credits: '',
    publicRoot: dir,
  });
  assert.ok(missingCredit.some((error) => error.includes('no credits entry for public/diagrams/bcs.svg')));
  const ok = checkDocumentImages('guide/food-and-body.md', '![Nine-point body condition scores](/diagrams/bcs.svg)\n', {
    credits: 'public/diagrams/bcs.svg',
    publicRoot: dir,
  });
  assert.deepEqual(ok, []);
});

test('a relative image path is rejected so the site base can be applied', () => {
  const errors = checkDocumentImages('en/guide/litter.md', '![boxes](diagrams/litter-setup.svg)\n', {
    credits: 'public/diagrams/litter-setup.svg',
    publicRoot: fs.mkdtempSync(path.join(os.tmpdir(), 'handbook-img-')),
  });
  assert.ok(errors.some((error) => error.includes('root-relative')));
});

test('list items are separate claims', () => {
  const units = claimUnits(`- Fever returns.[^aafp-2022|Table 2]
- Seizures occur.[^aafp-2022|Table 2]
`);
  assert.equal(units.length, 2);
});
