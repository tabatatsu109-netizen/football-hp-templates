/* ============================================================
   ヘッダー共通UI（全ページで <head> から読み込む）
   ------------------------------------------------------------
   1. ナイトゲームモード
      ・18:00〜翌4:59 は自動でナイト、それ以外はデイ
      ・ヘッダーの ☀/🌙 ボタンで手動切替。以降は手動設定を優先（localStorage）
      ・<head> で読み込むこと。描画前に data-theme を付けてチラつきを防ぐ
      ・配色は css/style.css の :root[data-theme="night"] にまとまっている

   2. 戻るボタン
      ・ホーム画面から起動したPWAにはブラウザの戻るが無いため、ヘッダーに出す
      ・通常のブラウザには戻るボタンがあるので表示しない
      ・トップページでは出さない
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'gv-theme';
  var root = document.documentElement;

  function autoTheme() {
    var h = new Date().getHours();
    return (h >= 18 || h < 5) ? 'night' : 'day';
  }

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return (v === 'night' || v === 'day') ? v : null;
    } catch (e) { return null; }
  }

  function apply(t) {
    if (t === 'night') {
      root.setAttribute('data-theme', 'night');
      // config-loader がインラインで入れたブランド色を外し、CSS のナイト配色に譲る
      root.style.removeProperty('--main-color');
    } else {
      root.removeAttribute('data-theme');
      var brand = root.style.getPropertyValue('--brand-main');
      if (brand) root.style.setProperty('--main-color', brand);
    }
  }

  var current = stored() || autoTheme();
  apply(current); // ← 描画前に適用（FOUC 回避）

  function icon() { return current === 'night' ? '☀' : '🌙'; }
  function label() { return current === 'night' ? 'デイモードに切り替え' : 'ナイトモードに切り替え'; }

  function mount() {
    var host = document.querySelector('.gh-actions');
    if (!host || document.getElementById('theme-toggle')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'theme-toggle';
    btn.className = 'gh-theme';
    btn.textContent = icon();
    btn.title = label();
    btn.setAttribute('aria-label', label());

    btn.addEventListener('click', function () {
      current = (current === 'night') ? 'day' : 'night';
      apply(current);
      try { localStorage.setItem(KEY, current); } catch (e) {}
      btn.textContent = icon();
      btn.title = label();
      btn.setAttribute('aria-label', label());
    });

    // 体験申込CTAの手前に置き、CTAは右端のまま残す
    var cta = host.querySelector('.gh-cta');
    host.insertBefore(btn, cta || host.firstChild);
  }

  /* ── 戻るボタン ───────────────────────────────── */

  // ホーム画面から起動した状態か（iOS は navigator.standalone）
  function isStandalone() {
    try {
      if (window.navigator.standalone === true) return true;
      return window.matchMedia('(display-mode: standalone)').matches ||
             window.matchMedia('(display-mode: fullscreen)').matches ||
             window.matchMedia('(display-mode: minimal-ui)').matches;
    } catch (e) { return false; }
  }

  function isTopPage() {
    var p = location.pathname;
    return /(^|\/)(index\.html)?$/.test(p);
  }

  // 同一サイト内から来たか（戻り先があるか）
  function cameFromSameSite() {
    if (!document.referrer) return false;
    try { return new URL(document.referrer).origin === location.origin; }
    catch (e) { return false; }
  }

  function mountBack() {
    var inner = document.querySelector('.gh-inner');
    if (!inner || document.getElementById('gh-back')) return;

    // 通常のブラウザには戻るボタンがあるので出さない。?back=1 で強制表示（確認用）
    var force = /[?&]back=1/.test(location.search);
    if (!force && (!isStandalone() || isTopPage())) return;

    var b = document.createElement('button');
    b.type = 'button';
    b.id = 'gh-back';
    b.className = 'gh-back';
    b.title = '前のページに戻る';
    b.setAttribute('aria-label', '前のページに戻る');
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' +
                  '<path d="M15.5 4.5 8 12l7.5 7.5" fill="none" stroke="currentColor" ' +
                  'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    b.addEventListener('click', function () {
      // 同一サイト内から来ていれば履歴を戻る。直接開かれた場合はトップへ
      if (cameFromSameSite() && history.length > 1) history.back();
      else location.href = 'index.html';
    });

    inner.insertBefore(b, inner.firstChild);
  }

  function init() { mount(); mountBack(); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
