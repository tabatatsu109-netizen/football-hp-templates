/* ================================================
   GRANDE FX — トップページ演出
   キネマティック・ヒーロー / 光の粒 / スクロール演出 / 小技
   既存機能（config-loader・match-planner-connector）には触れない
   ================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var isMobile = window.matchMedia('(max-width: 720px)').matches;

  var SLIDES = [
    'assets/hero/slide1.jpg', 'assets/hero/slide2.jpg', 'assets/hero/slide3.jpg',
    'assets/hero/slide4.jpg', 'assets/hero/slide5.jpg', 'assets/hero/slide6.jpg',
    'assets/hero/slide7.jpg', 'assets/hero/slide8.jpg'
  ];
  var SLIDE_SEC = 7;      // 1枚の表示秒数
  var FADE_SEC = 1.4;     // クロスフェード秒数

  /* ================================================
     ローディング演出（エンブレム）
     最低1.1秒表示 → せり上がって開場。戻り値は
     ヒーロー演出の開始を待たせる秒数
     ================================================ */
  function initLoader() {
    var loader = document.getElementById('fx-loader');
    if (!loader) return 0;
    if (reduceMotion || typeof gsap === 'undefined') { loader.remove(); return 0; }

    var MIN_SHOW = 2400; // ms（読み込みが速くても一瞬で消えない）
    var wait = Math.max(0, MIN_SHOW - performance.now()) / 1000;

    // 退場演出：エンブレムがひと呼吸ため→光のバーストと共に弾けて幕が上がる
    gsap.timeline({ delay: wait })
      .to('.fx-loader-text', { opacity: 0, y: 10, duration: 0.3 })
      .to('.fx-loader-logo', { scale: 0.9, duration: 0.28, ease: 'power2.in' }, '<')
      .to('.fx-loader-burst', { opacity: 1, scale: 2.6, duration: 0.55, ease: 'power2.out' })
      .to('.fx-loader-logo', { scale: 2.4, opacity: 0, duration: 0.5, ease: 'power3.in' }, '<')
      .to('.fx-loader-ring', { opacity: 0, duration: 0.3 }, '<')
      .to('.fx-loader-burst', { opacity: 0, duration: 0.3 }, '-=0.15')
      .to(loader, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '-=0.25')
      .add(function () { loader.remove(); });

    return wait + 1.1; // ヒーロー演出はカーテンが上がり始めてから
  }

  /* ================================================
     ヒーロー写真スライドショー（Ken Burns）
     reduced motion 時は1枚目を静止表示
     ================================================ */
  function initSlides() {
    var wrap = document.getElementById('hero-slides');
    var hero = document.getElementById('top');
    if (!wrap || !hero) return;

    // 既存の背景写真（fixed添付）は不要になるので外す
    hero.style.backgroundImage = 'none';

    var els = SLIDES.map(function (src, i) {
      var d = document.createElement('div');
      d.className = 'fx-slide';
      if (i === 0) d.style.backgroundImage = 'url("' + src + '")';
      d.dataset.src = src;
      wrap.insertBefore(d, wrap.firstChild);
      return d;
    });

    els[0].style.opacity = '1';

    if (reduceMotion || typeof gsap === 'undefined') return; // 静止1枚で終了

    // 残りの写真は初回描画後に読み込む
    setTimeout(function () {
      els.forEach(function (d) {
        if (!d.style.backgroundImage) d.style.backgroundImage = 'url("' + d.dataset.src + '")';
      });
    }, 1200);

    var idx = 0;
    function kenburns(el) {
      gsap.fromTo(el, { scale: 1.02 }, { scale: 1.14, duration: SLIDE_SEC + FADE_SEC + 1, ease: 'none' });
    }
    kenburns(els[0]);

    setInterval(function () {
      var prev = els[idx];
      idx = (idx + 1) % els.length;
      var next = els[idx];
      kenburns(next);
      gsap.to(next, { opacity: 1, duration: FADE_SEC, ease: 'power2.inOut' });
      gsap.to(prev, { opacity: 0, duration: FADE_SEC, ease: 'power2.inOut', delay: 0.15 });
    }, SLIDE_SEC * 1000);
  }

  /* ================================================
     ヒーロータイトル：1文字ずつ叩き込み＋光のライン
     ================================================ */
  function initHeroTitle(extraDelay) {
    extraDelay = extraDelay || 0;
    if (reduceMotion || typeof gsap === 'undefined') return;
    var lines = [document.getElementById('hero-catch-line1'), document.getElementById('hero-catch-line2')];
    var chars = [];
    lines.forEach(function (line) {
      if (!line) return;
      var text = line.textContent;
      line.textContent = '';
      Array.prototype.forEach.call(text, function (c) {
        var s = document.createElement('span');
        s.className = 'fx-ch';
        s.textContent = c === ' ' ? ' ' : c;
        line.appendChild(s);
        chars.push(s);
      });
    });
    if (!chars.length) return;

    gsap.from(chars, {
      opacity: 0, y: 70, rotateX: -50,
      duration: 0.85, stagger: 0.05, ease: 'power4.out', delay: 0.15 + extraDelay,
    });

    // 光のラインを1回走らせる
    var sweep = document.querySelector('.hero-sweep');
    if (sweep) {
      gsap.fromTo(sweep,
        { left: '-30%', opacity: 1 },
        { left: '110%', opacity: 1, duration: 1.4, ease: 'power2.inOut', delay: 0.8 + extraDelay,
          onComplete: function () { sweep.style.opacity = 0; } });
    }
  }

  /* ================================================
     スクロール出現演出
     動的注入コンテンツ（pillars/results/news等）にも対応：
     一定間隔で未処理の子要素を拾って登録する
     ================================================ */
  function initReveals() {
    if (reduceMotion || typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    var HEAD_SEL = '.section-en, .section-ja, .section-ja-dark, .section-desc, .pickup-head-en, .members-en, .members-title, .faces-en, .faces-title, .faces-desc, .faces-btn';
    // #results-list は専用演出（initResultsFx）が担当するため含めない
    var GRID_SEL = ['#pillars-grid', '#news-list', '#match-next-inner', '#pickup-grid', '#players-grid'];

    function register(el, delay) {
      if (el.dataset.fxDone) return;
      el.dataset.fxDone = '1';
      el.classList.add('fx-reveal');
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: delay || 0,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    }

    document.querySelectorAll(HEAD_SEL).forEach(function (el) { register(el); });

    // 動的グリッド：10秒間ポーリングして後着の子要素も演出に乗せる
    var tries = 0;
    var timer = setInterval(function () {
      tries++;
      GRID_SEL.forEach(function (sel) {
        var grid = document.querySelector(sel);
        if (!grid) return;
        Array.prototype.forEach.call(grid.children, function (child, i) {
          register(child, (i % 4) * 0.09);
        });
      });
      if (tries > 20) clearInterval(timer);
      ScrollTrigger.refresh();
    }, 500);
  }

  /* ================================================
     FACES：写真ピーカブー・グリッド
     写真はHTMLに直接埋め込み済み（JSなしでも静的グリッドとして表示される）。
     JSが使える場合のみ「出たり引っ込んだり」の演出を上乗せする。
     ================================================ */
  function initFaces() {
    var grid = document.getElementById('faces-grid');
    if (!grid) return;
    var imgs = Array.prototype.slice.call(grid.querySelectorAll('.faces-cell img'));
    if (!imgs.length) return;

    // 演出なし環境では静的グリッドのまま
    if (reduceMotion || typeof gsap === 'undefined') return;

    // 入れ替え用の写真プール（HTML埋め込み分＋予備）
    var pool = imgs.map(function (im) { return im.getAttribute('src'); })
      .concat(['assets/faces/face11.jpg', 'assets/faces/face12.jpg', 'assets/faces/face13.jpg', 'assets/faces/face14.jpg']);
    for (var i = pool.length - 1; i > 0; i--) {
      var k = Math.floor(Math.random() * (i + 1));
      var t = pool[i]; pool[i] = pool[k]; pool[k] = t;
    }
    var next = 0;
    function nextPhoto() { return pool[next++ % pool.length]; }

    imgs.forEach(function (img, i) {
      function show() {
        gsap.fromTo(img, { yPercent: 103 }, { yPercent: 0, duration: 0.55, ease: 'back.out(1.5)' });
        setTimeout(hide, 2400 + Math.random() * 3000);
      }
      function hide() {
        gsap.to(img, {
          yPercent: 103, duration: 0.45, ease: 'power2.in',
          onComplete: function () {
            img.src = nextPhoto(); // 引っ込んでいる間に次の写真へ入れ替え
            setTimeout(show, 600 + Math.random() * 2400);
          },
        });
      }
      // 最初は表示されている状態から、時間差で一度引っ込めてループ開始
      setTimeout(hide, 1200 + i * 300 + Math.random() * 1500);
    });
  }

  /* ================================================
     試合結果：スタジアム掲示板演出
     行入場 → スコアロール → 勝敗バッジのスタンプ
     connector がタブ切替で再描画するたびに毎回再生
     ================================================ */
  function initResultsFx() {
    if (reduceMotion || typeof gsap === 'undefined') return;
    var list = document.getElementById('results-list');
    if (!list) return;

    var armed = false; // MATCHセクションが見えてから初回再生

    // 1桁スコア: 0〜実スコアを縦に積んだローラー / 2桁以上: カウントアップ
    function buildScorePlayer(numEl) {
      var val = parseInt(numEl.textContent, 10);
      if (isNaN(val)) return null;
      if (val > 9) {
        var obj = { v: 0 };
        return function (delay) {
          gsap.to(obj, {
            v: val, duration: 0.9, delay: delay, ease: 'power2.out',
            onUpdate: function () { numEl.textContent = Math.round(obj.v); },
          });
        };
      }
      var col = document.createElement('span');
      col.className = 'fx-roll-col';
      for (var n = 0; n <= val; n++) {
        var d = document.createElement('span');
        d.textContent = n;
        col.appendChild(d);
      }
      numEl.textContent = '';
      numEl.classList.add('fx-roll');
      numEl.appendChild(col);
      return function (delay) {
        gsap.fromTo(col, { yPercent: 0 }, {
          yPercent: -100 * val / (val + 1),
          duration: 0.4 + val * 0.14, delay: delay, ease: 'power3.out',
        });
      };
    }

    function animate() {
      var rows = list.querySelectorAll('.result-row');
      Array.prototype.forEach.call(rows, function (row, i) {
        if (row.dataset.fxScored) return;
        row.dataset.fxScored = '1';
        var base = i * 0.13;
        gsap.fromTo(row, { opacity: 0, x: -28 }, { opacity: 1, x: 0, duration: 0.6, delay: base, ease: 'power3.out' });
        row.querySelectorAll('.score-num').forEach(function (numEl, j) {
          var play = buildScorePlayer(numEl);
          if (play) play(base + 0.35 + j * 0.15);
        });
        var badge = row.querySelector('.result-badge');
        if (badge) {
          gsap.fromTo(badge,
            { scale: 2.4, opacity: 0, rotation: -25 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.55, delay: base + 0.9, ease: 'back.out(2.2)',
              onStart: function () { badge.classList.add('fx-stamp'); } });
        }
      });
    }

    // MATCHセクションに到達したら初回再生
    ScrollTrigger.create({
      trigger: '#match',
      start: 'top 75%',
      once: true,
      onEnter: function () { armed = true; animate(); },
    });

    // タブ切替（connectorの再描画）を監視して毎回再生
    var mo = new MutationObserver(function (muts) {
      if (!armed) return;
      var hasNewRow = muts.some(function (m) {
        return Array.prototype.some.call(m.addedNodes, function (n) {
          return n.nodeType === 1 && n.classList && n.classList.contains('result-row');
        });
      });
      if (hasNewRow) animate();
    });
    mo.observe(list, { childList: true });
  }

  /* ================================================
     小技：マグネットボタン / カスタムカーソル / ヘッダー隠れ
     ================================================ */
  function initMicro() {
    // ヘッダー：下スクロールで隠れ、上で出る（全環境）
    var header = document.querySelector('.site-header');
    if (header) {
      var lastY = window.scrollY;
      window.addEventListener('scroll', function () {
        var y = window.scrollY;
        if (y > lastY && y > 140) header.classList.add('fx-header-hidden');
        else header.classList.remove('fx-header-hidden');
        lastY = y;
      }, { passive: true });
    }

    if (!finePointer || reduceMotion || typeof gsap === 'undefined') return;

    // マグネットボタン
    document.querySelectorAll('.hero-btn-primary, .hero-btn-secondary, .news-more, .players-more').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * 0.25,
          y: (e.clientY - r.top - r.height / 2) * 0.3,
          duration: 0.4, ease: 'power3.out',
        });
      });
      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, .45)' });
      });
    });

    // カスタムカーソル（GRANDEロゴ）
    var cursor = document.createElement('div');
    cursor.className = 'fx-cursor is-on';
    document.body.appendChild(cursor);
    gsap.set(cursor, { xPercent: -50, yPercent: -50 }); // ポインタの中心にボールを重ねる
    var qx = gsap.quickTo(cursor, 'x', { duration: 0.22, ease: 'power3.out' });
    var qy = gsap.quickTo(cursor, 'y', { duration: 0.22, ease: 'power3.out' });
    window.addEventListener('pointermove', function (e) { qx(e.clientX); qy(e.clientY); });
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('a, button')) cursor.classList.add('is-active');
      else cursor.classList.remove('is-active');
    });
  }

  /* ================================================
     Three.js — 光の粒（ヒーローのみ・省電力設計）
     ================================================ */
  function initParticles(introDelay) {
    if (reduceMotion || typeof THREE === 'undefined') return;
    var canvas = document.getElementById('hero-fx');
    var heroEl = document.getElementById('top');
    if (!canvas || !heroEl) return;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false });
    } catch (e) { canvas.style.display = 'none'; return; }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
    camera.position.z = 9;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));

    function makePoints(count, color, size, opacity) {
      var pos = new Float32Array(count * 3);
      for (var i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 22;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 9;
      }
      var geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      var pts = new THREE.Points(geo, new THREE.PointsMaterial({
        color: color, size: size, transparent: true, opacity: opacity,
        blending: THREE.AdditiveBlending, depthWrite: false,
      }));
      scene.add(pts);
      return pts;
    }
    var green = makePoints(isMobile ? 200 : 500, 0x9fe870, 0.05, 0.65);
    var white = makePoints(isMobile ? 70 : 170, 0xe8f4ff, 0.032, 0.4);

    /* ── エンブレム形成（ロード直後の一回演出）──
       形成専用の高密度パーティクル群を別に用意し、
       ロゴのピクセル位置・色に向かって飛来 → 数秒静止 → 拡散して消える。
       加算合成では「色＝黒」が透明扱いになるため、消灯はカラーのフェードで行う */
    var form = { f: 0, active: false, pts: null, homes: null, targets: null, jits: null };

    function setupEmblemFormation() {
      if (typeof gsap === 'undefined') return;
      var img = new Image();
      img.onload = function () {
        try {
          var S = 128;
          var cv = document.createElement('canvas');
          cv.width = S; cv.height = S;
          var ctx = cv.getContext('2d');
          ctx.drawImage(img, 0, 0, S, S);
          var data = ctx.getImageData(0, 0, S, S).data;
          var px = [];
          for (var y = 0; y < S; y++) {
            for (var x = 0; x < S; x++) {
              var o = (y * S + x) * 4;
              // 透過部分と黒背景は除外してエンブレムの絵柄だけ拾う
              if (data[o + 3] < 128) continue;
              if (data[o] + data[o + 1] + data[o + 2] < 90) continue;
              px.push([x, y, data[o] / 255, data[o + 1] / 255, data[o + 2] / 255]);
            }
          }
          if (px.length < 50) return;

          // ピクセルを均等に使うためシャッフル
          for (var s = px.length - 1; s > 0; s--) {
            var k = Math.floor(Math.random() * (s + 1));
            var tmp = px[s]; px[s] = px[k]; px[k] = tmp;
          }

          var count = isMobile ? 1800 : 4200;
          // カメラの視野からエンブレム直径を算出（スマホ幅でもはみ出さない）
          var visH = 2 * camera.position.z * Math.tan(camera.fov * Math.PI / 360);
          var visW = visH * camera.aspect;
          var dia = Math.min(visW, visH) * 0.62;

          form.homes = new Float32Array(count * 3);
          form.targets = new Float32Array(count * 3);
          form.jits = new Float32Array(count);
          var pos = new Float32Array(count * 3);
          var col = new Float32Array(count * 3);
          for (var i = 0; i < count; i++) {
            var p = px[i % px.length];
            var i3 = i * 3;
            // 飛来元：画面全体に散らばったランダム位置
            form.homes[i3] = (Math.random() - 0.5) * 22;
            form.homes[i3 + 1] = (Math.random() - 0.5) * 12;
            form.homes[i3 + 2] = (Math.random() - 0.5) * 6;
            form.targets[i3] = (p[0] / S - 0.5) * dia;
            form.targets[i3 + 1] = (0.5 - p[1] / S) * dia;
            form.targets[i3 + 2] = (Math.random() - 0.5) * 0.15;
            // 加算合成で暗い色が沈まないよう少し明るく補正
            col[i3] = Math.min(1, p[2] * 1.25);
            col[i3 + 1] = Math.min(1, p[3] * 1.25);
            col[i3 + 2] = Math.min(1, p[4] * 1.25);
            form.jits[i] = Math.random() * 0.35;
            pos[i3] = form.homes[i3]; pos[i3 + 1] = form.homes[i3 + 1]; pos[i3 + 2] = form.homes[i3 + 2];
          }
          var geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
          geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
          // 出し入れはマテリアル全体の透明度で行う（開始時は透明）
          form.pts = new THREE.Points(geo, new THREE.PointsMaterial({
            size: isMobile ? 0.055 : 0.075, transparent: true, opacity: 0,
            vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false,
          }));
          scene.add(form.pts);
          form.active = true;

          // 写真を暗くした時に裏の明色ページ背景が透けないよう下地を暗色に
          heroEl.style.backgroundColor = '#0a0a0c';

          gsap.timeline({ delay: (introDelay || 0) + 0.2 })
            // 背景写真を暗くしてエンブレムを浮かび上がらせる
            .to('#hero-slides', { opacity: 0.3, duration: 1.2, ease: 'power2.inOut' }, 0)
            .to(form, { f: 1, duration: 1.6, ease: 'power3.inOut' }, 0)
            .to(form, { f: 0, duration: 1.6, ease: 'power3.inOut' }, '+=2.2')
            .to('#hero-slides', { opacity: 1, duration: 1.2, ease: 'power2.inOut' }, '<')
            .add(function () {
              form.active = false;
              scene.remove(form.pts);
              form.pts.geometry.dispose();
              form.pts.material.dispose();
              form.pts = null;
            });
        } catch (e) { /* 失敗時は通常パーティクルのまま */ }
      };
      img.src = 'assets/logo.png';
    }
    setupEmblemFormation();

    var target = { x: 0, y: 0 };
    window.addEventListener('pointermove', function (e) {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function resize() {
      var w = heroEl.clientWidth, h = heroEl.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    var visible = true;
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }).observe(heroEl);

    var clock = new THREE.Clock();
    (function loop() {
      requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      var t = clock.getElapsedTime();
      green.rotation.y = t * 0.02;
      white.rotation.y = -t * 0.014;
      green.position.y = Math.sin(t * 0.35) * 0.3;

      if (form.active && form.pts) {
        form.pts.material.opacity = form.f;
        var pa = form.pts.geometry.attributes.position.array;
        var n = form.pts.geometry.attributes.position.count;
        for (var i = 0; i < n; i++) {
          // 粒ごとに到着タイミングをずらす（ばらばらに飛んでくる感じ）
          var p = Math.min(1, Math.max(0, form.f * 1.35 - form.jits[i]));
          p = p * p * (3 - 2 * p);
          var i3 = i * 3;
          var wob = Math.sin(t * 2 + i) * 0.008 * p;
          pa[i3] = form.homes[i3] + (form.targets[i3] - form.homes[i3]) * p;
          pa[i3 + 1] = form.homes[i3 + 1] + (form.targets[i3 + 1] - form.homes[i3 + 1]) * p + wob;
          pa[i3 + 2] = form.homes[i3 + 2] + (form.targets[i3 + 2] - form.homes[i3 + 2]) * p;
        }
        form.pts.geometry.attributes.position.needsUpdate = true;
      }

      camera.position.x += (target.x * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (-target.y * 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    })();
  }

  /* ================================================
     起動：config-loader の注入と競合しないよう window load 後
     ================================================ */
  window.addEventListener('load', function () {
    var introDelay = initLoader();
    initSlides();
    initHeroTitle(introDelay);
    initReveals();
    initResultsFx();
    initFaces();
    initMicro();
    initParticles(introDelay);
  });
})();
