(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const S = window.STORE;
  const P = window.PRODUCTS;
  const byId = id => P.find(p => p.id === id);
  const money = n => n.toLocaleString('uk-UA').replace(/,/g, ' ') + ' грн';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const page = document.body.dataset.page;

  const LOGO = `<svg viewBox="0 0 520 112" role="img" aria-label="Stanislav"><g transform="translate(46 46)"><rect x="-31" y="-31" width="62" height="62" transform="rotate(45)" fill="#C8201F"/><rect x="-24" y="-24" width="48" height="48" transform="rotate(45)" fill="#fff"/><path d="M10.5 -12.5 C 6 -17, -9 -17, -10 -8 C -11 0, 10 -1, 10.5 7 C 11 16, -5 18, -11.5 12" fill="none" stroke="#C8201F" stroke-width="4.2" stroke-linecap="round"/></g><rect x="104" y="18" width="412" height="56" fill="#C8201F"/><text x="310" y="58" text-anchor="middle" fill="#fff" font-family="Manrope, Arial, sans-serif" font-weight="600" font-size="34" letter-spacing="10">STANISLAV</text><text x="514" y="100" text-anchor="end" fill="#C8201F" font-family="Manrope, Arial, sans-serif" font-weight="500" font-size="17" letter-spacing="1">made in ukraine</text></svg>`;

  const ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>',
    sun: '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7h18M3 12h18M3 17h18"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>'
  };

  const NAV = [
    ['collection.html?cat=suits', 'Костюми', 'suits'],
    ['collection.html?cat=tuxedo', 'Смокінги', 'tuxedo'],
    ['collection.html?cat=trousers', 'Брюки', 'trousers'],
    ['collection.html?cat=knit', 'Трикотаж', 'knit'],
    ['collection.html?cat=outer', 'Верхній одяг', 'outer'],
    ['index.html#visit', 'Магазин', 'visit']
  ];

  function renderChrome() {
    const curCat = new URLSearchParams(location.search).get('cat');
    const navHtml = NAV.map(([h, t, k]) => `<a href="${h}"${k === curCat ? ' class="is-active"' : ''}>${t}</a>`).join('');
    document.body.insertAdjacentHTML('afterbegin', `
      <div class="tape-progress" aria-hidden="true"><span></span></div>
      <header class="site-header${page === 'home' ? '' : ' is-solid'}">
        <div class="wrap">
          <a class="logo" href="index.html" aria-label="Stanislav, на головну">${LOGO}</a>
          <nav aria-label="Каталог">${navHtml}</nav>
          <div class="tools">
            <a class="phone" href="${S.phoneHref}">${S.phone}</a>
            <button class="icon-btn" data-open="search" aria-label="Пошук">${ICON.search}</button>
            <button class="icon-btn" data-open="cart" aria-label="Кошик">${ICON.bag}<span class="cart-count"></span></button>
            <button class="icon-btn burger" data-open="menu" aria-label="Меню">${ICON.menu}</button>
          </div>
        </div>
      </header>
      <div class="mobile-menu" id="menu">
        <button class="close" data-close aria-label="Закрити меню">×</button>
        ${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}
        <div class="mm-contacts"><a href="${S.phoneHref}">${S.phone}</a><span class="mm-address">${S.address}</span></div>
      </div>
      <div class="search-panel" id="search" role="dialog" aria-label="Пошук">
        <div class="wrap">
          <div class="search-row">
            <input type="search" placeholder="Що шукаєте? Наприклад, смокінг" aria-label="Пошук товарів">
            <button class="icon-btn" data-close aria-label="Закрити пошук" style="font-size:26px">×</button>
          </div>
          <div class="search-results"></div>
        </div>
      </div>
      <div class="drawer-backdrop" data-close></div>
      <aside class="drawer" id="cart" aria-label="Кошик">
        <div class="drawer-head"><h3>Кошик</h3><button data-close aria-label="Закрити кошик">×</button></div>
        <div class="drawer-body"></div>
        <div class="drawer-foot"></div>
      </aside>`);

    document.body.insertAdjacentHTML('beforeend', `
      <footer class="site-footer">
        <div class="wrap">
          <div>
            <div class="logo">${LOGO}</div>
            <p>Класичний чоловічий одяг українського виробництва. Харків, з підгонкою в магазині.</p>
          </div>
          <div>
            <h4>Каталог</h4>
            ${NAV.slice(0, 5).map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}
          </div>
          <div>
            <h4>Магазин</h4>
            <p>${S.address}<br>${S.addressNote}</p>
            ${S.hours.map(([d, h]) => `${d} ${h}`).join('<br>')}
          </div>
          <div>
            <h4>Зв’язок</h4>
            <a href="${S.phoneHref}">${S.phone}</a>
            <a href="${S.instagram}" target="_blank" rel="noopener">Instagram</a>
          </div>
        </div>
      </footer>`);
  }

  const CART_KEY = 'stanislav-cart';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { cart = []; }
  const saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} };

  function renderCart() {
    const body = $('#cart .drawer-body');
    const foot = $('#cart .drawer-foot');
    const count = cart.reduce((s, l) => s + l.qty, 0);
    $('.cart-count').textContent = count || '';
    if (!cart.length) {
      body.innerHTML = '<p class="empty-note">Кошик порожній. Почніть з <a class="link-under" href="collection.html?cat=suits">костюмів</a>.</p>';
      foot.innerHTML = '';
      return;
    }
    body.innerHTML = cart.map((l, i) => {
      const p = byId(l.id);
      return `<div class="cart-line">
        <img src="${p.thumbs[0]}" alt="">
        <div><div class="cl-name">${p.name}</div><div class="cl-meta">Розмір ${l.size}${l.height ? ', зріст ' + l.height : ''}, ${l.qty} шт.</div>
        <button class="cl-remove" data-remove="${i}">Видалити</button></div>
        <div>${money(p.price * l.qty)}</div></div>`;
    }).join('');
    const total = cart.reduce((s, l) => s + byId(l.id).price * l.qty, 0);
    foot.innerHTML = `<div class="cart-total"><span>Разом</span><b>${money(total)}</b></div>
      <button class="btn btn--red btn--block" data-checkout>Оформити замовлення</button>`;
  }

  function addToCart(id, size, height) {
    const ex = cart.find(l => l.id === id && l.size === size && l.height === height);
    if (ex) ex.qty++; else cart.push({ id, size, height, qty: 1 });
    saveCart();
    renderCart();
    const c = $('.cart-count');
    c.classList.remove('bump');
    void c.offsetWidth;
    c.classList.add('bump');
    open('cart');
  }

  function open(id) {
    closeAll();
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('is-open');
    if (id === 'cart') $('.drawer-backdrop').classList.add('is-open');
    if (id === 'search') setTimeout(() => $('#search input').focus(), 200);
    document.documentElement.style.overflow = id === 'search' ? '' : 'hidden';
  }

  function closeAll() {
    $$('.is-open').forEach(e => { if (!e.matches('.hero')) e.classList.remove('is-open'); });
    document.documentElement.style.overflow = '';
  }

  function bindChrome() {
    document.addEventListener('click', e => {
      if (e.target.closest('[data-theme-toggle]')) {
        const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem('stanislav-theme', next); } catch (err) {}
        return;
      }
      const o = e.target.closest('[data-open]');
      if (o) { open(o.dataset.open); return; }
      if (e.target.closest('[data-close]')) { closeAll(); return; }
      const r = e.target.closest('[data-remove]');
      if (r) { cart.splice(+r.dataset.remove, 1); saveCart(); renderCart(); return; }
      if (e.target.closest('[data-checkout]')) {
        $('#cart .drawer-foot').innerHTML = '<p class="empty-note" style="padding:8px 0">У робочій версії тут буде оформлення WooCommerce: доставка Новою поштою, оплата карткою або при отриманні.</p>';
      }
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });

    $('#search input').addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      const res = q.length < 2 ? [] : P.filter(p => (p.name + ' ' + CATEGORIES[p.cat] + ' ' + COLORS[p.color][0]).toLowerCase().includes(q));
      $('#search .search-results').innerHTML = q.length < 2 ? '' : res.length
        ? res.map(p => `<a href="product.html?id=${p.id}"><img src="${p.thumbs[0]}" alt=""><span>${p.name}<br><small style="color:var(--muted)">${money(p.price)}</small></span></a>`).join('')
        : '<p class="empty-note">Нічого не знайшли. Спробуйте «костюм», «брюки» або колір.</p>';
    });

    const header = $('.site-header');
    const bar = $('.tape-progress span');
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      if (page === 'home') header.classList.toggle('is-solid', scrollY > 40);
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function reveal() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -10% 0px' });
    $$('[data-reveal]').forEach(el => io.observe(el));
  }

  function card(p) {
    const group = P.filter(x => x.group === p.group);
    const sw = group.length > 1 && p.group !== 'suits' ? `<div class="card-swatches">${group.map(g => `<i style="background:${COLORS[g.color][1]}"></i>`).join('')}</div>` : '';
    return `<a class="card" href="product.html?id=${p.id}" data-id="${p.id}">
      <div class="card-media">${p.isNew ? '<span class="badge">Новинка</span>' : ''}
        ${p.thumbs.map(t => `<img src="${t}" alt="${p.name}" loading="lazy">`).join('')}
      </div>
      <div class="card-body"><span class="card-name">${p.name}</span><span class="card-price">${money(p.price)}</span></div>${sw}</a>`;
  }

  function home() {
    const hero = $('.hero');
    setTimeout(() => hero.classList.add('is-in'), 120);

    const track = $('.tape-track');
    if (track) {
      track.innerHTML = Array.from({ length: 80 }, (_, i) => `<span>${i * 10}</span>`).join('');
      if (!reduce) addEventListener('scroll', () => { track.style.transform = `translateX(${-scrollY * .35}px)`; }, { passive: true });
    }

    const showcaseIds = ['tuxedo-black', 'suit-chocolate', 'suit-beige', 'suit-graphite', 'bomber-black', 'suit-brown', 'trousers-navy', 'suit-taupe'];
    const sc = $('.showcase');
    const st = $('.showcase-track');
    st.innerHTML = showcaseIds.map(id => `<div class="showcase-item">${card(byId(id))}</div>`).join('');
    const countEl = $('.showcase-count');
    const setH = () => {
      if (innerWidth <= 900) { sc.style.height = ''; return; }
      sc.style.height = (st.scrollWidth - innerWidth + innerHeight * 1.15) + 'px';
    };
    const onSc = () => {
      if (innerWidth <= 900) return;
      const r = sc.getBoundingClientRect();
      const dist = sc.offsetHeight - innerHeight;
      const prog = Math.min(1, Math.max(0, -r.top / dist));
      st.style.transform = `translateX(${-prog * (st.scrollWidth - innerWidth)}px)`;
      countEl.textContent = `${Math.min(showcaseIds.length, Math.floor(prog * (showcaseIds.length - 2)) + 3)} з ${showcaseIds.length}`;
    };
    setH(); onSc();
    addEventListener('resize', () => { setH(); onSc(); });
    addEventListener('scroll', onSc, { passive: true });
    countEl.textContent = `${showcaseIds.length} моделей`;

    const timer = $('.timer');
    let started = false;
    new IntersectionObserver((es, io) => {
      if (!es[0].isIntersecting || started) return;
      started = true; io.disconnect();
      if (reduce) return;
      const dur = 2600; const t0 = performance.now();
      const tick = now => {
        const k = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - k, 3);
        const secs = Math.round(15 * 60 * (1 - e));
        timer.textContent = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
        if (k < 1) requestAnimationFrame(tick); else timer.textContent = '15 хв';
      };
      timer.textContent = '15:00';
      requestAnimationFrame(tick);
    }, { threshold: .6 }).observe(timer);

    const wImg = $('.wedding-media img');
    if (!reduce) addEventListener('scroll', () => {
      const r = wImg.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      wImg.style.transform = `scale(1.12) translateY(${k * -6}%)`;
    }, { passive: true });

    const polos = P.filter(p => p.group === 'polo');
    const stage = $('.knit-stage');
    const sws = $('.knit-swatches');
    stage.innerHTML = polos.map((p, i) => `<img src="${p.images[0]}" alt="${p.name}" class="${i ? 'is-out' : ''}" loading="lazy">`).join('');
    sws.innerHTML = polos.map((p, i) => `<button aria-pressed="${!i}" aria-label="${COLORS[p.color][0]}" style="background-color:${COLORS[p.color][1]}" data-i="${i}"></button>`).join('');
    const setPolo = i => {
      $$('img', stage).forEach((im, j) => im.classList.toggle('is-out', j !== i));
      $$('button', sws).forEach((b, j) => b.setAttribute('aria-pressed', j === i));
      $('.knit-name').textContent = `${COLORS[polos[i].color][0]}`;
      $('.knit-link').href = `product.html?id=${polos[i].id}`;
    };
    sws.addEventListener('click', e => { const b = e.target.closest('button'); if (b) setPolo(+b.dataset.i); });
    setPolo(0);
  }

  function collection() {
    const params = new URLSearchParams(location.search);
    const state = { cats: new Set(params.get('cat') ? [params.get('cat')] : []), colors: new Set(), sizes: new Set(), min: 0, max: 12000, sort: 'popular' };
    const prices = P.map(p => p.price);
    const PMIN = Math.floor(Math.min(...prices) / 500) * 500;
    const PMAX = Math.ceil(Math.max(...prices) / 500) * 500;
    state.min = PMIN; state.max = PMAX;

    const tabs = $('.cat-tabs');
    tabs.innerHTML = `<button data-cat="" aria-pressed="false">Усе</button>` + Object.entries(CATEGORIES).map(([k, v]) => `<button data-cat="${k}" aria-pressed="false">${v}</button>`).join('');

    const catChecks = $('#f-cats');
    catChecks.innerHTML = Object.entries(CATEGORIES).map(([k, v]) => `<label><input type="checkbox" value="${k}"> ${v} <small>${P.filter(p => p.cat === k).length}</small></label>`).join('');
    const usedColors = [...new Set(P.map(p => p.color))];
    $('#f-colors').innerHTML = usedColors.map(c => `<button data-color="${c}" aria-pressed="false" aria-label="${COLORS[c][0]}" title="${COLORS[c][0]}" style="background:${COLORS[c][1]}"></button>`).join('');
    const allSizes = ['44', '46', '48', '50', '52', '54', '56', '58', '60', 'S', 'M', 'L', 'XL', 'XXL'];
    $('#f-sizes').innerHTML = allSizes.map(s => `<button data-size="${s}" aria-pressed="false">${s}</button>`).join('');
    const rMin = $('#p-min'); const rMax = $('#p-max');
    [rMin, rMax].forEach(r => { r.min = PMIN; r.max = PMAX; r.step = 100; });
    rMin.value = PMIN; rMax.value = PMAX;

    const grid = $('.grid');
    const titleEl = $('.page-top h1');
    const subEl = $('.page-sub');
    const SUBS = {
      '': 'Костюми, смокінги, брюки і трикотаж. Усе можна приміряти в магазині на Суздальських рядах.',
      suits: 'Трійки з жилетом у теплих відтінках сезону. Брюки підшиємо під ваш зріст за 15 хвилин.',
      tuxedo: 'Смокінги для весілля та вечірніх подій. Метелик і сорочку підберемо на місці.',
      trousers: 'Класичні брюки прямого крою, що носяться і з піджаком, і з джемпером.',
      knit: 'Джемпери-поло на блискавці в шести кольорах. Замість сорочки під піджак.',
      outer: 'Легкий верхній одяг до класичного гардеробу.'
    };

    function sync() {
      const one = state.cats.size === 1 ? [...state.cats][0] : '';
      $$('button', tabs).forEach(b => b.setAttribute('aria-pressed', b.dataset.cat === one && (one || !state.cats.size) ? 'true' : 'false'));
      $$('input', catChecks).forEach(i => { i.checked = state.cats.has(i.value); });
      $$('#f-colors button').forEach(b => b.setAttribute('aria-pressed', state.colors.has(b.dataset.color)));
      $$('#f-sizes button').forEach(b => b.setAttribute('aria-pressed', state.sizes.has(b.dataset.size)));
      titleEl.textContent = one ? CATEGORIES[one] : 'Каталог';
      subEl.textContent = SUBS[one] || SUBS[''];
      document.title = `${titleEl.textContent} | Stanislav, Харків`;
      const lo = Math.min(+rMin.value, +rMax.value); const hi = Math.max(+rMin.value, +rMax.value);
      state.min = lo; state.max = hi;
      $('#p-vals').innerHTML = `<span>${money(lo)}</span><span>${money(hi)}</span>`;
      const rail = $('.rail i');
      rail.style.left = ((lo - PMIN) / (PMAX - PMIN) * 100) + '%';
      rail.style.right = (100 - (hi - PMIN) / (PMAX - PMIN) * 100) + '%';
    }

    function apply() {
      sync();
      let list = P.filter(p =>
        (!state.cats.size || state.cats.has(p.cat)) &&
        (!state.colors.size || state.colors.has(p.color)) &&
        (!state.sizes.size || p.sizes.some(s => state.sizes.has(s))) &&
        p.price >= state.min && p.price <= state.max);
      if (state.sort === 'cheap') list.sort((a, b) => a.price - b.price);
      if (state.sort === 'expensive') list.sort((a, b) => b.price - a.price);
      if (state.sort === 'new') list.sort((a, b) => b.isNew - a.isNew);

      const first = new Map($$('.card', grid).map(c => [c.dataset.id, c.getBoundingClientRect()]));
      grid.innerHTML = list.length ? list.map(card).join('')
        : '<div class="no-results">Під ці фільтри товарів немає. <button data-reset>Скинути фільтри</button></div>';
      $('.result-count').textContent = `${list.length} ${plural(list.length)}`;
      if (!reduce) $$('.card', grid).forEach((c, i) => {
        const f = first.get(c.dataset.id);
        const l = c.getBoundingClientRect();
        if (f) {
          c.animate([{ transform: `translate(${f.left - l.left}px, ${f.top - l.top}px)` }, { transform: 'none' }], { duration: 550, easing: 'cubic-bezier(.2,.7,.1,1)' });
        } else {
          c.animate([{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: Math.min(i, 8) * 40, easing: 'cubic-bezier(.2,.7,.1,1)', fill: 'backwards' });
        }
      });
      const qp = state.cats.size === 1 ? '?cat=' + [...state.cats][0] : '';
      history.replaceState(null, '', 'collection.html' + qp);
      $$('.site-header nav a').forEach(a => a.classList.toggle('is-active', qp && a.href.endsWith(qp)));
    }

    const plural = n => n % 10 === 1 && n % 100 !== 11 ? 'товар' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'товари' : 'товарів';
    const toggle = (set, v) => set.has(v) ? set.delete(v) : set.add(v);

    tabs.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; state.cats = new Set(b.dataset.cat ? [b.dataset.cat] : []); apply(); });
    catChecks.addEventListener('change', e => { toggle(state.cats, e.target.value); apply(); });
    $('#f-colors').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { toggle(state.colors, b.dataset.color); apply(); } });
    $('#f-sizes').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { toggle(state.sizes, b.dataset.size); apply(); } });
    [rMin, rMax].forEach(r => { r.addEventListener('input', sync); r.addEventListener('change', apply); });
    $('#sort').addEventListener('change', e => { state.sort = e.target.value; apply(); });
    document.addEventListener('click', e => {
      if (e.target.closest('[data-reset]')) {
        state.cats.clear(); state.colors.clear(); state.sizes.clear(); rMin.value = PMIN; rMax.value = PMAX; apply();
      }
    });
    $('.filter-open').addEventListener('click', () => { $('.filters').classList.add('is-open'); $('.drawer-backdrop').classList.add('is-open'); });
    $('.filters-close').addEventListener('click', closeAll);
    apply();
  }

  function product() {
    const id = new URLSearchParams(location.search).get('id');
    const p = byId(id) || P[0];
    document.title = `${p.name} | Stanislav, Харків`;
    const group = P.filter(x => x.group === p.group);
    const root = $('.product');
    root.innerHTML = `
      <div class="gallery">
        <div class="thumbs">${p.images.map((src, i) => `<button aria-current="${!i}" data-src="${src}" aria-label="Фото ${i + 1}"><img src="${p.thumbs[i]}" alt=""></button>`).join('')}</div>
        <div class="stage"><img src="${p.images[0]}" alt="${p.name}"><span class="zoom-hint">Наведіть, щоб збільшити</span></div>
      </div>
      <div class="info">
        <div class="crumbs"><a href="index.html">Головна</a> / <a href="collection.html?cat=${p.cat}">${CATEGORIES[p.cat]}</a></div>
        <h1>${p.name}</h1>
        <div class="price">${money(p.price)}</div>
        ${group.length > 1 ? `<div class="opt"><div class="opt-head">Колір <span>${COLORS[p.color][0]}</span></div>
          <div class="color-links">${group.map(g => `<a href="product.html?id=${g.id}" aria-current="${g.id === p.id}" title="${COLORS[g.color][0]}"><img src="${g.thumbs[0]}" alt="${COLORS[g.color][0]}"></a>`).join('')}</div></div>` : ''}
        <div class="opt"><div class="opt-head">Розмір <button data-modal="sizes">Таблиця розмірів</button></div>
          <div class="size-chips" id="sizes">${p.sizes.map(s => `<button aria-pressed="false">${s}</button>`).join('')}</div>
          <div class="size-error" aria-live="polite"></div></div>
        ${p.heights ? `<div class="opt"><div class="opt-head">Зріст, см</div><div class="size-chips" id="heights">${p.heights.map((h, i) => `<button aria-pressed="${i === 1}">${h}</button>`).join('')}</div></div>` : ''}
        <div class="buy">
          <button class="btn btn--red" id="add">Додати в кошик</button>
          <button class="btn btn--ghost" data-modal="fitting">Записатися на примірку</button>
        </div>
        <ul class="perks">
          <li>Підшиємо брюки та рукави в магазині за 15 хвилин</li>
          <li>Доставка Новою поштою по Україні</li>
          <li>Обмін розміру протягом 14 днів</li>
        </ul>
        <details class="acc" open><summary>Опис</summary><p>${p.text}</p></details>
        <details class="acc"><summary>Склад і догляд</summary><p>${p.care}</p></details>
        <details class="acc"><summary>Підгонка та обмін</summary><p>${p.fit}</p></details>
      </div>`;

    const stage = $('.stage');
    const img = $('img', stage);
    $('.thumbs').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('.thumbs button').forEach(x => x.setAttribute('aria-current', x === b));
      img.style.opacity = 0;
      setTimeout(() => { img.src = b.dataset.src; img.style.opacity = 1; }, 180);
    });
    if (matchMedia('(hover: hover)').matches) {
      stage.addEventListener('mousemove', e => {
        const r = stage.getBoundingClientRect();
        img.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`;
      });
      stage.addEventListener('mouseenter', () => stage.classList.add('is-zoom'));
      stage.addEventListener('mouseleave', () => stage.classList.remove('is-zoom'));
    } else {
      $('.zoom-hint').remove();
    }

    const pick = wrap => wrap && wrap.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('button', wrap).forEach(x => x.setAttribute('aria-pressed', x === b));
      wrap.classList.remove('is-error'); $('.size-error').textContent = '';
    });
    pick($('#sizes')); pick($('#heights'));

    $('#add').addEventListener('click', () => {
      const s = $('#sizes [aria-pressed="true"]');
      if (!s) { $('#sizes').classList.add('is-error'); $('.size-error').textContent = 'Оберіть розмір, щоб додати в кошик.'; return; }
      const h = $('#heights [aria-pressed="true"]');
      addToCart(p.id, s.textContent, h ? h.textContent : '');
    });

    const isSuit = p.cat === 'suits' || p.cat === 'tuxedo';
    const sizeRows = isSuit
      ? [['44', 88, 76], ['46', 92, 80], ['48', 96, 84], ['50', 100, 88], ['52', 104, 92], ['54', 108, 96], ['56', 112, 100], ['58', 116, 104], ['60', 120, 108]]
      : p.cat === 'trousers'
        ? [['46', 92, 80], ['48', 96, 84], ['50', 100, 88], ['52', 104, 92], ['54', 108, 96], ['56', 112, 100], ['58', 116, 104]]
        : [['S', '88–94', '76–82'], ['M', '96–102', '84–90'], ['L', '104–110', '92–98'], ['XL', '112–118', '100–106'], ['XXL', '120–126', '108–114']];
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal" id="m-sizes" role="dialog" aria-label="Таблиця розмірів"><div class="modal-box">
        <button class="modal-close" data-mclose aria-label="Закрити">×</button>
        <h3>Таблиця розмірів</h3>
        <p>Обхват грудей і талії в сантиметрах. Якщо сумніваєтеся, приходьте на примірку: консультант підбере розмір за кілька хвилин.</p>
        <table><thead><tr><th>Розмір</th><th>Груди</th><th>Талія</th></tr></thead>
        <tbody>${sizeRows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table>
      </div></div>
      <div class="modal" id="m-fitting" role="dialog" aria-label="Запис на примірку"><div class="modal-box">
        <button class="modal-close" data-mclose aria-label="Закрити">×</button>
        <form>
          <h3>Запис на примірку</h3>
          <p>${p.name}. Відкладемо модель у вашому розмірі до візиту.</p>
          <label for="f-name">Ім’я</label><input id="f-name" autocomplete="name" required>
          <label for="f-phone">Телефон</label><input id="f-phone" type="tel" autocomplete="tel" placeholder="+380" required>
          <label for="f-day">Коли зручно прийти</label>
          <select id="f-day"><option>Сьогодні</option><option>Завтра</option><option>Цього тижня</option><option>У вихідні</option></select>
          <button class="btn btn--red btn--block" type="submit">Записатися</button>
        </form>
        <div class="done"><h3>Ви записані</h3><p>У робочій версії сайту заявка прийде менеджеру в Telegram або на пошту, і він передзвонить для підтвердження.</p></div>
      </div></div>`);
    document.addEventListener('click', e => {
      const m = e.target.closest('[data-modal]');
      if (m) { $('#m-' + m.dataset.modal).classList.add('is-open'); return; }
      if (e.target.closest('[data-mclose]') || e.target.classList.contains('modal')) $$('.modal').forEach(x => x.classList.remove('is-open', 'is-done'));
    });
    $('#m-fitting form').addEventListener('submit', e => { e.preventDefault(); $('#m-fitting').classList.add('is-done'); });

    const rel = P.filter(x => x.id !== p.id && x.group !== p.group).sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat)).slice(0, 4);
    const withSib = group.filter(x => x.id !== p.id);
    const relList = (p.group === 'suits' ? withSib.concat(rel) : rel).slice(0, 4);
    $('.related .grid').innerHTML = relList.map(card).join('');
  }

  renderChrome();
  bindChrome();
  renderCart();
  if (page === 'home') home();
  if (page === 'collection') collection();
  if (page === 'product') product();
  reveal();
})();
