# Cat Care Handbook

An open, static handbook for cat owners. It explains common diseases, when to see a veterinarian urgently, what tests and treatments are for, and what home care can and cannot do.

It is not a diagnosis tool. It does not give prescription doses. Every page says that it does not replace a veterinarian.

The site is [Astro Starlight](https://starlight.astro.build/), in four languages:

- Traditional Chinese (default, no URL prefix)
- English (`/en/`)
- Simplified Chinese (`/zh-cn/`)
- Japanese (`/ja/`)

Diseases are grouped by body system. Eight disease pages are literature-checked. A first-time cat owner guide, also literature-checked, sits in the sidebar and on the home page.

## Licenses

- Code: [MIT](LICENSE)
- Educational text: [CC BY-SA 4.0](LICENSE-CONTENT)

Text is written from primary guidelines and papers (ISFM, AAFP, WSAVA, IRIS, ABCD, JFMS, JAVMA). Each medical claim on a finished page cites a source and a locator. Tiers and the checker are described in [docs/EVIDENCE-POLICY.md](docs/EVIDENCE-POLICY.md). Text is not copied from the Merck Veterinary Manual, WikiVet, or PetQA.

## Develop

```bash
npm ci
npm run check:content
npm run build
npm run preview
```

Node.js 22 or newer. The site base path is `/cat-care-handbook`.

Search is built with the production build. `npm run dev` shows the search control, and the index is available after `npm run build` and `npm run preview`.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` deploys `dist/` to GitHub Pages on pushes to `main`.

After the first successful run, enable Pages if it is not already on:

**Settings → Pages → Build and deployment → Source: GitHub Actions**

The public URL is:

https://ammyhanss.github.io/cat-care-handbook/

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Veterinary reviewers are listed in [REVIEWERS.md](REVIEWERS.md). The disease template is [templates/disease.md](templates/disease.md).

## 繁體中文

這是給飼主看的貓咪常見病手冊，不是診斷工具，也不提供處方劑量。預設語言是繁體中文，另有英文、簡體中文和日文。

程式碼為 MIT，內文為 CC BY-SA 4.0。疾病頁的每項醫學陳述都要附來源與位置。審核狀態分草稿、已查文獻、獸醫已審。已查文獻不是獸醫已審。

部署到 GitHub Pages 後的網址是 https://ammyhanss.github.io/cat-care-handbook/ 。若網站還沒出現，請到倉庫 Settings → Pages，把 Source 設成 GitHub Actions。
