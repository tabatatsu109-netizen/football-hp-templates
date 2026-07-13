// ホームページ共通ロジック — JSONBin 読み込み & レンダリング

const FIREBASE_URL = `${HP_CONFIG.firebaseUrl}/clubs/${HP_CONFIG.clubId}.json`;
let HP_DATA = { players: [], matches: [], schedules: [], posts: [], opponents: [] };
let visibleNews = [];    // 詳細モーダル用：直近描画したニュース
let visibleResults = []; // 詳細モーダル用：直近描画した試合結果

// ===== 初期化 =====
document.addEventListener('DOMContentLoaded', async () => {
  applyTheme();
  applyClubName();
  showSkeleton();
  try {
    await loadData();
    renderPage();
  } catch (e) {
    console.warn('データ取得失敗:', e);
    renderPage(); // 空データでもレイアウトは表示
  }
});

// ===== テーマ適用 =====
// 従来の primaryColor / accentColor に加え、HP_CONFIG.theme（任意）で
// 明暗・フォント・角丸を制御できる（参考サイトの雰囲気を再現するため）
function applyTheme() {
  const t = HP_CONFIG.theme || {};
  const r = document.documentElement.style;
  r.setProperty('--c-primary', t.primaryColor || HP_CONFIG.primaryColor || '#1a5c2a');
  r.setProperty('--c-accent',  t.accentColor  || HP_CONFIG.accentColor  || '#c9a227');
  if (t.radius) r.setProperty('--radius', t.radius);
  if (t.baseMode === 'dark') document.body.classList.add('mode-dark');

  // フォント指定があれば Google Fonts を動的読み込み（未指定は既定の Oswald / Noto Sans JP）
  const heading = t.fontHeading || 'Oswald';
  const body = t.fontBody || 'Noto Sans JP';
  if (t.fontHeading || t.fontBody) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(heading)}:wght@400;700&family=${encodeURIComponent(body)}:wght@400;500;700;900&display=swap`;
    document.head.appendChild(link);
  }
  r.setProperty('--font-heading', `'${heading}', sans-serif`);
  r.setProperty('--font-body', `'${body}', sans-serif`);
}

function applyClubName() {
  document.querySelectorAll('[data-club-name]').forEach(el => {
    el.textContent = HP_CONFIG.clubName;
  });
  document.querySelectorAll('[data-club-full]').forEach(el => {
    el.textContent = HP_CONFIG.clubNameFull;
  });
  // タイトルタグをクラブ名で上書き（テンプレートのハードコードを無効化）
  if (HP_CONFIG.clubName) {
    document.title = document.title.replace(/^.*?(?= — | 公式)/, HP_CONFIG.clubNameFull || HP_CONFIG.clubName);
  }
}

// ===== Firebase 読み込み =====
async function loadData() {
  const res = await fetch(FIREBASE_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const r = await res.json() || {};
  HP_DATA.players   = r.players   || [];
  HP_DATA.matches   = r.matches   || [];
  HP_DATA.schedules = r.schedules || [];
  HP_DATA.posts     = r.posts     || [];
  HP_DATA.opponents = r.opponents || [];
}

// ===== ページ判定してレンダリング振り分け =====
function renderPage() {
  hideSkeleton();
  const page = document.body.dataset.page || 'top';
  if (page === 'top')     renderTop();
  if (page === 'news')    renderNewsPage();
  if (page === 'matches') renderMatchesPage();
  if (page === 'players') renderPlayersPage();
}

// ===== ユーティリティ =====
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
function fmtDate(s) {
  if (!s) return '';
  const d = new Date(s + 'T00:00:00');
  const days = ['日','月','火','水','木','金','土'];
  return `${d.getMonth()+1}/${d.getDate()}（${days[d.getDay()]}）`;
}
function fmtDateLong(s) {
  if (!s) return '';
  const d = new Date(s + 'T00:00:00');
  const days = ['日','月','火','水','木','金','土'];
  return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日（${days[d.getDay()]}）`;
}
function daysUntil(s) {
  const today = new Date(); today.setHours(0,0,0,0);
  const target = new Date(s + 'T00:00:00');
  return Math.round((target - today) / 86400000);
}
function resultBadge(m) {
  const r = m.result;
  if (r?.myScore === undefined) return '';
  const my = Number(r.myScore), opp = Number(r.oppScore);
  if (my > opp)  return '<span class="result-badge win">WIN</span>';
  if (my < opp)  return '<span class="result-badge lose">LOSE</span>';
  return '<span class="result-badge draw">DRAW</span>';
}
// カテゴリー表記ゆれ吸収（Match Planner="U15" / 設定="U-15" のハイフン有無を無視して比較）
function normCat(s) { return String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }
function findOpponent(name) {
  return HP_DATA.opponents.find(o => o.name === name || o.shortName === name);
}
function emblemHtml(name, size = 40) {
  const opp = findOpponent(name);
  if (opp?.emblem) {
    return `<img src="${opp.emblem}" width="${size}" height="${size}" style="border-radius:50%;object-fit:cover" alt="${name}" onerror="this.replaceWith(initials('${(name||'?')[0]}', ${size}))">`;
  }
  return initialsHtml((name || '?')[0], size);
}
function initialsHtml(letter, size) {
  return `<span class="emblem-initial" style="width:${size}px;height:${size}px;font-size:${Math.round(size*0.4)}px">${letter}</span>`;
}

// ===== スケルトン =====
function showSkeleton() {
  document.querySelectorAll('.skeleton-wrap').forEach(el => el.classList.remove('loaded'));
}
function hideSkeleton() {
  document.querySelectorAll('.skeleton-wrap').forEach(el => el.classList.add('loaded'));
}

// ============================================================
// ===== TOP ページ レンダリング =====
// ============================================================
function renderTop() {
  renderHero();
  renderNextMatch();
  renderNewsSection();
  renderMatchSection();
  renderPlayersPreview();
  renderJoinCta();
}

// ---- HERO ----
function renderHero() {
  const el = document.getElementById('hero-title');
  if (el) el.innerHTML = HP_CONFIG.heroTitle || HP_CONFIG.clubName;
  const sub = document.getElementById('hero-sub');
  if (sub) sub.textContent = HP_CONFIG.heroSub || HP_CONFIG.clubNameFull;
  const logoEl = document.getElementById('hero-logo');
  if (logoEl) {
    logoEl.innerHTML = HP_CONFIG.logoUrl
      ? `<img src="${HP_CONFIG.logoUrl}" alt="${HP_CONFIG.clubName}">`
      : `<span class="hero-logo-initial">${HP_CONFIG.clubName[0]}</span>`;
  }
  const catsEl = document.getElementById('hero-cats');
  if (catsEl && HP_CONFIG.categories && HP_CONFIG.categories.length) {
    catsEl.innerHTML = HP_CONFIG.categories.map(c =>
      `<span class="hero-cat-badge">${c}</span>`
    ).join('');
  }
  // v3.0: ヒーロー写真（中央・右パネル）
  const center = document.querySelector('.hero-center');
  if (center && HP_CONFIG.heroImage) {
    center.style.backgroundImage = `url("${HP_CONFIG.heroImage}")`;
    center.classList.add('has-photo');
  }
  const right = document.querySelector('.hero-right');
  if (right && HP_CONFIG.heroImageSub) {
    right.style.backgroundImage = `url("${HP_CONFIG.heroImageSub}")`;
    right.classList.add('has-photo');
  }
}

// ---- NEXT MATCH ----
function renderNextMatch() {
  const el = document.getElementById('next-match');
  if (!el) return;
  const today = todayStr();
  const next = HP_DATA.schedules
    .filter(s => (s.type === '試合' || s.type === '大会') && s.date >= today)
    .sort((a, b) => a.date < b.date ? -1 : 1)[0];

  if (!next) {
    el.innerHTML = '<p class="no-data">試合予定はありません</p>';
    return;
  }
  const d = daysUntil(next.date);
  const dLabel = d === 0 ? '本日開催！' : d === 1 ? '明日開催' : `あと ${d} 日`;
  el.innerHTML = `
    <div class="next-match-card">
      <div class="next-match-countdown">${dLabel}</div>
      <div class="next-match-body">
        <div class="next-match-date">${fmtDateLong(next.date)}${next.time ? ' ' + next.time + ' KO' : ''}</div>
        <div class="next-match-vs">
          <div class="next-match-team home">
            <div class="next-match-emblem">${HP_CONFIG.logoUrl ? `<img src="${HP_CONFIG.logoUrl}" alt="">` : `<span class="emblem-initial" style="width:48px;height:48px;font-size:20px">${HP_CONFIG.clubName[0]}</span>`}</div>
            <div class="next-match-name">${HP_CONFIG.clubName}</div>
          </div>
          <div class="next-match-sep">VS</div>
          <div class="next-match-team away">
            <div class="next-match-emblem">${emblemHtml(next.opponent, 48)}</div>
            <div class="next-match-name">${next.opponent || '---'}</div>
          </div>
        </div>
        <div class="next-match-meta">
          ${next.venue ? `<span>📍 ${next.venue}</span>` : ''}
          ${next.competition ? `<span>🏆 ${next.competition}</span>` : ''}
          ${next.category ? `<span class="cat-tag">${next.category}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

// ---- NEWS ----
function renderNewsSection() {
  const el = document.getElementById('news-list');
  if (!el) return;
  const items = HP_DATA.posts
    .filter(p => p.published !== false)
    .sort((a, b) => a.date < b.date ? 1 : -1)
    .slice(0, 5);

  if (items.length === 0) {
    el.innerHTML = '<p class="no-data">ニュースはありません</p>';
    return;
  }
  visibleNews = items;
  el.innerHTML = items.map((p, i) => `
    <div class="news-item" onclick="openNewsDetail(${i})">
      <span class="news-date">${p.date ? p.date.replace(/-/g, '/') : ''}</span>
      <span class="news-cat cat-${sanitizeCat(p.category)}">${p.category || 'お知らせ'}</span>
      <span class="news-title">${p.title || ''}</span>
      <span class="news-arrow">›</span>
    </div>
  `).join('');
}
function sanitizeCat(c) {
  return (c || '').replace(/[^a-zA-Z0-9ぁ-んァ-ン一-龥]/g, '').slice(0, 12);
}

// ---- MATCH RESULTS ----
function renderMatchSection() {
  const el = document.getElementById('match-result-list');
  if (!el) return;

  const cats = HP_CONFIG.categories.length > 0
    ? HP_CONFIG.categories
    : [...new Set(HP_DATA.matches.map(m => m.category).filter(Boolean))].slice(0, 3);

  // タブ生成
  const tabWrap = document.getElementById('match-tabs');
  if (tabWrap && cats.length > 1) {
    tabWrap.innerHTML = cats.map((c, i) =>
      `<button class="match-tab ${i===0?'active':''}" data-cat="${c}" onclick="switchMatchTab('${c}', this)">${c}</button>`
    ).join('');
  }

  renderMatchList(cats[0] || null, el);
}

function switchMatchTab(cat, btn) {
  document.querySelectorAll('.match-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const el = document.getElementById('match-result-list');
  if (el) renderMatchList(cat, el);
}

function renderMatchList(cat, el) {
  let items = HP_DATA.matches
    .filter(m => m.result?.myScore !== undefined && m.result?.publish !== false)
    .sort((a, b) => a.date < b.date ? 1 : -1);
  if (cat) items = items.filter(m => !m.category || normCat(m.category) === normCat(cat));
  items = items.slice(0, 5);

  if (items.length === 0) {
    el.innerHTML = `<p class="no-data">試合結果はありません</p>`;
    return;
  }

  const subNote = cat ? `<div class="match-subnote">最近の結果 / ${cat}</div>` : '';
  visibleResults = items;
  el.innerHTML = subNote + items.map((m, i) => {
    const r = m.result;
    return `
      <div class="match-row" onclick="openMatchDetail(${i})">
        <span class="match-row-date">${fmtDate(m.date)}</span>
        <span class="match-row-home">${HP_CONFIG.clubName}</span>
        <span class="match-row-score">
          <span class="score-box">${r.myScore ?? '-'}</span>
          <span class="score-sep">-</span>
          <span class="score-box">${r.oppScore ?? '-'}</span>
        </span>
        <span class="match-row-away">${m.opponent || '---'}</span>
        ${resultBadge(m)}
      </div>
    `;
  }).join('');
}

// ---- PLAYERS PREVIEW ----
function renderPlayersPreview() {
  const el = document.getElementById('players-preview');
  if (!el) return;
  const players = HP_DATA.players
    .filter(p => p.photo && !['代表','コーチ','スタッフ'].includes(p.mainGroup))
    .slice(0, 8);

  if (players.length === 0) {
    el.innerHTML = '<p class="no-data" style="color:#aaa">選手情報はありません</p>';
    return;
  }
  el.innerHTML = players.map(p => playerCard(p)).join('');
}

function playerCard(p) {
  const posColor = {'GK':'#f5a623','DF':'#4a90d9','MF':'#7ed321','FW':'#e74c3c'}[p.mainGroup] || '#888';
  return `
    <div class="player-card">
      ${p.number ? `<div class="player-num">${p.number}</div>` : ''}
      <div class="player-photo">
        ${p.photo
          ? `<img src="${p.photo}" alt="${p.name}" loading="lazy">`
          : `<div class="player-photo-placeholder">${(p.name||'?')[0]}</div>`}
        ${p.mainGroup ? `<span class="player-pos" style="background:${posColor}">${p.mainGroup}</span>` : ''}
      </div>
      <div class="player-info">
        <div class="player-name">${p.name || ''}</div>
        ${p.nameRoman ? `<div class="player-roman">${p.nameRoman}</div>` : ''}
      </div>
    </div>
  `;
}

// ---- JOIN CTA ----
function renderJoinCta() {
  const btns = document.querySelectorAll('.btn-join');
  btns.forEach(btn => {
    btn.textContent = HP_CONFIG.joinLabel || '体験申込はこちら';
    if (HP_CONFIG.joinUrl) btn.href = HP_CONFIG.joinUrl;
  });
}

// ============================================================
// ===== 選手紹介ページ =====
// ============================================================
function renderPlayersPage() {
  renderCategoryTabs();
  renderAllPlayers('全員');
}

function renderCategoryTabs() {
  const wrap = document.getElementById('player-cat-tabs');
  if (!wrap) return;
  const cats = ['全員', ...HP_CONFIG.categories, 'スタッフ'];
  wrap.innerHTML = cats.map((c, i) =>
    `<button class="player-tab ${i===0?'active':''}" onclick="switchPlayerTab('${c}', this)">${c}</button>`
  ).join('');
}

function switchPlayerTab(cat, btn) {
  document.querySelectorAll('.player-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderAllPlayers(cat);
}

function renderAllPlayers(cat) {
  const el = document.getElementById('players-grid');
  if (!el) return;

  let list = [...HP_DATA.players];

  if (cat === 'スタッフ') {
    list = list.filter(p => ['代表','コーチ','スタッフ'].includes(p.mainGroup));
  } else if (cat !== '全員') {
    const catU = catToU(cat);
    list = list.filter(p => {
      if (['代表','コーチ','スタッフ'].includes(p.mainGroup)) return false;
      if (!catU) return true;
      return gradeInCat(p.grade, catU);
    });
  }

  list.sort((a, b) => Number(a.number||999) - Number(b.number||999));

  if (list.length === 0) {
    el.innerHTML = '<p style="color:#aaa;text-align:center;padding:40px">選手情報はありません</p>';
    return;
  }
  el.innerHTML = list.map(p => playerCard(p)).join('');
}

function catToU(cat) {
  const m = cat.match(/U(\d+)/i);
  return m ? parseInt(m[1]) : null;
}
function gradeInCat(grade, u) {
  const gradeToAge = {
    '小1':7,'小2':8,'小3':9,'小4':10,'小5':11,'小6':12,
    '中1':13,'中2':14,'中3':15,'高1':16,'高2':17,'高3':18
  };
  const age = gradeToAge[grade];
  if (!age) return false;
  return age <= u && age > u - 2;
}

// ============================================================
// ===== ニュースページ =====
// ============================================================
function renderNewsPage() {
  const el = document.getElementById('news-full-list');
  if (!el) return;
  const items = HP_DATA.posts
    .filter(p => p.published !== false)
    .sort((a, b) => a.date < b.date ? 1 : -1);

  if (items.length === 0) {
    el.innerHTML = '<p class="no-data">ニュースはありません</p>';
    return;
  }
  visibleNews = items;
  el.innerHTML = items.map((p, i) => `
    <div class="news-item news-item-lg" onclick="openNewsDetail(${i})">
      <span class="news-date">${p.date ? p.date.replace(/-/g, '/') : ''}</span>
      <span class="news-cat cat-${sanitizeCat(p.category)}">${p.category || 'お知らせ'}</span>
      <div class="news-title">${p.title || ''}</div>
      ${p.body ? `<div class="news-body-preview">${p.body.slice(0, 80)}${p.body.length > 80 ? '…' : ''}</div>` : ''}
    </div>
  `).join('');
}

// ============================================================
// ===== 試合結果・予定ページ =====
// ============================================================
function renderMatchesPage() {
  renderScheduleSection();
  renderResultsSection();
}

function renderScheduleSection() {
  const el = document.getElementById('schedule-list');
  if (!el) return;
  const today = todayStr();
  const items = HP_DATA.schedules
    .filter(s => s.date >= today)
    .sort((a, b) => a.date < b.date ? -1 : 1)
    .slice(0, 10);

  if (items.length === 0) {
    el.innerHTML = '<p class="no-data">試合予定はありません</p>';
    return;
  }
  el.innerHTML = items.map(s => `
    <div class="schedule-row">
      <span class="schedule-date">${fmtDate(s.date)}${s.time ? ' ' + s.time : ''}</span>
      <span class="schedule-type type-${s.type||''}">${s.type||''}</span>
      <span class="schedule-title">${s.opponent ? 'vs ' + s.opponent : s.title || ''}</span>
      ${s.venue ? `<span class="schedule-venue">📍 ${s.venue}</span>` : ''}
      ${s.category ? `<span class="cat-tag">${s.category}</span>` : ''}
    </div>
  `).join('');
}

function renderResultsSection() {
  const el = document.getElementById('results-list');
  if (!el) return;
  const items = HP_DATA.matches
    .filter(m => m.result?.myScore !== undefined && m.result?.publish !== false)
    .sort((a, b) => a.date < b.date ? 1 : -1)
    .slice(0, 20);

  if (items.length === 0) {
    el.innerHTML = '<p class="no-data">試合結果はありません</p>';
    return;
  }
  visibleResults = items;
  el.innerHTML = items.map((m, i) => {
    const r = m.result;
    return `
      <div class="match-row" onclick="openMatchDetail(${i})">
        <span class="match-row-date">${fmtDate(m.date)}</span>
        <span class="match-row-home">${HP_CONFIG.clubName}</span>
        <span class="match-row-score">
          <span class="score-box">${r.myScore ?? '-'}</span>
          <span class="score-sep">-</span>
          <span class="score-box">${r.oppScore ?? '-'}</span>
        </span>
        <span class="match-row-away">${m.opponent || '---'}</span>
        ${resultBadge(m)}
        ${m.category ? `<span class="cat-tag">${m.category}</span>` : ''}
      </div>
    `;
  }).join('');
}

// ============================================================
// ===== v3.0: 詳細モーダル（お知らせ・試合結果 共通） =====
// 全ページで使うため、モーダルのDOMはJSで注入する（HTML編集不要）
// ============================================================
function ensureDetailModal() {
  if (document.getElementById('detail-overlay')) return;
  const wrap = document.createElement('div');
  wrap.className = 'detail-overlay';
  wrap.id = 'detail-overlay';
  wrap.innerHTML = `
    <div class="detail-panel">
      <button type="button" class="detail-close" id="detail-close" aria-label="閉じる">×</button>
      <img id="detail-image" class="detail-image" alt="">
      <div class="detail-meta">
        <span class="detail-tag" id="detail-tag"></span>
        <span class="detail-date" id="detail-date"></span>
      </div>
      <h2 class="detail-title" id="detail-title"></h2>
      <div class="detail-body" id="detail-body"></div>
    </div>`;
  document.body.appendChild(wrap);
  document.getElementById('detail-close').addEventListener('click', closeDetail);
  wrap.addEventListener('click', e => { if (e.target === wrap) closeDetail(); });
}

function openDetail({ tag, tagColor, date, title, body, image }) {
  ensureDetailModal();
  const tagEl = document.getElementById('detail-tag');
  tagEl.textContent = tag || '';
  tagEl.style.display = tag ? '' : 'none';
  tagEl.style.color = tagColor || '';
  tagEl.style.borderColor = tagColor || '';
  document.getElementById('detail-date').textContent = date || '';
  document.getElementById('detail-title').textContent = title || '';
  document.getElementById('detail-body').textContent = body || '';
  const img = document.getElementById('detail-image');
  if (image) { img.src = image; img.classList.add('show'); }
  else { img.removeAttribute('src'); img.classList.remove('show'); }
  document.getElementById('detail-overlay').classList.add('open');
}
function closeDetail() {
  const ov = document.getElementById('detail-overlay');
  if (ov) ov.classList.remove('open');
}

function openNewsDetail(idx) {
  const n = visibleNews[idx];
  if (!n) return;
  openDetail({
    tag: n.cat || n.category || n.type || 'お知らせ',
    date: n.date ? n.date.replace(/-/g, '/') : '',
    title: n.title || '',
    body: n.body || '',
    image: n.image || '',
  });
}

// Match Plannerが生成した試合結果記事（あれば）を探して詳細に載せる
function findLinkedPost(m) {
  const r = m.result || {};
  let found = null;
  if (r.grandeNewsId) found = HP_DATA.posts.find(p => p && p.id === r.grandeNewsId);
  if (!found && m.opponent) {
    found = HP_DATA.posts.find(p =>
      p && p.type === '試合結果' && p.date === m.date && String(p.title || '').includes(m.opponent));
  }
  return found || null;
}

function openMatchDetail(idx) {
  const m = visibleResults[idx];
  if (!m || !m.result) return;
  const r = m.result;
  const post = findLinkedPost(m);
  const my = Number(r.myScore), opp = Number(r.oppScore);
  const rl = my > opp ? 'WIN' : my < opp ? 'LOSE' : 'DRAW';
  const tagColor = rl === 'WIN' ? '#1f8a4c' : rl === 'LOSE' ? '#d24b52' : '';

  const lines = [];
  const comp = m.competition || m.competitionName || m.type || '';
  if (comp) lines.push('🏆 ' + comp);
  if (m.venue) lines.push('📍 ' + m.venue);
  if (m.time) lines.push('⏰ ' + m.time + ' キックオフ');
  let scorers = [];
  if (post && Array.isArray(post.scorers) && post.scorers.length) {
    scorers = post.scorers.map(s => s.name + (s.goals > 1 ? ' ×' + s.goals : ''));
  } else if (Array.isArray(r.goals)) {
    const count = {};
    r.goals.forEach(g => { if (g.scorer) count[g.scorer] = (count[g.scorer] || 0) + 1; });
    scorers = Object.keys(count).map(k => k + (count[k] > 1 ? ' ×' + count[k] : ''));
  }
  if (scorers.length) lines.push('⚽ 得点者：' + scorers.join('、'));
  let body = lines.join('\n');
  if (post && post.body) body += (body ? '\n\n' : '') + post.body;

  openDetail({
    tag: rl,
    tagColor,
    date: m.date ? m.date.replace(/-/g, '/') : '',
    title: `${HP_CONFIG.clubName || ''} ${r.myScore} - ${r.oppScore} ${m.opponent || ''}`,
    body,
    image: r.imageUrl || (post && post.image) || '',
  });
}
