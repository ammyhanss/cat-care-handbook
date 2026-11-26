# Evidence policy

This policy is how the Cat Care Handbook decides what may be said on a disease page. It applies to every locale. The short Traditional Chinese version is [EVIDENCE-POLICY.zh-TW.md](EVIDENCE-POLICY.zh-TW.md).

The handbook is owner education. It is not a diagnosis, and it does not give doses, dosing intervals, or course lengths.

## Source tiers

| Tier | What it is | How it may be used |
| --- | --- | --- |
| 1 | Consensus guidelines from ISFM, International Cat Care (iCatCare), AAFP, IRIS, ABCD, WSAVA, or an ACVIM consensus statement | May support a claim on their own |
| 2 | Peer-reviewed papers and reviews, including the Journal of Feline Medicine and Surgery, JAVMA, the Journal of Veterinary Internal Medicine, Veterinary Clinics of North America, and Frontiers in Veterinary Science | May support a claim on their own |
| 3 | Veterinary textbooks and reference sites, including the Merck Veterinary Manual, the Cornell Feline Health Center, and VCA | Supplementary link only. Never the only support for a claim |

AAHA guidelines are peer-reviewed papers. They are tier 2 unless a later decision adds AAHA to the tier 1 list. iCatCare consensus guidelines are tier 1 because ISFM guidelines are issued through International Cat Care.

A living guideline page with no single publication year uses the year printed as "last updated." If the page prints no year, `year` is the calendar year in which the URL was checked.

## What a claim is

A claim is a sentence or short paragraph that states a medical fact: what the disease is, how common it is, what causes it, what signs occur, which test means what, what treatment direction the literature supports, or what the outlook is.

These are not claims, and they are marked so the checker skips them:

- A heading.
- A sentence that only states the handbook's own rule, such as "this page does not give doses." Start that paragraph with `<!-- nonclaim -->`.
- A block of further reading that is not used as evidence. Wrap it in `<!-- nonclaim-start -->` and `<!-- nonclaim-end -->`.

Do not use `nonclaim` to hide a medical statement. Reviewers should reject that.

## Citation marker

Define every source in frontmatter:

```yaml
sources:
  - id: abcd-2026
    title: Update on Treatment of Feline Infectious Peritonitis
    authors: Tasker S, Spiri AM, Hartmann K, et al.
    year: 2026
    url: https://www.mdpi.com/1999-4915/18/4/452
    tier: 1
```

`authors` is the people or the organization. `tier` is 1, 2, or 3. At least one of `url` or `doi` is required. `id` is lowercase words separated by hyphens.

In the body, mark the claim:

```markdown
Oral GS-441524 is the nucleoside analogue with the most published experience.[^abcd-2026|2.1. GS-441524]
```

The marker is `[^source-id|locator]`. A pipe separates the id from the locator. A colon is not used, because Markdown would read it as a directive. The locator is the section heading, page, table, or figure in that source. It may contain spaces. It may not contain `]`. Use the source's own heading, which for these papers is English, in every locale.

The same source with a different locator is a different note. The same source and the same locator reuse one number.

The site renders the markers as superscript numbers and builds a numbered reference list at the end of the page. Do not hand-write that list.

Two markers may sit on one claim when two passages support it. If every marker on a claim is tier 3, the checker fails. A tier 3 source may appear only beside a tier 1 or tier 2 marker.

## Dates and status

- `last_updated`: the date the page text last changed.
- `last_verified`: the date a person checked the claims against the cited passages. On a draft with no claims, it is the date the source records were checked for a working citation.
- `status` stays `literature-checked` after that check. It becomes `vet-reviewed` only when a person listed in `REVIEWERS.md` has reviewed that version. The page must say that literature-checked is not vet-reviewed.

## Thin evidence

Where the evidence is thin, use the evidence-limited admonition instead of softening the sentence into vague wording. The title is translated. The body is the specific limit, and it still needs a citation.

```markdown
:::evidence-limited

The trial had 19 cats, and the difference was not statistically significant.[^winer-2016|Medical Management]

:::
```

If a passage does not support the sentence, delete the sentence. Do not replace it with a weaker sentence that the source also does not say.

## What the checker enforces

`npm run check:content` fails a pull request when:

1. A `literature-checked` or `vet-reviewed` disease page has a medical paragraph or list item with no citation marker.
2. A marker names a source id that is not defined.
3. A source has no tier, or has neither a URL nor a DOI.
4. A claim's only citations are tier 3.
5. `last_updated` or `last_verified` is missing or not a real date.

A `draft` may omit markers. If it has markers, they must resolve, and a tier-3-only claim still fails. Every disease page, including a draft, needs valid source objects.

## Copyright

Write original prose. Do not copy or closely paraphrase the Merck Veterinary Manual, WikiVet, PetQA, or any NC or ND text. A Merck link may appear only inside a `nonclaim` further-reading block, and the block must say the page was not written from that manual.
