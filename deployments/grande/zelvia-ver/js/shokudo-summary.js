/* ============================================================
   グランデ食堂 — 公開用サマリー共通モジュール
   ------------------------------------------------------------
   ★ここで扱うのは「匿名の集計値」のみ。
     選手名・食数金額・請求額・BMI・出席記録は会員ページ限定。
     このファイルからは絶対に個人情報を出力しないこと。

   ※ STADIUM / CAREER の内容は shokudo-forest.html(会員ページ)と
     同じ値に保つこと。片方だけ変更するとレベル表示がズレる。
   ============================================================ */
(function (global) {
  'use strict';

  var STADIUM_STEP = 100; // 100食ごとにスタジアムが1レベル進化

  var STADIUM = [
    { th: 0,   name: 'グラウンド予定地（土のグラウンド）', img: 'assets/forest/stadium-1.jpg' },
    { th: 100, name: '白線完成！コートができた',           img: 'assets/forest/stadium-2.jpg' },
    { th: 200, name: '芝生のピッチ完成！',                 img: 'assets/forest/stadium-3.jpg' },
    { th: 300, name: 'ベンチ・フェンス設置',               img: null },
    { th: 400, name: 'ナイター照明が立つ',                 img: null },
    { th: 500, name: '観客席ができる',                     img: null },
    { th: 600, name: 'スタンド拡張',                       img: null },
    { th: 700, name: '大型ビジョン設置',                   img: null },
    { th: 800, name: '屋根付きメインスタンド',             img: null },
    { th: 900, name: '満員の大スタジアム！',               img: null }
  ];

  var CAREER = [
    { th: 1,   name: 'ボールと出会う',   title: '見習い',       img: 'assets/forest/career-1.jpg' },
    { th: 10,  name: '特訓の日々',       title: 'ルーキー',     img: 'assets/forest/career-2.jpg' },
    { th: 20,  name: 'ユニフォーム授与', title: 'レギュラー',   img: 'assets/forest/career-3.jpg' },
    { th: 30,  name: 'スタジアムへ',     title: 'エース',       img: 'assets/forest/career-4.jpg' },
    { th: 40,  name: 'プロ契約',         title: 'プロ',         img: 'assets/forest/career-5.jpg' },
    { th: 50,  name: 'デビュー戦へ',     title: 'プロ1年目',    img: 'assets/forest/career-6.jpg' },
    { th: 60,  name: '初ゴール！',       title: '点取り屋',     img: 'assets/forest/career-7.jpg' },
    { th: 70,  name: '背番号10',         title: '10番',         img: null },
    { th: 80,  name: '優勝',             title: 'チャンピオン', img: null },
    { th: 90,  name: '海外挑戦',         title: '海外組',       img: null },
    { th: 100, name: '日本代表',         title: '代表戦士',     img: null },
    { th: 110, name: 'W杯の舞台',        title: '世界のスター', img: null },
    { th: 120, name: '殿堂入り',         title: 'レジェンド',   img: null }
  ];

  // Firebase は空配列を落とすことがあるので、配列/オブジェクトどちらでも受ける
  function toArray(v) {
    if (!v) return [];
    if (Object.prototype.toString.call(v) === '[object Array]') return v;
    return Object.keys(v).map(function (k) { return v[k]; });
  }

  function stadiumOf(total) {
    var st = STADIUM[0];
    for (var i = 0; i < STADIUM.length; i++) { if (total >= STADIUM[i].th) st = STADIUM[i]; }
    return st;
  }

  function stadiumImg(total) {
    var img = STADIUM[0].img;
    for (var i = 0; i < STADIUM.length; i++) { if (total >= STADIUM[i].th && STADIUM[i].img) img = STADIUM[i].img; }
    return img;
  }

  function nextStadium(total) {
    for (var i = 0; i < STADIUM.length; i++) { if (total < STADIUM[i].th) return STADIUM[i]; }
    return null;
  }

  /**
   * Firebase の /clubs/{clubId} データから匿名の集計値を算出する。
   * 1食 = 「1回の食堂で1杯以上食べた選手1人」。会員ページの表彰台と同じ数え方。
   * @returns {{total:number, days:number, level:number, pct:number, toNext:number,
   *            stage:object, next:object|null, stageImg:string}}
   */
  function compute(data) {
    var sessions = toArray(data && data.shokudoSessions);
    var total = 0, days = 0;

    sessions.forEach(function (s) {
      var cups = (s && s.cups) || {};
      var eaters = 0;
      Object.keys(cups).forEach(function (pid) { if ((+cups[pid] || 0) > 0) eaters++; });
      if (eaters > 0) days++;
      total += eaters;
    });

    return {
      total: total,
      days: days,
      level: Math.floor(total / STADIUM_STEP),
      pct: Math.round((total % STADIUM_STEP) / STADIUM_STEP * 100),
      toNext: STADIUM_STEP - (total % STADIUM_STEP),
      stage: stadiumOf(total),
      next: nextStadium(total),
      stageImg: stadiumImg(total)
    };
  }

  /** 画面に入ったら 0 → target までカウントアップする（既存の統計と同じ挙動） */
  function countUp(el, target, suffix) {
    if (!el) return;
    var reduce = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var tail = suffix ? '<small>' + suffix + '</small>' : '';
    if (reduce || !global.IntersectionObserver) {
      el.innerHTML = target.toLocaleString() + tail;
      return;
    }
    var done = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || done) return;
        done = true;
        io.disconnect();
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1200, 1);
          var v = Math.round(target * (1 - Math.pow(1 - p, 3)));
          el.innerHTML = v.toLocaleString() + tail;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    io.observe(el);
  }

  global.ShokudoSummary = {
    STADIUM_STEP: STADIUM_STEP,
    STADIUM: STADIUM,
    CAREER: CAREER,
    compute: compute,
    countUp: countUp,
    stadiumImg: stadiumImg
  };
})(window);
