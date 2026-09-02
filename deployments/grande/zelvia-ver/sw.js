/* GRANDE FC PWA Service Worker
   方針: ネットワーク優先＋キャッシュフォールバック。
   常に最新を取りに行き、オフライン時だけ最後に見た内容を表示する。
   （キャッシュが古いまま残る事故を起こさない安全設計） */
var CACHE = 'grande-v2';

self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  // 外部（Firebase・フォント等）はブラウザに任せる
  if (url.origin !== self.location.origin) return;

  // HTML（ページ本体）はブラウザのHTTPキャッシュを使わず毎回サーバーに確認する。
  // ホーム画面アプリで「更新したはずのページが古いまま」になるのを防ぐ
  var isDoc = req.mode === 'navigate' || req.destination === 'document' || /\.html$/.test(url.pathname) || /\/$/.test(url.pathname);
  var netReq = isDoc ? new Request(req, { cache: 'no-cache' }) : req;

  e.respondWith(
    fetch(netReq).then(function (res) {
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (cached) {
        return cached || Response.error();
      });
    })
  );
});
