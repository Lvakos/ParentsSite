"use strict";
// Общие помощники: фото, экранирование, настройки анимации.
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
function prefersReducedMotion() {
    return reducedMotionQuery.matches;
}
function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
function getImage(key) {
    const img = IMAGES[key];
    if (!img)
        console.warn(`[PVL] Фото не найдено: photos/${key} — выполните npm run images`);
    return img;
}
/** HTML для <picture> с WebP разных размеров и JPEG для старых браузеров. */
function pictureHtml(key, o) {
    const img = getImage(key);
    if (!img)
        return '';
    const srcset = img.widths.map((w) => `${img.base}-${w}.webp ${w}w`).join(', ');
    const fallback = `${img.base}-${img.fallbackWidth}.jpg`;
    const pre = o.deferred ? 'data-' : '';
    const style = o.focus ? ` style="object-position:${escapeHtml(o.focus)}"` : '';
    return (`<picture${o.className ? ` class="${o.className}"` : ''}>` +
        `<source type="image/webp" ${pre}srcset="${srcset}" sizes="${o.sizes}">` +
        `<img ${pre}src="${fallback}" alt="${escapeHtml(o.alt)}" width="${img.w}" height="${img.h}"` +
        ` decoding="async" loading="${o.loading ?? 'lazy'}"` +
        (o.fetchPriority ? ` fetchpriority="${o.fetchPriority}"` : '') +
        (o.imgClass ? ` class="${o.imgClass}"` : '') +
        `${style}></picture>`);
}
/** Подставляет отложенные srcset/src (для следующих слайдов). */
function hydratePicture(root) {
    if (!root)
        return;
    root.querySelectorAll('[data-srcset], [data-src]').forEach((el) => {
        if (el.dataset.srcset) {
            el.setAttribute('srcset', el.dataset.srcset);
            el.removeAttribute('data-srcset');
        }
        if (el.dataset.src) {
            el.setAttribute('src', el.dataset.src);
            el.removeAttribute('data-src');
        }
    });
}
