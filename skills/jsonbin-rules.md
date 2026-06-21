# jsonbin-rules — JSONBin 実装ルール（技術詳細）

## 基本方針

- `localStorage` は使用禁止
- セッションを跨ぐデータはすべて JSONBin に保存する
- BinID をコード内に直書きしない — `club-config.json` から取得する
- APIキーを含む設定ファイルは Private リポジトリで管理する

## データ取得パターン

```javascript
ConfigLoader.apply({
  onLoaded: function(c) {
    var binId  = ConfigLoader.get(c, 'newsIntegration.jsonbinBinId');
    var apiKey = ConfigLoader.get(c, 'newsIntegration.jsonbinApiKey');

    fetch('https://api.jsonbin.io/v3/b/' + binId + '/latest', {
      headers: { 'X-Master-Key': apiKey }
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var items = data.record; // JSONBin に保存したデータ
      renderItems(items);
    });
  }
});
```

## データ更新パターン（PUT）

```javascript
fetch('https://api.jsonbin.io/v3/b/' + binId, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-Master-Key': apiKey
  },
  body: JSON.stringify(newData)
});
```

## club-config.json での Bin 管理

| キー | 用途 |
|------|------|
| `matchPlanner.jsonbinBinId` | 試合スケジュール・結果 |
| `newsIntegration.jsonbinBinId` | ニュース記事 |

複数 Bin を持つ場合は同じパターンでキーを追加する。
