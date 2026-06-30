/**
 * new-club.mjs  —  新クラブ自動セットアップスクリプト
 *
 * 使い方:
 *   node scripts/new-club.mjs '<JSON>'
 *
 * JSON フィールド（必須）:
 *   name        クラブ正式名称  例: "FC ベルガ"
 *   shortName   略称           例: "BERGA"
 *   mainColor   メインカラー   例: "#1a5c2d"
 *   subColor    サブカラー     例: "#f0c000"
 *
 * JSON フィールド（任意）:
 *   slug        フォルダ名     例: "fc-berga"  ※省略時は shortName から自動生成
 *   accentColor アクセント色  デフォルト: "#e84040"
 *   heroTitle   キャッチコピー デフォルト: "{name}とともに、前へ。"
 *   plan        テンプレート   デフォルト: "light-01"
 *   instagram / facebook / youtube / lineUrl / address / phone / email
 *   founded     設立年
 *   apiKey      JSONBin API Key（省略時はデフォルトキーを使用）
 */

import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function generatePhotoGuide(clubName, plan) {
  const isStandardOrAbove = !plan.startsWith('light');
  const isPremium = plan.startsWith('premium');

  let guide = `# 写真配置ガイド — ${clubName}\n\n`;
  guide += `写真をこのフォルダに入れると、ホームページに自動で反映されます。\n\n`;
  guide += `## 必須（まずここから）\n\n`;
  guide += `| ファイル名 | サイズ目安 | 説明 |\n`;
  guide += `|-----------|----------|------|\n`;
  guide += `| \`assets/logo.png\` | 200×200px以上、正方形 | クラブロゴ（PNG透過推奨） |\n`;
  guide += `| \`assets/hero.jpg\` | 1920×600px以上、横長 | トップページのメイン写真 |\n\n`;

  if (isStandardOrAbove) {
    guide += `## スタッフ写真（team.html に表示）\n\n`;
    guide += `\`assets/staff/\` フォルダに以下の名前で入れてください：\n\n`;
    guide += `- \`staff-01.jpg\` 〜 \`staff-06.jpg\`\n`;
    guide += `- 顔写真、正方形に近いもの（表示時に丸くトリミングされます）\n\n`;

    guide += `## 選手写真（team.html に表示）\n\n`;
    guide += `\`assets/players/\` フォルダに以下の名前で入れてください：\n\n`;
    guide += `- \`player-01.jpg\` 〜 \`player-30.jpg\`\n`;
    guide += `- ユニフォーム着用写真推奨\n\n`;

    guide += `## ニュース用写真\n\n`;
    guide += `\`assets/news/\` フォルダに自由な名前で追加できます。\n`;
    guide += `Match Planner からニュースを投稿するときに参照します。\n\n`;
  }

  if (isPremium) {
    guide += `## スポンサーロゴ\n\n`;
    guide += `\`assets/sponsors/\` フォルダに以下の名前で入れてください：\n\n`;
    guide += `- \`sponsor-01.png\` 〜 \`sponsor-06.png\`\n`;
    guide += `- 横長ロゴ画像（PNG透過推奨）\n\n`;

    guide += `## パートナーロゴ\n\n`;
    guide += `\`assets/partners/\` フォルダに以下の名前で入れてください：\n\n`;
    guide += `- \`partner-01.png\` 〜 \`partner-06.png\`\n\n`;
  }

  guide += `---\n\n`;
  guide += `写真を追加したら、ブラウザをリロードして確認してください。\n`;
  guide += `ファイル名が合っていれば自動で反映されます。\n`;

  return guide;
}

// ── 入力解析
if (!process.argv[2]) {
  console.error('使い方: node scripts/new-club.mjs <JSONファイルパス>');
  process.exit(1);
}

// ファイルパスまたは JSON 文字列を受け付ける
let input;
const arg = process.argv[2].trim();
if (arg.startsWith('{')) {
  input = JSON.parse(arg);
} else {
  input = JSON.parse(readFileSync(arg, 'utf8'));
}

const {
  name,
  shortName,
  mainColor   = '#1a3a5c',
  subColor    = '#e8b400',
  accentColor = '#e84040',
  heroTitle,
  instagram   = '',
  facebook    = '',
  youtube     = '',
  lineUrl     = '',
  address     = '',
  phone       = '',
  email       = '',
  plan        = 'light-01',
  founded,
  apiKey      = '$2a$10$xopawUKPa.2MV76.BGLZtehG8EauPnBwXLLyCgXqw/H5NfvD.yuOq',
} = input;

if (!name || !shortName || !mainColor || !subColor) {
  console.error('必須項目: name, shortName, mainColor, subColor');
  process.exit(1);
}

// slug: 指定があれば使う、なければ shortName から自動生成
const slug = (input.slug || shortName)
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]/g, '')
  .replace(/--+/g, '-')
  .replace(/^-|-$/g, '');

// ── テンプレート存在チェック
const srcTemplate = join(ROOT, 'templates', plan);
if (!existsSync(srcTemplate)) {
  console.error(`テンプレートが見つかりません: templates/${plan}/`);
  process.exit(1);
}

// ── 出力フォルダ重複チェック
const dstHomepage = join(ROOT, 'deployments', slug);
const dstMP       = join(ROOT, 'deployments', `${slug}-match-planner`);

if (existsSync(dstHomepage)) {
  console.error(`既に存在します: deployments/${slug}/`);
  console.error('別のスラッグを指定するか、既存フォルダを削除してください。');
  process.exit(1);
}

// ====================================================
// Step 1: JSONBin 作成
// ====================================================
console.log('\n🌐 Step 1/4: JSONBin を作成中...');

const binRes = await fetch('https://api.jsonbin.io/v3/b', {
  method:  'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Master-Key': apiKey,
    'X-Bin-Name':   slug,
    'X-Bin-Private': 'true',
  },
  body: JSON.stringify({ players: [], matches: [], posts: [] }),
});

if (!binRes.ok) {
  const errText = await binRes.text();
  console.error(`JSONBin 作成失敗 (${binRes.status}): ${errText}`);
  process.exit(1);
}

const binJson = await binRes.json();
const binId   = binJson.metadata.id;
console.log(`   ✅ Bin ID: ${binId}`);

// ====================================================
// Step 2: テンプレートをコピー
// ====================================================
console.log(`\n📁 Step 2/4: テンプレート (${plan}) をコピー中...`);

mkdirSync(join(ROOT, 'deployments'), { recursive: true });
cpSync(srcTemplate, dstHomepage, { recursive: true });
console.log(`   ✅ deployments/${slug}/`);

// 写真フォルダ構造を生成
const assetFolders = ['hero', 'logo'];
if (!plan.startsWith('light')) {
  assetFolders.push('staff', 'players', 'news');
}
if (plan.startsWith('premium')) {
  assetFolders.push('sponsors', 'partners');
}
for (const folder of assetFolders) {
  mkdirSync(join(dstHomepage, 'assets', folder), { recursive: true });
  writeFileSync(join(dstHomepage, 'assets', folder, '.gitkeep'), '');
}

const photoGuide = generatePhotoGuide(name, plan);
writeFileSync(join(dstHomepage, 'PHOTO_GUIDE.md'), photoGuide, 'utf8');
console.log(`   ✅ 写真フォルダ作成: ${assetFolders.map(f => `assets/${f}/`).join(', ')}`);

// ====================================================
// Step 3: club-config.json を生成・書き込み
// ====================================================
console.log('\n⚙️  Step 3/4: club-config.json を設定中...');

const config = {
  _meta: {
    version: '2.0',
    description: 'サッカークラブ ホームページ設定ファイル。このファイルを書き換えるだけで別クラブへ展開できます。',
  },
  club: {
    name,
    shortName,
    founded: founded || null,
    location: '',
    description: '',
  },
  design: { logo: '', favicon: '', mainColor, subColor, accentColor },
  pages: {
    home: {
      heroTitle:    heroTitle    || `${name}とともに、前へ。`,
      heroSubtitle: `${name} オフィシャルサイト`,
      heroImage: '',
    },
  },
  philosophy: { title: 'クラブフィロソフィー', text: '' },
  mission:    { title: '育成方針', text: '' },
  contact:    { address, phone, email },
  sns:        { instagram, facebook, youtube, lineUrl },
  matchPlanner:    { jsonbinBinId: binId, jsonbinApiKey: apiKey },
  integration:     { jsonbinBinId: binId, jsonbinApiKey: apiKey },
  newsIntegration: { jsonbinBinId: binId, jsonbinApiKey: apiKey },
  features: {
    showNews: true, showResults: true, showSchedule: true,
    showSponsors: false, showInstagram: !!instagram,
    showSchool: false, showStaff: false, showPartners: false,
  },
  sponsors: [], partners: [], school: null, staff: [], players: [],
};

writeFileSync(
  join(dstHomepage, 'config', 'club-config.json'),
  JSON.stringify(config, null, 2),
  'utf8',
);
console.log('   ✅ club-config.json 書き込み完了');

// ====================================================
// Step 4: Match Planner をコピー & BIN_ID を更新
// ====================================================
console.log('\n📱 Step 4/4: Match Planner をセットアップ中...');

const srcMP = join(ROOT, 'Match Planner');
if (!existsSync(srcMP)) {
  console.warn('   ⚠️  Match Planner フォルダが見つかりません。スキップします。');
} else {
  cpSync(srcMP, dstMP, { recursive: true });

  const scriptPath   = join(dstMP, 'script.js');
  let   scriptContent = readFileSync(scriptPath, 'utf8');

  scriptContent = scriptContent.replace(
    /const BIN_ID\s*=\s*'[^']*';/,
    `const BIN_ID  = '${binId}';`,
  );
  scriptContent = scriptContent.replace(
    /const API_KEY\s*=\s*'[^']*';/,
    `const API_KEY = '${apiKey}';`,
  );

  writeFileSync(scriptPath, scriptContent, 'utf8');
  console.log(`   ✅ deployments/${slug}-match-planner/`);
}

// ====================================================
// 完了レポート
// ====================================================
const line = '─'.repeat(52);
console.log(`\n🎉 ${name} のセットアップ完了！`);
console.log(line);
console.log(`  クラブ名      : ${name} (${shortName})`);
console.log(`  プラン        : ${plan}`);
console.log(`  JSONBin ID    : ${binId}`);
console.log(line);
console.log(`  ホームページ  : http://localhost:3000/deployments/${slug}/`);
console.log(`  Match Planner : http://localhost:3000/deployments/${slug}-match-planner/`);
console.log(line);
console.log(`  📷 写真ガイド  : deployments/${slug}/PHOTO_GUIDE.md`);
console.log(`  → logo.png と hero.jpg を入れると一気に本物らしくなります！`);
console.log(line);
