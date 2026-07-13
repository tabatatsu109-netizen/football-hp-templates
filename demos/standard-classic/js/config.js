// ★ クラブごとに変更するファイル（スタンダードプラン・デザイン③名門・伝統系） ★
// Firebase の公開読み取りを使うため、シークレットは不要。
// ※ SAMPLE FC は営業デモ用の架空クラブ。写真・ロゴは GRANDE の素材を借用（許諾済み）。

const HP_CONFIG = {
  clubName:     'SAMPLE FC',
  clubNameFull: 'SAMPLE FOOTBALL CLUB',
  firebaseUrl:  'https://hp-1-d7bce-default-rtdb.asia-southeast1.firebasedatabase.app',
  clubId:       'sample-fc',   // 他のサンプルとデータ共有

  primaryColor: '#12305b',   // ディープネイビー
  accentColor:  '#c9a227',   // ゴールド
  logoUrl:      'img/logo.png',

  categories: ['U15', 'U12'],

  contactEmail: 'info@sample-fc.example.jp',     // 架空（デモ用）
  contactLine:  '',
  instagram:    'sample_fc_official',            // 架空（デモ用）
  twitter:      '',
  joinUrl:      'https://forms.gle/sample-demo', // 架空（デモ用）
  joinLabel:    '無料体験に申し込む',

  heroImage:    'img/photo4.jpg',
  heroImageSub: 'img/photo5.jpg',

  heroTitle: 'その一歩が、<br>未来を変える。',
  heroSub:   'SAMPLE FOOTBALL CLUB — U15 / U12　サッカーで、人を育てる。',

  // ===== テーマ（デザイン③: 名門・伝統系 — ネイビー×ゴールド、セリフ体で格式ある印象） =====
  theme: {
    baseMode:    'light',              // クリーム基調（テンプレート既定の生成り背景を活かす）
    fontHeading: 'Playfair Display',   // クラシックなセリフ英字
    fontBody:    'Noto Serif JP',      // 明朝系（伝統・信頼感）
    radius:      '4px',                // 控えめな角丸
  },
};
