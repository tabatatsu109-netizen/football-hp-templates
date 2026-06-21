# match-planner — Match Planner 連携（技術詳細）

## 仕組み

1. クラブスタッフが Match Planner（外部サービス）で試合情報を登録・更新する
2. Match Planner が JSONBin の指定 Bin へデータを書き込む
3. ホームページの `match-planner-connector.js` が Bin を読み込んで表示する

## connector の呼び出し方

```html
<script src="js/config-loader.js"></script>
<script src="js/match-planner-connector.js"></script>
<script>
  ConfigLoader.apply({
    onLoaded: function(c) {
      MatchPlannerConnector.init(c);
    }
  });
</script>
```

## 表示対象の DOM ID

| ID | 表示内容 |
|----|---------|
| `#schedule-list` | 直近の試合スケジュール |
| `#results-list` | 試合結果一覧 |

## Bin の設定場所

`club-config.json` の `matchPlanner` セクション。

```json
"matchPlanner": {
  "jsonbinBinId": "BinID",
  "jsonbinApiKey": "$2a$10$..."
}
```

## 注意事項

- `match-planner-connector.js` は `config-loader.js` の後に読み込む
- Bin のデータ構造を変更した場合は connector 側の読み取り処理も合わせて修正する
- APIキーは必ず Private リポジトリで管理する
