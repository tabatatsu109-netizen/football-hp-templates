# standard-04 テンプレート

ダーク×レッドの本格デザインを持つジュニアユースサッカークラブ向けホームページテンプレートです。

## ファイル構成

```
standard-04/
├── index.html         # トップページ
├── news.html          # お知らせ一覧
├── results.html       # 試合・結果・スケジュール
├── team.html          # 選手プロフィール
├── contact.html       # お問い合わせ・体験申込・アクセス
├── config/
│   └── club-config.json   # ← クラブ設定（このファイルだけ変更する）
└── js/
    ├── config-loader.js           # 共通設定ローダー（変更不要）
    └── match-planner-connector.js # JSONBin連携・試合/ニュース表示
```

---

## 別クラブへの展開手順

### 1. `config/club-config.json` を書き換える

以下の項目を変更するだけで別クラブに展開できます。

| 項目 | パス | 例 |
|------|------|----|
| クラブ名 | `club.name` | `"FC ○○ U-15"` |
| 略称 | `club.abbreviation` | `"○○"` |
| 短縮名 | `club.shortName` | `"FC ○○"` |
| ロゴ画像 | `design.logo` | `"images/logo.png"` |
| メインカラー | `design.mainColor` | `"#e3001b"`（赤）|
| キャッチコピー | `hero.catchphrase` | `"FUTURE IS OURS."` |
| サブキャッチ（日本語）| `hero.catchphraseJa` | `"未来は自分の足で掴み取れ"` |
| 活動場所 | `hero.location` | `"KANAGAWA · YOKOHAMA"` |
| 連絡先 | `contact.*` | 住所・電話・メール・アクセス |
| SNS | `sns.*` | Instagram / Facebook / YouTube / LINE |
| カテゴリタブ | `matchCategories` | `["U-15","U-14","U-13"]` |
| 理念（3本柱）| `philosophy.pillars[]` | `no`, `title`, `body` |
| 体験スケジュール | `school.trials[]` | `date`, `day`, `target`, `time`, `place` |
| 選手データ | `players[]` | `number`, `name`, `position`, `grade`, `note` |

### 2. JSONBin を設定する

試合結果・お知らせは JSONBin に保存します。

1. [jsonbin.io](https://jsonbin.io) でアカウントを作成
2. Bin を2つ作成（試合用・ニュース用）
3. `club-config.json` に BinID と APIキーを設定

```json
"integration": {
  "jsonbinBinId": "★試合用BinのID★",
  "jsonbinApiKey": "★APIキー★"
},
"newsIntegration": {
  "jsonbinBinId": "★ニュース用BinのID★",
  "jsonbinApiKey": "★APIキー★"
}
```

#### 試合データのフォーマット（JSONBin に保存するデータ）

```json
{
  "matches": [
    {
      "date": "2026-06-01",
      "opponent": "対戦相手FC",
      "category": "U-15",
      "venue": "〇〇グラウンド",
      "status": "result",
      "result": { "myScore": 3, "opponentScore": 1 }
    },
    {
      "date": "2026-07-05",
      "opponent": "△△FC",
      "category": "U-14",
      "venue": "△△グラウンド",
      "status": "scheduled"
    }
  ]
}
```

#### ニュースデータのフォーマット

```json
{
  "news": [
    {
      "date": "2026-06-10",
      "cat": "お知らせ",
      "title": "7月体験会の参加者を募集します"
    }
  ]
}
```

---

## カラーカスタマイズ

`design.mainColor` を変更するとヘッダー・ボタン・アクセントカラーが一括変更されます。

ダーク背景（`#0a0a0c` など）はこのデザインの特徴のため変更非推奨です。  
変更する場合は `index.html` の `:root { --dark: ... }` を直接編集してください。

---

## Match Planner 連携

Match Planner が試合データを更新すると JSONBin 経由でホームページへ自動反映されます。

- BinID の設定: `club-config.json` の `matchPlanner.jsonbinBinId`
- 詳細: [skills/match-planner.md](../../skills/match-planner.md)

---

## カテゴリタブについて

`matchCategories` の配列がそのままタブになります。

```json
"matchCategories": ["U-15", "U-14", "U-13"]
```

チームが1カテゴリのみの場合はタブを非表示にしたい場合、`matchCategories` を `["U-15"]` のように1要素にすればタブが1つになります。

---

## GitHub Pages への公開

1. クラブ専用の **Private リポジトリ** を作成（APIキー保護のため）
2. `standard-04/` の中身をリポジトリのルートに配置
3. GitHub Pages → `main` ブランチのルートで公開
4. 独自ドメインの場合は `CNAME` ファイルを追加
