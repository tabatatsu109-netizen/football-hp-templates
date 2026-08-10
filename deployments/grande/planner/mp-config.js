// ★ Match Planner 設定ファイル ★
// firebaseSecret は各端末の「設定」画面から入力してください（このファイルには書かない）

const MP_CONFIG = {
  clubName:       'GRANDE',
  clubId:         'grande',
  firebaseUrl:    'https://hp-1-d7bce-default-rtdb.asia-southeast1.firebasedatabase.app',
  firebaseSecret: '',  // 設定画面から入力 → LocalStorage に保存される

  // 試合管理（フォーメーション・スタメン管理）はメニューから非表示
  // （false にすると復活します。結果登録はスケジュール起点で可能）
  hideMatchManagement: true,

  // グランデ食堂（食堂管理機能を有効化）
  shokudo: {
    name: 'グランデ食堂',
    price: 900,                          // 1食あたりの請求額（円）
    categories: ['U15', 'U14', 'U13'],   // 対象カテゴリー（ジュニアユース）
  },

  // グランデ大会マスター・クラブスタッツ（大会別/カテゴリー別集計・得点/アシストランキング）
  stats: { enabled: true },
};
