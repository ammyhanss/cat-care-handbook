# Contributing

The Cat Care Handbook is owner education. It is not a diagnosis tool and it does not give prescription doses.

Code is MIT. Educational text is CC BY-SA 4.0. See `LICENSE` and `LICENSE-CONTENT`.

## Medical pages

A disease page lives at the same slug in all four locales:

- `src/content/docs/diseases/...` (Traditional Chinese, default)
- `src/content/docs/en/diseases/...`
- `src/content/docs/zh-cn/diseases/...`
- `src/content/docs/ja/diseases/...`

Start from `templates/disease.md`. Required frontmatter:

- `title`
- `en` (English name, on every locale)
- `status`: `draft`, `literature-checked`, or `vet-reviewed`
- `reviewed_by` (empty string until a listed reviewer signs the page)
- `last_updated`: `YYYY-MM-DD`
- `urgency`: `emergency`, `soon`, or `monitor`
- `sources`: a non-empty list of citations a reader can check

Keep the same section order as the template. A `draft` may contain headings only. `literature-checked` and `vet-reviewed` need a full original text, and the body must include the source links from the frontmatter.

Write from primary sources: ISFM, AAFP, WSAVA, IRIS, and ABCD guidelines, and papers in journals such as the Journal of Feline Medicine and Surgery and JAVMA. Do not copy or closely paraphrase the Merck Veterinary Manual, WikiVet, PetQA, or any NC or ND text or image. A link to a Merck Veterinary Manual chapter is allowed only as further reading, with a sentence saying the page was not written from that manual.

Do not add doses, dosing intervals, or course lengths. Naming a drug class or a drug that guidelines discuss is allowed. Telling an owner how much to give is not.

Traditional Chinese should be plain and precise. Do not use emoji or internet jargon.

## Review status

1. `draft`: outline only. The page shows a draft notice. It is not a care guide.
2. `literature-checked`: the author has read the cited sources and written the page from them. No veterinarian has reviewed it. Say that in the page if it is not already clear from the badge.
3. `vet-reviewed`: a person listed in `REVIEWERS.md` has reviewed that version. Put their name in `reviewed_by`. If the text changes after review, move the status back to `literature-checked` until they review the new version.

Do not set `vet-reviewed` for yourself.

## Other changes

Bug fixes, translation corrections, and new sources are welcome. Open an issue for a new disease, a content error, or a source update before a large page, so the scope stays clear.

`npm run check:content` checks that every disease page has the required frontmatter and that every default-locale page exists in the other three languages. `npm run build` must pass.

## 貢獻說明（繁體中文）

疾病頁要附上讀者能核對的文獻。狀態只有草稿、已查文獻、獸醫已審。獸醫已審必須是 `REVIEWERS.md` 名單上的人，而且事後改過正文就要退回已查文獻。

不要寫劑量、給藥間隔或療程長度。不要複製或改寫默沙東獸醫手冊、WikiVet、PetQA，或其他 NC、ND 內容。四種語言的相同路徑都要有頁面，持續整合會檢查這一點。
