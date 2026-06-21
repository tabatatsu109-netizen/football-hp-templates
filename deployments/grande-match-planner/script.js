/* ============================================
   Match Planner - script.js  v2.0
   ============================================ */
'use strict';

// ============================================================
// ★ JSONBin 設定
// ============================================================
const BIN_ID  = '6a3817c2f5f4af5e291906f9';
const API_KEY = '$2a$10$xopawUKPa.2MV76.BGLZtehG8EauPnBwXLLyCgXqw/H5NfvD.yuOq';
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// ============================================================
// FORMATIONS
// ============================================================
const FORMATIONS = {
  '4-3-3':   { positions: [
    {id:'GK', label:'GK',row:0,col:2},{id:'RB', label:'RB',row:1,col:3.2},
    {id:'CB2',label:'CB',row:1,col:2.3},{id:'CB1',label:'CB',row:1,col:1.7},
    {id:'LB', label:'LB',row:1,col:0.8},{id:'RCM',label:'CM',row:2,col:3},
    {id:'CM', label:'CM',row:2,col:2},{id:'LCM',label:'CM',row:2,col:1},
    {id:'RW', label:'RW',row:3,col:3.2},{id:'CF', label:'CF',row:3,col:2},
    {id:'LW', label:'LW',row:3,col:0.8}]},
  '4-4-2':   { positions: [
    {id:'GK', label:'GK',row:0,col:2},{id:'RB', label:'RB',row:1,col:3.2},
    {id:'CB2',label:'CB',row:1,col:2.3},{id:'CB1',label:'CB',row:1,col:1.7},
    {id:'LB', label:'LB',row:1,col:0.8},{id:'RM', label:'RM',row:2,col:3.2},
    {id:'RCM',label:'CM',row:2,col:2.3},{id:'LCM',label:'CM',row:2,col:1.7},
    {id:'LM', label:'LM',row:2,col:0.8},{id:'RS', label:'ST',row:3,col:2.5},
    {id:'LS', label:'ST',row:3,col:1.5}]},
  '4-2-3-1': { positions: [
    {id:'GK', label:'GK',row:0,col:2},{id:'RB', label:'RB',row:1,col:3.2},
    {id:'CB2',label:'CB',row:1,col:2.3},{id:'CB1',label:'CB',row:1,col:1.7},
    {id:'LB', label:'LB',row:1,col:0.8},{id:'RDM',label:'DM',row:2,col:2.5},
    {id:'LDM',label:'DM',row:2,col:1.5},{id:'RW', label:'RW',row:3,col:3.2},
    {id:'CAM',label:'AM',row:3,col:2},{id:'LW', label:'LW',row:3,col:0.8},
    {id:'CF', label:'CF',row:4,col:2}]},
  '3-5-2':   { positions: [
    {id:'GK', label:'GK',row:0,col:2},{id:'RCB',label:'CB',row:1,col:3},
    {id:'CB', label:'CB',row:1,col:2},{id:'LCB',label:'CB',row:1,col:1},
    {id:'RWB',label:'WB',row:2,col:3.5},{id:'RCM',label:'CM',row:2,col:2.7},
    {id:'CM', label:'CM',row:2,col:2},{id:'LCM',label:'CM',row:2,col:1.3},
    {id:'LWB',label:'WB',row:2,col:0.5},{id:'RS', label:'ST',row:3,col:2.5},
    {id:'LS', label:'ST',row:3,col:1.5}]},
  '3-4-3':   { positions: [
    {id:'GK', label:'GK',row:0,col:2},{id:'RCB',label:'CB',row:1,col:3},
    {id:'CB', label:'CB',row:1,col:2},{id:'LCB',label:'CB',row:1,col:1},
    {id:'RM', label:'MF',row:2,col:3},{id:'RCM',label:'CM',row:2,col:2.3},
    {id:'LCM',label:'CM',row:2,col:1.7},{id:'LM', label:'MF',row:2,col:1},
    {id:'RW', label:'RW',row:3,col:3.2},{id:'CF', label:'CF',row:3,col:2},
    {id:'LW', label:'LW',row:3,col:0.8}]}
};

// ============================================================
// CONSTANTS
// ============================================================
const GRADES       = ['1年','2年','3年','4年','5年','6年','中1','中2','中3','高1','高2','高3'];
const POS_GROUPS   = ['GK','DF','MF','FW'];
const MATCH_TYPES  = ['公式戦','練習試合','フェスティバル','合宿'];
const TYPE_CLASS   = {'公式戦':'type-official','練習試合':'type-practice','フェスティバル':'type-festival','合宿':'type-camp'};
const TOTAL_MINUTES = 80;

const COMPETITION_OPTIONS = ['U-15リーグ','U-13リーグ','U-12リーグ','TM','カップ戦','その他'];

// 旧ポジション → グループ変換マップ
const POS_TO_GROUP = {
  'GK':'GK',
  'CB':'DF','RB':'DF','LB':'DF','WB':'DF',
  'DM':'MF','CM':'MF','AM':'MF','RM':'MF','LM':'MF',
  'RW':'FW','LW':'FW','CF':'FW','ST':'FW','FW':'FW',
  'DF':'DF','MF':'MF'
};

function toGroup(pos) {
  return POS_TO_GROUP[pos] || pos || 'MF';
}

// ============================================================
// STORAGE
// ============================================================
const Store = {
  get(key, fb=[]) { try { const v=localStorage.getItem(key); return v?JSON.parse(v):fb; } catch { return fb; } },
  set(key, val)   { try { localStorage.setItem(key,JSON.stringify(val)); } catch {} }
};

// ============================================================
// STATE
// ============================================================
let players      = Store.get('mp_players', []);
let matches      = Store.get('mp_matches', []);
let savedPosts   = [];
let currentMatch = null;
let activeTab    = 'board';
let selectedPos  = null;
let isSaving     = false;

// 選手フィルター状態
let filterGrade  = '';
let filterGroup  = '';
let filterSub    = '';
let sortKey      = 'number'; // number | grade | group | name | time

// ============================================================
// MIGRATION: 旧データを新フォーマットへ変換
// ============================================================
function migratePlayer(p) {
  if (!p.mainGroup) {
    p.mainGroup  = toGroup(p.main || '');
    p.detailPos  = p.main || '';
  }
  if (!p.sub && p.subDetail) p.sub = p.subDetail;
  return p;
}
function migratePlayers() {
  players = players.map(migratePlayer);
}
function migrateMatch(m) {
  if (!m.competitionName) m.competitionName = m.category || '';
  return m;
}
function migrateMatches() {
  matches = matches.map(migrateMatch);
}

// ============================================================
// STATS ENGINE — 選手ごとの累計集計
// ============================================================
function calcPlayerStats(playerId) {
  // 公式戦のみ集計
  let totalMins = 0, games = 0, starter = 0, bench = 0;
  const posTime = {}; // posGroup → mins

  matches.filter(m => m.type === '公式戦').forEach(m => {
    const lineup   = m.lineup || {};
    const subs     = m.subs   || [];
    const benchArr = m.bench  || [];
    const lineupIds = Object.values(lineup).filter(Boolean).map(p=>p.id);
    const isStarter = lineupIds.includes(playerId);
    const isBench   = benchArr.some(p=>p.id===playerId);

    const pName  = players.find(p=>p.id===playerId)?.name || '';
    const outSub = subs.find(s=>s.out===pName);
    const inSub  = subs.find(s=>s.in ===pName);

    let mins = 0;
    if (isStarter) {
      mins = outSub ? (parseInt(outSub.minute)||TOTAL_MINUTES) : TOTAL_MINUTES;
      starter++;
    } else if (inSub) {
      const start = parseInt(inSub.minute)||0;
      const end   = outSub ? (parseInt(outSub.minute)||TOTAL_MINUTES) : TOTAL_MINUTES;
      mins = Math.max(0, end - start);
      if (isBench) bench++;
    } else if (isBench) {
      bench++;
    }

    if (mins > 0) {
      games++;
      totalMins += mins;
      // ポジション別時間
      const posId = Object.keys(lineup).find(k=>lineup[k]?.id===playerId);
      if (posId) {
        const posLabel = (FORMATIONS[m.formation]?.positions||[]).find(p=>p.id===posId)?.label || posId;
        const pg = toGroup(posLabel);
        posTime[pg] = (posTime[pg]||0) + mins;
      }
    }
  });

  return { totalMins, games, starter, bench, posTime };
}

// 試合内での選手出場時間計算
function calcMatchMins(match, playerId) {
  const lineup = match.lineup || {};
  const subs   = match.subs   || [];
  const pName  = players.find(p=>p.id===playerId)?.name || '';
  const isStarter = Object.values(lineup).filter(Boolean).some(p=>p.id===playerId);
  const outSub = subs.find(s=>s.out===pName);
  const inSub  = subs.find(s=>s.in ===pName);
  if (isStarter) return outSub ? (parseInt(outSub.minute)||TOTAL_MINUTES) : TOTAL_MINUTES;
  if (inSub) {
    const start = parseInt(inSub.minute)||0;
    const end   = outSub ? (parseInt(outSub.minute)||TOTAL_MINUTES) : TOTAL_MINUTES;
    return Math.max(0, end - start);
  }
  return 0;
}

// ============================================================
// JSONBin
// ============================================================
function isJsonBinConfigured() {
  return BIN_ID !== 'ここにBin ID' && BIN_ID.trim() !== '' &&
         API_KEY !== 'ここにX-Master-Key' && API_KEY.trim() !== '';
}
async function loadFromJsonBin() {
  if (!isJsonBinConfigured()) return false;
  try {
    showSyncStatus('loading');
    const res  = await fetch(BIN_URL, {method:'GET', headers:{'X-Master-Key':API_KEY}});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = json.record;
    if (data && Array.isArray(data.players)) { players = data.players; Store.set('mp_players', players); }
    if (data && Array.isArray(data.matches)) { matches = data.matches; Store.set('mp_matches', matches); }
    if (data && Array.isArray(data.posts))   { savedPosts = data.posts; }
    migratePlayers(); migrateMatches();
    showSyncStatus('ok');
    return true;
  } catch(e) {
    console.error('JSONBin load error:', e);
    showSyncStatus('error');
    showToast('⚠️ クラウドの読み込みに失敗しました（ローカルデータを使用）');
    return false;
  }
}
async function saveToJsonBin() {
  if (!isJsonBinConfigured()) { showToast('⚠️ BIN_ID と API_KEY を設定してください'); return; }
  if (isSaving) return;
  isSaving = true; showSyncStatus('saving'); setSaveBtnState(true);
  try {
    const res = await fetch(BIN_URL, {
      method:'PUT',
      headers:{'Content-Type':'application/json','X-Master-Key':API_KEY},
      body: JSON.stringify({players, matches, posts: savedPosts})
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    showSyncStatus('ok'); showToast('✅ クラウドに保存しました');
  } catch(e) {
    console.error('JSONBin save error:', e);
    showSyncStatus('error'); showToast('❌ 保存に失敗しました');
  } finally {
    isSaving = false; setSaveBtnState(false);
  }
}
function showSyncStatus(status) {
  const el = $('#sync-status'); if (!el) return;
  const icons   = {loading:'🔄',saving:'💾',ok:'☁️',error:'⚠️',offline:'📵'};
  const labels  = {loading:'読込中',saving:'保存中',ok:'同期済',error:'エラー',offline:'オフライン'};
  el.innerHTML  = `<span class="sync-icon">${icons[status]}</span><span class="sync-label">${labels[status]}</span>`;
  el.dataset.status = status;
}
function setSaveBtnState(loading) {
  const btn = $('#btn-cloud-save'); if (!btn) return;
  btn.disabled = loading;
  btn.innerHTML = loading
    ? `<span class="spin">⏳</span> 保存中...`
    : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> クラウドに保存`;
}

// ============================================================
// SAVE helpers
// ============================================================
function savePlayers()      { Store.set('mp_players', players); }
function saveMatches()      { Store.set('mp_matches', matches); }
function saveCurrentMatch() {
  if (!currentMatch) return;
  const idx = matches.findIndex(m=>m.id===currentMatch.id);
  if (idx>=0) matches[idx] = currentMatch; else matches.unshift(currentMatch);
  saveMatches();
}

// ============================================================
// DOM helpers
// ============================================================
const $ = (s,c=document) => c.querySelector(s);
const $$ = (s,c=document) => [...c.querySelectorAll(s)];
const el = (tag,cls='',html='') => { const e=document.createElement(tag); if(cls)e.className=cls; if(html)e.innerHTML=html; return e; };
const esc = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const firstName = name => name.split(/\s/)[0]||name;

// ============================================================
// TOAST / CONFIRM
// ============================================================
let toastTimer;
function showToast(msg, dur=2500) {
  const t=$('#toast'); t.textContent=msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'), dur);
}
function showConfirm(title,msg,onOk) {
  const ov=$('#confirm-overlay');
  $('#confirm-title').textContent=title; $('#confirm-msg').textContent=msg;
  ov.classList.add('open');
  const close=()=>ov.classList.remove('open');
  $('#confirm-ok').onclick=()=>{close();onOk();}; $('#confirm-cancel').onclick=close;
}
function showScreen(id) {
  $$('.screen').forEach(s=>s.classList.add('hidden'));
  const s=$('#screen-'+id); if(s) s.classList.remove('hidden');
}

// ============================================================
// HOME
// ============================================================
function renderHome() {
  showScreen('home');
  const pc=$('#home-player-count'); if(pc) pc.textContent=players.length+'名';
  const mc=$('#home-match-count');  if(mc) mc.textContent=matches.length+'試合';
  const cfgNote=$('#jsonbin-config-note');
  if(cfgNote) cfgNote.classList.toggle('hidden', isJsonBinConfigured());

  const list=$('#home-recent'); list.innerHTML='';
  if(matches.length===0){
    if(players.length===0) list.innerHTML=`<div class="empty-hint"><span class="emoji">👋</span>まずは「選手管理」から選手を登録しましょう</div>`;
    return;
  }
  list.appendChild(el('div','section-label','最近の試合'));
  matches.slice(0,4).forEach(m=>{
    const card=el('button','match-card');
    card.innerHTML=`
      <div class="match-card-info">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap">
          <span class="type-badge ${TYPE_CLASS[m.type]||'type-practice'}">${esc(m.type)}</span>
          ${m.competitionName ? `<span class="comp-badge">${esc(m.competitionName)}</span>` : ''}
          <span class="match-card-title">${esc(m.name)}</span>
        </div>
        <div class="match-card-sub">vs ${esc(m.opponent)} · ${esc(m.date)}</div>
      </div>
      <span style="color:var(--dim)">${SVG.arrow}</span>`;
    card.onclick=()=>openMatch(m.id);
    list.appendChild(card);
  });
}

// ============================================================
// PLAYERS SCREEN
// ============================================================
let editingPlayerIdx = null;

function getFilteredSortedPlayers() {
  let list = [...players];

  // フィルター
  if (filterGrade) list = list.filter(p => p.grade === filterGrade);
  if (filterGroup) list = list.filter(p => (p.mainGroup||toGroup(p.main||'')) === filterGroup);
  if (filterSub)   list = list.filter(p => (p.sub||'').includes(filterSub));

  // ソート（公式戦統計ベース）
  list.sort((a,b) => {
    if (sortKey === 'number')  return (parseInt(a.number)||99) - (parseInt(b.number)||99);
    if (sortKey === 'grade')   return GRADES.indexOf(a.grade) - GRADES.indexOf(b.grade);
    if (sortKey === 'time')    return calcPlayerStats(b.id).totalMins  - calcPlayerStats(a.id).totalMins;
    if (sortKey === 'games')   return calcPlayerStats(b.id).games      - calcPlayerStats(a.id).games;
    if (sortKey === 'starter') return calcPlayerStats(b.id).starter    - calcPlayerStats(a.id).starter;
    return 0;
  });
  return list;
}

function renderPlayers() {
  showScreen('players');
  renderPlayerFilters();
  renderPlayerList();
}

function renderPlayerFilters() {
  const wrap = $('#player-filter-bar');
  if (!wrap) return;

  // ソートボタン（公式戦ベース）
  const sortBtns = [
    {key:'time',    label:'出場時間'},
    {key:'games',   label:'試合数'},
    {key:'starter', label:'先発'},
    {key:'grade',   label:'学年'},
    {key:'number',  label:'背番号'},
  ];

  // フィルター選択肢
  const gradeOpts = ['', ...GRADES].map(g => `<option value="${g}">${g||'学年 全て'}</option>`).join('');
  const groupOpts = ['', ...POS_GROUPS].map(g => `<option value="${g}">${g||'POS 全て'}</option>`).join('');

  wrap.innerHTML = `
    <div class="filter-sort-row">
      ${sortBtns.map(b=>`<button class="sort-btn${sortKey===b.key?' active':''}" data-sort="${b.key}">${b.label}</button>`).join('')}
    </div>
    <div class="filter-row">
      <div class="field-select-wrap filter-sel-wrap">
        <select id="filter-grade" class="field-input filter-sel">
          ${gradeOpts}
        </select>
      </div>
      <div class="field-select-wrap filter-sel-wrap">
        <select id="filter-group" class="field-input filter-sel">
          ${groupOpts}
        </select>
      </div>
      <input id="filter-sub" class="field-input filter-sel" type="text" placeholder="詳細POS絞込" value="${esc(filterSub)}">
    </div>`;

  $('#filter-grade').value = filterGrade;
  $('#filter-group').value = filterGroup;

  $$('.sort-btn', wrap).forEach(b => {
    b.onclick = () => { sortKey = b.dataset.sort; renderPlayerFilters(); renderPlayerList(); };
  });
  $('#filter-grade').onchange = e => { filterGrade = e.target.value; renderPlayerList(); };
  $('#filter-group').onchange = e => { filterGroup = e.target.value; renderPlayerList(); };
  $('#filter-sub').oninput    = e => { filterSub   = e.target.value; renderPlayerList(); };
}

function renderPlayerList() {
  const list = $('#player-list-body');
  list.innerHTML = '';
  const filtered = getFilteredSortedPlayers();
  if (filtered.length === 0) {
    list.innerHTML = `<div class="empty-hint"><span class="emoji">👤</span>該当する選手がいません</div>`;
    return;
  }
  filtered.forEach(p => {
    const origIdx = players.indexOf(p);
    const grp   = p.mainGroup || toGroup(p.main||'');
    const stats = calcPlayerStats(p.id); // 公式戦のみ
    const hasStats = stats.games > 0;
    const row = el('div','player-row-official');
    row.innerHTML = `
      <div class="pro-left">
        <div class="pro-num">${esc(p.number||'—')}</div>
        <div class="pro-pos pos-tag-${grp.toLowerCase()}">${esc(grp)}</div>
      </div>
      <div class="pro-center">
        <div class="pro-name">${esc(p.name)}</div>
        <div class="pro-meta">${esc(p.grade)}${p.detailPos && p.detailPos!==grp ? ' · '+esc(p.detailPos) : ''}</div>
        <div class="pro-stats">
          ${hasStats
            ? `<span class="pro-stat-badge">${stats.games}試合</span><span class="pro-stat-badge hi">${stats.totalMins}分</span><span class="pro-stat-badge">${stats.starter}先発</span>`
            : `<span class="pro-stat-none">公式戦出場なし</span>`
          }
        </div>
      </div>
      <div class="pro-actions">
        <button class="btn-ghost" data-action="detail" data-id="${p.id}">${SVG.chart}</button>
        <button class="btn-ghost" data-action="edit"   data-idx="${origIdx}">${SVG.edit}</button>
        <button class="btn-ghost danger" data-action="del" data-idx="${origIdx}">${SVG.trash}</button>
      </div>`;
    list.appendChild(row);
  });

  list.querySelectorAll('[data-action="edit"]').forEach(b => {
    b.onclick = () => openPlayerForm(+b.dataset.idx);
  });
  list.querySelectorAll('[data-action="del"]').forEach(b => {
    b.onclick = () => {
      const idx = +b.dataset.idx;
      showConfirm('選手を削除', `「${players[idx].name}」を削除しますか？`, () => {
        players.splice(idx,1); savePlayers(); renderPlayerList();
      });
    };
  });
  list.querySelectorAll('[data-action="detail"]').forEach(b => {
    b.onclick = () => openPlayerDetail(b.dataset.id);
  });
}

// 選手詳細モーダル
function openPlayerDetail(playerId) {
  const p     = players.find(x=>x.id===playerId); if (!p) return;
  const stats = calcPlayerStats(playerId);
  const grp   = p.mainGroup||toGroup(p.main||'');
  const ov    = $('#player-detail-overlay');

  const posRows = Object.entries(stats.posTime)
    .sort((a,b)=>b[1]-a[1])
    .map(([pg,m])=>`<div class="stat-row"><span>${pg}</span><span>${m}分</span></div>`).join('');

  const statsEx = calcPlayerStatsExtended(playerId);
  $('#player-detail-content').innerHTML = `
    <div class="detail-header">
      <div class="detail-num-wrap">
        <div class="detail-num">${esc(p.number||'—')}</div>
        <div class="detail-pos pos-tag-${grp.toLowerCase()}">${esc(grp)}</div>
      </div>
      <div>
        <div class="detail-name">${esc(p.name)}</div>
        <div class="detail-meta">
          ${esc(p.grade)}
          ${p.detailPos&&p.detailPos!==grp?' · '+esc(p.detailPos):''}
          ${p.sub?' · '+esc(p.sub):''}
        </div>
      </div>
    </div>
    <div class="detail-official-label">公式戦成績</div>
    <div class="stat-grid">
      <div class="stat-box"><div class="stat-val">${statsEx.games}</div><div class="stat-lbl">出場試合</div></div>
      <div class="stat-box"><div class="stat-val">${statsEx.totalMins}</div><div class="stat-lbl">出場時間</div></div>
      <div class="stat-box"><div class="stat-val">${statsEx.starter}</div><div class="stat-lbl">先発</div></div>
      <div class="stat-box"><div class="stat-val">${statsEx.bench}</div><div class="stat-lbl">ベンチ</div></div>
      <div class="stat-box stat-box-goal"><div class="stat-val">${statsEx.goals}</div><div class="stat-lbl">得点</div></div>
      <div class="stat-box"><div class="stat-val">${statsEx.assists}</div><div class="stat-lbl">アシスト</div></div>
    </div>
    ${posRows ? `<div class="stat-section-title">ポジション別出場時間</div><div class="stat-rows">${posRows}</div>` : ''}
    ${statsEx.games===0 ? '<div class="empty-hint" style="padding:20px 0 0"><span class="emoji" style="font-size:28px">📋</span>公式戦の出場記録がありません</div>' : ''}`;

  ov.classList.add('open');
}

function openPlayerForm(idx=null) {
  editingPlayerIdx = idx;
  const title = $('#player-form-title');
  if (idx !== null) {
    const p = players[idx];
    $('#pf-name').value      = p.name;
    $('#pf-number').value    = p.number||'';
    $('#pf-grade').value     = p.grade;
    $('#pf-main-group').value= p.mainGroup||toGroup(p.main||'');
    $('#pf-detail-pos').value= p.detailPos||p.main||'';
    $('#pf-sub').value       = p.sub||'';
    title.textContent        = '選手を編集';
  } else {
    $('#pf-name').value      = '';
    $('#pf-number').value    = '';
    $('#pf-grade').value     = '中1';
    $('#pf-main-group').value= 'MF';
    $('#pf-detail-pos').value= '';
    $('#pf-sub').value       = '';
    title.textContent        = '選手を追加';
  }
  $('#player-form-wrap').classList.remove('hidden');
  $('#pf-name').focus();
}

function savePlayerForm() {
  const name = $('#pf-name').value.trim();
  if (!name) { showToast('選手名を入力してください'); return; }
  const mainGroup = $('#pf-main-group').value;
  const detailPos = $('#pf-detail-pos').value.trim();
  const p = {
    id:         (editingPlayerIdx!==null ? players[editingPlayerIdx].id : null) || Date.now().toString(),
    name,
    number:     $('#pf-number').value.trim(),
    grade:      $('#pf-grade').value,
    mainGroup,
    detailPos,
    main:       detailPos || mainGroup, // 後方互換
    sub:        $('#pf-sub').value.trim(),
  };
  if (editingPlayerIdx!==null) players[editingPlayerIdx]=p;
  else players.push(p);
  savePlayers();
  $('#player-form-wrap').classList.add('hidden');
  editingPlayerIdx=null;
  renderPlayerList();
}

// ============================================================
// NEW MATCH
// ============================================================
let selectedFormation = '4-3-3';

function renderNewMatch() {
  showScreen('new-match');
  selectedFormation = '4-3-3';
  renderFormationBtns();
  $('#nm-date').value      = new Date().toISOString().slice(0,10);
  $('#nm-opponent').value  = '';
  $('#nm-venue').value     = '';
  $('#nm-name').value      = '';
  $('#nm-type').value      = '練習試合';
  renderCompetitionSelect('nm-competition', '');

  const sel = $('#nm-copy');
  sel.innerHTML = '<option value="">コピーしない</option>';
  matches.forEach(m => {
    const o = document.createElement('option');
    o.value = m.id; o.textContent = `${m.name} (${m.date})`; sel.appendChild(o);
  });
}

function renderCompetitionSelect(wrapperId, currentVal) {
  const wrap = $('#' + wrapperId); if (!wrap) return;
  wrap.innerHTML = `
    <div class="field-select-wrap">
      <select id="${wrapperId}-sel" class="field-input">
        ${COMPETITION_OPTIONS.map(c=>`<option value="${c}"${c===currentVal||(!currentVal&&c===COMPETITION_OPTIONS[0])?'':''} >${c}</option>`).join('')}
      </select>
    </div>
    <input id="${wrapperId}-custom" class="field-input hidden" type="text" placeholder="大会名を入力" value="">`;

  const sel    = $(`#${wrapperId}-sel`);
  const custom = $(`#${wrapperId}-custom`);

  // 初期値セット
  if (currentVal && !COMPETITION_OPTIONS.includes(currentVal)) {
    sel.value = 'その他'; custom.classList.remove('hidden'); custom.value = currentVal;
  } else if (currentVal) {
    sel.value = currentVal;
  }

  sel.onchange = () => {
    custom.classList.toggle('hidden', sel.value !== 'その他');
    if (sel.value !== 'その他') custom.value = '';
  };
}

function getCompetitionValue(wrapperId) {
  const sel    = $(`#${wrapperId}-sel`);
  const custom = $(`#${wrapperId}-custom`);
  if (!sel) return '';
  return sel.value === 'その他' ? (custom.value.trim()||'その他') : sel.value;
}

function renderFormationBtns() {
  const wrap = $('#formation-btns'); wrap.innerHTML = '';
  Object.keys(FORMATIONS).forEach(f => {
    const b = el('button','btn-formation'+(f===selectedFormation?' active':''), f);
    b.onclick = () => { selectedFormation=f; renderFormationBtns(); };
    wrap.appendChild(b);
  });
}

function createMatch() {
  const opponent = $('#nm-opponent').value.trim();
  if (!opponent) { showToast('対戦相手を入力してください'); return; }
  const copyId = $('#nm-copy').value;
  const base   = copyId ? matches.find(m=>m.id===copyId) : null;
  const name   = $('#nm-name').value.trim() || `vs ${opponent}`;
  const competitionName = getCompetitionValue('nm-competition');

  const match = {
    id: Date.now().toString(), name, opponent,
    date:      $('#nm-date').value,
    venue:     $('#nm-venue').value.trim(),
    type:      $('#nm-type').value,
    competitionName,
    formation: selectedFormation,
    lineup:    base ? JSON.parse(JSON.stringify(base.lineup||{})) : {},
    bench:     base ? JSON.parse(JSON.stringify(base.bench ||[])) : [],
    subs:      base ? JSON.parse(JSON.stringify(base.subs  ||[])) : [],
  };
  matches.unshift(match); saveMatches(); openMatch(match.id);
}

// ============================================================
// MATCH SCREEN
// ============================================================
function openMatch(id) {
  currentMatch = matches.find(m=>m.id===id); if (!currentMatch) return;
  activeTab='board'; selectedPos=null; renderMatch();
}

function renderMatch() {
  showScreen('match');
  $('#match-title').textContent = currentMatch.name;
  const badge = $('#match-type-badge');
  badge.textContent = currentMatch.type;
  badge.className   = `type-badge ${TYPE_CLASS[currentMatch.type]||'type-practice'}`;

  const metaParts = [`vs ${esc(currentMatch.opponent)}`, currentMatch.date];
  if (currentMatch.competitionName) metaParts.push(esc(currentMatch.competitionName));
  if (currentMatch.venue) metaParts.push(esc(currentMatch.venue));
  $('#match-meta').innerHTML = metaParts.map(s=>`<span>${s}</span>`).join('<span>·</span>');

  // 出場時間タブは常時表示（全試合種別で有用）
  const timeBtn = $('#tab-time-btn');
  if (timeBtn) timeBtn.classList.remove('hidden');
  const timePane = $('#tab-time');
  if (timePane) timePane.classList.remove('hidden');

  switchTab(activeTab);
}

function switchTab(tabId) {
  activeTab = tabId;
  $$('.tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.tab===tabId));
  $$('.tab-pane').forEach(p=>p.classList.toggle('active', p.id==='tab-'+tabId));
  if (tabId==='board')     renderBoard();
  if (tabId==='bench')     renderBench();
  if (tabId==='subs')      renderSubs();
  if (tabId==='time')      renderTime();
  if (tabId==='matchstat') renderMatchStat();
  if (tabId==='result')    renderResult();
  if (tabId==='hp')        renderHpView();
}

// ============================================================
// BOARD TAB
// ============================================================
function renderBoard() {
  const formation   = FORMATIONS[currentMatch.formation]||FORMATIONS['4-3-3'];
  const lineup      = currentMatch.lineup||{};
  const positions   = formation.positions;
  const assignedIds = Object.values(lineup).filter(Boolean).map(p=>p.id);

  const maxRow = Math.max(...positions.map(p=>p.row));
  const rows = [];
  for(let r=maxRow;r>=0;r--){ const row=positions.filter(p=>p.row===r); if(row.length) rows.push(row); }

  $('#formation-badge-text').textContent = currentMatch.formation;
  $('#placed-count').textContent         = `${assignedIds.length}/${positions.length}`;

  const pitchEl = $('#pitch-rows'); pitchEl.innerHTML='';
  rows.forEach(rowPositions => {
    const rowEl = el('div','pitch-row');
    rowPositions.forEach(pos => {
      const player    = lineup[pos.id];
      const isSelected = selectedPos===pos.id;
      const hasSelPos  = selectedPos && !selectedPos.startsWith('__p__');
      const hasSelPl   = selectedPos && selectedPos.startsWith('__p__');
      let extraClass = '';
      if (isSelected)                             extraClass='selected';
      else if ((hasSelPos||hasSelPl) && !player)  extraClass='target-empty';
      else if (hasSelPos && player)               extraClass='target-swap';

      const btn = el('button',`pos-btn ${player?'filled':''} ${extraClass}`);
      btn.innerHTML = `<div class="pos-label">${pos.label}</div>`;
      if (player) {
        const grp = player.mainGroup||toGroup(player.main||'');
        btn.innerHTML += `
          <div class="pos-player-num">${esc(player.number||'—')}</div>
          <div class="pos-player-name">${esc(firstName(player.name))}</div>`;
      } else {
        btn.innerHTML += extraClass==='target-empty'
          ? `<div class="pos-target-plus">+</div>`
          : `<div class="pos-empty">空</div>`;
      }
      btn.onclick = ()=>handlePosTap(pos.id);
      const slot = el('div','pos-slot'); slot.appendChild(btn); rowEl.appendChild(slot);
    });
    pitchEl.appendChild(rowEl);
  });

  renderSelectionHint();
  renderPlayerStrip(assignedIds, positions, lineup);
}

function handlePosTap(posId) {
  const lineup = currentMatch.lineup||{};
  if (!selectedPos)                     { selectedPos=posId; renderBoard(); return; }
  if (selectedPos===posId)              { selectedPos=null;  renderBoard(); return; }
  if (selectedPos.startsWith('__p__'))  { const p=players.find(x=>x.id===selectedPos.slice(4)); if(p) assignPlayer(posId,p); return; }
  swapPositions(selectedPos, posId);
}

function handleStripPlayerTap(playerId) {
  const lineup      = currentMatch.lineup||{};
  const assignedIds = Object.values(lineup).filter(Boolean).map(p=>p.id);
  const isAssigned  = assignedIds.includes(playerId);
  if (!selectedPos) {
    selectedPos = isAssigned ? (Object.keys(lineup).find(k=>lineup[k]?.id===playerId)||null) : '__p__'+playerId;
    renderBoard(); return;
  }
  if (selectedPos==='__p__'+playerId) { selectedPos=null; renderBoard(); return; }
  if (selectedPos.startsWith('__p__')) { selectedPos=isAssigned?null:'__p__'+playerId; renderBoard(); return; }
  const p=players.find(x=>x.id===playerId); if(p) assignPlayer(selectedPos,p);
}

function assignPlayer(posId, player) {
  if (!currentMatch.lineup) currentMatch.lineup={};
  Object.keys(currentMatch.lineup).forEach(k=>{ if(currentMatch.lineup[k]?.id===player.id) delete currentMatch.lineup[k]; });
  currentMatch.lineup[posId]=player; selectedPos=null; saveCurrentMatch(); renderBoard();
}

function swapPositions(posA, posB) {
  if (!currentMatch.lineup) currentMatch.lineup={};
  const a=currentMatch.lineup[posA], b=currentMatch.lineup[posB];
  if(b) currentMatch.lineup[posA]=b; else delete currentMatch.lineup[posA];
  if(a) currentMatch.lineup[posB]=a; else delete currentMatch.lineup[posB];
  selectedPos=null; saveCurrentMatch(); renderBoard();
}

function removeFromLineup(posId) {
  if (!currentMatch.lineup) return;
  delete currentMatch.lineup[posId]; selectedPos=null; saveCurrentMatch(); renderBoard();
}

function renderSelectionHint() {
  const hint  = $('#selection-hint');
  const lineup = currentMatch.lineup||{};
  if (!selectedPos) { hint.innerHTML=`<span style="color:var(--dim)">ポジションまたは選手をタップして配置</span>`; return; }
  if (selectedPos.startsWith('__p__')) {
    const p=players.find(x=>x.id===selectedPos.slice(4));
    hint.innerHTML=`<span>「${esc(p?.name||'')}」→ ポジションをタップ <button class="btn-cancel-sel" id="btn-cancel-sel">✕</button></span>`;
  } else {
    const player=lineup[selectedPos];
    if (player) {
      hint.innerHTML=`<span>「${esc(player.name)}」選択中 <button class="btn-cancel-sel" id="btn-cancel-sel">✕</button> <button class="btn-cancel-sel" style="color:var(--red);margin-left:6px" id="btn-remove-pos">外す</button></span>`;
      const rm=$('#btn-remove-pos'); if(rm) rm.onclick=()=>removeFromLineup(selectedPos);
    } else {
      hint.innerHTML=`<span>↓ 選手をタップして配置 <button class="btn-cancel-sel" id="btn-cancel-sel">✕</button></span>`;
    }
  }
  const cb=$('#btn-cancel-sel'); if(cb) cb.onclick=()=>{selectedPos=null;renderBoard();};
}

function renderPlayerStrip(assignedIds, positions, lineup) {
  const strip = $('#player-strip'); strip.innerHTML='';
  const unassigned = players.filter(p=>!assignedIds.includes(p.id));
  const assigned   = players.filter(p=> assignedIds.includes(p.id));
  const isTablet   = window.innerWidth>=768;

  const makeCard = (p, isAssigned) => {
    const posId    = isAssigned ? Object.keys(lineup).find(k=>lineup[k]?.id===p.id) : null;
    const posLabel = posId ? (positions.find(pos=>pos.id===posId)?.label||'—') : (p.mainGroup||toGroup(p.main||''));
    const grp      = p.mainGroup||toGroup(p.main||'');
    const isSelPl  = selectedPos==='__p__'+p.id;
    const isSelPos = posId && selectedPos===posId;
    const hl       = isSelPl||isSelPos;
    const card = el('button',`strip-card ${isAssigned?'placed':''} ${hl?'highlighted':''}`);
    if (isTablet) {
      card.innerHTML=`
        <div class="strip-num ${isAssigned?'green':''}">${esc(p.number||'—')}</div>
        <div class="strip-info"><div class="strip-name">${esc(p.name)}</div></div>
        <span style="font-size:11px;color:var(--dim);flex-shrink:0">${esc(p.grade)}</span>
        <span class="strip-pos-tag ${isAssigned?'placed':''} pos-tag-${grp.toLowerCase()}">${esc(posLabel)}</span>`;
    } else {
      card.innerHTML=`
        <div class="strip-num ${isAssigned?'green':''}">${esc(p.number||'—')}</div>
        <div class="strip-name">${esc(firstName(p.name))}</div>
        <span class="strip-pos-tag ${isAssigned?'placed':''} pos-tag-${grp.toLowerCase()}">${esc(posLabel)}</span>`;
    }
    card.onclick=()=>handleStripPlayerTap(p.id);
    return card;
  };

  unassigned.forEach(p=>strip.appendChild(makeCard(p,false)));
  if (unassigned.length>0 && assigned.length>0) strip.appendChild(el('div','strip-divider'));
  assigned.forEach(p=>strip.appendChild(makeCard(p,true)));
  const cnt=$('#strip-count'); if(cnt) cnt.textContent=unassigned.length+'名未配置';
}

// ============================================================
// BENCH TAB
// ============================================================
function renderBench() {
  const bench     = currentMatch.bench||[];
  const lineup    = currentMatch.lineup||{};
  const lineupIds = Object.values(lineup).filter(Boolean).map(p=>p.id);
  const benchIds  = bench.map(p=>p.id);
  const notAssigned = players.filter(p=>!lineupIds.includes(p.id));
  const body = $('#bench-body'); body.innerHTML='';

  if (bench.length>0) {
    body.innerHTML+=`<div class="sub-section-label">ベンチ入り (${bench.length}名)</div>`;
    bench.forEach(p=>{
      const grp = p.mainGroup||toGroup(p.main||'');
      const row=el('div','player-row'); row.style.background='rgba(16,185,129,0.05)';
      row.innerHTML=`
        <div class="player-num placed">${esc(p.number||'—')}</div>
        <div class="player-info">
          <div class="player-name">${esc(p.name)}</div>
          <div class="player-meta">${esc(p.grade)} · <span class="pos-tag pos-tag-${grp.toLowerCase()}">${esc(grp)}</span></div>
        </div>
        <button class="btn-ghost danger" data-pid="${p.id}">${SVG.close}</button>`;
      body.appendChild(row);
    });
  }
  body.innerHTML+=`<div class="sub-section-label">スタメン外 (${notAssigned.length}名)</div>`;
  if (notAssigned.length===0) body.innerHTML+=`<div class="empty-hint" style="padding:16px">✅ 全選手配置済み</div>`;
  notAssigned.forEach(p=>{
    const inBench=benchIds.includes(p.id);
    const grp=p.mainGroup||toGroup(p.main||'');
    const row=el('div','player-row');
    row.innerHTML=`
      <div class="player-num">${esc(p.number||'—')}</div>
      <div class="player-info">
        <div class="player-name">${esc(p.name)}</div>
        <div class="player-meta">${esc(p.grade)} · <span class="pos-tag pos-tag-${grp.toLowerCase()}">${esc(grp)}</span></div>
      </div>
      <button class="btn-ghost ${inBench?'danger':'success'}" data-pid="${p.id}" data-in-bench="${inBench}">
        ${inBench?SVG.close:SVG.plus}
      </button>`;
    body.appendChild(row);
  });
  body.querySelectorAll('[data-pid]').forEach(btn=>{
    btn.onclick=()=>{
      const pid=btn.dataset.pid; const inBench=btn.dataset.inBench==='true';
      if(inBench){ currentMatch.bench=bench.filter(p=>p.id!==pid); }
      else { const p=players.find(x=>x.id===pid); if(p){if(!currentMatch.bench)currentMatch.bench=[];currentMatch.bench.push(p);} }
      saveCurrentMatch(); renderBench();
    };
  });
}

// ============================================================
// SUBS TAB
// ============================================================
function renderSubs() {
  const subs=currentMatch.subs||[];
  const body=$('#subs-body'); body.innerHTML='';
  if (subs.length===0) {
    body.innerHTML=`<div class="empty-hint"><span class="emoji">🔄</span>交代計画がありません</div>`;
  } else {
    const sorted=[...subs].sort((a,b)=>(parseInt(a.minute)||0)-(parseInt(b.minute)||0));
    sorted.forEach(s=>{
      const card=el('div','sub-card');
      card.innerHTML=`
        <div class="sub-minute">${s.minute?s.minute+"'":'—'}</div>
        <div class="sub-detail">
          <div class="sub-out">▼ OUT ${esc(s.out)}</div>
          <div class="sub-in">▲ IN  ${esc(s.in)}</div>
        </div>
        <button class="btn-ghost danger" data-sid="${s.id}">${SVG.trash}</button>`;
      body.appendChild(card);
    });
    body.querySelectorAll('[data-sid]').forEach(btn=>{
      btn.onclick=()=>{ currentMatch.subs=subs.filter(s=>s.id!==btn.dataset.sid); saveCurrentMatch(); renderSubs(); };
    });
  }
}

function openSubForm() {
  $('#sf-minute').value='';
  ['sf-out','sf-in'].forEach(id=>{
    const sel=$('#'+id); sel.innerHTML='<option value="">選択</option>';
    players.forEach(p=>{
      const grp=p.mainGroup||toGroup(p.main||'');
      const o=document.createElement('option');
      o.value=p.name; o.textContent=`${p.name} (${grp})`; sel.appendChild(o);
    });
  });
  $('#sub-form-overlay').classList.add('open');
}

function saveSubForm() {
  const out=$('#sf-out').value, inp=$('#sf-in').value;
  if(!out||!inp){showToast('OUT・INの選手を選んでください');return;}
  if(!currentMatch.subs) currentMatch.subs=[];
  currentMatch.subs.push({id:Date.now().toString(),minute:$('#sf-minute').value,out,in:inp});
  saveCurrentMatch(); $('#sub-form-overlay').classList.remove('open'); renderSubs();
}

// ============================================================
// TIME TAB
// ============================================================
function renderTime() {
  const lineup=currentMatch.lineup||{}, subs=currentMatch.subs||[];
  const body=$('#time-body');
  body.innerHTML=`<div style="padding:10px 16px 4px;font-size:12px;color:var(--dim)">試合時間 ${TOTAL_MINUTES}分換算</div>`;

  const calcMins = p => calcMatchMins(currentMatch, p.id);
  const listed = players.filter(p=>calcMins(p)>0).sort((a,b)=>calcMins(b)-calcMins(a));

  if (listed.length===0) {
    body.innerHTML+=`<div class="empty-hint"><span class="emoji">⏱</span>配置を設定すると出場時間が表示されます</div>`;
    return;
  }
  listed.forEach(p=>{
    const mins=calcMins(p), pct=Math.round((mins/TOTAL_MINUTES)*100);
    const color=pct>70?'var(--green)':pct>40?'var(--amber)':'var(--blue)';
    const isStarter=Object.values(lineup).filter(Boolean).some(x=>x.id===p.id);
    const row=el('div','time-row');
    row.innerHTML=`
      <div class="time-row-top">
        <span class="time-name">${esc(p.name)} ${isStarter?'<span class="starter-badge">先発</span>':'<span class="sub-badge">途中</span>'}</span>
        <span class="time-val">${mins}分</span>
      </div>
      <div class="time-bar-bg"><div class="time-bar-fill" style="width:${pct}%;background:${color}"></div></div>`;
    body.appendChild(row);
  });

  // 未出場
  const notPlayed=players.filter(p=>calcMins(p)===0);
  if (notPlayed.length>0) {
    body.innerHTML+=`<div class="sub-section-label" style="padding:12px 16px 4px">未出場 (${notPlayed.length}名)</div>`;
    notPlayed.forEach(p=>{
      const grp=p.mainGroup||toGroup(p.main||'');
      body.innerHTML+=`<div class="time-row" style="opacity:0.45">
        <div class="time-row-top">
          <span class="time-name">${esc(p.name)} <span style="font-size:10px;color:var(--dim)">${esc(grp)}</span></span>
          <span class="time-val" style="color:var(--dim)">0分</span>
        </div></div>`;
    });
  }
}

// ============================================================
// MATCH STAT TAB（試合ごとデータ）
// ============================================================
function renderMatchStat() {
  const body = $('#matchstat-body'); if (!body) return;
  body.innerHTML = '';
  const lineup  = currentMatch.lineup||{};
  const subs    = currentMatch.subs  ||[];
  const bench   = currentMatch.bench ||[];
  const lineupIds = Object.values(lineup).filter(Boolean).map(p=>p.id);
  const benchIds  = bench.map(p=>p.id);

  const starters    = players.filter(p=>lineupIds.includes(p.id));
  const subPlayers  = players.filter(p=>!lineupIds.includes(p.id) && subs.some(s=>s.in===p.name));
  const benchOnly   = players.filter(p=>!lineupIds.includes(p.id) && benchIds.includes(p.id) && !subs.some(s=>s.in===p.name));
  const notUsed     = players.filter(p=>!lineupIds.includes(p.id) && !benchIds.includes(p.id));

  const section = (title, emoji, list, showMins=false) => {
    if (!list.length) return;
    body.innerHTML+=`<div class="sub-section-label">${emoji} ${title} (${list.length}名)</div>`;
    list.forEach(p=>{
      const grp  = p.mainGroup||toGroup(p.main||'');
      const mins = showMins ? calcMatchMins(currentMatch, p.id) : null;
      const posId= Object.keys(lineup).find(k=>lineup[k]?.id===p.id);
      const posLabel= posId ? ((FORMATIONS[currentMatch.formation]?.positions||[]).find(pos=>pos.id===posId)?.label||'') : '';
      body.innerHTML+=`
        <div class="player-row">
          <div class="player-num">${esc(p.number||'—')}</div>
          <div class="player-info">
            <div class="player-name">${esc(p.name)}</div>
            <div class="player-meta">
              <span class="pos-tag pos-tag-${grp.toLowerCase()}">${esc(grp)}</span>
              ${posLabel?`<span class="pos-tag sub">${esc(posLabel)}</span>`:''}
            </div>
          </div>
          ${mins!==null?`<span style="font-weight:700;color:var(--green);font-size:14px;flex-shrink:0">${mins}分</span>`:''}
        </div>`;
    });
  };

  section('スタメン', '⬛', starters, true);
  section('途中出場', '🔄', subPlayers, true);
  section('ベンチのみ', '🪑', benchOnly, false);
  section('未出場',     '—',  notUsed,   false);

  if (body.innerHTML==='') body.innerHTML=`<div class="empty-hint"><span class="emoji">📋</span>配置データがありません</div>`;
}

// ============================================================
// HISTORY
// ============================================================
function renderHistory() {
  showScreen('history');
  const body=$('#history-body'); body.innerHTML='';
  if (matches.length===0) { body.innerHTML=`<div class="empty-hint"><span class="emoji">📋</span>試合がありません</div>`; return; }
  matches.forEach(m=>{
    const card=el('div','match-card'); card.style.marginBottom='8px';
    card.innerHTML=`
      <div style="display:flex;align-items:center;gap:6px;flex:1;min-width:0;flex-wrap:wrap">
        <span class="type-badge ${TYPE_CLASS[m.type]||'type-practice'}">${esc(m.type)}</span>
        ${m.competitionName?`<span class="comp-badge">${esc(m.competitionName)}</span>`:''}
        <div class="match-card-info">
          <div class="match-card-title">${esc(m.name)}</div>
          <div class="match-card-sub">${esc(m.date)}${m.venue?' · '+esc(m.venue):''}</div>
        </div>
      </div>
      <button class="btn-ghost danger" data-mid="${m.id}" style="margin-right:4px">${SVG.trash}</button>
      <span style="color:var(--dim)">${SVG.arrow}</span>`;
    card.onclick=e=>{ if(e.target.closest('[data-mid]')) return; openMatch(m.id); };
    body.appendChild(card);
  });
  body.querySelectorAll('[data-mid]').forEach(btn=>{
    btn.onclick=e=>{
      e.stopPropagation();
      const mid=btn.dataset.mid, match=matches.find(m=>m.id===mid);
      const postedToGrande = !!(match && match.result && match.result.grandePosted);
      const msg = postedToGrande
        ? `「${match?.name}」を削除しますか？\n※GRANDEホームページにも掲載中です。同時に削除されます。`
        : `「${match?.name}」を削除しますか？`;
      showConfirm('試合を削除', msg, async ()=>{
        matches=matches.filter(m=>m.id!==mid); saveMatches(); renderHistory();

        // ★ GRANDE側のクリーンアップ
        //   送信済みフラグがある試合は確実に削除を試みる。
        //   フラグが無い試合（この機能の追加前に送信したもの）も
        //   念のためベストエフォートで同じIDを試し、残っていれば一緒に消す。
        const newsId = (match && match.result && match.result.grandeNewsId)
          || (match ? buildNewsPost(match).id : null);
        if (newsId) {
          const res = await deleteGrandeNewsPost(newsId);
          if (postedToGrande) {
            if (res.ok) showToast(res.found ? '🗑 GRANDEホームページからも削除しました' : '🗑 試合を削除しました');
            else        showToast('⚠️ ホームページ側の削除に失敗しました（通信環境をご確認のうえ再度お試しください）');
          } else if (res.ok && res.found) {
            showToast('🗑 GRANDEホームページに残っていた記事も削除しました');
          }
        }
      });
    };
  });
}

// ============================================================
// SVG ICONS
// ============================================================
const SVG = {
  arrow: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`,
  plus:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  edit:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  chart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
};

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {

  // マイグレーション
  migratePlayers(); migrateMatches();

  // 学年select
  $$('.grade-select').forEach(s=>{
    GRADES.forEach(g=>{ const o=document.createElement('option');o.value=g;o.textContent=g;s.appendChild(o); });
  });
  // POSグループselect
  $$('.pos-group-select').forEach(s=>{
    POS_GROUPS.forEach(g=>{ const o=document.createElement('option');o.value=g;o.textContent=g;s.appendChild(o); });
  });
  // 試合種別select
  $$('.type-select').forEach(s=>{
    MATCH_TYPES.forEach(t=>{ const o=document.createElement('option');o.value=t;o.textContent=t;s.appendChild(o); });
  });

  // クラウド読み込み
  if (isJsonBinConfigured()) { showSyncStatus('loading'); await loadFromJsonBin(); }
  else showSyncStatus('offline');

  // ── ホーム ──
  $('#btn-new-match').onclick  = ()=>renderNewMatch();
  $('#btn-players').onclick    = ()=>renderPlayers();
  $('#btn-history').onclick    = ()=>renderHistory();
  $('#btn-cloud-save').onclick = ()=>saveToJsonBin();

  // ── 選手管理 ──
  $('#btn-add-player').onclick         = ()=>openPlayerForm();
  $('#btn-player-form-save').onclick   = savePlayerForm;
  $('#btn-player-form-cancel').onclick = ()=>{ $('#player-form-wrap').classList.add('hidden'); editingPlayerIdx=null; };
  $('#btn-back-players').onclick       = ()=>renderHome();

  // 選手詳細モーダル
  $('#player-detail-overlay').onclick = e=>{ if(e.target===$('#player-detail-overlay')) $('#player-detail-overlay').classList.remove('open'); };
  $('#btn-close-player-detail').onclick = ()=>$('#player-detail-overlay').classList.remove('open');

  // ── 試合作成 ──
  $('#btn-back-new-match').onclick = ()=>renderHome();
  $('#btn-create-match').onclick   = createMatch;

  // ── 試合詳細 ──
  $('#btn-back-match').onclick = ()=>{ selectedPos=null; renderHome(); };
  $$('.tab-btn').forEach(btn=>{ btn.onclick=()=>switchTab(btn.dataset.tab); });

  // ── 交代 ──
  $('#btn-add-sub').onclick     = openSubForm;
  $('#btn-sub-save').onclick    = saveSubForm;
  $('#btn-sub-cancel').onclick  = ()=>$('#sub-form-overlay').classList.remove('open');
  $('#btn-sub-cancel2').onclick = ()=>$('#sub-form-overlay').classList.remove('open');
  $('#sub-form-overlay').onclick = e=>{ if(e.target===e.currentTarget) e.currentTarget.classList.remove('open'); };

  // ── 履歴 ──
  $('#btn-back-history').onclick = ()=>renderHome();

  // ── 最新情報投稿 ──
  $('#btn-post').onclick         = ()=>renderPost();
  $('#btn-back-post').onclick    = ()=>renderHome();
  $('#btn-post-preview').onclick = ()=>previewPost();
  $('#btn-post-send').onclick    = ()=>sendManualPost();
  // 投稿タブ切り替え
  $$('.post-tab-btn').forEach(btn=>{
    btn.onclick = ()=>switchPostTab(btn.dataset.ptab);
  });

  // 初期表示
  renderHome();
});

// ============================================================
// RESULT TAB — 試合結果入力・表示
// ============================================================

function renderResult() {
  const body = $('#result-body'); if (!body) return;
  const r = currentMatch.result || {};
  const isOfficial = currentMatch.type === '公式戦';

  // スコアは数値で保存されているが、未入力の場合は空文字表示
  const myScore  = (r.myScore  !== undefined && r.myScore  !== null) ? r.myScore  : '';
  const oppScore = (r.oppScore !== undefined && r.oppScore !== null) ? r.oppScore : '';
  const goals    = r.goals    || [];
  const concedes = r.concedes || [];
  const format   = r.format   || currentMatch.matchFormat || '';
  const publish  = r.publish  !== false; // デフォルトtrue
  const makeNews = r.makeNews !== false;

  // 勝敗判定
  const resultLabel = (myScore !== '' && oppScore !== '')
    ? (Number(myScore) > Number(oppScore) ? '勝利 🏆' : Number(myScore) < Number(oppScore) ? '敗戦' : '引き分け')
    : '';
  const resultClass = resultLabel.includes('勝') ? 'result-win' : resultLabel.includes('敗') ? 'result-lose' : 'result-draw';

  body.innerHTML = `
    <!-- スコア入力 -->
    <div class="result-score-card">
      <div class="result-team-block">
        <div class="result-team-label">自チーム</div>
        <input id="r-my-score" class="result-score-input" type="number" min="0" max="99" value="${myScore}" placeholder="0">
      </div>
      <div class="result-vs-block">
        <div class="result-vs">vs</div>
        ${resultLabel ? `<div class="result-badge ${resultClass}">${resultLabel}</div>` : ''}
      </div>
      <div class="result-team-block">
        <div class="result-team-label">相手チーム</div>
        <input id="r-opp-score" class="result-score-input" type="number" min="0" max="99" value="${oppScore}" placeholder="0">
      </div>
    </div>

    <!-- 試合形式 -->
    <div class="result-section">
      <div class="result-section-title">試合形式</div>
      <input id="r-format" class="field-input" type="text" value="${esc(format)}" placeholder="例: 40分×2、30分×3">
    </div>

    <!-- 得点記録 -->
    <div class="result-section">
      <div class="result-section-title">得点記録
        <button class="result-add-btn" id="btn-add-goal">＋ 得点追加</button>
      </div>
      <div id="goal-list">
        ${goals.map((g,i) => renderGoalRow(g, i)).join('')}
        ${goals.length===0 ? '<div class="result-empty">得点なし</div>' : ''}
      </div>
    </div>

    <!-- 失点記録 -->
    <div class="result-section">
      <div class="result-section-title">失点記録
        <button class="result-add-btn" id="btn-add-concede">＋ 失点追加</button>
      </div>
      <div id="concede-list">
        ${concedes.map((c,i) => renderConcedeRow(c, i)).join('')}
        ${concedes.length===0 ? '<div class="result-empty">失点なし</div>' : ''}
      </div>
    </div>

    ${isOfficial ? `
    <!-- 公開設定 -->
    <div class="result-section">
      <div class="result-section-title">ホームページ設定</div>
      <label class="toggle-row">
        <span>ホームページに掲載する</span>
        <input type="checkbox" id="r-publish" ${publish?'checked':''}>
        <span class="toggle-slider"></span>
      </label>
      <label class="toggle-row">
        <span>ニュース記事を作成する</span>
        <input type="checkbox" id="r-make-news" ${makeNews?'checked':''}>
        <span class="toggle-slider"></span>
      </label>
    </div>` : ''}

    <!-- 保存ボタン -->
    <div style="padding:0 0 24px">
      <button id="btn-save-result" class="btn-primary" style="margin:0">
        ${SVG.check} 結果を保存
      </button>
    </div>`;

  // イベント
  $('#btn-add-goal').onclick    = () => addGoalRow();
  $('#btn-add-concede').onclick = () => addConcedeRow();
  $('#btn-save-result').onclick = saveResult;
  bindGoalDeleteBtns();
  bindConcedeDeleteBtns();
}

function renderGoalRow(g, i) {
  const playerOpts = players.map(p =>
    `<option value="${esc(p.name)}" ${g.scorer===p.name?'selected':''}>${esc(p.name)}</option>`
  ).join('');
  const assistOpts = `<option value="">なし</option>` + players.map(p =>
    `<option value="${esc(p.name)}" ${g.assist===p.name?'selected':''}>${esc(p.name)}</option>`
  ).join('');

  return `<div class="goal-row" data-gi="${i}">
    <div class="goal-row-top">
      <input class="goal-minute field-input" type="number" min="1" max="120" value="${esc(g.minute||'')}" placeholder="分">
      <div class="field-select-wrap" style="flex:2">
        <select class="goal-scorer field-input">${playerOpts}</select>
      </div>
      <button class="btn-ghost danger goal-del-btn" data-gi="${i}">${SVG.close}</button>
    </div>
    <div class="field-select-wrap">
      <select class="goal-assist field-input">${assistOpts}</select>
    </div>
  </div>`;
}

function renderConcedeRow(c, i) {
  return `<div class="concede-row" data-ci="${i}">
    <div style="display:flex;align-items:center;gap:8px">
      <input class="concede-minute field-input" type="number" min="1" max="120" value="${esc(c.minute||'')}" placeholder="失点時間（分）" style="flex:1">
      <button class="btn-ghost danger concede-del-btn" data-ci="${i}">${SVG.close}</button>
    </div>
  </div>`;
}

function addGoalRow() {
  if (!currentMatch.result) currentMatch.result = {};
  if (!currentMatch.result.goals) currentMatch.result.goals = [];
  const firstPlayer = players[0]?.name || '';
  // 行追加前に現在のスコア入力値を保持
  const myVal  = $('#r-my-score')  ? $('#r-my-score').value  : '';
  const oppVal = $('#r-opp-score') ? $('#r-opp-score').value : '';
  currentMatch.result.goals.push({ minute:'', scorer: firstPlayer, assist:'' });
  // saveCurrentMatchは呼ばず画面のみ再描画
  renderResult();
  // 再描画後にスコア入力値を復元
  if ($('#r-my-score')  && myVal  !== '') $('#r-my-score').value  = myVal;
  if ($('#r-opp-score') && oppVal !== '') $('#r-opp-score').value = oppVal;
}

function addConcedeRow() {
  if (!currentMatch.result) currentMatch.result = {};
  if (!currentMatch.result.concedes) currentMatch.result.concedes = [];
  const myVal  = $('#r-my-score')  ? $('#r-my-score').value  : '';
  const oppVal = $('#r-opp-score') ? $('#r-opp-score').value : '';
  currentMatch.result.concedes.push({ minute:'' });
  renderResult();
  if ($('#r-my-score')  && myVal  !== '') $('#r-my-score').value  = myVal;
  if ($('#r-opp-score') && oppVal !== '') $('#r-opp-score').value = oppVal;
}

function bindGoalDeleteBtns() {
  $$('.goal-del-btn').forEach(btn => {
    btn.onclick = () => {
      const i = +btn.dataset.gi;
      if (currentMatch.result?.goals) {
        currentMatch.result.goals.splice(i, 1);
        saveCurrentMatch(); renderResult();
      }
    };
  });
}

function bindConcedeDeleteBtns() {
  $$('.concede-del-btn').forEach(btn => {
    btn.onclick = () => {
      const i = +btn.dataset.ci;
      if (currentMatch.result?.concedes) {
        currentMatch.result.concedes.splice(i, 1);
        saveCurrentMatch(); renderResult();
      }
    };
  });
}

function saveResult() {
  if (!currentMatch.result) currentMatch.result = {};
  const r = currentMatch.result;

  // スコア：入力欄から取得。空欄は0ではなくundefinedとして扱い、
  // 入力がある場合のみ上書き（空欄のまま保存しても既存値を壊さない）
  const myInput  = $('#r-my-score');
  const oppInput = $('#r-opp-score');
  if (myInput) {
    const v = myInput.value.trim();
    r.myScore  = v !== '' ? parseInt(v, 10) : (r.myScore  ?? 0);
  }
  if (oppInput) {
    const v = oppInput.value.trim();
    r.oppScore = v !== '' ? parseInt(v, 10) : (r.oppScore ?? 0);
  }

  r.format   = $('#r-format')    ? $('#r-format').value.trim() : (r.format   || '');
  r.publish  = $('#r-publish')   ? $('#r-publish').checked      : (r.publish  !== false);
  r.makeNews = $('#r-make-news') ? $('#r-make-news').checked    : (r.makeNews !== false);

  // 得点者・アシストを行から収集
  const goalRows = $$('.goal-row');
  r.goals = goalRows.map(row => ({
    minute:  row.querySelector('.goal-minute')?.value  || '',
    scorer:  row.querySelector('.goal-scorer')?.value  || '',
    assist:  row.querySelector('.goal-assist')?.value  || '',
  })).filter(g => g.scorer); // 選手が選択されていない行は除外

  // 失点時間を収集
  const concedeRows = $$('.concede-row');
  r.concedes = concedeRows.map(row => ({
    minute: row.querySelector('.concede-minute')?.value || '',
  }));

  // スコアの決定ロジック：
  // 1. スコア欄に数値が入力されていればそれを優先
  // 2. スコア欄が空 or 0 で、得点行 / 失点行があればその行数を使う
  // 3. どちらもなければ 0
  const goalsCount    = r.goals.length;
  const concedesCount = r.concedes.length;

  // スコア欄の現在値（NaN対策込み）
  const myInputVal  = myInput  ? parseInt(myInput.value.trim(),  10) : NaN;
  const oppInputVal = oppInput ? parseInt(oppInput.value.trim(), 10) : NaN;

  if (!isNaN(myInputVal) && myInputVal > 0) {
    r.myScore = myInputVal;                       // 欄に正の数 → そちら優先
  } else if (goalsCount > 0) {
    r.myScore = goalsCount;                       // 得点行がある → 行数を使う
  } else if (!isNaN(myInputVal)) {
    r.myScore = myInputVal;                       // 0が明示的に入力されている
  } else {
    r.myScore = r.myScore ?? 0;
  }

  if (!isNaN(oppInputVal) && oppInputVal > 0) {
    r.oppScore = oppInputVal;
  } else if (concedesCount > 0) {
    r.oppScore = concedesCount;
  } else if (!isNaN(oppInputVal)) {
    r.oppScore = oppInputVal;
  } else {
    r.oppScore = r.oppScore ?? 0;
  }

  // 最終NaN対策
  if (isNaN(r.myScore))  r.myScore  = 0;
  if (isNaN(r.oppScore)) r.oppScore = 0;

  // 勝敗判定
  if (r.myScore > r.oppScore)       r.resultStr = '勝利';
  else if (r.myScore < r.oppScore)  r.resultStr = '敗戦';
  else                               r.resultStr = '引き分け';

  // HP用データ自動生成
  r.hpData = generateHpData(currentMatch, r);

  saveCurrentMatch();
  showToast('✅ 試合結果を保存しました');
  renderResult();
}

// ============================================================
// HP DATA GENERATOR — ホームページ掲載用データ生成
// ============================================================

function generateHpData(match, r) {
  const goals    = r.goals    || [];
  const scorers  = goals.map(g => g.scorer).filter(Boolean);
  const scoreStr = `${r.myScore ?? '?'} - ${r.oppScore ?? '?'}`;
  const dateStr  = match.date ? match.date.replace(/-/g, '/') : '';

  // 得点者集計
  const scorerCount = {};
  goals.forEach(g => { if(g.scorer) scorerCount[g.scorer] = (scorerCount[g.scorer]||0)+1; });
  const scorerSummary = Object.entries(scorerCount)
    .sort((a,b)=>b[1]-a[1])
    .map(([name,cnt])=> cnt>1 ? `${name}${cnt}点` : name)
    .join('、');

  // アシスト集計
  const assistCount = {};
  goals.forEach(g => { if(g.assist) assistCount[g.assist] = (assistCount[g.assist]||0)+1; });
  const assistSummary = Object.entries(assistCount)
    .map(([name,cnt])=> cnt>1 ? `${name}(${cnt})` : name)
    .join('、');

  // 自動記事本文
  const comp   = match.competitionName || match.type || '';
  const result = r.resultStr || '';
  let article = '';
  if (r.myScore !== undefined && r.oppScore !== undefined) {
    const opening = `${comp}で${match.opponent}と対戦し、${scoreStr}で${result}しました。`;
    const scorePart = scorerSummary ? `得点者は${scorerSummary}でした。` : '';
    const assistPart = assistSummary ? `アシストは${assistSummary}。` : '';
    article = opening + scorePart + assistPart;
  }

  // 試合結果カードデータ（JSON）
  const cardData = {
    date:        dateStr,
    competition: comp,
    opponent:    match.opponent,
    venue:       match.venue || '',
    score:       scoreStr,
    result:      result,
    format:      r.format || '',
    scorers:     Object.entries(scorerCount).map(([n,c])=>({name:n,goals:c})),
    assists:     Object.entries(assistCount).map(([n,c])=>({name:n,assists:c})),
  };

  return { article, cardData, scorerSummary, assistSummary, scoreStr, dateStr };
}

// ============================================================
// HP VIEW TAB — ホームページ用データ表示・コピー
// ============================================================

function renderHpView() {
  const body = $('#hp-body'); if (!body) return;
  const r    = currentMatch.result;

  if (!r || r.myScore === undefined) {
    body.innerHTML = `<div class="empty-hint"><span class="emoji">📄</span>先に「結果入力」タブで試合結果を保存してください</div>`;
    return;
  }

  const hp    = r.hpData || generateHpData(currentMatch, r);
  const goals = r.goals || [];

  // 得点詳細テーブル
  const goalTable = goals.length > 0
    ? `<table class="hp-table">
        <thead><tr><th>時間</th><th>得点者</th><th>アシスト</th></tr></thead>
        <tbody>${goals.map(g=>`<tr><td>${g.minute?g.minute+"'":'-'}</td><td>${esc(g.scorer||'-')}</td><td>${esc(g.assist||'-')}</td></tr>`).join('')}</tbody>
       </table>`
    : '<div class="result-empty">得点なし</div>';

  const isOfficial = currentMatch.type === '公式戦';
  const publishOn  = r.publish !== false;
  const newsOn     = r.makeNews !== false;

  const savedImageUrl = r.imageUrl || '';

  body.innerHTML = `
    <!-- 画像URL入力 -->
    <div class="hp-section" style="padding-bottom:12px">
      <div class="hp-section-title">記事画像（任意）</div>
      <div style="display:flex;gap:8px;align-items:center">
        <input id="hp-image-url" class="field-input" type="url"
          placeholder="https:// または Googleドライブ共有URL"
          value="${esc(savedImageUrl)}"
          style="flex:1;font-size:13px;padding:9px 12px">
        <button id="btn-hp-image-save" class="hp-copy-btn" style="white-space:nowrap;padding:9px 14px">保存</button>
      </div>
      ${savedImageUrl ? `<div id="hp-image-preview" style="margin-top:8px">
        <img src="${esc(convertImageUrl(savedImageUrl))}" alt="プレビュー"
          style="max-width:100%;max-height:140px;object-fit:cover;border-radius:8px;display:block"
          onerror="this.style.display='none'">
      </div>` : '<div id="hp-image-preview"></div>'}
    </div>

    <!-- スコアサマリー -->
    <div class="hp-score-banner ${r.resultStr==='勝利'?'win':r.resultStr==='敗戦'?'lose':'draw'}">
      <div class="hp-score-main">${hp.scoreStr}</div>
      <div class="hp-score-result">${r.resultStr||''}</div>
      <div class="hp-score-meta">${hp.dateStr} vs ${esc(currentMatch.opponent)}</div>
      ${r.format ? `<div class="hp-score-format">${esc(r.format)}</div>` : ''}
    </div>

    <!-- 得点詳細 -->
    <div class="hp-section">
      <div class="hp-section-title">得点詳細</div>
      ${goalTable}
    </div>

    ${isOfficial && publishOn ? `
    <!-- 自動記事 -->
    <div class="hp-section">
      <div class="hp-section-title">
        自動記事
        <button class="hp-copy-btn" data-copy="article">コピー</button>
      </div>
      <div class="hp-article-text" id="hp-article-text">${esc(hp.article)}</div>
    </div>

    <!-- 試合結果カード JSON -->
    <div class="hp-section">
      <div class="hp-section-title">
        結果カードデータ (JSON)
        <button class="hp-copy-btn" data-copy="card">コピー</button>
      </div>
      <pre class="hp-json" id="hp-card-json">${esc(JSON.stringify(hp.cardData, null, 2))}</pre>
    </div>` : ''}

    ${isOfficial ? `
    <!-- 公開設定サマリー -->
    <div class="hp-section">
      <div class="hp-section-title">公開設定</div>
      <div class="hp-toggle-summary">
        <span class="hp-toggle-item ${publishOn?'on':'off'}">${publishOn?'✅':'—'} ホームページ掲載 ${publishOn?'ON':'OFF'}</span>
        <span class="hp-toggle-item ${newsOn?'on':'off'}">${newsOn?'✅':'—'} ニュース記事 ${newsOn?'ON':'OFF'}</span>
      </div>
    </div>` : ''}`;

  // コピーボタン
  $$('[data-copy]', body).forEach(btn => {
    btn.onclick = () => {
      const type = btn.dataset.copy;
      let text = '';
      if (type === 'article') text = hp.article;
      if (type === 'card')    text = JSON.stringify(hp.cardData, null, 2);
      navigator.clipboard.writeText(text).then(()=>showToast('📋 コピーしました')).catch(()=>{
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        showToast('📋 コピーしました');
      });
    };
  });

  // 画像URL保存ボタン
  const imgSaveBtn = $('#btn-hp-image-save');
  if (imgSaveBtn) {
    imgSaveBtn.onclick = () => {
      const rawUrl = $('#hp-image-url')?.value.trim() || '';
      if (!currentMatch.result) currentMatch.result = {};
      currentMatch.result.imageUrl = rawUrl;
      saveCurrentMatch();
      showToast('✅ 画像URLを保存しました');
      // プレビュー更新
      const preview = $('#hp-image-preview');
      if (preview) {
        if (rawUrl) {
          preview.innerHTML = `<img src="${esc(convertImageUrl(rawUrl))}" alt="プレビュー"
            style="max-width:100%;max-height:140px;object-fit:cover;border-radius:8px;margin-top:8px;display:block"
            onerror="this.style.display='none'">`;
        } else {
          preview.innerHTML = '';
        }
      }
    };
  }

  // GRANDEに送信ボタンを末尾に追加
  if (isOfficial && publishOn) {
    const sendWrap = el('div','hp-section');
    const posted = r.grandePosted === true;
    sendWrap.innerHTML = `
      <div class="hp-section-title">GRANDEホームページ連携</div>
      <div class="hp-send-desc">「送信」を押すと、この試合結果記事がGRANDEホームページのニュース一覧に自動反映されます。<br>同じ試合を再送信した場合は上書き更新されます。</div>
      <button id="btn-send-grande" class="btn-send-grande">
        🌐 GRANDEに送信
      </button>
      ${posted ? `
      <div class="hp-grande-posted-note">✅ ホームページに掲載中です</div>
      <button id="btn-delete-grande" class="btn-secondary" style="width:100%;margin-top:8px;color:var(--red)">
        🗑 ホームページから記事を削除
      </button>` : ''}`;
    body.appendChild(sendWrap);
    const sendBtn = $('#btn-send-grande');
    if (sendBtn) sendBtn.onclick = sendToGrande;

    const delBtn = $('#btn-delete-grande');
    if (delBtn) {
      delBtn.onclick = () => {
        showConfirm('記事を削除', 'GRANDEホームページのニュース記事を削除しますか？\n（Match Plannerの試合データはそのまま残ります）', async () => {
          delBtn.disabled = true; delBtn.textContent = '削除中...';
          const newsId = r.grandeNewsId || buildNewsPost(currentMatch).id;
          const res = await deleteGrandeNewsPost(newsId);
          if (res.ok) {
            currentMatch.result.grandePosted = false;
            currentMatch.result.grandeNewsId = null;
            saveCurrentMatch();
            showToast(res.found ? '🗑 ホームページから削除しました' : '記事は既に削除されていました');
            renderHpView();
          } else {
            showToast('⚠️ 削除に失敗しました（通信環境をご確認のうえ再度お試しください）');
            delBtn.disabled = false; delBtn.textContent = '🗑 ホームページから記事を削除';
          }
        });
      };
    }
  }
}

// ============================================================
// calcPlayerStats に得点・アシストを追加
// ============================================================
// 既存のcalcPlayerStatsを拡張版に差し替え
const _origCalcPlayerStats = calcPlayerStats;
function calcPlayerStatsExtended(playerId) {
  const base = _origCalcPlayerStats(playerId);
  let goals = 0, assists = 0;

  matches.filter(m=>m.type==='公式戦').forEach(m => {
    const r = m.result || {};
    (r.goals||[]).forEach(g => {
      if (g.scorer === players.find(p=>p.id===playerId)?.name) goals++;
      if (g.assist === players.find(p=>p.id===playerId)?.name) assists++;
    });
  });

  return { ...base, goals, assists };
}

// ============================================================
// 画像URL変換（GoogleドライブURL → 直接表示URL）
// ============================================================
function convertImageUrl(url) {
  if (!url) return '';
  // grande_news.html / grande_homepage.html と同じ変換ロジック
  const m1 = url.match(/\/file\/d\/([^\/\?]+)/);
  if (m1) return 'https://lh3.googleusercontent.com/d/' + m1[1];
  const m2 = url.match(/[?&]id=([^&]+)/);
  if (m2) return 'https://lh3.googleusercontent.com/d/' + m2[1];
  return url;
}

// ============================================================
// GRANDE ニュース連携
// ============================================================
//
// ★ ニュース用JSONBin — Match Planner 自身の保存用BINとは別
//    grande_news.html が読む: BIN 6a1ed74af5f4af5e29ad180b
//    データ形式: { posts: [ {id, title, category, type, date, body, score, source, scorers, published}, ... ] }
//
const GRANDE_NEWS_BIN = '6a381e07f5f4af5e29191bec';
const GRANDE_API_KEY  = API_KEY;

/**
 * Match Planner の試合データを grande_news.html が読める
 * ニュース記事オブジェクトに変換する。
 *
 * 出力例:
 * {
 *   "id": "match_20260608_u13",
 *   "title": "U-13リーグ vs FC頼みや 試合結果速報",
 *   "category": "ジュニアユース",
 *   "type": "試合結果",
 *   "date": "2026-06-08",
 *   "body": "U-13リーグでFC頼みやと対戦し、1-1で引き分けました。",
 *   "score": "1-1",
 *   "source": "matchPlanner",
 *   "scorers": [ { "name": "溝口佐奈", "goals": 1 } ],
 *   "published": true
 * }
 */
function buildNewsPost(match) {
  const r = match.result || {};

  // ── ID（日付＋大会名略称で固定。再送信しても同じIDになる）
  const dateTag = (match.date || '').replace(/-/g, '');
  const compTag = (match.competitionName || match.type || '')
    .replace(/\s+/g, '')
    .replace(/[^\w\u3000-\u9fff]/g, '')
    .slice(0, 10);
  const id = ('match_' + dateTag + '_' + compTag).toLowerCase();

  // ── スコア文字列
  const my  = r.myScore  !== undefined ? r.myScore  : '?';
  const opp = r.oppScore !== undefined ? r.oppScore : '?';
  const score = my + '-' + opp;

  // ── カテゴリー（大会名から判定）
  const compLower = (match.competitionName || '').toLowerCase();
  let category = 'ジュニアユース';
  if (compLower.includes('u-12') || compLower.includes('u12')) category = 'ジュニア';

  // ── タイトル
  const result = r.resultStr || '';
  const title  = ((match.competitionName || match.type || '') + ' vs ' + (match.opponent || '') + ' ' + score + ' ' + result).trim();

  // ── scorers（名前ごとのゴール数集計）
  const scorerMap = {};
  (r.goals || []).filter(function(g){ return g.scorer; }).forEach(function(g) {
    scorerMap[g.scorer] = (scorerMap[g.scorer] || 0) + 1;
  });
  const scorers = Object.entries(scorerMap).map(function(e){ return { name: e[0], goals: e[1] }; });

  // ── 本文
  const scorerNames = scorers.map(function(s){ return s.goals > 1 ? s.name + s.goals + '点' : s.name; });
  let body = (match.competitionName || '') + 'で' + (match.opponent || '') + 'と対戦し、' + score + 'で' + (result || '試合終了') + 'しました。';
  if (scorerNames.length) body += '得点者は' + scorerNames.join('、') + 'でした。';

  // 画像URL（GoogleドライブURLも変換）
  const rawImageUrl = r.imageUrl || '';
  const imageUrl    = rawImageUrl ? convertImageUrl(rawImageUrl) : null;

  return {
    id:        id,
    title:     title,
    category:  category,
    type:      '試合結果',
    date:      match.date || '',
    body:      body,
    score:     score,
    image:     imageUrl,
    source:    'matchPlanner',
    scorers:   scorers,
    published: r.publish !== false
  };
}

/**
 * GRANDEニュースBinに記事を送信する。
 *
 * 処理の流れ:
 *  1. GET /v3/b/{GRANDE_NEWS_BIN}/latest で現在の posts を取得
 *  2. json.record.posts を取り出す
 *  3. 試合結果をニュース記事形式（buildNewsPost）に変換
 *  4. 同じ id の記事があれば更新、なければ先頭に追加
 *  5. PUT /v3/b/{GRANDE_NEWS_BIN} で { posts: [...] } として保存
 *
 * ★ Match Planner 自身の保存用 BIN_URL とは一切関係ない
 */
async function sendToGrande() {
  const r = currentMatch && currentMatch.result;
  if (!r || r.myScore === undefined) {
    showToast('⚠️ 先に「結果」タブで試合結果を保存してください');
    return;
  }
  if (r.publish === false) {
    showToast('⚠️ 「ホームページに掲載する」がOFFです');
    return;
  }

  const btn = $('#btn-send-grande');
  if (btn) { btn.disabled = true; btn.textContent = '送信中...'; }

  try {
    // ── Step 1: GET で現在の posts を取得（matches/players も保持するため）
    var getRes = await fetch(BIN_URL + '/latest', {
      headers: { 'X-Master-Key': GRANDE_API_KEY }
    });
    if (!getRes.ok) throw new Error('GET失敗: HTTP ' + getRes.status);
    var getJson = await getRes.json();

    // ── Step 2: json.record.posts を取り出す
    var posts = (getJson.record && Array.isArray(getJson.record.posts))
      ? getJson.record.posts
      : [];

    // ── Step 3: ニュース記事オブジェクトに変換
    var newPost = buildNewsPost(currentMatch);

    // ── Step 4: 同じIDがあれば上書き、なければ先頭に追加
    var existIdx = posts.findIndex(function(p){ return p.id === newPost.id; });
    if (existIdx >= 0) {
      posts[existIdx] = newPost;
    } else {
      posts.unshift(newPost);
    }

    // ── Step 5: PUT で { players, matches, posts } をまとめて保存
    var putRes = await fetch(BIN_URL, {
      method:  'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': GRANDE_API_KEY
      },
      body: JSON.stringify({ players: players, matches: matches, posts: posts })
    });
    if (!putRes.ok) throw new Error('PUT失敗: HTTP ' + putRes.status);
    savedPosts = posts;

    // ★ 送信済みフラグを試合データに記録（削除時にホームページ側も消せるようにする）
    if (!currentMatch.result) currentMatch.result = {};
    currentMatch.result.grandePosted  = true;
    currentMatch.result.grandeNewsId  = newPost.id;
    saveCurrentMatch();

    showToast('✅ GRANDEホームページに送信しました');
    renderHpView();

  } catch (e) {
    console.error('GRANDE送信エラー:', e);
    showToast('❌ 送信失敗: ' + e.message);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '🌐 GRANDEに送信'; }
  }
}

/**
 * GRANDEニュースBinから記事を削除する。
 * sendToGrande と対になる処理:
 *  1. GET で現在の posts を取得
 *  2. 指定 id の記事を除外
 *  3. PUT で保存し直す
 *
 * 記事が見つからなかった場合も found:false でエラーなく返す
 * （すでに削除済み・未送信の場合に呼んでも安全）。
 */
async function deleteGrandeNewsPost(postId) {
  if (!postId) return { ok: true, found: false };

  var NEWS_URL = 'https://api.jsonbin.io/v3/b/' + GRANDE_NEWS_BIN;

  try {
    var getRes = await fetch(NEWS_URL + '/latest', {
      headers: { 'X-Master-Key': GRANDE_API_KEY }
    });
    if (!getRes.ok) throw new Error('GET失敗: HTTP ' + getRes.status);
    var getJson = await getRes.json();

    var posts = (getJson.record && Array.isArray(getJson.record.posts))
      ? getJson.record.posts
      : [];

    var nextPosts = posts.filter(function(p){ return p.id !== postId; });
    if (nextPosts.length === posts.length) {
      return { ok: true, found: false }; // 元々載っていなかった
    }

    var putRes = await fetch(NEWS_URL, {
      method:  'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': GRANDE_API_KEY
      },
      body: JSON.stringify({ players: players, matches: matches, posts: nextPosts })
    });
    if (!putRes.ok) throw new Error('PUT失敗: HTTP ' + putRes.status);
    savedPosts = nextPosts;

    return { ok: true, found: true };

  } catch (e) {
    console.error('GRANDE削除エラー:', e);
    return { ok: false, error: e };
  }
}

// ============================================================
// 最新情報投稿機能
// ============================================================

let currentPostType = 'お知らせ';

function renderPost() {
  showScreen('post');
  // 日付を今日にセット
  const dateInput = $('#post-date');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().slice(0, 10);
  }
  switchPostTab('compose');
  // 投稿タイプボタンのイベント
  $$('.post-type-btn').forEach(btn => {
    btn.onclick = () => {
      $$('.post-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPostType = btn.dataset.type;
    };
  });
}

function switchPostTab(tabId) {
  $$('.post-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.ptab === tabId));
  $$('.post-pane').forEach(p => {
    p.classList.toggle('hidden', p.id !== 'post-pane-' + tabId);
  });
  if (tabId === 'history') renderPostHistory();
}

// ── 投稿プレビュー
function previewPost() {
  const title    = $('#post-title').value.trim();
  const body     = $('#post-body').value.trim();
  const date     = $('#post-date').value;
  const category = $('#post-category').value;
  const imageUrl = $('#post-image').value.trim();

  if (!title) { showToast('タイトルを入力してください'); return; }

  const preview = $('#post-preview');
  const content = $('#post-preview-content');
  const fmtDate = date ? date.replace(/-/g, '.') : '';

  content.innerHTML = `
    <div class="preview-card">
      ${imageUrl ? `<img src="${esc(imageUrl)}" style="width:100%;max-height:160px;object-fit:cover;border-radius:8px;margin-bottom:8px" onerror="this.style.display='none'">` : ''}
      <div style="display:flex;gap:6px;align-items:center;margin-bottom:8px;flex-wrap:wrap">
        <span class="type-badge type-practice" style="font-size:11px">${esc(currentPostType)}</span>
        <span style="font-size:12px;color:var(--dim)">${esc(category)}</span>
        <span style="font-size:12px;color:var(--dim);margin-left:auto">${esc(fmtDate)}</span>
      </div>
      <div style="font-weight:800;font-size:15px;color:var(--text);margin-bottom:8px">${esc(title)}</div>
      ${body ? `<div style="font-size:13px;color:var(--muted);line-height:1.7;white-space:pre-wrap">${esc(body)}</div>` : ''}
    </div>`;

  preview.classList.remove('hidden');
  showToast('プレビューを表示しました');
}

// ── 投稿データ生成
function buildManualPost() {
  const title    = $('#post-title').value.trim();
  const body     = $('#post-body').value.trim();
  const date     = $('#post-date').value;
  const category = $('#post-category').value;
  const imageUrl = $('#post-image').value.trim();
  const publish  = $('#post-publish').checked;

  // ID: 日付+タイトル先頭
  const dateTag  = (date || '').replace(/-/g, '');
  const titleTag = title.replace(/[^\w\u3000-\u9fff]/g, '').slice(0, 10).toLowerCase();
  const id       = `post_${dateTag}_${titleTag}`;

  return {
    id,
    title,
    category,
    type:      currentPostType,
    date:      date || new Date().toISOString().slice(0, 10),
    body,
    image:     imageUrl || null,
    source:    'manualPost',
    published: publish,
  };
}

// ── GRANDEニュースBinに投稿
async function sendManualPost() {
  const title = $('#post-title').value.trim();
  if (!title) { showToast('タイトルを入力してください'); return; }
  if (!$('#post-publish').checked) {
    showToast('⚠️ 「ホームページに掲載する」がOFFです');
    return;
  }

  const btn = $('#btn-post-send');
  if (btn) { btn.disabled = true; btn.textContent = '送信中...'; }

  const NEWS_URL = `https://api.jsonbin.io/v3/b/${GRANDE_NEWS_BIN}`;

  try {
    // GET 既存posts
    const getRes = await fetch(`${NEWS_URL}/latest`, {
      headers: { 'X-Master-Key': GRANDE_API_KEY }
    });
    if (!getRes.ok) throw new Error(`GET失敗: HTTP ${getRes.status}`);
    const getJson = await getRes.json();
    const posts   = Array.isArray(getJson.record?.posts) ? getJson.record.posts : [];

    // 新しい投稿を作成
    const newPost = buildManualPost();

    // 同じIDがあれば更新、なければ先頭に追加
    const idx = posts.findIndex(p => p.id === newPost.id);
    if (idx >= 0) { posts[idx] = newPost; }
    else          { posts.unshift(newPost); }

    // PUT — players/matches も一緒に保持して posts だけ更新
    const putRes = await fetch(NEWS_URL, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': GRANDE_API_KEY },
      body:    JSON.stringify({ players, matches, posts })
    });
    if (!putRes.ok) throw new Error(`PUT失敗: HTTP ${putRes.status}`);
    savedPosts = posts;

    // 投稿履歴をlocalStorageに保存
    const history = Store.get('mp_post_history', []);
    const newPost2 = buildManualPost();
    const hIdx = history.findIndex(p => p.id === newPost2.id);
    if (hIdx >= 0) history[hIdx] = newPost2; else history.unshift(newPost2);
    Store.set('mp_post_history', history.slice(0, 50)); // 最大50件

    showToast('✅ GRANDEホームページに投稿しました');

    // フォームリセット
    $('#post-title').value = '';
    $('#post-body').value  = '';
    $('#post-image').value = '';
    $('#post-preview').classList.add('hidden');
    $('#post-date').value  = new Date().toISOString().slice(0, 10);

  } catch(e) {
    console.error('投稿エラー:', e);
    showToast(`❌ 投稿失敗: ${e.message}`);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '🌐 GRANDEに投稿'; }
  }
}

// ── 投稿履歴表示
function renderPostHistory() {
  const list    = $('#post-history-list');
  const history = Store.get('mp_post_history', []);

  if (history.length === 0) {
    list.innerHTML = `<div class="empty-hint"><span class="emoji">📭</span>投稿履歴がありません</div>`;
    return;
  }

  list.innerHTML = history.map((p, i) => `
    <div class="post-history-item">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">
        <span class="type-badge type-practice" style="font-size:10px;padding:2px 7px">${esc(p.type||'')}</span>
        <span style="font-size:11px;color:var(--dim)">${esc(p.category||'')}</span>
        <span style="font-size:11px;color:var(--dim);margin-left:auto">${esc((p.date||'').replace(/-/g,'.'))}</span>
      </div>
      <div style="font-weight:700;font-size:14px;color:var(--text);margin-bottom:4px">${esc(p.title||'')}</div>
      ${p.body ? `<div style="font-size:12px;color:var(--muted);margin-top:2px;
        display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${esc(p.body)}</div>` : ''}
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">
        <span style="font-size:11px;color:var(--green)">
          ${p.published ? '✅ 掲載中' : '— 非掲載'}
        </span>
        <button class="btn-ghost danger ph-del-btn" data-idx="${i}" style="font-size:12px;padding:4px 10px;border:1px solid rgba(239,68,68,0.3);border-radius:6px;color:var(--red)">
          ${SVG.trash} 削除
        </button>
      </div>
    </div>`).join('');

  // 削除ボタンのイベント
  $$('.ph-del-btn', list).forEach(btn => {
    btn.onclick = () => {
      const idx = +btn.dataset.idx;
      showConfirm('投稿を削除', `「${history[idx]?.title}」を履歴から削除しますか？`, () => {
        history.splice(idx, 1);
        Store.set('mp_post_history', history);
        renderPostHistory();
      });
    };
  });
}

/* ════════════════════════════════════════════════════════════
   ★ SNS IMAGE MAKER — 追加モジュール
   既存機能には一切変更を加えない（末尾追記のみ）。
   テンプレートは SNS_TEMPLATES / SNS_TPL に追加するだけで拡張可能。
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';

// ------------------------------------------------------------
// テンプレート定義（将来: 選手募集/MVP/誕生日等はここに追加）
// ------------------------------------------------------------
const SNS_TEMPLATES = [
  { id: 'resultA', kind: 'result', name: '試合結果A', desc: 'フォト×ネイビー' },
  { id: 'resultB', kind: 'result', name: '試合結果B', desc: '対戦カード型' },
  { id: 'resultC', kind: 'result', name: '試合結果C', desc: 'Jクラブ風' },
  { id: 'noticeA', kind: 'notice', name: '試合告知A', desc: 'NEXT MATCH' },
  { id: 'noticeB', kind: 'notice', name: '試合告知B', desc: '黒×ネイビー' },
  { id: 'noticeC', kind: 'notice', name: '試合告知C', desc: '写真重視' },
];

// ------------------------------------------------------------
// 状態
// ------------------------------------------------------------
const snsData = {
  templateId: 'resultA',
  kind: 'result',
  club: localStorage.getItem('mp_sns_club') || 'GRANDE FC',
  competition: '', opponent: '',
  myScore: '', oppScore: '', scorers: '',
  date: '', time: '', venue: '',
};
const photoState = { img: null, scale: 1, x: 0, y: 0 };
let snsOrigin = 'home'; // 'home' | 'match'

// ------------------------------------------------------------
// ヘルパー
// ------------------------------------------------------------
function snsFmtDate(d) {
  if (!d) return { ymd: '', dow: '' };
  const dt = new Date(d + 'T00:00:00');
  if (isNaN(dt)) return { ymd: d, dow: '' };
  const dows = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  return { ymd: `${dt.getFullYear()}.${dt.getMonth()+1}.${dt.getDate()}`, dow: dows[dt.getDay()] };
}
function snsScorerLines() {
  return String(snsData.scorers || '').split(/\n|、|,/).map(s => s.trim()).filter(Boolean);
}
function snsResultWord() {
  const a = parseInt(snsData.myScore, 10), b = parseInt(snsData.oppScore, 10);
  if (isNaN(a) || isNaN(b)) return '';
  return a > b ? 'WIN' : a < b ? 'LOSE' : 'DRAW';
}
function snsBadgeHtml(cls = '') {
  const w = snsResultWord();
  if (!w) return '';
  return `<div class="sns-badge sns-badge-${w.toLowerCase()} ${cls}">${w}</div>`;
}
function snsScoreTxt(v) {
  const n = parseInt(v, 10);
  return isNaN(n) ? '0' : String(n);
}
function snsClubInitial(name) {
  const c = String(name || 'G').trim().charAt(0);
  return esc(c.toUpperCase ? c.toUpperCase() : c);
}
function snsClubBadge() {
  return `<div class="sns-club-badge">
    <span class="sns-club-mark">${snsClubInitial(snsData.club)}</span>
    <span class="sns-club-name">${esc(snsData.club)}</span>
  </div>`;
}
function snsPhotoBlock() {
  if (photoState.img) {
    return `<div class="snsP"><canvas class="sns-photo-cv" width="1080" height="1080"></canvas></div>`;
  }
  return `<div class="snsP snsP-ph"></div>`;
}

// ------------------------------------------------------------
// テンプレートHTML生成（1080×1080実寸）
// ------------------------------------------------------------
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
        <div class="tplA-comp">${esc(d.competition)}</div>
      </div>
      <div class="tplA-center">
        <div class="tplA-ft">FULL TIME</div>
        <div class="tplA-score sns-num">${snsScoreTxt(d.myScore)}<span class="tplA-dash">-</span>${snsScoreTxt(d.oppScore)}</div>
        <div class="tplA-teams">${esc(d.club)}<span class="tplA-vs">vs</span>${esc(d.opponent)}</div>
        ${snsBadgeHtml('tplA-badge')}
      </div>
      <div class="tplA-bottom">
        <div class="tplA-scorers">${lines.map(s => `<span>⚽ ${esc(s)}</span>`).join('')}</div>
        <div class="tplA-date sns-num">${esc(f.ymd)}${f.dow ? ` <em>${f.dow}</em>` : ''}</div>
      </div>`;
  },

  resultB(d) {
    const f = snsFmtDate(d.date);
    const lines = snsScorerLines();
    return `
      ${snsPhotoBlock()}
      <div class="ovl"></div>
      <div class="tplB-stripe"></div>
      <div class="tplB-comp">${esc(d.competition)}</div>
      <div class="tplB-row">
        <div class="tplB-team"><small>HOME</small>${esc(d.club)}</div>
        <div class="tplB-scorebox">
          <div class="tplB-ft">FULL TIME</div>
          <div class="tplB-score sns-num">${snsScoreTxt(d.myScore)}<span>-</span>${snsScoreTxt(d.oppScore)}</div>
          ${snsBadgeHtml('tplB-badge')}
        </div>
        <div class="tplB-team"><small>AWAY</small>${esc(d.opponent)}</div>
      </div>
      <div class="tplB-bottom">
        ${lines.length ? `<div class="tplB-scorers">${lines.map(s => `<span>⚽ ${esc(s)}</span>`).join('')}</div>` : ''}
        <div class="tplB-date sns-num">${esc(f.ymd)}${f.dow ? ` ${f.dow}` : ''}</div>
      </div>`;
  },

  resultC(d) {
    const f = snsFmtDate(d.date);
    const lines = snsScorerLines();
    return `
      ${snsPhotoBlock()}
      <div class="tplC-photo-ovl"></div>
      <div class="tplC-chip">${esc(d.competition)}</div>
      ${snsBadgeHtml('tplC-badge')}
      <div class="tplC-panel">
        <div class="tplC-panel-row">
          <div class="tplC-score sns-num">${snsScoreTxt(d.myScore)}<span>-</span>${snsScoreTxt(d.oppScore)}</div>
          <div class="tplC-info">
            <div class="tplC-teams">${esc(d.club)}<em>vs</em>${esc(d.opponent)}</div>
            ${lines.length ? `<div class="tplC-scorers">⚽ ${lines.map(esc).join('　')}</div>` : ''}
          </div>
        </div>
        <div class="tplC-foot">
          <span><b>MATCH RESULT</b></span>
          <span class="sns-num">${esc(f.ymd)}${f.dow ? ` ${f.dow}` : ''}</span>
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
        <div class="tplNA-comp">${esc(d.competition)}</div>
      </div>
      <div class="tplNA-card">
        <div class="tplNA-team">${esc(d.club)}</div>
        <div class="tplNA-vs">VS</div>
        <div class="tplNA-team">${esc(d.opponent)}</div>
      </div>
      <div class="tplNA-info">
        <div class="tplNA-date sns-num">${esc(f.ymd)}${f.dow ? `<em>${f.dow}</em>` : ''}</div>
        ${d.time ? `<div class="tplNA-ko sns-num">KICK OFF ${esc(d.time)}</div>` : ''}
        ${d.venue ? `<div class="tplNA-venue">📍 ${esc(d.venue)}</div>` : ''}
      </div>`;
  },

  noticeB(d) {
    const f = snsFmtDate(d.date);
    const photo = photoState.img
      ? `<div class="tplNB-photo"><div class="snsP"><canvas class="sns-photo-cv" width="1080" height="1080"></canvas></div><div class="tplNB-photo-ovl"></div></div>`
      : '';
    return `
      <div class="tplNB-deco"></div>
      <div class="tplNB-line"></div>
      <div class="tplNB-body">
        <div class="tplNB-next">NEXT<br><b>MATCH</b></div>
        <div class="tplNB-comp">${esc(d.competition)}</div>
        ${photo}
        <div class="tplNB-vs">${esc(d.club)}<em>VS</em>${esc(d.opponent)}</div>
        <div class="tplNB-grid">
          <div class="tplNB-cell"><div class="lab">DATE</div><div class="val sns-num">${esc(f.ymd)}${f.dow ? `<em>${f.dow}</em>` : ''}</div></div>
          ${d.time ? `<div class="tplNB-cell"><div class="lab">KICK OFF</div><div class="val sns-num">${esc(d.time)}</div></div>` : ''}
          ${d.venue ? `<div class="tplNB-cell"><div class="lab">VENUE</div><div class="val">${esc(d.venue)}</div></div>` : ''}
        </div>
      </div>`;
  },

  noticeC(d) {
    const f = snsFmtDate(d.date);
    return `
      ${snsPhotoBlock()}
      <div class="ovl"></div>
      <div class="tplNC-club">${snsClubBadge()}</div>
      <div class="tplNC-comp">${esc(d.competition)}</div>
      <div class="tplNC-bottom">
        <div class="tplNC-next">NEXT<br><b>MATCH</b></div>
        <div class="tplNC-opp"><em>vs</em>${esc(d.opponent)}</div>
        <div class="tplNC-meta">
          <span class="sns-num">${esc(f.ymd)}${f.dow ? ` ${f.dow}` : ''}</span>
          ${d.time ? `<span><b>KO</b> <span class="sns-num">${esc(d.time)}</span></span>` : ''}
          ${d.venue ? `<span>📍 ${esc(d.venue)}</span>` : ''}
        </div>
      </div>`;
  },
};

// ------------------------------------------------------------
// 写真処理（読み込み→自動リサイズ圧縮→正方形クロップ描画）
// ------------------------------------------------------------
function snsLoadPhotoFile(file) {
  if (!file) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(url);
    const max = 2200; // 自動リサイズ（メモリ・速度対策）
    const iw = img.naturalWidth, ih = img.naturalHeight;
    if (Math.max(iw, ih) > max) {
      const r = max / Math.max(iw, ih);
      const c = document.createElement('canvas');
      c.width = Math.round(iw * r); c.height = Math.round(ih * r);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      const im2 = new Image();
      im2.onload = () => snsSetPhoto(im2);
      im2.src = c.toDataURL('image/jpeg', 0.9); // 画像圧縮
    } else {
      snsSetPhoto(img);
    }
  };
  img.onerror = () => { URL.revokeObjectURL(url); showToast('⚠️ 写真を読み込めませんでした'); };
  img.src = url;
}
function snsSetPhoto(img) {
  photoState.img = img;
  photoState.scale = 1; photoState.x = 0; photoState.y = 0;
  const tools = $('#sns-photo-tools'); if (tools) tools.classList.remove('hidden');
  const clr = $('#btn-sns-photo-clear'); if (clr) clr.classList.remove('hidden');
  const z = $('#sns-zoom'); if (z) z.value = 100;
  snsUpdateDragMode();
  renderSnsCanvas();
}
function snsClearPhoto() {
  photoState.img = null;
  const tools = $('#sns-photo-tools'); if (tools) tools.classList.add('hidden');
  const clr = $('#btn-sns-photo-clear'); if (clr) clr.classList.add('hidden');
  const inp = $('#sns-photo-input'); if (inp) inp.value = '';
  snsUpdateDragMode();
  renderSnsCanvas();
}
// 1080×1080キャンバスへcoverクロップ描画（縦写真・横写真対応）
function snsPaintPhoto(ctx) {
  const img = photoState.img; if (!img) return;
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const base = Math.max(1080 / iw, 1080 / ih);
  const s = base * photoState.scale;
  const dw = iw * s, dh = ih * s;
  const maxX = (dw - 1080) / 2, maxY = (dh - 1080) / 2;
  photoState.x = Math.max(-maxX, Math.min(maxX, photoState.x));
  photoState.y = Math.max(-maxY, Math.min(maxY, photoState.y));
  const dx = (1080 - dw) / 2 + photoState.x;
  const dy = (1080 - dh) / 2 + photoState.y;
  ctx.clearRect(0, 0, 1080, 1080);
  ctx.drawImage(img, dx, dy, dw, dh);
}
function snsDrawPhoto(root) {
  const scope = root || $('#sns-canvas');
  if (!scope || !photoState.img) return;
  $$('.sns-photo-cv', scope).forEach(cv => snsPaintPhoto(cv.getContext('2d')));
}

// ------------------------------------------------------------
// プレビュー描画
// ------------------------------------------------------------
function snsBuildHtml() {
  const fn = SNS_TPL[snsData.templateId] || SNS_TPL.resultA;
  return fn(snsData);
}
function renderSnsCanvas() {
  const cv = $('#sns-canvas'); if (!cv) return;
  cv.className = 'sns-canvas tpl-' + snsData.templateId;
  cv.innerHTML = snsBuildHtml();
  snsDrawPhoto(cv);
}
function snsFitPreview() {
  const frame = $('#sns-preview-frame'), stage = $('#sns-stage');
  if (!frame || !stage) return;
  const w = frame.clientWidth || 1;
  stage.style.transform = `scale(${w / 1080})`;
}
function snsUpdateDragMode() {
  const frame = $('#sns-preview-frame'); if (!frame) return;
  frame.style.touchAction = photoState.img ? 'none' : 'auto';
}

// ------------------------------------------------------------
// ドラッグ＆ピンチで写真位置・ズーム調整
// ------------------------------------------------------------
function snsBindDrag() {
  const frame = $('#sns-preview-frame'); if (!frame) return;
  const pointers = new Map();
  let pinchStart = null;

  frame.addEventListener('pointerdown', e => {
    if (!photoState.img) return;
    frame.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchStart = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale: photoState.scale };
    }
    e.preventDefault();
  });
  frame.addEventListener('pointermove', e => {
    if (!photoState.img || !pointers.has(e.pointerId)) return;
    const prev = pointers.get(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pvScale = (frame.clientWidth || 1080) / 1080;

    if (pointers.size === 1) {
      photoState.x += (e.clientX - prev.x) / pvScale;
      photoState.y += (e.clientY - prev.y) / pvScale;
      snsDrawPhoto();
    } else if (pointers.size === 2 && pinchStart) {
      const [a, b] = [...pointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      photoState.scale = Math.max(1, Math.min(3, pinchStart.scale * dist / pinchStart.dist));
      const z = $('#sns-zoom'); if (z) z.value = Math.round(photoState.scale * 100);
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

// ------------------------------------------------------------
// テンプレート選択UI
// ------------------------------------------------------------
function snsRenderTemplateRow() {
  const row = $('#sns-template-row'); if (!row) return;
  row.innerHTML = '';
  SNS_TEMPLATES.filter(t => t.kind === snsData.kind).forEach(t => {
    const card = el('button', 'sns-tpl-card' + (t.id === snsData.templateId ? ' active' : ''));
    card.innerHTML = `
      <div class="sns-tpl-thumb thumb-${t.id}"></div>
      <div class="sns-tpl-name">${esc(t.name)}</div>
      <div class="sns-tpl-desc">${esc(t.desc)}</div>`;
    card.onclick = () => { snsData.templateId = t.id; snsRenderTemplateRow(); renderSnsCanvas(); };
    row.appendChild(card);
  });
}
function snsApplyKind(kind) {
  snsData.kind = kind;
  const cur = SNS_TEMPLATES.find(t => t.id === snsData.templateId);
  if (!cur || cur.kind !== kind) {
    snsData.templateId = (SNS_TEMPLATES.find(t => t.kind === kind) || {}).id || 'resultA';
  }
  $$('.sns-kind-btn').forEach(b => b.classList.toggle('active', b.dataset.kind === kind));
  $$('.sns-f-result').forEach(n => n.classList.toggle('hidden', kind !== 'result'));
  $$('.sns-f-notice').forEach(n => n.classList.toggle('hidden', kind !== 'notice'));
  snsRenderTemplateRow();
  renderSnsCanvas();
}

// ------------------------------------------------------------
// フォーム ⇔ データ同期
// ------------------------------------------------------------
const SNS_FIELDS = [
  ['sns-competition', 'competition'], ['sns-opponent', 'opponent'],
  ['sns-myscore', 'myScore'], ['sns-oppscore', 'oppScore'],
  ['sns-scorers', 'scorers'], ['sns-date', 'date'],
  ['sns-time', 'time'], ['sns-venue', 'venue'], ['sns-club', 'club'],
];
function snsSyncFields() {
  SNS_FIELDS.forEach(([id, key]) => {
    const n = $('#' + id);
    if (n) n.value = snsData[key] ?? '';
  });
}
function snsBindFields() {
  SNS_FIELDS.forEach(([id, key]) => {
    const n = $('#' + id); if (!n) return;
    n.addEventListener('input', () => {
      snsData[key] = n.value;
      if (key === 'club') localStorage.setItem('mp_sns_club', n.value);
      renderSnsCanvas();
    });
  });
}

// ------------------------------------------------------------
// 画面表示
// ------------------------------------------------------------
function renderSns() {
  showScreen('sns');
  snsApplyKind(snsData.kind);
  snsSyncFields();
  renderSnsCanvas();
  requestAnimationFrame(snsFitPreview);
}

// 試合データからの自動入力（再入力不要）
function openSnsFromMatch(m) {
  if (!m) { renderSns(); return; }
  const r = m.result || {};
  const hasResult = r.myScore !== undefined && r.myScore !== null;
  snsData.kind       = hasResult ? 'result' : 'notice';
  snsData.templateId = hasResult ? 'resultA' : 'noticeA';
  snsData.competition = m.competitionName || m.type || '';
  snsData.opponent    = m.opponent || '';
  snsData.date        = m.date || '';
  snsData.venue       = m.venue || '';
  if (hasResult) {
    snsData.myScore  = r.myScore;
    snsData.oppScore = r.oppScore ?? '';
    // 得点者を「名前 2点」形式で1行ずつ
    const count = {};
    (r.goals || []).forEach(g => { if (g.scorer) count[g.scorer] = (count[g.scorer] || 0) + 1; });
    snsData.scorers = Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .map(([name, c]) => c > 1 ? `${name} ${c}点` : name)
      .join('\n');
  }
  snsOrigin = 'match';
  renderSns();
}

// ------------------------------------------------------------
// PNG書き出し（html2canvas / 1080×1080 高画質）
// ------------------------------------------------------------
async function snsExport() {
  if (typeof html2canvas === 'undefined') {
    showToast('⚠️ 画像ライブラリの読み込みに失敗しました。通信環境をご確認ください');
    return;
  }
  const btn = $('#btn-sns-save');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ 画像を生成中...'; }
  try {
    // 実寸1080pxの書き出し専用ノードを画面外に生成
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

    // Instagram投稿/ダウンロード用：フル解像度PNG（1080）
    const dataUrl = canvas.toDataURL('image/png');

    // 記事サムネイル用：軽量化した正方形JSON圧縮版（ニュースBINに保存するため）
    const thumb = snsMakeThumb(canvas);
    lastSnsThumb = thumb;
    try { localStorage.setItem('mp_sns_last_thumb', thumb); } catch (e) {}

    const f = snsFmtDate(snsData.date);
    const kindLabel = snsData.kind === 'result' ? '結果' : '告知';
    const fname = `GRANDE_${kindLabel}_vs${(snsData.opponent || '').replace(/\s/g, '')}_${(f.ymd || 'image').replace(/\./g, '-')}.png`;

    const imgEl = $('#sns-export-img');
    const dlEl  = $('#sns-export-dl');
    if (imgEl) imgEl.src = dataUrl;
    if (dlEl) { dlEl.href = dataUrl; dlEl.download = fname; }
    snsUpdateThumbBtnState();
    const ov = $('#sns-export-overlay'); if (ov) ov.classList.add('open');
    showToast('✅ 画像を生成しました');
  } catch (e) {
    console.error('SNS export error:', e);
    showToast('⚠️ 画像の生成に失敗しました');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '💾 画像を保存（1080×1080 PNG）'; }
  }
}

// ------------------------------------------------------------
// 記事サムネイル連携
//   生成画像を圧縮(JPEG)してニュース記事の image フィールドに保存する。
//   ・試合結果 → match.result.snsThumb に保存 → buildNewsPost が image に採用
//   ・手動投稿 → #post-image に流し込み → buildManualPost が image に採用
//   どちらも同じ GRANDE ニュースBIN の image を更新するため、
//   Instagram / ニュース一覧 / 記事詳細 / トップページ最新情報で共通の画像になる。
// ------------------------------------------------------------
let lastSnsThumb = (function () {
  try { return localStorage.getItem('mp_sns_last_thumb') || ''; } catch (e) { return ''; }
})();

// キャンバスを正方形に縮小＋JPEG圧縮（BINに収まる軽量サイズに）
function snsMakeThumb(srcCanvas) {
  const SIZE = 900; // サムネ解像度（一覧表示には十分・容量を抑える）
  const c = document.createElement('canvas');
  c.width = SIZE; c.height = SIZE;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0c1430';
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.drawImage(srcCanvas, 0, 0, SIZE, SIZE);
  return c.toDataURL('image/jpeg', 0.82);
}

function snsUpdateThumbBtnState() {
  const btn = $('#btn-sns-set-thumb');
  if (!btn) return;
  const isMatch = (snsOrigin === 'match' && currentMatch);
  const already = isMatch
    ? (currentMatch.result && currentMatch.result.snsThumb === lastSnsThumb && !!lastSnsThumb)
    : false;
  if (already) {
    btn.textContent = '✅ 記事サムネイルに設定済み';
    btn.classList.add('is-set');
  } else {
    btn.textContent = '📰 この画像を記事サムネイルに設定';
    btn.classList.remove('is-set');
  }
  const note = $('#sns-thumb-note');
  if (note) {
    note.innerHTML = isMatch
      ? 'この試合のサムネイルになります。「HP用」タブ →「GRANDEに送信」で<br>ニュース一覧・記事詳細・トップページに反映されます。'
      : '「最新情報を投稿」画面の<strong>「🖼 直近のSNS画像を使う」</strong>ボタンで<br>記事サムネイルとして使えます。';
  }
}

function snsSetThumb() {
  if (!lastSnsThumb) { showToast('⚠️ 先に画像を生成してください'); return; }
  if (snsOrigin === 'match' && currentMatch) {
    if (!currentMatch.result) currentMatch.result = {};
    currentMatch.result.snsThumb = lastSnsThumb;
    saveCurrentMatch();
    snsUpdateThumbBtnState();
    showToast('✅ この試合の記事サムネイルに設定しました');
  } else {
    const pImg = $('#post-image');
    if (pImg && !$('#screen-post').classList.contains('hidden')) {
      pImg.value = lastSnsThumb;
      showToast('✅ 投稿フォームのサムネイルに設定しました');
    } else {
      showToast('✅ サムネイルを保存しました（投稿画面で「SNS画像を使う」）');
    }
    snsUpdateThumbBtnState();
  }
}

// ------------------------------------------------------------
// 既存画面へのフック（関数ラップのみ・既存処理はそのまま実行）
// ------------------------------------------------------------

// 「結果」タブ末尾に SNS画像作成ボタンを追加
const _snsOrigRenderResult = renderResult;
renderResult = function () {
  _snsOrigRenderResult.apply(this, arguments);
  try {
    const body = $('#result-body');
    if (!body || !currentMatch || $('#btn-result-sns')) return;
    const div = el('div', 'sns-result-cta');
    div.innerHTML = `
      <button id="btn-result-sns" class="btn-sns-make">📸 この試合のSNS画像を作成</button>
      <div class="sns-result-cta-note">結果を保存してから押すと、スコア・得点者・日付が自動入力されます</div>`;
    body.appendChild(div);
    $('#btn-result-sns').onclick = () => openSnsFromMatch(currentMatch);
  } catch (e) { console.error('SNS CTA(result) error:', e); }
};

// 「HP用」タブ末尾に SNS画像作成セクションを追加（HP更新とSNS作成を同時導線に）
const _snsOrigRenderHpView = renderHpView;
renderHpView = function () {
  _snsOrigRenderHpView.apply(this, arguments);
  try {
    const body = $('#hp-body');
    if (!body || !currentMatch || $('#btn-hp-sns')) return;
    const r = currentMatch.result;
    if (!r || r.myScore === undefined) return;
    const wrap = el('div', 'hp-section');
    wrap.innerHTML = `
      <div class="hp-section-title">SNS投稿画像</div>
      <div class="hp-send-desc">この試合結果からInstagram投稿用画像（1080×1080）を作成します。スコア・得点者は自動入力されます。</div>
      <button id="btn-hp-sns" class="btn-sns-make">📸 SNS画像を作成</button>`;
    body.appendChild(wrap);
    $('#btn-hp-sns').onclick = () => openSnsFromMatch(currentMatch);
  } catch (e) { console.error('SNS CTA(hp) error:', e); }
};

// 試合結果→ニュース変換時、SNSサムネがあれば image に採用（既存ロジックは保持）
const _snsOrigBuildNewsPost = buildNewsPost;
buildNewsPost = function (match) {
  const post = _snsOrigBuildNewsPost.apply(this, arguments);
  try {
    const thumb = match && match.result && match.result.snsThumb;
    if (thumb) post.image = thumb;
  } catch (e) { console.error('SNS buildNewsPost hook error:', e); }
  return post;
};

// convertImageUrl: データURL（生成画像）はそのまま通す（既存変換は不変）
const _snsOrigConvertImageUrl = convertImageUrl;
convertImageUrl = function (url) {
  if (typeof url === 'string' && url.indexOf('data:') === 0) return url;
  return _snsOrigConvertImageUrl.apply(this, arguments);
};

// 手動投稿フォームに「直近のSNS画像を使う」ボタンを追加
const _snsOrigRenderPost = renderPost;
renderPost = function () {
  _snsOrigRenderPost.apply(this, arguments);
  try {
    const imgInput = $('#post-image');
    if (!imgInput || $('#btn-post-use-sns')) return;
    const group = imgInput.closest('.form-group') || imgInput.parentElement;
    const bar = el('div', 'sns-postimg-bar');
    bar.innerHTML = `
      <button id="btn-post-use-sns" class="btn-secondary" style="flex:1">🖼 直近のSNS画像を使う</button>
      <button id="btn-post-make-sns" class="btn-secondary" style="flex:1">📸 SNS画像を作成</button>`;
    group.appendChild(bar);
    $('#btn-post-use-sns').onclick = () => {
      if (!lastSnsThumb) {
        showToast('まず「SNS画像作成」で画像を作ってください');
        snsOrigin = 'home'; renderSns(); return;
      }
      imgInput.value = lastSnsThumb;
      showToast('✅ SNS画像をサムネイルに設定しました');
      const pv = $('#post-preview');
      if (pv && !pv.classList.contains('hidden') && typeof previewPost === 'function') previewPost();
    };
    $('#btn-post-make-sns').onclick = () => { snsOrigin = 'home'; renderSns(); };
  } catch (e) { console.error('SNS renderPost hook error:', e); }
};

// ------------------------------------------------------------
// 初期化
// ------------------------------------------------------------
function initSns() {
  if (!$('#screen-sns')) return;

  const home = $('#btn-sns');
  if (home) home.onclick = () => { snsOrigin = 'home'; renderSns(); };

  const back = $('#btn-back-sns');
  if (back) back.onclick = () => {
    if (snsOrigin === 'match' && currentMatch) showScreen('match');
    else renderHome();
  };

  $$('.sns-kind-btn').forEach(b => { b.onclick = () => snsApplyKind(b.dataset.kind); });

  const photoBtn = $('#btn-sns-photo');
  const photoInp = $('#sns-photo-input');
  if (photoBtn && photoInp) {
    photoBtn.onclick = () => photoInp.click();
    photoInp.addEventListener('change', () => snsLoadPhotoFile(photoInp.files && photoInp.files[0]));
  }
  const clr = $('#btn-sns-photo-clear');
  if (clr) clr.onclick = snsClearPhoto;

  const zoom = $('#sns-zoom');
  if (zoom) zoom.addEventListener('input', () => {
    photoState.scale = Math.max(1, Math.min(3, Number(zoom.value) / 100));
    snsDrawPhoto();
  });

  const save = $('#btn-sns-save');
  if (save) save.onclick = snsExport;

  const exClose = $('#btn-sns-export-close');
  if (exClose) exClose.onclick = () => $('#sns-export-overlay').classList.remove('open');
  const exOv = $('#sns-export-overlay');
  if (exOv) exOv.addEventListener('click', e => { if (e.target === exOv) exOv.classList.remove('open'); });

  const setThumb = $('#btn-sns-set-thumb');
  if (setThumb) setThumb.onclick = snsSetThumb;

  snsBindFields();
  snsBindDrag();
  window.addEventListener('resize', snsFitPreview);
  snsRenderTemplateRow();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSns);
} else {
  initSns();
}

})(); // ★ SNS IMAGE MAKER end
