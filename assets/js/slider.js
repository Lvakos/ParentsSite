"use strict";
// Слайдер фотографий на главном экране.
// Фото берутся из photos/thumbnail (список HERO_IMAGES формируется скриптом build-images).
const ICONS = {
    prev: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    next: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    pause: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M8 5v14M16 5v14" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',
    play: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
};
class HeroSlider {
    constructor(root, controls, keys) {
        this.root = root;
        this.controls = controls;
        this.keys = keys;
        this.slides = [];
        this.dots = [];
        this.pauseBtn = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.dotsGroup = null;
        this.index = 0;
        this.hero = root.closest('.hero');
        this.slidesEl = root.querySelector('.hero-slides');
        this.userPaused = prefersReducedMotion();
        this.keys = keys.filter((k) => IMAGES[k]);
        if (!this.keys.length)
            return;
        this.renderSlides();
        this.hero.classList.add('hero--has-photo');
        if (this.keys.length > 1) {
            this.renderControls();
            this.bindEvents();
            this.schedule();
        }
    }
    altFor(key) {
        return loc(HERO_SLIDE_OPTIONS[key]?.alt) || loc(HERO_DEFAULT_ALT);
    }
    renderSlides() {
        const total = this.keys.length;
        this.slidesEl.innerHTML = this.keys
            .map((key, i) => {
            const pic = pictureHtml(key, {
                alt: this.altFor(key),
                sizes: '100vw',
                imgClass: 'hero-img',
                loading: i === 0 ? 'eager' : 'lazy',
                fetchPriority: i === 0 ? 'high' : undefined,
                focus: HERO_SLIDE_OPTIONS[key]?.focus,
                deferred: i > 0,
            });
            const group = total > 1 ? ` role="group" aria-roledescription="slide" aria-label="${t('slide', { n: i + 1, total })}"` : '';
            const hidden = i > 0 ? ' aria-hidden="true"' : '';
            return `<div class="hero-slide${i === 0 ? ' is-active' : ''}"${group}${hidden}>${pic}</div>`;
        })
            .join('');
        this.slides = Array.from(this.slidesEl.children);
        // Остальные слайды подгружаем после загрузки страницы, чтобы не мешать первому фото.
        const loadRest = () => this.slides.forEach((s) => hydratePicture(s));
        if (document.readyState === 'complete')
            window.setTimeout(loadRest, 300);
        else
            window.addEventListener('load', () => window.setTimeout(loadRest, 300), { once: true });
    }
    renderControls() {
        const dots = this.keys
            .map((_, i) => `<button type="button" class="hero-dot" data-index="${i}"${i === 0 ? ' aria-current="true"' : ''}></button>`)
            .join('');
        this.controls.innerHTML =
            `<div class="hero-dots" role="group">${dots}</div>` +
                `<div class="hero-buttons">` +
                `<button type="button" class="hero-btn" data-action="prev">${ICONS.prev}</button>` +
                `<button type="button" class="hero-btn" data-action="toggle"></button>` +
                `<button type="button" class="hero-btn" data-action="next">${ICONS.next}</button>` +
                `</div>`;
        this.controls.hidden = false;
        this.dots = Array.from(this.controls.querySelectorAll('.hero-dot'));
        this.dotsGroup = this.controls.querySelector('.hero-dots');
        this.prevBtn = this.controls.querySelector('[data-action="prev"]');
        this.nextBtn = this.controls.querySelector('[data-action="next"]');
        this.pauseBtn = this.controls.querySelector('[data-action="toggle"]');
        this.updateLabels();
    }
    bindEvents() {
        this.controls.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn)
                return;
            if (btn.classList.contains('hero-dot'))
                this.goTo(Number(btn.dataset.index));
            else if (btn.dataset.action === 'prev')
                this.goTo(this.index - 1);
            else if (btn.dataset.action === 'next')
                this.goTo(this.index + 1);
            else if (btn.dataset.action === 'toggle') {
                this.userPaused = !this.userPaused;
                this.updateLabels();
                this.schedule();
            }
        });
        this.controls.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.goTo(this.index - 1);
                e.preventDefault();
            }
            else if (e.key === 'ArrowRight') {
                this.goTo(this.index + 1);
                e.preventDefault();
            }
        });
        document.addEventListener('visibilitychange', () => this.schedule());
        reducedMotionQuery.addEventListener?.('change', () => {
            if (prefersReducedMotion()) {
                this.userPaused = true;
                this.updateLabels();
                this.schedule();
            }
        });
        // Свайп на сенсорных экранах
        let startX = 0;
        let startY = 0;
        let tracking = false;
        this.hero.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'mouse' || e.target.closest('a, button'))
                return;
            tracking = true;
            startX = e.clientX;
            startY = e.clientY;
        });
        this.hero.addEventListener('pointerup', (e) => {
            if (!tracking)
                return;
            tracking = false;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3)
                this.goTo(this.index + (dx < 0 ? 1 : -1));
        });
        this.hero.addEventListener('pointercancel', () => {
            tracking = false;
        });
    }
    isPlaying() {
        return !this.userPaused && !document.hidden;
    }
    schedule() {
        window.clearTimeout(this.timer);
        this.slidesEl.setAttribute('aria-live', this.userPaused ? 'polite' : 'off');
        if (this.isPlaying())
            this.timer = window.setTimeout(() => this.goTo(this.index + 1), HERO_AUTOPLAY_MS);
    }
    goTo(i) {
        const total = this.slides.length;
        if (total < 2)
            return;
        const next = (i + total) % total;
        hydratePicture(this.slides[next]);
        hydratePicture(this.slides[(next + 1) % total]);
        this.slides.forEach((s, n) => {
            s.classList.toggle('is-active', n === next);
            if (n === next)
                s.removeAttribute('aria-hidden');
            else
                s.setAttribute('aria-hidden', 'true');
        });
        this.dots.forEach((d, n) => {
            if (n === next)
                d.setAttribute('aria-current', 'true');
            else
                d.removeAttribute('aria-current');
        });
        this.index = next;
        this.schedule();
    }
    /** Обновляет подписи при смене языка. */
    updateLabels() {
        const total = this.keys.length;
        this.slides.forEach((s, i) => {
            const img = s.querySelector('img');
            if (img)
                img.alt = this.altFor(this.keys[i]);
            if (total > 1)
                s.setAttribute('aria-label', t('slide', { n: i + 1, total }));
        });
        this.dots.forEach((d, i) => d.setAttribute('aria-label', t('dot', { n: i + 1 })));
        this.dotsGroup?.setAttribute('aria-label', loc({ et: 'Vali foto', ru: 'Выбор фото' }));
        this.prevBtn?.setAttribute('aria-label', t('prev'));
        this.nextBtn?.setAttribute('aria-label', t('next'));
        if (this.pauseBtn) {
            this.pauseBtn.innerHTML = this.userPaused ? ICONS.play : ICONS.pause;
            this.pauseBtn.setAttribute('aria-label', this.userPaused ? t('play') : t('pause'));
        }
    }
}
