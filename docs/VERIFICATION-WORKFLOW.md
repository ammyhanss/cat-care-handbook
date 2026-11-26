# Verification workflow

Use this when a disease page or a first-time cat owner guide page moves from an outline to `literature-checked`, and when a finished page is revised. Feline chronic gingivostomatitis and feline infectious peritonitis are the reference pages for how a claim is cited. The owner guide uses the same marker, the same tiers, and the same rule that an unsupported sentence is deleted.

## 1. Draft only from named sources

List the sources before writing. Prefer the latest consensus guideline that can be read in full. For FIP treatment, that is the newest ABCD, ISFM, or EveryCat statement that is available, and the page states its publication date.

Read the source. Open-access full text comes first. English sources come before translations. Do not use a Simplified Chinese source as the basis of a claim. A tier 3 page may be linked later. It is not reading material for the draft.

Write original sentences. Do not copy Merck, WikiVet, or any NC or ND text.

Do not write a dose, a dosing interval, or a course length. Naming a drug the guideline discusses is allowed.

## 2. A separate pass checks each claim

After the draft exists, check it again, claim by claim, against the cited passage. The question is only: does this source say this?

The locator has to land on that passage: a section heading, page, table, or figure. A citation to a whole paper, with no place to look, is not enough for a finished page.

Record the check date in `last_verified`.

## 3. Delete what the passage does not support

If the passage does not say it, delete the sentence. Do not soften it into "may," "often," or "some believe" unless the passage itself says that.

If the evidence is real but thin (a small series, a non-significant difference, a cause the reviews leave open), keep the narrow fact and wrap it in `:::evidence-limited`. The admonition title is fixed and translated. The body states the limit and still carries a citation.

## 4. Status

Leave `status` at `literature-checked`. Do not set `vet-reviewed`. The page template and the status line say that a veterinarian has not reviewed it.

`vet-reviewed` is a later step. A veterinarian offers a review with the vet-review issue template. A maintainer adds them to `REVIEWERS.md` after checking the public credential. The reviewer then sets `reviewed_by` and the date. Any later edit to the medical text returns the page to `literature-checked` until they review the new version.

## 5. All four locales

Translate only claims that survived the check. Keep the same source ids and the same English locators. Do not add a claim in one language that the others do not have.

## 6. What the pull request must show

The pull request checklist asks for the marker, the tier, the dates, the absence of doses, and a statement that unsupported sentences were deleted. The content checker fails the pull request when a finished page breaks the rules in [EVIDENCE-POLICY.md](EVIDENCE-POLICY.md).
