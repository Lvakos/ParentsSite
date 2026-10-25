"use strict";
// Точка входа: язык, меню, цены, работы, слайдер.
const LANG_STORAGE_KEY = 'pvl-lang';
// ---------- Язык ----------
const originalText = new Map();
const originalAttrs = new Map();
const originalMeta = { title: '', description: '' };
function captureOriginals() {
    originalMeta.title = document.title;
    originalMeta.description = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    document.querySelectorAll('[data-i18n]').forEach((el) => originalText.set(el, el.textContent ?? ''));
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
        const map = {};
        for (const pair of (el.dataset.i18nAttr ?? '').split(';')) {
            const [attr] = pair.split(':');
            if (attr)
                map[attr.trim()] = el.getAttribute(attr.trim()) ?? '';
        }
        originalAttrs.set(el, map);
    });
}
function readInitialLang() {
    const param = new URLSearchParams(location.search).get('lang');
    if (param === 'et' || param === 'ru')
        return param;
    try {
        const saved = localStorage.getItem(LANG_STORAGE_KEY);
        if (saved === 'et' || saved === 'ru')
            return saved;
    }
    catch {
        /* хранилище недоступно */
    }
    return DEFAULT_LANG;
}
const langListeners = [];
/** На странице категории заголовок и описание страницы берутся из конфигурации. */
let pageMeta = null;
function applyLang(lang, persist) {
    currentLang = lang;
    document.documentElement.lang = lang;
    originalText.forEach((et, el) => {
        const key = el.dataset.i18n;
        el.textContent = lang === 'et' ? et : (I18N_RU[key] ?? et);
    });
    originalAttrs.forEach((attrs, el) => {
        for (const pair of (el.dataset.i18nAttr ?? '').split(';')) {
            const [attr, key] = pair.split(':').map((s) => s.trim());
            if (!attr || !key)
                continue;
            el.setAttribute(attr, lang === 'et' ? attrs[attr] : (I18N_RU[key] ?? attrs[attr]));
        }
    });
    if (pageMeta) {
        const m = pageMeta();
        document.title = m.title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', m.description);
    }
    else {
        document.title = lang === 'et' ? originalMeta.title : I18N_RU['meta.title'];
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute('content', lang === 'et' ? originalMeta.description : I18N_RU['meta.description']);
    }
    document.querySelectorAll('[data-lang]').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
    document.querySelectorAll('.lang-switch').forEach((el) => (el.dataset.active = lang));
    langListeners.forEach((fn) => fn());
    if (persist) {
        try {
            localStorage.setItem(LANG_STORAGE_KEY, lang);
        }
        catch {
            /* хранилище недоступно */
        }
        const url = new URL(location.href);
        if (url.searchParams.has('lang')) {
            url.searchParams.set('lang', lang);
            history.replaceState(null, '', url.toString());
        }
    }
}
function findScrollAnchor() {
    const headerH = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
    let el = document.elementFromPoint(Math.round(window.innerWidth / 2), Math.round(headerH + 8));
    if (!el || el === document.documentElement || el === document.body)
        return null;
    const top = el.getBoundingClientRect().top;
    const path = [];
    // Корень — ближайший предок, который не пересоздаётся при смене языка
    let root = el;
    while (root.parentElement && !root.matches('main, [data-prices], .site-footer, body')) {
        path.unshift(Array.prototype.indexOf.call(root.parentElement.children, root));
        root = root.parentElement;
    }
    return { root, path, top };
}
function resolveAnchor(a) {
    let el = a.root;
    for (const i of a.path) {
        const next = el.children[i];
        if (!next)
            break;
        el = next;
    }
    return el;
}
let langSwitching = false;
function switchLang(lang) {
    if (lang === currentLang || langSwitching)
        return;
    const root = document.documentElement;
    const swap = () => {
        const anchor = window.scrollY > 0 ? findScrollAnchor() : null;
        root.style.overflowAnchor = 'none';
        applyLang(lang, true);
        if (anchor) {
            const delta = resolveAnchor(anchor).getBoundingClientRect().top - anchor.top;
            if (Math.abs(delta) > 0.5)
                window.scrollBy({ top: delta, left: 0, behavior: 'instant' });
        }
        root.style.overflowAnchor = '';
    };
    if (prefersReducedMotion()) {
        swap();
        return;
    }
    // Короткая анимация: тексты плавно гаснут, язык меняется, тексты плавно появляются.
    langSwitching = true;
    root.classList.add('lang-out');
    window.setTimeout(() => {
        swap();
        requestAnimationFrame(() => {
            root.classList.remove('lang-out');
            langSwitching = false;
        });
    }, 170);
}
function initLangSwitch() {
    document.querySelectorAll('[data-lang]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            switchLang(btn.dataset.lang);
        });
    });
}
// ---------- Меню ----------
function initNav() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('main-nav');
    const mobile = window.matchMedia('(max-width: 899.98px)');
    const setOpen = (open) => {
        header.classList.toggle('menu-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? t('menuClose') : t('menuOpen'));
    };
    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
    toggle.addEventListener('click', () => setOpen(!isOpen()));
    nav.addEventListener('click', (e) => {
        if (e.target.closest('a'))
            setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen()) {
            setOpen(false);
            toggle.focus();
        }
    });
    document.addEventListener('click', (e) => {
        if (isOpen() && !header.contains(e.target))
            setOpen(false);
    });
    mobile.addEventListener?.('change', () => setOpen(false));
    langListeners.push(() => setOpen(isOpen()));
    // «Главная» и логотип — к самому началу страницы
    document.querySelectorAll('a[href="#home"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
            if (location.hash)
                history.replaceState(null, '', location.pathname + location.search);
        });
    });
    // Подсветка текущего раздела в меню (только на главной)
    if (document.body.dataset.categoryPage)
        return;
    const links = new Map();
    nav.querySelectorAll('.nav-list a').forEach((a) => links.set(a.hash.slice(1), a));
    const sectionToNav = { home: 'home', services: 'home', prices: 'prices', about: 'about', works: 'works', contact: '' };
    const visible = new Map();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((en) => visible.set(en.target.id, en.isIntersecting ? en.intersectionRatio : 0));
        let best = '';
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
            if (ratio > bestRatio) {
                bestRatio = ratio;
                best = id;
            }
        });
        const active = sectionToNav[best] ?? '';
        links.forEach((a, id) => {
            if (id === active)
                a.setAttribute('aria-current', 'true');
            else
                a.removeAttribute('aria-current');
        });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.01, 0.25, 0.5, 1] });
    Object.keys(sectionToNav).forEach((id) => {
        const el = document.getElementById(id);
        if (el)
            observer.observe(el);
    });
}
// ---------- Цены ----------
function formatPrice(value) {
    const fmt = new Intl.NumberFormat(currentLang === 'et' ? 'et-EE' : 'ru-RU', {
        minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
        maximumFractionDigits: 3,
    });
    return `${fmt.format(value)} €`;
}
function renderPrices() {
    const root = document.querySelector('[data-prices]');
    if (!root)
        return;
    root.innerHTML = PRICE_GROUPS.map((group) => {
        const rows = group.items
            .map((item) => {
            const note = item.note ? `<span class="price-note-small">${escapeHtml(loc(item.note))}</span>` : '';
            const value = item.from === undefined
                ? `<div class="price-value price-value--request">${escapeHtml(t('priceOnRequest'))}</div>`
                : `<div class="price-value"><span class="price-from">${escapeHtml(t('priceFrom'))}</span> ` +
                    `<strong>${formatPrice(item.from)}</strong>` +
                    (item.unit ? ` <span class="price-unit">/ ${escapeHtml(loc(item.unit))}</span>` : '') +
                    `</div>`;
            return `<li class="price-row"><div class="price-name"><span>${escapeHtml(loc(item.name))}</span>${note}</div>${value}</li>`;
        })
            .join('');
        return `<article class="price-group"><h3>${escapeHtml(loc(group.title))}</h3><ul class="price-list">${rows}</ul></article>`;
    }).join('');
}
// ---------- Работы ----------
function availableWorks(cat) {
    return cat.works.filter((w) => {
        if (w.enabled === false)
            return false;
        const ok = !!(IMAGES[w.before] && IMAGES[w.after]);
        if (!ok)
            console.warn(`[PVL] Пример не показан — нет фото: ${w.before} / ${w.after}`);
        return ok;
    });
}
function featuredWork(cat) {
    const list = availableWorks(cat);
    return list.find((w) => w.featured) ?? list[0];
}
const ARROW_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
/** Главная: по одному примеру из каждой категории со ссылкой на страницу категории. */
function initFeaturedWorks(grid, empty) {
    const updates = [];
    for (const cat of WORK_CATEGORIES) {
        const work = featuredWork(cat);
        if (!work)
            continue;
        const count = availableWorks(cat).length;
        const fig = document.createElement('figure');
        fig.className = 'work-card work-card--featured';
        fig.innerHTML =
            `<div class="work-media"></div>` +
                `<figcaption><h3></h3><p></p><a class="work-link" href="${escapeHtml(cat.page)}"><span></span>${ARROW_ICON}</a></figcaption>`;
        grid.append(fig);
        const view = createWorkView(fig.querySelector('.work-media'), work);
        const h3 = fig.querySelector('h3');
        const p = fig.querySelector('p');
        const linkText = fig.querySelector('.work-link span');
        updates.push(() => {
            h3.textContent = loc(cat.title);
            p.textContent = loc(cat.short);
            linkText.textContent = t('allWorks', { n: count });
            view.updateLabels();
        });
    }
    if (!updates.length) {
        grid.hidden = true;
        if (empty)
            empty.hidden = false;
        return;
    }
    const update = () => updates.forEach((fn) => fn());
    update();
    langListeners.push(update);
}
/** Страница категории: все примеры, описание и ссылки на другие категории. */
function initCategoryPage(cat) {
    const grid = document.querySelector('[data-works]');
    const empty = document.querySelector('[data-works-empty]');
    const updates = [];
    if (grid) {
        const list = availableWorks(cat);
        for (const work of list) {
            const fig = document.createElement('figure');
            fig.className = 'work-card';
            fig.innerHTML = `<div class="work-media"></div><figcaption><h3></h3>${work.text ? '<p></p>' : ''}</figcaption>`;
            grid.append(fig);
            const view = createWorkView(fig.querySelector('.work-media'), work);
            const h3 = fig.querySelector('h3');
            const p = fig.querySelector('p');
            updates.push(() => {
                h3.textContent = loc(work.title);
                if (p)
                    p.textContent = loc(work.text);
                view.updateLabels();
            });
        }
        if (!list.length) {
            grid.hidden = true;
            if (empty)
                empty.hidden = false;
        }
    }
    // Тексты категории (на странице они уже есть на эстонском — для перевода)
    updates.push(() => {
        document.querySelectorAll('[data-cat-field]').forEach((el) => {
            const [field, idx] = el.dataset.catField.split(':');
            let value;
            if (field === 'title')
                value = cat.title;
            else if (field === 'intro')
                value = cat.intro;
            else if (field === 'p')
                value = cat.paragraphs[Number(idx)];
            else if (field === 'inc')
                value = cat.includes[Number(idx)];
            if (value)
                el.textContent = loc(value);
        });
    });
    // Другие категории
    const others = document.querySelector('[data-other-cats]');
    if (others) {
        for (const other of WORK_CATEGORIES) {
            if (other === cat)
                continue;
            const work = featuredWork(other);
            const a = document.createElement('a');
            a.className = 'cat-card';
            a.href = other.page;
            a.innerHTML =
                `<span class="cat-card-media">${work ? pictureHtml(work.after, { alt: '', sizes: '(min-width: 900px) 120px, 96px', focus: work.focus }) : ''}</span>` +
                    `<span class="cat-card-body"><strong></strong><span></span></span>${ARROW_ICON}`;
            others.append(a);
            const strong = a.querySelector('strong');
            const span = a.querySelector('.cat-card-body > span');
            updates.push(() => {
                strong.textContent = loc(other.title);
                span.textContent = loc(other.short);
            });
        }
    }
    pageMeta = () => ({ title: `${loc(cat.title)} — PVL Teenused OÜ`, description: loc(cat.intro) });
    const update = () => updates.forEach((fn) => fn());
    update();
    langListeners.push(update);
}
function initWorks() {
    const catPage = document.body.dataset.categoryPage;
    if (catPage) {
        const cat = WORK_CATEGORIES.find((c) => c.page === catPage);
        if (cat)
            initCategoryPage(cat);
        return;
    }
    const grid = document.querySelector('[data-works]');
    if (grid)
        initFeaturedWorks(grid, document.querySelector('[data-works-empty]'));
}
// ---------- Фото в разделе «О нас» ----------
function initAboutImage() {
    const fig = document.querySelector('[data-about-image]');
    if (!fig)
        return;
    const key = fig.dataset.aboutImage;
    if (!IMAGES[key]) {
        fig.hidden = true;
        return;
    }
    fig.innerHTML = pictureHtml(key, { alt: t('aboutAlt'), sizes: '(min-width: 900px) 40vw, 100vw' });
    langListeners.push(() => {
        const img = fig.querySelector('img');
        if (img)
            img.alt = t('aboutAlt');
    });
}
// ---------- Запуск ----------
function init() {
    document.documentElement.classList.add('js');
    captureOriginals();
    currentLang = readInitialLang();
    renderPrices();
    langListeners.push(renderPrices);
    initAboutImage();
    initWorks();
    const sliderRoot = document.querySelector('[data-hero-slider]');
    const controls = document.querySelector('[data-hero-controls]');
    if (sliderRoot && controls) {
        const slider = new HeroSlider(sliderRoot, controls, HERO_IMAGES);
        langListeners.push(() => slider.updateLabels());
    }
    initRequestForm();
    initNav();
    initLangSwitch();
    applyLang(currentLang, false);
    document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));
}
if (typeof document !== 'undefined') {
    init();
}
else {
    // Файл запущен в Node.js (например, кнопкой Run в WebStorm), а не в браузере.
    // Вместо ошибки запускаем локальный сервер, чтобы сайт можно было открыть в браузере.
    console.log('src/index.ts — код для браузера. Запускаю локальный сервер сайта…');
    import('../scripts/serve.mjs');
}
