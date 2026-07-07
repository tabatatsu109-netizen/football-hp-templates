// ★ アイテムショップ設定ファイル（八ヶ岳グランデFC）★
// 管理者キー（Firebaseシークレット）はこのファイルに書かない。
// 管理者ページのログイン画面で入力 → 端末のLocalStorageに保存される。

var SHOP_CONFIG = {
  clubName:     'GRANDE FC',
  clubNameFull: '八ヶ岳グランデFC',
  clubId:       'grande',
  firebaseUrl:  'https://hp-1-d7bce-default-rtdb.asia-southeast1.firebasedatabase.app',

  // カラー（旧ショップ＝グランデ緑×金を継承）
  colors: {
    primary:     '#1a6b2f',
    primaryDark: '#145224',
    deep:        '#0d3b1e',
    accent:      '#c8a94a',
    bg:          '#f2f5f2'
  },

  // 注文フォームの「チーム」選択肢
  teams: ['ジュニア（U-12）', 'ジュニアユース（U-15）', 'スクール'],

  // 支払方法の選択肢
  payMethods: ['現金払い', '銀行振込', 'PayPay'],

  // 商品カテゴリー（フィルタボタン）
  productCats: ['すべて', 'ユニフォーム', 'トップス', 'ボトムス', 'ソックス', 'バッグ', 'セットアップ', 'アウター', 'その他'],

  // 受付ルール等のお知らせ帯（商品一覧の上に表示。<br>使用可。不要なら ''）
  notice: 'アイテムの発注は<b>年2回（4月・10月）</b>にまとめて行い、納品まで約1ヶ月かかります。<br>※ <b>プラクティスシャツ・ソックス・短パンは通年でご注文いただけます</b>。',

  // 商品リスト（旧ショップから移植・35点）
  // img: 商品写真のパス（例 'assets/item01.jpg'）。省略時はカテゴリーアイコン表示
  products: [
    { id: 1,  name: 'ユニフォーム（緑）', brand: 'ATHLETA', desc: '公式戦の際に必要。1〜3年生はプラユニでも可。', price: 8600, cat: 'ユニフォーム', sizes: ['130','140','150','160','S','M','L','O','XO'], reqJ: true, reqJU: true },
    { id: 2,  name: 'ユニフォーム（白）', brand: 'ATHLETA', desc: '公式戦の際に必要。1〜3年生はプラユニでも可。', price: 8600, cat: 'ユニフォーム', sizes: ['130','140','150','160','S','M','L','O','XO'], reqJ: true, reqJU: true },
    { id: 19, name: 'GKユニフォーム（赤）', brand: 'ATHLETA', desc: 'GKの選手専用。公式戦の際に必要。（1〜3年生はプラユニでも可）', price: 8600, cat: 'ユニフォーム', sizes: ['150','160','S','M','L','O','XO'], reqJ: true, reqJU: true },
    { id: 20, name: 'GKユニフォーム（黄）', brand: 'ATHLETA', desc: 'GKの選手専用。公式戦の際に必要。（1〜3年生はプラユニでも可）', price: 8600, cat: 'ユニフォーム', sizes: ['150','160','S','M','L','O','XO'], reqJ: true, reqJU: true },
    { id: 3,  name: 'プラクティスシャツ（白）', brand: 'ATHLETA', desc: '練習時や試合前のアップ時に着用できます。', price: 4800, cat: 'トップス', sizes: ['S','M','L','O','XO'], reqJ: false, reqJU: true },
    { id: 21, name: 'プラクティスシャツ（白）130〜160cm', brand: 'ATHLETA', desc: '練習時や試合前のアップ時に着用できます。', price: 4600, cat: 'トップス', sizes: ['130','140','150','160'], reqJ: true, reqJU: false },
    { id: 4,  name: 'ゲームパンツ（白）', brand: 'ATHLETA', desc: '公式戦・練習時に使用。', price: 5200, cat: 'ボトムス', sizes: ['130','140','150','160','S','M','L','O','XO'], reqJ: true, reqJU: true },
    { id: 22, name: 'ゲームパンツ（緑）', brand: 'ATHLETA', desc: '公式戦・練習時に使用。', price: 5200, cat: 'ボトムス', sizes: ['130','140','150','160','S','M','L','O','XO'], reqJ: true, reqJU: true },
    { id: 23, name: 'ゲームパンツ（赤）', brand: 'ATHLETA', desc: '※GKの選手のみ。GKゲームパンツはパット付きとなります。', price: 5400, cat: 'ボトムス', sizes: ['130','140','150','160','S','M','L','O','XO'], reqJ: true, reqJU: true },
    { id: 24, name: 'ゲームパンツ（黄）', brand: 'ATHLETA', desc: '※GKの選手のみ。GKゲームパンツはパット付きとなります。', price: 5400, cat: 'ボトムス', sizes: ['130','140','150','160','S','M','L','O','XO'], reqJ: true, reqJU: true },
    { id: 5,  name: 'ソックス（緑）', brand: 'ATHLETA', desc: '', price: 1800, cat: 'ソックス', sizes: ['19-21','22-24','25-27'], reqJ: true, reqJU: true },
    { id: 6,  name: 'ソックス（白）', brand: 'ATHLETA', desc: '', price: 1800, cat: 'ソックス', sizes: ['19-21','22-24','25-27'], reqJ: true, reqJU: true },
    { id: 7,  name: 'ソックス（赤）', brand: 'ATHLETA', desc: '※GKの選手のみ', price: 1800, cat: 'ソックス', sizes: ['19-21','22-24','25-27'], reqJ: true, reqJU: true },
    { id: 25, name: 'ソックス（黄）', brand: 'ATHLETA', desc: '※GKの選手のみ', price: 1800, cat: 'ソックス', sizes: ['19-21','22-24','25-27'], reqJ: true, reqJU: true },
    { id: 8,  name: 'リバーシブルビブス', brand: 'ATHLETA', desc: '', price: 2500, cat: 'その他', sizes: ['ジュニアサイズ','ジュニアユースサイズ'], reqJ: true, reqJU: true },
    { id: 9,  name: 'バックパック', brand: 'ATHLETA', desc: 'クラブマーク付き。練習・試合・遠征時に。', price: 9500, cat: 'バッグ', sizes: ['1個'], reqJ: true, reqJU: true },
    { id: 26, name: 'クラブジャージ上下', brand: 'ATHLETA', desc: '練習や試合、遠征等の移動時に着用できます。', price: 17980, cat: 'セットアップ', sizes: ['130','140','150','160','S','M','L','O','XO'], reqJ: true, reqJU: true },
    { id: 27, name: 'クラブハーフパンツ', brand: 'ATHLETA', desc: '練習や試合、遠征等の移動時に着用できます。', price: 5800, cat: 'ボトムス', sizes: ['130','140','150','160','S','M','L','O','XO'], reqJ: true, reqJU: true },
    { id: 10, name: 'ポロシャツ（ネイビー）', brand: 'ATHLETA', desc: '※ATHLETAではありません。カラー：ネイビー', price: 3500, cat: 'トップス', sizes: ['S','M','L','O','XO'], reqJ: false, reqJU: true },
    { id: 11, name: 'プラユニ（緑）', brand: 'ノーブランド', desc: '練習試合の際、ユニフォームとして着用できます。', price: 4000, cat: 'ユニフォーム', sizes: ['130','140','150','160','S','M','L','O','XO'], reqJ: false, reqJU: false },
    { id: 12, name: 'プラユニ（白）', brand: 'ノーブランド', desc: '練習試合の際、ユニフォームとして着用できます。', price: 4000, cat: 'ユニフォーム', sizes: ['130','140','150','160','S','M','L','O','XO'], reqJ: false, reqJU: false },
    { id: 13, name: 'プラユニ（赤）', brand: 'ノーブランド', desc: '練習試合・GK用。', price: 4000, cat: 'ユニフォーム', sizes: ['130','140','150','160','S','M','L','O','XO'], reqJ: false, reqJU: false },
    { id: 14, name: 'プラユニ（黄）', brand: 'ノーブランド', desc: '練習試合・GK用。', price: 4000, cat: 'ユニフォーム', sizes: ['130','140','150','160','S','M','L','O','XO'], reqJ: false, reqJU: false },
    { id: 15, name: '半袖プラクティスシャツ（白）', brand: 'ノーブランド', desc: '練習時や着替え等に。※公式戦はATHLETAをご着用ください。', price: 3200, cat: 'トップス', sizes: ['120','130','140','150','160','S','M','L','O','XO'], reqJ: false, reqJU: false },
    { id: 16, name: '長袖プラクティスシャツ（白）', brand: 'ノーブランド', desc: '練習時や着替え等に。※公式戦はATHLETAをご着用ください。', price: 3500, cat: 'トップス', sizes: ['S','M','L','O','XO'], reqJ: false, reqJU: false },
    { id: 17, name: 'スウェット上下', brand: 'ノーブランド', desc: '体育館練習や遠征先の部屋着等にも着用できます。', price: 6500, cat: 'セットアップ', sizes: ['S','M','L','O','XO'], reqJ: false, reqJU: false },
    { id: 18, name: 'パーカー（選手用）', brand: 'ノーブランド', desc: '合宿の部屋着や練習後の着替え等に着用できます。', price: 4500, cat: 'トップス', sizes: ['S','M','L','O','XO'], reqJ: false, reqJU: false },
    { id: 28, name: 'ハーフコート', brand: 'ATHLETA', desc: '', price: 15980, cat: 'アウター', sizes: ['130','140','150','160','S','M','L','O','XO'], reqJ: false, reqJU: false },
    { id: 29, name: 'ウィンドビステ上下', brand: 'ATHLETA', desc: '※希望者のみ。風を通さず雨水も染みにくいので、練習や試合前のアップに着用できます。', price: 15980, cat: 'アウター', sizes: ['130','140','150','160','S','M','L','O','XO'], reqJ: false, reqJU: false },
    { id: 30, name: '応援パーカー（保護者用）', brand: 'ノーブランド', desc: '', price: 4500, cat: 'トップス', sizes: ['S','M','L','O','XO'], reqJ: false, reqJU: false },
    { id: 31, name: '応援Tシャツ（保護者用）', brand: 'ノーブランド', desc: 'ポリエステル素材（プラユニと同様）', price: 3000, cat: 'トップス', sizes: ['120','130','140','150','S','M','L','O','XO'], reqJ: false, reqJU: false },
    { id: 32, name: '手袋', brand: 'ノーブランド', desc: '番号も入れられます。備考欄に番号をご入力ください。※保護者の方もご購入いただけます。', price: 2200, cat: 'その他', sizes: ['S','M','L'], reqJ: false, reqJU: false },
    { id: 33, name: 'ウェア＆シューズバッグ', brand: 'ノーブランド', desc: 'サイズ約280×380、ポリエステル', price: 800, cat: 'バッグ', sizes: ['1個','2個','3個'], reqJ: false, reqJU: false },
    { id: 34, name: 'タオルマフラー', brand: 'ノーブランド', desc: '※フェイスタオルではなく、タオルマフラーになります。応援やタオルとしても使えます。', price: 1200, cat: 'その他', sizes: ['1個','2個','3個'], reqJ: false, reqJU: false },
    { id: 35, name: 'NOF 旅Tシャツ（グランデ限定カラー）', brand: 'NOF', desc: '', price: 3000, cat: 'トップス', sizes: ['S','M','L','O'], reqJ: false, reqJU: false }
  ]
};