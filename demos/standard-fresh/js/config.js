// ★ クラブごとに変更するファイル（スタンダードプラン・デザイン②爽やか系） ★
// Firebase の公開読み取りを使うため、シークレットは不要。
// ※ SAMPLE FC は営業デモ用の架空クラブ。写真・ロゴは GRANDE の素材を借用（許諾済み）。

const HP_CONFIG = {
  clubName:     'SAMPLE FC',
  clubNameFull: 'SAMPLE FOOTBALL CLUB',
  firebaseUrl:  'https://hp-1-d7bce-default-rtdb.asia-southeast1.firebasedatabase.app',
  clubId:       'sample-fc',   // 他のサンプルとデータ共有

  primaryColor: '#0086cc',   // フレッシュブルー
  accentColor:  '#ffb703',   // サニーイエロー
  logoUrl:      'img/logo.png',

  categories: ['U15', 'U12'],

  contactEmail: 'info@sample-fc.example.jp',     // 架空（デモ用）
  contactLine:  '',
  instagram:    'sample_fc_official',            // 架空（デモ用）
  twitter:      '',
  joinUrl:      'https://forms.gle/sample-demo', // 架空（デモ用）
  joinLabel:    '無料体験に申し込む',

  heroImage:    'img/photo2.jpg',
  heroImageSub: 'img/photo3.jpg',

  heroTitle: 'その一歩が、<br>未来を変える。',
  heroSub:   'SAMPLE FOOTBALL CLUB — U15 / U12　サッカーで、人を育てる。',

  // ===== テーマ（デザイン②: 爽やか・親しみ系 — 白基調×ブルー、丸みのあるやさしい印象） =====
  theme: {
    baseMode:    'light',            // 白基調
    fontHeading: 'Montserrat',       // 丸みのあるモダン英字
    fontBody:    'Zen Maru Gothic',  // 丸ゴシック（親しみやすさ）
    radius:      '14px',             // しっかり丸め
  },
};
