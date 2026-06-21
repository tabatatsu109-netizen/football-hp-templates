# design-rules — デザイン実装ルール（技術詳細）

## CSS 変数（:root に集約）

```css
:root {
  --main-color:   #1a3a5c;  /* ConfigLoader が club-config.json の値で上書き */
  --sub-color:    #e8b400;
  --accent-color: #e84040;
  --text:         #333;
  --bg:           #fff;
  --bg-light:     #f5f7fa;
  --border:       #e0e0e0;
}
```

## モバイルファーストの書き順

モバイルのスタイルをデフォルトに書き、`min-width` で上書きする。

```css
/* モバイル（デフォルト） */
.grid { grid-template-columns: 1fr; }

/* タブレット以上 */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

## 共通デザイン原則

| 項目 | 値 |
|------|----|
| フォント | `'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif` |
| 本文サイズ | `1rem` 以上 |
| 行間 | `1.7` 以上（保護者が読みやすいよう広め） |
| セクション余白 | `padding: 64px 20px` |
| 最大幅 | `max-width: 1100px` |
| カード影 | `box-shadow: 0 2px 8px rgba(0,0,0,0.06)` |
| カード角丸 | `border-radius: 8px` |
| セクションタイトル下線 | `background: var(--sub-color)` の帯（width: 40px, height: 3px） |

## Design A / B / C の方向性

| デザイン | 構成の特徴 |
|---------|----------|
| A | 余白広め・落ち着いた配色。テキスト中心で保護者向け |
| B | ヒーロー画像大・躍動感のあるレイアウト。スポーツらしさ重視 |
| C | カード型グリッド・情報密度高め。更新頻度の高いクラブ向け |

## チェック手順

1. Chrome DevTools で 375px（モバイル）の表示を確認
2. 768px（タブレット）・1100px（PC）でレイアウト崩れがないか確認
3. `club-config.json` のカラーを変えたとき CSS 変数が反映されているか確認
