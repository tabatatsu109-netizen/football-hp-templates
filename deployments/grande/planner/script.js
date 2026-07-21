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
let surveys = [];
let editingSurveyIdx = null;
let surveyQuestions = [];
let surveyParticipants = [];
let participantSearchQuery = '';
let currentSurveyId = null;
let surveyResponses = [];
let surveyResultsLoading = false;
let responseSearchQuery = '';
let expandedResponseKeys = new Set();
let shokudoSessions = [];   // 食堂: 食事セッション {id, date, menu, cups:{playerId:杯数}}
let shokudoBmi = [];        // 食堂: BMI記録 {id, playerId, date, height, weight, bmi}
let editingShokudoId = null;
let shokudoTab = 'input';
let shokudoRankMetric = 'count';

// ===== SETTINGS =====
// clubName/clubId/firebaseUrl は mp-config.js のみ。LocalStorageには firebaseSecret だけ保存。
function getSecretKey() {
  const cfg = (typeof MP_CONFIG !== 'undefined') ? MP_CONFIG : {};
  return cfg.clubId ? `mp_secret_${cfg.clubId}` : 'mp_secret';
}
function getGasStoreKey(suffix) {
  const cfg = (typeof MP_CONFIG !== 'undefined') ? MP_CONFIG : {};
  return cfg.clubId ? `mp_gas_${suffix}_${cfg.clubId}` : `mp_gas_${suffix}`;
}
function getSettings() {
  const cfg = (typeof MP_CONFIG !== 'undefined') ? MP_CONFIG : {};
  return {
    clubName:       cfg.clubName    || 'クラブ名未設定',
    clubId:         cfg.clubId      || '',
    firebaseUrl:    cfg.firebaseUrl || '',
    firebaseSecret: localStorage.getItem(getSecretKey()) || '',
    gasUrl:         localStorage.getItem(getGasStoreKey('url')) || '',
    gasKey:         localStorage.getItem(getGasStoreKey('key')) || '',
    imgbbKey:       localStorage.getItem(getGasStoreKey('imgbb')) || '',
  };
}
function saveSettings(s) {
  localStorage.setItem(getSecretKey(), s.firebaseSecret || '');
  if ('gasUrl' in s) localStorage.setItem(getGasStoreKey('url'), s.gasUrl || '');
  if ('gasKey' in s) localStorage.setItem(getGasStoreKey('key'), s.gasKey || '');
  if ('imgbbKey' in s) localStorage.setItem(getGasStoreKey('imgbb'), s.imgbbKey || '');
}
function isGasConfigured(s) {
  return !!(s.gasUrl && s.gasKey);
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
  surveys   = JSON.parse(localStorage.getItem(`${p}surveys`)   || '[]');
  shokudoSessions = JSON.parse(localStorage.getItem(`${p}shokudoSessions`) || '[]');
  shokudoBmi      = JSON.parse(localStorage.getItem(`${p}shokudoBmi`)      || '[]');
}
// 運用開始リセットの印。クラウドにも保存して全端末に「削除済み」を伝える。
// これが無いと、古いデータを持った端末が保存した時に削除済みデータが復活してしまう
function getResetStamp() {
  return parseInt(localStorage.getItem(`${getLocalPrefix()}resetStamp`) || '0', 10) || 0;
}
function setResetStamp(v) {
  localStorage.setItem(`${getLocalPrefix()}resetStamp`, String(v));
}

function saveLocal() {
  const p = getLocalPrefix();
  localStorage.setItem(`${p}players`,   JSON.stringify(players));
  localStorage.setItem(`${p}matches`,   JSON.stringify(matches));
  localStorage.setItem(`${p}schedules`, JSON.stringify(schedules));
  localStorage.setItem(`${p}posts`,     JSON.stringify(posts));
  localStorage.setItem(`${p}opponents`, JSON.stringify(opponents));
  localStorage.setItem(`${p}surveys`,   JSON.stringify(surveys));
  localStorage.setItem(`${p}shokudoSessions`, JSON.stringify(shokudoSessions));
  localStorage.setItem(`${p}shokudoBmi`,      JSON.stringify(shokudoBmi));
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
        body: JSON.stringify({ players, matches, schedules, posts, opponents, surveys, shokudoSessions, shokudoBmi, resetStamp: getResetStamp() }),
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
// クラウドから取得したデータをローカルへ適用する。
// resetStamp（運用開始リセットの印）を比較して削除が全端末へ確実に伝わるようにする：
//  - クラウドの印が新しい → この端末はリセット未適用 → クラウドの状態をそのまま採用
//  - ローカルの印が新しい → 古い端末がリセット前のデータを書き戻した状態 → 取り込まず正しい状態を再送
function applyCloudData(r) {
  const cloudStamp = r.resetStamp || 0;
  const localStamp = getResetStamp();

  if (r.players)   players   = r.players;
  if (r.opponents) opponents = r.opponents;
  if (r.surveys)   surveys   = r.surveys;
  if (r.shokudoSessions) shokudoSessions = r.shokudoSessions;
  if (r.shokudoBmi)      shokudoBmi      = r.shokudoBmi;

  if (cloudStamp > localStamp) {
    matches   = Array.isArray(r.matches)   ? r.matches   : [];
    schedules = Array.isArray(r.schedules) ? r.schedules : [];
    posts     = Array.isArray(r.posts)     ? r.posts     : [];
    currentMatch = null;
    selectedAnnSchedId = null;
    setResetStamp(cloudStamp);
  } else if (cloudStamp === localStamp) {
    if (r.matches)   matches   = r.matches;
    if (r.schedules) schedules = r.schedules;
    if (r.posts)     posts     = r.posts;
  }
  // cloudStamp < localStamp の場合は試合・投稿・予定を取り込まない
  // （下の saveLocal → クラウド保存で正しい状態と印を書き戻して修復する）
  saveLocal();
}

async function loadFromCloud() {
  const s = getSettings();
  if (!isCloudConfigured(s)) { showToast('設定でFirebase URLとシークレットを設定してください', 'error'); return; }
  setSyncIcon('🔄');
  try {
    const res = await fetch(`${getFirebaseUrl(s)}.json?auth=${s.firebaseSecret}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const r = await res.json() || {};
    applyCloudData(r);
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
      body: JSON.stringify({ players, matches, schedules, posts, opponents, surveys, shokudoSessions, shokudoBmi, resetStamp: getResetStamp() }),
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
    applyCloudData(r);
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
  if (pageId === 'page-survey')       renderSurveyList();
  if (pageId === 'page-survey-results') renderSurveyResults();
  if (pageId === 'page-sns')          renderSnsPage();
  if (pageId === 'page-emergency')    renderEmergencyPage();
  if (pageId === 'page-shokudo')      renderShokudoPage();
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
  // カレンダー取り込みはGAS設定済みの端末（管理者）だけに表示
  const gcalBtn = document.getElementById('btn-gcal-import');
  if (gcalBtn) gcalBtn.style.display = isGasConfigured(getSettings()) ? '' : 'none';

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
  const isMatchLike = sc.type !== '練習';
  const linkedMatch = sc.matchId ? matches.find(m => m.id === sc.matchId) : null;
  const resultPosted = !!(linkedMatch && linkedMatch.result && linkedMatch.result.grandePosted);
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
          ${resultPosted ? '<span class="posted-pill">結果公開済み</span>' : ''}
          ${!isPast && isMatchLike && sc.live ? `<button class="btn btn-sm" style="background:#e53935;color:#fff;font-weight:700" onclick="event.stopPropagation();openLivePage('${sc.id}')">🔴 ライブ速報</button>` : ''}
          ${!isPast && isMatchLike ? `<button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();startAnnouncement('${sc.id}')">📢 告知</button><button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();openSnsFromSchedId('${sc.id}')">📸 SNS画像</button>` : ''}
          ${isPast && isMatchLike && !resultPosted ? `<button class="btn btn-primary btn-sm" onclick="event.stopPropagation();continueResultFromSchedule('${sc.id}')">🏆 結果を登録</button>` : ''}
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
    const liveCb = document.getElementById('sf-live');
    if (liveCb) liveCb.checked = !!sc.live;
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
    const liveCb2 = document.getElementById('sf-live');
    if (liveCb2) liveCb2.checked = false;
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
    live: document.getElementById('sf-live')?.checked || false,
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
let resultFromSchedId = null; // スケジュール起点の結果登録（作成後にスケジュールと紐付ける）
function openMatchCreateModal(prefill = {}) {
  resultFromSchedId = null;
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
  // スケジュールから来た場合は紐付けておく（二重表示を防ぐ）
  if (resultFromSchedId) {
    const sc = schedules.find(s => s.id === resultFromSchedId);
    if (sc) sc.matchId = m.id;
    resultFromSchedId = null;
  }
  saveLocal();
  closeModal('modal-match-create');
  openMatchDetail(m.id);
}
// スケジュールカードのボタン用ヘルパー
function openSnsFromSchedId(id) {
  const sc = schedules.find(s => s.id === id);
  if (sc) openSnsFromSchedule(sc);
}
function continueResultFromSchedule(id) {
  const sc = schedules.find(s => s.id === id);
  if (!sc) return;
  const m = sc.matchId ? matches.find(x => x.id === sc.matchId) : null;
  if (m) { openMatchDetail(m.id); } else { startResultFromSchedule(id); }
}
// スケジュールの予定から結果登録を始める（試合情報は自動入力）
function startResultFromSchedule(schedId) {
  const sc = schedules.find(s => s.id === schedId);
  if (!sc) return;
  openMatchCreateModal({
    opponent: sc.opponent || '',
    date: sc.date || '',
    type: sc.type === '大会' ? 'フェスティバル' : '公式戦',
    category: sc.category || '',
    competition: sc.competition || '',
    venue: sc.venue || '',
  });
  resultFromSchedId = schedId;
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
  // ライブ速報からの引き継ぎ（結果未入力のときだけ）
  const pre = (!r && window._livePrefill) ? window._livePrefill : null;
  if (pre) window._livePrefill = null;
  document.getElementById('result-my-score').value = r?.myScore ?? (pre ? pre.my : 0);
  document.getElementById('result-opp-score').value = r?.oppScore ?? (pre ? pre.opp : 0);
  document.getElementById('result-format').value = r?.format || '40分×2';
  document.getElementById('result-image').value = r?.imageUrl || '';

  goalRows = r?.goals ? [...r.goals] : (pre && pre.goals.length ? [...pre.goals] : []);
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
      body: JSON.stringify({ players, matches, schedules, posts, opponents, surveys, resetStamp: getResetStamp() }),
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
      body: JSON.stringify({ players, matches, schedules, posts, opponents, surveys, resetStamp: getResetStamp() }),
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

// 個別の試合を削除：公開済みなら投稿も一緒に消し、紐づくスケジュールは残して連携だけ外す
function deleteCurrentMatch() {
  if (!currentMatch) return;
  const m = currentMatch;
  const label = m.opponent ? `vs ${m.opponent}（${fmtDateFull(m.date)}）` : fmtDateFull(m.date);
  showConfirm('試合を削除', `${label} の試合記録を削除します。\n布陣・結果・ホームページの表示もすべて消えます。\nスケジュールの予定自体は残ります。\nよろしいですか？`, '削除する', async () => {
    if (m.result?.grandeNewsId) {
      posts = posts.filter(p => p.id !== m.result.grandeNewsId);
    }
    schedules.forEach(s => { if (s.matchId === m.id) { s.matchId = null; s.posted = false; } });
    matches = matches.filter(x => x.id !== m.id);
    currentMatch = null;
    saveLocal();

    const s = getSettings();
    if (isCloudConfigured(s)) {
      setSyncIcon('💾');
      try {
        const res = await fetch(`${getFirebaseUrl(s)}.json?auth=${s.firebaseSecret}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ players, matches, schedules, posts, opponents, surveys, resetStamp: getResetStamp() }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setSyncIcon('☁️');
      } catch(e) {
        setSyncIcon('⚠️');
        showToast('クラウドへの反映に失敗しました: ' + e.message, 'error');
      }
    }
    showToast('試合を削除しました', 'success');
    popPage();
  });
}

// ===== GOOGLE CALENDAR 取り込み =====
// GAS経由でクラブ共有カレンダー（複数可）を読み、月ごとに候補をプレビュー。
// 新規の取り込みに加えて、カレンダー側の「変更」「削除」も検知して反映できる。
let gcalEvents = [];
let gcalParsed = [];
let gcalNew = [];
let gcalChanged = [];
let gcalDeleted = [];
let gcalActiveMonth = '';

function getGcalCals() {
  try { return JSON.parse(localStorage.getItem(getGasStoreKey('gcals')) || '[]'); } catch (e) { return []; }
}
function setGcalCals(arr) { localStorage.setItem(getGasStoreKey('gcals'), JSON.stringify(arr || [])); }

async function openGcalImport() {
  const s = getSettings();
  if (!isGasConfigured(s)) {
    showToast('設定ページでGAS連携（URLと送信キー）を設定してください', 'error');
    return;
  }
  openModal('modal-gcal-import');
  document.getElementById('gcal-import-footer').style.display = 'none';
  if (getGcalCals().length === 0) { await gcalShowCalendarPicker(); return; }
  await gcalLoadEvents();
}

async function gcalShowCalendarPicker() {
  const body = document.getElementById('gcal-import-body');
  document.getElementById('gcal-import-footer').style.display = 'none';
  body.innerHTML = '<div style="text-align:center;color:var(--c-muted);padding:24px">⏳ カレンダー一覧を取得中…</div>';
  try {
    const data = await gasCall('calendars');
    const cals = data.calendars || [];
    const selected = new Set(getGcalCals().map(c => c.id));
    window._gcalCals = cals;
    body.innerHTML = `
      <div style="font-size:13px;color:var(--c-text2);margin-bottom:10px">取り込み元のカレンダーに<strong>チェック</strong>を入れてください（複数OK。例：ジュニアとジュニアユースの両方）</div>
      ${cals.map((c, i) => `
        <label style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1.5px solid var(--c-border);border-radius:10px;margin-bottom:8px;cursor:pointer">
          <input type="checkbox" id="gcal-cal-${i}" ${selected.has(c.id) ? 'checked' : ''} style="width:20px;height:20px;accent-color:var(--c-green,#1a6b2f)">
          <span style="font-weight:700;font-size:14px">📅 ${escEmg(c.name)}</span>
        </label>
      `).join('') || '<div style="color:var(--c-muted)">カレンダーが見つかりません</div>'}
      <button class="btn btn-primary btn-full" style="margin-top:8px" onclick="gcalSaveCalendarChoice()">この内容で読み込む</button>
    `;
  } catch (e) {
    body.innerHTML = `<div style="color:var(--c-red);font-size:13px;padding:10px">取得に失敗しました: ${escEmg(e.message)}<br><br>GASのコードが最新版（カレンダー対応版）に更新されているか確認してください。</div>`;
  }
}

async function gcalSaveCalendarChoice() {
  const cals = window._gcalCals || [];
  const chosen = cals.filter((c, i) => document.getElementById(`gcal-cal-${i}`)?.checked);
  if (chosen.length === 0) { showToast('カレンダーを1つ以上選んでください', 'error'); return; }
  setGcalCals(chosen.map(c => ({ id: c.id, name: c.name })));
  showToast(`${chosen.length}件のカレンダーを設定しました`, 'success');
  await gcalLoadEvents();
}

async function gcalLoadEvents() {
  const body = document.getElementById('gcal-import-body');
  document.getElementById('gcal-import-footer').style.display = 'none';
  body.innerHTML = '<div style="text-align:center;color:var(--c-muted);padding:24px">⏳ 予定を読み込み中…（今後3ヶ月）</div>';
  try {
    const cals = getGcalCals();
    const all = [];
    for (const c of cals) {
      const data = await gasCall('events', { calendarId: c.id, days: 92 });
      (data.events || []).forEach(ev => { ev._calId = c.id; ev._calName = c.name; all.push(ev); });
    }
    gcalEvents = all;
    gcalParsed = all.map(parseGcalEvent);
    buildGcalDiff();
    gcalActiveMonth = '';
    renderGcalCandidates();
  } catch (e) {
    body.innerHTML = `<div style="color:var(--c-red);font-size:13px;padding:10px">読み込み失敗: ${escEmg(e.message)}<br><br><button class="btn btn-secondary btn-sm" onclick="gcalShowCalendarPicker()">カレンダーを選び直す</button></div>`;
  }
}

// 予定のタイトル・本文から試合情報を推測する
function parseGcalEvent(ev) {
  const title = String(ev.title || '');
  const text = title + '\n' + String(ev.desc || '');
  const start = new Date(ev.start);
  const end = new Date(ev.end);
  const p = (n) => String(n).padStart(2, '0');
  const date = `${start.getFullYear()}-${p(start.getMonth() + 1)}-${p(start.getDate())}`;

  // 時刻：KO表記が本文にあれば優先、なければ予定の開始時刻
  let time = ev.allDay ? '' : `${p(start.getHours())}:${p(start.getMinutes())}`;
  const ko = text.match(/(\d{1,2}):(\d{2})\s*KO|KO\s*(\d{1,2}):(\d{2})/i);
  if (ko) time = `${p(ko[1] || ko[3])}:${ko[2] || ko[4]}`;
  let endTime = (!ev.allDay && end.getDate() === start.getDate()) ? `${p(end.getHours())}:${p(end.getMinutes())}` : '';

  // 相手：vs 〇〇（スペース入りチーム名にも対応。時刻や括弧以降は除く）
  function extractOpp(str) {
    const m = String(str || '').match(/vs\.?[\s　]*([^（(「【\n]+)/i);
    if (!m) return '';
    return m[1].replace(/[\s　]*\d{1,2}:\d{2}.*$/, '').replace(/[\s　]+(KO|集合|解散).*$/i, '').trim();
  }
  const opponent = extractOpp(title) || extractOpp(text);

  // カテゴリー：U15 / U-12 など
  const catMatch = text.match(/U-?(\d{1,2})/i);
  const category = catMatch ? 'U' + catMatch[1] : '';

  // 種別
  let type = 'その他';
  if (/TR(?![A-Z])|練習(?!試合)|トレーニング(?!マッチ)/i.test(title)) type = '練習';
  else if (/大会|杯|カップ|フェス|選手権/.test(title)) type = '大会';
  else if (opponent || /TM|試合|リーグ/i.test(title)) type = '試合';

  // 大会名：タイトルの vs より前の部分（リーグ・杯などを含むとき）
  let competition = '';
  const beforeVs = title.split(/vs/i)[0].trim();
  if (beforeVs && /リーグ|杯|大会|選手権|節|カップ|TM|フェス/.test(beforeVs)) competition = beforeVs;

  // 会場：場所欄の先頭部分、なければ「@〇〇」表記
  let venue = String(ev.location || '').split(/[、,]/)[0].trim();
  if (!venue) {
    const at = text.match(/[@＠]([^\s　]+)/);
    if (at) venue = at[1];
  }

  return { gcalId: ev.id, calId: ev._calId, calName: ev._calName || '', date, time, endTime, type, category, opponent, venue, competition, title, _use: false };
}

// 新規・変更・削除を仕分けする
function buildGcalDiff() {
  const today = todayStr();
  const byId = {};
  gcalParsed.forEach(c => { byId[c.gcalId] = c; });

  gcalNew = gcalParsed.filter(c =>
    c.date >= today &&
    !schedules.some(sc => sc.gcalId === c.gcalId || (sc.date === c.date && c.opponent && sc.opponent === c.opponent))
  );
  gcalNew.forEach(c => { c._use = false; }); // 基本チェックなし（必要なものだけ選ぶ）

  gcalChanged = [];
  schedules.forEach(sc => {
    if (!sc.gcalId) return;
    const c = byId[sc.gcalId];
    if (!c || c.date < today) return;
    const diffs = [];
    if (sc.date !== c.date) diffs.push(['日付', fmtDate(sc.date), fmtDate(c.date)]);
    if ((sc.time || '') !== (c.time || '')) diffs.push(['時刻', sc.time || 'なし', c.time || 'なし']);
    if ((sc.venue || '') !== (c.venue || '')) diffs.push(['会場', sc.venue || 'なし', c.venue || 'なし']);
    if ((sc.opponent || '') !== (c.opponent || '')) diffs.push(['相手', sc.opponent || 'なし', c.opponent || 'なし']);
    if (diffs.length) gcalChanged.push({ sc, c, diffs, _use: true });
  });

  const selCalIds = new Set(getGcalCals().map(x => x.id));
  const fetchedIds = new Set(gcalParsed.map(c => c.gcalId));
  gcalDeleted = schedules
    .filter(sc => sc.gcalId && sc.gcalCal && selCalIds.has(sc.gcalCal) && sc.date >= today && !fetchedIds.has(sc.gcalId))
    .map(sc => ({ sc, _use: false }));
}

function gcalMonths() {
  const set = new Set();
  gcalNew.forEach(c => set.add(c.date.slice(0, 7)));
  gcalChanged.forEach(x => set.add(x.c.date.slice(0, 7)));
  gcalDeleted.forEach(x => set.add(x.sc.date.slice(0, 7)));
  return [...set].sort();
}
function monthLabel(ym) { return parseInt(ym.slice(5), 10) + '月'; }
function gcalSetMonth(ym) { collectGcalDom(); gcalActiveMonth = ym; renderGcalCandidates(); }

// 表示中の入力値・チェック状態をJS側に保存（月切り替えや取り込み前に呼ぶ）
function collectGcalDom() {
  gcalNew.forEach((c, i) => {
    const use = document.getElementById(`gc-use-${i}`);
    if (!use) return; // この月には表示されていない
    c._use = use.checked;
    c.type = document.getElementById(`gc-type-${i}`).value;
    c.category = (document.getElementById(`gc-cat-${i}`).value || '').trim();
    c.opponent = (document.getElementById(`gc-opp-${i}`).value || '').trim();
    c.time = (document.getElementById(`gc-time-${i}`).value || '').trim();
    c.venue = (document.getElementById(`gc-venue-${i}`).value || '').trim();
    c.competition = (document.getElementById(`gc-comp-${i}`).value || '').trim();
  });
  gcalChanged.forEach((x, i) => {
    const el = document.getElementById(`gc-chg-${i}`);
    if (el) x._use = el.checked;
  });
  gcalDeleted.forEach((x, i) => {
    const el = document.getElementById(`gc-del-${i}`);
    if (el) x._use = el.checked;
  });
}

function gcalToggleMonthAll(on) {
  collectGcalDom();
  gcalNew.forEach(c => { if (c.date.slice(0, 7) === gcalActiveMonth) c._use = on; });
  renderGcalCandidates();
}

function calChip(name) {
  if (!name) return '';
  const short = name.replace(/グランデ/g, '').trim() || name;
  return `<span style="background:#eef4ff;color:#2b5eb5;font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;margin-left:6px;vertical-align:middle">${escEmg(short)}</span>`;
}

function renderGcalCandidates() {
  const body = document.getElementById('gcal-import-body');
  const months = gcalMonths();

  if (gcalNew.length + gcalChanged.length + gcalDeleted.length === 0) {
    body.innerHTML = `
      <div style="text-align:center;color:var(--c-muted);padding:24px">新しい予定・変更はありません<br><span style="font-size:12px">（今後3ヶ月分を確認しました）</span></div>
      <button class="btn btn-ghost btn-sm btn-full" onclick="gcalShowCalendarPicker()">カレンダーを選び直す</button>`;
    document.getElementById('gcal-import-footer').style.display = 'none';
    return;
  }

  if (!gcalActiveMonth || months.indexOf(gcalActiveMonth) < 0) gcalActiveMonth = months[0];
  const ym = gcalActiveMonth;
  const inMonth = (d) => d.slice(0, 7) === ym;

  const monthTabs = `
    <div style="display:flex;gap:6px;overflow-x:auto;margin-bottom:12px;padding-bottom:2px">
      ${months.map(m => `
        <button onclick="gcalSetMonth('${m}')" style="white-space:nowrap;padding:7px 16px;border-radius:99px;border:1.5px solid ${m === ym ? 'var(--c-green,#1a6b2f)' : 'var(--c-border)'};background:${m === ym ? 'var(--c-green,#1a6b2f)' : 'var(--c-surface)'};color:${m === ym ? '#fff' : 'var(--c-text2)'};font-weight:700;font-size:13px;cursor:pointer">${monthLabel(m)}</button>
      `).join('')}
    </div>`;

  const selStyle = 'width:100%;min-width:0;box-sizing:border-box;padding:7px 8px;border:1.5px solid var(--c-border);border-radius:8px;font-size:13px;background:var(--c-surface)';

  /* --- 新規 --- */
  const newInMonth = gcalNew.map((c, i) => ({ c, i })).filter(x => inMonth(x.c.date));
  const newHtml = newInMonth.length === 0 ? '' : `
    <div style="display:flex;align-items:center;justify-content:space-between;margin:4px 0 8px">
      <div style="font-size:13px;font-weight:900">🆕 新しい予定（${newInMonth.length}件）</div>
      <div style="display:flex;gap:6px">
        <button class="btn btn-ghost btn-sm" style="font-size:11px" onclick="gcalToggleMonthAll(true)">全選択</button>
        <button class="btn btn-ghost btn-sm" style="font-size:11px" onclick="gcalToggleMonthAll(false)">全解除</button>
      </div>
    </div>
    ${newInMonth.map(({ c, i }) => `
      <div style="border:1.5px solid ${c._use ? 'var(--c-green,#1a6b2f)' : 'var(--c-border)'};border-radius:12px;padding:12px;margin-bottom:10px;background:var(--c-surface)">
        <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;margin-bottom:8px">
          <input type="checkbox" id="gc-use-${i}" ${c._use ? 'checked' : ''} onchange="this.closest('div[style]').style.borderColor=this.checked?'var(--c-green,#1a6b2f)':'var(--c-border)'" style="width:22px;height:22px;margin-top:2px;accent-color:var(--c-green,#1a6b2f)">
          <div style="font-weight:700;font-size:14px">${fmtDate(c.date)} ${escEmg(c.title)}${calChip(c.calName)}</div>
        </label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <select id="gc-type-${i}" style="${selStyle}">
            ${['試合', '練習', '大会', 'その他'].map(t => `<option ${c.type === t ? 'selected' : ''}>${t}</option>`).join('')}
          </select>
          <input id="gc-cat-${i}" value="${attrEsc(c.category)}" placeholder="カテゴリ (U15等)" style="${selStyle}">
          <input id="gc-opp-${i}" value="${attrEsc(c.opponent)}" placeholder="対戦相手" style="${selStyle}">
          <input id="gc-time-${i}" value="${attrEsc(c.time)}" placeholder="時刻 (KO)" style="${selStyle}">
          <input id="gc-venue-${i}" value="${attrEsc(c.venue)}" placeholder="会場" style="${selStyle};grid-column:1/-1">
          <input id="gc-comp-${i}" value="${attrEsc(c.competition)}" placeholder="大会・リーグ名" style="${selStyle};grid-column:1/-1">
        </div>
      </div>
    `).join('')}`;

  /* --- 変更 --- */
  const chgInMonth = gcalChanged.map((x, i) => ({ x, i })).filter(({ x }) => inMonth(x.c.date));
  const chgHtml = chgInMonth.length === 0 ? '' : `
    <div style="font-size:13px;font-weight:900;margin:14px 0 8px">🔄 カレンダー側で変更された予定（${chgInMonth.length}件）</div>
    ${chgInMonth.map(({ x, i }) => `
      <div style="border:1.5px solid #e5a100;border-radius:12px;padding:12px;margin-bottom:10px;background:#fffdf5">
        <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer">
          <input type="checkbox" id="gc-chg-${i}" ${x._use ? 'checked' : ''} style="width:22px;height:22px;margin-top:2px;accent-color:#e5a100">
          <div style="min-width:0">
            <div style="font-weight:700;font-size:14px;margin-bottom:4px">${fmtDate(x.c.date)} ${escEmg(x.c.title)}${calChip(x.c.calName)}</div>
            ${x.diffs.map(d => `<div style="font-size:12.5px;color:#7a5c00">・${d[0]}：<s style="color:#aaa">${escEmg(d[1])}</s> → <strong>${escEmg(d[2])}</strong></div>`).join('')}
          </div>
        </label>
      </div>
    `).join('')}`;

  /* --- 削除 --- */
  const delInMonth = gcalDeleted.map((x, i) => ({ x, i })).filter(({ x }) => inMonth(x.sc.date));
  const delHtml = delInMonth.length === 0 ? '' : `
    <div style="font-size:13px;font-weight:900;margin:14px 0 8px">🗑 カレンダーから消えた予定（${delInMonth.length}件）</div>
    <div style="font-size:11.5px;color:var(--c-muted);margin-bottom:8px">チェックするとプランナーのスケジュールからも削除されます</div>
    ${delInMonth.map(({ x, i }) => `
      <div style="border:1.5px solid #f3c1c1;border-radius:12px;padding:12px;margin-bottom:10px;background:#fff8f8">
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer">
          <input type="checkbox" id="gc-del-${i}" ${x._use ? 'checked' : ''} style="width:22px;height:22px;accent-color:var(--c-red,#e53935)">
          <div style="font-weight:700;font-size:14px">${fmtDate(x.sc.date)} ${escEmg(x.sc.opponent ? 'vs ' + x.sc.opponent : (x.sc.title || x.sc.type))}</div>
        </label>
      </div>
    `).join('')}`;

  const emptyMonth = (newInMonth.length + chgInMonth.length + delInMonth.length) === 0
    ? '<div style="text-align:center;color:var(--c-muted);padding:20px">この月の新しい予定・変更はありません</div>' : '';

  body.innerHTML = `
    ${monthTabs}
    <div style="font-size:12px;color:var(--c-muted);margin-bottom:10px">取り込みたい予定に<strong>チェック</strong>を入れてください（内容はその場で直せます）</div>
    ${newHtml}${chgHtml}${delHtml}${emptyMonth}
    <button class="btn btn-ghost btn-sm btn-full" style="margin-top:6px" onclick="gcalShowCalendarPicker()">カレンダーを選び直す</button>
  `;
  document.getElementById('gcal-import-footer').style.display = '';
}

function importGcalSelected() {
  collectGcalDom();
  let nNew = 0, nChg = 0, nDel = 0;

  gcalNew.forEach((c) => {
    if (!c._use) return;
    schedules.push({
      id: String(Date.now() + nNew),
      date: c.date, time: c.time, endTime: c.endTime || '',
      type: c.type, category: c.category, opponent: c.opponent,
      title: '', venue: c.venue, competition: c.competition, notes: '',
      live: false, posted: false, matchId: null,
      gcalId: c.gcalId, gcalCal: c.calId,
    });
    nNew++;
  });

  gcalChanged.forEach((x) => {
    if (!x._use) return;
    const sc = x.sc;
    sc.date = x.c.date;
    sc.time = x.c.time;
    if (x.c.endTime) sc.endTime = x.c.endTime;
    sc.venue = x.c.venue;
    if (x.c.opponent) sc.opponent = x.c.opponent;
    if (x.c.competition) sc.competition = x.c.competition;
    nChg++;
  });

  gcalDeleted.forEach((x) => {
    if (!x._use) return;
    schedules = schedules.filter(sc => sc !== x.sc);
    nDel++;
  });

  if (nNew + nChg + nDel === 0) { showToast('反映する予定にチェックを入れてください', 'error'); return; }
  saveLocal();
  closeModal('modal-gcal-import');
  renderSchedule();
  const parts = [];
  if (nNew) parts.push(`新規${nNew}件`);
  if (nChg) parts.push(`変更${nChg}件`);
  if (nDel) parts.push(`削除${nDel}件`);
  showToast(`${parts.join('・')}を反映しました ✓`, 'success');
}

// ===== PHOTO PICKER（カード写真の選択） =====
// ホームページに置いてあるクラブ写真ライブラリ（assets/toprandom/）
const HP_PHOTO_BASE = (typeof MP_CONFIG !== 'undefined' && MP_CONFIG.photoBase)
  || 'https://grande.no-football.jp/deployments/grande/assets/toprandom/';
const HP_PHOTOS = [
  'photo2.jpg', 'photo3.jpg',
  'LINE_ALBUM_エルドラード、ラーゴ_260627_10.jpg',
  'LINE_ALBUM_エルドラード、ラーゴ_260627_11.jpg',
  'LINE_ALBUM_エルドラード、ラーゴ_260627_14.jpg',
  'LINE_ALBUM_エルドラード、ラーゴ_260627_36.jpg',
  'LINE_ALBUM_エルドラード、ラーゴ_260627_52.jpg',
  'LINE_ALBUM_ジュニア20251124_260627_8.jpg',
  'LINE_ALBUM_ジュニア20251124_260627_19.jpg',
  'LINE_ALBUM_ジュニア20251124_260627_21.jpg',
  'LINE_ALBUM_ジュニア20251124_260627_23.jpg',
  'LINE_ALBUM_ジュニア20251124_260627_31.jpg',
  'LINE_ALBUM_ジュニア20251124_260627_32.jpg',
  'LINE_ALBUM_ジュニア20251124_260627_38.jpg',
  'LINE_ALBUM_ジュニア20251124_260627_39.jpg',
  'LINE_ALBUM_ジュニア20251124_260627_40.jpg',
  'LINE_ALBUM_高円宮杯アズール_260627_1.jpg',
  'LINE_ALBUM_高円宮杯アズール_260627_3.jpg',
  'LINE_ALBUM_高円宮杯アズール_260627_4.jpg',
  'LINE_ALBUM_U12リーグ最終節_260627_1.jpg',
  'LINE_ALBUM_U12リーグ最終節_260627_2.jpg',
  'LINE_ALBUM_U12リーグ最終節_260627_3.jpg',
  'LINE_ALBUM_U12リーグ最終節_260627_4.jpg',
  'LINE_ALBUM_DEN合宿_260627_1.jpg',
  'LINE_ALBUM_DEN合宿_260627_2.jpg',
  'LINE_ALBUM_DEN合宿_260627_3.jpg',
  'LINE_ALBUM_2026バーモントカップ2次リーグ_260627_1.jpg',
  'LINE_ALBUM_2026バーモントカップ2次リーグ_260627_2.jpg',
  'LINE_ALBUM_20251012石和中_260627_2.jpg',
];
function hpPhotoUrl(name) { return HP_PHOTO_BASE + encodeURIComponent(name); }

let photoPickTarget = null;   // 'post' | 'ann'
let annCardImage = null;      // 告知用に選んだ写真URL

function openPhotoPicker(target) {
  photoPickTarget = target;
  const grid = document.getElementById('photo-picker-grid');
  grid.innerHTML = HP_PHOTOS.map((name, i) => `
    <button type="button" onclick="pickPhoto(${i})" style="padding:0;border:2px solid var(--c-border);border-radius:10px;overflow:hidden;background:#eee;cursor:pointer;aspect-ratio:4/3">
      <img src="${hpPhotoUrl(name)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block" alt="">
    </button>`).join('');
  openModal('modal-photo-picker');
}

function pickPhoto(idx) {
  const url = hpPhotoUrl(HP_PHOTOS[idx]);
  closeModal('modal-photo-picker');
  if (photoPickTarget === 'post') {
    document.getElementById('post-image').value = url;
    updatePhotoPreview('post');
  } else if (photoPickTarget === 'ann') {
    annCardImage = url;
    updatePhotoPreview('ann');
  }
  showToast('写真を選びました ✓', 'success');
}

function updatePhotoPreview(target) {
  if (target === 'post') {
    const url = document.getElementById('post-image').value.trim();
    const img = document.getElementById('post-image-preview');
    const clr = document.getElementById('post-image-clear');
    if (url) { img.src = url; img.style.display = 'block'; if (clr) clr.style.display = ''; }
    else { img.style.display = 'none'; if (clr) clr.style.display = 'none'; }
  } else if (target === 'ann') {
    const img = document.getElementById('ann-image-preview');
    const clr = document.getElementById('ann-image-clear');
    if (annCardImage) { img.src = annCardImage; img.style.display = 'block'; if (clr) clr.style.display = ''; }
    else { img.style.display = 'none'; if (clr) clr.style.display = 'none'; }
  }
}

function clearPickedPhoto(target) {
  if (target === 'post') { document.getElementById('post-image').value = ''; }
  else if (target === 'ann') { annCardImage = null; }
  updatePhotoPreview(target);
}

// スマホの写真をImgBBへアップロードして使う（自動で縮小してから送る）
function uploadPickerPhoto(input) {
  const file = input.files && input.files[0];
  input.value = '';
  if (!file) return;
  const s = getSettings();
  if (!s.imgbbKey) {
    document.getElementById('photo-upload-nokey').style.display = 'block';
    return;
  }
  document.getElementById('photo-upload-nokey').style.display = 'none';
  const btn = document.getElementById('photo-upload-btn');
  const status = document.getElementById('photo-upload-status');
  btn.style.display = 'none';
  status.style.display = 'block';

  // 画像を最大1600pxに縮小・JPEG圧縮（通信量と表示速度のため）
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const MAX = 1600;
      let w = img.width, h = img.height;
      if (Math.max(w, h) > MAX) {
        const ratio = MAX / Math.max(w, h);
        w = Math.round(w * ratio); h = Math.round(h * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const base64 = canvas.toDataURL('image/jpeg', 0.82).split(',')[1];

      const fd = new FormData();
      fd.append('image', base64);
      fetch('https://api.imgbb.com/1/upload?key=' + encodeURIComponent(s.imgbbKey), { method: 'POST', body: fd })
        .then(r => r.json())
        .then(data => {
          const url = data && data.data && data.data.display_url;
          if (!url) throw new Error('ImgBB error');
          closeModal('modal-photo-picker');
          if (photoPickTarget === 'post') {
            document.getElementById('post-image').value = url;
            updatePhotoPreview('post');
          } else if (photoPickTarget === 'ann') {
            annCardImage = url;
            updatePhotoPreview('ann');
          }
          showToast('写真をアップロードしました ✓', 'success');
        })
        .catch(err => { console.error(err); showToast('アップロードに失敗しました。電波とAPIキーを確認してください', 'error'); })
        .finally(() => { btn.style.display = ''; status.style.display = 'none'; });
    };
    img.onerror = () => { showToast('画像を読み込めませんでした', 'error'); btn.style.display = ''; status.style.display = 'none'; };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ===== LIVE MATCH CENTER（ライブ速報） =====
// データはFirebaseの /clubs/{clubId}-live に保存する（通常データとは独立、上書き事故なし）
let liveSchedId = null;
let liveData = null;

function getLiveUrl(s) { return `${s.firebaseUrl}/clubs/${s.clubId}-live.json`; }

function newLiveData(sc) {
  return {
    schedId: sc.id, date: sc.date, opponent: sc.opponent || '',
    category: sc.category || '', competition: sc.competition || sc.type || '',
    status: 'pre', myScore: 0, oppScore: 0, events: [], updatedAt: Date.now(),
  };
}

function openLivePage(schedId) {
  const sc = schedules.find(s => s.id === schedId);
  if (!sc) return;
  const s = getSettings();
  if (!isCloudConfigured(s)) { showToast('設定ページでFirebaseを設定してください', 'error'); return; }
  liveSchedId = schedId;
  pushPage('page-live');
  document.getElementById('live-body').innerHTML = '<div style="text-align:center;color:var(--c-muted);padding:30px">読み込み中...</div>';
  fetch(`${getLiveUrl(s)}?auth=${s.firebaseSecret}`)
    .then(r => r.ok ? r.json() : null)
    .then(d => {
      liveData = (d && d.schedId === schedId) ? d : newLiveData(sc);
      if (!Array.isArray(liveData.events)) liveData.events = [];
      renderLivePage();
    })
    .catch(() => { liveData = newLiveData(sc); renderLivePage(); });
}

function livePush() {
  const s = getSettings();
  liveData.updatedAt = Date.now();
  return fetch(`${getLiveUrl(s)}?auth=${s.firebaseSecret}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(liveData),
  }).then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    setSyncIcon('☁️');
  }).catch(e => {
    setSyncIcon('⚠️');
    showToast('送信失敗（電波を確認）: ' + e.message, 'error');
  });
}

function fmtLiveTime(ts) {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

const LIVE_EV_LABEL = {
  ko:  { icon: '▶️', label: 'キックオフ' },
  ko2: { icon: '▶️', label: '後半キックオフ' },
  ht:  { icon: '⏸', label: 'ハーフタイム' },
  ft:  { icon: '🏁', label: '試合終了' },
  goal:    { icon: '⚽', label: 'ゴール！' },
  oppgoal: { icon: '😢', label: '失点' },
};

function renderLivePage() {
  const el = document.getElementById('live-body');
  if (!el || !liveData) return;
  const st = liveData.status;
  const stLabel = st === 'pre' ? '試合前' : st === 'live' ? '🔴 LIVE配信中' : st === 'ht' ? 'ハーフタイム' : '試合終了';
  const stColor = st === 'live' ? '#e53935' : st === 'ft' ? '#666' : 'var(--c-green, #1a6b2f)';

  const bigBtn = (label, color, fn, sub) => `
    <button onclick="${fn}" style="width:100%;padding:16px 10px;border-radius:14px;background:${color};color:#fff;font-weight:900;font-size:17px;border:none;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.15)">
      ${label}${sub ? `<div style="font-size:11px;font-weight:400;opacity:.85;margin-top:2px">${sub}</div>` : ''}
    </button>`;

  let buttons = '';
  if (st === 'pre') {
    buttons = bigBtn('▶️ キックオフ！', '#1a6b2f', "liveEvent('ko')", '押すとHPの速報がスタートします');
  } else if (st === 'live') {
    buttons = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
        ${bigBtn('⚽ ゴール！', '#e5a100', "liveEvent('goal')")}
        ${bigBtn('😢 失点', '#78909c', "liveEvent('oppgoal')")}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        ${bigBtn('⏸ ハーフタイム', '#455a64', "liveEvent('ht')")}
        ${bigBtn('🏁 試合終了', '#263238', "liveEvent('ft')")}
      </div>`;
  } else if (st === 'ht') {
    buttons = `
      ${bigBtn('▶️ 後半キックオフ', '#1a6b2f', "liveEvent('ko2')")}
      <div style="margin-top:10px">${bigBtn('🏁 試合終了', '#263238', "liveEvent('ft')")}</div>`;
  } else {
    buttons = `
      <div style="background:#f0faf0;border:1px solid #b2d8b2;border-radius:10px;padding:12px;text-align:center;font-size:13px;margin-bottom:10px">
        お疲れさまでした！このスコアで正式な結果登録に進めます
      </div>
      ${bigBtn('🏆 この結果を登録する', '#1a6b2f', 'liveToResult()')}`;
  }

  const evHtml = [...liveData.events].reverse().map(ev => {
    const meta = LIVE_EV_LABEL[ev.type] || { icon: '・', label: ev.type };
    return `<div style="display:flex;align-items:center;gap:10px;padding:8px 4px;border-bottom:1px solid var(--c-border);font-size:14px">
      <span style="font-size:12px;color:var(--c-muted);min-width:40px">${fmtLiveTime(ev.ts)}</span>
      <span>${meta.icon}</span>
      <span style="font-weight:700">${meta.label}</span>
      ${ev.scorer ? `<span style="color:var(--c-muted)">${escEmg(ev.scorer)}</span>` : ''}
    </div>`;
  }).join('');

  el.innerHTML = `
    <div style="background:linear-gradient(135deg,#14351f,#1a5c2d);border-radius:16px;padding:18px 14px;color:#fff;text-align:center;margin-bottom:14px">
      <div style="display:inline-block;background:${stColor};padding:3px 12px;border-radius:99px;font-size:12px;font-weight:700;margin-bottom:8px;${st==='live'?'animation:pulse 1.5s infinite':''}">${stLabel}</div>
      <div style="font-size:13px;opacity:.8">${escEmg(liveData.competition)}${liveData.category ? '・' + escEmg(liveData.category) : ''}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:14px;margin-top:8px">
        <span style="font-weight:900;font-size:15px">GRANDE</span>
        <span style="font-size:42px;font-weight:900;letter-spacing:2px">${liveData.myScore}<span style="color:#c8a94a;padding:0 6px">-</span>${liveData.oppScore}</span>
        <span style="font-weight:900;font-size:15px">${escEmg(liveData.opponent)}</span>
      </div>
    </div>
    ${buttons}
    <div style="display:flex;gap:8px;margin-top:14px">
      <button class="btn btn-secondary btn-sm" style="flex:1" onclick="liveUndo()" ${liveData.events.length ? '' : 'disabled'}>↩️ 1つ取り消す</button>
      <button class="btn btn-ghost btn-sm" style="color:var(--c-red)" onclick="liveClear()">速報を削除</button>
    </div>
    ${liveData.events.length ? `<div style="margin-top:16px"><div style="font-size:12px;font-weight:700;color:var(--c-text2);margin-bottom:4px">経過</div>${evHtml}</div>` : ''}
  `;
}

function liveEvent(type) {
  if (!liveData) return;
  if (type === 'goal') { openLiveScorerPicker(); return; }
  applyLiveEvent({ type, ts: Date.now() });
}

function applyLiveEvent(ev) {
  liveData.events.push(ev);
  if (ev.type === 'goal') liveData.myScore++;
  if (ev.type === 'oppgoal') liveData.oppScore++;
  if (ev.type === 'ko' || ev.type === 'ko2') liveData.status = 'live';
  if (ev.type === 'ht') liveData.status = 'ht';
  if (ev.type === 'ft') liveData.status = 'ft';
  renderLivePage();
  livePush();
}

function openLiveScorerPicker() {
  const sc = schedules.find(s => s.id === liveSchedId);
  const cat = sc ? (sc.category || '') : '';
  let list = players;
  if (cat) {
    const filtered = players.filter(p => skCategoryOf(p) === cat.replace('-', ''));
    if (filtered.length) list = filtered;
  }
  const el = document.getElementById('live-scorer-list');
  el.innerHTML = list.map(p => `
    <button class="btn btn-secondary" style="padding:12px 6px;font-size:14px" onclick="liveGoalWithScorer('${escEmg(p.name).replace(/'/g, '')}')">
      ${p.number ? `<span style="color:var(--c-muted);font-size:12px">#${p.number}</span> ` : ''}${escEmg(p.name)}
    </button>`).join('') || '<div style="grid-column:1/-1;color:var(--c-muted);font-size:13px;text-align:center">選手が登録されていません</div>';
  openModal('modal-live-scorer');
}

function liveGoalWithScorer(name) {
  closeModal('modal-live-scorer');
  applyLiveEvent({ type: 'goal', ts: Date.now(), scorer: name || '' });
}

function liveUndo() {
  if (!liveData || !liveData.events.length) return;
  const ev = liveData.events.pop();
  if (ev.type === 'goal') liveData.myScore = Math.max(0, liveData.myScore - 1);
  if (ev.type === 'oppgoal') liveData.oppScore = Math.max(0, liveData.oppScore - 1);
  let st = 'pre';
  liveData.events.forEach(e => {
    if (e.type === 'ko' || e.type === 'ko2') st = 'live';
    if (e.type === 'ht') st = 'ht';
    if (e.type === 'ft') st = 'ft';
  });
  liveData.status = st;
  renderLivePage();
  livePush();
  showToast('1つ取り消しました');
}

function liveClear() {
  showConfirm('ライブ速報を削除', '速報データを削除します。ホームページの速報ページからも消えます。よろしいですか？', '削除する', () => {
    const s = getSettings();
    fetch(`${getLiveUrl(s)}?auth=${s.firebaseSecret}`, { method: 'DELETE' })
      .then(() => { liveData = null; showToast('削除しました'); popPage(); })
      .catch(e => showToast('削除失敗: ' + e.message, 'error'));
  });
}

// 試合終了後：ライブのスコアを結果登録に引き継ぐ
function liveToResult() {
  if (!liveData) return;
  window._livePrefill = {
    my: liveData.myScore,
    opp: liveData.oppScore,
    goals: (liveData.events || []).filter(e => e.type === 'goal' && e.scorer).map(e => ({ scorer: e.scorer, assist: '', minute: '' })),
  };
  continueResultFromSchedule(liveSchedId);
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
    document.getElementById('pf-category').value = p.category || '';
    document.getElementById('pf-main-group').value = p.mainGroup || '';
    document.getElementById('pf-detail-pos').value = p.detailPos || '';
    document.getElementById('pf-sub').value = p.sub || '';
    document.getElementById('pf-guardian-email').value = p.guardianEmail || '';
    document.getElementById('pf-photo').value = p.photo || '';
    document.getElementById('pf-profile').value = p.profile || '';
  } else {
    title.textContent = '選手を追加';
    document.getElementById('pf-name').value = '';
    document.getElementById('pf-name-roman').value = '';
    document.getElementById('pf-number').value = '';
    document.getElementById('pf-grade').value = '';
    document.getElementById('pf-category').value = '';
    document.getElementById('pf-main-group').value = '';
    document.getElementById('pf-detail-pos').value = '';
    document.getElementById('pf-sub').value = '';
    document.getElementById('pf-guardian-email').value = '';
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
    category: document.getElementById('pf-category').value,
    mainGroup,
    detailPos: document.getElementById('pf-detail-pos').value,
    sub: document.getElementById('pf-sub').value,
    guardianEmail: document.getElementById('pf-guardian-email').value.trim(),
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
      body: JSON.stringify({ players, matches, schedules, posts, opponents, surveys, resetStamp: getResetStamp() }),
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
          body: JSON.stringify({ players, matches, schedules, posts, opponents, surveys, resetStamp: getResetStamp() }),
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
  if (selectedAnnSchedId !== id) announcementSnsImage = '';
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
function renderAnnSnsStatus(sc) {
  const slot = document.getElementById('ann-sns-slot');
  if (!slot) return;
  let statusEl = document.getElementById('ann-sns-status');
  if (!statusEl) {
    statusEl = document.createElement('div');
    statusEl.id = 'ann-sns-status';
    statusEl.className = 'ann-sns-status';
    slot.appendChild(statusEl);
  }
  statusEl.innerHTML = announcementSnsImage
    ? `<img src="${announcementSnsImage}" class="ann-sns-status-thumb" alt="">
       <span class="ann-sns-status-text ann-sns-status-set">画像：設定済み</span>`
    : `<span class="ann-sns-status-text ann-sns-status-none">画像：未設定</span>`;
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
    image: annCardImage || announcementSnsImage || null,
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
      body: JSON.stringify({ players, matches, schedules, posts, opponents, surveys, resetStamp: getResetStamp() }),
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
  annCardImage = null;
  const annPrev = document.getElementById('ann-image-preview');
  if (annPrev) annPrev.style.display = 'none';
  const annClr = document.getElementById('ann-image-clear');
  if (annClr) annClr.style.display = 'none';
  pushPage('page-announcement');
}

// ===== RESULT ENTRY (from dashboard) =====
function renderResultEntry() {
  const today = todayStr();
  const pending = matches.filter(m => !m.result?.grandePosted && m.date <= today).sort((a,b) => a.date < b.date ? 1 : -1);
  const el = document.getElementById('result-entry-match-list');

  // スケジュール起点：試合日を過ぎた予定で、まだ結果登録が始まっていないもの
  const schedPending = schedules.filter(s =>
    s.date && s.date <= today && s.type !== '練習' && (s.opponent || '').trim() &&
    (!s.matchId || !matches.some(m => m.id === s.matchId))
  ).sort((a, b) => a.date < b.date ? 1 : -1).slice(0, 10);

  const schedHtml = schedPending.length === 0 ? '' : `
    <div style="font-size:12px;font-weight:700;color:var(--c-text2);margin:2px 0 6px">📅 スケジュールの試合から登録（タップ → スコア入力へ）</div>
    ${schedPending.map(s => `
      <div class="match-card" onclick="startResultFromSchedule('${s.id}')">
        <div class="match-card-top">
          <span style="font-size:12px;color:var(--c-muted)">${fmtDate(s.date)}</span>
          <span class="chip type-official" style="margin-left:6px">${escEmg(s.type || '試合')}</span>
          ${s.category ? `<span style="font-size:11px;color:var(--c-muted);margin-left:6px">${escEmg(s.category)}</span>` : ''}
        </div>
        <div class="match-card-body">
          <span class="match-card-opp">${escEmg(s.opponent)}</span>
          <span class="no-result-text">結果を登録する →</span>
        </div>
      </div>
    `).join('')}
    ${pending.length ? '<div style="font-size:12px;font-weight:700;color:var(--c-text2);margin:14px 0 6px">✏️ 登録途中・未公開の試合</div>' : ''}
  `;

  if (pending.length === 0 && schedPending.length === 0) {
    el.innerHTML = '<div style="padding:12px;font-size:13px;color:var(--c-muted);text-align:center">未公開の試合はありません<br><span style="font-size:12px">スケジュールに試合を登録すると、試合日のあとにここへ表示されます</span></div>';
    return;
  }
  el.innerHTML = schedHtml + pending.map(m => {
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

// ===== SURVEY =====
function attrEsc(s) { return String(s == null ? '' : s).replace(/"/g, '&quot;'); }

function surveyQuestionTypeLabel(type) {
  return { single: '単一選択', multi: '複数選択', text: '自由記述', number: '数値', schedule: '日程調整（○△×）' }[type] || type;
}

function renderSurveyList() {
  const el = document.getElementById('survey-list-body');
  if (!el) return;
  if (surveys.length === 0) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">🗳️</div><div class="empty-title">アンケートがありません</div><div class="empty-desc">「+作成」から出欠確認や日程調整のアンケートを作成しましょう</div></div>`;
    return;
  }
  const sorted = [...surveys].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  const today = todayStr();
  el.innerHTML = sorted.map(s => {
    const idx = surveys.indexOf(s);
    let statusLabel = '下書き', statusClass = 'badge-other';
    if (s.published) {
      if (s.deadline && s.deadline < today) { statusLabel = '締切'; statusClass = 'badge-match'; }
      else { statusLabel = '公開中'; statusClass = 'badge-official'; }
    }
    return `
      <div class="opp-card">
        <div class="opp-card-info">
          <div class="opp-card-name">${s.title} <span class="sched-badge ${statusClass}" style="margin-left:6px">${statusLabel}</span></div>
          <div class="opp-card-meta">
            <span>${s.questions.length}問</span>
            ${s.deadline ? `<span>期限: ${fmtDate(s.deadline)}</span>` : ''}
            ${s.identifyRespondent ? '<span>👤 選手名で識別</span>' : ''}
          </div>
        </div>
        <div class="opp-card-actions">
          <button class="btn btn-primary btn-sm" onclick="openSurveyResults('${s.id}')">結果を見る</button>
          <button class="btn btn-secondary btn-sm" onclick="openSurveyModal(${idx})">編集</button>
          <button class="btn btn-ghost btn-sm" style="color:var(--c-red);font-size:12px" onclick="deleteSurvey(${idx})">削除</button>
        </div>
      </div>
    `;
  }).join('');
}

// ----- 作成・編集モーダル -----
function openSurveyModal(idx = null) {
  editingSurveyIdx = idx;
  const title = document.getElementById('modal-survey-title');
  if (idx !== null && surveys[idx]) {
    const s = surveys[idx];
    title.textContent = 'アンケートを編集';
    document.getElementById('svf-title').value = s.title || '';
    document.getElementById('svf-description').value = s.description || '';
    document.getElementById('svf-deadline').value = s.deadline || '';
    document.getElementById('svf-identify').checked = s.identifyRespondent !== false;
    document.getElementById('svf-published').checked = !!s.published;
    surveyQuestions = (s.questions || []).map(q => ({
      id: q.id, type: q.type, label: q.label, required: q.required,
      options: q.options ? [...q.options] : ['', ''],
      dates: q.dates ? [...q.dates] : [''],
    }));
    surveyParticipants = [...(s.participants || [])];
  } else {
    title.textContent = 'アンケートを作成';
    document.getElementById('svf-title').value = '';
    document.getElementById('svf-description').value = '';
    document.getElementById('svf-deadline').value = '';
    document.getElementById('svf-identify').checked = true;
    document.getElementById('svf-published').checked = true;
    surveyQuestions = [];
    surveyParticipants = [];
  }
  participantSearchQuery = '';
  document.getElementById('sf-participant-search').value = '';
  document.getElementById('sf-participants-wrap').hidden = !document.getElementById('svf-identify').checked;
  renderSurveyQuestionEditor();
  renderSurveyParticipantPicker();
  openModal('modal-survey');
}

function renderSurveyParticipantPicker() {
  const el = document.getElementById('sf-participants');
  const countEl = document.getElementById('sf-participant-count');
  if (!el) return;
  const q = participantSearchQuery.toLowerCase();
  const filtered = q ? players.filter(p => (p.name || '').toLowerCase().includes(q)) : players;
  if (players.length === 0) {
    el.innerHTML = `<div style="font-size:12.5px;color:var(--c-muted)">選手が登録されていません</div>`;
  } else if (filtered.length === 0) {
    el.innerHTML = `<div style="font-size:12.5px;color:var(--c-muted)">「${participantSearchQuery}」に一致する選手がいません</div>`;
  } else {
    el.innerHTML = filtered.map(p => {
      const checked = surveyParticipants.includes(p.id);
      const catLabel = p.category ? ` <span style="opacity:.55">(${p.category})</span>` : '';
      return `<label class="cat-check-label"><input type="checkbox" class="sf-participant-check" value="${p.id}" ${checked ? 'checked' : ''} onchange="toggleSurveyParticipant('${p.id}', this.checked)"> ${p.name}${catLabel}</label>`;
    }).join('');
  }
  countEl.textContent = surveyParticipants.length === 0 ? '全選手が対象' : `${surveyParticipants.length}人を選択中`;
  renderSurveyParticipantCatChips();
}
function renderSurveyParticipantCatChips() {
  const el = document.getElementById('sf-participant-cats');
  if (!el) return;
  const cats = [...new Set(players.map(p => p.category).filter(Boolean))];
  if (cats.length === 0) { el.hidden = true; el.innerHTML = ''; return; }
  el.hidden = false;
  el.innerHTML = cats.map(cat => {
    const catPlayers = players.filter(p => p.category === cat).map(p => p.id);
    const allSelected = catPlayers.length > 0 && catPlayers.every(id => surveyParticipants.includes(id));
    return `<button type="button" class="chip chip-btn ${getCatBadgeClass(cat)} ${allSelected ? 'is-active' : ''}" onclick="toggleSurveyParticipantCategory('${cat}')">${cat}（${catPlayers.length}名）${allSelected ? ' ✓' : ''}</button>`;
  }).join('');
}
function toggleSurveyParticipantCategory(cat) {
  const catPlayers = players.filter(p => p.category === cat).map(p => p.id);
  const allSelected = catPlayers.length > 0 && catPlayers.every(id => surveyParticipants.includes(id));
  if (allSelected) {
    surveyParticipants = surveyParticipants.filter(id => !catPlayers.includes(id));
  } else {
    catPlayers.forEach(id => { if (!surveyParticipants.includes(id)) surveyParticipants.push(id); });
  }
  renderSurveyParticipantPicker();
}
function toggleSurveyParticipant(playerId, checked) {
  if (checked) { if (!surveyParticipants.includes(playerId)) surveyParticipants.push(playerId); }
  else { surveyParticipants = surveyParticipants.filter(id => id !== playerId); }
  document.getElementById('sf-participant-count').textContent = surveyParticipants.length === 0 ? '全選手が対象' : `${surveyParticipants.length}人を選択中`;
  renderSurveyParticipantCatChips();
}
function selectAllSurveyParticipants() {
  surveyParticipants = players.map(p => p.id);
  renderSurveyParticipantPicker();
}
function clearSurveyParticipants() {
  surveyParticipants = [];
  renderSurveyParticipantPicker();
}

function renderSurveyQuestionEditor() {
  const el = document.getElementById('sq-question-list');
  if (!el) return;
  if (surveyQuestions.length === 0) {
    el.innerHTML = `<div style="font-size:12.5px;color:var(--c-muted);padding:10px 0">質問がありません。「+質問を追加」から始めましょう。</div>`;
    return;
  }
  const typeList = ['single', 'multi', 'text', 'number', 'schedule'];
  el.innerHTML = surveyQuestions.map((q, idx) => {
    const typeOptions = typeList.map(t => `<option value="${t}" ${q.type === t ? 'selected' : ''}>${surveyQuestionTypeLabel(t)}</option>`).join('');

    let extraHtml = '';
    if (q.type === 'single' || q.type === 'multi') {
      extraHtml = `
        <div class="form-group">
          <label class="form-label">選択肢</label>
          ${q.options.map((opt, oi) => `
            <div style="display:flex;gap:6px;margin-bottom:6px">
              <input class="form-input" type="text" value="${attrEsc(opt)}" oninput="updateSurveyOption(${idx},${oi},this.value)" placeholder="選択肢 ${oi + 1}">
              <button class="btn-icon btn-icon-sm" style="color:var(--c-red)" onclick="removeSurveyOption(${idx},${oi})">✕</button>
            </div>
          `).join('')}
          <button class="btn btn-ghost btn-sm" onclick="addSurveyOption(${idx})">+ 選択肢を追加</button>
        </div>`;
    } else if (q.type === 'schedule') {
      extraHtml = `
        <div class="form-group">
          <label class="form-label">候補日</label>
          ${q.dates.map((d, di) => `
            <div style="display:flex;gap:6px;margin-bottom:6px">
              <input class="form-input" type="date" value="${d || ''}" oninput="updateSurveyDate(${idx},${di},this.value)">
              <button class="btn-icon btn-icon-sm" style="color:var(--c-red)" onclick="removeSurveyDate(${idx},${di})">✕</button>
            </div>
          `).join('')}
          <button class="btn btn-ghost btn-sm" onclick="addSurveyDate(${idx})">+ 候補日を追加</button>
        </div>`;
    }

    return `
      <div style="border:1px solid var(--c-border);border-radius:10px;padding:12px;margin-bottom:10px">
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label">質問文</label>
            <input class="form-input" type="text" value="${attrEsc(q.label)}" oninput="updateSurveyQuestionField(${idx},'label',this.value)" placeholder="例）参加できますか？">
          </div>
          <div class="form-group">
            <label class="form-label">タイプ</label>
            <select class="form-select" onchange="updateSurveyQuestionType(${idx},this.value)">${typeOptions}</select>
          </div>
        </div>
        ${extraHtml}
        <label style="display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--c-text2);margin-top:4px">
          <input type="checkbox" ${q.required ? 'checked' : ''} onchange="updateSurveyQuestionField(${idx},'required',this.checked)"> 必須回答
        </label>
        <button class="btn btn-ghost btn-sm" style="color:var(--c-red);margin-top:8px" onclick="removeSurveyQuestion(${idx})">🗑 この質問を削除</button>
      </div>
    `;
  }).join('');
}

function addSurveyQuestion() {
  surveyQuestions.push({ id: 'q' + Date.now() + Math.random().toString(36).slice(2, 6), type: 'single', label: '', required: true, options: ['', ''], dates: [''] });
  renderSurveyQuestionEditor();
}
function removeSurveyQuestion(idx) { surveyQuestions.splice(idx, 1); renderSurveyQuestionEditor(); }
function updateSurveyQuestionField(idx, field, value) { if (surveyQuestions[idx]) surveyQuestions[idx][field] = value; }
function updateSurveyQuestionType(idx, value) {
  const q = surveyQuestions[idx];
  if (!q) return;
  q.type = value;
  if ((value === 'single' || value === 'multi') && (!q.options || q.options.length === 0)) q.options = ['', ''];
  if (value === 'schedule' && (!q.dates || q.dates.length === 0)) q.dates = [''];
  renderSurveyQuestionEditor();
}
function updateSurveyOption(qIdx, oIdx, value) { if (surveyQuestions[qIdx]) surveyQuestions[qIdx].options[oIdx] = value; }
function addSurveyOption(qIdx) { surveyQuestions[qIdx].options.push(''); renderSurveyQuestionEditor(); }
function removeSurveyOption(qIdx, oIdx) { surveyQuestions[qIdx].options.splice(oIdx, 1); renderSurveyQuestionEditor(); }
function updateSurveyDate(qIdx, dIdx, value) { if (surveyQuestions[qIdx]) surveyQuestions[qIdx].dates[dIdx] = value; }
function addSurveyDate(qIdx) { surveyQuestions[qIdx].dates.push(''); renderSurveyQuestionEditor(); }
function removeSurveyDate(qIdx, dIdx) { surveyQuestions[qIdx].dates.splice(dIdx, 1); renderSurveyQuestionEditor(); }

function saveSurveyForm() {
  const title = document.getElementById('svf-title').value.trim();
  if (!title) { showToast('タイトルを入力してください', 'error'); return; }

  const validQuestions = surveyQuestions
    .map(q => ({
      id: q.id,
      type: q.type,
      label: (q.label || '').trim(),
      required: !!q.required,
      options: (q.type === 'single' || q.type === 'multi') ? q.options.map(o => (o || '').trim()).filter(Boolean) : undefined,
      dates: (q.type === 'schedule') ? q.dates.map(d => (d || '').trim()).filter(Boolean) : undefined,
    }))
    .filter(q => q.label);

  if (validQuestions.length === 0) { showToast('質問を1つ以上入力してください', 'error'); return; }
  for (const q of validQuestions) {
    if ((q.type === 'single' || q.type === 'multi') && q.options.length < 2) { showToast(`「${q.label}」の選択肢を2つ以上入力してください`, 'error'); return; }
    if (q.type === 'schedule' && q.dates.length < 1) { showToast(`「${q.label}」の候補日を1つ以上入力してください`, 'error'); return; }
  }

  const existing = (editingSurveyIdx !== null && surveys[editingSurveyIdx]) ? surveys[editingSurveyIdx] : null;
  const s = {
    id: existing ? existing.id : String(Date.now()),
    title,
    description: document.getElementById('svf-description').value.trim(),
    deadline: document.getElementById('svf-deadline').value || '',
    identifyRespondent: document.getElementById('svf-identify').checked,
    published: document.getElementById('svf-published').checked,
    participants: [...surveyParticipants],
    questions: validQuestions,
    createdAt: existing ? existing.createdAt : new Date().toISOString(),
  };
  if (existing) {
    surveys[editingSurveyIdx] = s;
  } else {
    surveys.push(s);
  }
  saveLocal();
  closeModal('modal-survey');
  showToast(existing ? '更新しました' : '作成しました', 'success');
  renderSurveyList();
  editingSurveyIdx = null;
}

function deleteSurvey(idx) {
  showConfirm('アンケートを削除', `「${surveys[idx].title}」を削除しますか？回答データも失われます。`, '削除する', () => {
    surveys.splice(idx, 1);
    saveLocal();
    renderSurveyList();
    showToast('削除しました');
  });
}

// ----- 共有リンク -----
function buildSurveyShareUrl(id) {
  const s = getSettings();
  // Planner は clubs/{clubId}/ホームページ/planner/ に、回答ページは同階層の survey/ にデプロイされる想定
  const base = location.href.replace(/planner\/(index\.html)?(\?.*)?(#.*)?$/, 'survey/');
  return `${base}?id=${encodeURIComponent(id)}`;
}
function copySurveyLink(id) {
  const url = buildSurveyShareUrl(id);
  navigator.clipboard.writeText(url).then(() => {
    showToast('回答用リンクをコピーしました', 'success');
  }).catch(() => {
    showToast(url, 'info');
  });
}

// ----- 結果ページ -----
function openSurveyResults(id) {
  currentSurveyId = id;
  pushPage('page-survey-results');
}

async function renderSurveyResults() {
  const survey = surveys.find(s => s.id === currentSurveyId);
  const body = document.getElementById('survey-results-body');
  const titleEl = document.getElementById('survey-results-title');
  if (!survey || !body) return;
  titleEl.textContent = survey.title;

  const shareUrl = buildSurveyShareUrl(survey.id);
  const qrImg = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(shareUrl)}`;

  const s = getSettings();
  if (!isCloudConfigured(s)) {
    body.innerHTML = `<div class="empty-state"><div class="empty-title">Firebase未設定です</div><div class="empty-desc">設定画面でクラウド連携を行うと回答を集計できます</div></div>`;
    return;
  }

  body.innerHTML = `<div class="empty-state"><div class="empty-title">回答を読み込み中...</div></div>`;
  surveyResultsLoading = true;
  try {
    const url = `${s.firebaseUrl}/surveys/${s.clubId}/${survey.id}/responses.json?auth=${s.firebaseSecret}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json() || {};
    surveyResponses = Object.keys(data).map(k => Object.assign({ fbKey: k }, data[k]));
  } catch (e) {
    body.innerHTML = `<div class="empty-state"><div class="empty-title">回答の取得に失敗しました</div><div class="empty-desc">${e.message}</div></div>`;
    surveyResultsLoading = false;
    return;
  }
  surveyResultsLoading = false;
  responseSearchQuery = '';
  expandedResponseKeys = new Set();
  renderSurveyResultsBody();
}

function surveyTargetPlayers(survey) {
  return (survey.participants && survey.participants.length) ? players.filter(p => survey.participants.includes(p.id)) : players;
}

function renderSurveyResultsBody() {
  const survey = surveys.find(s => s.id === currentSurveyId);
  const body = document.getElementById('survey-results-body');
  if (!survey || !body) return;

  const shareUrl = buildSurveyShareUrl(survey.id);
  const qrImg = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(shareUrl)}`;

  const total = surveyResponses.length;
  const targetPlayers = surveyTargetPlayers(survey);
  const respondentPlayerIds = new Set(surveyResponses.filter(r => r.playerId).map(r => r.playerId));
  const unanswered = survey.identifyRespondent ? targetPlayers.filter(p => !respondentPlayerIds.has(p.id)) : [];
  const rate = (survey.identifyRespondent && targetPlayers.length) ? Math.round((respondentPlayerIds.size / targetPlayers.length) * 100) : null;

  const questionBlocks = survey.questions.map(q => {
    if (q.type === 'text') {
      const answers = surveyResponses.map(r => (r.answers || {})[q.id]).filter(Boolean);
      return `
        <div class="form-group">
          <div class="form-label">${q.label}</div>
          ${answers.length ? answers.map(a => `<div style="padding:8px 10px;background:var(--c-surface);border:1px solid var(--c-border);border-radius:8px;margin-bottom:6px;font-size:13px">${a}</div>`).join('') : '<div style="font-size:12.5px;color:var(--c-muted)">回答はまだありません</div>'}
        </div>`;
    }
    if (q.type === 'number') {
      const nums = surveyResponses.map(r => Number((r.answers || {})[q.id])).filter(n => !isNaN(n));
      const avg = nums.length ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1) : '-';
      return `
        <div class="form-group">
          <div class="form-label">${q.label}</div>
          <div style="font-size:13px">回答数: ${nums.length}件　平均: ${avg}</div>
        </div>`;
    }
    if (q.type === 'schedule') {
      const rows = q.dates.map(d => {
        let ok = 0, maybe = 0, ng = 0;
        surveyResponses.forEach(r => {
          const v = ((r.answers || {})[q.id] || {})[d];
          if (v === '○') ok++; else if (v === '△') maybe++; else if (v === '×') ng++;
        });
        return { d, ok, maybe, ng };
      });
      const maxOk = Math.max(0, ...rows.map(r => r.ok));
      return `
        <div class="form-group">
          <div class="form-label">${q.label}（日程調整）</div>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${rows.map(r => `
              <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;background:${r.ok === maxOk && maxOk > 0 ? 'var(--c-green-bg)' : 'var(--c-surface)'};border:1px solid var(--c-border)">
                <span style="font-size:13px;font-weight:600;min-width:110px">${fmtDate(r.d)}${r.ok === maxOk && maxOk > 0 ? ' 🏆' : ''}</span>
                <span style="font-size:12.5px">○ ${r.ok}　△ ${r.maybe}　× ${r.ng}</span>
              </div>
            `).join('')}
          </div>
        </div>`;
    }
    // single / multi
    const counts = {};
    (q.options || []).forEach(o => counts[o] = 0);
    surveyResponses.forEach(r => {
      const v = (r.answers || {})[q.id];
      const arr = Array.isArray(v) ? v : (v ? [v] : []);
      arr.forEach(a => { if (counts[a] !== undefined) counts[a]++; });
    });
    const max = Math.max(1, ...Object.values(counts));
    return `
      <div class="form-group">
        <div class="form-label">${q.label}</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${Object.keys(counts).map(o => `
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:2px"><span>${o}</span><span>${counts[o]}件</span></div>
              <div style="height:8px;background:var(--c-border);border-radius:4px;overflow:hidden"><div style="height:100%;width:${(counts[o] / max) * 100}%;background:var(--c-green)"></div></div>
            </div>
          `).join('')}
        </div>
      </div>`;
  }).join('');

  const gradeGroups = {};
  if (survey.identifyRespondent) {
    targetPlayers.forEach(p => {
      const g = p.grade || '未設定';
      if (!gradeGroups[g]) gradeGroups[g] = { total: 0, answered: 0 };
      gradeGroups[g].total++;
      if (respondentPlayerIds.has(p.id)) gradeGroups[g].answered++;
    });
  }
  const gradeKeys = Object.keys(gradeGroups);
  const gradeBreakdownHtml = (survey.identifyRespondent && gradeKeys.length > 1) ? `
    <div class="form-group">
      <div class="form-label">学年別回答率</div>
      <div style="display:flex;flex-direction:column;gap:2px">
        ${gradeKeys.map(g => {
          const gr = gradeGroups[g];
          const pct = gr.total ? Math.round((gr.answered / gr.total) * 100) : 0;
          return `<div style="display:flex;align-items:center;justify-content:space-between;font-size:12.5px;padding:6px 0;border-bottom:1px solid var(--c-border)"><span>${g}</span><span>${gr.answered}/${gr.total}人（${pct}%）</span></div>`;
        }).join('')}
      </div>
    </div>` : '';

  body.innerHTML = `
    <div class="opp-card" style="flex-wrap:wrap">
      <div class="opp-card-info">
        <div class="opp-card-name">回答数 ${total}件${rate !== null ? `（回答率 ${rate}%）` : ''}</div>
        <div class="opp-card-meta"><span>共有リンクから誰でも回答できます</span></div>
      </div>
      <div class="opp-card-actions" style="flex-direction:row">
        <button class="btn btn-secondary btn-sm" onclick="copySurveyLink('${survey.id}')">🔗 リンクをコピー</button>
        <button class="btn btn-secondary btn-sm" onclick="exportSurveyResultsCsv()">📥 CSV出力</button>
      </div>
    </div>
    <div style="text-align:center;padding:14px 0">
      <img src="${qrImg}" alt="回答用QRコード" style="border-radius:8px">
      <div style="font-size:11px;color:var(--c-muted);margin-top:6px">スマホで読み取ってすぐ回答できます</div>
    </div>
    ${survey.identifyRespondent ? `
      <div class="form-group">
        <div class="form-label">未回答（${unanswered.length}名）</div>
        ${unanswered.length ? `
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">
            ${unanswered.map(p => `<span class="sched-badge badge-other">${p.name}</span>`).join('')}
          </div>
          <button class="btn btn-secondary btn-sm" onclick="copyUnansweredReminder()">📋 リマインド文をコピー</button>
        ` : '<div style="font-size:12.5px;color:var(--c-green)">全員回答済みです 🎉</div>'}
      </div>
    ` : ''}
    ${gradeBreakdownHtml}
    <div class="spacer"></div>
    ${questionBlocks}
    <div class="spacer"></div>
    <div class="form-group">
      <div class="form-label">個別回答一覧（${total}件）</div>
      <input class="form-input" type="search" id="survey-response-search" placeholder="名前で検索..." style="margin-bottom:8px" oninput="filterSurveyResponses(this.value)">
      <div id="survey-response-list">${buildResponseCardsHtml(survey)}</div>
    </div>
  `;
}

function buildResponseCardsHtml(survey) {
  const respQuery = responseSearchQuery.toLowerCase();
  const respFiltered = respQuery ? surveyResponses.filter(r => (r.playerName || r.respondentName || '').toLowerCase().includes(respQuery)) : surveyResponses;
  const respSorted = [...respFiltered].sort((a, b) => (b.submittedAt || '').localeCompare(a.submittedAt || ''));
  if (respSorted.length === 0) return `<div style="font-size:12.5px;color:var(--c-muted)">該当する回答がありません</div>`;
  return respSorted.map(r => {
    const name = r.playerName || r.respondentName || '匿名';
    const isOpen = expandedResponseKeys.has(r.fbKey);
    const dt = r.submittedAt ? new Date(r.submittedAt).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
    return `
      <div style="border:1px solid var(--c-border);border-radius:8px;margin-bottom:8px;overflow:hidden">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;cursor:pointer" onclick="toggleResponseDetail('${r.fbKey}')">
          <div><span style="font-weight:600;font-size:13.5px">${name}</span> <span style="font-size:11px;color:var(--c-muted)">${dt}</span></div>
          <span style="font-size:12px;color:var(--c-muted)">${isOpen ? '閉じる ▲' : '詳細 ▼'}</span>
        </div>
        ${isOpen ? `
          <div style="padding:0 12px 12px;border-top:1px solid var(--c-border)">
            ${survey.questions.map(q => `<div style="padding-top:8px;font-size:12.5px"><span style="color:var(--c-muted)">${q.label}：</span>${fmtSurveyAnswerForDisplay(q, (r.answers || {})[q.id])}</div>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}
function fmtSurveyAnswerForDisplay(q, v) {
  if (v == null || v === '' || (Array.isArray(v) && v.length === 0)) return '（未回答）';
  if (q.type === 'schedule') return q.dates.map(d => `${fmtDate(d)}:${v[d] || '-'}`).join('　');
  if (Array.isArray(v)) return v.join('、');
  return String(v);
}
function renderResponseListOnly() {
  const survey = surveys.find(s => s.id === currentSurveyId);
  const el = document.getElementById('survey-response-list');
  if (!survey || !el) return;
  el.innerHTML = buildResponseCardsHtml(survey);
}
function toggleResponseDetail(fbKey) {
  if (expandedResponseKeys.has(fbKey)) expandedResponseKeys.delete(fbKey);
  else expandedResponseKeys.add(fbKey);
  renderResponseListOnly();
}
function filterSurveyResponses(value) {
  responseSearchQuery = value;
  renderResponseListOnly();
}

function exportSurveyResultsCsv() {
  const survey = surveys.find(s => s.id === currentSurveyId);
  if (!survey) return;
  const headers = ['回答者', ...survey.questions.map(q => q.label), '送信日時'];
  const rows = surveyResponses.map(r => {
    const name = r.playerName || r.respondentName || '匿名';
    const cells = survey.questions.map(q => {
      const v = (r.answers || {})[q.id];
      if (q.type === 'schedule') return Object.entries(v || {}).map(([d, val]) => `${d}:${val}`).join(' / ');
      if (Array.isArray(v)) return v.join(' / ');
      return v == null ? '' : String(v);
    });
    return [name, ...cells, r.submittedAt || ''];
  });
  const csv = [headers, ...rows].map(row => row.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${survey.title}_回答.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function copyUnansweredReminder() {
  const survey = surveys.find(s => s.id === currentSurveyId);
  if (!survey) return;
  const respondentPlayerIds = new Set(surveyResponses.filter(r => r.playerId).map(r => r.playerId));
  const unanswered = surveyTargetPlayers(survey).filter(p => !respondentPlayerIds.has(p.id));
  const url = buildSurveyShareUrl(survey.id);
  const text = `【アンケートのお願い】\n「${survey.title}」にまだご回答いただいていません。\n対象: ${unanswered.map(p => p.name).join('、')}\nこちらからご回答をお願いします → ${url}`;
  navigator.clipboard.writeText(text).then(() => {
    showToast('リマインド文をコピーしました', 'success');
  }).catch(() => {
    showToast('コピーに失敗しました', 'error');
  });
}

// ===== SETTINGS =====
function renderSettingsPage() {
  const s = getSettings();
  document.getElementById('settings-club-name').value       = s.clubName    || '';
  document.getElementById('settings-club-id').value         = s.clubId      || '';
  document.getElementById('settings-firebase-url').value    = s.firebaseUrl || '';
  document.getElementById('settings-firebase-secret').value = s.firebaseSecret || '';
  const gasUrlEl = document.getElementById('settings-gas-url');
  const gasKeyEl = document.getElementById('settings-gas-key');
  if (gasUrlEl) gasUrlEl.value = s.gasUrl || '';
  if (gasKeyEl) gasKeyEl.value = s.gasKey || '';
  const imgbbEl = document.getElementById('settings-imgbb-key');
  if (imgbbEl) imgbbEl.value = s.imgbbKey || '';
}
function saveSettingsForm() {
  const secret = document.getElementById('settings-firebase-secret').value.trim();
  const gasUrl = (document.getElementById('settings-gas-url')?.value || '').trim();
  const gasKey = (document.getElementById('settings-gas-key')?.value || '').trim();
  const imgbbKey = (document.getElementById('settings-imgbb-key')?.value || '').trim();
  saveSettings({ firebaseSecret: secret, gasUrl, gasKey, imgbbKey });
  emergencyGroupsLoaded = false; // GAS設定が変わったらグループを取り直す
  showToast('設定を保存しました', 'success');
  // 保存後すぐにクラウドから読み込む
  if (secret) loadFromCloud();
}

// 運用開始リセット：試合・投稿・スケジュールを全削除（選手・対戦相手・アンケートは残す）
function resetOperationalData() {
  const summary = `試合 ${matches.length}件・ホームページ投稿 ${posts.length}件・スケジュール ${schedules.length}件`;
  if (matches.length + posts.length + schedules.length === 0) {
    showToast('削除できるデータがありません', 'info');
    return;
  }
  if (!confirm(`${summary} を削除します。\nホームページの表示（お知らせ・試合結果・ネクストマッチ）からも消えます。\nよろしいですか？`)) return;
  if (!confirm('この操作は取り消せません。本当に削除しますか？')) return;

  matches = [];
  posts = [];
  schedules = [];
  currentMatch = null;
  selectedAnnSchedId = null;
  // リセット印を更新 → クラウド経由で全端末に削除が伝わる（古い端末からの復活を防ぐ）
  setResetStamp(Date.now());
  saveLocal();
  renderCurrentPage();
  showToast(`${summary} を削除しました。数秒後にホームページへ反映されます`, 'success');
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

  // Survey
  document.getElementById('btn-add-survey')?.addEventListener('click', () => openSurveyModal());
  document.getElementById('btn-survey-save')?.addEventListener('click', saveSurveyForm);
  document.getElementById('btn-survey-cancel')?.addEventListener('click', () => closeModal('modal-survey'));
  document.getElementById('btn-close-survey-modal')?.addEventListener('click', () => closeModal('modal-survey'));
  document.getElementById('btn-survey-add-question')?.addEventListener('click', addSurveyQuestion);
  document.getElementById('btn-back-survey-results')?.addEventListener('click', popPage);
  document.getElementById('svf-identify')?.addEventListener('change', e => {
    document.getElementById('sf-participants-wrap').hidden = !e.target.checked;
  });
  document.getElementById('sf-participant-search')?.addEventListener('input', e => {
    participantSearchQuery = e.target.value;
    renderSurveyParticipantPicker();
  });
  document.getElementById('btn-survey-select-all-participants')?.addEventListener('click', selectAllSurveyParticipants);
  document.getElementById('btn-survey-clear-participants')?.addEventListener('click', clearSurveyParticipants);

  // SNS画像作成
  document.getElementById('btn-back-sns')?.addEventListener('click', popPage);
  document.querySelectorAll('.sns-kind-btn').forEach(b => {
    b.addEventListener('click', () => snsApplyKind(b.dataset.kind));
  });
  document.getElementById('btn-sns-photo')?.addEventListener('click', () => document.getElementById('sns-photo-input')?.click());
  document.getElementById('sns-photo-input')?.addEventListener('change', e => snsLoadPhotoFile(e.target.files && e.target.files[0]));
  document.getElementById('btn-sns-photo-clear')?.addEventListener('click', snsClearPhoto);
  document.getElementById('sns-zoom')?.addEventListener('input', e => {
    snsPhotoState.scale = Math.max(1, Math.min(3, Number(e.target.value) / 100));
    snsDrawPhoto();
  });
  document.getElementById('btn-sns-save')?.addEventListener('click', snsExport);
  document.getElementById('btn-close-sns-export')?.addEventListener('click', () => closeModal('modal-sns-export'));
  document.getElementById('btn-sns-set-thumb')?.addEventListener('click', snsSetThumb);
  snsBindFieldsOnce();
  snsBindDrag();
  window.addEventListener('resize', snsFitPreview);

  // 食堂管理
  document.querySelectorAll('#shokudo-tab-bar .tab-btn').forEach(b => {
    b.addEventListener('click', () => switchShokudoTab(b.dataset.sktab));
  });

  // 緊急連絡
  document.getElementById('btn-emergency-send')?.addEventListener('click', sendEmergencyViaGas);
  document.getElementById('btn-emergency-groups-reload')?.addEventListener('click', () => loadEmergencyGroups(true));
  document.getElementById('btn-emergency-mailto')?.addEventListener('click', openEmergencyMail);
  document.getElementById('btn-copy-emergency-emails')?.addEventListener('click', copyEmergencyEmails);
  document.getElementById('btn-copy-emergency-message')?.addEventListener('click', copyEmergencyMessage);

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
  document.getElementById('btn-reset-operational')?.addEventListener('click', resetOperationalData);
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

// ===== SNS画像メーカー（試合告知・試合結果） =====
const SNS_TEMPLATES = [
  { id: 'resultA', kind: 'result', name: '試合結果A', desc: 'フォト×ネイビー' },
  { id: 'resultB', kind: 'result', name: '試合結果B', desc: '対戦カード型' },
  { id: 'resultC', kind: 'result', name: '試合結果C', desc: 'Jクラブ風' },
  { id: 'noticeA', kind: 'notice', name: '試合告知A', desc: 'NEXT MATCH' },
  { id: 'noticeB', kind: 'notice', name: '試合告知B', desc: '黒×ネイビー' },
  { id: 'noticeC', kind: 'notice', name: '試合告知C', desc: '写真重視' },
];
const snsData = {
  templateId: 'resultA', kind: 'result',
  club: localStorage.getItem('mp_sns_club') || '',
  competition: '', opponent: '',
  myScore: '', oppScore: '', scorers: '',
  date: '', time: '', venue: '',
};
const snsPhotoState = { img: null, scale: 1, x: 0, y: 0 };
let snsOrigin = 'home'; // 'home' | 'match' | 'schedule'
let announcementSnsImage = '';
let lastSnsThumb = (function () {
  try { return localStorage.getItem('mp_sns_last_thumb') || ''; } catch (e) { return ''; }
})();

function snsEsc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function snsFmtDate(d) {
  if (!d) return { ymd: '', dow: '' };
  const dt = new Date(d + 'T00:00:00');
  if (isNaN(dt)) return { ymd: d, dow: '' };
  const dows = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return { ymd: `${dt.getFullYear()}.${dt.getMonth() + 1}.${dt.getDate()}`, dow: dows[dt.getDay()] };
}
function snsScorerLines() {
  return String(snsData.scorers || '').split(/\n|、|,/).map(s => s.trim()).filter(Boolean);
}
function snsResultWord() {
  const a = parseInt(snsData.myScore, 10), b = parseInt(snsData.oppScore, 10);
  if (isNaN(a) || isNaN(b)) return '';
  return a > b ? 'WIN' : a < b ? 'LOSE' : 'DRAW';
}
function snsBadgeHtml(cls) {
  const w = snsResultWord();
  if (!w) return '';
  return `<div class="sns-badge sns-badge-${w.toLowerCase()} ${cls || ''}">${w}</div>`;
}
function snsScoreTxt(v) {
  const n = parseInt(v, 10);
  return isNaN(n) ? '0' : String(n);
}
function snsClubInitial(name) {
  const c = String(name || 'C').trim().charAt(0);
  return snsEsc(c.toUpperCase ? c.toUpperCase() : c);
}
function snsClubBadge() {
  return `<div class="sns-club-badge">
    <span class="sns-club-mark">${snsClubInitial(snsData.club)}</span>
    <span class="sns-club-name">${snsEsc(snsData.club)}</span>
  </div>`;
}
function snsPhotoBlock() {
  if (snsPhotoState.img) {
    return `<div class="snsP"><canvas class="sns-photo-cv" width="1080" height="1080"></canvas></div>`;
  }
  return `<div class="snsP snsP-ph"></div>`;
}

const SNS_TPL = {
  resultA(d) {
    const f = snsFmtDate(d.date);
    const lines = snsScorerLines();
    return `
      ${snsPhotoBlock()}
      <div class="ovl ovl-navy"></div>
      <div class="tplA-frame"></div>
      <div class="tplA-top">
        ${snsClubBadge()}
        <div class="tplA-comp">${snsEsc(d.competition)}</div>
      </div>
      <div class="tplA-center">
        <div class="tplA-ft">FULL TIME</div>
        <div class="tplA-score sns-num">${snsScoreTxt(d.myScore)}<span class="tplA-dash">-</span>${snsScoreTxt(d.oppScore)}</div>
        <div class="tplA-teams">${snsEsc(d.club)}<span class="tplA-vs">vs</span>${snsEsc(d.opponent)}</div>
        ${snsBadgeHtml('tplA-badge')}
      </div>
      <div class="tplA-bottom">
        <div class="tplA-scorers">${lines.map(s => `<span>⚽ ${snsEsc(s)}</span>`).join('')}</div>
        <div class="tplA-date sns-num">${snsEsc(f.ymd)}${f.dow ? ` <em>${f.dow}</em>` : ''}</div>
      </div>`;
  },
  resultB(d) {
    const f = snsFmtDate(d.date);
    const lines = snsScorerLines();
    return `
      ${snsPhotoBlock()}
      <div class="ovl"></div>
      <div class="tplB-stripe"></div>
      <div class="tplB-comp">${snsEsc(d.competition)}</div>
      <div class="tplB-row">
        <div class="tplB-team"><small>HOME</small>${snsEsc(d.club)}</div>
        <div class="tplB-scorebox">
          <div class="tplB-ft">FULL TIME</div>
          <div class="tplB-score sns-num">${snsScoreTxt(d.myScore)}<span>-</span>${snsScoreTxt(d.oppScore)}</div>
          ${snsBadgeHtml('tplB-badge')}
        </div>
        <div class="tplB-team"><small>AWAY</small>${snsEsc(d.opponent)}</div>
      </div>
      <div class="tplB-bottom">
        ${lines.length ? `<div class="tplB-scorers">${lines.map(s => `<span>⚽ ${snsEsc(s)}</span>`).join('')}</div>` : ''}
        <div class="tplB-date sns-num">${snsEsc(f.ymd)}${f.dow ? ` ${f.dow}` : ''}</div>
      </div>`;
  },
  resultC(d) {
    const f = snsFmtDate(d.date);
    const lines = snsScorerLines();
    return `
      ${snsPhotoBlock()}
      <div class="tplC-photo-ovl"></div>
      <div class="tplC-chip">${snsEsc(d.competition)}</div>
      ${snsBadgeHtml('tplC-badge')}
      <div class="tplC-panel">
        <div class="tplC-panel-row">
          <div class="tplC-score sns-num">${snsScoreTxt(d.myScore)}<span>-</span>${snsScoreTxt(d.oppScore)}</div>
          <div class="tplC-info">
            <div class="tplC-teams">${snsEsc(d.club)}<em>vs</em>${snsEsc(d.opponent)}</div>
            ${lines.length ? `<div class="tplC-scorers">⚽ ${lines.map(snsEsc).join('　')}</div>` : ''}
          </div>
        </div>
        <div class="tplC-foot">
          <span><b>MATCH RESULT</b></span>
          <span class="sns-num">${snsEsc(f.ymd)}${f.dow ? ` ${f.dow}` : ''}</span>
        </div>
      </div>`;
  },
  noticeA(d) {
    const f = snsFmtDate(d.date);
    return `
      ${snsPhotoBlock()}
      <div class="ovl"></div>
      <div class="tplNA-head">
        <div class="tplNA-next">NEXT <b>MATCH</b></div>
        <div class="tplNA-comp">${snsEsc(d.competition)}</div>
      </div>
      <div class="tplNA-card">
        <div class="tplNA-team">${snsEsc(d.club)}</div>
        <div class="tplNA-vs">VS</div>
        <div class="tplNA-team">${snsEsc(d.opponent)}</div>
      </div>
      <div class="tplNA-info">
        <div class="tplNA-date sns-num">${snsEsc(f.ymd)}${f.dow ? `<em>${f.dow}</em>` : ''}</div>
        ${d.time ? `<div class="tplNA-ko sns-num">KICK OFF ${snsEsc(d.time)}</div>` : ''}
        ${d.venue ? `<div class="tplNA-venue">📍 ${snsEsc(d.venue)}</div>` : ''}
      </div>`;
  },
  noticeB(d) {
    const f = snsFmtDate(d.date);
    const photo = snsPhotoState.img
      ? `<div class="tplNB-photo"><div class="snsP"><canvas class="sns-photo-cv" width="1080" height="1080"></canvas></div><div class="tplNB-photo-ovl"></div></div>`
      : '';
    return `
      <div class="tplNB-deco"></div>
      <div class="tplNB-line"></div>
      <div class="tplNB-body">
        <div class="tplNB-next">NEXT<br><b>MATCH</b></div>
        <div class="tplNB-comp">${snsEsc(d.competition)}</div>
        ${photo}
        <div class="tplNB-vs">${snsEsc(d.club)}<em>VS</em>${snsEsc(d.opponent)}</div>
        <div class="tplNB-grid">
          <div class="tplNB-cell"><div class="lab">DATE</div><div class="val sns-num">${snsEsc(f.ymd)}${f.dow ? `<em>${f.dow}</em>` : ''}</div></div>
          ${d.time ? `<div class="tplNB-cell"><div class="lab">KICK OFF</div><div class="val sns-num">${snsEsc(d.time)}</div></div>` : ''}
          ${d.venue ? `<div class="tplNB-cell"><div class="lab">VENUE</div><div class="val">${snsEsc(d.venue)}</div></div>` : ''}
        </div>
      </div>`;
  },
  noticeC(d) {
    const f = snsFmtDate(d.date);
    return `
      ${snsPhotoBlock()}
      <div class="ovl"></div>
      <div class="tplNC-club">${snsClubBadge()}</div>
      <div class="tplNC-comp">${snsEsc(d.competition)}</div>
      <div class="tplNC-bottom">
        <div class="tplNC-next">NEXT<br><b>MATCH</b></div>
        <div class="tplNC-opp"><em>vs</em>${snsEsc(d.opponent)}</div>
        <div class="tplNC-meta">
          <span class="sns-num">${snsEsc(f.ymd)}${f.dow ? ` ${f.dow}` : ''}</span>
          ${d.time ? `<span><b>KO</b> <span class="sns-num">${snsEsc(d.time)}</span></span>` : ''}
          ${d.venue ? `<span>📍 ${snsEsc(d.venue)}</span>` : ''}
        </div>
      </div>`;
  },
};

// ----- 写真処理（読み込み→自動リサイズ圧縮→正方形クロップ描画） -----
function snsLoadPhotoFile(file) {
  if (!file) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(url);
    const max = 2200;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    if (Math.max(iw, ih) > max) {
      const r = max / Math.max(iw, ih);
      const c = document.createElement('canvas');
      c.width = Math.round(iw * r); c.height = Math.round(ih * r);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      const im2 = new Image();
      im2.onload = () => snsSetPhoto(im2);
      im2.src = c.toDataURL('image/jpeg', 0.9);
    } else {
      snsSetPhoto(img);
    }
  };
  img.onerror = () => { URL.revokeObjectURL(url); showToast('写真を読み込めませんでした', 'error'); };
  img.src = url;
}
function snsSetPhoto(img) {
  snsPhotoState.img = img;
  snsPhotoState.scale = 1; snsPhotoState.x = 0; snsPhotoState.y = 0;
  document.getElementById('sns-photo-tools')?.classList.remove('hidden');
  document.getElementById('btn-sns-photo-clear')?.classList.remove('hidden');
  const z = document.getElementById('sns-zoom'); if (z) z.value = 100;
  snsUpdateDragMode();
  renderSnsCanvas();
}
function snsClearPhoto() {
  snsPhotoState.img = null;
  document.getElementById('sns-photo-tools')?.classList.add('hidden');
  document.getElementById('btn-sns-photo-clear')?.classList.add('hidden');
  const inp = document.getElementById('sns-photo-input'); if (inp) inp.value = '';
  snsUpdateDragMode();
  renderSnsCanvas();
}
function snsPaintPhoto(ctx) {
  const img = snsPhotoState.img; if (!img) return;
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const base = Math.max(1080 / iw, 1080 / ih);
  const s = base * snsPhotoState.scale;
  const dw = iw * s, dh = ih * s;
  const maxX = (dw - 1080) / 2, maxY = (dh - 1080) / 2;
  snsPhotoState.x = Math.max(-maxX, Math.min(maxX, snsPhotoState.x));
  snsPhotoState.y = Math.max(-maxY, Math.min(maxY, snsPhotoState.y));
  const dx = (1080 - dw) / 2 + snsPhotoState.x;
  const dy = (1080 - dh) / 2 + snsPhotoState.y;
  ctx.clearRect(0, 0, 1080, 1080);
  ctx.drawImage(img, dx, dy, dw, dh);
}
function snsDrawPhoto(root) {
  const scope = root || document.getElementById('sns-canvas');
  if (!scope || !snsPhotoState.img) return;
  scope.querySelectorAll('.sns-photo-cv').forEach(cv => snsPaintPhoto(cv.getContext('2d')));
}

// ----- プレビュー描画 -----
function snsBuildHtml() {
  const fn = SNS_TPL[snsData.templateId] || SNS_TPL.resultA;
  return fn(snsData);
}
function renderSnsCanvas() {
  const cv = document.getElementById('sns-canvas'); if (!cv) return;
  cv.className = 'sns-canvas tpl-' + snsData.templateId;
  cv.innerHTML = snsBuildHtml();
  snsDrawPhoto(cv);
}
function snsFitPreview() {
  const frame = document.getElementById('sns-preview-frame'), stage = document.getElementById('sns-stage');
  if (!frame || !stage) return;
  const w = frame.clientWidth || 1;
  stage.style.transform = `scale(${w / 1080})`;
}
function snsUpdateDragMode() {
  const frame = document.getElementById('sns-preview-frame'); if (!frame) return;
  frame.style.touchAction = snsPhotoState.img ? 'none' : 'auto';
}

// ----- ドラッグ＆ピンチで写真位置・ズーム調整 -----
function snsBindDrag() {
  const frame = document.getElementById('sns-preview-frame'); if (!frame) return;
  const pointers = new Map();
  let pinchStart = null;

  frame.addEventListener('pointerdown', e => {
    if (!snsPhotoState.img) return;
    frame.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchStart = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale: snsPhotoState.scale };
    }
    e.preventDefault();
  });
  frame.addEventListener('pointermove', e => {
    if (!snsPhotoState.img || !pointers.has(e.pointerId)) return;
    const prev = pointers.get(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pvScale = (frame.clientWidth || 1080) / 1080;

    if (pointers.size === 1) {
      snsPhotoState.x += (e.clientX - prev.x) / pvScale;
      snsPhotoState.y += (e.clientY - prev.y) / pvScale;
      snsDrawPhoto();
    } else if (pointers.size === 2 && pinchStart) {
      const [a, b] = [...pointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      snsPhotoState.scale = Math.max(1, Math.min(3, pinchStart.scale * dist / pinchStart.dist));
      const z = document.getElementById('sns-zoom'); if (z) z.value = Math.round(snsPhotoState.scale * 100);
      snsDrawPhoto();
    }
  });
  const release = e => {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchStart = null;
  };
  frame.addEventListener('pointerup', release);
  frame.addEventListener('pointercancel', release);
}

// ----- テンプレート選択UI -----
function snsRenderTemplateRow() {
  const row = document.getElementById('sns-template-row'); if (!row) return;
  row.innerHTML = SNS_TEMPLATES.filter(t => t.kind === snsData.kind).map(t => `
    <button type="button" class="sns-tpl-card${t.id === snsData.templateId ? ' active' : ''}" onclick="snsSelectTemplate('${t.id}')">
      <div class="sns-tpl-thumb thumb-${t.id}"></div>
      <div class="sns-tpl-name">${snsEsc(t.name)}</div>
      <div class="sns-tpl-desc">${snsEsc(t.desc)}</div>
    </button>
  `).join('');
}
function snsSelectTemplate(id) {
  snsData.templateId = id;
  snsRenderTemplateRow();
  renderSnsCanvas();
}
function snsApplyKind(kind) {
  snsData.kind = kind;
  const cur = SNS_TEMPLATES.find(t => t.id === snsData.templateId);
  if (!cur || cur.kind !== kind) {
    snsData.templateId = (SNS_TEMPLATES.find(t => t.kind === kind) || {}).id || 'resultA';
  }
  document.querySelectorAll('.sns-kind-btn').forEach(b => b.classList.toggle('active', b.dataset.kind === kind));
  document.querySelectorAll('.sns-f-result').forEach(n => n.classList.toggle('hidden', kind !== 'result'));
  document.querySelectorAll('.sns-f-notice').forEach(n => n.classList.toggle('hidden', kind !== 'notice'));
  snsRenderTemplateRow();
  renderSnsCanvas();
}

// ----- フォーム⇔データ同期 -----
const SNS_FIELDS = [
  ['sns-competition', 'competition'], ['sns-opponent', 'opponent'],
  ['sns-myscore', 'myScore'], ['sns-oppscore', 'oppScore'],
  ['sns-scorers', 'scorers'], ['sns-date', 'date'],
  ['sns-time', 'time'], ['sns-venue', 'venue'], ['sns-club', 'club'],
];
function snsSyncFields() {
  if (!snsData.club) snsData.club = getSettings().clubName || '';
  SNS_FIELDS.forEach(([id, key]) => {
    const n = document.getElementById(id);
    if (n) n.value = snsData[key] ?? '';
  });
}
function snsBindFieldsOnce() {
  SNS_FIELDS.forEach(([id, key]) => {
    const n = document.getElementById(id); if (!n) return;
    n.addEventListener('input', () => {
      snsData[key] = n.value;
      if (key === 'club') localStorage.setItem('mp_sns_club', n.value);
      renderSnsCanvas();
    });
  });
}

// ----- 画面表示 -----
function renderSnsPage() {
  snsApplyKind(snsData.kind);
  snsSyncFields();
  renderSnsCanvas();
  requestAnimationFrame(snsFitPreview);
}

function openSnsFromMatch(m) {
  if (!m) { snsOrigin = 'home'; pushPage('page-sns'); return; }
  const r = m.result || {};
  const hasResult = r.myScore !== undefined && r.myScore !== null;
  snsData.kind = hasResult ? 'result' : 'notice';
  snsData.templateId = hasResult ? 'resultA' : 'noticeA';
  snsData.competition = m.competition || m.type || '';
  snsData.opponent = m.opponent || '';
  snsData.date = m.date || '';
  snsData.venue = m.venue || '';
  if (hasResult) {
    snsData.myScore = r.myScore;
    snsData.oppScore = r.oppScore ?? '';
    const count = {};
    (r.goals || []).forEach(g => { if (g.scorer) count[g.scorer] = (count[g.scorer] || 0) + 1; });
    snsData.scorers = Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .map(([name, c]) => c > 1 ? `${name} ${c}点` : name)
      .join('\n');
  }
  snsOrigin = 'match';
  pushPage('page-sns');
}
function openSnsFromSchedule(sc) {
  if (!sc) { snsOrigin = 'home'; pushPage('page-sns'); return; }
  snsData.kind = 'notice';
  snsData.templateId = 'noticeA';
  snsData.competition = sc.competition || sc.type || '';
  snsData.opponent = sc.opponent || '';
  snsData.date = sc.date || '';
  snsData.time = sc.time || '';
  snsData.venue = sc.venue || '';
  snsOrigin = 'schedule';
  pushPage('page-sns');
}

// ----- PNG書き出し（html2canvas / 1080×1080） -----
async function snsExport() {
  if (typeof html2canvas === 'undefined') {
    showToast('画像ライブラリの読み込みに失敗しました。通信環境をご確認ください', 'error');
    return;
  }
  const btn = document.getElementById('btn-sns-save');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ 画像を生成中...'; }
  try {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:fixed;left:-2000px;top:0;width:1080px;height:1080px;z-index:-1;';
    const node = document.createElement('div');
    node.className = 'sns-canvas tpl-' + snsData.templateId;
    node.innerHTML = snsBuildHtml();
    wrap.appendChild(node);
    document.body.appendChild(wrap);
    snsDrawPhoto(node);

    if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch (e) {} }

    const canvas = await html2canvas(node, {
      width: 1080, height: 1080, scale: 1,
      backgroundColor: '#0c1430', useCORS: true, logging: false,
    });
    wrap.remove();

    const dataUrl = canvas.toDataURL('image/png');
    const thumb = snsMakeThumb(canvas);
    lastSnsThumb = thumb;
    try { localStorage.setItem('mp_sns_last_thumb', thumb); } catch (e) {}

    const f = snsFmtDate(snsData.date);
    const kindLabel = snsData.kind === 'result' ? '結果' : '告知';
    const clubTag = (getSettings().clubName || 'club').replace(/\s/g, '');
    const fname = `${clubTag}_${kindLabel}_vs${(snsData.opponent || '').replace(/\s/g, '')}_${(f.ymd || 'image').replace(/\./g, '-')}.png`;

    const imgEl = document.getElementById('sns-export-img');
    const dlEl = document.getElementById('sns-export-dl');
    if (imgEl) imgEl.src = dataUrl;
    if (dlEl) { dlEl.href = dataUrl; dlEl.download = fname; }
    openModal('modal-sns-export');
    showToast('画像を生成しました', 'success');
  } catch (e) {
    console.error('SNS export error:', e);
    showToast('画像の生成に失敗しました', 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '💾 画像を保存（1080×1080 PNG）'; }
  }
}
function snsMakeThumb(srcCanvas) {
  const SIZE = 900;
  const c = document.createElement('canvas');
  c.width = SIZE; c.height = SIZE;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0c1430';
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.drawImage(srcCanvas, 0, 0, SIZE, SIZE);
  return c.toDataURL('image/jpeg', 0.82);
}
function snsSetThumb() {
  if (!lastSnsThumb) { showToast('先に画像を生成してください', 'error'); return; }
  if (snsOrigin === 'match') {
    const imgInput = document.getElementById('result-image');
    if (imgInput) imgInput.value = lastSnsThumb;
    showToast('結果フォームの画像欄に設定しました。「結果を保存」を押すと記事に反映されます', 'success');
  } else if (snsOrigin === 'schedule') {
    announcementSnsImage = lastSnsThumb;
    showToast('告知記事の画像に設定しました', 'success');
    const sc = schedules.find(s => s.id === selectedAnnSchedId);
    if (sc) {
      renderAnnSnsStatus(sc);
      snsEnsureCtaButton(document.getElementById('ann-sns-slot'), 'btn-ann-sns', '📸 画像を変更する', '', () => openSnsFromSchedule(sc));
    }
  } else {
    showToast('画像を保存しました', 'info');
  }
}

// ----- 既存画面へのCTA追加（ラップして追記・既存処理は変更しない） -----
function snsEnsureCtaButton(container, id, label, note, onClick) {
  if (!container) return;
  let btn = document.getElementById(id);
  if (!btn) {
    const div = document.createElement('div');
    div.className = 'sns-cta-wrap';
    div.innerHTML = `<button type="button" id="${id}" class="btn-sns-make">${label}</button>` +
      (note ? `<div class="sns-result-cta-note">${note}</div>` : '');
    container.appendChild(div);
    btn = document.getElementById(id);
  } else {
    btn.textContent = label;
  }
  btn.onclick = onClick;
}
const _snsOrigRenderResult = renderResult;
renderResult = function () {
  _snsOrigRenderResult.apply(this, arguments);
  try {
    if (!currentMatch) return;
    snsEnsureCtaButton(
      document.querySelector('#tab-result .result-section'),
      'btn-result-sns', '📸 この試合のSNS画像を作成',
      '結果を保存してから押すと、スコア・得点者・日付が自動入力されます',
      () => openSnsFromMatch(currentMatch)
    );
  } catch (e) { console.error('SNS CTA(result) error:', e); }
};
const _snsOrigRenderPublish = renderPublish;
renderPublish = function () {
  _snsOrigRenderPublish.apply(this, arguments);
  try {
    if (!currentMatch || !currentMatch.result || currentMatch.result.myScore == null) return;
    snsEnsureCtaButton(
      document.getElementById('tab-publish'),
      'btn-hp-sns', '📸 SNS画像を作成', '',
      () => openSnsFromMatch(currentMatch)
    );
  } catch (e) { console.error('SNS CTA(publish) error:', e); }
};
const _snsOrigSelectAnnSched = selectAnnSched;
selectAnnSched = function (id) {
  _snsOrigSelectAnnSched.apply(this, arguments);
  try {
    const sc = schedules.find(s => s.id === id);
    if (!sc) return;
    snsEnsureCtaButton(
      document.getElementById('ann-sns-slot'),
      'btn-ann-sns', announcementSnsImage ? '📸 画像を変更する' : '📸 この試合のSNS画像を作成', '',
      () => openSnsFromSchedule(sc)
    );
    renderAnnSnsStatus(sc);
  } catch (e) { console.error('SNS CTA(ann) error:', e); }
};

// ===== 緊急連絡 =====
let emergencyCats = new Set();
let emergencyGroups = [];            // Gmail連絡先グループ {id, name, count}
let emergencySelGroups = new Set();  // 選択中グループid
let emergencyGroupsLoaded = false;

function escEmg(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// GAS（Google Apps Script）呼び出し共通処理
async function gasCall(action, payload = {}) {
  const s = getSettings();
  const res = await fetch(s.gasUrl, {
    method: 'POST',
    body: JSON.stringify({ key: s.gasKey, action, ...payload }),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || '不明なエラー');
  return data;
}

async function loadEmergencyGroups(force = false) {
  const el = document.getElementById('emergency-group-picker');
  if (!el) return;
  if (emergencyGroupsLoaded && !force) { renderEmergencyGroupPicker(); return; }
  el.innerHTML = '<div style="font-size:12px;color:var(--c-muted)">⏳ Gmailからグループを読み込み中…</div>';
  try {
    const data = await gasCall('groups');
    emergencyGroups = data.groups || [];
    emergencyGroupsLoaded = true;
    emergencySelGroups = new Set([...emergencySelGroups].filter(id => emergencyGroups.some(g => g.id === id)));
    renderEmergencyGroupPicker();
  } catch (e) {
    el.innerHTML = `<div style="font-size:12px;color:#dc2626">グループの読み込みに失敗しました：${escEmg(e.message)}<br>設定画面のGAS URL・送信キーをご確認ください。</div>`;
  }
}
function renderEmergencyGroupPicker() {
  const el = document.getElementById('emergency-group-picker');
  if (!el) return;
  if (emergencyGroups.length === 0) {
    el.innerHTML = '<div style="font-size:12px;color:var(--c-muted)">Google連絡先にグループ（ラベル）がありません</div>';
    return;
  }
  el.innerHTML = emergencyGroups.map(g => `
    <label class="cat-check-label"><input type="checkbox" class="emergency-group-check" value="${escEmg(g.id)}" ${emergencySelGroups.has(g.id) ? 'checked' : ''} onchange="toggleEmergencyGroup(this.value, this.checked)"> ${escEmg(g.name)}（${g.count}名）</label>
  `).join('');
}
function toggleEmergencyGroup(id, checked) {
  if (checked) emergencySelGroups.add(id); else emergencySelGroups.delete(id);
}
async function sendEmergencyViaGas() {
  const s = getSettings();
  if (!isGasConfigured(s)) { showToast('設定画面でGmail連携（GAS）を設定してください', 'error'); return; }
  if (emergencySelGroups.size === 0) { showToast('送信先グループを選択してください', 'error'); return; }
  const subject = (document.getElementById('emergency-subject')?.value || '').trim() || '緊急連絡';
  const body = (document.getElementById('emergency-message')?.value || '').trim();
  if (!body) { showToast('メッセージを入力してください', 'error'); return; }

  const sel = emergencyGroups.filter(g => emergencySelGroups.has(g.id));
  const names = sel.map(g => `「${g.name}」`).join('・');
  const total = sel.reduce((n, g) => n + (g.count || 0), 0);
  if (!confirm(`${names}（計${total}名）へ緊急連絡メールを一斉送信します。よろしいですか？\n\n件名：${subject}`)) return;

  const btn = document.getElementById('btn-emergency-send');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ 送信中…しばらくお待ちください'; }
  try {
    const r = await gasCall('send', { groupIds: [...emergencySelGroups], subject, body, senderName: `${s.clubName} 緊急連絡` });
    showToast(`✅ ${r.sent}件のアドレスへ送信しました（控えが自分宛にも届きます）`, 'success');
  } catch (e) {
    showToast(`送信に失敗しました：${e.message}`, 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '🚀 Gmailから自動送信（BCC）'; }
  }
}
const EMERGENCY_TEMPLATES = [
  { label: '天候による中止', text: '本日の練習/試合は悪天候のため中止といたします。今後の予定は改めてご連絡いたします。' },
  { label: '解散時間の変更', text: '天候急変のため、本日の解散時間を予定より早め、◯時◯分に変更いたします。お迎えの調整をお願いいたします。' },
  { label: 'バス遅延・到着遅れ', text: '遠征バスが渋滞に巻き込まれており、到着が◯時◯分頃になる見込みです。ご心配をおかけしますが今しばらくお待ちください。' },
  { label: '集合場所・時間の変更', text: '集合場所／時間を変更いたします。変更後の集合：◯◯　◯時◯分。ご確認をお願いいたします。' },
];

function renderEmergencyPage() {
  emergencyCats = new Set();
  emergencySelGroups = new Set();
  const msgEl = document.getElementById('emergency-message');
  if (msgEl) msgEl.value = '';
  const s = getSettings();
  const subjEl = document.getElementById('emergency-subject');
  if (subjEl) subjEl.value = '本日の活動につきまして';

  // Gmailグループ（GAS連携）ブロックの表示切り替え
  const gasOn = isGasConfigured(s);
  const groupBlock = document.getElementById('emergency-group-block');
  const gasHint = document.getElementById('emergency-gas-hint');
  const sendBtn = document.getElementById('btn-emergency-send');
  if (groupBlock) groupBlock.style.display = gasOn ? '' : 'none';
  if (gasHint) gasHint.style.display = gasOn ? 'none' : '';
  if (sendBtn) sendBtn.style.display = gasOn ? '' : 'none';
  if (gasOn) loadEmergencyGroups();

  renderEmergencyCatPicker();
  renderEmergencyRecipients();
  renderEmergencyTemplateButtons();
}
function renderEmergencyCatPicker() {
  const el = document.getElementById('emergency-cat-picker');
  if (!el) return;
  el.innerHTML = CATEGORY_OPTIONS.map(cat => `
    <label class="cat-check-label"><input type="checkbox" class="emergency-cat-check" value="${cat}" ${emergencyCats.has(cat) ? 'checked' : ''} onchange="toggleEmergencyCat('${cat}', this.checked)"> ${cat}</label>
  `).join('');
}
function toggleEmergencyCat(cat, checked) {
  if (checked) emergencyCats.add(cat); else emergencyCats.delete(cat);
  renderEmergencyRecipients();
}
function emergencyTargetPlayers() {
  if (emergencyCats.size === 0) return [];
  return players.filter(p => emergencyCats.has(p.category));
}
function renderEmergencyRecipients() {
  const el = document.getElementById('emergency-recipients-summary');
  if (!el) return;
  if (emergencyCats.size === 0) {
    el.innerHTML = `<div style="font-size:12.5px;color:var(--c-muted)">カテゴリーを選択してください</div>`;
    return;
  }
  const targets = emergencyTargetPlayers();
  const withEmail = targets.filter(p => (p.guardianEmail || '').trim());
  const withoutEmail = targets.filter(p => !(p.guardianEmail || '').trim());
  el.innerHTML = `
    <div style="font-size:13px;margin-bottom:8px"><b>${targets.length}名</b>が対象（うちメール登録 <b style="color:var(--c-green)">${withEmail.length}名</b>）</div>
    ${withoutEmail.length ? `
      <div style="font-size:12px;color:var(--c-muted);margin-bottom:4px">メール未登録（${withoutEmail.length}名）：</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${withoutEmail.map(p => `<span class="sched-badge badge-other">${p.name}</span>`).join('')}
      </div>
    ` : ''}
  `;
}
function renderEmergencyTemplateButtons() {
  const el = document.getElementById('emergency-templates');
  if (!el) return;
  el.innerHTML = EMERGENCY_TEMPLATES.map((t, i) => `<button type="button" class="btn btn-secondary btn-sm" onclick="applyEmergencyTemplate(${i})">${t.label}</button>`).join('');
}
// どのテンプレートにも共通で入れる書き出しと結び
const EMERGENCY_HEADER = '保護者の皆様\nいつもサポートをありがとうございます。\n\n';
const EMERGENCY_FOOTER = '\n\n以上、よろしくお願いいたします。';
function applyEmergencyTemplate(i) {
  const el = document.getElementById('emergency-message');
  if (el) el.value = EMERGENCY_HEADER + EMERGENCY_TEMPLATES[i].text + EMERGENCY_FOOTER;
}
function openEmergencyMail() {
  if (emergencyCats.size === 0) { showToast('対象カテゴリーを選択してください', 'error'); return; }
  const emails = emergencyTargetPlayers().map(p => (p.guardianEmail || '').trim()).filter(Boolean);
  if (emails.length === 0) { showToast('対象者にメールアドレスが登録されていません', 'error'); return; }
  const subject = (document.getElementById('emergency-subject')?.value || '').trim() || '緊急連絡';
  const body = (document.getElementById('emergency-message')?.value || '').trim();
  if (!body) { showToast('メッセージを入力してください', 'error'); return; }

  // 重複アドレスを除去（兄弟で同じ保護者メールのケース）
  const uniqueEmails = [...new Set(emails.map(e => e.toLowerCase()))];
  const url = `mailto:?bcc=${encodeURIComponent(uniqueEmails.join(','))}`
    + `&subject=${encodeURIComponent(subject)}`
    + `&body=${encodeURIComponent(body)}`;

  // 宛先が多すぎるとメールアプリ側でURLが切れる場合がある
  if (url.length > 1800) {
    showToast('宛先が多いため開けない場合があります。その際は下のコピーをご利用ください', 'info');
  }
  const a = document.createElement('a');
  a.href = url;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast(`メールアプリを起動しました（BCC ${uniqueEmails.length}件）`, 'success');
}
function copyEmergencyEmails() {
  if (emergencyCats.size === 0) { showToast('対象カテゴリーを選択してください', 'error'); return; }
  const emails = emergencyTargetPlayers().map(p => (p.guardianEmail || '').trim()).filter(Boolean);
  if (emails.length === 0) { showToast('対象者にメールアドレスが登録されていません', 'error'); return; }
  navigator.clipboard.writeText(emails.join(', ')).then(() => {
    showToast(`${emails.length}件のメールアドレスをコピーしました（BCCに貼り付けてください）`, 'success');
  }).catch(() => {
    showToast('コピーに失敗しました', 'error');
  });
}
function copyEmergencyMessage() {
  const text = (document.getElementById('emergency-message')?.value || '').trim();
  if (!text) { showToast('メッセージを入力してください', 'error'); return; }
  navigator.clipboard.writeText(text).then(() => {
    showToast('メッセージをコピーしました', 'success');
  }).catch(() => {
    showToast('コピーに失敗しました', 'error');
  });
}

// ===== 食堂管理 =====
// mp-config.js に shokudo: { name, price, categories } を設定したクラブだけ有効になる
function shokudoCfg() {
  const cfg = (typeof MP_CONFIG !== 'undefined') ? MP_CONFIG : {};
  return cfg.shokudo || null;
}
function isShokudoEnabled() { return !!shokudoCfg(); }
function shokudoName()  { return (shokudoCfg() || {}).name  || '食堂管理'; }
function shokudoPrice() { return (shokudoCfg() || {}).price || 900; }
function shokudoCats()  { return (shokudoCfg() || {}).categories || ['U15', 'U14', 'U13']; }
// カテゴリーが未入力でも学年（中1〜中3）からジュニアユースを自動判定する
function skCategoryOf(p) {
  if (p.category && shokudoCats().includes(p.category)) return p.category;
  const g = String(p.grade || '');
  if (g.indexOf('中1') === 0) return 'U13';
  if (g.indexOf('中2') === 0) return 'U14';
  if (g.indexOf('中3') === 0) return 'U15';
  return null;
}
function skIsGK(p) {
  return p.main === 'GK' || p.mainGroup === 'GK' || p.position === 'GK';
}
function shokudoPlayers() {
  return players.filter(p => !!skCategoryOf(p))
    .sort((a, b) => (a.name || '').localeCompare(b.name || '', 'ja'));
}
function skFindPlayer(id) { return players.find(p => p.id === id); }
function skPlayerName(id) { const p = skFindPlayer(id); return p ? p.name : '(退団選手)'; }

function renderShokudoPage() {
  document.querySelectorAll('#shokudo-tab-bar .tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.sktab === shokudoTab);
  });
  ['input', 'billing', 'rank', 'bmi'].forEach(t => {
    const el = document.getElementById(`shokudo-pane-${t}`);
    if (el) el.style.display = (t === shokudoTab) ? '' : 'none';
  });
  if (shokudoTab === 'input')   renderShokudoInput();
  if (shokudoTab === 'billing') renderShokudoBilling();
  if (shokudoTab === 'rank')    renderShokudoRank();
  if (shokudoTab === 'bmi')     renderShokudoBmiPane();
}
function switchShokudoTab(t) { shokudoTab = t; renderShokudoPage(); }

// --- 入力タブ ---
function renderShokudoInput() {
  const el = document.getElementById('shokudo-pane-input');
  if (!el) return;
  const target = shokudoSessions.find(s => s.id === editingShokudoId);
  const dateVal = target ? target.date : new Date().toISOString().split('T')[0];
  const menuVal = target ? (target.menu || '') : '';
  const cups = target ? (target.cups || {}) : {};
  const list = shokudoPlayers();

  el.innerHTML = `
    <div class="form-group">
      <div class="form-label">${target ? '✏️ 記録を編集' : '📝 食事を記録'}</div>
      <div class="form-row-2">
        <div class="form-group"><label class="form-label">日付</label><input class="form-input" type="date" id="sk-date" value="${escEmg(dateVal)}"></div>
        <div class="form-group"><label class="form-label">メニュー</label><input class="form-input" type="text" id="sk-menu" value="${escEmg(menuVal)}" placeholder="例: ご飯・チキンステーキ・味噌汁"></div>
      </div>
      <div class="form-label" style="margin-top:4px">参加選手と杯数（食べたごはんの杯数を入力）</div>
      ${list.length === 0 ? '<div style="font-size:12.5px;color:var(--c-muted)">対象カテゴリーの選手が登録されていません（選手・スタッフ画面で登録してください）</div>' : `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px">
        ${list.map(p => `
          <label style="display:flex;align-items:center;gap:6px;background:var(--c-surface2,rgba(0,0,0,.04));border-radius:8px;padding:7px 10px;font-size:13px">
            <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escEmg(p.name)}</span>
            <input type="number" min="0" step="0.5" class="form-input" style="width:58px;padding:4px 6px;font-size:13px" id="sk-cup-${escEmg(p.id)}" value="${cups[p.id] != null ? cups[p.id] : ''}" placeholder="杯">
          </label>
        `).join('')}
      </div>`}
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="btn btn-primary" style="flex:1" onclick="saveShokudoSession()">${target ? '💾 更新する' : '＋ 記録する'}</button>
        ${target ? '<button class="btn btn-secondary" onclick="cancelShokudoEdit()">キャンセル</button>' : ''}
      </div>
    </div>
    <div class="form-group" style="margin-top:18px">
      <div class="form-label">📋 記録一覧（新しい順）</div>
      ${shokudoSessions.length === 0 ? '<div style="font-size:12.5px;color:var(--c-muted)">まだ記録がありません</div>' : `
      <div>
        ${[...shokudoSessions].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 30).map(s => {
          const n = Object.keys(s.cups || {}).length;
          const total = Object.values(s.cups || {}).reduce((a, b) => a + (+b || 0), 0);
          return `<div style="display:flex;align-items:center;gap:10px;padding:9px 4px;border-bottom:1px solid var(--c-border,rgba(0,0,0,.08));font-size:13px">
            <b style="min-width:86px">${escEmg(s.date || '')}</b>
            <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--c-text2)">${escEmg(s.menu || '（メニュー未記入）')}</span>
            <span style="white-space:nowrap">${n}名 / ${total}杯</span>
            <button class="btn btn-secondary btn-sm" onclick="editShokudoSession('${escEmg(s.id)}')">編集</button>
            <button class="btn btn-secondary btn-sm" onclick="deleteShokudoSession('${escEmg(s.id)}')">🗑</button>
          </div>`;
        }).join('')}
      </div>`}
    </div>`;
}
function saveShokudoSession() {
  const date = (document.getElementById('sk-date')?.value || '').trim();
  const menu = (document.getElementById('sk-menu')?.value || '').trim();
  if (!date) { showToast('日付を入力してください', 'error'); return; }
  const cups = {};
  shokudoPlayers().forEach(p => {
    const v = parseFloat(document.getElementById(`sk-cup-${p.id}`)?.value);
    if (!isNaN(v) && v > 0) cups[p.id] = v;
  });
  if (Object.keys(cups).length === 0) { showToast('参加選手の杯数を1人以上入力してください', 'error'); return; }
  if (editingShokudoId) {
    const s = shokudoSessions.find(x => x.id === editingShokudoId);
    if (s) { s.date = date; s.menu = menu; s.cups = cups; }
    editingShokudoId = null;
    showToast('記録を更新しました', 'success');
  } else {
    shokudoSessions.push({ id: Date.now().toString(), date, menu, cups });
    showToast('記録しました', 'success');
  }
  saveLocal();
  renderShokudoInput();
}
function editShokudoSession(id) { editingShokudoId = id; renderShokudoInput(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function cancelShokudoEdit() { editingShokudoId = null; renderShokudoInput(); }
function deleteShokudoSession(id) {
  const s = shokudoSessions.find(x => x.id === id);
  if (!s) return;
  if (!confirm(`${s.date} の記録を削除しますか？`)) return;
  shokudoSessions = shokudoSessions.filter(x => x.id !== id);
  if (editingShokudoId === id) editingShokudoId = null;
  saveLocal();
  renderShokudoInput();
  showToast('削除しました', 'success');
}

// --- 出席・請求タブ ---
function shokudoMonths() {
  const set = new Set(shokudoSessions.map(s => (s.date || '').slice(0, 7)).filter(Boolean));
  return [...set].sort().reverse();
}
function renderShokudoBilling() {
  const el = document.getElementById('shokudo-pane-billing');
  if (!el) return;
  const months = shokudoMonths();
  if (months.length === 0) { el.innerHTML = '<div style="font-size:12.5px;color:var(--c-muted)">まだ記録がありません</div>'; return; }
  const sel = el.querySelector('#sk-month')?.value;
  const month = months.includes(sel) ? sel : months[0];
  const sessions = shokudoSessions.filter(s => (s.date || '').startsWith(month)).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  const price = shokudoPrice();
  const rows = shokudoPlayers().map(p => {
    let attended = 0, cups = 0;
    sessions.forEach(s => { const c = (s.cups || {})[p.id]; if (c != null && c > 0) { attended++; cups += +c; } });
    return { p, attended, cups, amount: attended * price };
  }).filter(r => r.attended > 0 || true);
  const totalAmount = rows.reduce((a, r) => a + r.amount, 0);
  el.innerHTML = `
    <div class="form-group">
      <label class="form-label">対象月</label>
      <select class="form-select" id="sk-month" onchange="renderShokudoBilling()">
        ${months.map(m => `<option value="${m}" ${m === month ? 'selected' : ''}>${m.replace('-', '年')}月</option>`).join('')}
      </select>
    </div>
    <div style="font-size:12.5px;color:var(--c-muted);margin-bottom:8px">開催 ${sessions.length}回 ／ 1食 ${price.toLocaleString()}円</div>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="border-bottom:2px solid var(--c-border,rgba(0,0,0,.15));text-align:left">
          <th style="padding:7px 6px">選手</th><th style="padding:7px 6px;text-align:center">参加</th><th style="padding:7px 6px;text-align:center">杯数</th><th style="padding:7px 6px;text-align:right">請求額</th>
        </tr></thead>
        <tbody>
          ${rows.map(r => `<tr style="border-bottom:1px solid var(--c-border,rgba(0,0,0,.07))">
            <td style="padding:7px 6px">${escEmg(r.p.name)}</td>
            <td style="padding:7px 6px;text-align:center">${r.attended}回</td>
            <td style="padding:7px 6px;text-align:center">${r.cups}杯</td>
            <td style="padding:7px 6px;text-align:right;font-weight:700">${r.amount.toLocaleString()}円</td>
          </tr>`).join('')}
        </tbody>
        <tfoot><tr style="border-top:2px solid var(--c-border,rgba(0,0,0,.15))">
          <td style="padding:8px 6px;font-weight:700">合計</td><td></td><td></td>
          <td style="padding:8px 6px;text-align:right;font-weight:700">${totalAmount.toLocaleString()}円</td>
        </tr></tfoot>
      </table>
    </div>`;
}

// --- ランキングタブ ---
function renderShokudoRank() {
  const el = document.getElementById('shokudo-pane-rank');
  if (!el) return;
  const stats = {};
  shokudoSessions.forEach(s => {
    Object.entries(s.cups || {}).forEach(([pid, c]) => {
      if (!stats[pid]) stats[pid] = { count: 0, cups: 0 };
      if (+c > 0) { stats[pid].count++; stats[pid].cups += +c; }
    });
  });
  const metric = shokudoRankMetric;
  const rows = Object.entries(stats)
    .map(([pid, st]) => ({ name: skPlayerName(pid), ...st }))
    .sort((a, b) => metric === 'cups' ? (b.cups - a.cups) : (b.count - a.count));
  el.innerHTML = `
    <div class="form-group">
      <label class="form-label">集計項目（全期間）</label>
      <select class="form-select" onchange="shokudoRankMetric=this.value;renderShokudoRank()">
        <option value="count" ${metric === 'count' ? 'selected' : ''}>参加回数</option>
        <option value="cups" ${metric === 'cups' ? 'selected' : ''}>ごはん杯数</option>
      </select>
    </div>
    ${rows.length === 0 ? '<div style="font-size:12.5px;color:var(--c-muted)">まだ記録がありません</div>' : rows.map((r, i) => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 6px;border-bottom:1px solid var(--c-border,rgba(0,0,0,.07));font-size:14px">
        <b style="width:34px;font-size:16px">${i < 3 ? ['🥇', '🥈', '🥉'][i] : (i + 1) + '位'}</b>
        <span style="flex:1">${escEmg(r.name)}</span>
        <b>${metric === 'cups' ? r.cups + '杯' : r.count + '回'}</b>
        <span style="color:var(--c-muted);font-size:12px">${metric === 'cups' ? r.count + '回' : r.cups + '杯'}</span>
      </div>`).join('')}`;
}

// --- BMIタブ ---
const SHOKUDO_BMI_TARGET    = { U13: 19.5, U14: 20.5, U15: 21.0 };
const SHOKUDO_BMI_TARGET_GK = { U13: 20.5, U14: 21.5, U15: 21.5 };
function skBmiTarget(p) {
  if (!p) return null;
  const cat = skCategoryOf(p);
  const t = skIsGK(p) ? SHOKUDO_BMI_TARGET_GK[cat] : SHOKUDO_BMI_TARGET[cat];
  return t || null;
}
function renderShokudoBmiPane() {
  const el = document.getElementById('shokudo-pane-bmi');
  if (!el) return;
  const list = shokudoPlayers();
  const detailSel = el.querySelector('#sk-bmi-detail')?.value || '';
  const latest = {};
  [...shokudoBmi].sort((a, b) => (a.date || '').localeCompare(b.date || '')).forEach(r => { latest[r.playerId] = r; });
  el.innerHTML = `
    <div class="form-group">
      <div class="form-label">📏 BMI計測を記録</div>
      <div class="form-row-2">
        <div class="form-group"><label class="form-label">選手</label>
          <select class="form-select" id="sk-bmi-player">${list.map(p => `<option value="${escEmg(p.id)}">${escEmg(p.name)}（${escEmg(skCategoryOf(p) || '')}）</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">計測日</label><input class="form-input" type="date" id="sk-bmi-date" value="${new Date().toISOString().split('T')[0]}"></div>
      </div>
      <div class="form-row-2">
        <div class="form-group"><label class="form-label">身長（cm）</label><input class="form-input" type="number" step="0.1" id="sk-bmi-h" placeholder="160.5"></div>
        <div class="form-group"><label class="form-label">体重（kg）</label><input class="form-input" type="number" step="0.1" id="sk-bmi-w" placeholder="48.2"></div>
      </div>
      <button class="btn btn-primary btn-full" onclick="addShokudoBmi()">＋ 記録する</button>
    </div>
    <div class="form-group" style="margin-top:18px">
      <div class="form-label">📋 最新BMI一覧（目標＝カテゴリー別基準値）</div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="border-bottom:2px solid var(--c-border,rgba(0,0,0,.15));text-align:left">
          <th style="padding:7px 6px">選手</th><th style="padding:7px 6px;text-align:center">最新BMI</th><th style="padding:7px 6px;text-align:center">目標</th><th style="padding:7px 6px;text-align:center">判定</th><th style="padding:7px 6px">計測日</th>
        </tr></thead>
        <tbody>
        ${list.map(p => {
          const r = latest[p.id];
          const t = skBmiTarget(p);
          const ok = r && t && r.bmi >= t;
          return `<tr style="border-bottom:1px solid var(--c-border,rgba(0,0,0,.07))">
            <td style="padding:7px 6px">${escEmg(p.name)}</td>
            <td style="padding:7px 6px;text-align:center;font-weight:700">${r ? r.bmi.toFixed(1) : '−'}</td>
            <td style="padding:7px 6px;text-align:center">${t != null ? t.toFixed(1) : '−'}</td>
            <td style="padding:7px 6px;text-align:center">${r && t ? (ok ? '<span style="color:var(--c-green,#16a34a);font-weight:700">達成</span>' : `<span style="color:#d97706;font-weight:700">あと${(t - r.bmi).toFixed(1)}</span>`) : '−'}</td>
            <td style="padding:7px 6px;color:var(--c-muted)">${r ? escEmg(r.date || '') : '−'}</td>
          </tr>`;
        }).join('')}
        </tbody>
      </table>
      </div>
    </div>
    <div class="form-group" style="margin-top:18px">
      <div class="form-label">📊 選手別の推移</div>
      <select class="form-select" id="sk-bmi-detail" onchange="renderShokudoBmiPane()">
        <option value="">-- 選手を選択 --</option>
        ${list.map(p => `<option value="${escEmg(p.id)}" ${detailSel === p.id ? 'selected' : ''}>${escEmg(p.name)}</option>`).join('')}
      </select>
      <div style="margin-top:10px">
      ${detailSel ? ([...shokudoBmi].filter(r => r.playerId === detailSel).sort((a, b) => (b.date || '').localeCompare(a.date || '')).map(r => `
        <div style="display:flex;gap:12px;align-items:center;padding:8px 4px;border-bottom:1px solid var(--c-border,rgba(0,0,0,.07));font-size:13px">
          <b style="min-width:86px">${escEmg(r.date || '')}</b>
          <span>身長 ${r.height}cm ／ 体重 ${r.weight}kg</span>
          <b style="margin-left:auto">BMI ${r.bmi.toFixed(1)}</b>
          <button class="btn btn-secondary btn-sm" onclick="deleteShokudoBmi('${escEmg(r.id)}')">🗑</button>
        </div>`).join('') || '<div style="font-size:12.5px;color:var(--c-muted)">記録がありません</div>') : ''}
      </div>
    </div>`;
}
function addShokudoBmi() {
  const pid = document.getElementById('sk-bmi-player')?.value;
  const date = document.getElementById('sk-bmi-date')?.value;
  const h = parseFloat(document.getElementById('sk-bmi-h')?.value);
  const w = parseFloat(document.getElementById('sk-bmi-w')?.value);
  if (!pid || !date) { showToast('選手と計測日を入力してください', 'error'); return; }
  if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) { showToast('身長・体重を正しく入力してください', 'error'); return; }
  const bmi = w / Math.pow(h / 100, 2);
  shokudoBmi.push({ id: Date.now().toString(), playerId: pid, date, height: h, weight: w, bmi: Math.round(bmi * 10) / 10 });
  saveLocal();
  renderShokudoBmiPane();
  showToast(`記録しました（BMI ${bmi.toFixed(1)}）`, 'success');
}
function deleteShokudoBmi(id) {
  if (!confirm('このBMI記録を削除しますか？')) return;
  shokudoBmi = shokudoBmi.filter(r => r.id !== id);
  saveLocal();
  renderShokudoBmiPane();
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

  // 食堂管理：mp-config に shokudo 設定があるクラブだけ表示
  if (isShokudoEnabled()) {
    document.querySelectorAll('.shokudo-nav-label').forEach(el => { el.textContent = shokudoName(); });
  } else {
    document.querySelectorAll('[data-nav="page-shokudo"]').forEach(el => { el.style.display = 'none'; });
  }

  // 試合管理を使わないクラブ向け（mp-config: hideMatchManagement: true）
  // メニューから隠すだけで機能・データは残す。結果登録はスケジュール起点でできる
  if (typeof MP_CONFIG !== 'undefined' && MP_CONFIG.hideMatchManagement) {
    document.querySelectorAll('[data-nav="page-matches"]').forEach(el => { el.style.display = 'none'; });
    const bnav = document.querySelector('.bnav-item[data-bnav="page-matches"]');
    if (bnav) {
      bnav.dataset.bnav = 'page-result-entry';
      bnav.innerHTML = '<span class="bnav-icon">🏆</span><span class="bnav-label">試合結果</span>';
      bottomNavPages.push('page-result-entry');
    }
  }

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
