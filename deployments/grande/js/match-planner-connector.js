/**
 * AuroraConnector  –  standard-04
 *
 * JSONBin からデータを取得し、index.html の各セクションへ反映する。
 *
 * ▼ 設定 (club-config.json)
 *   integration.jsonbinBinId / jsonbinApiKey  … 試合データ
 *   newsIntegration.jsonbinBinId / jsonbinApiKey  … ニュースデータ
 *   matchCategories  … タブカテゴリ例: ["U-15","U-14","U-13"]
 *
 * ▼ 試合データ (json.record.matches[n]) の主要フィールド
 *   match.date            YYYY-MM-DD
 *   match.category        カテゴリ ("U-15" / "U-14" / "U-13" 等)
 *   match.competitionName 大会名
 *   match.opponent        対戦相手
 *   match.venue           会場
 *   match.time            キックオフ時刻
 *   match.result          試合結果オブジェクト (未確定時は null)
 *     .myScore / .oppScore  スコア
 *     .resultStr            "勝利" / "敗戦" / "引き分け"
 *     .hpData               HP掲載用カスタムテキスト
 *     .publish              false = 非公開
 *     .makeNews             false = ニュース生成しない
 *
 * ▼ ニュースデータ (json.record.news[n]) の主要フィールド
 *   news.date    YYYY-MM-DD
 *   news.title   タイトル
 *   news.body    本文 (任意)
 *   news.cat     カテゴリ (任意)
 */

const AuroraConnector = (function () {

  const JSONBIN_BASE = 'https://api.jsonbin.io/v3/b';

  const state = {
    config: null,
    categories: [],
    activeCategory: '',
    allMatches: [],
    allNews: [],
  };

  // ── ユーティリティ ──────────────────────────────────────

  function get(obj, path) {
    return path.split('.').reduce(function (o, k) {
      return (o != null && o[k] !== undefined) ? o[k] : null;
    }, obj);
  }

  function escapeHTML(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function toDate(s) {
    if (!s) return null;
    var d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  }

  function formatDate(s) {
    if (!s) return '';
    return String(s).replace(/-/g, '/');
  }

  function dayLabel(dateStr) {
    var d = toDate(dateStr);
    if (!d) return '';
    return ['SUN','MON','TUE','WED','THU','FRI','SAT'][d.getDay()];
  }

  function resultClass(rs) {
    if (!rs) return 'badge-draw';
    if (/勝|win/i.test(rs)) return 'badge-win';
    if (/負|敗|lose|loss/i.test(rs)) return 'badge-lose';
    return 'badge-draw';
  }

  function resultLetter(rs) {
    if (!rs) return 'D';
    if (/勝|win/i.test(rs)) return 'W';
    if (/負|敗|lose|loss/i.test(rs)) return 'L';
    return 'D';
  }

  function setHTML(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // ── データ取得 ──────────────────────────────────────────

  async function loadConfig() {
    var res = await fetch('config/club-config.json');
    if (!res.ok) throw new Error('club-config.json 読み込み失敗');
    return res.json();
  }

  async function fetchMatches(config) {
    var binId  = get(config, 'integration.jsonbinBinId')
              || get(config, 'matchPlanner.jsonbinBinId');
    var apiKey = get(config, 'integration.jsonbinApiKey')
              || get(config, 'matchPlanner.jsonbinApiKey');

    if (!binId || /^DUMMY/i.test(binId)) {
      var e = new Error('Match Planner未設定');
      e.code = 'UNCONFIGURED';
      throw e;
    }

    var res = await fetch(JSONBIN_BASE + '/' + binId + '/latest', {
      headers: { 'X-Master-Key': apiKey }
    });
    if (!res.ok) throw new Error('JSONBin 取得失敗 (' + res.status + ')');
    var json = await res.json();
    var matches = get(json, 'record.matches');
    return Array.isArray(matches) ? matches : [];
  }

  async function fetchNews(config) {
    var binId  = get(config, 'newsIntegration.jsonbinBinId');
    var apiKey = get(config, 'newsIntegration.jsonbinApiKey');
    if (!binId || /^DUMMY/i.test(binId)) {
      var e = new Error('News未設定');
      e.code = 'UNCONFIGURED';
      throw e;
    }
    var res = await fetch(JSONBIN_BASE + '/' + binId + '/latest', {
      headers: { 'X-Master-Key': apiKey }
    });
    if (!res.ok) throw new Error('news JSONBin取得失敗 (' + res.status + ')');
    var json = await res.json();
    var items = get(json, 'record.news');
    return Array.isArray(items) ? items : [];
  }

  // ── タブ描画 ────────────────────────────────────────────

  function renderTabs() {
    var container = document.getElementById('tab-buttons');
    if (!container) return;
    container.innerHTML = state.categories.map(function (k) {
      var active = k === state.activeCategory;
      return '<button class="tab-btn' + (active ? ' tab-active' : '') + '" data-cat="' + escapeHTML(k) + '">' + escapeHTML(k) + '</button>';
    }).join('');
    container.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.activeCategory = this.dataset.cat;
        renderTabs();
        renderMatchSection();
      });
    });
  }

  // ── 試合セクション描画 ──────────────────────────────────

  function renderMatchSection() {
    var cat = state.activeCategory;
    var matches = state.allMatches.filter(function (m) {
      return m.category === cat;
    });

    setText('active-cat', cat);

    // アクティブカテゴリの大会名: 直近の試合から取得
    var compName = '';
    if (matches.length > 0) {
      var latest = matches.slice().sort(function (a, b) {
        return (toDate(b.date) || 0) - (toDate(a.date) || 0);
      })[0];
      compName = latest.competitionName || latest.type || '';
    }
    setText('active-comp', compName);

    renderNextMatch(matches);
    renderResults(matches);
  }

  function renderNextMatch(matches) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var upcoming = matches
      .filter(function (m) {
        if (m.result && m.result.myScore != null && m.result.oppScore != null) return false;
        var d = toDate(m.date);
        return d && d >= today;
      })
      .sort(function (a, b) {
        return (toDate(a.date) || 0) - (toDate(b.date) || 0);
      });

    var next = upcoming[0];
    var container = document.getElementById('match-next-inner');
    if (!container) return;

    if (!next) {
      container.innerHTML = '<p style="color:#9a9aa2;font-size:14px;padding:30px 20px;text-align:center;">次の試合予定はありません</p>';
      return;
    }

    var dateDisp = next.date ? next.date.replace(/-/g, '.') : '';
    var day = dayLabel(next.date);
    var kickoff = next.time || next.kickoff || '';
    var venue = next.venue || '';
    var comp = next.competitionName || next.type || '';
    var opp = next.opponent || '';
    var clubName = state.config && state.config.club ? state.config.club.name || '' : '';
    var abbr = state.config && state.config.club ? (state.config.club.abbreviation || (state.config.club.shortName || '?')[0]) : '?';

    container.innerHTML =
      '<div class="nm-left">' +
        '<div class="nm-badge">NEXT MATCH</div>' +
        '<div class="nm-comp">' + escapeHTML(comp) + '</div>' +
        '<div class="nm-date-row">' +
          '<span class="nm-date-num">' + escapeHTML(dateDisp) + '</span>' +
          '<span class="nm-day">' + escapeHTML(day) + '</span>' +
        '</div>' +
        '<div class="nm-detail">KICK OFF &nbsp;' + escapeHTML(kickoff) + '<br>' + escapeHTML(venue) + '</div>' +
      '</div>' +
      '<div class="nm-center">' +
        '<div class="nm-team">' +
          '<div class="nm-logo-home"><span class="nm-abbr">' + escapeHTML(abbr) + '</span></div>' +
          '<div class="nm-team-name">' + escapeHTML(clubName) + '</div>' +
          '<div class="nm-team-label">HOME</div>' +
        '</div>' +
        '<div class="nm-vs">VS</div>' +
        '<div class="nm-team">' +
          '<div class="nm-logo-away">LOGO</div>' +
          '<div class="nm-team-name">' + escapeHTML(opp) + '</div>' +
          '<div class="nm-team-label">AWAY</div>' +
        '</div>' +
      '</div>' +
      '<div class="nm-right">' +
        '<a href="contact.html" class="nm-btn nm-btn-light">会場・アクセス</a>' +
        '<a href="results.html" class="nm-btn nm-btn-dark">試合詳細</a>' +
      '</div>';
  }

  function renderResults(matches) {
    var results = matches
      .filter(function (m) {
        if (!m.result) return false;
        if (m.result.publish === false) return false;
        if (m.result.myScore == null || m.result.oppScore == null) return false;
        return true;
      })
      .sort(function (a, b) {
        return (toDate(b.date) || 0) - (toDate(a.date) || 0);
      })
      .slice(0, 4);

    var clubName = state.config && state.config.club ? state.config.club.name || 'FC' : 'FC';

    if (results.length === 0) {
      setHTML('results-list', '<p class="no-data">現在表示できる試合結果はありません</p>');
      return;
    }

    var html = results.map(function (m) {
      var rs = m.result.resultStr || '';
      var rc = resultClass(rs);
      var rl = resultLetter(rs);
      return '<div class="result-row">' +
        '<span class="result-date">' + escapeHTML(m.date ? m.date.slice(5).replace('-', '.') : '') + '</span>' +
        '<span class="result-home">' + escapeHTML(clubName) + '</span>' +
        '<span class="result-score">' +
          '<span class="score-num">' + m.result.myScore + '</span>' +
          '<span class="score-sep">-</span>' +
          '<span class="score-num">' + m.result.oppScore + '</span>' +
        '</span>' +
        '<span class="result-opp">' + escapeHTML(m.opponent || '') + '</span>' +
        '<span class="result-badge ' + rc + '">' + rl + '</span>' +
        '</div>';
    }).join('');

    setHTML('results-list', html);
  }

  // ── ニュース描画 ────────────────────────────────────────

  function renderNews(items) {
    var f = state.config && state.config.features || {};
    if (f.showNews === false) {
      setHTML('news-list', '');
      return;
    }

    var sorted = items
      .filter(function (n) { return n && n.title; })
      .sort(function (a, b) {
        return (toDate(b.date) || 0) - (toDate(a.date) || 0);
      })
      .slice(0, 5);

    if (sorted.length === 0) {
      setHTML('news-list', '<p class="no-data">現在お知らせはありません</p>');
      return;
    }

    // カテゴリ別の色
    function catColor(cat) {
      if (!cat) return '#46464d';
      if (/試合|結果/i.test(cat)) return '#e3001b';
      if (/スクール|体験/i.test(cat)) return '#1f8a4c';
      if (/クラブ|お知らせ/i.test(cat)) return '#46464d';
      return '#b8870b';
    }

    var html = sorted.map(function (n) {
      var cc = catColor(n.cat);
      return '<a href="news.html" class="news-row">' +
        '<span class="news-date">' + escapeHTML(formatDate(n.date)) + '</span>' +
        '<span class="news-tag" style="color:' + cc + ';border-color:' + cc + ';">' + escapeHTML(n.cat || 'お知らせ') + '</span>' +
        '<span class="news-title">' + escapeHTML(n.title) + '</span>' +
        '<span class="news-arrow">›</span>' +
        '</a>';
    }).join('');

    setHTML('news-list', html);
  }

  // ── ティッカー描画 ──────────────────────────────────────

  function renderTicker(items) {
    var container = document.getElementById('ticker-inner');
    if (!container) return;
    var texts = items
      .filter(function (n) { return n && n.title; })
      .slice(0, 6)
      .map(function (n) { return n.title; });
    if (texts.length === 0) return;
    // 2倍にしてシームレスループ
    var doubled = texts.concat(texts);
    container.innerHTML = doubled.map(function (t) {
      return '<span class="ticker-item">▶&nbsp;&nbsp;' + escapeHTML(t) + '</span>';
    }).join('');
  }

  // ── エントリーポイント ──────────────────────────────────

  async function init() {
    try {
      state.config = await loadConfig();
    } catch (err) {
      console.error('[AuroraConnector] config読込失敗:', err.message);
      return;
    }

    var cats = state.config.matchCategories || ['U-15'];
    state.categories = cats;
    state.activeCategory = cats[0];
    renderTabs();

    var f = state.config.features || {};

    // 試合データ
    if (f.showResults !== false || f.showSchedule !== false) {
      try {
        state.allMatches = await fetchMatches(state.config);
      } catch (err) {
        if (err.code !== 'UNCONFIGURED') {
          console.error('[AuroraConnector] matches:', err.message);
        }
      }
    }
    renderMatchSection();

    // ニュースデータ
    if (f.showNews !== false) {
      try {
        state.allNews = await fetchNews(state.config);
        renderNews(state.allNews);
        renderTicker(state.allNews);
      } catch (err) {
        if (err.code !== 'UNCONFIGURED') {
          console.error('[AuroraConnector] news:', err.message);
        }
        setHTML('news-list', '<p class="no-data">現在お知らせはありません</p>');
      }
    }
  }

  return { init: init };

})();

document.addEventListener('DOMContentLoaded', function () {
  AuroraConnector.init();
});
