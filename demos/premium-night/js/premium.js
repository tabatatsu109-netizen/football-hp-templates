// プレミアムプラン デモ共通コア — Match Planner(Firebase)連携＋詳細モーダル＋選手プロフィール
// 見た目は各コンセプトの index.html 側CSSで定義する（DOM構造・IDは3コンセプト共通）

const FIREBASE_URL = `${PREMIUM_CONFIG.firebaseUrl}/clubs/${PREMIUM_CONFIG.clubId}.json`;
let HP_DATA = { players: [], matches: [], schedules: [], posts: [], opponents: [] };
let visibleNews = [];
let visibleResults = [];
let visiblePlayers = [];

document.addEventListener('DOMContentLoaded', async () => {
  bindModals();
  try { await loadData(); } catch (e) { console.warn('データ取得失敗:', e); }
  renderTicker();
  renderNextMatch();
  renderNews();
  renderResults();
  renderPlayers();
  revealOnScroll();
});

async function loadData() {
  const res = await fetch(FIREBASE_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const r = await res.json() || {};
  HP_DATA.players   = Array.isArray(r.players)   ? r.players   : [];
  HP_DATA.matches   = Array.isArray(r.matches)   ? r.matches   : [];
  HP_DATA.schedules = Array.isArray(r.schedules) ? r.schedules : [];
  HP_DATA.posts     = Array.isArray(r.posts || r.news) ? (r.posts || r.news) : [];
  HP_DATA.opponents = Array.isArray(r.opponents) ? r.opponents : [];
}

// ===== utils =====
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function toDate(s) { if (!s) return null; const d = new Date(s); return isNaN(d.getTime()) ? null : d; }
function fmtDate(s) { return String(s || '').replace(/-/g, '.'); }
function dayLabel(s) {
  const d = toDate(s); if (!d) return '';
  return ['SUN','MON','TUE','WED','THU','FRI','SAT'][d.getDay()];
}
function normCat(s) { return String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }
function dispCat(c) { const m = String(c || '').match(/^U-?(\d+)$/i); return m ? 'U-' + m[1] : String(c || ''); }
function resultLetter(rs, my, opp) {
  if (rs) {
    if (/勝|win/i.test(rs)) return 'WIN';
    if (/負|敗|lose|loss/i.test(rs)) return 'LOSE';
    return 'DRAW';
  }
  return my > opp ? 'WIN' : my < opp ? 'LOSE' : 'DRAW';
}

// ===== ティッカー =====
function renderTicker() {
  const el = document.getElementById('pm-ticker');
  if (!el) return;
  const items = HP_DATA.posts
    .filter(p => p && p.title && p.published !== false)
    .sort((a, b) => (toDate(b.date) || 0) - (toDate(a.date) || 0))
    .slice(0, 6);
  if (items.length === 0) { el.textContent = 'WELCOME TO ' + (PREMIUM_CONFIG.clubNameFull || ''); return; }
  el.innerHTML = items.map(p => `<span class="pm-ticker-item">▶&nbsp;${esc(p.title)}</span>`).join('');
}

// ===== ネクストマッチ =====
function renderNextMatch() {
  const wrap = document.getElementById('pm-next-match');
  if (!wrap) return;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const fromMatches = HP_DATA.matches.filter(m => {
    if (m.result && m.result.myScore != null && m.result.oppScore != null) return false;
    const d = toDate(m.date);
    return d && d >= today;
  });
  const keys = {};
  fromMatches.forEach(m => { keys[m.date + '|' + (m.opponent || '')] = true; });
  const fromSchedules = HP_DATA.schedules
    .filter(sc => {
      const d = toDate(sc.date);
      return d && d >= today && !keys[sc.date + '|' + (sc.opponent || '')];
    })
    .map(sc => ({
      date: sc.date, time: sc.time || '', venue: sc.venue || '',
      competition: sc.competition || sc.type || '', opponent: sc.opponent || '', category: sc.category || '',
    }));
  const next = fromMatches.concat(fromSchedules)
    .sort((a, b) => (toDate(a.date) || 0) - (toDate(b.date) || 0))[0];

  if (!next) { wrap.style.display = 'none'; return; }
  wrap.style.display = '';
  const cat = dispCat(next.category);
  const comp = next.competition || next.competitionName || next.type || '';
  document.getElementById('pm-nm-date').textContent = fmtDate(next.date);
  document.getElementById('pm-nm-day').textContent = dayLabel(next.date);
  document.getElementById('pm-nm-opp').textContent = next.opponent || '';
  document.getElementById('pm-nm-meta').textContent =
    [cat, comp, next.time ? next.time + ' KO' : '', next.venue].filter(Boolean).join('　/　');
}

// ===== ニュース =====
function renderNews() {
  const el = document.getElementById('pm-news-list');
  if (!el) return;
  const items = HP_DATA.posts
    .filter(p => p && p.title && p.published !== false)
    .sort((a, b) => (toDate(b.date) || 0) - (toDate(a.date) || 0))
    .slice(0, 5);
  if (items.length === 0) { el.innerHTML = '<p class="pm-nodata">現在お知らせはありません</p>'; return; }
  visibleNews = items;
  el.innerHTML = items.map((p, i) => `
    <div class="pm-news-row" onclick="openNewsDetail(${i})">
      <span class="pm-news-date">${esc(fmtDate(p.date))}</span>
      <span class="pm-news-tag">${esc(p.cat || p.category || p.type || 'お知らせ')}</span>
      <span class="pm-news-title">${esc(p.title)}</span>
      <span class="pm-news-arrow">›</span>
    </div>`).join('');
}

// ===== 試合結果 =====
function renderResults() {
  const el = document.getElementById('pm-results-list');
  if (!el) return;
  const items = HP_DATA.matches
    .filter(m => m.result && m.result.publish !== false && m.result.myScore != null && m.result.oppScore != null)
    .sort((a, b) => (toDate(b.date) || 0) - (toDate(a.date) || 0))
    .slice(0, 5);
  if (items.length === 0) { el.innerHTML = '<p class="pm-nodata">試合結果はありません</p>'; return; }
  visibleResults = items;
  el.innerHTML = items.map((m, i) => {
    const r = m.result;
    const rl = resultLetter(r.resultStr, Number(r.myScore), Number(r.oppScore));
    return `
    <div class="pm-result-row" onclick="openMatchDetail(${i})">
      <span class="pm-result-date">${esc(m.date ? m.date.slice(5).replace('-', '.') : '')}</span>
      <span class="pm-result-score"><b>${r.myScore}</b><i>-</i><b>${r.oppScore}</b></span>
      <span class="pm-result-opp">vs ${esc(m.opponent || '')}</span>
      <span class="pm-result-badge pm-${rl.toLowerCase()}">${rl}</span>
    </div>`;
  }).join('');
}

// ===== 選手（プロフィール強化） =====
function renderPlayers() {
  const el = document.getElementById('pm-players-grid');
  if (!el) return;
  const list = HP_DATA.players
    .filter(p => p && p.name && !['代表', 'コーチ', 'スタッフ'].includes(p.mainGroup))
    .sort((a, b) => Number(a.number || 999) - Number(b.number || 999))
    .slice(0, 12);
  if (list.length === 0) { el.innerHTML = '<p class="pm-nodata">選手情報は準備中です</p>'; return; }
  visiblePlayers = list;
  el.innerHTML = list.map((p, i) => `
    <div class="pm-player-card" onclick="openPlayerDetail(${i})">
      <div class="pm-player-photo">
        ${p.photo ? `<img src="${esc(p.photo)}" alt="${esc(p.name)}" loading="lazy">` : `<span class="pm-player-ph">${esc((p.name || '?')[0])}</span>`}
      </div>
      ${p.number ? `<div class="pm-player-num">${esc(p.number)}</div>` : ''}
      <div class="pm-player-name">${esc(p.name)}</div>
      ${p.nameRoman ? `<div class="pm-player-roman">${esc(p.nameRoman)}</div>` : ''}
    </div>`).join('');
}

// ===== モーダル（共通） =====
function bindModals() {
  document.querySelectorAll('.pm-overlay').forEach(ov => {
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); });
    const btn = ov.querySelector('.pm-close');
    if (btn) btn.addEventListener('click', () => ov.classList.remove('open'));
  });
}

function openNewsDetail(idx) {
  const n = visibleNews[idx];
  if (!n) return;
  document.getElementById('pm-detail-tag').textContent = n.cat || n.category || n.type || 'お知らせ';
  document.getElementById('pm-detail-date').textContent = fmtDate(n.date);
  document.getElementById('pm-detail-title').textContent = n.title || '';
  document.getElementById('pm-detail-body').textContent = n.body || '';
  const img = document.getElementById('pm-detail-image');
  if (n.image) { img.src = n.image; img.classList.add('show'); }
  else { img.removeAttribute('src'); img.classList.remove('show'); }
  document.getElementById('pm-detail-overlay').classList.add('open');
}

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
  const rl = resultLetter(r.resultStr, Number(r.myScore), Number(r.oppScore));
  document.getElementById('pm-detail-tag').textContent = rl;
  document.getElementById('pm-detail-date').textContent = fmtDate(m.date);
  document.getElementById('pm-detail-title').textContent =
    `${PREMIUM_CONFIG.clubName} ${r.myScore} - ${r.oppScore} ${m.opponent || ''}`;
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
  document.getElementById('pm-detail-body').textContent = body;
  const img = document.getElementById('pm-detail-image');
  const src = r.imageUrl || (post && post.image) || '';
  if (src) { img.src = src; img.classList.add('show'); }
  else { img.removeAttribute('src'); img.classList.remove('show'); }
  document.getElementById('pm-detail-overlay').classList.add('open');
}

// 選手個人プロフィール（プレミアム強化版）
function openPlayerDetail(idx) {
  const p = visiblePlayers[idx];
  if (!p) return;
  const photo = document.getElementById('pm-pd-photo');
  if (p.photo) { photo.src = p.photo; photo.style.display = ''; }
  else { photo.removeAttribute('src'); photo.style.display = 'none'; }
  document.getElementById('pm-pd-num').textContent = p.number || '';
  document.getElementById('pm-pd-pos').textContent = p.mainGroup || '';
  document.getElementById('pm-pd-name').textContent = p.name || '';
  document.getElementById('pm-pd-roman').textContent = p.nameRoman || '';
  document.getElementById('pm-pd-grade').textContent = p.grade ? '学年：' + p.grade : '';
  document.getElementById('pm-pd-profile').textContent = p.profile || '';
  document.getElementById('pm-player-overlay').classList.add('open');
}

// ===== スクロール出現（軽量・CSSクラスのみ） =====
function revealOnScroll() {
  const els = document.querySelectorAll('.pm-reveal');
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach(el => el.classList.add('shown'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('shown'); io.unobserve(en.target); } });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
}
