/**
 * mobile-experience.js — スマホ体験強化パック
 *
 * 1) マッチデー・モード     … 試合当日はトップに MATCH DAY 演出＋キックオフまでのカウントダウン。
 *                             結果が公開されたら自動でスコア表示に切り替え。
 *                             通常時は次の試合へのカウントダウン（14日以内）。
 * 2) スコア演出             … 試合結果カードが画面に入るとスコアが電光掲示板風にカウントアップ。
 *                             勝利は金色の光彩＋紙吹雪（ページ1回だけ・軽量）。
 * 3) アプリ風ボトムナビ     … スマホのみ画面下に固定ナビを注入（全ページ共通）。
 * 4) PWA                    … service worker 登録（ホーム画面に追加でアプリ化）。
 *
 * データはページ側の AuroraConnector が発火する 'grande:data' イベントから受け取る。
 * このイベントが無いページ（下層ページ）ではボトムナビとPWAのみ動く。
 */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ══════════════ 1. ボトムナビ（全ページ） ══════════════ */
  (function bottomNav() {
    if (document.getElementById('bnav-m')) return;
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var items = [
      { href: 'index.html',     label: 'ホーム',  match: ['index.html', ''],
        icon: '<path d="M3 11l9-8 9 8"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>' },
      { href: 'news.html',      label: 'お知らせ', match: ['news.html'],
        icon: '<path d="M4 4h13v16H4z"/><path d="M17 8h3v12H7"/><path d="M7.5 8h6M7.5 11.5h6M7.5 15h4"/>' },
      { href: 'matches.html',   label: '試合',    match: ['matches.html'],
        icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7.2l4.2 3-1.6 5H9.4l-1.6-5z"/>' },
      { href: 'join.html#apply', label: '体験申込', match: ['join.html'], cta: true,
        icon: '<circle cx="10" cy="8" r="3.4"/><path d="M4 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M18 7v6M15 10h6"/>' }
    ];
    var nav = document.createElement('nav');
    nav.id = 'bnav-m';
    nav.className = 'bnav-m';
    nav.setAttribute('aria-label', 'モバイルナビゲーション');
    nav.innerHTML = items.map(function (it) {
      var on = it.match.indexOf(here) >= 0;
      return '<a href="' + it.href + '" class="' + (on ? 'on' : '') + (it.cta ? ' bnav-m-cta' : '') + '">' +
        '<svg viewBox="0 0 24 24">' + it.icon + '</svg>' +
        '<span>' + it.label + '</span>' +
        (on ? '<i class="bnav-dot"></i>' : '') +
        '</a>';
    }).join('');
    document.body.appendChild(nav);
    document.body.classList.add('has-bnav');
  })();

  /* ══════════════ 2. PWA登録 ══════════════ */
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }

  /* ══════════════ 3. マッチデー・モード ══════════════ */
  var mdayTimer = null;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function localDateStr(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function kickoffDate(dateStr, timeStr) {
    var t = /^\d{1,2}:\d{2}$/.test(timeStr || '') ? timeStr : null;
    return new Date(dateStr + 'T' + (t ? (t.length === 4 ? '0' + t : t) : '09:00') + ':00');
  }

  function digitsHtml(str) {
    return String(str).split('').map(function (c) {
      return c === ':' || c === '日'
        ? '<span class="mday-sep">' + c + '</span>'
        : '<span class="mday-digit">' + c + '</span>';
    }).join('');
  }

  function setupMatchday(detail) {
    var host = document.getElementById('matchday-banner');
    if (!host) return;
    var matches = detail.matches || [];
    var schedules = detail.schedules || [];
    var now = new Date();
    var todayStr = localDateStr(now);

    /* 今日の試合（練習は除外）: schedules と matches をマージ */
    function isMatchLike(t) { return t && t !== '練習'; }
    var todayList = [];
    schedules.forEach(function (sc) {
      if (sc.date === todayStr && isMatchLike(sc.type)) {
        todayList.push({ date: sc.date, time: sc.time || '', opponent: sc.opponent || '', comp: sc.competition || sc.type || '', category: sc.category || '', matchId: sc.matchId || null });
      }
    });
    matches.forEach(function (m) {
      if (m.date === todayStr && !todayList.some(function (t) { return t.opponent === (m.opponent || ''); })) {
        todayList.push({ date: m.date, time: m.time || '', opponent: m.opponent || '', comp: m.competitionName || m.competition || m.type || '', category: m.category || '', matchId: m.id || null });
      }
    });
    todayList.sort(function (a, b) { return (a.time || '99:99') < (b.time || '99:99') ? -1 : 1; });

    /* 今日の試合の公開済み結果を探す */
    function findTodayResult(t) {
      var found = null;
      matches.forEach(function (m) {
        if (m.date !== todayStr) return;
        if (t.opponent && m.opponent !== t.opponent) return;
        var r = m.result;
        if (r && r.publish !== false && r.myScore != null && r.oppScore != null) found = m;
      });
      return found;
    }

    if (todayList.length > 0) {
      var t = todayList[0];
      var done = findTodayResult(t);
      if (done) { renderMdayResult(host, done); return; }
      renderMdayToday(host, t);
      return;
    }

    /* 今日試合なし → 14日以内の次の試合カウントダウン */
    var upcoming = [];
    schedules.forEach(function (sc) {
      if (sc.date > todayStr && isMatchLike(sc.type)) upcoming.push({ date: sc.date, time: sc.time || '', opponent: sc.opponent || '', comp: sc.competition || sc.type || '', category: sc.category || '' });
    });
    matches.forEach(function (m) {
      var hasResult = m.result && m.result.myScore != null;
      if (m.date > todayStr && !hasResult && !upcoming.some(function (u) { return u.date === m.date && u.opponent === (m.opponent || ''); })) {
        upcoming.push({ date: m.date, time: m.time || '', opponent: m.opponent || '', comp: m.competitionName || m.competition || m.type || '', category: m.category || '' });
      }
    });
    upcoming.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : (a.time || '') < (b.time || '') ? -1 : 1; });
    var next = upcoming[0];
    if (!next) return;
    var diffDays = (new Date(next.date + 'T00:00:00') - new Date(todayStr + 'T00:00:00')) / 86400000;
    if (diffDays > 14) return;
    renderMdayNext(host, next);
  }

  function mdayShell(cls, inner) {
    return '<div class="mday ' + cls + '"><div class="mday-stripes" aria-hidden="true"></div><div class="mday-inner">' + inner + '</div></div>';
  }

  /* 試合当日はヒーローの上（ページ最上部）に移動して、開いた瞬間に見えるようにする */
  function moveAboveHero(host) {
    var hero = document.querySelector('.hero');
    if (hero && hero.parentElement && host.nextElementSibling !== hero) {
      hero.parentElement.insertBefore(host, hero);
    }
  }

  /* 当日: MATCH DAY + カウントダウン */
  function renderMdayToday(host, t) {
    moveAboveHero(host);
    var hasTime = /^\d{1,2}:\d{2}$/.test(t.time || '');
    var ko = kickoffDate(t.date, t.time);
    host.innerHTML = mdayShell('mday--today',
      '<div class="mday-head"><span class="mday-flag">TODAY</span><span class="mday-title">MATCH DAY</span></div>' +
      '<div class="mday-vs">vs ' + esc(t.opponent || '対戦相手未定') + (t.category ? '<span class="mday-cat">' + esc(t.category) + '</span>' : '') + '</div>' +
      (t.comp ? '<div class="mday-comp">' + esc(t.comp) + '</div>' : '') +
      (hasTime
        ? '<div class="mday-count-label">KICK OFF まで</div><div class="mday-count" id="mday-count"></div>'
        : '<div class="mday-count-label">本日開催！ガンバレGRANDE！</div>')
    );
    host.style.display = 'block';
    if (!hasTime) return;
    var el = document.getElementById('mday-count');
    function tick() {
      var diff = ko - new Date();
      if (diff <= 0) {
        clearInterval(mdayTimer);
        el.parentElement.querySelector('.mday-count-label').textContent = '';
        el.innerHTML = '<span class="mday-live">⚽ KICK OFF! ガンバレ GRANDE!</span>';
        return;
      }
      var h = Math.floor(diff / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      el.innerHTML = digitsHtml(pad(h) + ':' + pad(m) + ':' + pad(s));
    }
    tick();
    mdayTimer = setInterval(tick, 1000);
  }

  /* 当日で結果公開済み: スコア表示 */
  function renderMdayResult(host, m) {
    moveAboveHero(host);
    var r = m.result;
    var win = r.myScore > r.oppScore;
    var lose = r.myScore < r.oppScore;
    var label = win ? 'WIN!' : lose ? 'FULL TIME' : 'DRAW';
    host.innerHTML = mdayShell('mday--result' + (win ? ' mday--win' : ''),
      '<div class="mday-head"><span class="mday-flag">TODAY</span><span class="mday-title">' + label + '</span></div>' +
      '<div class="mday-score-row">' +
        '<span class="mday-team">GRANDE</span>' +
        '<span class="mday-score">' + r.myScore + '<i>-</i>' + r.oppScore + '</span>' +
        '<span class="mday-team">' + esc(m.opponent || '') + '</span>' +
      '</div>' +
      '<div class="mday-comp">応援ありがとうございました！</div>'
    );
    host.style.display = 'block';
  }

  /* 通常時: 次の試合カウントダウン */
  function renderMdayNext(host, next) {
    var hasTime = /^\d{1,2}:\d{2}$/.test(next.time || '');
    var ko = kickoffDate(next.date, next.time);
    var dateDisp = next.date.replace(/-/g, '.');
    host.innerHTML = mdayShell('mday--next',
      '<div class="mday-head"><span class="mday-flag mday-flag--next">NEXT MATCH</span><span class="mday-next-date">' + esc(dateDisp) + (hasTime ? ' ' + esc(next.time) + ' KO' : '') + '</span></div>' +
      '<div class="mday-vs mday-vs--sm">vs ' + esc(next.opponent || '対戦相手未定') + (next.category ? '<span class="mday-cat">' + esc(next.category) + '</span>' : '') + '</div>' +
      '<div class="mday-count-label">キックオフまで</div><div class="mday-count mday-count--sm" id="mday-count"></div>'
    );
    host.style.display = 'block';
    var el = document.getElementById('mday-count');
    function tick() {
      var diff = ko - new Date();
      if (diff <= 0) { clearInterval(mdayTimer); setupOnDataOnceMore(); return; }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      el.innerHTML = (d > 0 ? digitsHtml(String(d) + '日') + '<span class="mday-gap"></span>' : '') + digitsHtml(pad(h) + ':' + pad(m) + ':' + pad(s));
    }
    tick();
    mdayTimer = setInterval(tick, 1000);
  }

  var lastDetail = null;
  function setupOnDataOnceMore() { if (lastDetail) setupMatchday(lastDetail); }

  /* ══════════════ 4. スコアのカウントアップ演出＋勝利エフェクト ══════════════ */
  var confettiDone = false;

  function launchConfetti(originEl) {
    if (confettiDone || reduceMotion) return;
    confettiDone = true;
    var rect = originEl.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    var colors = ['#c8a94a', '#e8d48b', '#ffffff', '#1f8a4c'];
    for (var i = 0; i < 26; i++) {
      var p = document.createElement('div');
      p.className = 'gv-confetti';
      var ang = Math.random() * Math.PI * 2;
      var dist = 60 + Math.random() * 120;
      p.style.left = cx + 'px';
      p.style.top = cy + 'px';
      p.style.background = colors[i % colors.length];
      p.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
      p.style.setProperty('--dy', (Math.sin(ang) * dist - 80) + 'px');
      p.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
      p.style.animationDelay = (Math.random() * 0.15) + 's';
      document.body.appendChild(p);
      (function (el) { setTimeout(function () { el.remove(); }, 1600); })(p);
    }
  }

  function animateScore(el) {
    var target = parseInt(el.textContent, 10);
    if (isNaN(target)) return;
    if (reduceMotion) return;
    var frames = 14 + Math.min(target, 6) * 3;
    var f = 0;
    el.classList.add('score-rolling');
    var iv = setInterval(function () {
      f++;
      if (f >= frames) {
        clearInterval(iv);
        el.textContent = target;
        el.classList.remove('score-rolling');
        el.classList.add('score-landed');
        return;
      }
      /* 回転中はランダム数字（電光掲示板がカラカラ回るイメージ） */
      el.textContent = Math.floor(Math.random() * 10);
    }, 45);
  }

  function setupResultAnimations() {
    var list = document.getElementById('results-list');
    if (!list) return;

    function arm() {
      var rows = list.querySelectorAll('.result-row');
      if (!rows.length) return;
      rows.forEach(function (row) {
        if (row.dataset.gvArmed) return;
        row.dataset.gvArmed = '1';
        var isWin = !!row.querySelector('.badge-win');
        if (isWin) row.classList.add('row-win');
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            io.disconnect();
            row.querySelectorAll('.score-num').forEach(animateScore);
            if (isWin) {
              row.classList.add('row-win-glow');
              setTimeout(function () { launchConfetti(row.querySelector('.result-badge') || row); }, 700);
            }
          });
        }, { threshold: 0.6 });
        io.observe(row);
      });
    }
    arm();
    /* タブ切り替えで再描画されたら再アーム */
    new MutationObserver(arm).observe(list, { childList: true });
  }

  /* ══════════════ 起動 ══════════════ */
  document.addEventListener('grande:data', function (e) {
    lastDetail = e.detail || {};
    try { setupMatchday(lastDetail); } catch (err) { console.error('[mday]', err); }
    try { setupResultAnimations(); } catch (err) { console.error('[score-fx]', err); }
  });

  /* イベントが来ないページでも結果リストがあれば演出を有効化 */
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(setupResultAnimations, 1200);
  });
})();
