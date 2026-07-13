// ★ クラブごとに変更するファイル（ライトプラン） ★
// Firebase の公開読み取りを使うため、シークレットは不要。
// ※ SAMPLE FC は営業デモ用の架空クラブ。写真・ロゴは GRANDE の素材を借用（許諾済み）。

const HP_CONFIG = {
  // ===== 基本情報 =====
  clubName:     'SAMPLE FC',
  clubNameFull: 'SAMPLE FOOTBALL CLUB',
  firebaseUrl:  'https://hp-1-d7bce-default-rtdb.asia-southeast1.firebasedatabase.app',
  clubId:       'sample-fc',
  logoUrl:      'img/logo.png',
  categories:   ['U15', 'U12'],

  // ===== 連絡・SNS =====
  contactEmail: 'info@sample-fc.example.jp',   // 架空（デモ用）
  contactLine:  '',
  instagram:    'sample_fc_official',          // 架空（デモ用）
  twitter:      '',
  youtube:      '',
  joinUrl:      'https://forms.gle/sample-demo', // 架空（デモ用）
  joinLabel:    '無料体験に申し込む',

  // ===== ヒーロー =====
  heroTitle: 'その一歩が、<br>未来を変える。',
  heroSub:   'SAMPLE FOOTBALL CLUB — U15 / U12　サッカーで、人を育てる。',
  heroImage: 'img/hero.jpg',

  // ===== テーマ（参考: アルバルク東京 — 黒基調×レッド、シャープで力強い） =====
  theme: {
    primaryColor: '#c8102e',   // クリムゾンレッド
    accentColor:  '#e6e6eb',   // シルバーホワイト
    baseMode:     'dark',      // 黒基調
    fontHeading:  'Oswald',    // コンデンス系英字
    fontBody:     'Noto Sans JP',
    heroStyle:    'photo-full',
    radius:       '2px',       // シャープな角
  },

  // ===== 選べるコンテンツ（最大8つ・表示順） =====
  sections: ['about', 'philosophy', 'categories', 'staff', 'join', 'fee', 'gallery', 'access'],

  // ===== 各セクションの中身 =====
  content: {
    about: {
      title: 'クラブ紹介',
      body: 'SAMPLE FCは、サンプル市を拠点に活動するジュニア・ジュニアユースのサッカークラブです。2012年の創設以来、「サッカーを通じた人間形成」を軸に、市内外から集まる約80名の選手とともに歩んできました。\n\n勝敗だけを追いかけるのではなく、自ら考え、仲間を尊重し、最後までやり抜く力を育てること。それが私たちのクラブづくりの原点です。グラウンドで流した汗のぶんだけ、選手は強く、優しくなれると信じています。',
      image: 'img/about.jpg',
    },
    philosophy: {
      title: 'クラブ理念',
      pillars: [
        { no: '01', title: '楽しむ — ENJOY', body: 'サッカーの原点は「楽しい」という気持ち。夢中になれるから、うまくなれる。どのカテゴリーでも、ボールを追いかける喜びを最優先にします。' },
        { no: '02', title: '挑む — CHALLENGE', body: 'ミスを恐れず、常にチャレンジする。失敗は成長の材料です。試合でも練習でも、「挑戦した選手」を最も評価します。' },
        { no: '03', title: '敬う — RESPECT', body: '仲間、相手、審判、グラウンド、支えてくれる家族。サッカーに関わるすべてへのリスペクトを、プレーと行動で示せる選手を育てます。' },
      ],
    },
    categories: {
      title: '活動カテゴリー',
      items: [
        { name: 'ジュニアユース（U15）', target: '中学1〜3年生', desc: '県リーグ・クラブユース選手権に参戦。個の技術と判断力を磨き、高校年代で活躍できる選手を育成します。', schedule: '火・水・金 19:00〜21:00／土日 試合・練習' },
        { name: 'ジュニア（U12）', target: '小学3〜6年生', desc: '全員出場を基本方針に、たくさんボールに触れる環境を用意。市リーグ・各種カップ戦に出場しています。', schedule: '水・金 17:30〜19:00／土日 試合・練習' },
        { name: 'キッズスクール', target: '年中〜小学2年生', desc: 'ボール遊びからはじめる入門クラス。運動神経の土台をつくるコーディネーショントレーニングが中心です。', schedule: '水 16:30〜17:30' },
      ],
    },
    staff: {
      title: 'スタッフ紹介',
      members: [
        { name: '見本 太郎', role: '代表 / U15監督', comment: '元Jリーグアカデミーコーチ。JFA公認B級ライセンス。「サッカーが好き」を一生モノにする指導がモットーです。', photo: '' },
        { name: '試作 次郎', role: 'U12監督', comment: 'JFA公認C級ライセンス・キッズリーダー。子どもたちの「できた！」の瞬間に立ち会うことが何よりのやりがいです。', photo: '' },
        { name: '仮井 三郎', role: 'GKコーチ / スクール担当', comment: '元社会人リーグGK。ゴールを守る楽しさと、最後尾からチームを動かす面白さを伝えます。', photo: '' },
      ],
    },
    join: {
      title: '入会案内・選手募集',
      body: 'SAMPLE FCでは全カテゴリーで新入会員を募集しています。体験練習は何回でも無料。レベルや経験は問いません。まずはグラウンドで、一緒にボールを蹴ってみませんか？',
      steps: [
        '体験申込フォームから連絡',
        '体験練習に参加（無料・複数回OK）',
        '入会手続きをして活動スタート',
      ],
    },
    fee: {
      title: '会費',
      note: '※ ユニフォーム・遠征費は別途。兄弟入会の場合、2人目以降の月会費は半額になります。金額はデモ用のサンプルです。',
      rows: [
        { label: '入会金（全カテゴリー共通）', value: '5,000円' },
        { label: '月会費：ジュニアユース（U15）', value: '8,000円' },
        { label: '月会費：ジュニア（U12）', value: '6,000円' },
        { label: '月会費：キッズスクール', value: '3,000円' },
        { label: '年間登録費・保険料', value: '6,000円 / 年' },
      ],
    },
    gallery: {
      title: 'ギャラリー',
      images: [
        'img/photo1.jpg',
        'img/photo2.jpg',
        'img/photo3.jpg',
        'img/photo4.jpg',
        'img/photo5.jpg',
        'img/photo6.jpg',
      ],
    },
    access: {
      title: 'アクセス',
      venues: [
        { name: 'サンプル市総合運動公園 多目的グラウンド', address: 'サンプル県サンプル市中央1-2-3', note: '人工芝・ナイター設備・駐車場100台', mapUrl: '' },
        { name: 'サンプル河川敷グラウンド', address: 'サンプル県サンプル市川原町4-5', note: '土日の練習・試合で使用', mapUrl: '' },
      ],
    },
    contact: {
      title: 'お問い合わせ',
      body: 'お気軽にお問い合わせください。',
    },
    faq: { title: 'よくある質問', items: [] },
    sponsors: { title: 'スポンサー', items: [] },
    careers: { title: '卒団生の進路', items: [] },
    sns: { title: 'SNS', body: '日々の活動はSNSで発信しています。' },
    videos: { title: '動画', items: [] },
    policy: { title: '指導方針', items: [] },
  },
};
