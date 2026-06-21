# club-template — クラブ展開手順（技術詳細）

## club-config.json の構造

```json
{
  "club": {
    "name": "FC グランデ サンプル",
    "shortName": "FCG",
    "founded": 2010,
    "location": "東京都渋谷区",
    "description": "クラブ紹介文"
  },
  "design": {
    "logo": "assets/logo.png",
    "favicon": "assets/favicon.ico",
    "mainColor": "#1a3a5c",
    "subColor": "#e8b400",
    "accentColor": "#e84040"
  },
  "pages": {
    "home": {
      "heroTitle": "情熱を、グラウンドへ。",
      "heroSubtitle": "FC グランデ サンプル オフィシャルサイト",
      "heroImage": "assets/hero.jpg"
    }
  },
  "contact": {
    "address": "〒150-0001 東京都渋谷区神宮前1-1-1",
    "phone": "03-1234-5678",
    "email": "info@example.com"
  },
  "sns": {
    "instagram": "https://www.instagram.com/...",
    "facebook": "https://www.facebook.com/...",
    "youtube": "https://www.youtube.com/@...",
    "lineUrl": "https://line.me/R/ti/p/@..."
  },
  "matchPlanner": {
    "jsonbinBinId": "BinIDをここに記載",
    "jsonbinApiKey": "$2a$10$..."
  },
  "newsIntegration": {
    "jsonbinBinId": "BinIDをここに記載",
    "jsonbinApiKey": "$2a$10$..."
  },
  "features": {
    "showNews": true,
    "showResults": true,
    "showSchedule": true,
    "showSponsors": false,
    "showInstagram": true,
    "showSchool": false,
    "showStaff": true,
    "showPartners": false
  }
}
```

## ConfigLoader の使い方

各HTMLページの `</body>` 直前に記述する。

```html
<script src="js/config-loader.js"></script>
<script>
  ConfigLoader.apply({
    pageTitle: 'ニュース',
    mappings: [
      { path: 'pages.home.heroTitle', selector: '#hero-title' },
    ],
    onLoaded: function(c) {
      // ページ固有の処理（JSONBin取得など）
    }
  });
</script>
```

## 自動反映される DOM 要素

| ID | 反映される値 |
|----|------------|
| `#club-logo` | `design.logo`（img src） |
| `#club-name` | `club.name` |
| `#footer-club-name` | `club.name` |
| `#footer-address` | `contact.address` |
| `#footer-phone` | `contact.phone` |
| `#footer-email` | `contact.email` |
| `#sns-instagram` | `sns.instagram`（href） |
| `#sns-facebook` | `sns.facebook`（href） |
| `#sns-youtube` | `sns.youtube`（href） |
| `#sns-line` | `sns.lineUrl`（href） |

CSS変数 `--main-color` / `--sub-color` / `--accent-color` も `:root` に自動反映される。

## 展開チェックリスト

- [ ] `club-config.json` のクラブ名・カラー・SNS・連絡先を書き換えた
- [ ] `assets/logo.png` と `assets/hero.jpg` を差し替えた
- [ ] JSONBin の BinID と APIキーを正しく設定した
- [ ] `features.*` フラグで不要セクションを非表示にした
- [ ] モバイル（375px）で表示を確認した
