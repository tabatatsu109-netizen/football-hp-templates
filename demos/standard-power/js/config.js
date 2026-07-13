// ★ クラブごとに変更するファイル（スタンダードプラン） ★
// Firebase の公開読み取りを使うため、シークレットは不要。
// ※ SAMPLE FC は営業デモ用の架空クラブ。写真・ロゴは GRANDE の素材を借用（許諾済み）。

const HP_CONFIG = {
  clubName:     'SAMPLE FC',
  clubNameFull: 'SAMPLE FOOTBALL CLUB',
  firebaseUrl:  'https://hp-1-d7bce-default-rtdb.asia-southeast1.firebasedatabase.app',
  clubId:       'sample-fc',   // ライト版サンプルとデータ共有（同じMatch Plannerのデモデータが表示される）

  primaryColor: '#c8102e',   // クリムゾンレッド
  accentColor:  '#e6e6eb',   // シルバーホワイト
  logoUrl:      'img/logo.png',

  categories: ['U15', 'U12'],

  contactEmail: 'info@sample-fc.example.jp',     // 架空（デモ用）
  contactLine:  '',
  instagram:    'sample_fc_official',            // 架空（デモ用）
  twitter:      '',
  joinUrl:      'https://forms.gle/sample-demo', // 架空（デモ用）
  joinLabel:    '無料体験に申し込む',

  heroImage:    'img/hero.jpg',
  heroImageSub: 'img/photo1.jpg',

  heroTitle: 'その一歩が、<br>未来を変える。',
  heroSub:   'SAMPLE FOOTBALL CLUB — U15 / U12　サッカーで、人を育てる。',

  // ===== テーマ（参考: アルバルク東京 — 黒基調×レッド、シャープで力強い） =====
  theme: {
    baseMode:    'dark',      // 黒基調
    fontHeading: 'Oswald',
    fontBody:    'Noto Sans JP',
    radius:      '2px',       // シャープな角
  },
};
