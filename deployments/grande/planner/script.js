'use strict';

// ===== FORMATIONS =====
const FORMATIONS = {
  '4-3-3': [
    {id:'GK',  label:'GK',  x:50, y:88},
    {id:'RB',  label:'RB',  x:80, y:70},
    {id:'CB2', label:'CB',  x:60, y:70},
    {id:'CB1', label:'CB',  x:40, y:70},
    {id:'LB',  label:'LB',  x:20, y:70},
    {id:'RCM', label:'MF',  x:70, y:48},
    {id:'CM',  label:'MF',  x:50, y:48},
    {id:'LCM', label:'MF',  x:30, y:48},
    {id:'RW',  label:'RW',  x:78, y:22},
    {id:'CF',  label:'CF',  x:50, y:16},
    {id:'LW',  label:'LW',  x:22, y:22},
  ],
  '4-4-2': [
    {id:'GK',  label:'GK',  x:50, y:88},
    {id:'RB',  label:'RB',  x:80, y:70},
    {id:'CB2', label:'CB',  x:60, y:70},
    {id:'CB1', label:'CB',  x:40, y:70},
    {id:'LB',  label:'LB',  x:20, y:70},
    {id:'RM',  label:'MF',  x:80, y:48},
    {id:'RCM', label:'MF',  x:60, y:48},
    {id:'LCM', label:'MF',  x:40, y:48},
    {id:'LM',  label:'MF',  x:20, y:48},
    {id:'RS',  label:'FW',  x:65, y:18},
    {id:'LS',  label:'FW',  x:35, y:18},
  ],
  '4-2-3-1': [
    {id:'GK',  label:'GK',  x:50, y:88},
    {id:'RB',  label:'RB',  x:80, y:70},
    {id:'CB2', label:'CB',  x:60, y:70},
    {id:'CB1', label:'CB',  x:40, y:70},
    {id:'LB',  label:'LB',  x:20, y:70},
    {id:'RDM', label:'DM',  x:62, y:55},
    {id:'LDM', label:'DM',  x:38, y:55},
    {id:'RW',  label:'RW',  x:75, y:35},
    {id:'CAM', label:'AM',  x:50, y:35},
    {id:'LW',  label:'LW',  x:25, y:35},
    {id:'CF',  label:'CF',  x:50, y:16},
  ],
  '3-5-2': [
    {id:'GK',  label:'GK',  x:50, y:88},
    {id:'RCB', label:'CB',  x:68, y:70},
    {id:'CB',  label:'CB',  x:50, y:70},
    {id:'LCB', label:'CB',  x:32, y:70},
    {id:'RWB', label:'WB',  x:88, y:48},
    {id:'RCM', label:'MF',  x:65, y:48},
    {id:'CM',  label:'MF',  x:50, y:48},
    {id:'LCM', label:'MF',  x:35, y:48},
    {id:'LWB', label:'WB',  x:12, y:48},
    {id:'RS',  label:'FW',  x:65, y:18},
    {id:'LS',  label:'FW',  x:35, y:18},
  ],
  '3-4-3': [
    {id:'GK',  label:'GK',  x:50, y:88},
    {id:'RCB', label:'CB',  x:68, y:70},
    {id:'CB',  label:'CB',  x:50, y:70},
    {id:'LCB', label:'CB',  x:32, y:70},
    {id:'RM',  label:'MF',  x:80, y:48},
    {id:'RCM', label:'MF',  x:60, y:48},
    {id:'LCM', label:'MF',  x:40, y:48},
    {id:'LM',  label:'MF',  x:20, y:48},
    {id:'RW',  label:'RW',  x:75, y:18},
    {id:'CF',  label:'CF',  x:50, y:14},
    {id:'LW',  label:'LW',  x:25, y:18},
  ],
};

// ===== 8人制フォーメーション (U8〜U12) =====
const FORMATIONS_8 = {
  '3-3-1': [
    {id:'GK',  label:'GK', x:50, y:88},
    {id:'RCB', label:'CB', x:68, y:70},
    {id:'CB',  label:'CB', x:50, y:70},
    {id:'LCB', label:'CB', x:32, y:70},
    {id:'RM',  label:'MF', x:72, y:48},
    {id:'CM',  label:'MF', x:50, y:48},
    {id:'LM',  label:'MF', x:28, y:48},
    {id:'CF',  label:'FW', x:50, y:20},
  ],
  '2-3-2': [
    {id:'GK',  label:'GK', x:50, y:88},
    {id:'RB',  label:'RB', x:70, y:72},
    {id:'LB',  label:'LB', x:30, y:72},
    {id:'RM',  label:'MF', x:72, y:48},
    {id:'CM',  label:'MF', x:50, y:48},
    {id:'LM',  label:'MF', x:28, y:48},
    {id:'RS',  label:'FW', x:65, y:22},
    {id:'LS',  label:'FW', x:35, y:22},
  ],
  '3-2-2': [
    {id:'GK',  label:'GK', x:50, y:88},
    {id:'RCB', label:'CB', x:68, y:70},
    {id:'CB',  label:'CB', x:50, y:70},
    {id:'LCB', label:'CB', x:32, y:70},
    {id:'RM',  label:'MF', x:65, y:48},
    {id:'LM',  label:'MF', x:35, y:48},
    {id:'RS',  label:'FW', x:65, y:22},
    {id:'LS',  label:'FW', x:35, y:22},
  ],
  '2-4-1': [
    {id:'GK',  label:'GK', x:50, y:88},
    {id:'RB',  label:'RB', x:70, y:72},
    {id:'LB',  label:'LB', x:30, y:72},
    {id:'RM',  label:'MF', x:80, y:48},
    {id:'RCM', label:'MF', x:57, y:48},
    {id:'LCM', label:'MF', x:43, y:48},
    {id:'LM',  label:'MF', x:20, y:48},
    {id:'CF',  label:'FW', x:50, y:20},
  ],
};

const COMPETITION_OPTIONS = ['U-15リーグ','U-14リーグ','U-13リーグ','U-12リーグ','TM','カップ戦','その他'];
const CATEGORY_OPTIONS = ['U15','U14','U13','U12','U11','U10','U9','U8'];

function is8man(category) {
  if (!category) return false;
  const n = parseInt(category.replace('U',''));
  return !isNaN(n) && n <= 12;
}

function getFormationsByCategory(category) {
  return is8man(category) ? FORMATIONS_8 : FORMATIONS;
}

function updateFormationSelect(selectId, category) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const fmts = getFormationsByCategory(category);
  const prev = sel.value;
  sel.innerHTML = Object.keys(fmts).map(f => `<option value="${f}">${f}</option>`).join('');
  if (fmts[prev]) sel.value = prev;
}

// ===== STATE =====
let players = [];
let matches = [];
let schedules = [];
let posts = [];
let currentMatch = null;
let currentPage = 'page-dashboard';
let navHistory = [];
let editingSchedId = null;
let editingPlayerIdx = null;
let selectedPosId = null;
let selectedStripId = null;
let scheduleFilter = 'all';
let matchFilter = 'all';
let playerGradeFilter = 'all';
let playerPosFilter = 'all';
let currentPostType = 'お知らせ';
let currentPostTab = 'compose';
let selectedAnnSchedId = null;
let confirmCb = null;
let importPreviewRows = [];
let opponents = [];
let editingOpponentIdx = null;
let oppImportPreviewRows = [];
let oppPickerTarget = null;
let oppSearchQuery = '';

// ===== SETTINGS =====
// clubName/clubId/firebaseUrl は mp-config.js のみ。LocalStorageには firebaseSecret だけ保存。
function getSecretKey() {
  const cfg = (typeof MP_CONFIG !== 'undefined') ? MP_CONFIG : {};
  return cfg.clubId ? `mp_secret_${cfg.clubId}` : 'mp_secret';
}
function getSettings() {
  const cfg = (typeof MP_CONFIG !== 'undefined') ? MP_CONFIG : {};
  return {
    clubName:       cfg.clubName    || 'クラブ名未設定',
    clubId:         cfg.clubId      || '',
    firebaseUrl:    cfg.firebaseUrl || '',
    firebaseSecret: localStorage.getItem(getSecretKey()) || '',
  };
}
function saveSettings(s) {
  localStorage.setItem(getSecretKey(), s.firebaseSecret || '');
}
function getFirebaseUrl(s) {
  return `${s.firebaseUrl}/clubs/${s.clubId}`;
}
function isCloudConfigured(s) {
  return !!(s.firebaseUrl && s.clubId && s.firebaseSecret);
}

// ===== STORAGE =====
// クラブごとにLocalStorageキーを分ける（同ドメインの複数クラブが混ざらないように）
function getLocalPrefix() {
  const cfg = (typeof MP_CONFIG !== 'undefined') ? MP_CONFIG : {};
  const clubId = cfg.clubId || '';
  return clubId ? `mp2_${clubId}_` : 'mp2_';
}
function loadLocal() {
  const p = getLocalPrefix();
  players   = JSON.parse(localStorage.getItem(`${p}players`)   || '[]');
  matches   = JSON.parse(localStorage.getItem(`${p}matches`)   || '[]');
  schedules = JSON.parse(localStorage.getItem(`${p}schedules`) || '[]');
  posts     = JSON.parse(localStorage.getItem(`${p}posts`)     || '[]');
  opponents = JSON.parse(localStorage.getItem(`${p}opponents`) || '[]');
}
function saveLocal() {
  const p = getLocalPrefix();
  localStorage.setItem(`${p}players`,   JSON.stringify(players));
  localStorage.setItem(`${p}matches`,   JSON.stringify(matches));
  localStorage.setItem(`${p}schedules`, JSON.stringify(schedules));
  localStorage.setItem(`${p}posts`,     JSON.stringify(posts));
  localStorage.setItem(`${p}opponents`, JSON.stringify(opponents));
  scheduleCloudSave();
}

let _cloudSaveTimer = null;
function scheduleCloudSave() {
  const s = getSettings();
  if (!isCloudConfigured(s)) return;
  clearTimeout(_cloudSaveTimer);
  _cloudSaveTimer = setTimeout(async () => {
    try {
      setSyncIcon('💾');
      const res = await fetch(`${getFirebaseUrl(s)}.json?auth=${s.firebaseSecret}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ players, matches, schedules, posts, opponents }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSyncIcon('☁️');
      setSyncTime();
    } catch(e) {
      setSyncIcon('⚠️');
    }
  }, 3000);
}

function saveCurrentMatch() {
  if (!currentMatch) return;
  const idx = matches.findIndex(m => m.id === currentMatch.id);
  if (idx >= 0) matches[idx] = currentMatch;
  saveLocal();
}

// ===== CLOUD =====
async function loadFromCloud() {
  const s = getSettings();
  if (!isCloudConfigured(s)) { showToast('設定でFirebase URLとシークレットを設定してください', 'error'); return; }
  setSyncIcon('🔄');
  try {
    const res = await fetch(`${getFirebaseUrl(s)}.json?auth=${s.firebaseSecret}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const r = await res.json() || {};
    if (r.players)   players   = r.players;
    if (r.matches)   matches   = r.matches;
    if (r.schedules) schedules = r.schedules;
    if (r.posts)     posts     = r.posts;
    if (r.opponents) opponents = r.opponents;
    saveLocal();
    setSyncIcon('☁️');
    setSyncTime();
    showToast('クラウドから読み込みました', 'success');
    renderCurrentPage();
  } catch(e) {
    setSyncIcon('⚠️');
    showToast('読み込み失敗: ' + e.message, 'error');
  }
}
async function saveToCloud() {
  const s = getSettings();
  if (!isCloudConfigured(s)) { showToast('設定でFirebase URLとシークレットを設定してください', 'error'); return; }
  setSyncIcon('💾');
  try {
    const res = await fetch(`${getFirebaseUrl(s)}.json?auth=${s.firebaseSecret}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ players, matches, schedules, posts, opponents }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    setSyncIcon('☁️');
    showToast('クラウドに保存しました', 'success');
  } catch(e) {
    setSyncIcon('⚠️');
    showToast('保存失敗: ' + e.message, 'error');
  }
}
function setSyncIcon(icon) { document.getElementById('sync-icon').textContent = icon; }
function setSyncTime() {
  const el = document.getElementById('sync-time');
  if (el) el.textContent = new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
}

// バックグラウンド自動同期（トーストなし）
async function autoSync() {
  const s = getSettings();
  if (!isCloudConfigured(s)) return;
  try {
    const res = await fetch(`${getFirebaseUrl(s)}.json?auth=${s.firebaseSecret}`);
    if (!res.ok) return;
    const r = await res.json() || {};
    if (r.players)   players   = r.players;
    if (r.matches)   matches   = r.matches;
    if (r.schedules) schedules = r.schedules;
    if (r.posts)     posts     = r.posts;
    if (r.opponents) opponents = r.opponents;
    saveLocal();
    setSyncIcon('☁️');
    setSyncTime();
    renderCurrentPage();
  } catch(e) { /* silent */ }
}

// ===== NAVIGATION =====
const bottomNavPages = ['page-dashboard','page-schedule','page-matches','page-players','page-more'];

function showPage(pageId, opts = {}) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (!target) return;
  target.classList.add('active');
  currentPage = pageId;

  // Update bottom nav
  document.querySelectorAll('.bnav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.bnav === pageId);
  });
  // Update sidebar
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.nav === pageId);
  });

  // Render page
  if (pageId === 'page-dashboard')    renderDashboard();
  if (pageId === 'page-schedule')     renderSchedule();
  if (pageId === 'page-matches')      renderMatches();
  if (pageId === 'page-players')      renderPlayers();
  if (pageId === 'page-opponents')    renderOpponents();
  if (pageId === 'page-news')         renderNews();
  if (pageId === 'page-announcement') renderAnnouncement();
  if (pageId === 'page-result-entry') renderResultEntry();
  if (pageId === 'page-settings')     renderSettingsPage();
}

function pushPage(pageId, opts = {}) {
  navHistory.push(currentPage);
  showPage(pageId, opts);
}
function popPage() {
  const prev = navHistory.pop() || 'page-dashboard';
  showPage(prev);
}
function renderCurrentPage() { showPage(currentPage); }

// ===== UTILS =====
let toastTimer;
function showToast(msg, type = '') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.classList.remove('show'); }, 3000);
}
function showConfirm(title, msg, label, onOk) {
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-msg').textContent = msg;
  document.getElementById('confirm-ok').textContent = label || '削除する';
  confirmCb = onOk;
  document.getElementById('dialog-confirm').classList.add('open');
}
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function todayStr() { return new Date().toISOString().slice(0, 10); }
function nowTimeStr() { return new Date().toTimeString().slice(0,5); }
function fmtDate(s) {
  if (!s) return '';
  const d = new Date(s + 'T00:00:00');
  return `${d.getMonth()+1}/${d.getDate()}(${['日','月','火','水','木','金','土'][d.getDay()]})`;
}
function fmtDateFull(s) {
  if (!s) return '';
  const d = new Date(s + 'T00:00:00');
  return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}(${['日','月','火','水','木','金','土'][d.getDay()]})`;
}
function fmtMonth(s) {
  if (!s) return '';
  const d = new Date(s + 'T00:00:00');
  return `${d.getFullYear()}年${d.getMonth()+1}月`;
}

function getTypeBadgeClass(type) {
  if (type === '公式戦') return 'badge-official';
  if (type === '練習試合') return 'badge-match rt-tm';
  if (type === 'フェスティバル') return 'badge-cup';
  if (type === '合宿') return 'badge-cup';
  if (type === '試合') return 'badge-match';
  if (type === '練習') return 'badge-tr';
  if (type === '大会') return 'badge-cup';
  return 'badge-other';
}
function getCatBadgeClass(cat) {
  if (!cat) return '';
  const n = parseInt(cat.replace('U',''));
  if (n >= 13) return 'cat-u15';
  if (n >= 10) return 'cat-u12';
  return 'cat-u9';
}
function getResultStr(m) {
  if (!m.result) return null;
  const my = m.result.myScore, op = m.result.oppScore;
  if (my == null) return null;
  if (my > op) return 'WIN';
  if (my < op) return 'LOSS';
  return 'DRAW';
}
function getResultBadgeClass(str) {
  if (str === 'WIN') return 'rb-win result-win';
  if (str === 'DRAW') return 'rb-draw result-draw';
  return 'rb-loss result-loss';
}
function parseMatchMins(format) {
  if (!format) return 80;
  const m = format.match(/(\d+)分×(\d+)/);
  if (m) return parseInt(m[1]) * parseInt(m[2]);
  return 80;
}

// ===== DASHBOARD =====
function renderDashboard() {
  const s = getSettings();
  const today = todayStr();

  // Club name
  document.getElementById('header-club-name').textContent = s.clubName || 'クラブ名未設定';

  // HP card stats
  const nextSched = schedules.filter(s => s.type === '試合' && s.date >= today).sort((a,b) => (a.date+a.time) < (b.date+b.time) ? -1 : 1)[0];
  document.getElementById('dash-ann-stat').textContent = nextSched ? `次の試合: ${fmtDate(nextSched.date)}` : '試合予定なし';

  const pendingResults = matches.filter(m => !m.result?.grandePosted && m.date <= today).length;
  document.getElementById('dash-result-stat').textContent = `未公開: ${pendingResults}試合`;

  const draftPosts = posts.filter(p => !p.published).length;
  document.getElementById('dash-news-stat').textContent = `下書き: ${draftPosts}件`;
  document.getElementById('dash-player-stat').textContent = `選手数: ${players.length}名`;

  // 今日の予定
  const todayScheds = schedules.filter(s => s.date === today).sort((a,b) => (a.time||'') < (b.time||'') ? -1 : 1);
  const todayEl = document.getElementById('dash-today-list');
  if (todayScheds.length === 0) {
    todayEl.innerHTML = '<div style="padding:12px 14px;font-size:13px;color:var(--c-muted);text-align:center">今日の予定はありません</div>';
  } else {
    todayEl.innerHTML = todayScheds.slice(0,4).map(sc => `
      <div class="sched-item" onclick="showPage('page-schedule')">
        <span class="sched-badge ${getTypeBadgeClass(sc.type)}">${sc.type === '練習' ? 'TR' : sc.type}</span>
        <span class="sched-time">${sc.time||''}${sc.endTime ? '–'+sc.endTime : ''}</span>
        <span class="sched-name">${sc.category ? sc.category+' ' : ''}${sc.title || sc.opponent || sc.type}</span>
        <span class="sched-venue">${sc.venue||''}</span>
      </div>
    `).join('');
  }

  // 次の試合
  const nextEl = document.getElementById('dash-next-match');
  if (nextSched) {
    nextEl.innerHTML = `
      <div class="next-match-card">
        <div class="next-match-date-row">
          <span style="font-size:14px;font-weight:700">${fmtDate(nextSched.date)} ${nextSched.time||''}</span>
          <span class="chip ${getTypeBadgeClass(nextSched.type)}">${nextSched.competition || nextSched.type}</span>
          ${nextSched.category ? `<span class="chip ${getCatBadgeClass(nextSched.category)}">${nextSched.category}</span>` : ''}
        </div>
        <div class="next-match-vs">
          <div class="nm-team">
            <div class="nm-logo">${(s.clubName||'G')[0]}</div>
            <div class="nm-name">${s.clubName||'自チーム'}</div>
          </div>
          <div class="nm-vs-text">VS</div>
          <div class="nm-team">
            <div class="nm-logo nm-logo-away">相</div>
            <div class="nm-name">${nextSched.opponent || '---'}</div>
          </div>
        </div>
        ${nextSched.venue ? `<div class="nm-venue">📍 ${nextSched.venue}</div>` : ''}
      </div>
    `;
  } else {
    nextEl.innerHTML = '<div class="nm-empty">次の試合が登録されていません<br><span style="font-size:12px">スケジュールから追加できます</span></div>';
  }

  // 最近の試合結果
  const resultMatches = matches.filter(m => m.result?.myScore != null).sort((a,b) => a.date < b.date ? 1 : -1).slice(0,5);
  const recentEl = document.getElementById('dash-recent-results');
  if (resultMatches.length === 0) {
    recentEl.innerHTML = '<div style="padding:16px;font-size:13px;color:var(--c-muted);text-align:center">試合結果はまだありません</div>';
  } else {
    recentEl.innerHTML = resultMatches.map(m => {
      const rstr = getResultStr(m);
      const cls = getResultBadgeClass(rstr);
      const typeCls = m.type === '公式戦' ? 'rt-official' : m.type === '練習試合' ? 'rt-tm' : 'rt-fest';
      return `
        <div class="result-row" onclick="openMatchDetail('${m.id}')">
          <span class="result-row-date">${fmtDate(m.date)}</span>
          <span class="result-row-type ${typeCls}">${m.type}</span>
          <div class="result-row-logos">
            <div class="result-logo logo-home">${(s.clubName||'G')[0]}</div>
            <div class="result-logo logo-away">${(m.opponent||'相')[0]}</div>
          </div>
          <span class="result-row-score">${m.result.myScore} - ${m.result.oppScore}</span>
          <span class="result-badge ${cls}">${rstr}</span>
        </div>
      `;
    }).join('');
  }
}

// ===== SCHEDULE =====
function renderSchedule() {
  const today = todayStr();
  let items = [...schedules];
  if (scheduleFilter !== 'all') items = items.filter(s => s.type === scheduleFilter);
  items.sort((a,b) => (a.date+a.time) < (b.date+b.time) ? -1 : 1);

  // Group by month
  const groups = {};
  items.forEach(s => {
    const key = fmtMonth(s.date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(s);
  });

  const el = document.getElementById('schedule-list');
  if (items.length === 0) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">📅</div><div class="empty-title">スケジュールがありません</div><div class="empty-desc">「+追加」からスケジュールを登録しましょう</div></div>`;
    return;
  }
  el.innerHTML = Object.entries(groups).map(([month, scheds]) => `
    <div class="sched-group">
      <div class="sched-group-title">${month}</div>
      ${scheds.map(sc => renderSchedCard(sc, today)).join('')}
    </div>
  `).join('');
}
function renderSchedCard(sc, today) {
  const d = new Date(sc.date + 'T00:00:00');
  const day = d.getDate();
  const dow = ['日','月','火','水','木','金','土'][d.getDay()];
  const isPast = sc.date < today;
  const timeStr = [sc.time, sc.endTime].filter(Boolean).join('–');
  const name = sc.opponent ? `vs ${sc.opponent}` : (sc.title || sc.type);
  return `
    <div class="sched-card" onclick="openScheduleModal('${sc.id}')">
      <div class="sched-card-inner">
        <div class="sched-card-date-col">
          <div class="sched-card-day" style="${dow==='日'?'color:var(--c-red)':dow==='土'?'color:var(--c-blue)':''}">${day}</div>
          <div class="sched-card-dow" style="${dow==='日'?'color:var(--c-red)':dow==='土'?'color:var(--c-blue)':''}">${dow}</div>
        </div>
        <div class="sched-card-body">
          <div class="sched-card-name">${name}</div>
          <div class="sched-card-meta">
            <span class="sched-badge ${getTypeBadgeClass(sc.type)}">${sc.type === '練習' ? 'TR' : sc.type}</span>
            ${sc.category ? `<span class="chip ${getCatBadgeClass(sc.category)}">${sc.category}</span>` : ''}
            ${timeStr ? `<span>⏰ ${timeStr}</span>` : ''}
            ${sc.venue ? `<span>📍 ${sc.venue}</span>` : ''}
            ${sc.competition ? `<span>🏆 ${sc.competition}</span>` : ''}
          </div>
        </div>
        <div class="sched-card-right">
          ${isPast ? '<span class="past-pill">終了</span>' : ''}
          ${sc.posted ? '<span class="posted-pill">告知済み</span>' : ''}
          ${!isPast && sc.type==='試合' ? `<button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();startAnnouncement('${sc.id}')">告知する</button>` : ''}
          <button class="btn btn-ghost btn-sm" style="color:var(--c-red);font-size:12px" onclick="event.stopPropagation();deleteSchedule('${sc.id}')">削除</button>
        </div>
      </div>
    </div>
  `;
}
function openScheduleModal(id = null) {
  editingSchedId = id;
  const modal = document.getElementById('modal-schedule');
  const title = document.getElementById('modal-schedule-title');
  if (id) {
    const sc = schedules.find(s => s.id === id);
    if (!sc) return;
    title.textContent = 'スケジュールを編集';
    document.getElementById('sf-date').value = sc.date || '';
    document.getElementById('sf-time').value = sc.time || '';
    document.getElementById('sf-end-time').value = sc.endTime || '';
    document.getElementById('sf-type').value = sc.type || '練習';
    document.getElementById('sf-category').value = sc.category || '';
    document.getElementById('sf-opponent').value = sc.opponent || '';
    document.getElementById('sf-title').value = sc.title || '';
    document.getElementById('sf-venue').value = sc.venue || '';
    document.getElementById('sf-competition').value = sc.competition || '';
    document.getElementById('sf-notes').value = sc.notes || '';
  } else {
    title.textContent = 'スケジュールを追加';
    document.getElementById('sf-date').value = todayStr();
    document.getElementById('sf-time').value = '';
    document.getElementById('sf-end-time').value = '';
    document.getElementById('sf-type').value = '練習';
    document.getElementById('sf-category').value = '';
    document.getElementById('sf-opponent').value = '';
    document.getElementById('sf-title').value = '';
    document.getElementById('sf-venue').value = '';
    document.getElementById('sf-competition').value = '';
    document.getElementById('sf-notes').value = '';
  }
  openModal('modal-schedule');
}
function saveScheduleForm() {
  const date = document.getElementById('sf-date').value;
  if (!date) { showToast('日付を入力してください', 'error'); return; }
  const sc = {
    id: editingSchedId || String(Date.now()),
    date,
    time: document.getElementById('sf-time').value,
    endTime: document.getElementById('sf-end-time').value,
    type: document.getElementById('sf-type').value,
    category: document.getElementById('sf-category').value,
    opponent: document.getElementById('sf-opponent').value,
    title: document.getElementById('sf-title').value,
    venue: document.getElementById('sf-venue').value,
    competition: document.getElementById('sf-competition').value,
    notes: document.getElementById('sf-notes').value,
    posted: editingSchedId ? (schedules.find(s => s.id === editingSchedId)?.posted || false) : false,
    matchId: editingSchedId ? (schedules.find(s => s.id === editingSchedId)?.matchId || null) : null,
  };
  if (editingSchedId) {
    const idx = schedules.findIndex(s => s.id === editingSchedId);
    if (idx >= 0) schedules[idx] = sc;
  } else {
    schedules.push(sc);
  }
  saveLocal();
  closeModal('modal-schedule');
  showToast(editingSchedId ? '更新しました' : '追加しました', 'success');
  renderSchedule();
  editingSchedId = null;
}
function deleteSchedule(id) {
  showConfirm('スケジュールを削除', 'この予定を削除しますか？', '削除する', () => {
    schedules = schedules.filter(s => s.id !== id);
    saveLocal();
    renderSchedule();
    showToast('削除しました');
  });
}

// ===== MATCH LIST =====
function renderMatches() {
  let items = [...matches];
  if (matchFilter !== 'all') items = items.filter(m => m.type === matchFilter);
  items.sort((a,b) => a.date < b.date ? 1 : -1);
  const s = getSettings();
  const el = document.getElementById('match-list');
  if (items.length === 0) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">⚽</div><div class="empty-title">試合が登録されていません</div><div class="empty-desc">右上の「+ 新規試合」から試合を登録しましょう</div></div>`;
    return;
  }
  el.innerHTML = items.map(m => {
    const rstr = getResultStr(m);
    const rcls = rstr ? getResultBadgeClass(rstr) : '';
    const typeCls = m.type === '公式戦' ? 'type-official' : m.type === '練習試合' ? 'type-tm' : 'type-fest';
    return `
      <div class="match-card" onclick="openMatchDetail('${m.id}')">
        <div class="match-card-top">
          <span style="font-size:12px;color:var(--c-muted)">${fmtDate(m.date)}</span>
          <span class="chip ${typeCls}" style="margin-left:6px">${m.type}</span>
          ${m.category ? `<span class="chip ${getCatBadgeClass(m.category)}" style="margin-left:4px">${m.category}</span>` : ''}
          <span class="match-card-cat">${m.competition||''}</span>
        </div>
        <div class="match-card-body">
          <span class="match-card-opp">${m.opponent||'---'}</span>
          ${rstr
            ? `<span class="match-card-score">${m.result.myScore} - ${m.result.oppScore}</span><span class="match-card-result ${rcls}">${rstr}</span>`
            : '<span class="no-result-text">結果未登録</span>'}
        </div>
      </div>
    `;
  }).join('');
  // Populate copy-from select in modal
  const copySelect = document.getElementById('nm-copy');
  copySelect.innerHTML = '<option value="">引き継がない</option>' + items.slice(0,10).map(m => `<option value="${m.id}">${fmtDate(m.date)} ${m.opponent}</option>`).join('');
}
function openMatchCreateModal(prefill = {}) {
  document.getElementById('nm-opponent').value = prefill.opponent || '';
  document.getElementById('nm-date').value = prefill.date || todayStr();
  document.getElementById('nm-type').value = prefill.type || '公式戦';
  document.getElementById('nm-category').value = prefill.category || '';
  document.getElementById('nm-competition').value = prefill.competition || '';
  document.getElementById('nm-venue').value = prefill.venue || '';
  const cat = prefill.category || '';
  document.getElementById('nm-category').value = cat;
  updateFormationSelect('nm-formation', cat);
  openModal('modal-match-create');
}
function createMatch() {
  const opponent = document.getElementById('nm-opponent').value.trim();
  const date = document.getElementById('nm-date').value;
  if (!opponent) { showToast('相手チーム名を入力してください', 'error'); return; }
  if (!date) { showToast('日付を入力してください', 'error'); return; }

  const formation = document.getElementById('nm-formation').value;
  const copyId = document.getElementById('nm-copy').value;
  let lineup = {}, bench = [], subs = [];
  if (copyId) {
    const src = matches.find(m => m.id === copyId);
    if (src) { lineup = { ...src.lineup }; bench = [...(src.bench||[])]; }
  }

  const m = {
    id: String(Date.now()),
    opponent,
    date,
    type: document.getElementById('nm-type').value,
    category: document.getElementById('nm-category').value,
    competition: document.getElementById('nm-competition').value,
    venue: document.getElementById('nm-venue').value,
    formation,
    lineup,
    bench,
    subs,
    result: null,
  };
  matches.unshift(m);
  saveLocal();
  closeModal('modal-match-create');
  openMatchDetail(m.id);
}

// ===== MATCH DETAIL =====
function openMatchDetail(matchId) {
  const m = matches.find(m => m.id === matchId);
  if (!m) return;
  currentMatch = m;
  navHistory.push(currentPage);
  showPageRaw('page-match-detail');
  renderMatchDetail();
  switchMatchTab('board');
}
function showPageRaw(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const t = document.getElementById(pageId);
  if (t) { t.classList.add('active'); currentPage = pageId; }
}
function renderMatchDetail() {
  if (!currentMatch) return;
  const m = currentMatch;
  const s = getSettings();
  document.getElementById('md-opponent').textContent = `vs ${m.opponent}`;
  const meta = [
    fmtDateFull(m.date),
    m.type,
    m.category,
    m.competition,
    m.venue,
  ].filter(Boolean);
  document.getElementById('md-meta').innerHTML = meta.map(t => `<span class="match-meta-item">${t}</span>`).join('');
  // Set formation select
  document.getElementById('formation-select').value = m.formation || '4-3-3';
}
function switchMatchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('active', p.id === 'tab-'+tabId));
  if (tabId === 'board')   renderBoard();
  if (tabId === 'subs')    renderSubs();
  if (tabId === 'bench')   renderBench();
  if (tabId === 'time')    renderTime();
  if (tabId === 'stat')    renderMatchStats();
  if (tabId === 'result')  renderResult();
  if (tabId === 'publish') renderPublish();
}

// ===== BOARD =====
function renderBoard() {
  if (!currentMatch) return;
  const allFmts = getFormationsByCategory(currentMatch.category);
  const f = allFmts[currentMatch.formation] ? currentMatch.formation : Object.keys(allFmts)[0];
  if (f !== currentMatch.formation) { currentMatch.formation = f; saveCurrentMatch(); }
  const positions = allFmts[f];

  // バッジ & フォーメーション選択更新
  const badge = document.getElementById('pitch-mode-badge');
  if (badge) badge.textContent = is8man(currentMatch.category) ? '8人制' : '11人制';
  updateFormationSelect('formation-select', currentMatch.category);
  document.getElementById('formation-select').value = f;
  document.getElementById('formation-label').textContent = f;

  const posEl = document.getElementById('pitch-positions');
  posEl.innerHTML = positions.map(pos => {
    const player = currentMatch.lineup[pos.id];
    const isFilled = !!player;
    const isSelected = selectedPosId === pos.id;
    return `
      <div class="pos-dot ${isFilled ? 'filled' : ''} ${isSelected ? 'selected' : ''}"
           style="left:${pos.x}%;top:${pos.y}%"
           data-pos="${pos.id}"
           onclick="handlePosTap('${pos.id}')">
        ${isFilled
          ? `<span class="pos-num">${player.number||''}</span><span class="pos-pname">${player.name.slice(0,4)}</span>`
          : `<span class="pos-tag">${pos.label}</span>`}
      </div>
    `;
  }).join('');

  renderPlayerStrip();
}
function renderPlayerStrip() {
  if (!currentMatch) return;
  const lineup = currentMatch.lineup || {};
  const assignedIds = new Set(Object.values(lineup).filter(Boolean).map(p => p.id));
  const benchIds = new Set((currentMatch.bench||[]).map(p => p.id));

  const stripEl = document.getElementById('player-strip');
  if (players.length === 0) {
    stripEl.innerHTML = '<div style="padding:12px;font-size:12px;color:var(--c-muted)">選手を登録してください</div>';
    return;
  }
  stripEl.innerHTML = players.sort((a,b) => Number(a.number||99) - Number(b.number||99)).map(p => {
    const placed = assignedIds.has(p.id);
    const benched = benchIds.has(p.id);
    const sel = selectedStripId === p.id;
    return `
      <div class="strip-card ${placed||benched ? 'placed' : ''} ${sel ? 'selected' : ''}"
           data-player="${p.id}"
           onclick="handleStripTap('${p.id}')">
        <span class="strip-num">${p.number||'?'}</span>
        <span class="strip-name">${p.name}</span>
        <span class="strip-pos">${p.mainGroup||''}</span>
      </div>
    `;
  }).join('');

  const hintEl = document.getElementById('strip-hint');
  if (selectedPosId) hintEl.textContent = '選手をタップして配置';
  else if (selectedStripId) hintEl.textContent = 'ポジションをタップして配置';
  else hintEl.textContent = 'ポジション→選手の順にタップ';
}
function handlePosTap(posId) {
  if (!currentMatch) return;
  const lineup = currentMatch.lineup || {};

  if (selectedStripId) {
    // Player is selected → assign to this position
    const player = players.find(p => p.id === selectedStripId);
    if (player) {
      if (lineup[posId]) {
        // Swap: move existing player back to strip
      }
      currentMatch.lineup = { ...lineup, [posId]: player };
      saveCurrentMatch();
      selectedStripId = null;
      selectedPosId = null;
    }
    renderBoard();
    return;
  }

  if (selectedPosId === posId) {
    // Tap filled position again → remove
    if (lineup[posId]) {
      showConfirm('選手を外す', `${lineup[posId].name}をこのポジションから外しますか？`, '外す', () => {
        delete currentMatch.lineup[posId];
        saveCurrentMatch();
        selectedPosId = null;
        renderBoard();
      });
    } else {
      selectedPosId = null;
      renderBoard();
    }
    return;
  }

  if (selectedPosId && lineup[posId]) {
    // Swap two positions
    const tmp = { ...lineup };
    const a = tmp[selectedPosId];
    const b = tmp[posId];
    tmp[selectedPosId] = b || null;
    tmp[posId] = a;
    if (!tmp[selectedPosId]) delete tmp[selectedPosId];
    currentMatch.lineup = tmp;
    saveCurrentMatch();
    selectedPosId = null;
    renderBoard();
    return;
  }

  selectedPosId = posId;
  renderBoard();
}
function handleStripTap(playerId) {
  if (!currentMatch) return;
  const lineup = currentMatch.lineup || {};

  if (selectedPosId) {
    // Position is selected → assign player
    const player = players.find(p => p.id === playerId);
    if (player) {
      // Remove player from other position if already placed
      const existingPos = Object.keys(lineup).find(pid => lineup[pid]?.id === playerId);
      if (existingPos) delete currentMatch.lineup[existingPos];
      currentMatch.lineup = { ...currentMatch.lineup, [selectedPosId]: player };
      saveCurrentMatch();
      selectedPosId = null;
      selectedStripId = null;
    }
    renderBoard();
    return;
  }

  selectedStripId = selectedStripId === playerId ? null : playerId;
  renderBoard();
}

// ===== SUBS =====
function renderSubs() {
  if (!currentMatch) return;
  const subs = currentMatch.subs || [];
  const el = document.getElementById('subs-body');
  if (subs.length === 0) {
    el.innerHTML = '<div class="empty-state" style="padding:24px"><div style="font-size:13px;color:var(--c-muted)">交代はまだ記録されていません</div></div>';
    return;
  }
  el.innerHTML = subs.map((s, i) => `
    <div class="sub-card">
      <span class="sub-min-badge">${s.minute}分</span>
      <div class="sub-info">
        <span class="sub-out">↑ ${s.out}</span>
        <span class="sub-arrow">→</span>
        <span class="sub-in">↓ ${s.in}</span>
      </div>
      <button class="btn btn-ghost btn-sm" style="color:var(--c-red)" onclick="deleteSub(${i})">✕</button>
    </div>
  `).join('');
}
function openSubModal() {
  if (!currentMatch) return;
  const lineup = currentMatch.lineup || {};
  const starters = Object.values(lineup).filter(Boolean);
  // OUT: starters + previous subs who came IN
  const subIns = (currentMatch.subs||[]).map(s => s.in);
  const outOptions = [...starters.map(p => p.name), ...subIns].filter((v,i,a) => a.indexOf(v) === i);
  // IN: anyone not in lineup and not already subbed in
  const lineupIds = starters.map(p => p.id);
  const benchPlayers = currentMatch.bench || [];
  const inOptions = [...benchPlayers.filter(p => !lineupIds.includes(p.id)), ...players.filter(p => !lineupIds.includes(p.id) && !benchPlayers.find(b => b.id === p.id))];
  const allPlayers = players.filter(p => !lineupIds.includes(p.id));

  document.getElementById('sub-minute').value = '';
  document.getElementById('sub-out').innerHTML = outOptions.map(n => `<option value="${n}">${n}</option>`).join('');
  document.getElementById('sub-in').innerHTML = allPlayers.map(p => `<option value="${p.name}">${p.name} (#${p.number||'-'})</option>`).join('');
  openModal('modal-sub');
}
function saveSub() {
  const minute = document.getElementById('sub-minute').value;
  const out = document.getElementById('sub-out').value;
  const inp = document.getElementById('sub-in').value;
  if (!minute || !out || !inp) { showToast('すべての項目を入力してください', 'error'); return; }
  if (!currentMatch.subs) currentMatch.subs = [];
  currentMatch.subs.push({ id: String(Date.now()), minute, out, in: inp });
  saveCurrentMatch();
  closeModal('modal-sub');
  renderSubs();
  showToast('交代を記録しました', 'success');
}
function deleteSub(idx) {
  showConfirm('交代を削除', 'この交代記録を削除しますか？', '削除する', () => {
    currentMatch.subs.splice(idx, 1);
    saveCurrentMatch();
    renderSubs();
  });
}

// ===== BENCH =====
function renderBench() {
  if (!currentMatch) return;
  const bench = currentMatch.bench || [];
  const el = document.getElementById('bench-body');
  if (bench.length === 0) {
    el.innerHTML = '<div class="empty-state" style="padding:24px"><div style="font-size:13px;color:var(--c-muted)">ベンチ入り選手はいません</div></div>';
    return;
  }
  el.innerHTML = '<div class="list-section">' + bench.map((p, i) => `
    <div class="list-item">
      <span class="list-num">${p.number||'?'}</span>
      <span class="list-name">${p.name}</span>
      <span class="list-pos">${p.mainGroup||''}</span>
      <span class="list-grade">${p.grade||''}</span>
      <button class="btn btn-ghost btn-sm list-action" style="color:var(--c-red)" onclick="removeFromBench(${i})">✕</button>
    </div>
  `).join('') + '</div>';
}
function openBenchPicker() {
  if (!currentMatch) return;
  const lineupIds = new Set(Object.values(currentMatch.lineup||{}).filter(Boolean).map(p => p.id));
  const benchIds = new Set((currentMatch.bench||[]).map(p => p.id));
  const available = players.filter(p => !lineupIds.has(p.id) && !benchIds.has(p.id));
  const el = document.getElementById('bench-picker-list');
  if (available.length === 0) {
    el.innerHTML = '<div style="padding:16px;font-size:13px;color:var(--c-muted);text-align:center">追加できる選手がいません</div>';
  } else {
    el.innerHTML = '<div class="list-section">' + available.map(p => `
      <div class="list-item" onclick="addToBench('${p.id}')">
        <span class="list-num">${p.number||'?'}</span>
        <span class="list-name">${p.name}</span>
        <span class="list-pos">${p.mainGroup||''}</span>
        <span class="list-grade">${p.grade||''}</span>
      </div>
    `).join('') + '</div>';
  }
  openModal('modal-bench-picker');
}
function addToBench(playerId) {
  const player = players.find(p => p.id === playerId);
  if (!player) return;
  if (!currentMatch.bench) currentMatch.bench = [];
  currentMatch.bench.push(player);
  saveCurrentMatch();
  closeModal('modal-bench-picker');
  renderBench();
}
function removeFromBench(idx) {
  currentMatch.bench.splice(idx, 1);
  saveCurrentMatch();
  renderBench();
}

// ===== TIME =====
function renderTime() {
  if (!currentMatch) return;
  const lineup = currentMatch.lineup || {};
  const subs = currentMatch.subs || [];
  const format = currentMatch.result?.format || '40分×2';
  const totalMins = parseMatchMins(format);

  const allInvolved = [];
  Object.values(lineup).filter(Boolean).forEach(p => {
    if (!allInvolved.find(x => x.id === p.id)) allInvolved.push(p);
  });
  (currentMatch.bench||[]).forEach(p => {
    if (!allInvolved.find(x => x.id === p.id)) allInvolved.push(p);
  });

  const timeMap = {};
  allInvolved.forEach(p => { timeMap[p.id] = { name: p.name, num: p.number, mins: 0 }; });

  // Starters play until subbed off or end
  Object.values(lineup).filter(Boolean).forEach(p => {
    const subOff = subs.find(s => s.out === p.name);
    timeMap[p.id].mins = subOff ? parseInt(subOff.minute) : totalMins;
  });
  // Subs play from when they come on to end
  subs.forEach(s => {
    const player = players.find(p => p.name === s.in);
    if (player) {
      if (!timeMap[player.id]) timeMap[player.id] = { name: player.name, num: player.number, mins: 0 };
      timeMap[player.id].mins = totalMins - parseInt(s.minute);
    }
  });

  const sorted = Object.values(timeMap).sort((a,b) => b.mins - a.mins);
  const el = document.getElementById('time-body');
  if (sorted.length === 0) {
    el.innerHTML = '<div style="padding:16px;font-size:13px;color:var(--c-muted);text-align:center">スターティングメンバーを設定してください</div>';
    return;
  }
  el.innerHTML = sorted.map(t => `
    <div class="time-row">
      <div class="time-row-name">${t.name}</div>
      <div class="time-bar-bg"><div class="time-bar-fill" style="width:${Math.min(100, totalMins > 0 ? (t.mins/totalMins)*100 : 0)}%"></div></div>
      <div class="time-row-mins">${t.mins}分</div>
    </div>
  `).join('');
}

// ===== MATCH STATS =====
function renderMatchStats() {
  if (!currentMatch) return;
  const lineup = currentMatch.lineup || {};
  const subs = currentMatch.subs || [];
  const bench = currentMatch.bench || [];
  const lineupIds = new Set(Object.values(lineup).filter(Boolean).map(p => p.id));
  const subInNames = new Set(subs.map(s => s.in));
  const subOutNames = new Set(subs.map(s => s.out));

  const starters = Object.values(lineup).filter(Boolean);
  const startedAndLeft = starters.filter(p => subOutNames.has(p.name));
  const startedAndStayed = starters.filter(p => !subOutNames.has(p.name));
  const subPlayers = players.filter(p => subInNames.has(p.name));
  const benchOnly = bench.filter(p => !lineupIds.has(p.id) && !subInNames.has(p.name));
  const unused = players.filter(p => !lineupIds.has(p.id) && !subInNames.has(p.name) && !bench.find(b => b.id === p.id));

  function playerItem(p) {
    return `<div class="list-item"><span class="list-num">${p.number||'?'}</span><span class="list-name">${p.name}</span><span class="list-pos">${p.mainGroup||''}</span><span class="list-grade">${p.grade||''}</span></div>`;
  }

  document.getElementById('stat-starters').innerHTML = starters.map(playerItem).join('') || '<div style="padding:12px 14px;font-size:13px;color:var(--c-muted)">スターターなし</div>';
  document.getElementById('stat-subs').innerHTML = subPlayers.map(playerItem).join('') || '<div style="padding:12px 14px;font-size:13px;color:var(--c-muted)">交代出場なし</div>';
  document.getElementById('stat-unused').innerHTML = [...benchOnly, ...unused].map(playerItem).join('') || '<div style="padding:12px 14px;font-size:13px;color:var(--c-muted)">全員出場</div>';
}

// ===== RESULT =====
let goalRows = [];
let concedeRows = [];
function renderResult() {
  if (!currentMatch) return;
  const r = currentMatch.result;
  document.getElementById('result-my-score').value = r?.myScore ?? 0;
  document.getElementById('result-opp-score').value = r?.oppScore ?? 0;
  document.getElementById('result-format').value = r?.format || '40分×2';
  document.getElementById('result-image').value = r?.imageUrl || '';

  goalRows = r?.goals ? [...r.goals] : [];
  concedeRows = r?.concedes ? [...r.concedes] : [];
  renderGoalRows();
  renderConcedeRows();
}
function renderGoalRows() {
  const el = document.getElementById('goals-body');
  const lineup = currentMatch?.lineup || {};
  const subIns = (currentMatch?.subs||[]).map(s => s.in);
  // Starters and subs first, then rest — all with jersey number
  const lineupPlayers = Object.values(lineup).filter(Boolean);
  const subPlayers = players.filter(p => subIns.includes(p.name));
  const otherPlayers = players.filter(p => !lineupPlayers.find(lp => lp.id === p.id) && !subPlayers.find(sp => sp.id === p.id));
  const orderedPlayers = [...lineupPlayers, ...subPlayers, ...otherPlayers]
    .filter((p, i, a) => a.findIndex(x => x.name === p.name) === i);
  const playerOpts = (selectedName) => orderedPlayers.map(p => {
    const label = p.number ? `#${p.number} ${p.name}` : p.name;
    return `<option value="${p.name}" ${selectedName===p.name?'selected':''}>${label}</option>`;
  }).join('');

  el.innerHTML = goalRows.map((g, i) => `
    <div class="goal-entry-row">
      <input class="goal-min form-input" type="text" placeholder="分" value="${g.minute||''}" onchange="goalRows[${i}].minute=this.value">
      <select class="form-select" onchange="goalRows[${i}].scorer=this.value">
        <option value="">得点者</option>
        ${playerOpts(g.scorer)}
      </select>
      <select class="form-select" onchange="goalRows[${i}].assist=this.value">
        <option value="">アシスト</option>
        ${playerOpts(g.assist)}
      </select>
      <button class="btn-del-row" onclick="goalRows.splice(${i},1);renderGoalRows()">✕</button>
    </div>
  `).join('');
}
function addGoalRow() { goalRows.push({minute:'',scorer:'',assist:''}); renderGoalRows(); }
function renderConcedeRows() {
  const el = document.getElementById('concedes-body');
  el.innerHTML = concedeRows.map((c, i) => `
    <div class="goal-entry-row" style="grid-template-columns:55px 1fr 30px;gap:8px">
      <input class="goal-min form-input" type="text" placeholder="分" value="${c.minute||''}" onchange="concedeRows[${i}].minute=this.value">
      <span style="font-size:13px;color:var(--c-muted);display:flex;align-items:center">失点時間</span>
      <button class="btn-del-row" onclick="concedeRows.splice(${i},1);renderConcedeRows()">✕</button>
    </div>
  `).join('');
}
function addConcedeRow() { concedeRows.push({minute:''}); renderConcedeRows(); }
function saveResult() {
  if (!currentMatch) return;
  const my = parseInt(document.getElementById('result-my-score').value) || 0;
  const opp = parseInt(document.getElementById('result-opp-score').value) || 0;
  const format = document.getElementById('result-format').value;
  const imageUrl = document.getElementById('result-image').value;
  const resultStr = my > opp ? '勝利' : my < opp ? '敗戦' : '引き分け';

  currentMatch.result = {
    myScore: my,
    oppScore: opp,
    format,
    imageUrl,
    resultStr,
    goals: [...goalRows.filter(g => g.scorer)],
    concedes: [...concedeRows.filter(c => c.minute)],
    publish: currentMatch.result?.publish ?? true,
    makeNews: currentMatch.result?.makeNews ?? true,
    grandePosted: currentMatch.result?.grandePosted || false,
    grandeNewsId: currentMatch.result?.grandeNewsId || null,
  };
  saveCurrentMatch();
  showToast('結果を保存しました', 'success');
  renderPublish();
  switchMatchTab('publish');
}

// ===== PUBLISH =====
function renderPublish() {
  if (!currentMatch) return;
  const r = currentMatch.result;
  const statusIcon = document.getElementById('publish-status-icon');
  const statusText = document.getElementById('publish-status-text');
  const statusSub = document.getElementById('publish-status-sub');
  const unpublishBtn = document.getElementById('btn-unpublish');
  const articlePreview = document.getElementById('hp-article-preview');
  const articleText = document.getElementById('hp-article-text');

  if (!r || r.myScore == null) {
    statusIcon && (statusIcon.textContent = '📋');
    statusText && (statusText.textContent = '結果未入力');
    statusSub && (statusSub.textContent = '先に「結果」タブで試合結果を保存してください');
    if (articlePreview) articlePreview.classList.add('hidden');
    return;
  }

  document.getElementById('toggle-publish').checked = r.publish !== false;
  document.getElementById('toggle-make-news').checked = r.makeNews !== false;

  if (r.grandePosted) {
    statusIcon && (statusIcon.textContent = '✅');
    statusText && (statusText.textContent = 'ホームページに公開済み');
    statusSub && (statusSub.textContent = '更新するには再度「公開する」を押してください');
    unpublishBtn && (unpublishBtn.style.display = '');
  } else {
    statusIcon && (statusIcon.textContent = '📋');
    statusText && (statusText.textContent = `${r.resultStr} ${r.myScore}-${r.oppScore}`);
    statusSub && (statusSub.textContent = '公開ボタンを押すとホームページに反映されます');
    unpublishBtn && (unpublishBtn.style.display = 'none');
  }

  const article = buildNewsArticle(currentMatch);
  if (articleText) articleText.textContent = article;
  if (articlePreview) articlePreview.classList.remove('hidden');
}
function fmtDateJP(s) {
  if (!s) return '';
  const d = new Date(s + 'T00:00:00');
  return `${d.getMonth()+1}月${d.getDate()}日`;
}

function buildNewsArticle(m) {
  if (!m.result) return '';
  const r = m.result;
  const s = getSettings();

  // 1行目: 日付　「カテゴリー」
  let article = fmtDateJP(m.date);
  if (m.category) article += `　「${m.category}」`;
  article += '\n';

  // 本文
  const compName = m.competition || m.type || '試合';
  article += `本日は「${compName}」が行われ、${m.opponent}さんと対戦しました。\n`;
  article += `対戦していただいた${m.opponent}さん、応援いただいた保護者の皆さま、ありがとうございました。\n`;
  article += '\n';

  // スコア
  article += `試合結果：${s.clubName||'自チーム'} ${r.myScore} - ${r.oppScore} ${m.opponent}\n`;

  // 得点者
  if (r.goals && r.goals.length > 0) {
    article += '\n【得点者】\n';
    r.goals.forEach(g => {
      let line = g.scorer || '';
      if (g.minute) line = `${g.minute}分　${line}`;
      if (g.assist) line += `（アシスト：${g.assist}）`;
      article += line + '\n';
    });
  }

  // 会場
  if (m.venue) {
    article += '\n【会場】\n' + m.venue + '\n';
  }

  return article;
}
function buildNewsPost(m) {
  const s = getSettings();
  const r = m.result;
  const resultStr = r.myScore > r.oppScore ? '勝利' : r.myScore < r.oppScore ? '敗戦' : '引き分け';
  const scorers = (r.goals||[]).reduce((acc, g) => {
    if (!g.scorer) return acc;
    const ex = acc.find(x => x.name === g.scorer);
    if (ex) ex.goals++;
    else acc.push({ name: g.scorer, goals: 1 });
    return acc;
  }, []);
  const dateTag = m.date.replace(/-/g,'');
  const compTag = (m.competition||m.type).replace(/[^a-zA-Z0-9ぁ-ん亜-熙]/g,'').slice(0,6);
  return {
    id: `match_${dateTag}_${compTag}`,
    title: `${fmtDateFull(m.date)} vs ${m.opponent} ${r.myScore}-${r.oppScore} ${resultStr}`,
    category: m.category || 'クラブニュース',
    type: '試合結果',
    date: m.date,
    body: buildNewsArticle(m),
    score: `${r.myScore}-${r.oppScore}`,
    image: r.imageUrl || null,
    source: 'matchPlanner',
    scorers,
    published: r.publish !== false,
  };
}
async function publishToHP() {
  if (!currentMatch?.result) { showToast('結果を先に保存してください', 'error'); return; }
  currentMatch.result.publish = document.getElementById('toggle-publish').checked;
  currentMatch.result.makeNews = document.getElementById('toggle-make-news').checked;

  const s = getSettings();
  if (!isCloudConfigured(s)) {
    showToast('設定でFirebase URLとシークレットを設定してください', 'error');
    return;
  }

  // Build and upsert post locally
  if (currentMatch.result.makeNews) {
    const post = buildNewsPost(currentMatch);
    const localIdx = posts.findIndex(p => p.id === post.id);
    if (localIdx >= 0) posts[localIdx] = post; else posts.unshift(post);
  }
  currentMatch.result.grandePosted = true;
  currentMatch.result.grandeNewsId = buildNewsPost(currentMatch).id;
  saveCurrentMatch();
  saveLocal();

  setSyncIcon('💾');
  try {
    const res = await fetch(`${getFirebaseUrl(s)}.json?auth=${s.firebaseSecret}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ players, matches, schedules, posts, opponents }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    setSyncIcon('☁️');
    showToast('ホームページに公開しました！', 'success');
    renderPublish();
  } catch(e) {
    setSyncIcon('⚠️');
    showToast('公開失敗: ' + e.message, 'error');
  }
}
async function unpublish() {
  if (!currentMatch?.result) return;
  const postId = currentMatch.result.grandeNewsId;
  if (!postId) { showToast('投稿IDが見つかりません', 'error'); return; }

  const s = getSettings();
  if (!isCloudConfigured(s)) { showToast('設定でFirebase URLとシークレットを設定してください', 'error'); return; }

  posts = posts.filter(p => p.id !== postId);
  currentMatch.result.grandePosted = false;
  currentMatch.result.grandeNewsId = null;
  saveCurrentMatch();
  saveLocal();

  setSyncIcon('💾');
  try {
    const res = await fetch(`${getFirebaseUrl(s)}.json?auth=${s.firebaseSecret}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ players, matches, schedules, posts, opponents }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    setSyncIcon('☁️');
    showToast('公開を取り消しました');
    renderPublish();
  } catch(e) {
    setSyncIcon('⚠️');
    showToast('取り消し失敗: ' + e.message, 'error');
  }
}

// ===== PLAYERS =====
function renderPlayers() {
  // Build filter chips
  const filterEl = document.getElementById('player-filter-bar');
  const grades = [...new Set(players.map(p => p.grade).filter(Boolean))];
  filterEl.innerHTML = `
    <button class="player-filter-chip ${playerGradeFilter==='all'?'active':''}" onclick="setPlayerFilter('all')">すべて</button>
    ${grades.map(g => `<button class="player-filter-chip ${playerGradeFilter===g?'active':''}" onclick="setPlayerFilter('${g}')">${g}</button>`).join('')}
    <button class="player-filter-chip ${playerPosFilter==='GK'?'active':''}" onclick="setPlayerPosFilter('GK')">GK</button>
    <button class="player-filter-chip ${playerPosFilter==='DF'?'active':''}" onclick="setPlayerPosFilter('DF')">DF</button>
    <button class="player-filter-chip ${playerPosFilter==='MF'?'active':''}" onclick="setPlayerPosFilter('MF')">MF</button>
    <button class="player-filter-chip ${playerPosFilter==='FW'?'active':''}" onclick="setPlayerPosFilter('FW')">FW</button>
  `;

  let filtered = [...players];
  if (playerGradeFilter !== 'all') filtered = filtered.filter(p => p.grade === playerGradeFilter);
  if (playerPosFilter !== 'all') filtered = filtered.filter(p => (p.mainGroup||'').toUpperCase() === playerPosFilter);
  filtered.sort((a,b) => Number(a.number||99) - Number(b.number||99));

  const el = document.getElementById('player-list-body');
  if (filtered.length === 0) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">👤</div><div class="empty-title">${players.length===0?'選手が登録されていません':'該当する選手がいません'}</div></div>`;
    return;
  }
  el.innerHTML = filtered.map((p, i) => {
    const realIdx = players.indexOf(p);
    const initials = p.name ? p.name[0] : '?';
    return `
      <div class="player-list-item" onclick="openPlayerModal(${realIdx})">
        <div class="player-avatar">${p.number || initials}</div>
        <div class="player-item-info">
          <div class="player-item-name">${p.name}</div>
          <div class="player-item-meta">
            ${p.nameRoman ? `<span style="font-size:11px;color:var(--c-muted);font-family:'Oswald',sans-serif;letter-spacing:0.03em">${p.nameRoman}</span>` : ''}
            ${[p.grade, p.mainGroup, p.detailPos].filter(Boolean).join(' · ')}
          </div>
        </div>
        <div class="player-item-stats">
          <button class="btn btn-ghost btn-sm" style="color:var(--c-red);font-size:12px" onclick="event.stopPropagation();deletePlayer(${realIdx})">削除</button>
        </div>
      </div>
    `;
  }).join('');
}
function setPlayerFilter(grade) {
  playerGradeFilter = grade;
  playerPosFilter = 'all';
  renderPlayers();
}
function setPlayerPosFilter(pos) {
  playerPosFilter = playerPosFilter === pos ? 'all' : pos;
  renderPlayers();
}
function openPlayerModal(idx = null) {
  editingPlayerIdx = idx;
  const title = document.getElementById('modal-player-title');
  if (idx !== null && players[idx]) {
    const p = players[idx];
    title.textContent = '選手を編集';
    document.getElementById('pf-name').value = p.name || '';
    document.getElementById('pf-name-roman').value = p.nameRoman || '';
    document.getElementById('pf-number').value = p.number || '';
    document.getElementById('pf-grade').value = p.grade || '';
    document.getElementById('pf-main-group').value = p.mainGroup || '';
    document.getElementById('pf-detail-pos').value = p.detailPos || '';
    document.getElementById('pf-sub').value = p.sub || '';
    document.getElementById('pf-photo').value = p.photo || '';
    document.getElementById('pf-profile').value = p.profile || '';
  } else {
    title.textContent = '選手を追加';
    document.getElementById('pf-name').value = '';
    document.getElementById('pf-name-roman').value = '';
    document.getElementById('pf-number').value = '';
    document.getElementById('pf-grade').value = '';
    document.getElementById('pf-main-group').value = '';
    document.getElementById('pf-detail-pos').value = '';
    document.getElementById('pf-sub').value = '';
    document.getElementById('pf-photo').value = '';
    document.getElementById('pf-profile').value = '';
  }
  openModal('modal-player');
}
function savePlayerForm() {
  const name = document.getElementById('pf-name').value.trim();
  if (!name) { showToast('氏名を入力してください', 'error'); return; }
  const mainGroup = document.getElementById('pf-main-group').value.trim().toUpperCase();
  const p = {
    id: (editingPlayerIdx !== null && players[editingPlayerIdx]) ? players[editingPlayerIdx].id : String(Date.now()),
    name,
    nameRoman: document.getElementById('pf-name-roman').value.trim().toUpperCase(),
    number: document.getElementById('pf-number').value,
    grade: document.getElementById('pf-grade').value,
    mainGroup,
    detailPos: document.getElementById('pf-detail-pos').value,
    sub: document.getElementById('pf-sub').value,
    photo: document.getElementById('pf-photo').value,
    profile: document.getElementById('pf-profile').value,
    main: mainGroup,
  };
  if (editingPlayerIdx !== null && players[editingPlayerIdx]) {
    players[editingPlayerIdx] = p;
  } else {
    players.push(p);
  }
  saveLocal();
  closeModal('modal-player');
  showToast(editingPlayerIdx !== null ? '更新しました' : '追加しました', 'success');
  renderPlayers();
  editingPlayerIdx = null;
}
function deletePlayer(idx) {
  showConfirm('選手を削除', `${players[idx].name}を削除しますか？`, '削除する', () => {
    players.splice(idx, 1);
    saveLocal();
    renderPlayers();
    showToast('削除しました');
  });
}

// ===== OPPONENTS =====
const OPP_CAT_ALL = ['U15','U14','U13','U12','U11','U10','U9','U8'];
const OPP_IMPORT_COL_MAP = {
  'チーム名':'name','名前':'name',
  '略称':'shortName','short':'shortName',
  'カテゴリー':'categories','category':'categories',
  'エンブレム':'emblem','エンブレムurl':'emblem','エンブレムURL':'emblem','画像':'emblem','画像url':'emblem','画像URL':'emblem',
  'ホームページ':'url','ホームページurl':'url','ホームページURL':'url','hp':'url','url':'url','URL':'url',
  'instagram':'instagram','Instagram':'instagram','インスタ':'instagram',
  '備考':'notes','メモ':'notes',
};

function findOpponentByName(name) {
  if (!name || !opponents.length) return null;
  return opponents.find(o => o.name === name || o.shortName === name) || null;
}

function oppEmblemHtml(opp, size = 36) {
  if (!opp) return '';
  const s2 = Math.round(size * 0.4);
  if (opp.emblem) {
    return `<img src="${opp.emblem}" style="width:${size}px;height:${size}px;object-fit:contain;border-radius:6px" onerror="this.outerHTML='<div style=\\'width:${size}px;height:${size}px;border-radius:50%;background:var(--c-border);display:flex;align-items:center;justify-content:center;font-size:${s2}px;font-weight:700;\\'>${(opp.name||'?')[0]}</div>'">`;
  }
  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:var(--c-border);display:flex;align-items:center;justify-content:center;font-size:${s2}px;font-weight:700;color:var(--c-muted)">${(opp.name||'?')[0]}</div>`;
}

// ----- CRUD -----
function renderOpponents() {
  const q = oppSearchQuery.toLowerCase();
  let filtered = q
    ? opponents.filter(o => (o.name||'').toLowerCase().includes(q) || (o.shortName||'').toLowerCase().includes(q))
    : [...opponents];
  filtered.sort((a,b) => (a.name||'') < (b.name||'') ? -1 : 1);

  const el = document.getElementById('opponent-list-body');
  if (!el) return;
  if (opponents.length === 0) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">🆚</div><div class="empty-title">対戦相手が登録されていません</div><div class="empty-desc">「+追加」またはExcelインポートで登録しましょう</div></div>`;
    return;
  }
  if (filtered.length === 0) {
    el.innerHTML = `<div class="empty-state"><div class="empty-title">「${oppSearchQuery}」に一致するチームがありません</div></div>`;
    return;
  }
  el.innerHTML = filtered.map(o => {
    const realIdx = opponents.indexOf(o);
    const cats = Array.isArray(o.categories) ? o.categories.join(' · ') : (o.categories||'');
    return `
      <div class="opp-card">
        <div class="opp-card-emblem">${oppEmblemHtml(o, 44)}</div>
        <div class="opp-card-info">
          <div class="opp-card-name">${o.name}</div>
          <div class="opp-card-meta">
            ${o.shortName ? `<span class="opp-short">${o.shortName}</span>` : ''}
            ${cats ? `<span>${cats}</span>` : ''}
          </div>
          ${(o.url || o.instagram) ? `<div class="opp-card-links">
            ${o.url ? `<a href="${o.url}" target="_blank" style="font-size:11px;color:var(--c-blue)">🌐 HP</a>` : ''}
            ${o.instagram ? `<span style="font-size:11px;color:var(--c-purple)">📷 ${o.instagram}</span>` : ''}
          </div>` : ''}
        </div>
        <div class="opp-card-actions">
          <button class="btn btn-secondary btn-sm" onclick="openOpponentModal(${realIdx})">編集</button>
          <button class="btn btn-ghost btn-sm" style="color:var(--c-red);font-size:12px" onclick="deleteOpponent(${realIdx})">削除</button>
        </div>
      </div>
    `;
  }).join('');
}

function openOpponentModal(idx = null) {
  editingOpponentIdx = idx;
  const sel = (idx !== null && opponents[idx]) ? (opponents[idx].categories || []) : [];
  document.getElementById('of-categories').innerHTML = OPP_CAT_ALL.map(cat => `
    <label class="cat-check-label">
      <input type="checkbox" class="of-cat-check" value="${cat}" ${sel.includes(cat)?'checked':''}> ${cat}
    </label>
  `).join('');
  const title = document.getElementById('modal-opponent-title');
  if (idx !== null && opponents[idx]) {
    const o = opponents[idx];
    title.textContent = '対戦相手を編集';
    document.getElementById('of-name').value = o.name || '';
    document.getElementById('of-short').value = o.shortName || '';
    document.getElementById('of-emblem').value = o.emblem || '';
    document.getElementById('of-url').value = o.url || '';
    document.getElementById('of-instagram').value = o.instagram || '';
    document.getElementById('of-notes').value = o.notes || '';
  } else {
    title.textContent = '対戦相手を追加';
    ['of-name','of-short','of-emblem','of-url','of-instagram','of-notes'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  }
  openModal('modal-opponent');
}

function saveOpponentForm() {
  const name = document.getElementById('of-name').value.trim();
  if (!name) { showToast('チーム名を入力してください', 'error'); return; }
  const categories = [...document.querySelectorAll('.of-cat-check:checked')].map(cb => cb.value);
  const o = {
    id: (editingOpponentIdx !== null && opponents[editingOpponentIdx]) ? opponents[editingOpponentIdx].id : String(Date.now()),
    name,
    shortName: document.getElementById('of-short').value.trim(),
    categories,
    emblem: document.getElementById('of-emblem').value.trim(),
    url: document.getElementById('of-url').value.trim(),
    instagram: document.getElementById('of-instagram').value.trim(),
    notes: document.getElementById('of-notes').value.trim(),
  };
  if (editingOpponentIdx !== null && opponents[editingOpponentIdx]) {
    opponents[editingOpponentIdx] = o;
  } else {
    opponents.push(o);
  }
  saveLocal();
  closeModal('modal-opponent');
  showToast(editingOpponentIdx !== null ? '更新しました' : '追加しました', 'success');
  renderOpponents();
  editingOpponentIdx = null;
}

function deleteOpponent(idx) {
  showConfirm('対戦相手を削除', `${opponents[idx].name}を削除しますか？`, '削除する', () => {
    opponents.splice(idx, 1);
    saveLocal();
    renderOpponents();
    showToast('削除しました');
  });
}

// ----- PICKER -----
function openOpponentPicker(target) {
  oppPickerTarget = target;
  document.getElementById('opp-picker-search').value = '';
  renderOpponentPickerList('');
  openModal('modal-opponent-picker');
  setTimeout(() => document.getElementById('opp-picker-search')?.focus(), 150);
}

function renderOpponentPickerList(query) {
  const q = query.toLowerCase();
  const filtered = opponents
    .filter(o => !q || (o.name||'').toLowerCase().includes(q) || (o.shortName||'').toLowerCase().includes(q))
    .sort((a,b) => (a.name||'') < (b.name||'') ? -1 : 1);
  const el = document.getElementById('opp-picker-list');
  if (!el) return;
  if (opponents.length === 0) {
    el.innerHTML = '<div style="padding:20px;text-align:center;font-size:13px;color:var(--c-muted)">対戦相手マスターが空です<br>先に登録してください</div>';
    return;
  }
  if (filtered.length === 0) {
    el.innerHTML = `<div style="padding:20px;text-align:center;font-size:13px;color:var(--c-muted)">「${query}」に一致するチームがありません</div>`;
    return;
  }
  el.innerHTML = filtered.map(o => `
    <div class="opp-picker-item" onclick="selectOpponentFromPicker('${o.id}')">
      <div class="opp-pick-emblem">${oppEmblemHtml(o, 36)}</div>
      <div class="opp-pick-info">
        <div class="opp-pick-name">${o.name}</div>
        ${o.shortName ? `<div class="opp-pick-short">${o.shortName}</div>` : ''}
      </div>
      ${(o.categories||[]).length ? `<div class="opp-pick-cats">${o.categories.join(' ')}</div>` : ''}
    </div>
  `).join('');
}

function selectOpponentFromPicker(oppId) {
  const opp = opponents.find(o => o.id === oppId);
  if (!opp) return;
  const nameEl = document.getElementById(oppPickerTarget === 'schedule' ? 'sf-opponent' : 'nm-opponent');
  const idEl   = document.getElementById(oppPickerTarget === 'schedule' ? 'sf-opponent-id' : 'nm-opponent-id');
  if (nameEl) nameEl.value = opp.name;
  if (idEl)   idEl.value   = opp.id;
  closeModal('modal-opponent-picker');
  showToast(`${opp.name}を選択しました`, 'success');
}

// ----- IMPORT -----
function downloadOpponentTemplate() {
  const wsData = [
    ['チーム名','略称','カテゴリー','エンブレムURL','ホームページURL','Instagram','備考'],
    ['○○FC','○○','U15','https://...','https://...','@xxx',''],
    ['△△SC','△△','U15,U12','','','','強豪'],
  ];
  if (typeof XLSX === 'undefined') {
    const csv = '﻿' + wsData.map(r => r.map(c => `"${c}"`).join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = '対戦相手テンプレート.csv'; a.click();
    return;
  }
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  ws['!cols'] = [{wch:16},{wch:8},{wch:14},{wch:30},{wch:30},{wch:16},{wch:20}];
  XLSX.utils.book_append_sheet(wb, ws, '対戦相手データ');
  XLSX.writeFile(wb, '対戦相手テンプレート.xlsx');
  showToast('テンプレートをダウンロードしました', 'success');
}

function triggerOpponentImport() { document.getElementById('opponent-import-input').click(); }

function handleOpponentImportFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const wb = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rawRows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      const parsed = parseOpponentImportRows(rawRows);
      if (!parsed.length) { showToast('インポートできるデータが見つかりませんでした', 'error'); return; }
      oppImportPreviewRows = parsed;
      showOpponentImportPreview(parsed);
    } catch(err) { showToast('ファイル読み込みエラー: ' + err.message, 'error'); }
    event.target.value = '';
  };
  reader.readAsArrayBuffer(file);
}

function parseOpponentImportRows(rawRows) {
  if (!rawRows || rawRows.length < 2) return [];
  const headers = rawRows[0].map(h => String(h||'').trim());
  const fieldMap = {};
  headers.forEach((h, i) => {
    const key = OPP_IMPORT_COL_MAP[h] || OPP_IMPORT_COL_MAP[h.toLowerCase()];
    if (key) fieldMap[i] = key;
  });
  return rawRows.slice(1)
    .filter(row => row.some(c => c !== '' && c != null))
    .map(row => {
      const o = {};
      Object.entries(fieldMap).forEach(([ci, field]) => {
        const val = String(row[ci]||'').trim();
        if (val) o[field] = val;
      });
      o.categories = o.categories
        ? o.categories.split(/[,、・\s]+/).map(c => c.trim()).filter(Boolean)
        : [];
      return o;
    })
    .filter(o => o.name);
}

function showOpponentImportPreview(parsed) {
  document.getElementById('opp-import-preview-info').innerHTML = `
    <div class="import-info-box">
      <strong>${parsed.length}件</strong>のチームデータを読み込みました。<br>
      <span style="color:var(--c-text2)">同名チームは上書き、新規チームは追加されます。</span>
    </div>
  `;
  const rows = parsed.slice(0,30).map(o => `
    <tr>
      <td>${o.name}</td>
      <td>${o.shortName||'-'}</td>
      <td>${(o.categories||[]).join(', ')||'-'}</td>
    </tr>
  `).join('');
  const more = parsed.length > 30 ? `<tr><td colspan="3" style="text-align:center;color:var(--c-muted);padding:8px">他 ${parsed.length-30} 件...</td></tr>` : '';
  document.getElementById('opp-import-preview-table').innerHTML = `
    <div class="import-preview-table">
      <table><thead><tr><th>チーム名</th><th>略称</th><th>カテゴリー</th></tr></thead>
      <tbody>${rows}${more}</tbody></table>
    </div>
  `;
  openModal('modal-opponent-import');
}

function confirmOpponentImport() {
  if (!oppImportPreviewRows.length) return;
  let added = 0, updated = 0;
  oppImportPreviewRows.forEach(imp => {
    const existIdx = opponents.findIndex(o => o.name === imp.name);
    const o = {
      id: existIdx >= 0 ? opponents[existIdx].id : String(Date.now() + Math.random()),
      name: imp.name, shortName: imp.shortName||'',
      categories: imp.categories||[], emblem: imp.emblem||'',
      url: imp.url||'', instagram: imp.instagram||'', notes: imp.notes||'',
    };
    if (existIdx >= 0) { opponents[existIdx] = o; updated++; }
    else { opponents.push(o); added++; }
  });
  saveLocal();
  closeModal('modal-opponent-import');
  oppImportPreviewRows = [];
  showToast(`インポート完了: 追加${added}件・更新${updated}件`, 'success');
  renderOpponents();
}

// ===== PLAYER IMPORT =====
const IMPORT_COL_MAP = {
  '氏名':'name','名前':'name',
  'ローマ字':'nameRoman','ローマ字名':'nameRoman','roman':'nameRoman','英字':'nameRoman',
  '背番号':'number','番号':'number',
  'ポジション':'mainGroup','役職':'mainGroup','pos':'mainGroup',
  '詳細ポジション':'detailPos','詳細':'detailPos',
  'サブポジション':'sub','サブ':'sub',
  '学年':'grade',
  '写真url':'photo','写真URL':'photo','写真':'photo',
  'プロフィール':'profile','紹介':'profile','コメント':'profile',
};

function downloadPlayerTemplate() {
  const wsData = [
    ['氏名', 'ローマ字', '背番号', 'ポジション', '学年'],
    ['田中辰郎', 'TATSURO TANAKA', 10, 'DF', '中2'],
    ['山田太郎', 'TARO YAMADA', 9, 'FW', '小6'],
    ['鈴木一郎', 'ICHIRO SUZUKI', 1, 'GK', '中3'],
    ['田中雅浩', 'MASAHIRO TANAKA', '', '代表', ''],
  ];
  if (typeof XLSX === 'undefined') {
    const csv = '﻿' + wsData.map(r => r.map(c => `"${c}"`).join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = '選手管理テンプレート.csv';
    a.click();
    return;
  }
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  ws['!cols'] = [{wch:12},{wch:20},{wch:6},{wch:10},{wch:6}];
  XLSX.utils.book_append_sheet(wb, ws, '選手データ');
  XLSX.writeFile(wb, '選手管理テンプレート.xlsx');
  showToast('テンプレートをダウンロードしました', 'success');
}

function triggerPlayerImport() {
  document.getElementById('player-import-input').click();
}

function handlePlayerImportFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const wb = XLSX.read(data, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rawRows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      const parsed = parseImportRows(rawRows);
      if (parsed.length === 0) {
        showToast('インポートできるデータが見つかりませんでした', 'error');
        return;
      }
      importPreviewRows = parsed;
      showImportPreview(parsed);
    } catch(err) {
      showToast('ファイル読み込みエラー: ' + err.message, 'error');
    }
    event.target.value = '';
  };
  reader.readAsArrayBuffer(file);
}

function parseImportRows(rawRows) {
  if (!rawRows || rawRows.length < 2) return [];
  const headers = rawRows[0].map(h => String(h || '').trim());
  const fieldMap = {};
  headers.forEach((h, i) => {
    const key = IMPORT_COL_MAP[h] || IMPORT_COL_MAP[h.toLowerCase()];
    if (key) fieldMap[i] = key;
  });
  return rawRows.slice(1)
    .filter(row => row.some(c => c !== '' && c != null))
    .map(row => {
      const p = {};
      Object.entries(fieldMap).forEach(([ci, field]) => {
        const val = row[ci];
        if (val !== '' && val != null) p[field] = String(val).trim();
      });
      return p;
    })
    .filter(p => p.name);
}

function showImportPreview(parsed) {
  document.getElementById('import-preview-info').innerHTML = `
    <div class="import-info-box">
      <strong>${parsed.length}件</strong>の選手データを読み込みました。<br>
      <span style="color:var(--c-text2)">同じ氏名の選手は上書き、新規選手は追加されます。</span>
    </div>
  `;
  const rows = parsed.slice(0, 30).map(p => `
    <tr>
      <td>
        <div>${p.name}</div>
        ${p.nameRoman ? `<div style="font-size:10px;color:var(--c-muted);font-family:'Oswald',sans-serif">${p.nameRoman}</div>` : ''}
      </td>
      <td style="text-align:center">${p.number || '-'}</td>
      <td style="text-align:center">${p.mainGroup || '-'}</td>
      <td style="text-align:center">${p.grade || '-'}</td>
    </tr>
  `).join('');
  const more = parsed.length > 30 ? `<tr><td colspan="4" style="text-align:center;color:var(--c-muted);padding:8px">他 ${parsed.length - 30} 件...</td></tr>` : '';
  document.getElementById('import-preview-table').innerHTML = `
    <div class="import-preview-table">
      <table>
        <thead><tr><th>氏名</th><th>#</th><th>POS</th><th>学年</th></tr></thead>
        <tbody>${rows}${more}</tbody>
      </table>
    </div>
  `;
  openModal('modal-player-import');
}

function confirmPlayerImport() {
  if (importPreviewRows.length === 0) return;
  let added = 0, updated = 0;
  importPreviewRows.forEach(imp => {
    const existIdx = players.findIndex(p => p.name === imp.name);
    const player = {
      id: existIdx >= 0 ? players[existIdx].id : String(Date.now() + Math.random()),
      name: imp.name,
      nameRoman: imp.nameRoman || '',
      number: imp.number || '',
      grade: imp.grade || '',
      mainGroup: imp.mainGroup || '',
      detailPos: imp.detailPos || '',
      sub: imp.sub || '',
      photo: imp.photo || '',
      profile: imp.profile || '',
      main: imp.mainGroup || '',
    };
    if (existIdx >= 0) { players[existIdx] = player; updated++; }
    else { players.push(player); added++; }
  });
  saveLocal();
  closeModal('modal-player-import');
  importPreviewRows = [];
  showToast(`インポート完了: 追加${added}件・更新${updated}件`, 'success');
  renderPlayers();
}

// ===== NEWS =====
function renderNews() {
  const today = todayStr();
  document.getElementById('post-date').value = today;
  renderPostHistory();
}
function switchPostTab(tabId) {
  currentPostTab = tabId;
  document.querySelectorAll('#page-news .tab-btn').forEach(b => b.classList.toggle('active', b.dataset.ptab === tabId));
  document.querySelectorAll('.post-pane').forEach(p => p.classList.toggle('active', p.id === 'post-pane-'+tabId));
  if (tabId === 'history') renderPostHistory();
}
function renderPostHistory() {
  const el = document.getElementById('post-history-list');
  const sorted = [...posts].sort((a,b) => a.date < b.date ? 1 : -1);
  if (sorted.length === 0) {
    el.innerHTML = '<div class="empty-state" style="padding:32px"><div class="empty-icon">📋</div><div class="empty-title">投稿履歴がありません</div></div>';
    return;
  }
  el.innerHTML = sorted.map(p => `
    <div class="post-history-row">
      <div class="post-hist-dot ${p.published ? 'dot-pub' : 'dot-draft'}"></div>
      <div class="post-hist-body">
        <div class="post-hist-title">${p.title}</div>
        <div class="post-hist-meta">${fmtDate(p.date)} · ${p.type} · ${p.published ? '公開中' : '下書き'}</div>
      </div>
      <button class="post-hist-del" onclick="deletePost('${p.id}')">削除</button>
    </div>
  `).join('');
}
async function sendPost() {
  const title = document.getElementById('post-title').value.trim();
  const body = document.getElementById('post-body').value.trim();
  const date = document.getElementById('post-date').value;
  if (!title) { showToast('タイトルを入力してください', 'error'); return; }
  const post = {
    id: `${date.replace(/-/g,'')}_${encodeURIComponent(title).slice(0,20)}_${Date.now()}`,
    title,
    category: document.getElementById('post-category').value,
    type: currentPostType,
    date,
    body,
    image: document.getElementById('post-image').value || null,
    source: 'manualPost',
    published: document.getElementById('post-publish').checked,
  };

  const s = getSettings();
  const idx = posts.findIndex(p => p.id === post.id);
  if (idx >= 0) posts[idx] = post; else posts.unshift(post);
  saveLocal();

  if (!isCloudConfigured(s)) {
    showToast('下書きとして保存しました（クラウド未設定）');
    renderPostHistory();
    return;
  }

  setSyncIcon('💾');
  try {
    const res = await fetch(`${getFirebaseUrl(s)}.json?auth=${s.firebaseSecret}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ players, matches, schedules, posts, opponents }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    setSyncIcon('☁️');
    showToast('投稿しました！', 'success');
    document.getElementById('post-title').value = '';
    document.getElementById('post-body').value = '';
    renderPostHistory();
  } catch(e) {
    setSyncIcon('⚠️');
    showToast('クラウド失敗。ローカル保存しました', 'error');
    renderPostHistory();
  }
}
function previewPost() {
  const title = document.getElementById('post-title').value;
  const body = document.getElementById('post-body').value;
  const prev = document.getElementById('post-preview-area');
  const cont = document.getElementById('post-preview-content');
  if (!title && !body) { showToast('タイトルか本文を入力してください', 'error'); return; }
  cont.innerHTML = `<div style="font-weight:700;margin-bottom:8px">${title}</div><div style="white-space:pre-wrap;font-size:13px;color:var(--c-text2)">${body}</div>`;
  prev.classList.toggle('hidden');
}
async function deletePost(id) {
  showConfirm('投稿を削除', 'この投稿を削除しますか？', '削除する', async () => {
    posts = posts.filter(p => p.id !== id);
    saveLocal();

    const s = getSettings();
    if (isCloudConfigured(s)) {
      try {
        await fetch(`${getFirebaseUrl(s)}.json?auth=${s.firebaseSecret}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ players, matches, schedules, posts, opponents }),
        });
      } catch(e) { /* silent */ }
    }
    renderPostHistory();
    showToast('削除しました');
  });
}

// ===== ANNOUNCEMENT =====
function renderAnnouncement() {
  const today = todayStr();
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  const upcoming = schedules
    .filter(s => (s.type === '試合' || s.type === '大会') && s.date >= weekAgo)
    .sort((a,b) => (a.date+(a.time||'')) < (b.date+(b.time||'')) ? -1 : 1);
  const el = document.getElementById('ann-sched-list');
  if (upcoming.length === 0) {
    el.innerHTML = '<div style="padding:12px;font-size:13px;color:var(--c-muted)">試合スケジュールがありません。先にスケジュールを登録してください。</div>';
  } else {
    el.innerHTML = upcoming.slice(0,5).map(sc => `
      <div class="ann-sched-item ${selectedAnnSchedId===sc.id?'selected':''}" onclick="selectAnnSched('${sc.id}')">
        <span class="ann-sched-date">${fmtDate(sc.date)}</span>
        <span class="ann-sched-name">vs ${sc.opponent||'---'}${sc.time?' '+sc.time:''}</span>
        ${sc.category ? `<span class="chip ${getCatBadgeClass(sc.category)}">${sc.category}</span>` : ''}
      </div>
    `).join('');
  }
  if (selectedAnnSchedId && upcoming.find(s => s.id === selectedAnnSchedId)) {
    selectAnnSched(selectedAnnSchedId);
  } else {
    document.getElementById('ann-content-area')?.classList.add('hidden');
    document.getElementById('ann-hint')?.classList.remove('hidden');
  }
}
function selectAnnSched(id) {
  selectedAnnSchedId = id;
  document.querySelectorAll('.ann-sched-item').forEach(el => {
    el.classList.toggle('selected', el.onclick?.toString().includes(id));
  });
  const sc = schedules.find(s => s.id === id);
  if (!sc) return;

  document.getElementById('ann-content-area')?.classList.remove('hidden');
  document.getElementById('ann-hint')?.classList.add('hidden');

  renderAnnVsCard(sc);
  renderAnnInfoCard(sc);

  const catMap = { 'U15':'ジュニアユース','U14':'ジュニアユース','U13':'ジュニアユース',
                   'U12':'ジュニア','U11':'ジュニア','U10':'ジュニア','U9':'ジュニア','U8':'ジュニア' };
  if (sc.category && catMap[sc.category]) {
    const catSel = document.getElementById('ann-category');
    if (catSel) catSel.value = catMap[sc.category];
  }
}
function renderAnnVsCard(sc) {
  const vsEl = document.getElementById('ann-vs-card');
  if (!vsEl) return;
  const s = getSettings();
  const opp = findOpponentByName(sc.opponent);
  const homeInitial = (s.clubName||'G')[0];
  const awayHtml = opp
    ? oppEmblemHtml(opp, 52)
    : `<div class="ann-vs-emblem-default">${(sc.opponent||'?')[0]}</div>`;
  vsEl.innerHTML = `
    <div class="ann-vs-card">
      <div class="ann-vs-team">
        <div class="ann-vs-emblem-default">${homeInitial}</div>
        <div class="ann-vs-name">${s.clubName||'自チーム'}</div>
      </div>
      <div class="ann-vs-sep">VS</div>
      <div class="ann-vs-team">
        <div style="display:flex;align-items:center;justify-content:center;width:52px;height:52px">${awayHtml}</div>
        <div class="ann-vs-name">${sc.opponent||'---'}</div>
      </div>
    </div>
  `;
}
function renderAnnInfoCard(sc) {
  const el = document.getElementById('ann-info-card');
  if (!el) return;
  const rows = [];
  if (sc.date) {
    const timeStr = sc.time ? ` ${sc.time} KO` : '';
    rows.push(`<div class="ann-info-row">📅 ${fmtDateFull(sc.date)}${timeStr}</div>`);
  }
  if (sc.venue) rows.push(`<div class="ann-info-row">📍 ${sc.venue}</div>`);
  if (sc.competition) rows.push(`<div class="ann-info-row">🏆 ${sc.competition}</div>`);
  if (sc.category) rows.push(`<div class="ann-info-row"><span class="chip ${getCatBadgeClass(sc.category)}">${sc.category}</span></div>`);
  el.innerHTML = rows.length > 0 ? `<div class="ann-info-card">${rows.join('')}</div>` : '';
}
function generateAnnBase(sc, extraMsg) {
  const s = getSettings();
  let text = `【試合告知】\n`;
  if (sc.competition) text += `大会名：${sc.competition}\n`;
  text += `日時：${fmtDateFull(sc.date)}`;
  if (sc.time) text += ` ${sc.time} キックオフ`;
  text += '\n';
  if (sc.opponent) text += `対戦相手：${sc.opponent}\n`;
  if (sc.venue) text += `会場：${sc.venue}\n`;
  if (sc.category) text += `カテゴリー：${sc.category}\n`;
  text += '\n';
  text += (extraMsg && extraMsg.trim()) ? extraMsg.trim() + '\n' : '応援よろしくお願いします！\n';
  text += `— ${s.clubName||'クラブ'}`;
  return text;
}
function showAnnPreview() {
  const sc = schedules.find(s => s.id === selectedAnnSchedId);
  if (!sc) { showToast('試合を選択してください', 'error'); return; }
  const s = getSettings();
  const extraMsg = (document.getElementById('ann-extra-msg')?.value || '').trim();
  const opp = findOpponentByName(sc.opponent);
  const homeInitial = (s.clubName||'G')[0];
  const awayHtml = opp
    ? oppEmblemHtml(opp, 56)
    : `<div class="ann-preview-emblem-default">${(sc.opponent||'?')[0]}</div>`;
  const metaRows = [];
  if (sc.date) metaRows.push(`<div class="ann-preview-meta-row">📅 ${fmtDateFull(sc.date)}${sc.time?' '+sc.time+' キックオフ':''}</div>`);
  if (sc.venue) metaRows.push(`<div class="ann-preview-meta-row">📍 ${sc.venue}</div>`);
  if (sc.competition) metaRows.push(`<div class="ann-preview-meta-row">🏆 ${sc.competition}</div>`);
  if (sc.category) metaRows.push(`<div class="ann-preview-meta-row"><span class="chip ${getCatBadgeClass(sc.category)}">${sc.category}</span></div>`);
  const bodyText = extraMsg || '応援よろしくお願いします！';
  const previewEl = document.getElementById('ann-preview-content');
  if (!previewEl) return;
  previewEl.innerHTML = `
    <div class="ann-preview-vs">
      <div class="ann-preview-team">
        <div class="ann-preview-emblem-default">${homeInitial}</div>
        <div class="ann-preview-team-name">${s.clubName||'自チーム'}</div>
      </div>
      <div class="ann-preview-vs-text">VS</div>
      <div class="ann-preview-team">
        <div style="width:56px;height:56px;display:flex;align-items:center;justify-content:center">${awayHtml}</div>
        <div class="ann-preview-team-name">${sc.opponent||'---'}</div>
      </div>
    </div>
    <div class="ann-preview-divider"></div>
    <div class="ann-preview-meta">${metaRows.join('')}</div>
    <div class="ann-preview-divider"></div>
    <div class="ann-preview-body">
      <p>${bodyText.replace(/\n/g,'<br>')}</p>
      <p class="ann-preview-sign">— ${s.clubName||'クラブ'}</p>
    </div>
  `;
  openModal('modal-ann-preview');
}
function confirmAnnPost() {
  closeModal('modal-ann-preview');
  postAnnouncement();
}
async function postAnnouncement() {
  const sc = schedules.find(s => s.id === selectedAnnSchedId);
  if (!sc) { showToast('試合を選択してください', 'error'); return; }
  const extraMsg = (document.getElementById('ann-extra-msg')?.value || '').trim();
  const body = generateAnnBase(sc, extraMsg);
  const category = document.getElementById('ann-category').value;

  const sconf = getSettings();
  const post = {
    id: `ann_${selectedAnnSchedId || Date.now()}`,
    title: sc ? `【試合告知】${fmtDate(sc.date)} vs ${sc.opponent}` : '試合告知',
    category,
    type: '試合告知',
    date: sc?.date || todayStr(),
    body,
    image: null,
    source: 'announcement',
    published: true,
  };

  const pidx = posts.findIndex(p => p.id === post.id);
  if (pidx >= 0) posts[pidx] = post; else posts.unshift(post);
  if (sc) {
    sc.posted = true;
    const si = schedules.findIndex(x => x.id === sc.id);
    if (si >= 0) schedules[si] = sc;
  }
  saveLocal();

  if (!isCloudConfigured(sconf)) {
    showToast('告知を保存しました（クラウド未設定）', 'success');
    return;
  }

  setSyncIcon('💾');
  try {
    const res = await fetch(`${getFirebaseUrl(sconf)}.json?auth=${sconf.firebaseSecret}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ players, matches, schedules, posts, opponents }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    setSyncIcon('☁️');
    showToast('告知をホームページに投稿しました！', 'success');
  } catch(e) {
    setSyncIcon('⚠️');
    showToast('失敗: ' + e.message, 'error');
  }
}
function startAnnouncement(schedId) {
  selectedAnnSchedId = schedId;
  pushPage('page-announcement');
}

// ===== RESULT ENTRY (from dashboard) =====
function renderResultEntry() {
  const today = todayStr();
  const pending = matches.filter(m => !m.result?.grandePosted && m.date <= today).sort((a,b) => a.date < b.date ? 1 : -1);
  const el = document.getElementById('result-entry-match-list');
  if (pending.length === 0) {
    el.innerHTML = '<div style="padding:12px;font-size:13px;color:var(--c-muted);text-align:center">未公開の試合はありません</div>';
    return;
  }
  el.innerHTML = pending.map(m => {
    const rstr = getResultStr(m);
    const typeCls = m.type === '公式戦' ? 'type-official' : 'type-tm';
    return `
      <div class="match-card" onclick="openMatchDetail('${m.id}')">
        <div class="match-card-top">
          <span style="font-size:12px;color:var(--c-muted)">${fmtDate(m.date)}</span>
          <span class="chip ${typeCls}" style="margin-left:6px">${m.type}</span>
        </div>
        <div class="match-card-body">
          <span class="match-card-opp">${m.opponent}</span>
          ${rstr
            ? `<span class="match-card-score">${m.result.myScore}-${m.result.oppScore}</span>`
            : '<span class="no-result-text">結果未登録</span>'}
        </div>
      </div>
    `;
  }).join('');
}

// ===== SETTINGS =====
function renderSettingsPage() {
  const s = getSettings();
  document.getElementById('settings-club-name').value       = s.clubName    || '';
  document.getElementById('settings-club-id').value         = s.clubId      || '';
  document.getElementById('settings-firebase-url').value    = s.firebaseUrl || '';
  document.getElementById('settings-firebase-secret').value = s.firebaseSecret || '';
}
function saveSettingsForm() {
  const secret = document.getElementById('settings-firebase-secret').value.trim();
  saveSettings({ firebaseSecret: secret });
  showToast('設定を保存しました', 'success');
  // 保存後すぐにクラウドから読み込む
  if (secret) loadFromCloud();
}

// ===== EVENT BINDINGS =====
function bindEvents() {
  // Bottom nav
  document.querySelectorAll('.bnav-item').forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.bnav));
  });
  // Sidebar nav
  document.querySelectorAll('.nav-item[data-nav]').forEach(item => {
    item.addEventListener('click', () => showPage(item.dataset.nav));
  });
  // Page nav buttons (in more page, etc.)
  document.querySelectorAll('[data-nav]:not(.nav-item)').forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.nav));
  });

  // Dashboard
  document.getElementById('dash-card-ann')?.addEventListener('click', () => pushPage('page-announcement'));
  document.getElementById('dash-card-result')?.addEventListener('click', () => pushPage('page-result-entry'));
  document.getElementById('dash-card-news')?.addEventListener('click', () => pushPage('page-news'));
  document.getElementById('dash-card-player')?.addEventListener('click', () => pushPage('page-players'));
  document.getElementById('dash-today-link')?.addEventListener('click', () => showPage('page-schedule'));
  document.getElementById('dash-next-link')?.addEventListener('click', () => showPage('page-schedule'));
  document.getElementById('dash-results-link')?.addEventListener('click', () => showPage('page-matches'));

  // Schedule
  document.getElementById('btn-add-schedule')?.addEventListener('click', () => openScheduleModal());
  document.querySelectorAll('[data-sfilter]').forEach(btn => {
    btn.addEventListener('click', () => {
      scheduleFilter = btn.dataset.sfilter;
      document.querySelectorAll('[data-sfilter]').forEach(b => b.classList.toggle('active', b.dataset.sfilter === scheduleFilter));
      renderSchedule();
    });
  });
  document.getElementById('btn-schedule-save')?.addEventListener('click', saveScheduleForm);
  document.getElementById('btn-schedule-cancel')?.addEventListener('click', () => closeModal('modal-schedule'));
  document.getElementById('btn-close-schedule-modal')?.addEventListener('click', () => closeModal('modal-schedule'));

  // Match list
  document.getElementById('btn-new-match')?.addEventListener('click', () => openMatchCreateModal());
  document.querySelectorAll('[data-mfilter]').forEach(btn => {
    btn.addEventListener('click', () => {
      matchFilter = btn.dataset.mfilter;
      document.querySelectorAll('[data-mfilter]').forEach(b => b.classList.toggle('active', b.dataset.mfilter === matchFilter));
      renderMatches();
    });
  });
  document.getElementById('btn-match-create-ok')?.addEventListener('click', createMatch);
  document.getElementById('btn-match-create-cancel')?.addEventListener('click', () => closeModal('modal-match-create'));
  document.getElementById('btn-close-match-modal')?.addEventListener('click', () => closeModal('modal-match-create'));
  // カテゴリー変更 → フォーメーション選択肢を自動切り替え
  document.getElementById('nm-category')?.addEventListener('change', () => {
    updateFormationSelect('nm-formation', document.getElementById('nm-category').value);
  });

  // Result entry page
  document.getElementById('btn-create-match-for-result')?.addEventListener('click', () => {
    closeModal('modal-match-create');
    openMatchCreateModal();
  });

  // Match detail
  document.getElementById('btn-back-match')?.addEventListener('click', popPage);
  document.querySelectorAll('#match-tab-bar .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchMatchTab(btn.dataset.tab));
  });
  document.getElementById('btn-change-formation')?.addEventListener('click', () => {
    if (!currentMatch) return;
    const newF = document.getElementById('formation-select').value;
    currentMatch.formation = newF;
    currentMatch.lineup = {};
    saveCurrentMatch();
    renderBoard();
    showToast(`フォーメーションを${newF}に変更しました`);
  });
  document.getElementById('btn-add-sub')?.addEventListener('click', openSubModal);
  document.getElementById('btn-sub-save')?.addEventListener('click', saveSub);
  document.getElementById('btn-sub-cancel')?.addEventListener('click', () => closeModal('modal-sub'));
  document.getElementById('btn-close-sub-modal')?.addEventListener('click', () => closeModal('modal-sub'));
  document.getElementById('btn-add-bench-player')?.addEventListener('click', openBenchPicker);
  document.getElementById('btn-close-bench-modal')?.addEventListener('click', () => closeModal('modal-bench-picker'));
  document.getElementById('btn-add-goal')?.addEventListener('click', addGoalRow);
  document.getElementById('btn-add-concede')?.addEventListener('click', addConcedeRow);
  document.getElementById('btn-save-result')?.addEventListener('click', saveResult);
  document.getElementById('btn-publish-to-hp')?.addEventListener('click', publishToHP);
  document.getElementById('btn-unpublish')?.addEventListener('click', unpublish);

  // Players
  document.getElementById('btn-add-player')?.addEventListener('click', () => openPlayerModal());
  document.getElementById('btn-player-save')?.addEventListener('click', savePlayerForm);
  document.getElementById('btn-player-cancel')?.addEventListener('click', () => closeModal('modal-player'));
  document.getElementById('btn-close-player-modal')?.addEventListener('click', () => closeModal('modal-player'));
  // Opponents page
  document.getElementById('btn-add-opponent')?.addEventListener('click', () => openOpponentModal());
  document.getElementById('btn-opponent-save')?.addEventListener('click', saveOpponentForm);
  document.getElementById('btn-opponent-cancel')?.addEventListener('click', () => closeModal('modal-opponent'));
  document.getElementById('btn-close-opponent-modal')?.addEventListener('click', () => closeModal('modal-opponent'));
  document.getElementById('btn-download-opp-template')?.addEventListener('click', downloadOpponentTemplate);
  document.getElementById('btn-import-opp-excel')?.addEventListener('click', triggerOpponentImport);
  document.getElementById('opponent-import-input')?.addEventListener('change', handleOpponentImportFile);
  document.getElementById('btn-opp-import-confirm')?.addEventListener('click', confirmOpponentImport);
  document.getElementById('btn-opp-import-cancel')?.addEventListener('click', () => closeModal('modal-opponent-import'));
  document.getElementById('btn-close-opp-import-modal')?.addEventListener('click', () => closeModal('modal-opponent-import'));
  // Opponent picker
  document.getElementById('btn-close-opp-picker')?.addEventListener('click', () => closeModal('modal-opponent-picker'));
  document.getElementById('opp-picker-search')?.addEventListener('input', e => renderOpponentPickerList(e.target.value));
  // Opponent search on opponent page
  document.getElementById('opp-search')?.addEventListener('input', e => {
    oppSearchQuery = e.target.value;
    renderOpponents();
  });

  // Player import
  document.getElementById('btn-download-template')?.addEventListener('click', downloadPlayerTemplate);
  document.getElementById('btn-import-excel')?.addEventListener('click', triggerPlayerImport);
  document.getElementById('player-import-input')?.addEventListener('change', handlePlayerImportFile);
  document.getElementById('btn-import-confirm')?.addEventListener('click', confirmPlayerImport);
  document.getElementById('btn-import-cancel')?.addEventListener('click', () => closeModal('modal-player-import'));
  document.getElementById('btn-close-import-modal')?.addEventListener('click', () => closeModal('modal-player-import'));

  // News
  document.querySelectorAll('#page-news .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchPostTab(btn.dataset.ptab));
  });
  document.querySelectorAll('.post-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPostType = btn.dataset.ptype;
      document.querySelectorAll('.post-type-btn').forEach(b => b.classList.toggle('active', b.dataset.ptype === currentPostType));
    });
  });
  document.getElementById('btn-post-send')?.addEventListener('click', sendPost);
  document.getElementById('btn-post-preview')?.addEventListener('click', previewPost);

  // Announcement
  document.getElementById('btn-back-announcement')?.addEventListener('click', popPage);
  document.getElementById('btn-ann-preview')?.addEventListener('click', showAnnPreview);
  document.getElementById('btn-ann-post')?.addEventListener('click', postAnnouncement);
  document.getElementById('btn-close-ann-preview')?.addEventListener('click', () => closeModal('modal-ann-preview'));
  document.getElementById('btn-ann-modify')?.addEventListener('click', () => closeModal('modal-ann-preview'));
  document.getElementById('btn-ann-preview-post')?.addEventListener('click', confirmAnnPost);

  // Result entry page back
  document.getElementById('btn-back-result-entry')?.addEventListener('click', popPage);

  // Settings
  document.getElementById('btn-save-settings')?.addEventListener('click', saveSettingsForm);
  document.getElementById('btn-load-cloud')?.addEventListener('click', loadFromCloud);
  document.getElementById('btn-save-cloud')?.addEventListener('click', saveToCloud);
  document.getElementById('btn-sync')?.addEventListener('click', loadFromCloud);

  // Confirm dialog
  document.getElementById('confirm-ok')?.addEventListener('click', () => {
    document.getElementById('dialog-confirm').classList.remove('open');
    if (confirmCb) { confirmCb(); confirmCb = null; }
  });
  document.getElementById('confirm-cancel')?.addEventListener('click', () => {
    document.getElementById('dialog-confirm').classList.remove('open');
    confirmCb = null;
  });

  // Close modal on overlay click
  document.querySelectorAll('.modal-overlay, .dialog-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });
}

// ===== INIT =====
function initApp() {
  loadLocal();
  bindEvents();

  // Apply settings to UI (always from mp-config.js)
  const s = getSettings();
  document.getElementById('header-club-name').textContent = s.clubName || 'クラブ名未設定';
  document.getElementById('sidebar-club-name').textContent = s.clubName || '---';
  document.getElementById('hdr-avatar').textContent = (s.clubName||'?')[0];
  document.getElementById('sidebar-avatar').textContent = (s.clubName||'?')[0];
  const subEl = document.getElementById('sidebar-club-sub');
  if (subEl) subEl.textContent = s.clubId || '';

  // Auto-load from cloud if configured
  if (isCloudConfigured(s)) {
    loadFromCloud().catch(() => {});
    setInterval(autoSync, 60000); // 60秒ごとにバックグラウンド同期
  } else {
    setTimeout(() => showToast('⚙️ 設定画面で Firebase URL とシークレットを入力してください', 'info'), 800);
  }

  showPage('page-dashboard');
}

initApp();
