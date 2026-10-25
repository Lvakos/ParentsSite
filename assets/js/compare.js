"use strict";
// Сравнение фото «до / после» с перетаскиваемым разделителем.
// Работает мышью, касанием и с клавиатуры (стрелки, PageUp/PageDown, Home/End).
const KNOB_ICON = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
class CompareSlider {
    constructor(container, work) {
        this.work = work;
        this.pos = 50;
        this.mode = 'idle';
        this.pointerId = null;
        this.startX = 0;
        this.startY = 0;
        this.onDown = (e) => {
            if (e.button !== 0)
                return;
            this.pointerId = e.pointerId;
            this.startX = e.clientX;
            this.startY = e.clientY;
            const onHandle = !!e.target.closest('.compare-handle');
            if (e.pointerType === 'mouse' || onHandle) {
                e.preventDefault();
                if (onHandle)
                    this.handle.focus({ preventScroll: true });
                this.startDrag(e);
                if (!onHandle)
                    this.setFromX(e.clientX);
            }
            else {
                // Касание по фото: ждём, куда пойдёт палец — вбок (двигаем разделитель) или вверх-вниз (прокрутка).
                this.mode = 'pending';
            }
        };
        this.onMove = (e) => {
            if (e.pointerId !== this.pointerId)
                return;
            if (this.mode === 'pending') {
                const dx = Math.abs(e.clientX - this.startX);
                const dy = Math.abs(e.clientY - this.startY);
                if (dx > 6 && dx > dy)
                    this.startDrag(e);
                else if (dy > 8) {
                    this.end();
                    return;
                }
            }
            if (this.mode === 'drag') {
                e.preventDefault();
                this.setFromX(e.clientX);
            }
        };
        this.onUp = (e) => {
            if (e.pointerId !== this.pointerId)
                return;
            if (this.mode === 'pending')
                this.setFromX(e.clientX); // короткое касание — переносим разделитель
            this.end();
        };
        this.onCancel = (e) => {
            if (e.pointerId === this.pointerId)
                this.end();
        };
        this.onKey = (e) => {
            const step = e.shiftKey ? 10 : 5;
            let next = null;
            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowDown':
                    next = this.pos - step;
                    break;
                case 'ArrowRight':
                case 'ArrowUp':
                    next = this.pos + step;
                    break;
                case 'PageDown':
                    next = this.pos - 20;
                    break;
                case 'PageUp':
                    next = this.pos + 20;
                    break;
                case 'Home':
                    next = 0;
                    break;
                case 'End':
                    next = 100;
                    break;
            }
            if (next !== null) {
                e.preventDefault();
                this.set(next);
            }
        };
        const focus = work.focus;
        container.innerHTML =
            `<div class="compare" style="--pos:50%">` +
                `<div class="compare-layer compare-after">${pictureHtml(work.after, { alt: '', sizes: '(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw', focus })}</div>` +
                `<div class="compare-layer compare-before">${pictureHtml(work.before, { alt: '', sizes: '(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw', focus })}</div>` +
                `<span class="compare-label compare-label--before" aria-hidden="true"></span>` +
                `<span class="compare-label compare-label--after" aria-hidden="true"></span>` +
                `<div class="compare-handle" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-orientation="horizontal">` +
                `<span class="compare-knob">${KNOB_ICON}</span></div>` +
                `</div>`;
        this.frame = container.querySelector('.compare');
        this.handle = container.querySelector('.compare-handle');
        this.labelBefore = container.querySelector('.compare-label--before');
        this.labelAfter = container.querySelector('.compare-label--after');
        this.imgBefore = container.querySelector('.compare-before img');
        this.imgAfter = container.querySelector('.compare-after img');
        this.frame.addEventListener('pointerdown', this.onDown);
        this.frame.addEventListener('pointermove', this.onMove);
        this.frame.addEventListener('pointerup', this.onUp);
        this.frame.addEventListener('pointercancel', this.onCancel);
        this.frame.addEventListener('lostpointercapture', this.onCancel);
        this.frame.addEventListener('dragstart', (e) => e.preventDefault());
        this.handle.addEventListener('keydown', this.onKey);
        this.updateLabels();
        this.set(50);
        this.alignIfNeeded();
    }
    /**
     * Если у фото «до» и «после» разные пропорции (например, одно обрезано),
     * масштабируем оба одинаково, чтобы объект на них совпадал.
     * Точка совмещения — focus (по умолчанию центр).
     */
    alignIfNeeded() {
        const a = IMAGES[this.work.before];
        const b = IMAGES[this.work.after];
        if (!a || !b || Math.abs(a.w / a.h - b.w / b.h) < 0.01)
            return;
        const [fx, fy] = parseFocus(this.work.focus);
        const imgs = [
            [this.imgBefore, a],
            [this.imgAfter, b],
        ];
        const layout = () => {
            const W = this.frame.clientWidth;
            const H = this.frame.clientHeight;
            if (!W || !H)
                return;
            const s = Math.max(W / Math.min(a.w, b.w), H / Math.min(a.h, b.h));
            for (const [img, info] of imgs) {
                if (!img)
                    continue;
                const w = info.w * s;
                const h = info.h * s;
                img.classList.add('is-aligned');
                img.style.width = `${w}px`;
                img.style.height = `${h}px`;
                img.style.left = `${(W - w) * fx}px`;
                img.style.top = `${(H - h) * fy}px`;
            }
        };
        layout();
        if (typeof ResizeObserver !== 'undefined')
            new ResizeObserver(layout).observe(this.frame);
        else
            addEventListener('resize', layout);
    }
    setFromX(clientX) {
        const rect = this.frame.getBoundingClientRect();
        if (rect.width > 0)
            this.set(((clientX - rect.left) / rect.width) * 100);
    }
    set(value) {
        this.pos = Math.min(100, Math.max(0, Math.round(value * 10) / 10));
        this.frame.style.setProperty('--pos', `${this.pos}%`);
        const now = Math.round(this.pos);
        this.handle.setAttribute('aria-valuenow', String(now));
        this.handle.setAttribute('aria-valuetext', t('compareValue', { before: now, after: 100 - now }));
        this.frame.classList.toggle('hide-before-label', this.pos < 18);
        this.frame.classList.toggle('hide-after-label', this.pos > 82);
    }
    startDrag(e) {
        this.mode = 'drag';
        try {
            this.frame.setPointerCapture(e.pointerId);
        }
        catch {
            /* указатель уже отпущен */
        }
        this.frame.classList.add('is-dragging');
    }
    end() {
        this.mode = 'idle';
        this.pointerId = null;
        this.frame.classList.remove('is-dragging');
    }
    /** Обновляет подписи при смене языка. */
    updateLabels() {
        const title = loc(this.work.title);
        this.labelBefore.textContent = t('before');
        this.labelAfter.textContent = t('after');
        if (this.imgBefore)
            this.imgBefore.alt = `${title} — ${t('before').toLowerCase()}`;
        if (this.imgAfter)
            this.imgAfter.alt = `${title} — ${t('after').toLowerCase()}`;
        this.handle.setAttribute('aria-label', t('compareLabel', { title }));
        this.set(this.pos);
    }
}
/** '30% 60%' → [0.3, 0.6] */
function parseFocus(focus) {
    const parts = (focus ?? '50% 50%').split(/\s+/).map((v) => parseFloat(v));
    const fx = Number.isFinite(parts[0]) ? parts[0] / 100 : 0.5;
    const fy = Number.isFinite(parts[1]) ? parts[1] / 100 : 0.5;
    return [Math.min(1, Math.max(0, fx)), Math.min(1, Math.max(0, fy))];
}
/** Две фотографии рядом — для пар, снятых с разных точек. */
class SidePair {
    constructor(container, work) {
        this.work = work;
        const sizes = '(min-width: 1024px) 190px, (min-width: 640px) 25vw, 50vw';
        container.innerHTML =
            `<div class="side-pair">` +
                `<div class="side-pair-item">${pictureHtml(work.before, { alt: '', sizes, focus: work.focus })}<span class="compare-label compare-label--before"></span></div>` +
                `<div class="side-pair-item">${pictureHtml(work.after, { alt: '', sizes, focus: work.focus })}<span class="compare-label compare-label--after"></span></div>` +
                `</div>`;
        const imgs = container.querySelectorAll('img');
        this.imgBefore = imgs[0] ?? null;
        this.imgAfter = imgs[1] ?? null;
        this.labelBefore = container.querySelector('.compare-label--before');
        this.labelAfter = container.querySelector('.compare-label--after');
        this.updateLabels();
    }
    updateLabels() {
        const title = loc(this.work.title);
        this.labelBefore.textContent = t('before');
        this.labelAfter.textContent = t('after');
        if (this.imgBefore)
            this.imgBefore.alt = `${title} — ${t('before').toLowerCase()}`;
        if (this.imgAfter)
            this.imgAfter.alt = `${title} — ${t('after').toLowerCase()}`;
    }
}
/** Создаёт блок сравнения нужного вида. */
function createWorkView(container, work) {
    return work.layout === 'side' ? new SidePair(container, work) : new CompareSlider(container, work);
}
