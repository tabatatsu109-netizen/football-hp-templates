/* ============================================================
   ナイトゲームモード
   ------------------------------------------------------------
   ・18:00〜翌4:59 は自動でナイト、それ以外はデイ
   ・ヘッダーの ☀/🌙 ボタンで手動切替。以降は手動設定を優先（localStorage）
   ・<head> で読み込むこと。描画前に data-theme を付けてチラつきを防ぐ

   ※ 配色は css/style.css の :root[data-theme="night"] にまとまっている
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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
