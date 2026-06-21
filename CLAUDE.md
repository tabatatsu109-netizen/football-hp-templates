# football-hp-templates

## 目的

サッカークラブ向けホームページを量産する。
`club-config.json` を書き換えるだけで別クラブへ展開できる体制を構築・維持する。

---

## 最重要ルール

| ルール | 内容 |
|--------|------|
| 既存機能を壊さない | 変更前に必ず影響範囲を確認する |
| スマホファースト | スマートフォンで見やすいことが最優先 |
| JSONBin 標準 | データ保存は JSONBin を使う（localStorage 禁止） |
| テンプレート方式 | HTML・CSS・JS は共通。設定ファイルだけ変える |
| 設定変更のみで展開 | 別クラブへの適用に開発作業は不要 |

---

## クラブ設定（別クラブ展開時に変更する項目）

`config/club-config.json` の以下の項目を書き換えるだけで展開できる。

| 項目 | 説明 |
|------|------|
| クラブ名 | 正式名称・略称 |
| ロゴ | ロゴ画像ファイル |
| メインカラー | ヘッダー・ボタンなどの主要色 |
| サブカラー | アクセント・下線などの補色 |
| キャッチコピー | トップページのヒーローテキスト |
| SNS | Instagram・Facebook・YouTube・LINE の URL |
| 連絡先 | 住所・電話番号・メールアドレス |

技術的な設定手順は [skills/club-template.md](skills/club-template.md) を参照。

---

## テンプレート

| プラン | フォルダ | 特徴 |
|--------|---------|------|
| ライト | `templates/light-01〜03` | シンプル構成。低コスト展開向け |
| スタンダード | `templates/standard-01〜03` | ニュース・試合結果・チーム紹介を標準装備 |
| プレミアム | `templates/premium-01〜03` | スクール・スポンサー枠など機能フル搭載 |

---

## デザイン

各プランに A・B・C の3デザインを用意する。

| デザイン | 方向性 |
|---------|--------|
| Design A | 王道・落ち着き。保護者が安心して読めるレイアウト |
| Design B | 躍動感・スポーツらしさを重視したダイナミックな構成 |
| Design C | ミニマル・シンプル。情報整理を優先した読みやすさ重視 |

デザイン実装ルールは [skills/design-rules.md](skills/design-rules.md) を参照。

---

## Match Planner 連携

試合スケジュール・結果を Match Planner（外部サービス）と自動同期する。
クラブスタッフが Match Planner を更新すると、ホームページへ即時反映される。

- データの受け渡しは JSONBin 経由
- BinID は `club-config.json` の `matchPlanner.jsonbinBinId` で管理
- 実装詳細は [skills/match-planner.md](skills/match-planner.md) を参照

---

## JSONBin ルール

- 本番データ（ニュース・試合情報）はすべて JSONBin に保存する
- BinID をコードに直書きしない（`club-config.json` 経由で取得する）
- APIキーを含む設定ファイルは **Private リポジトリ** で管理する
- 実装詳細は [skills/jsonbin-rules.md](skills/jsonbin-rules.md) を参照

---

## 新クラブ展開（自動セットアップ）

ユーザーが「新しいチームのホームページを作りたい」と言ったら、必ず [skills/new-club.md](skills/new-club.md) の手順に従う。

**流れ:**
1. AskUserQuestion でクラブ情報をヒアリング（名称・略称・カラー）
2. `node scripts/new-club.mjs '<JSON>'` を実行（JSONBin自動作成・テンプレートコピー・設定完了）
3. 生成された URL をユーザーに報告

生成先: `deployments/{slug}/`（HP）と `deployments/{slug}-match-planner/`（Match Planner）

---

## GitHub Pages 公開

各テンプレートフォルダをそのまま GitHub リポジトリに置き、GitHub Pages で公開する。

1. クラブごとに **Private リポジトリ** を作成する（APIキー保護のため）
2. `config/club-config.json` を書き換えてコミットする
3. GitHub Pages の設定で `main` ブランチのルートを公開する
4. 独自ドメインを設定する場合は `CNAME` ファイルを追加する
