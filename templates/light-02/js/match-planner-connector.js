/**
 * Match Planner Connector
 * config/club-config.json の matchPlanner.jsonbinBinId / jsonbinApiKey を使って
 * JSONBin からデータを取得し、ページ上に表示する。
 */

const MatchPlannerConnector = (function () {
  const JSONBIN_BASE_URL = 'https://api.jsonbin.io/v3/b';

  let config = null;

  async function loadConfig() {
    const res = await fetch('config/club-config.json');
    if (!res.ok) throw new Error('club-config.json の読み込みに失敗しました');
    config = await res.json();
  }

  async function fetchMatchPlannerData() {
    if (!config) await loadConfig();

    const { jsonbinBinId, jsonbinApiKey } = config.matchPlanner;
    const res = await fetch(`${JSONBIN_BASE_URL}/${jsonbinBinId}/latest`, {
      headers: { 'X-Master-Key': jsonbinApiKey }
    });

    if (!res.ok) throw new Error('JSONBin からのデータ取得に失敗しました');

    const json = await res.json();
    return json.record;
  }

  function setHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function noData(msg) {
    return `<p class="mp-no-data">${msg}</p>`;
  }

  function renderNews(news) {
    if (!news || news.length === 0) {
      setHTML('latest-news-list', noData('最新情報はありません'));
      return;
    }
    const sorted = news.slice().sort((a, b) => (b.date || '') > (a.date || '') ? 1 : -1);
    const html = sorted.slice(0, 5).map(item => `
      <div class="mp-news-item">
        <span class="mp-date">${item.date || ''}</span>
        ${item.category ? `<span class="mp-category">${item.category}</span>` : ''}
        <p class="mp-title">${item.title || ''}</p>
      </div>
    `).join('');
    setHTML('latest-news-list', html);
  }

  function renderResults(results) {
    if (!results || results.length === 0) {
      setHTML('latest-results-list', noData('試合結果はありません'));
      return;
    }
    const html = results.slice(0, 5).map(item => `
      <div class="mp-result-item">
        <span class="mp-date">${item.date || ''}</span>
        <div class="mp-score">
          <span class="mp-home-team">${item.homeTeam || ''}</span>
          <span class="mp-score-num">${item.homeScore ?? '-'} - ${item.awayScore ?? '-'}</span>
          <span class="mp-away-team">${item.awayTeam || ''}</span>
        </div>
        <span class="mp-competition">${item.competition || ''}</span>
      </div>
    `).join('');
    setHTML('latest-results-list', html);
  }

  function renderSchedule(schedule) {
    if (!schedule || schedule.length === 0) {
      setHTML('latest-schedule-list', noData('試合予定はありません'));
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = schedule
      .filter(item => new Date(item.date) >= today)
      .slice(0, 5);

    if (upcoming.length === 0) {
      setHTML('latest-schedule-list', noData('今後の試合予定はありません'));
      return;
    }

    const html = upcoming.map(item => `
      <div class="mp-schedule-item">
        <span class="mp-date">${item.date || ''}</span>
        <span class="mp-time">${item.time || ''}</span>
        <div class="mp-match">
          <span class="mp-home-team">${item.homeTeam || ''}</span>
          <span class="mp-vs">vs</span>
          <span class="mp-away-team">${item.awayTeam || ''}</span>
        </div>
        <span class="mp-venue">${item.venue || ''}</span>
        <span class="mp-competition">${item.competition || ''}</span>
      </div>
    `).join('');
    setHTML('latest-schedule-list', html);
  }

  async function init() {
    try {
      await loadConfig();

      const f = config.features || {};
      if (f.showNews === false) {
        setHTML('latest-news-list', '');
        const newsBlock = document.getElementById('section-news');
        if (newsBlock) newsBlock.style.display = 'none';
      }
      if (f.showResults === false) {
        setHTML('latest-results-list', '');
        const resultsBlock = document.getElementById('section-results');
        if (resultsBlock) resultsBlock.style.display = 'none';
      }
      if (f.showSchedule === false) {
        setHTML('latest-schedule-list', '');
        const scheduleBlock = document.getElementById('section-schedule');
        if (scheduleBlock) scheduleBlock.style.display = 'none';
      }

      const data = await fetchMatchPlannerData();

      if (f.showNews !== false) renderNews(data.news || []);
      if (f.showResults !== false) renderResults(data.results || []);
      if (f.showSchedule !== false) renderSchedule(data.schedule || []);
    } catch (err) {
      console.error('[MatchPlannerConnector]', err);
      ['latest-news-list', 'latest-results-list', 'latest-schedule-list'].forEach(id => {
        setHTML(id, noData('データを読み込めませんでした'));
      });
    }
  }

  return { init, loadConfig };
})();

document.addEventListener('DOMContentLoaded', () => {
  MatchPlannerConnector.init();
});
