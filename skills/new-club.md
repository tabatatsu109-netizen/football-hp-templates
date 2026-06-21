# new-club — 新クラブ展開手順

ユーザーが「新しいチームのホームページを作りたい」と言ったとき、この手順で進める。

---

## Step 1: ヒアリング（AskUserQuestion を使う）

**必須（空欄不可）**

| 項目 | 質問文 | 例 |
|------|--------|-----|
| クラブ正式名称 | クラブの正式名称は？ | FC ベルガ |
| 略称 (英字) | 略称を英字で教えてください | BERGA |
| メインカラー | メインカラーの16進数コードは？ | #1a5c2d |
| サブカラー | サブカラーの16進数コードは？ | #f0c000 |

**任意（「後で変更できます」と伝えてスキップ可）**

| 項目 | デフォルト |
|------|-----------|
| キャッチコピー | "{クラブ名}とともに、前へ。" |
| プラン | light-01（ライト） |
| Instagram URL | 空欄 |
| LINE URL | 空欄 |
| 住所・電話・メール | 空欄 |
| 設立年 | 空欄 |

**プラン選択肢:**
- `light-01` — シンプル・低コスト（デフォルト）
- `standard-01` — ニュース・試合結果・チーム紹介
- `premium-01` — スクール・スポンサー枠など全機能

---

## Step 2: スクリプト実行

収集した情報を JSON にまとめて実行する。

```bash
node scripts/new-club.mjs '<JSON>'
```

**JSON 例:**
```json
{
  "name": "FC ベルガ",
  "shortName": "BERGA",
  "mainColor": "#1a5c2d",
  "subColor": "#f0c000",
  "heroTitle": "ベルガとともに、前へ。",
  "plan": "light-01",
  "instagram": "https://www.instagram.com/fc_berga/"
}
```

**重要:** JSON は Write ツールで一時ファイルに書き出してから Bash で渡す（日本語の文字化け防止）。

---

## Step 3: 完了報告

スクリプトの出力 URL をそのままユーザーに伝える:

- **ホームページ:** `http://localhost:3000/deployments/{slug}/`
- **Match Planner:** `http://localhost:3000/deployments/{slug}-match-planner/`

サーバーが起動していない場合は先に起動する:
```bash
npx serve . --listen 3000
```

---

## 生成されるフォルダ構成

```
deployments/
  {slug}/                    ← ホームページ
    index.html
    config/club-config.json  ← 自動設定済み
    js/
    assets/
  {slug}-match-planner/      ← Match Planner（BIN_ID 設定済み）
    index.html
    script.js
    style.css
```

---

## 注意事項

- スラッグ (フォルダ名) は `shortName` を小文字・ハイフン区切りに変換して自動生成
- 同名フォルダが既に存在する場合はエラーになる（重複防止）
- JSONBin は自動で新規作成される（既存クラブと完全に分離）
- `apiKey` は省略可能（デフォルトのマスターキーを使用）
