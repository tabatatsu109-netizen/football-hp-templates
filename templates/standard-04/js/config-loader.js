/**
 * ConfigLoader
 * config/club-config.json を fetch し、DOM と CSS 変数へ自動反映する。
 *
 * 【他テンプレートへの共通利用方法】
 *   1. このファイルを js/config-loader.js としてコピー
 *   2. HTML の </body> 前に以下を追加:
 *
 *      <script src="js/config-loader.js"></script>
 *      <script>
 *        ConfigLoader.apply({
 *          pageTitle: 'ページ名',
 *          mappings: [
 *            { path: 'pages.home.heroTitle', selector: '#hero-title' },
 *          ],
 *          onLoaded: function(c) {
 *            // ページ固有の処理
 *          }
 *        });
 *      </script>
 *
 * 【CSS変数】
 *   --main-color  : design.mainColor
 *   --sub-color   : design.subColor
 *   --accent-color: design.accentColor
 *
 * 【デフォルトで自動反映される要素 (ID)】
 *   #club-logo           : ロゴ画像 src
 *   #club-name           : club.name
 *   #footer-club-name    : club.name
 *   #footer-club-name-copy: club.name
 *   #footer-address      : contact.address
 *   #footer-phone        : contact.phone
 *   #footer-email        : contact.email
 *   #sns-instagram       : sns.instagram (設定時のみ表示)
 *   #sns-facebook        : sns.facebook  (設定時のみ表示)
 *   #sns-youtube         : sns.youtube   (設定時のみ表示)
 *   #sns-line            : sns.lineUrl   (設定時のみ表示)
 */

const ConfigLoader = (function () {

  const CONFIG_PATH = 'config/club-config.json';

  /** ネストされたパス (例: 'pages.home.heroTitle') で値を取得 */
  function get(obj, path) {
    return path.split('.').reduce(function (o, k) {
      return (o != null && o[k] !== undefined) ? o[k] : null;
    }, obj);
  }

  /** セレクタに一致する全要素のテキストを更新 */
  function setText(selector, value) {
    if (value === null || value === undefined) return;
    document.querySelectorAll(selector).forEach(function (el) {
      el.textContent = value;
    });
  }

  /** CSS カスタムプロパティを更新 */
  function applyCSSVars(c) {
    var root = document.documentElement;
    var main   = get(c, 'design.mainColor');
    var sub    = get(c, 'design.subColor');
    var accent = get(c, 'design.accentColor');
    if (main)   root.style.setProperty('--main-color',   main);
    if (sub)    root.style.setProperty('--sub-color',    sub);
    if (accent) root.style.setProperty('--accent-color', accent);
  }

  /** ロゴ画像を反映 */
  function applyLogo(c) {
    var logoSrc = get(c, 'design.logo');
    var el = document.getElementById('club-logo');
    if (el && logoSrc) {
      el.src = logoSrc;
      el.style.display = 'block';
    }
  }

  /** ファビコンを反映 */
  function applyFavicon(c) {
    var favicon = get(c, 'design.favicon');
    if (!favicon) return;
    var link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = favicon;
  }

  /** SNS リンクを反映 (URL が設定されているもののみ表示) */
  function applySNS(c) {
    var snsMap = {
      'sns-instagram': get(c, 'sns.instagram'),
      'sns-facebook':  get(c, 'sns.facebook'),
      'sns-youtube':   get(c, 'sns.youtube'),
      'sns-line':      get(c, 'sns.lineUrl')
    };
    Object.keys(snsMap).forEach(function (id) {
      var url = snsMap[id];
      var el = document.getElementById(id);
      if (el && url) {
        el.href = url;
        el.style.display = '';
      }
    });
  }

  /** 共通要素 (クラブ名・フッター等) を反映 */
  function applyDefaults(c) {
    applyCSSVars(c);
    applyLogo(c);
    applyFavicon(c);
    applySNS(c);

    setText('#club-name',             get(c, 'club.name'));
    setText('#club-short-name',       get(c, 'club.shortName'));
    setText('#footer-club-name',      get(c, 'club.name'));
    setText('#footer-club-name-copy', get(c, 'club.name'));
    setText('#footer-address',        get(c, 'contact.address'));
    setText('#footer-phone',          get(c, 'contact.phone'));
    setText('#footer-email',          get(c, 'contact.email'));
  }

  /** ページタイトルを設定 */
  function applyPageTitle(c, suffix) {
    var name = get(c, 'club.name') || '';
    document.title = suffix ? (name + ' | ' + suffix) : name;
  }

  /** club-config.json を fetch して返す */
  async function load() {
    var res = await fetch(CONFIG_PATH);
    if (!res.ok) throw new Error('club-config.json の読み込みに失敗しました (' + res.status + ')');
    return res.json();
  }

  /**
   * 設定を読み込み、DOM へ反映する
   *
   * @param {Object} options
   * @param {string}   options.pageTitle    - <title> のサフィックス (例: 'ホームページ')
   * @param {Array}    options.mappings     - ページ固有のマッピング配列
   *                                          [{ path: 'pages.home.heroTitle', selector: '#hero-title' }, ...]
   * @param {Function} options.onLoaded     - 反映後に実行するコールバック (config を引数で受け取る)
   * @returns {Promise<Object>} 読み込んだ config オブジェクト
   */
  async function apply(options) {
    options = options || {};
    try {
      var c = await load();

      if (options.pageTitle) applyPageTitle(c, options.pageTitle);

      applyDefaults(c);

      // ページ固有マッピング
      if (Array.isArray(options.mappings)) {
        options.mappings.forEach(function (m) {
          setText(m.selector, get(c, m.path));
        });
      }

      // ページ固有コールバック
      if (typeof options.onLoaded === 'function') {
        options.onLoaded(c);
      }

      return c;
    } catch (err) {
      console.error('[ConfigLoader]', err);
      throw err;
    }
  }

  return { load: load, apply: apply, get: get };

})();
