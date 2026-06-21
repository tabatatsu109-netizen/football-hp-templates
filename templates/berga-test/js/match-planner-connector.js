/**
 * Match Planner Connector  –  light-01
 *
 * JSONBin から Match Planner データを取得し、
 * index.html の最新情報エリア 3 箇所に表示する。
 *
 * ▼ JSONBin データ構造
 *   json.record = { players: [], matches: [] }
 *   使用するのは json.record.matches のみ。
 *
 * ▼ matches[n] の主要フィールド
 *   match.date            試合日 (YYYY-MM-DD)
 *   match.type            種別 (リーグ / カップ / 練習試合 …)
 *   match.competitionName 大会名
 *   match.opponent        対戦相手
 *   match.venue           会場
 *   match.name            試合名 / ラベル
 *   match.result          試合結果オブジェクト (未確定時は null / undefined)
 *     .myScore            自チームスコア
 *     .oppScore           相手スコア
 *     .resultStr          勝敗文字列 ("勝利" / "敗戦" / "引き分け" 等)
 *     .goals              得点者配列
 *     .hpData             HP 掲載用カスタムテキスト (優先使用)
 *     .publish            false の場合は非公開 (除外)
 *     .makeNews           false の場合はニュース生成を抑制
 *
 * ▼ 設定読み込み優先順位
 *   1. club-config.json > integration.jsonbinBinId / jsonbinApiKey
 *   2. club-config.json > matchPlanner.jsonbinBinId / jsonbinApiKey  (後方互換)
 *
 * ▼ 表示先 ID
 *   #latest-news-list     ニュース (試合結果から自動生成)
 *   #latest-results-list  試合結果 (最新5件)
 *   #latest-schedule-list 試合予定 (今日以降5件)
 */

const MatchPlannerConnector = (function () {

  const JSONBIN_BASE = 'https://api.jsonbin.io/v3/b';

  // ── ユーティリティ ──────────────────────────────────────

  /** ネストパスで値を取得 */
  function get(obj, path) {
    return path.split('.').reduce(function (o, k) {
      return (o != null && o[k] !== undefined) ? o[k] : null;
    }, obj);
  }

  /** 要素の innerHTML を安全にセット */
  function setHTML(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  /** 「データなし」表示用 HTML */
  function noData(msg) {
    return '<p class="mp-no-data">' + msg + '</p>';
  }

  /** YYYY-MM-DD → YYYY/MM/DD */
  function formatDate(dateStr) {
    if (!dateStr) return '';
    return String(dateStr).replace(/-/g, '/');
  }

  /** 日付文字列を Date オブジェクトに変換 (パース失敗時は null) */
  function toDate(dateStr) {
    if (!dateStr) return null;
    var d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  }

  /** HTML 特殊文字をエスケープ */
  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** resultStr から勝敗 CSS クラスを返す */
  function resultClass(rs) {
    if (!rs) return '';
    if (/勝|win/i.test(rs)) return 'mp-win';
    if (/負|敗|lose|loss/i.test(rs)) return 'mp-lose';
    return 'mp-draw';
  }

  // ── 設定・データ取得 ────────────────────────────────────

  async function loadConfig() {
    var res = await fetch('config/club-config.json');
    if (!res.ok) throw new Error('club-config.json 読み込み失敗');
    return res.json();
  }

  async function fetchMatches(config) {
    // integration.* を優先、なければ matchPlanner.* にフォールバック
    var binId  = get(config, 'integration.jsonbinBinId')
              || get(config, 'matchPlanner.jsonbinBinId');
    var apiKey = get(config, 'integration.jsonbinApiKey')
              || get(config, 'matchPlanner.jsonbinApiKey');

    // ダミーキーまたは未設定の場合は専用エラー
    if (!binId || /^DUMMY/i.test(binId)) {
      var e = new Error('Match Planner未設定');
      e.code = 'UNCONFIGURED';
      throw e;
    }

    var url = JSONBIN_BASE + '/' + binId + '/latest';
    console.log('[MatchPlanner] 取得URL:', url);
    console.log('[MatchPlanner] BinId:', binId);
    console.log('[MatchPlanner] APIキー先頭10文字:', apiKey ? apiKey.slice(0, 10) + '...' : '(未設定)');

    var res = await fetch(url, {
      headers: { 'X-Master-Key': apiKey }
    });

    console.log('[MatchPlanner] HTTP ステータス:', res.status);

    if (!res.ok) {
      var errBody = '';
      try { errBody = await res.text(); } catch (_) {}
      console.error('[MatchPlanner] 取得失敗 レスポンス:', errBody);
      var httpErr = new Error('JSONBin 取得失敗 (' + res.status + ')');
      httpErr.status = res.status;
      throw httpErr;
    }

    var json = await res.json();
    console.log('[MatchPlanner] 生レスポンス (record):', JSON.stringify(json.record, null, 2));

    // json.record.matches を取得
    var matches = get(json, 'record.matches');
    console.log('[MatchPlanner] matches:', Array.isArray(matches) ? matches.length + '件' : '(配列でない: ' + typeof matches + ')');
    if (Array.isArray(matches) && matches.length > 0) {
      console.log('[MatchPlanner] matches[0]:', JSON.stringify(matches[0], null, 2));
    }

    return Array.isArray(matches) ? matches : [];
  }

  // ── お知らせ (newsIntegration) ──────────────────────────

  async function fetchNews(config) {
    // newsIntegration があればそれを使う、なければ integration にフォールバック（同一Bin構成対応）
    var binId  = get(config, 'newsIntegration.jsonbinBinId')
              || get(config, 'integration.jsonbinBinId')
              || get(config, 'matchPlanner.jsonbinBinId');
    var apiKey = get(config, 'newsIntegration.jsonbinApiKey')
              || get(config, 'integration.jsonbinApiKey')
              || get(config, 'matchPlanner.jsonbinApiKey');
    if (!binId || /^DUMMY/i.test(binId)) return [];
    var url = JSONBIN_BASE + '/' + binId + '/latest';
    console.log('[MatchPlanner] news取得URL:', url);
    var res = await fetch(url, { headers: { 'X-Master-Key': apiKey } });
    console.log('[MatchPlanner] news HTTPステータス:', res.status);
    if (!res.ok) {
      var errText = '';
      try { errText = await res.text(); } catch (_) {}
      console.error('[MatchPlanner] news取得失敗:', errText);
      throw new Error('news JSONBin取得失敗 (' + res.status + ')');
    }
    var json = await res.json();
    console.log('[MatchPlanner] news 生データ:', JSON.stringify(json.record, null, 2));
    // record.news を優先、なければ record.posts（Match Planner送信形式）にフォールバック
    var items = get(json, 'record.news') || get(json, 'record.posts');
    if (!Array.isArray(items)) return [];
    // published: false の非公開記事は除外
    return items.filter(function(item) { return item.published !== false; });
  }

  function renderNewsItems(items) {
    var sorted = items
      .filter(function (n) { return n && n.title; })
      .sort(function (a, b) {
        return (toDate(b.date) || 0) - (toDate(a.date) || 0);
      })
      .slice(0, 3);

    if (sorted.length === 0) {
      setHTML('latest-news-list', noData('現在お知らせはありません'));
      return;
    }

    var html = sorted.map(function (n) {
      return '<div class="mp-news-item">'
        + '<div class="mp-news-header">'
        + '<span class="mp-date">' + formatDate(n.date) + '</span>'
        + '</div>'
        + '<p class="mp-news-title">' + escapeHTML(n.title) + '</p>'
        + (n.body ? '<p class="mp-news-body">' + escapeHTML(n.body) + '</p>' : '')
        + '</div>';
    }).join('');

    setHTML('latest-news-list', html);
  }

  // ── 描画ロジック ────────────────────────────────────────

  /**
   * 試合結果の描画
   * 条件: result が存在 & publish !== false & スコアあり
   * 並び: 日付降順、最新5件
   */
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
      .slice(0, 5);

    if (results.length === 0) {
      setHTML('latest-results-list', noData('試合結果はありません'));
      return;
    }

    var html = results.map(function (m) {
      var competition = m.competitionName || m.type || '';
      var opponent    = m.opponent || '';
      var myScore     = m.result.myScore;
      var oppScore    = m.result.oppScore;
      var rs          = m.result.resultStr || '';
      var rc          = resultClass(rs);

      return '<div class="mp-result-item">'
        + '<div class="mp-result-header">'
        + '<span class="mp-date">' + formatDate(m.date) + '</span>'
        + (competition ? '<span class="mp-competition">' + competition + '</span>' : '')
        + '</div>'
        + '<div class="mp-score">'
        + '<span class="mp-score-num">' + myScore + '&nbsp;-&nbsp;' + oppScore + '</span>'
        + '<span class="mp-vs">vs</span>'
        + '<span class="mp-opponent">' + opponent + '</span>'
        + (rs ? '<span class="mp-result-badge ' + rc + '">' + rs + '</span>' : '')
        + '</div>'
        + '</div>';
    }).join('');

    setHTML('latest-results-list', html);
  }

  /**
   * 試合予定の描画
   * 条件: result が存在しない、またはスコア未設定 & 今日以降
   * 並び: 日付昇順、5件
   */
  function renderSchedule(matches) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var schedule = matches
      .filter(function (m) {
        // スコアが存在しない = まだ試合前
        if (!m.result) return true;
        if (m.result.myScore == null || m.result.oppScore == null) return true;
        return false;
      })
      .filter(function (m) {
        var d = toDate(m.date);
        return d && d >= today;
      })
      .sort(function (a, b) {
        return (toDate(a.date) || 0) - (toDate(b.date) || 0);
      })
      .slice(0, 5);

    if (schedule.length === 0) {
      setHTML('latest-schedule-list', noData('今後の試合予定はありません'));
      return;
    }

    var html = schedule.map(function (m) {
      var competition = m.competitionName || m.type || '';
      var opponent    = m.opponent || '';
      var venue       = m.venue || '';
      var name        = m.name || '';

      return '<div class="mp-schedule-item">'
        + '<div class="mp-schedule-header">'
        + '<span class="mp-date">' + formatDate(m.date) + '</span>'
        + (competition ? '<span class="mp-competition">' + competition + '</span>' : '')
        + '</div>'
        + (name ? '<p class="mp-match-name">' + name + '</p>' : '')
        + '<div class="mp-match">'
        + '<span class="mp-vs">vs</span>'
        + '<span class="mp-schedule-opponent">' + opponent + '</span>'
        + '</div>'
        + (venue ? '<span class="mp-venue">' + venue + '</span>' : '')
        + '</div>';
    }).join('');

    setHTML('latest-schedule-list', html);
  }

  /**
   * ニュースの描画 (試合結果から自動生成)
   * 条件: result が存在 & makeNews !== false & publish !== false
   * 本文: result.hpData があれば優先、なければ「vs 〇〇 / スコアで勝利しました」形式
   * 並び: 日付降順、最新5件
   */
  function renderNews(matches) {
    var news = matches
      .filter(function (m) {
        if (!m.result) return false;
        if (m.result.makeNews === false) return false;
        if (m.result.publish === false) return false;
        return true;
      })
      .sort(function (a, b) {
        return (toDate(b.date) || 0) - (toDate(a.date) || 0);
      })
      .slice(0, 5);

    if (news.length === 0) {
      setHTML('latest-news-list', noData('最新情報はありません'));
      return;
    }

    var html = news.map(function (m) {
      var competition = m.competitionName || m.type || '';
      var opponent    = m.opponent || '';
      var bodyHTML    = '';

      if (m.result.hpData) {
        // カスタムテキストを優先
        bodyHTML = '<p class="mp-title">' + m.result.hpData + '</p>';
      } else {
        // スコアと勝敗文字列から自動生成
        var myScore  = (m.result.myScore  != null) ? m.result.myScore  : '?';
        var oppScore = (m.result.oppScore != null) ? m.result.oppScore : '?';
        var rs       = m.result.resultStr || '';
        var scoreStr = myScore + ' - ' + oppScore;
        var body     = rs ? (scoreStr + 'で' + rs + 'しました') : scoreStr;

        bodyHTML = '<p class="mp-news-opponent">vs ' + opponent + '</p>'
                 + '<p class="mp-title">' + body + '</p>';
      }

      return '<div class="mp-news-item">'
        + '<div class="mp-news-header">'
        + '<span class="mp-date">' + formatDate(m.date) + '</span>'
        + (competition ? '<span class="mp-category">' + competition + '</span>' : '')
        + '</div>'
        + bodyHTML
        + '</div>';
    }).join('');

    setHTML('latest-news-list', html);
  }

  // ── エラー表示 ──────────────────────────────────────────

  function showError(isUnconfigured) {
    var msg = isUnconfigured
      ? noData('Match Planner連携は未設定です')
      : noData('現在表示できる情報はありません');
    setHTML('latest-news-list',     msg);
    setHTML('latest-results-list',  msg);
    setHTML('latest-schedule-list', msg);
  }

  // ── エントリーポイント ──────────────────────────────────

  async function init() {
    var config;
    try {
      config = await loadConfig();
    } catch (err) {
      console.error('[MatchPlannerConnector] config読込失敗:', err.message);
      setHTML('latest-news-list',     noData('現在お知らせはありません'));
      setHTML('latest-results-list',  noData('現在表示できる情報はありません'));
      setHTML('latest-schedule-list', noData('現在表示できる情報はありません'));
      return;
    }

    var f = config.features || {};

    // ── ニュース: newsIntegration.jsonbinBinId から独立取得 ──
    if (f.showNews === false) {
      setHTML('latest-news-list', '');
    } else {
      try {
        var newsItems = await fetchNews(config);
        renderNewsItems(newsItems);
      } catch (err) {
        console.error('[MatchPlannerConnector] news:', err.message);
        setHTML('latest-news-list', noData('現在お知らせはありません'));
      }
    }

    // ── 試合結果・試合予定: 既存の matches ロジック (変更なし) ──
    if (f.showResults  === false) setHTML('latest-results-list', '');
    if (f.showSchedule === false) setHTML('latest-schedule-list', '');

    if (f.showResults !== false || f.showSchedule !== false) {
      try {
        var matches = await fetchMatches(config);
        if (f.showResults  !== false) renderResults(matches);
        if (f.showSchedule !== false) renderSchedule(matches);
      } catch (err) {
        console.error('[MatchPlannerConnector]', err.message);
        var errMsg = err.code === 'UNCONFIGURED'
          ? noData('Match Planner連携は未設定です')
          : noData('現在表示できる情報はありません');
        if (f.showResults  !== false) setHTML('latest-results-list',  errMsg);
        if (f.showSchedule !== false) setHTML('latest-schedule-list', errMsg);
      }
    }
  }

  return { init: init };

})();

document.addEventListener('DOMContentLoaded', function () {
  MatchPlannerConnector.init();
});
