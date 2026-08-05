/**
 * AuroraConnector  –  standard-04（Firebase版）
 *
 * Firebase Realtime Database（最新版 Match Planner の保存先 /clubs/{clubId}/）から
 * データを取得し、index.html の各セクションへ反映する。
 * ※ 2026-07 に JSONBin から移行。描画ロジックは無変更
 *
 * ▼ 設定 (club-config.json)
 *   integration.firebaseUrl / firebaseClubId  … データ取得先
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

  const state = {
    config: null,
    categories: [],
    activeCategory: '',
    allMatches: [],
    allSchedules: [],
    allNews: [],
    visibleNews: [],
    visibleResults: [],
  };

  // ── ユーティリティ ──────────────────────────────────────

  // カテゴリー表記ゆれ吸収（Match Planner="U15" / club-config.json="U-15" のようなハイフン有無の違いを無視して比較する）
  function normCat(s) {
    return String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  // カテゴリーから年代の数字を取り出す（"U-15" / "U15" → 15）
  function catAge(s) {
    var m = String(s || '').match(/(\d+)/);
    return m ? parseInt(m[1], 10) : null;
  }

  // 試合カテゴリーがどのタブに属するかを返す。
  // 例) タブが [U-15, U-12] の場合: U15/U14/U13 → U-15、U12/U11/U10/U9/U8 → U-12
  // （試合の年代以上で最も小さいタブに割り当てる）
  function tabForCategory(matchCat, tabs) {
    var age = catAge(matchCat);
    if (age == null) return null;
    var sorted = (tabs || [])
      .map(function (t) { return { tab: t, age: catAge(t) }; })
      .filter(function (t) { return t.age != null; })
      .sort(function (a, b) { return a.age - b.age; });
    for (var i = 0; i < sorted.length; i++) {
      if (age <= sorted[i].age) return sorted[i].tab;
    }
    return sorted.length ? sorted[sorted.length - 1].tab : null;
  }

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
    if (!rs) return 'DRAW';
    if (/勝|win/i.test(rs)) return 'WIN';
    if (/負|敗|lose|loss/i.test(rs)) return 'LOSE';
    return 'DRAW';
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

  // Firebase（最新版 Match Planner の保存先）から一括取得してキャッシュする
  var clubDataPromise = null;
  function fetchClubData(config) {
    if (!clubDataPromise) {
      var fbUrl  = get(config, 'integration.firebaseUrl')
                || 'https://hp-1-d7bce-default-rtdb.asia-southeast1.firebasedatabase.app';
      var clubId = get(config, 'integration.firebaseClubId') || 'grande';
      clubDataPromise = fetch(fbUrl + '/clubs/' + clubId + '.json').then(function (res) {
        if (!res.ok) throw new Error('Firebase 取得失敗 (' + res.status + ')');
        return res.json();
      });
    }
    return clubDataPromise;
  }

  async function fetchMatches(config) {
    var data = await fetchClubData(config);
    var matches = data && data.matches;
    return Array.isArray(matches) ? matches : [];
  }

  // スケジュール（告知はここから作られるが、試合管理側の matches とは別管理のレコード）
  async function fetchSchedules(config) {
    var data = await fetchClubData(config);
    var schedules = data && data.schedules;
    return Array.isArray(schedules) ? schedules : [];
  }

  async function fetchNews(config) {
    var data = await fetchClubData(config);
    var items = (data && data.news) || (data && data.posts);
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
      // category フィールドがない場合は全タブに表示する
      if (!m.category) return true;
      // U15/U14/U13 → U-15タブ、U12/U11/U10/U9/U8 → U-12タブ のように年代でグルーピング
      var tab = tabForCategory(m.category, state.categories);
      return tab ? normCat(tab) === normCat(cat) : true;
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

    renderResults(matches);
  }

  // schedules は「試合告知」の元データで、試合管理側の matches とは別レコード。
  // まだ matches 化されていない告知済みの試合もネクストマッチに拾えるよう、両方をマージする。
  function scheduleToMatchShape(sc) {
    return {
      date: sc.date,
      time: sc.time || '',
      venue: sc.venue || '',
      competitionName: sc.competition || sc.type || '',
      opponent: sc.opponent || '',
      category: sc.category || '',
    };
  }

  // 表示用カテゴリー表記（"U12" → "U-12" に統一）
  function dispCat(c) {
    var m = String(c || '').match(/^U-?(\d+)$/i);
    return m ? 'U-' + m[1] : String(c || '');
  }

  function renderNextMatch(matches, schedules) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var fromMatches = matches.filter(function (m) {
      if (m.result && m.result.myScore != null && m.result.oppScore != null) return false;
      var d = toDate(m.date);
      return d && d >= today;
    });

    var matchKeys = {};
    fromMatches.forEach(function (m) { matchKeys[m.date + '|' + (m.opponent || '')] = true; });

    var fromSchedules = (schedules || [])
      .filter(function (sc) {
        var d = toDate(sc.date);
        if (!d || d < today) return false;
        return !matchKeys[sc.date + '|' + (sc.opponent || '')];
      })
      .map(scheduleToMatchShape);

    var upcoming = fromMatches.concat(fromSchedules)
      .sort(function (a, b) {
        return (toDate(a.date) || 0) - (toDate(b.date) || 0);
      });

    var next = upcoming[0];
    var container = document.getElementById('match-next-inner');
    if (!container) return;

    var panel = container.parentElement;
    var section = panel && panel.closest('.next-match-section');

    if (!next) {
      if (panel) panel.style.display = 'none';
      if (section) section.style.display = 'none';
      return;
    }

    if (panel) panel.style.display = '';
    if (section) section.style.display = '';

    var dateDisp = next.date ? next.date.replace(/-/g, '.') : '';
    var day = dayLabel(next.date);
    var kickoff = next.time || next.kickoff || '';
    var venue = next.venue || '';
    var comp = next.competitionName || next.type || '';
    var opp = next.opponent || '';
    var clubName = state.config && state.config.club
      ? (state.config.club.nickname || state.config.club.shortName || state.config.club.name || '')
      : '';
    var logoSrc = get(state.config, 'design.logo');

    var cat = dispCat(next.category);

    container.innerHTML =
      '<div class="nm-left">' +
        '<div class="nm-badge-row">' +
          '<div class="nm-badge">NEXT MATCH</div>' +
          (cat ? '<span class="nm-cat">' + escapeHTML(cat) + '</span>' : '') +
        '</div>' +
        '<div class="nm-comp">' + escapeHTML(comp) + '</div>' +
        '<div class="nm-date-row">' +
          '<span class="nm-date-num">' + escapeHTML(dateDisp) + '</span>' +
          '<span class="nm-day">' + escapeHTML(day) + '</span>' +
        '</div>' +
        '<div class="nm-detail">KICK OFF &nbsp;' + escapeHTML(kickoff) + '<br>' + escapeHTML(venue) + '</div>' +
      '</div>' +
      '<div class="nm-center">' +
        '<div class="nm-team">' +
          '<div class="nm-logo-home">' + (logoSrc ? '<img src="' + escapeHTML(logoSrc) + '" alt="" class="nm-logo-img">' : '') + '</div>' +
          '<div class="nm-team-name">' + escapeHTML(clubName) + '</div>' +
        '</div>' +
        '<div class="nm-vs">VS</div>' +
        '<div class="nm-team">' +
          '<div class="nm-logo-away">LOGO</div>' +
          '<div class="nm-team-name">' + escapeHTML(opp) + '</div>' +
        '</div>' +
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

    state.visibleResults = results;
    var html = results.map(function (m, i) {
      var rs = m.result.resultStr || '';
      var rc = resultClass(rs);
      var rl = resultLetter(rs);
      return '<div class="result-row" style="cursor:pointer" onclick="AuroraConnector.openMatchDetail(' + i + ')">' +
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

  // ── 試合詳細（既存のニュース詳細モーダルを流用して表示）────
  function findLinkedPost(m) {
    var r = m.result || {};
    var posts = state.allNews || [];
    var found = null;
    if (r.grandeNewsId) {
      found = posts.filter(function (p) { return p && p.id === r.grandeNewsId; })[0];
    }
    if (!found && m.opponent) {
      found = posts.filter(function (p) {
        return p && p.type === '試合結果' && p.date === m.date && String(p.title || '').indexOf(m.opponent) >= 0;
      })[0];
    }
    return found || null;
  }

  function openMatchDetail(idx) {
    var m = state.visibleResults && state.visibleResults[idx];
    if (!m || !m.result) return;
    var overlay = document.getElementById('news-detail-overlay');
    if (!overlay) return;
    var r = m.result;
    var post = findLinkedPost(m);
    var clubName = state.config && state.config.club
      ? (state.config.club.nickname || state.config.club.shortName || state.config.club.name || '')
      : '';

    var rl = resultLetter(r.resultStr || '');
    var tagColor = rl === 'WIN' ? '#1f8a4c' : rl === 'LOSE' ? '#d24b52' : '#86868f';
    var tagEl = document.getElementById('news-detail-tag');
    if (tagEl) { tagEl.textContent = rl; tagEl.style.color = tagColor; tagEl.style.borderColor = tagColor; }
    setText('news-detail-date', formatDate(m.date));
    setText('news-detail-title', clubName + ' ' + r.myScore + ' - ' + r.oppScore + ' ' + (m.opponent || ''));

    var lines = [];
    var comp = m.competition || m.competitionName || m.type || '';
    if (comp) lines.push('🏆 ' + comp);
    if (m.venue) lines.push('📍 ' + m.venue);
    if (m.time) lines.push('⏰ ' + m.time + ' キックオフ');
    var scorers = [];
    if (post && Array.isArray(post.scorers) && post.scorers.length) {
      scorers = post.scorers.map(function (s) { return s.name + (s.goals > 1 ? ' ×' + s.goals : ''); });
    } else if (Array.isArray(r.goals)) {
      var count = {};
      r.goals.forEach(function (g) { if (g.scorer) count[g.scorer] = (count[g.scorer] || 0) + 1; });
      scorers = Object.keys(count).map(function (k) { return k + (count[k] > 1 ? ' ×' + count[k] : ''); });
    }
    if (scorers.length) lines.push('⚽ 得点者：' + scorers.join('、'));
    var body = lines.join('\n');
    if (post && post.body) body += (body ? '\n\n' : '') + post.body;
    var bodyEl = document.getElementById('news-detail-body');
    if (bodyEl) bodyEl.textContent = body;

    var imgEl = document.getElementById('news-detail-image');
    var imgSrc = r.imageUrl || (post && post.image) || '';
    if (imgEl) {
      if (imgSrc) { imgEl.src = imgSrc; imgEl.classList.add('show'); }
      else { imgEl.removeAttribute('src'); imgEl.classList.remove('show'); }
    }
    overlay.classList.add('open');
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

    state.visibleNews = sorted;

    var html = sorted.map(function (n, i) {
      // Match Planner は category / type で保存するため n.cat も参照
      var cat = n.cat || n.category || n.type || 'お知らせ';
      // ナイトモードでは配色が暗いため、データ側の濃いカテゴリ色は使わず
      // CSS のアクセント色に任せる（インライン指定は CSS より強いため）
      var night = document.documentElement.getAttribute('data-theme') === 'night';
      var cc = night ? 'var(--main-color)' : catColor(cat);
      return '<a href="news.html" class="news-row" onclick="AuroraConnector.openNewsDetail(' + i + '); return false;">' +
        '<span class="news-date">' + escapeHTML(formatDate(n.date)) + '</span>' +
        '<span class="news-tag" style="color:' + cc + ';border-color:' + cc + ';">' + escapeHTML(cat) + '</span>' +
        '<span class="news-title">' + escapeHTML(n.title) + '</span>' +
        '<span class="news-arrow">›</span>' +
        '</a>';
    }).join('');

    setHTML('news-list', html);
  }

  // ── ニュース詳細モーダル ────────────────────────────────

  function openNewsDetail(idx) {
    var n = state.visibleNews && state.visibleNews[idx];
    if (!n) return;
    var overlay = document.getElementById('news-detail-overlay');
    if (!overlay) return;
    var cat = n.cat || n.category || n.type || 'お知らせ';
    setText('news-detail-tag', cat);
    setText('news-detail-date', formatDate(n.date));
    setText('news-detail-title', n.title || '');
    var bodyEl = document.getElementById('news-detail-body');
    if (bodyEl) bodyEl.textContent = n.body || '';
    var imgEl = document.getElementById('news-detail-image');
    if (imgEl) {
      if (n.image) { imgEl.src = n.image; imgEl.classList.add('show'); }
      else { imgEl.removeAttribute('src'); imgEl.classList.remove('show'); }
    }
    overlay.classList.add('open');
  }
  function closeNewsDetail() {
    var overlay = document.getElementById('news-detail-overlay');
    if (overlay) overlay.classList.remove('open');
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
    var closeBtn = document.getElementById('news-detail-close');
    if (closeBtn) closeBtn.addEventListener('click', closeNewsDetail);
    var overlay = document.getElementById('news-detail-overlay');
    if (overlay) overlay.addEventListener('click', function (e) { if (e.target === overlay) closeNewsDetail(); });

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
      try {
        state.allSchedules = await fetchSchedules(state.config);
      } catch (err) {
        if (err.code !== 'UNCONFIGURED') {
          console.error('[AuroraConnector] schedules:', err.message);
        }
      }
    }
    // ネクストマッチはヒーロー直下の独立セクションで、カテゴリータブとは連動しないため
    // 全カテゴリー横断で一番近い試合を表示する
    renderNextMatch(state.allMatches, state.allSchedules);
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

    // 取得済みデータを他のスクリプト（マッチデー演出等）へ通知する
    try {
      document.dispatchEvent(new CustomEvent('grande:data', {
        detail: {
          matches: state.allMatches,
          schedules: state.allSchedules,
          news: state.allNews,
          config: state.config,
        }
      }));
    } catch (e) { /* IE等は無視 */ }
  }

  return { init: init, openNewsDetail: openNewsDetail, closeNewsDetail: closeNewsDetail, openMatchDetail: openMatchDetail };

})();

document.addEventListener('DOMContentLoaded', function () {
  AuroraConnector.init();
});
