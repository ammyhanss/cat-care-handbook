# 證據政策（繁體中文摘要）

完整英文規則在 [EVIDENCE-POLICY.md](EVIDENCE-POLICY.md)。這份是給撰寫者的短版。

本手冊是飼主教育。不做診斷，不寫劑量、給藥間隔或療程長度。

## 來源等級

- **第 1 級：** ISFM、International Cat Care（iCatCare）、AAFP、IRIS、ABCD、WSAVA 的共識指南，以及 ACVIM 共識聲明。可以單獨支持一項陳述。
- **第 2 級：** 同儕審查的論文與回顧，例如 JFMS、JAVMA、JVIM、Veterinary Clinics of North America。可以單獨支持一項陳述。AAHA 指南屬這一級。
- **第 3 級：** 獸醫教科書與參考網站，包括默沙東獸醫手冊、Cornell Feline Health Center、VCA。只能當補充連結，不能成為任何一項陳述的唯一依據。

## 怎麼引用

每個來源寫在 frontmatter 的 `sources`，包含 `id`、`title`、`authors`（人或機構）、`year`、`tier`，以及 `url` 或 `doi`。

正文用 `[^來源id|位置]`。直線 `|` 分開編號和位置。不用冒號，因為 Markdown 會把冒號讀成指令。位置是該文獻的章節標題、頁碼、表格或圖，用文獻本身的語言，這些英文文獻就用英文標題。頁末的編號文獻表由網站產生，不要手寫。

同一段若只有第 3 級來源，檢查會失敗。

## 日期與狀態

`last_updated` 是正文最後修改日。`last_verified` 是把陳述對過所引段落的日期。草稿沒有陳述時，`last_verified` 是來源紀錄最後核對的日期。

核對完成後狀態維持 `literature-checked`。不得寫成獸醫已審。`vet-reviewed` 只在 `REVIEWERS.md` 名單上的人審過該版之後使用。

## 證據不足與刪除

證據薄弱時，用 `:::evidence-limited`，不要改成含糊的句子。這個提示的標題會依語言顯示。提示裡的句子仍然要有引用。

來源沒有說的話就刪掉，不要改成來源同樣沒說的較弱說法。

持續整合會在已查文獻或獸醫已審的頁面，檢查：醫學段落有沒有引用、來源編號是否存在、來源是否有等級與網址或 DOI、是否只靠第 3 級、兩個日期是否存在。草稿可以沒有引用標記，但來源定義必須合法。
