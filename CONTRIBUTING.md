# Contributing

The Cat Care Handbook is owner education. It is not a diagnosis tool and it does not give prescription doses.

Code is MIT. Educational text is CC BY-SA 4.0. See `LICENSE` and `LICENSE-CONTENT`.

## Medical pages

A disease page lives at the same slug in all four locales:

- `src/content/docs/diseases/...` (Traditional Chinese, default)
- `src/content/docs/en/diseases/...`
- `src/content/docs/zh-cn/diseases/...`
- `src/content/docs/ja/diseases/...`

Start from `templates/disease.md`. The evidence rules are in [docs/EVIDENCE-POLICY.md](docs/EVIDENCE-POLICY.md), with a short Traditional Chinese version at [docs/EVIDENCE-POLICY.zh-TW.md](docs/EVIDENCE-POLICY.zh-TW.md). The drafting and checking steps are in [docs/VERIFICATION-WORKFLOW.md](docs/VERIFICATION-WORKFLOW.md).

Required frontmatter:

- `title`
- `en` (English name, on every locale)
- `status`: `draft`, `literature-checked`, or `vet-reviewed`
- `reviewed_by` (empty string until a listed reviewer signs the page)
- `last_updated`: `YYYY-MM-DD`
- `last_verified`: `YYYY-MM-DD`, the date the claims were checked against the cited passages
- `urgency`: `emergency`, `soon`, or `monitor`
- `sources`: objects with `id`, `title`, `authors` (people or organization), `year`, `tier` (1, 2, or 3), and a `url` or `doi`

In the body, a medical claim uses `[^source-id|locator]`. The locator is the section heading, page, table, or figure. The site renders numbered notes and the reference list. Do not hand-write the list.

Tier 1 is a consensus guideline from ISFM, iCatCare, AAFP, IRIS, ABCD, WSAVA, or ACVIM. Tier 2 is a peer-reviewed paper or review. Tier 3 is a textbook or reference site and may only accompany a tier 1 or tier 2 citation. A claim supported only by tier 3 is rejected.

Keep the same section order as the template. A `draft` may contain headings only. `literature-checked` and `vet-reviewed` need a citation on every medical paragraph and list item.

Write from the sources you have read. Do not copy or closely paraphrase the Merck Veterinary Manual, WikiVet, PetQA, or any NC or ND text or image. A link to a Merck Veterinary Manual chapter is allowed only as further reading, inside a `nonclaim` block, with a sentence saying the page was not written from that manual.

Do not add doses, dosing intervals, or course lengths. Naming a drug class or a drug that guidelines discuss is allowed. Telling an owner how much to give is not.

Where the evidence is thin, use `:::evidence-limited` and cite the passage. Delete a sentence the source does not support. Do not soften it.

Traditional Chinese should be plain and precise. Do not use emoji or internet jargon.

## Review status

1. `draft`: outline only. The page shows a draft notice. It is not a care guide.
2. `literature-checked`: the author has read the cited sources and written the page from them. No veterinarian has reviewed it. Say that in the page if it is not already clear from the badge.
3. `vet-reviewed`: a person listed in `REVIEWERS.md` has reviewed that version. Put their name in `reviewed_by`. If the text changes after review, move the status back to `literature-checked` until they review the new version.

Do not set `vet-reviewed` for yourself.

## First-time owner guide

Pages under `src/content/docs/guide/` follow the same citation rules as a disease page: `status`, `sources`, `last_updated`, `last_verified`, and a `[^source-id|locator]` marker on every factual paragraph and list item. The section index is a list of links and is not a cited medical page. Guide pages do not use the disease `urgency` field unless a page is specifically about when to seek care.

## Other changes

Bug fixes, translation corrections, and new sources are welcome. Open an issue for a new disease, a content error, or a source update before a large page, so the scope stays clear.

`npm test` runs the checker fixtures. `npm run check:content` checks frontmatter, citation markers, tiers, and that every default-locale page exists in the other three languages. `npm run build` must pass.

## 貢獻說明（繁體中文）

疾病頁的每項醫學陳述都要用 `[^來源id|位置]` 指到 frontmatter 裡的來源，以及該文獻的章節、頁碼、表或圖。來源要有等級。第 3 級不能單獨支持任何陳述。

`last_verified` 是對過原文的日期。已查文獻不是獸醫已審。獸醫已審必須是 `REVIEWERS.md` 名單上的人，而且事後改過正文就要退回已查文獻。

證據不足時用 `:::evidence-limited`。來源沒說的句子要刪掉，不要改成含糊的話。不要寫劑量、給藥間隔或療程長度。不要複製或改寫默沙東獸醫手冊、WikiVet、PetQA，或其他 NC、ND 內容。四種語言的相同路徑都要有頁面。
