// ライトプラン 単一ページ — テーマ適用・セクション制御・Match Planner(Firebase)連携

const FIREBASE_URL = `${HP_CONFIG.firebaseUrl}/clubs/${HP_CONFIG.clubId}.json`;
let HP_DATA = { matches: [], schedules: [], posts: [], opponents: [] };
let visibleNews = [];
let visibleResults = [];

// 選べるコンテンツの最大数（ライトプランの仕様）
const MAX_SECTIONS = 8;

document.addEventListener('DOMContentLoaded', async () => {
  applyTheme();
  applyClubIdentity();
  applyHero();
  applySections();
  bindModal();
  try {
    await loadData();
  } catch (e) {
    console.warn('データ取得失敗:', e);
  }
  renderNews();
  renderNextMatch();
  renderResults();
});

// ===== テーマ適用（参考サイトの雰囲気は config.theme で再現する） =====
function applyTheme() {
  const t = HP_CONFIG.theme || {};
  const r = document.documentElement.style;
  r.setProperty('--c-primary', t.primaryColor || '#1a5c2a');
  r.setProperty('--c-accent',  t.accentColor  || '#c9a227');
  r.setProperty('--radius',    t.radius || '8px');

  if (t.baseMode === 'light') document.body.classList.add('mode-light');
  document.body.classList.add(`hero-${t.heroStyle || 'photo-full'}`);

  // Google Fonts を動的読み込み
  const heading = t.fontHeading || 'Oswald';
  const body = t.fontBody || 'Noto Sans JP';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(heading)}:wght@400;700&family=${encodeURIComponent(body)}:wght@400;500;700;900&display=swap`;
  document.head.appendChild(link);
  r.setProperty('--font-heading', `'${heading}', sans-serif`);
  r.setProperty('--font-body', `'${body}', sans-serif`);
}

function applyClubIdentity() {
  document.querySelectorAll('[data-club-name]').forEach(el => { el.textContent = HP_CONFIG.clubName; });
  document.querySelectorAll('[data-club-full]').forEach(el => { el.textContent = HP_CONFIG.clubNameFull || HP_CONFIG.clubName; });
  if (HP_CONFIG.clubName) {
    document.title = document.title.replace('{{CLUB_NAME_FULL}}', HP_CONFIG.clubNameFull || HP_CONFIG.clubName);
  }
  const initial = (HP_CONFIG.clubName || '?')[0];
  const headerInitial = document.getElementById('header-logo-initial');
  if (headerInitial) headerInitial.textContent = initial;
  if (HP_CONFIG.logoUrl) {
    ['header-logo-img', 'footer-logo-img'].forEach(id => {
      const img = document.getElementById(id);
      if (img) { img.src = HP_CONFIG.logoUrl; img.style.display = ''; }
    });
    if (headerInitial) headerInitial.style.display = 'none';
  }
  const cta = document.getElementById('header-cta');
  if (cta && HP_CONFIG.joinUrl) {
    cta.href = HP_CONFIG.joinUrl;
    cta.textContent = HP_CONFIG.joinLabel || '体験申込';
    cta.style.display = '';
  }
  const year = document.getElementById('footer-year');
  if (year) year.textContent = new Date().getFullYear();
}

function applyHero() {
  const title = document.getElementById('hero-title');
  if (title) title.innerHTML = HP_CONFIG.heroTitle || (HP_CONFIG.clubNameFull || HP_CONFIG.clubName || '');
  const sub = document.getElementById('hero-sub');
  if (sub) sub.textContent = HP_CONFIG.heroSub || '';
  const bg = document.getElementById('hero-bg');
  if (bg && HP_CONFIG.heroImage) bg.style.backgroundImage = `url("${HP_CONFIG.heroImage}")`;
  const btns = document.getElementById('hero-btns');
  if (btns) {
    let html = '';
    if (HP_CONFIG.joinUrl) html += `<a href="${escapeHTML(HP_CONFIG.joinUrl)}" class="hero-btn-primary">${escapeHTML(HP_CONFIG.joinLabel || '体験申込はこちら')}</a>`;
    html += `<a href="#news" class="hero-btn-secondary">お知らせを見る</a>`;
    btns.innerHTML = html;
  }
}

// ===== 選べるコンテンツ：表示＋並び替え（最大8つ） =====
function applySections() {
  const container = document.getElementById('sections-container');
  const chosen = (HP_CONFIG.sections || []).slice(0, MAX_SECTIONS);
  chosen.forEach(key => {
    const sec = container.querySelector(`[data-section="${key}"]`);
    if (!sec) return;
    sec.style.display = '';
    container.appendChild(sec); // config の並び順どおり末尾へ移動
    const titleEl = sec.querySelector(`[data-content-title="${key}"]`);
    const c = (HP_CONFIG.content || {})[key] || {};
    if (titleEl) titleEl.textContent = c.title || key;
    const renderer = SECTION_RENDERERS[key];
    if (renderer) renderer(c);
  });
}

const SECTION_RENDERERS = {
  about(c) {
    const el = document.getElementById('about-body');
    let html = '';
    if (c.image) html += `<img src="${escapeHTML(c.image)}" alt="" style="border-radius:var(--radius);margin-bottom:20px">`;
    html += `<div class="section-body">${escapeHTML(c.body || '')}</div>`;
    el.innerHTML = html;
  },
  philosophy(c) {
    document.getElementById('philosophy-grid').innerHTML = (c.pillars || []).map(p =>
      `<div class="info-card">
        <div class="info-card-no">${escapeHTML(p.no || '')}</div>
        <div class="info-card-title">${escapeHTML(p.title || '')}</div>
        <div class="info-card-body">${escapeHTML(p.body || '')}</div>
      </div>`).join('');
  },
  policy(c) {
    document.getElementById('policy-grid').innerHTML = (c.items || []).map(p =>
      `<div class="info-card">
        <div class="info-card-title">${escapeHTML(p.title || '')}</div>
        <div class="info-card-body">${escapeHTML(p.body || '')}</div>
      </div>`).join('');
  },
  staff(c) {
    document.getElementById('staff-grid').innerHTML = (c.members || []).map(m =>
      `<div class="info-card staff-card">
        ${m.photo ? `<img class="staff-photo" src="${escapeHTML(m.photo)}" alt="">` : ''}
        <div class="staff-role">${escapeHTML(m.role || '')}</div>
        <div class="staff-name">${escapeHTML(m.name || '')}</div>
        <div class="info-card-body">${escapeHTML(m.comment || '')}</div>
      </div>`).join('');
  },
  categories(c) {
    document.getElementById('categories-grid').innerHTML = (c.items || []).map(i =>
      `<div class="info-card">
        <div class="info-card-title">${escapeHTML(i.name || '')}</div>
        <div class="info-card-body">${escapeHTML(i.target || '')}${i.target ? '<br>' : ''}${escapeHTML(i.desc || '')}${i.schedule ? '<br>📅 ' + escapeHTML(i.schedule) : ''}</div>
      </div>`).join('');
  },
  join(c) {
    document.getElementById('join-body').textContent = c.body || '';
    document.getElementById('join-steps').innerHTML = (c.steps || []).map(s =>
      `<div class="join-step">${escapeHTML(s)}</div>`).join('');
    const cta = document.getElementById('join-cta');
    if (HP_CONFIG.joinUrl) {
      cta.innerHTML = `<a href="${escapeHTML(HP_CONFIG.joinUrl)}" class="hero-btn-primary">${escapeHTML(HP_CONFIG.joinLabel || '体験申込はこちら')}</a>`;
    }
  },
  fee(c) {
    document.getElementById('fee-rows').innerHTML = (c.rows || []).map(r =>
      `<tr><th>${escapeHTML(r.label || '')}</th><td>${escapeHTML(r.value || '')}</td></tr>`).join('');
    document.getElementById('fee-note').textContent = c.note || '';
  },
  sponsors(c) {
    document.getElementById('sponsors-grid').innerHTML = (c.items || []).map(s => {
      const inner = `${s.logo ? `<img src="${escapeHTML(s.logo)}" alt="">` : ''}<span>${escapeHTML(s.name || '')}</span>`;
      return s.url
        ? `<a class="sponsor-item" href="${escapeHTML(s.url)}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="sponsor-item">${inner}</div>`;
    }).join('');
  },
  careers(c) {
    document.getElementById('careers-list').innerHTML = (c.items || []).map(i =>
      `<div class="careers-row">
        <span class="careers-year">${escapeHTML(i.year || '')}</span>
        <span class="careers-schools">${escapeHTML(i.schools || '')}</span>
      </div>`).join('');
  },
  gallery(c) {
    document.getElementById('gallery-grid').innerHTML = (c.images || []).map(src =>
      `<img src="${escapeHTML(src)}" alt="" loading="lazy">`).join('');
  },
  access(c) {
    document.getElementById('access-list').innerHTML = (c.venues || []).map(v =>
      `<div class="venue-card">
        <div class="venue-name">📍 ${escapeHTML(v.name || '')}</div>
        <div class="venue-addr">${escapeHTML(v.address || '')}${v.note ? '　※' + escapeHTML(v.note) : ''}</div>
        ${v.mapUrl ? `<a class="venue-map-link" href="${escapeHTML(v.mapUrl)}" target="_blank" rel="noopener">Googleマップで開く →</a>` : ''}
      </div>`).join('');
  },
  contact(c) {
    document.getElementById('contact-body').textContent = c.body || '';
    let html = '';
    if (HP_CONFIG.contactEmail) html += `<a class="hero-btn-secondary" href="mailto:${escapeHTML(HP_CONFIG.contactEmail)}">✉️ メールで問い合わせ</a>`;
    if (HP_CONFIG.contactLine)  html += `<a class="hero-btn-secondary" href="${escapeHTML(HP_CONFIG.contactLine)}" target="_blank" rel="noopener">💬 LINEで問い合わせ</a>`;
    if (HP_CONFIG.joinUrl)      html += `<a class="hero-btn-primary" href="${escapeHTML(HP_CONFIG.joinUrl)}">${escapeHTML(HP_CONFIG.joinLabel || '体験申込はこちら')}</a>`;
    document.getElementById('contact-actions').innerHTML = html;
  },
  faq(c) {
    const list = document.getElementById('faq-list');
    list.innerHTML = (c.items || []).map(i =>
      `<div class="faq-item">
        <button type="button" class="faq-q">${escapeHTML(i.q || '')}</button>
        <div class="faq-a">${escapeHTML(i.a || '')}</div>
      </div>`).join('');
    list.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => btn.parentElement.classList.toggle('open'));
    });
  },
  sns(c) {
    document.getElementById('sns-body').textContent = c.body || '';
    let html = '';
    if (HP_CONFIG.instagram) html += `<a class="sns-link" href="https://www.instagram.com/${escapeHTML(HP_CONFIG.instagram)}/" target="_blank" rel="noopener">📷 Instagram</a>`;
    if (HP_CONFIG.twitter)   html += `<a class="sns-link" href="https://x.com/${escapeHTML(HP_CONFIG.twitter)}" target="_blank" rel="noopener">𝕏 X (Twitter)</a>`;
    if (HP_CONFIG.youtube)   html += `<a class="sns-link" href="${escapeHTML(HP_CONFIG.youtube)}" target="_blank" rel="noopener">▶️ YouTube</a>`;
    if (HP_CONFIG.contactLine) html += `<a class="sns-link" href="${escapeHTML(HP_CONFIG.contactLine)}" target="_blank" rel="noopener">💬 LINE</a>`;
    document.getElementById('sns-links').innerHTML = html;
  },
  videos(c) {
    document.getElementById('videos-grid').innerHTML = (c.items || []).map(url =>
      `<iframe src="${escapeHTML(url)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`).join('');
  },
};

// ===== Firebase（Match Planner 連携・標準搭載） =====
async function loadData() {
  const res = await fetch(FIREBASE_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const r = await res.json() || {};
  HP_DATA.matches   = Array.isArray(r.matches)   ? r.matches   : [];
  HP_DATA.schedules = Array.isArray(r.schedules) ? r.schedules : [];
  HP_DATA.posts     = Array.isArray(r.posts || r.news) ? (r.posts || r.news) : [];
  HP_DATA.opponents = Array.isArray(r.opponents) ? r.opponents : [];
}

// ===== ユーティリティ =====
function escapeHTML(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function toDate(s) { if (!s) return null; const d = new Date(s); return isNaN(d.getTime()) ? null : d; }
function fmtDate(s) { return String(s || '').replace(/-/g, '/'); }
// カテゴリー表記ゆれ吸収（Match Planner="U15" / 表示="U-15" のハイフン有無を無視して比較）
function normCat(s) { return String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }
function dispCat(c) { const m = String(c || '').match(/^U-?(\d+)$/i); return m ? 'U-' + m[1] : String(c || ''); }
function dayLabel(s) {
  const d = toDate(s); if (!d) return '';
  return ['SUN','MON','TUE','WED','THU','FRI','SAT'][d.getDay()];
}
function resultLetter(rs) {
  if (!rs) return 'DRAW';
  if (/勝|win/i.test(rs)) return 'WIN';
  if (/負|敗|lose|loss/i.test(rs)) return 'LOSE';
  return 'DRAW';
}
function resultClass(rs) {
  if (!rs) return 'badge-draw';
  if (/勝|win/i.test(rs)) return 'badge-win';
  if (/負|敗|lose|loss/i.test(rs)) return 'badge-lose';
  return 'badge-draw';
}

// ===== ニュース（標準搭載） =====
function renderNews() {
  const el = document.getElementById('news-list');
  const sorted = HP_DATA.posts
    .filter(n => n && n.title && n.published !== false)
    .sort((a, b) => (toDate(b.date) || 0) - (toDate(a.date) || 0))
    .slice(0, 6);
  if (sorted.length === 0) {
    el.innerHTML = '<p class="no-data">現在お知らせはありません</p>';
    return;
  }
  visibleNews = sorted;
  el.innerHTML = sorted.map((n, i) => {
    const cat = n.cat || n.category || n.type || 'お知らせ';
    return `<div class="news-row" onclick="openNewsDetail(${i})">
      <span class="news-date">${escapeHTML(fmtDate(n.date))}</span>
      <span class="news-tag">${escapeHTML(cat)}</span>
      <span class="news-title-text">${escapeHTML(n.title)}</span>
      <span class="news-arrow">›</span>
    </div>`;
  }).join('');
}

// ===== ネクストマッチ（標準搭載） =====
// matches（試合管理）と schedules（告知の元データ）の両方から直近の試合を拾う
function renderNextMatch() {
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const fromMatches = HP_DATA.matches.filter(m => {
    if (m.result && m.result.myScore != null && m.result.oppScore != null) return false;
    const d = toDate(m.date);
    return d && d >= today;
  });
  const keys = {};
  fromMatches.forEach(m => { keys[m.date + '|' + (m.opponent || '')] = true; });
  const fromSchedules = HP_DATA.schedules
    .filter(sc => {
      const d = toDate(sc.date);
      return d && d >= today && !keys[sc.date + '|' + (sc.opponent || '')];
    })
    .map(sc => ({
      date: sc.date, time: sc.time || '', venue: sc.venue || '',
      competition: sc.competition || sc.type || '', opponent: sc.opponent || '', category: sc.category || '',
    }));

  const next = fromMatches.concat(fromSchedules)
    .sort((a, b) => (toDate(a.date) || 0) - (toDate(b.date) || 0))[0];

  const section = document.getElementById('next-match-section');
  if (!next) { section.style.display = 'none'; return; }
  section.style.display = '';

  const cat = dispCat(next.category);
  const comp = next.competition || next.competitionName || next.type || '';
  const logo = HP_CONFIG.logoUrl
    ? `<img src="${escapeHTML(HP_CONFIG.logoUrl)}" alt="">`
    : `<span class="logo-initial">${escapeHTML((HP_CONFIG.clubName || '?')[0])}</span>`;

  document.getElementById('next-match-card').innerHTML = `
    <div class="nm-left">
      <div class="nm-badge-row">
        <span class="nm-badge">NEXT MATCH</span>
        ${cat ? `<span class="nm-cat">${escapeHTML(cat)}</span>` : ''}
      </div>
      <div class="nm-date">${escapeHTML(fmtDate(next.date).replace(/\//g, '.'))}<span class="nm-day">${dayLabel(next.date)}</span></div>
      <div class="nm-detail">${comp ? '🏆 ' + escapeHTML(comp) + '<br>' : ''}${next.time ? '⏰ ' + escapeHTML(next.time) + ' キックオフ<br>' : ''}${next.venue ? '📍 ' + escapeHTML(next.venue) : ''}</div>
    </div>
    <div class="nm-vs-row">
      <div class="nm-team">${logo}${escapeHTML(HP_CONFIG.clubName || '')}</div>
      <div class="nm-vs">VS</div>
      <div class="nm-team"><span class="logo-initial">${escapeHTML((next.opponent || '?')[0])}</span>${escapeHTML(next.opponent || '')}</div>
    </div>`;
}

// ===== 試合結果（標準搭載） =====
function renderResults() {
  const el = document.getElementById('results-list');
  const results = HP_DATA.matches
    .filter(m => m.result && m.result.publish !== false && m.result.myScore != null && m.result.oppScore != null)
    .sort((a, b) => (toDate(b.date) || 0) - (toDate(a.date) || 0))
    .slice(0, 5);
  if (results.length === 0) {
    el.innerHTML = '<p class="no-data" style="padding:24px 20px">現在表示できる試合結果はありません</p>';
    return;
  }
  visibleResults = results;
  el.innerHTML = results.map((m, i) => {
    const rs = m.result.resultStr || '';
    return `<div class="result-row" onclick="openMatchDetail(${i})">
      <span class="result-date">${escapeHTML(m.date ? m.date.slice(5).replace('-', '.') : '')}</span>
      <span class="result-home">${escapeHTML(HP_CONFIG.clubName || '')}</span>
      <span class="result-score">
        <span class="score-num">${m.result.myScore}</span><span class="score-sep">-</span><span class="score-num">${m.result.oppScore}</span>
      </span>
      <span class="result-opp">${escapeHTML(m.opponent || '')}</span>
      <span class="result-badge ${resultClass(rs)}">${resultLetter(rs)}</span>
    </div>`;
  }).join('');
}

// ===== 詳細モーダル（ニュース・試合結果 共通） =====
function bindModal() {
  document.getElementById('detail-close').addEventListener('click', closeDetail);
  document.getElementById('detail-overlay').addEventListener('click', function (e) {
    if (e.target === this) closeDetail();
  });
}
function openDetail({ tag, tagColor, date, title, body, image }) {
  const tagEl = document.getElementById('detail-tag');
  tagEl.textContent = tag || '';
  tagEl.style.display = tag ? '' : 'none';
  tagEl.style.color = tagColor || '';
  tagEl.style.borderColor = tagColor || '';
  document.getElementById('detail-date').textContent = date || '';
  document.getElementById('detail-title').textContent = title || '';
  document.getElementById('detail-body').textContent = body || '';
  const img = document.getElementById('detail-image');
  if (image) { img.src = image; img.classList.add('show'); }
  else { img.removeAttribute('src'); img.classList.remove('show'); }
  document.getElementById('detail-overlay').classList.add('open');
}
function closeDetail() {
  document.getElementById('detail-overlay').classList.remove('open');
}

function openNewsDetail(idx) {
  const n = visibleNews[idx];
  if (!n) return;
  openDetail({
    tag: n.cat || n.category || n.type || 'お知らせ',
    date: fmtDate(n.date),
    title: n.title || '',
    body: n.body || '',
    image: n.image || '',
  });
}

// Match Plannerが生成した試合結果記事（あれば）を探して詳細に載せる
function findLinkedPost(m) {
  const r = m.result || {};
  let found = null;
  if (r.grandeNewsId) found = HP_DATA.posts.find(p => p && p.id === r.grandeNewsId);
  if (!found && m.opponent) {
    found = HP_DATA.posts.find(p =>
      p && p.type === '試合結果' && p.date === m.date && String(p.title || '').includes(m.opponent));
  }
  return found || null;
}
function openMatchDetail(idx) {
  const m = visibleResults[idx];
  if (!m || !m.result) return;
  const r = m.result;
  const post = findLinkedPost(m);
  const rl = resultLetter(r.resultStr || '');
  const tagColor = rl === 'WIN' ? '#1f8a4c' : rl === 'LOSE' ? '#d24b52' : '';

  const lines = [];
  const comp = m.competition || m.competitionName || m.type || '';
  if (comp) lines.push('🏆 ' + comp);
  if (m.venue) lines.push('📍 ' + m.venue);
  if (m.time) lines.push('⏰ ' + m.time + ' キックオフ');
  let scorers = [];
  if (post && Array.isArray(post.scorers) && post.scorers.length) {
    scorers = post.scorers.map(s => s.name + (s.goals > 1 ? ' ×' + s.goals : ''));
  } else if (Array.isArray(r.goals)) {
    const count = {};
    r.goals.forEach(g => { if (g.scorer) count[g.scorer] = (count[g.scorer] || 0) + 1; });
    scorers = Object.keys(count).map(k => k + (count[k] > 1 ? ' ×' + count[k] : ''));
  }
  if (scorers.length) lines.push('⚽ 得点者：' + scorers.join('、'));
  let body = lines.join('\n');
  if (post && post.body) body += (body ? '\n\n' : '') + post.body;

  openDetail({
    tag: rl,
    tagColor,
    date: fmtDate(m.date),
    title: `${HP_CONFIG.clubName || ''} ${r.myScore} - ${r.oppScore} ${m.opponent || ''}`,
    body,
    image: r.imageUrl || (post && post.image) || '',
  });
}
