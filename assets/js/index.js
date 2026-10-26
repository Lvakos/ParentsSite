"use strict";
// Точка входа: язык, меню, цены, работы, слайдер.
const LANG_STORAGE_KEY = 'pvl-lang';
// ---------- Язык ----------
const originalText = new Map();
/** Сгенерированные тексты: эстонский — в разметке, русский — в атрибуте data-ru (data-ru-alt, data-ru-aria). */
const originalEt = new Map();
const originalAttrs = new Map();
const originalMeta = { title: '', description: '' };
function captureOriginals() {
    originalMeta.title = document.title;
    originalMeta.description = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    document.querySelectorAll('[data-i18n]').forEach((el) => originalText.set(el, el.textContent ?? ''));
    document.querySelectorAll('[data-ru], [data-ru-alt], [data-ru-aria]').forEach((el) => originalEt.set(el, {
        text: el.hasAttribute('data-ru') ? el.textContent ?? '' : undefined,
        alt: el.getAttribute('alt') ?? undefined,
        aria: el.getAttribute('aria-label') ?? undefined,
    }));
    const body = document.body.dataset;
    if (body.ruTitle) {
        const et = { title: document.title, description: originalMeta.description };
        pageMeta = () => currentLang === 'ru' ? { title: body.ruTitle, description: body.ruDescription ?? et.description } : et;
    }
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
    originalEt.forEach((et, el) => {
        const ds = el.dataset;
        if (et.text !== undefined)
            el.textContent = lang === 'ru' ? (ds.ru ?? et.text) : et.text;
        if (ds.ruAlt !== undefined && et.alt !== undefined)
            el.setAttribute('alt', lang === 'ru' ? ds.ruAlt : et.alt);
        if (ds.ruAria !== undefined && et.aria !== undefined)
            el.setAttribute('aria-label', lang === 'ru' ? ds.ruAria : et.aria);
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
    // Страница была скрыта, пока не подставлен нужный язык (см. LANG-BOOT в <head>) — плавно показываем
    document.documentElement.classList.remove('lang-boot');
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
    if (document.body.dataset.servicePage)
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
function isWorkAvailable(id) {
    const w = WORKS[id];
    if (!w) {
        console.warn(`[PVL] Пример «${id}» не найден в WORKS`);
        return false;
    }
    if (w.enabled === false)
        return false;
    const ok = !!(IMAGES[w.before] && IMAGES[w.after]);
    if (!ok)
        console.warn(`[PVL] Пример не показан — нет фото: ${w.before} / ${w.after}`);
    return ok;
}
/** Карточка примера «до / после». */
function createWorkCard(work, className) {
    const fig = document.createElement('figure');
    fig.className = className;
    fig.innerHTML = `<div class="work-media"></div><figcaption><h3></h3>${work.text ? '<p></p>' : ''}</figcaption>`;
    const view = createWorkView(fig.querySelector('.work-media'), work);
    const h3 = fig.querySelector('h3');
    const p = fig.querySelector('p');
    return {
        el: fig,
        update: () => {
            h3.textContent = loc(work.title);
            if (p)
                p.textContent = loc(work.text);
            view.updateLabels();
        },
    };
}
/** Главная: все примеры в случайном порядке, карусель с постраничной навигацией. */
function initFeaturedWorks(grid, empty) {
    const works = Object.keys(WORKS).filter(isWorkAvailable).map((id) => WORKS[id]);
    for (let i = works.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [works[i], works[j]] = [works[j], works[i]];
    }
    const updates = [];
    for (const work of works) {
        const card = createWorkCard(work, 'work-card work-card--featured');
        grid.append(card.el);
        updates.push(card.update);
    }
    if (!works.length) {
        grid.hidden = true;
        if (empty)
            empty.hidden = false;
        return;
    }
    const update = () => updates.forEach(fn => fn());
    update();
    langListeners.push(update);
    const wrap = grid.closest('.work-carousel');
    if (!wrap)
        return;
    const dots = wrap.parentElement.querySelector('[data-work-dots]');
    const prev = wrap.querySelector('[data-work-prev]');
    const next = wrap.querySelector('[data-work-next]');
    const slides = Array.from(grid.children);
    let stops = [];
    let page = 0;
    const sync = () => {
        page = stops.reduce((best, x, i) => Math.abs(x - grid.scrollLeft) < Math.abs(stops[best] - grid.scrollLeft) ? i : best, 0);
        dots.querySelectorAll('button').forEach((dot, i) => dot.setAttribute('aria-current', String(i === page)));
    };
    const go = (index) => {
        page = (index + stops.length) % stops.length;
        grid.scrollTo({ left: stops[page], behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    };
    const layout = () => {
        const count = Number(getComputedStyle(grid).getPropertyValue('--visible-cards')) || 1;
        const gap = parseFloat(getComputedStyle(grid).columnGap) || 0;
        const step = slides[0].getBoundingClientRect().width + gap;
        const max = Math.max(0, grid.scrollWidth - grid.clientWidth);
        stops = Array.from({ length: Math.ceil(slides.length / count) }, (_, i) => Math.min(i * count * step, max));
        stops = [...new Set(stops)];
        dots.replaceChildren(...stops.map((_, i) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('aria-label', String(i + 1));
            button.addEventListener('click', () => go(i));
            return button;
        }));
        prev.hidden = next.hidden = dots.hidden = stops.length < 2;
        grid.scrollTo({ left: stops[Math.min(page, stops.length - 1)], behavior: 'instant' });
        sync();
    };
    prev.addEventListener('click', () => go(page - 1));
    next.addEventListener('click', () => go(page + 1));
    grid.addEventListener('scroll', sync, { passive: true });
    new ResizeObserver(layout).observe(grid);
    layout();
}
/** Страница услуги: примеры «до / после», перечисленные в SERVICES → examples. */
function initServiceWorks(grid) {
    const ids = (grid.dataset.serviceWorks ?? '').split(',').map((s) => s.trim()).filter(isWorkAvailable);
    const updates = ids.map((id) => {
        const card = createWorkCard(WORKS[id], 'work-card');
        grid.append(card.el);
        return card.update;
    });
    if (!ids.length) {
        grid.hidden = true;
        const empty = document.querySelector('[data-works-empty]');
        if (empty)
            empty.hidden = false;
        return;
    }
    const update = () => updates.forEach((fn) => fn());
    update();
    langListeners.push(update);
}
function initWorks() {
    const serviceGrid = document.querySelector('[data-service-works]');
    if (serviceGrid) {
        initServiceWorks(serviceGrid);
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
// ---------- Плавность ----------
/** Блоки с data-reveal мягко появляются, когда до них доходит прокрутка. */
function initReveal() {
    const items = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!items.length || prefersReducedMotion() || !('IntersectionObserver' in window))
        return;
    const io = new IntersectionObserver((entries) => {
        for (const en of entries) {
            if (!en.isIntersecting)
                continue;
            en.target.classList.add('is-visible');
            io.unobserve(en.target);
        }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    const perParent = new Map();
    for (const el of items) {
        // То, что уже на экране, не прячем — иначе страница мигнёт
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92)
            continue;
        const n = perParent.get(el.parentElement) ?? 0;
        perParent.set(el.parentElement, n + 1);
        el.style.setProperty('--reveal-delay', `${Math.min(n, 4) * 70}ms`);
        el.classList.add('reveal');
        io.observe(el);
    }
}
/** Фотографии появляются плавно, когда загрузились. */
function initImageFade() {
    const mark = (e) => {
        const t = e.target;
        if (t instanceof HTMLImageElement)
            t.classList.add('is-loaded');
    };
    document.addEventListener('load', mark, true);
    document.addEventListener('error', mark, true);
    const check = () => document.querySelectorAll('img').forEach((img) => {
        if (img.complete)
            img.classList.add('is-loaded');
    });
    check();
    window.setTimeout(check, 2500); // на всякий случай
}
/** Лёгкая тень у шапки, когда страница прокручена. */
function initHeaderShadow() {
    const header = document.querySelector('.site-header');
    if (!header)
        return;
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
}
// ---------- Запуск ----------
function init() {
    document.documentElement.classList.add('js');
    initImageFade();
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
    initReveal();
    initHeaderShadow();
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
