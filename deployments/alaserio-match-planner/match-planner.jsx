import { useState, useEffect, useRef, useCallback } from "react";

// ========== CONSTANTS ==========
const FORMATIONS = {
  "4-3-3": {
    label: "4-3-3",
    positions: [
      { id: "GK", label: "GK", row: 0, col: 2 },
      { id: "RB", label: "RB", row: 1, col: 3 },
      { id: "CB2", label: "CB", row: 1, col: 2.3 },
      { id: "CB1", label: "CB", row: 1, col: 1.7 },
      { id: "LB", label: "LB", row: 1, col: 1 },
      { id: "RCM", label: "CM", row: 2, col: 3 },
      { id: "CM", label: "CM", row: 2, col: 2 },
      { id: "LCM", label: "CM", row: 2, col: 1 },
      { id: "RW", label: "RW", row: 3, col: 3.2 },
      { id: "CF", label: "CF", row: 3, col: 2 },
      { id: "LW", label: "LW", row: 3, col: 0.8 },
    ],
  },
  "4-4-2": {
    label: "4-4-2",
    positions: [
      { id: "GK", label: "GK", row: 0, col: 2 },
      { id: "RB", label: "RB", row: 1, col: 3.2 },
      { id: "CB2", label: "CB", row: 1, col: 2.3 },
      { id: "CB1", label: "CB", row: 1, col: 1.7 },
      { id: "LB", label: "LB", row: 1, col: 0.8 },
      { id: "RM", label: "RM", row: 2, col: 3.2 },
      { id: "RCM", label: "CM", row: 2, col: 2.3 },
      { id: "LCM", label: "CM", row: 2, col: 1.7 },
      { id: "LM", label: "LM", row: 2, col: 0.8 },
      { id: "RS", label: "ST", row: 3, col: 2.5 },
      { id: "LS", label: "ST", row: 3, col: 1.5 },
    ],
  },
  "4-2-3-1": {
    label: "4-2-3-1",
    positions: [
      { id: "GK", label: "GK", row: 0, col: 2 },
      { id: "RB", label: "RB", row: 1, col: 3.2 },
      { id: "CB2", label: "CB", row: 1, col: 2.3 },
      { id: "CB1", label: "CB", row: 1, col: 1.7 },
      { id: "LB", label: "LB", row: 1, col: 0.8 },
      { id: "RDM", label: "DM", row: 2, col: 2.5 },
      { id: "LDM", label: "DM", row: 2, col: 1.5 },
      { id: "RW", label: "RW", row: 3, col: 3.2 },
      { id: "CAM", label: "AM", row: 3, col: 2 },
      { id: "LW", label: "LW", row: 3, col: 0.8 },
      { id: "CF", label: "CF", row: 4, col: 2 },
    ],
  },
  "3-5-2": {
    label: "3-5-2",
    positions: [
      { id: "GK", label: "GK", row: 0, col: 2 },
      { id: "RCB", label: "CB", row: 1, col: 3 },
      { id: "CB", label: "CB", row: 1, col: 2 },
      { id: "LCB", label: "CB", row: 1, col: 1 },
      { id: "RWB", label: "WB", row: 2, col: 3.5 },
      { id: "RCM", label: "CM", row: 2, col: 2.7 },
      { id: "CM", label: "CM", row: 2, col: 2 },
      { id: "LCM", label: "CM", row: 2, col: 1.3 },
      { id: "LWB", label: "WB", row: 2, col: 0.5 },
      { id: "RS", label: "ST", row: 3, col: 2.5 },
      { id: "LS", label: "ST", row: 3, col: 1.5 },
    ],
  },
  "3-4-3": {
    label: "3-4-3",
    positions: [
      { id: "GK", label: "GK", row: 0, col: 2 },
      { id: "RCB", label: "CB", row: 1, col: 3 },
      { id: "CB", label: "CB", row: 1, col: 2 },
      { id: "LCB", label: "CB", row: 1, col: 1 },
      { id: "RM", label: "MF", row: 2, col: 3 },
      { id: "RCM", label: "CM", row: 2, col: 2.3 },
      { id: "LCM", label: "CM", row: 2, col: 1.7 },
      { id: "LM", label: "MF", row: 2, col: 1 },
      { id: "RW", label: "RW", row: 3, col: 3.2 },
      { id: "CF", label: "CF", row: 3, col: 2 },
      { id: "LW", label: "LW", row: 3, col: 0.8 },
    ],
  },
};

const GRADES = ["1年", "2年", "3年", "4年", "5年", "6年", "中1", "中2", "中3", "高1", "高2", "高3"];
const POSITIONS_LIST = ["GK", "CB", "RB", "LB", "DM", "CM", "AM", "RM", "LM", "RW", "LW", "CF", "ST", "WB"];
const MATCH_TYPES = ["公式戦", "練習試合", "フェスティバル", "合宿"];

const STORAGE_KEYS = {
  players: "matchplanner_players",
  matches: "matchplanner_matches",
};

function useStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch { return initial; }
  });
  const set = useCallback((v) => {
    setValue(prev => {
      const next = typeof v === "function" ? v(prev) : v;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);
  return [value, set];
}

// ========== ICONS ==========
const Icon = ({ name, size = 20 }) => {
  const icons = {
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
    back: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    soccer: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 6.9 17.1M12 2a10 10 0 0 0-6.9 17.1M12 22v-4M4.93 4.93l2.83 2.83M19.07 4.93l-2.83 2.83"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    copy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
    swap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    time: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    list: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  };
  return icons[name] || null;
};

// ========== MAIN APP ==========
export default function App() {
  const [players, setPlayers] = useStorage(STORAGE_KEYS.players, []);
  const [matches, setMatches] = useStorage(STORAGE_KEYS.matches, []);
  const [view, setView] = useState("home"); // home | players | newMatch | match | history
  const [currentMatch, setCurrentMatch] = useState(null);
  const [activeTab, setActiveTab] = useState("board");

  const openMatch = (match) => { setCurrentMatch(match); setView("match"); setActiveTab("board"); };
  const saveMatch = (match) => {
    setMatches(prev => {
      const idx = prev.findIndex(m => m.id === match.id);
      if (idx >= 0) { const n = [...prev]; n[idx] = match; return n; }
      return [match, ...prev];
    });
    setCurrentMatch(match);
  };

  return (
    <div style={S.app}>
      {view === "home" && <HomeView setView={setView} matches={matches} openMatch={openMatch} players={players} />}
      {view === "players" && <PlayersView players={players} setPlayers={setPlayers} setView={setView} />}
      {view === "newMatch" && <NewMatchView setView={setView} matches={matches} saveMatch={saveMatch} openMatch={openMatch} />}
      {view === "match" && currentMatch && (
        <MatchView match={currentMatch} players={players} saveMatch={saveMatch} setView={setView} activeTab={activeTab} setActiveTab={setActiveTab} matches={matches} />
      )}
      {view === "history" && <HistoryView matches={matches} setMatches={setMatches} openMatch={openMatch} setView={setView} />}
    </div>
  );
}

// ========== HOME ==========
function HomeView({ setView, matches, openMatch, players }) {
  const recent = matches.slice(0, 3);
  return (
    <div style={S.screen}>
      <div style={S.homeHeader}>
        <div style={S.logoArea}>
          <div style={S.logoIcon}>⚽</div>
          <div>
            <div style={S.logoTitle}>Match Planner</div>
            <div style={S.logoSub}>サッカー指導者向け配置管理</div>
          </div>
        </div>
      </div>
      <div style={S.homeBody}>
        <button style={S.primaryBtn} onClick={() => setView("newMatch")}>
          <Icon name="plus" size={18} /> 新しい試合を作成
        </button>
        <div style={S.quickGrid}>
          <button style={S.quickBtn} onClick={() => setView("players")}>
            <Icon name="user" size={22} />
            <span>選手管理</span>
            <span style={S.quickCount}>{players.length}名</span>
          </button>
          <button style={S.quickBtn} onClick={() => setView("history")}>
            <Icon name="calendar" size={22} />
            <span>試合履歴</span>
            <span style={S.quickCount}>{matches.length}試合</span>
          </button>
        </div>
        {recent.length > 0 && (
          <div style={S.section}>
            <div style={S.sectionLabel}>最近の試合</div>
            {recent.map(m => (
              <button key={m.id} style={S.matchCard} onClick={() => openMatch(m)}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ ...S.typeBadge, background: TYPE_COLOR[m.type] }}>{m.type}</div>
                  <div>
                    <div style={S.matchCardTitle}>{m.name}</div>
                    <div style={S.matchCardSub}>vs {m.opponent} · {m.date}</div>
                  </div>
                </div>
                <Icon name="arrow" size={18} />
              </button>
            ))}
          </div>
        )}
        {players.length === 0 && (
          <div style={S.emptyHint}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>👋</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>まずは選手を登録しましょう</div>
            <div style={{ color: "#94a3b8", fontSize: 13 }}>上の「選手管理」から選手を追加できます</div>
          </div>
        )}
      </div>
    </div>
  );
}

const TYPE_COLOR = { "公式戦": "#ef4444", "練習試合": "#3b82f6", "フェスティバル": "#f59e0b", "合宿": "#10b981" };

// ========== PLAYERS ==========
function PlayersView({ players, setPlayers, setView }) {
  const [form, setForm] = useState({ name: "", grade: "中1", number: "", main: "CF", sub: "" });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const save = () => {
    if (!form.name.trim()) return;
    if (editing !== null) {
      setPlayers(prev => prev.map((p, i) => i === editing ? { ...p, ...form } : p));
      setEditing(null);
    } else {
      setPlayers(prev => [...prev, { id: Date.now().toString(), ...form }]);
    }
    setForm({ name: "", grade: "中1", number: "", main: "CF", sub: "" });
    setShowForm(false);
  };

  const del = (id) => setPlayers(prev => prev.filter(p => p.id !== id));
  const edit = (p, i) => { setForm({ name: p.name, grade: p.grade, number: p.number, main: p.main, sub: p.sub || "" }); setEditing(i); setShowForm(true); };

  return (
    <div style={S.screen}>
      <Header title="選手管理" onBack={() => setView("home")} action={<button style={S.iconBtn} onClick={() => { setShowForm(true); setEditing(null); setForm({ name: "", grade: "中1", number: "", main: "CF", sub: "" }); }}><Icon name="plus" size={20} /></button>} />
      <div style={S.body}>
        {showForm && (
          <div style={S.formCard}>
            <div style={S.formTitle}>{editing !== null ? "選手を編集" : "選手を追加"}</div>
            <div style={S.formRow}>
              <div style={S.formGroup}>
                <label style={S.label}>選手名 *</label>
                <input style={S.input} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="例: 山田 太郎" />
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>背番号</label>
                <input style={S.input} type="number" value={form.number} onChange={e => setForm(p => ({ ...p, number: e.target.value }))} placeholder="10" />
              </div>
            </div>
            <div style={S.formRow}>
              <div style={S.formGroup}>
                <label style={S.label}>学年</label>
                <select style={S.input} value={form.grade} onChange={e => setForm(p => ({ ...p, grade: e.target.value }))}>
                  {GRADES.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>メインポジション</label>
                <select style={S.input} value={form.main} onChange={e => setForm(p => ({ ...p, main: e.target.value }))}>
                  {POSITIONS_LIST.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>サブポジション</label>
              <input style={S.input} value={form.sub} onChange={e => setForm(p => ({ ...p, sub: e.target.value }))} placeholder="例: CB, RB" />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button style={S.secondaryBtn} onClick={() => { setShowForm(false); setEditing(null); }}>キャンセル</button>
              <button style={S.primaryBtnSm} onClick={save}><Icon name="check" size={16} /> 保存</button>
            </div>
          </div>
        )}
        {players.length === 0 ? (
          <div style={S.emptyHint}><div style={{ fontSize: 40 }}>👤</div><div style={{ marginTop: 8 }}>選手がいません</div></div>
        ) : (
          <div style={S.playerList}>
            {players.map((p, i) => (
              <div key={p.id} style={S.playerRow}>
                <div style={S.playerNum}>{p.number || "—"}</div>
                <div style={S.playerInfo}>
                  <div style={S.playerName}>{p.name}</div>
                  <div style={S.playerMeta}>{p.grade} · <span style={S.posTag}>{p.main}</span>{p.sub && <span style={{ ...S.posTag, background: "#1e293b", color: "#94a3b8" }}>{p.sub}</span>}</div>
                </div>
                <button style={S.ghostBtn} onClick={() => edit(p, i)}><Icon name="edit" size={16} /></button>
                <button style={{ ...S.ghostBtn, color: "#ef4444" }} onClick={() => del(p.id)}><Icon name="trash" size={16} /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ========== NEW MATCH ==========
function NewMatchView({ setView, matches, saveMatch, openMatch }) {
  const [form, setForm] = useState({ name: "", opponent: "", date: new Date().toISOString().slice(0, 10), venue: "", category: "", type: "練習試合", formation: "4-3-3" });
  const [copyFrom, setCopyFrom] = useState("");

  const create = () => {
    if (!form.opponent.trim()) return;
    const base = copyFrom ? matches.find(m => m.id === copyFrom) : null;
    const match = {
      id: Date.now().toString(),
      ...form,
      name: form.name || `vs ${form.opponent}`,
      lineup: base ? { ...base.lineup } : {},
      bench: base ? [...(base.bench || [])] : [],
      subs: base ? [...(base.subs || [])] : [],
    };
    saveMatch(match);
    openMatch(match);
  };

  return (
    <div style={S.screen}>
      <Header title="試合を作成" onBack={() => setView("home")} />
      <div style={S.body}>
        <div style={S.formCard}>
          <div style={S.formGroup}>
            <label style={S.label}>対戦相手 *</label>
            <input style={S.input} value={form.opponent} onChange={e => setForm(p => ({ ...p, opponent: e.target.value }))} placeholder="例: ○○FC" />
          </div>
          <div style={S.formRow}>
            <div style={S.formGroup}>
              <label style={S.label}>日付</label>
              <input style={S.input} type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>試合種別</label>
              <select style={S.input} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                {MATCH_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={S.formRow}>
            <div style={S.formGroup}>
              <label style={S.label}>会場</label>
              <input style={S.input} value={form.venue} onChange={e => setForm(p => ({ ...p, venue: e.target.value }))} placeholder="例: 市営グラウンド" />
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>カテゴリー</label>
              <input style={S.input} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="例: U15リーグ" />
            </div>
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>試合名（省略可）</label>
            <input style={S.input} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder={`vs ${form.opponent || "○○FC"}`} />
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>フォーメーション</label>
            <div style={S.formGrid}>
              {Object.keys(FORMATIONS).map(f => (
                <button key={f} style={{ ...S.fmBtn, ...(form.formation === f ? S.fmBtnActive : {}) }} onClick={() => setForm(p => ({ ...p, formation: f }))}>{f}</button>
              ))}
            </div>
          </div>
          {matches.length > 0 && (
            <div style={S.formGroup}>
              <label style={S.label}><Icon name="copy" size={14} /> 前回の配置をコピー（任意）</label>
              <select style={S.input} value={copyFrom} onChange={e => setCopyFrom(e.target.value)}>
                <option value="">コピーしない</option>
                {matches.map(m => <option key={m.id} value={m.id}>{m.name} ({m.date})</option>)}
              </select>
            </div>
          )}
        </div>
        <button style={{ ...S.primaryBtn, marginTop: 8 }} onClick={create}>
          <Icon name="soccer" size={18} /> 試合を作成して配置開始
        </button>
      </div>
    </div>
  );
}

// ========== MATCH VIEW ==========
function MatchView({ match, players, saveMatch, setView, activeTab, setActiveTab, matches }) {
  const update = (field, val) => saveMatch({ ...match, [field]: val });

  const tabs = match.type === "公式戦"
    ? [{ id: "board", label: "配置", icon: "soccer" }, { id: "subs", label: "交代", icon: "swap" }, { id: "bench", label: "ベンチ", icon: "list" }]
    : [{ id: "board", label: "配置", icon: "soccer" }, { id: "subs", label: "交代", icon: "swap" }, { id: "bench", label: "ベンチ", icon: "list" }, { id: "time", label: "出場時間", icon: "time" }];

  return (
    <div style={S.screen}>
      <Header
        title={match.name}
        onBack={() => setView("home")}
        sub={<span style={{ ...S.typeBadge, background: TYPE_COLOR[match.type] }}>{match.type}</span>}
      />
      <div style={S.matchMeta}>
        <span>vs {match.opponent}</span>
        <span>·</span>
        <span>{match.date}</span>
        {match.venue && <><span>·</span><span>{match.venue}</span></>}
      </div>
      <div style={S.tabBar}>
        {tabs.map(t => (
          <button key={t.id} style={{ ...S.tab, ...(activeTab === t.id ? S.tabActive : {}) }} onClick={() => setActiveTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={S.tabBody}>
        {activeTab === "board" && <BoardTab match={match} players={players} update={update} />}
        {activeTab === "bench" && <BenchTab match={match} players={players} update={update} />}
        {activeTab === "subs" && <SubsTab match={match} players={players} update={update} />}
        {activeTab === "time" && <TimeTab match={match} players={players} />}
      </div>
    </div>
  );
}

// ========== BOARD TAB ==========
// 2-panel layout: pitch (top/left) + player list (bottom/right) always visible
function BoardTab({ match, players, update }) {
  const formation = FORMATIONS[match.formation] || FORMATIONS["4-3-3"];
  const [selectedPos, setSelectedPos] = useState(null); // posId waiting for player
  const [dragFromPos, setDragFromPos] = useState(null); // drag between positions
  const [dragFromPlayer, setDragFromPlayer] = useState(null); // drag from player list

  const lineup = match.lineup || {};
  const assignedIds = Object.values(lineup).filter(Boolean).map(p => p.id);

  // Assign player to position
  const assign = (posId, player) => {
    const newLineup = { ...lineup };
    // If player already in another pos, remove them first
    Object.keys(newLineup).forEach(k => { if (newLineup[k]?.id === player.id) delete newLineup[k]; });
    newLineup[posId] = player;
    update("lineup", newLineup);
    setSelectedPos(null);
  };

  // Remove player from position
  const clear = (posId) => {
    const newLineup = { ...lineup };
    delete newLineup[posId];
    update("lineup", newLineup);
    if (selectedPos === posId) setSelectedPos(null);
  };

  // Swap two positions
  const swapPos = (fromPosId, toPosId) => {
    if (fromPosId === toPosId) return;
    const newLineup = { ...lineup };
    const a = newLineup[fromPosId];
    const b = newLineup[toPosId];
    if (b) newLineup[fromPosId] = b; else delete newLineup[fromPosId];
    if (a) newLineup[toPosId] = a; else delete newLineup[toPosId];
    update("lineup", newLineup);
  };

  // Tap on position slot
  const handlePosTap = (posId) => {
    const player = lineup[posId];
    if (selectedPos && selectedPos !== posId) {
      // Move/swap: selectedPos → posId
      swapPos(selectedPos, posId);
      setSelectedPos(null);
      return;
    }
    if (player) {
      // Toggle select to move
      setSelectedPos(prev => prev === posId ? null : posId);
    } else {
      setSelectedPos(posId);
    }
  };

  // Tap on player in list
  const handlePlayerTap = (player) => {
    if (assignedIds.includes(player.id)) {
      // Already placed — find their pos and select it
      const pos = Object.keys(lineup).find(k => lineup[k]?.id === player.id);
      setSelectedPos(prev => prev === pos ? null : pos);
      return;
    }
    if (selectedPos) {
      assign(selectedPos, player);
    } else {
      // No pos selected → just highlight to prompt picking a pos
      setSelectedPos("__player__" + player.id);
    }
  };

  // Build pitch rows (attack at top)
  const rows = [];
  const maxRow = Math.max(...formation.positions.map(p => p.row));
  for (let r = maxRow; r >= 0; r--) {
    rows.push(formation.positions.filter(p => p.row === r));
  }

  const unassigned = players.filter(p => !assignedIds.includes(p.id));
  const assigned = players.filter(p => assignedIds.includes(p.id));
  const staメン = formation.positions.length;
  const placedCount = assignedIds.length;

  return (
    <div style={S.boardLayout}>
      {/* ===== PITCH PANEL ===== */}
      <div style={S.pitchPanel}>
        <div style={S.formationBadge}>
          <span style={S.formationBadgeText}>{match.formation}</span>
          <span style={S.placedCount}>{placedCount}/{staメン}</span>
        </div>
        <div style={S.pitch}>
          <div style={S.pitchLines} />
          {rows.map((rowPositions, ri) => (
            <div key={ri} style={S.pitchRow}>
              {rowPositions.map(pos => {
                const player = lineup[pos.id];
                const isSelected = selectedPos === pos.id;
                const isTarget = selectedPos && selectedPos !== pos.id && !selectedPos.startsWith("__");
                return (
                  <div key={pos.id} style={S.positionSlot}>
                    <button
                      style={{
                        ...S.posBtn,
                        ...(player ? S.posBtnFilled : {}),
                        ...(isSelected ? S.posBtnSelected : {}),
                        ...(isTarget && !player ? S.posBtnTarget : {}),
                        ...(isTarget && player ? S.posBtnSwap : {}),
                      }}
                      onClick={() => handlePosTap(pos.id)}
                    >
                      <div style={S.posLabel}>{pos.label}</div>
                      {player ? (
                        <div style={S.playerInPos}>
                          <div style={S.playerNumSmall}>{player.number || "—"}</div>
                          <div style={S.playerNameSmall}>{player.name.split(/\s/)[0]}</div>
                        </div>
                      ) : (
                        <div style={{ ...S.posEmpty, color: isTarget ? "#10b981" : "#374151" }}>
                          {isTarget ? "+" : "空"}
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {selectedPos && (
          <div style={S.selectionHint}>
            {selectedPos.startsWith("__") ? (
              <span>↑ポジションをタップして配置</span>
            ) : lineup[selectedPos] ? (
              <span>「{lineup[selectedPos].name}」を移動 → 別のポジションをタップ <button style={S.cancelSelBtn} onClick={() => setSelectedPos(null)}>✕</button></span>
            ) : (
              <span>↓選手をタップして配置 <button style={S.cancelSelBtn} onClick={() => setSelectedPos(null)}>✕</button></span>
            )}
          </div>
        )}
      </div>

      {/* ===== PLAYER PANEL ===== */}
      <div style={S.playerPanel}>
        <div style={S.playerPanelHeader}>
          <span style={S.playerPanelTitle}>選手一覧</span>
          <span style={S.playerPanelCount}>{unassigned.length}名未配置</span>
        </div>
        <div style={S.playerPanelList}>
          {players.length === 0 && (
            <div style={{ padding: "16px", textAlign: "center", color: "#475569", fontSize: 12 }}>選手を登録してください</div>
          )}
          {/* Unassigned */}
          {unassigned.map(p => {
            const isHighlighted = selectedPos === "__player__" + p.id;
            return (
              <button key={p.id} style={{ ...S.sidePlayerBtn, ...(isHighlighted ? S.sidePlayerBtnHL : {}) }} onClick={() => handlePlayerTap(p)}>
                <div style={S.sideNum}>{p.number || "—"}</div>
                <div style={S.sideInfo}>
                  <div style={S.sideName}>{p.name}</div>
                  <div style={S.sideMeta}><span style={S.posTagSm}>{p.main}</span></div>
                </div>
              </button>
            );
          })}
          {/* Divider if both exist */}
          {unassigned.length > 0 && assigned.length > 0 && (
            <div style={S.sideDiv}>スタメン</div>
          )}
          {/* Assigned (dimmed) */}
          {assigned.map(p => {
            const posId = Object.keys(lineup).find(k => lineup[k]?.id === p.id);
            const posLabel = formation.positions.find(pos => pos.id === posId)?.label || "—";
            const isSelected = selectedPos === posId;
            return (
              <button key={p.id} style={{ ...S.sidePlayerBtn, ...S.sidePlayerBtnAssigned, ...(isSelected ? S.sidePlayerBtnHL : {}) }} onClick={() => handlePlayerTap(p)}>
                <div style={{ ...S.sideNum, background: "#10b981", color: "#fff" }}>{p.number || "—"}</div>
                <div style={S.sideInfo}>
                  <div style={S.sideName}>{p.name}</div>
                  <div style={S.sideMeta}><span style={{ ...S.posTagSm, background: "#0d2820", color: "#10b981" }}>{posLabel}</span></div>
                </div>
                {isSelected && <span style={{ color: "#f59e0b", fontSize: 12 }}>移動中</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PlayerPicker({ posId, posLabel, players, assignedIds, currentPlayer, onSelect, onClose }) {
  const available = players.filter(p => !assignedIds.includes(p.id) || (currentPlayer && p.id === currentPlayer.id));
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.pickerSheet} onClick={e => e.stopPropagation()}>
        <div style={S.pickerHeader}>
          <div style={S.pickerTitle}>{posLabel} に配置</div>
          <button style={S.iconBtn} onClick={onClose}><Icon name="close" size={20} /></button>
        </div>
        <div style={S.pickerList}>
          {available.length === 0 ? (
            <div style={{ padding: "24px", textAlign: "center", color: "#64748b" }}>配置可能な選手がいません</div>
          ) : available.map(p => (
            <button key={p.id} style={{ ...S.pickerItem, ...(currentPlayer?.id === p.id ? S.pickerItemActive : {}) }} onClick={() => onSelect(p)}>
              <div style={S.playerNum}>{p.number || "—"}</div>
              <div>
                <div style={S.playerName}>{p.name}</div>
                <div style={S.playerMeta}>{p.grade} · <span style={S.posTag}>{p.main}</span>{p.sub && <span style={{ ...S.posTag, background: "#1e293b", color: "#94a3b8" }}> {p.sub}</span>}</div>
              </div>
              {currentPlayer?.id === p.id && <Icon name="check" size={18} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== BENCH TAB ==========
function BenchTab({ match, players, update }) {
  const bench = match.bench || [];
  const lineup = match.lineup || {};
  const lineupIds = Object.values(lineup).filter(Boolean).map(p => p.id);
  const benchIds = bench.map(p => p.id);

  const toggleBench = (player) => {
    if (benchIds.includes(player.id)) {
      update("bench", bench.filter(p => p.id !== player.id));
    } else {
      update("bench", [...bench, player]);
    }
  };

  const notAssigned = players.filter(p => !lineupIds.includes(p.id));

  return (
    <div style={{ padding: "0 0 20px" }}>
      <div style={S.sectionLabel} style={{ padding: "12px 16px 4px", fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>ベンチ入り選手 ({bench.length}名)</div>
      {bench.length > 0 && (
        <div style={S.playerList}>
          {bench.map(p => (
            <div key={p.id} style={{ ...S.playerRow, background: "#0f2a1a" }}>
              <div style={S.playerNum}>{p.number || "—"}</div>
              <div style={S.playerInfo}>
                <div style={S.playerName}>{p.name}</div>
                <div style={S.playerMeta}>{p.grade} · <span style={S.posTag}>{p.main}</span></div>
              </div>
              <button style={{ ...S.ghostBtn, color: "#ef4444" }} onClick={() => toggleBench(p)}><Icon name="close" size={16} /></button>
            </div>
          ))}
        </div>
      )}
      <div style={{ padding: "12px 16px 4px", fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>選手一覧（スタメン外）</div>
      <div style={S.playerList}>
        {notAssigned.map(p => (
          <div key={p.id} style={S.playerRow}>
            <div style={S.playerNum}>{p.number || "—"}</div>
            <div style={S.playerInfo}>
              <div style={S.playerName}>{p.name}</div>
              <div style={S.playerMeta}>{p.grade} · <span style={S.posTag}>{p.main}</span></div>
            </div>
            <button style={{ ...S.ghostBtn, color: benchIds.includes(p.id) ? "#ef4444" : "#10b981" }} onClick={() => toggleBench(p)}>
              {benchIds.includes(p.id) ? <Icon name="close" size={16} /> : <Icon name="plus" size={16} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== SUBS TAB ==========
function SubsTab({ match, players, update }) {
  const subs = match.subs || [];
  const [form, setForm] = useState({ minute: "", out: "", in: "" });
  const [showForm, setShowForm] = useState(false);

  const addSub = () => {
    if (!form.out || !form.in) return;
    update("subs", [...subs, { id: Date.now().toString(), ...form }]);
    setForm({ minute: "", out: "", in: "" });
    setShowForm(false);
  };

  const removeSub = (id) => update("subs", subs.filter(s => s.id !== id));

  const allPlayers = players;

  return (
    <div style={{ padding: "0 0 20px" }}>
      <div style={{ padding: "12px 16px" }}>
        <button style={S.primaryBtnSm} onClick={() => setShowForm(true)}><Icon name="plus" size={16} /> 交代を追加</button>
      </div>
      {showForm && (
        <div style={{ ...S.formCard, margin: "0 16px 12px" }}>
          <div style={S.formRow}>
            <div style={S.formGroup}>
              <label style={S.label}>時間（分）</label>
              <input style={S.input} type="number" value={form.minute} onChange={e => setForm(p => ({ ...p, minute: e.target.value }))} placeholder="45" />
            </div>
          </div>
          <div style={S.formRow}>
            <div style={S.formGroup}>
              <label style={S.label}>OUT（交代される選手）</label>
              <select style={S.input} value={form.out} onChange={e => setForm(p => ({ ...p, out: e.target.value }))}>
                <option value="">選択</option>
                {allPlayers.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>IN（入る選手）</label>
              <select style={S.input} value={form.in} onChange={e => setForm(p => ({ ...p, in: e.target.value }))}>
                <option value="">選択</option>
                {allPlayers.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={S.secondaryBtn} onClick={() => setShowForm(false)}>キャンセル</button>
            <button style={S.primaryBtnSm} onClick={addSub}><Icon name="check" size={16} /> 追加</button>
          </div>
        </div>
      )}
      {subs.length === 0 ? (
        <div style={S.emptyHint}><div style={{ fontSize: 32 }}>🔄</div><div style={{ marginTop: 8, color: "#64748b" }}>交代計画がありません</div></div>
      ) : (
        <div style={{ padding: "0 16px" }}>
          {subs.sort((a, b) => (parseInt(a.minute) || 0) - (parseInt(b.minute) || 0)).map(s => (
            <div key={s.id} style={S.subCard}>
              <div style={S.subMinute}>{s.minute ? `${s.minute}'` : "—"}</div>
              <div style={S.subDetail}>
                <div style={S.subOut}>▼ OUT {s.out}</div>
                <div style={S.subIn}>▲ IN {s.in}</div>
              </div>
              <button style={{ ...S.ghostBtn, color: "#ef4444" }} onClick={() => removeSub(s.id)}><Icon name="trash" size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ========== TIME TAB ==========
function TimeTab({ match, players }) {
  const lineup = match.lineup || {};
  const subs = match.subs || [];
  const totalMinutes = 80;

  const calcMinutes = (player) => {
    const isStarter = Object.values(lineup).some(p => p?.id === player.id);
    const outSub = subs.find(s => s.out === player.name);
    const inSub = subs.find(s => s.in === player.name);
    if (isStarter) {
      if (outSub) return parseInt(outSub.minute) || totalMinutes;
      return totalMinutes;
    }
    if (inSub) {
      if (outSub && parseInt(outSub.minute) > parseInt(inSub.minute)) return parseInt(outSub.minute) - parseInt(inSub.minute);
      return totalMinutes - (parseInt(inSub.minute) || 0);
    }
    return 0;
  };

  const listed = players.filter(p => {
    const mins = calcMinutes(p);
    return mins > 0;
  });

  return (
    <div style={{ padding: "0 0 20px" }}>
      <div style={{ padding: "12px 16px 4px", fontSize: 12, color: "#64748b" }}>試合時間 {totalMinutes}分換算</div>
      {listed.length === 0 ? (
        <div style={S.emptyHint}><div style={{ fontSize: 32 }}>⏱</div><div style={{ marginTop: 8, color: "#64748b" }}>配置を設定すると出場時間が表示されます</div></div>
      ) : listed.map(p => {
        const mins = calcMinutes(p);
        const pct = (mins / totalMinutes) * 100;
        return (
          <div key={p.id} style={{ padding: "10px 16px", borderBottom: "1px solid #1e293b" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontWeight: 600, color: "#e2e8f0" }}>{p.name}</span>
              <span style={{ color: "#10b981", fontWeight: 700 }}>{mins}分</span>
            </div>
            <div style={{ height: 6, background: "#1e293b", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: pct > 70 ? "#10b981" : pct > 40 ? "#f59e0b" : "#3b82f6", borderRadius: 3, transition: "width 0.3s" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ========== HISTORY ==========
function HistoryView({ matches, setMatches, openMatch, setView }) {
  const del = (id) => { if (confirm("この試合を削除しますか？")) setMatches(prev => prev.filter(m => m.id !== id)); };
  return (
    <div style={S.screen}>
      <Header title="試合履歴" onBack={() => setView("home")} />
      <div style={S.body}>
        {matches.length === 0 ? (
          <div style={S.emptyHint}><div style={{ fontSize: 40 }}>📋</div><div style={{ marginTop: 8, color: "#64748b" }}>試合がありません</div></div>
        ) : matches.map(m => (
          <div key={m.id} style={S.matchCard} onClick={() => openMatch(m)}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
              <div style={{ ...S.typeBadge, background: TYPE_COLOR[m.type] }}>{m.type}</div>
              <div style={{ flex: 1 }}>
                <div style={S.matchCardTitle}>{m.name}</div>
                <div style={S.matchCardSub}>{m.date}{m.venue ? ` · ${m.venue}` : ""}</div>
              </div>
            </div>
            <button style={{ ...S.ghostBtn, color: "#ef4444" }} onClick={e => { e.stopPropagation(); del(m.id); }}><Icon name="trash" size={16} /></button>
            <Icon name="arrow" size={18} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== SHARED COMPONENTS ==========
function Header({ title, onBack, action, sub }) {
  return (
    <div style={S.header}>
      <button style={S.backBtn} onClick={onBack}><Icon name="back" size={24} /></button>
      <div style={{ flex: 1 }}>
        <div style={S.headerTitle}>{title}</div>
        {sub && <div style={{ marginTop: 2 }}>{sub}</div>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ========== STYLES ==========
const S = {
  app: { minHeight: "100vh", background: "#0a0f1a", color: "#e2e8f0", fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif", maxWidth: 480, margin: "0 auto", position: "relative" },
  screen: { display: "flex", flexDirection: "column", minHeight: "100vh" },
  body: { flex: 1, overflow: "auto", padding: "12px 16px" },
  tabBody: { flex: 1, overflow: "auto" },

  // Home
  homeHeader: { background: "linear-gradient(135deg, #0d2137 0%, #0a1628 100%)", padding: "32px 20px 24px", borderBottom: "1px solid #1e3a5f" },
  logoArea: { display: "flex", alignItems: "center", gap: 14 },
  logoIcon: { width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 },
  logoTitle: { fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" },
  logoSub: { fontSize: 12, color: "#64748b", marginTop: 2 },
  homeBody: { padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16 },
  primaryBtn: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "16px", background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", border: "none", borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: "0.02em" },
  quickGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  quickBtn: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 12px", background: "#111827", border: "1px solid #1e293b", borderRadius: 14, cursor: "pointer", color: "#e2e8f0", fontSize: 13, fontWeight: 600 },
  quickCount: { fontSize: 20, fontWeight: 900, color: "#10b981" },
  section: { display: "flex", flexDirection: "column", gap: 8 },
  sectionLabel: { fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 4 },
  matchCard: { display: "flex", alignItems: "center", gap: 10, padding: "14px", background: "#111827", border: "1px solid #1e293b", borderRadius: 12, cursor: "pointer", textAlign: "left", color: "#e2e8f0", width: "100%" },
  matchCardTitle: { fontWeight: 700, fontSize: 15, color: "#f1f5f9" },
  matchCardSub: { fontSize: 12, color: "#64748b", marginTop: 2 },
  typeBadge: { fontSize: 11, fontWeight: 700, color: "#fff", padding: "3px 8px", borderRadius: 6, whiteSpace: "nowrap" },
  emptyHint: { textAlign: "center", padding: "48px 20px", color: "#94a3b8", fontSize: 14 },

  // Header
  header: { display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "#0a0f1a", borderBottom: "1px solid #1e293b", position: "sticky", top: 0, zIndex: 10 },
  backBtn: { background: "none", border: "none", cursor: "pointer", color: "#e2e8f0", padding: 4, display: "flex" },
  headerTitle: { fontSize: 17, fontWeight: 800, color: "#f1f5f9" },
  iconBtn: { background: "none", border: "none", cursor: "pointer", color: "#e2e8f0", padding: 4, display: "flex", alignItems: "center" },

  // Match meta
  matchMeta: { display: "flex", gap: 8, padding: "8px 16px", fontSize: 13, color: "#64748b", borderBottom: "1px solid #1e293b", flexWrap: "wrap" },

  // Tabs
  tabBar: { display: "flex", borderBottom: "1px solid #1e293b", background: "#0a0f1a", position: "sticky", top: 61, zIndex: 9 },
  tab: { flex: 1, padding: "12px 4px", background: "none", border: "none", cursor: "pointer", color: "#64748b", fontSize: 13, fontWeight: 600 },
  tabActive: { color: "#10b981", borderBottom: "2px solid #10b981" },

  // Board 2-panel layout
  boardLayout: { display: "flex", flexDirection: "column", height: "calc(100vh - 130px)", overflow: "hidden" },
  pitchPanel: { flex: "0 0 auto", display: "flex", flexDirection: "column" },
  formationBadge: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 14px 2px" },
  formationBadgeText: { fontSize: 12, color: "#64748b", letterSpacing: "0.2em", fontWeight: 700 },
  placedCount: { fontSize: 12, color: "#10b981", fontWeight: 700 },
  pitch: { background: "linear-gradient(180deg, #0a2310 0%, #0d2e14 50%, #0a2310 100%)", margin: "2px 10px 0", borderRadius: 10, padding: "8px 2px 6px", border: "2px solid #1a4a24", position: "relative" },
  pitchLines: { position: "absolute", inset: 0, borderRadius: 10, backgroundImage: "linear-gradient(transparent calc(50% - 1px), #1a4a24 calc(50% - 1px), #1a4a24 calc(50% + 1px), transparent calc(50% + 1px))", pointerEvents: "none" },
  pitchRow: { display: "flex", justifyContent: "center", gap: 3, marginBottom: 4 },
  positionSlot: { display: "flex", flexDirection: "column", alignItems: "center" },
  posBtn: { width: 62, minHeight: 54, background: "rgba(10,30,18,0.85)", border: "1.5px solid #2d6a40", borderRadius: 9, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1, padding: "3px 2px", transition: "all 0.12s", color: "#e2e8f0" },
  posBtnFilled: { background: "rgba(16,185,129,0.15)", border: "1.5px solid #10b981" },
  posBtnSelected: { background: "rgba(245,158,11,0.2)", border: "2px solid #f59e0b", transform: "scale(1.06)" },
  posBtnTarget: { background: "rgba(16,185,129,0.1)", border: "2px dashed #10b981" },
  posBtnSwap: { background: "rgba(59,130,246,0.15)", border: "2px dashed #3b82f6" },
  posLabel: { fontSize: 9, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 },
  playerInPos: { display: "flex", flexDirection: "column", alignItems: "center" },
  playerNumSmall: { fontSize: 13, fontWeight: 900, color: "#10b981", lineHeight: 1 },
  playerNameSmall: { fontSize: 10, color: "#e2e8f0", fontWeight: 600, maxWidth: 58, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  posEmpty: { fontSize: 9, color: "#374151" },
  pitchHint: { textAlign: "center", fontSize: 11, color: "#374151", paddingBottom: 4 },
  selectionHint: { fontSize: 12, color: "#f59e0b", textAlign: "center", padding: "4px 12px 2px", minHeight: 24 },
  cancelSelBtn: { background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 13, padding: "0 2px", verticalAlign: "middle" },
  playerPanel: { flex: 1, display: "flex", flexDirection: "column", borderTop: "2px solid #1e293b", overflow: "hidden", minHeight: 0 },
  playerPanelHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 14px 4px", background: "#0a0f1a", flexShrink: 0 },
  playerPanelTitle: { fontSize: 11, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" },
  playerPanelCount: { fontSize: 11, fontWeight: 700, color: "#f59e0b" },
  playerPanelList: { overflowX: "auto", overflowY: "hidden", display: "flex", flexDirection: "row", gap: 6, padding: "4px 10px 8px", alignItems: "flex-start", flexShrink: 0, WebkitOverflowScrolling: "touch" },
  sidePlayerBtn: { display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 6px", background: "#111827", border: "1.5px solid #1e293b", borderRadius: 10, cursor: "pointer", color: "#e2e8f0", minWidth: 56, flexShrink: 0, transition: "all 0.12s" },
  sidePlayerBtnHL: { background: "rgba(245,158,11,0.15)", border: "1.5px solid #f59e0b" },
  sidePlayerBtnAssigned: { opacity: 0.5 },
  sideNum: { width: 28, height: 28, borderRadius: 7, background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#94a3b8", flexShrink: 0 },
  sideInfo: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2 },
  sideName: { fontSize: 10, fontWeight: 700, color: "#f1f5f9", textAlign: "center", maxWidth: 52, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  sideMeta: { display: "flex", gap: 2 },
  posTagSm: { background: "#0d2137", color: "#3b82f6", padding: "1px 5px", borderRadius: 4, fontSize: 9, fontWeight: 700 },
  sideDiv: { width: 1, background: "#334155", alignSelf: "stretch", margin: "2px 2px", flexShrink: 0 },

  // Player picker
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "flex-end" },
  pickerSheet: { background: "#111827", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 480, margin: "0 auto", maxHeight: "70vh", display: "flex", flexDirection: "column" },
  pickerHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #1e293b" },
  pickerTitle: { fontWeight: 800, fontSize: 16, color: "#f1f5f9" },
  pickerList: { overflow: "auto", flex: 1 },
  pickerItem: { display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 20px", background: "none", border: "none", cursor: "pointer", borderBottom: "1px solid #1e293b", color: "#e2e8f0", textAlign: "left" },
  pickerItemActive: { background: "rgba(16, 185, 129, 0.1)" },

  // Players list
  playerList: { display: "flex", flexDirection: "column" },
  playerRow: { display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "1px solid #1e293b" },
  playerNum: { width: 32, height: 32, borderRadius: 8, background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#94a3b8", flexShrink: 0 },
  playerInfo: { flex: 1, minWidth: 0 },
  playerName: { fontWeight: 700, color: "#f1f5f9", fontSize: 15 },
  playerMeta: { fontSize: 12, color: "#64748b", marginTop: 2, display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" },
  posTag: { background: "#0d2137", color: "#3b82f6", padding: "1px 6px", borderRadius: 4, fontSize: 11, fontWeight: 700 },
  ghostBtn: { background: "none", border: "none", cursor: "pointer", color: "#64748b", padding: 6, display: "flex", borderRadius: 8 },

  // Form
  formCard: { background: "#111827", border: "1px solid #1e293b", borderRadius: 14, padding: "16px", marginBottom: 12 },
  formTitle: { fontWeight: 800, fontSize: 15, color: "#f1f5f9", marginBottom: 12 },
  formRow: { display: "flex", gap: 10 },
  formGroup: { display: "flex", flexDirection: "column", gap: 4, flex: 1, marginBottom: 10 },
  label: { fontSize: 12, color: "#94a3b8", fontWeight: 600 },
  input: { background: "#0a0f1a", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 15, outline: "none", width: "100%", boxSizing: "border-box" },
  formGrid: { display: "flex", flexWrap: "wrap", gap: 8 },
  fmBtn: { padding: "8px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#94a3b8", cursor: "pointer", fontSize: 14, fontWeight: 700 },
  fmBtnActive: { background: "rgba(16, 185, 129, 0.2)", border: "1px solid #10b981", color: "#10b981" },
  primaryBtnSm: { display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" },
  secondaryBtn: { flex: 1, padding: "10px", background: "#1e293b", border: "none", borderRadius: 10, color: "#94a3b8", fontSize: 14, fontWeight: 600, cursor: "pointer" },

  // Subs
  subCard: { display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #1e293b" },
  subMinute: { width: 40, textAlign: "center", fontWeight: 900, color: "#f59e0b", fontSize: 16 },
  subDetail: { flex: 1 },
  subOut: { color: "#ef4444", fontSize: 14, fontWeight: 600 },
  subIn: { color: "#10b981", fontSize: 14, fontWeight: 600 },
};
