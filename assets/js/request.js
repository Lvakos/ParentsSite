"use strict";
// Форма заявки «Kirjuta meile».
// Без сервиса форм (REQUEST_FORM.endpoint пустой) составляет письмо в почтовой программе посетителя.
// С сервисом форм отправляет заявку напрямую и сообщает об успехе только после ответа сервера.
const SERVICE_KEYS = ['community', 'home', 'yard'];
function initRequestForm() {
    const dialog = document.getElementById('request-dialog');
    if (!dialog || typeof dialog.showModal !== 'function')
        return; // старый браузер — работает обычная ссылка mailto
    const form = dialog.querySelector('[data-request-form]');
    const submit = dialog.querySelector('[data-request-submit]');
    const note = dialog.querySelector('[data-request-note]');
    const result = dialog.querySelector('[data-request-result]');
    const resultTitle = dialog.querySelector('[data-request-result-title]');
    const resultText = dialog.querySelector('[data-request-result-text]');
    const copyBtn = dialog.querySelector('[data-request-copy]');
    const useEndpoint = REQUEST_FORM.endpoint.trim() !== '';
    let lastText = '';
    let sending = false;
    const field = (name) => form.elements.namedItem(name);
    const serviceBoxes = () => Array.from(form.querySelectorAll('input[name="services"]'));
    const updateTexts = () => {
        if (!sending)
            submit.textContent = useEndpoint ? t('submitSend') : t('submitMail');
        note.hidden = useEndpoint;
    };
    updateTexts();
    langListeners.push(updateTexts);
    // ---- Открытие и закрытие ----
    const open = (service) => {
        form.hidden = false;
        result.hidden = true;
        // Услуга отмечается заранее: по кнопке («Заказать» у вида работ) или по странице услуги
        const preset = service || document.body.dataset.servicePage;
        if (service) {
            // Кнопка у конкретной услуги — отмечаем только её
            serviceBoxes().forEach((b) => (b.checked = b.value === service));
        }
        else if (preset && !serviceBoxes().some((b) => b.checked)) {
            const box = serviceBoxes().find((b) => b.value === preset);
            if (box)
                box.checked = true;
        }
        dialog.showModal();
        document.documentElement.classList.add('dialog-open');
        field('name').focus();
    };
    document.querySelectorAll('[data-open-request]').forEach((el) => el.addEventListener('click', (e) => {
        e.preventDefault();
        open(el.dataset.service);
    }));
    dialog.querySelectorAll('[data-close-request]').forEach((el) => el.addEventListener('click', () => dialog.close()));
    // Щелчок по затемнённому фону закрывает окно
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog)
            dialog.close();
    });
    dialog.addEventListener('close', () => {
        document.documentElement.classList.remove('dialog-open');
        if (!result.hidden) {
            // Заявка уже составлена — в следующий раз начинаем с чистой формы
            form.reset();
            clearErrors();
        }
    });
    // ---- Проверка полей ----
    const showError = (id, control, message) => {
        const err = document.getElementById(id);
        err.textContent = message;
        err.hidden = false;
        control?.setAttribute('aria-invalid', 'true');
    };
    function clearErrors() {
        form.querySelectorAll('.field-error').forEach((el) => {
            el.hidden = true;
            el.textContent = '';
        });
        form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    }
    const read = () => ({
        name: field('name').value.trim(),
        phone: field('phone').value.trim(),
        email: field('email').value.trim(),
        services: serviceBoxes()
            .filter((b) => b.checked)
            .map((b) => b.value),
        description: field('description').value.trim(),
    });
    const validate = (d) => {
        clearErrors();
        let first = null;
        const fail = (id, control, key) => {
            showError(id, control, t(key));
            first ?? (first = control);
        };
        if (d.name.length < 2)
            fail('rq-name-err', field('name'), 'errName');
        const digits = d.phone.replace(/\D/g, '');
        if (!/^[+\d][\d\s()-]*$/.test(d.phone) || digits.length < 7 || digits.length > 15)
            fail('rq-phone-err', field('phone'), 'errPhone');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email))
            fail('rq-email-err', field('email'), 'errEmail');
        if (!d.services.length)
            fail('rq-services-err', serviceBoxes()[0], 'errServices');
        if (d.description.length < 10)
            fail('rq-desc-err', field('description'), 'errDesc');
        return first;
    };
    // Ошибка исчезает, как только поле исправлено
    const hideError = (errId, control) => {
        const err = document.getElementById(errId);
        if (err)
            err.hidden = true;
        control?.removeAttribute('aria-invalid');
    };
    form.addEventListener('input', (e) => {
        const el = e.target;
        if (el.matches('input[name="services"]'))
            hideError('rq-services-err', serviceBoxes()[0]);
        else if (el.id)
            hideError(`${el.id}-err`, el);
    });
    // ---- Текст заявки ----
    const serviceName = (key) => {
        const span = form.querySelector(`[data-i18n="form.svc.${key}"]`);
        return span?.textContent?.trim() ?? ({ community: 'Уборка квартирных товариществ', home: 'Уборка квартиры / дома', yard: 'Покос травы и уход за участком' }[key] ?? key);
    };
    const compose = (d) => {
        const services = d.services.map(serviceName).join(', ');
        const text = `${t('lblName')}: ${d.name}\n` +
            `${t('lblPhone')}: ${d.phone}\n` +
            `${t('lblEmail')}: ${d.email}\n` +
            `${t('lblServices')}: ${services}\n\n` +
            `${t('lblDesc')}:\n${d.description}\n`;
        return { subject: t('mailSubject', { services }), text, services };
    };
    const showResult = (kind) => {
        const vars = { email: REQUEST_FORM.email, phone: REQUEST_FORM.phone };
        resultTitle.textContent = t(`${kind}Title`);
        resultText.textContent = t(`${kind}Text`, vars);
        result.dataset.kind = kind;
        copyBtn.hidden = kind === 'ok';
        copyBtn.textContent = t('copyText');
        form.hidden = true;
        result.hidden = false;
        result.focus();
    };
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(lastText);
        }
        catch {
            const ta = document.createElement('textarea');
            ta.value = lastText;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            dialog.append(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
        }
        copyBtn.textContent = t('copied');
    });
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (sending)
            return;
        const data = read();
        const invalid = validate(data);
        if (invalid) {
            invalid.focus();
            return;
        }
        const { subject, text, services } = compose(data);
        lastText = text;
        if (!useEndpoint) {
            const href = `mailto:${REQUEST_FORM.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
            openMailto(href);
            showResult('mail');
            return;
        }
        sending = true;
        submit.disabled = true;
        submit.textContent = t('sending');
        try {
            const res = await fetch(REQUEST_FORM.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    ...REQUEST_FORM.extraFields,
                    subject,
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    services,
                    serviceKeys: data.services,
                    description: data.description,
                    message: text,
                    lang: currentLang,
                    page: location.pathname.split('/').pop() || 'index.html',
                    website: form.elements.namedItem('website')?.value ?? '',
                }),
            });
            let ok = res.ok;
            try {
                const json = await res.clone().json();
                if (json && json.success === false)
                    ok = false;
            }
            catch {
                /* ответ не в формате JSON */
            }
            showResult(ok ? 'ok' : 'fail');
        }
        catch {
            showResult('fail');
        }
        finally {
            sending = false;
            submit.disabled = false;
            updateTexts();
        }
    });
}
/** Открывает почтовую программу с готовым письмом. */
function openMailto(href) {
    window.location.href = href;
}
