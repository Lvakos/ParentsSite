"use strict";
// ============================================================================
//  НАСТРОЙКИ САЙТА PVL Teenused OÜ — здесь меняются цены, работы и слайдер.
//  После правок выполните:  npm run build
// ============================================================================
/** Язык, который открывается по умолчанию. */
const DEFAULT_LANG = 'ru';
const PRICE_GROUPS = [];
const HERO_SLIDE_OPTIONS = {
    'thumbnail/pokostravi': {
        focus: '35% 50%',
        alt: { et: 'Muru niitmine trimmeri ja muruniidukiga eramu aias', ru: 'Покос травы триммером и газонокосилкой на участке частного дома' },
    },
    'thumbnail/ChistayaKvartira': {
        focus: '40% 50%',
        alt: { et: 'Puhas ja hubane elutuba pärast koristust', ru: 'Чистая уютная гостиная после уборки' },
    },
    'thumbnail/ChistiyPodjezd': {
        focus: '35% 50%',
        alt: { et: 'Puhas ja valgusküllane kortermaja trepikoda', ru: 'Чистый светлый подъезд жилого дома' },
    },
    'thumbnail/uborkaterritory': {
        focus: '30% 50%',
        alt: { et: 'Langenud lehtede riisumine sügisel aias', ru: 'Уборка опавших листьев граблями в осеннем саду' },
    },
};
/** Подпись по умолчанию для фото слайдера, если для него не задан alt. */
const HERO_DEFAULT_ALT = {
    et: 'PVL Teenused OÜ töö: muru niitmine ja lehtede koristus',
    ru: 'Работа PVL Teenused OÜ: покос травы и уборка листьев',
};
/** Интервал автоматического переключения слайдов, мс. */
const HERO_AUTOPLAY_MS = 6000;
const REQUEST_FORM = {
    /** Адрес, на который составляется письмо. */
    email: 'info.vl@mail.ee',
    /** Телефон, который предлагается, если письмо не удалось отправить. */
    phone: '+372 5555 3545',
    /** Адрес сервиса форм (пусто — письмо через почтовую программу). */
    endpoint: '',
    /** Дополнительные поля для сервиса форм (например, ключ доступа). */
    extraFields: {},
};
const WORKS = {
    'territory-path': {
        before: 'uborkaTerritory/territorydo',
        after: 'uborkaTerritory/territoryposle',
        title: { et: 'Kõnnitee puhastus', ru: 'Очистка пешеходной дорожки' },
        text: { et: 'Plaaditud tee puhastati mustusest ja prahist.', ru: 'Дорожку из плитки очистили от грязи и мусора.' },
    },
    'territory-yard': {
        before: 'uborkaTerritory/territory2do',
        after: 'uborkaTerritory/territory2posle',
        title: { et: 'Platsi koristus', ru: 'Уборка площадки' },
        text: { et: 'Kattelt eemaldati liiv, kruus ja muu praht.', ru: 'С покрытия убрали песок, гравий и прочий мусор.' },
    },
    'window-grille': {
        before: 'moykaOkon/3moykaOkonDo',
        after: 'moykaOkon/3moykaOkonPosle',
        title: { et: 'Keldriakna pesu', ru: 'Мойка цокольного окна' },
        text: { et: 'Pesti klaas, raam ja dekoratiivne võre.', ru: 'Вымыты стекло, рама и декоративная решётка.' },
    },
    'window-sill': {
        before: 'moykaOkon/4moykaOkonDo',
        after: 'moykaOkon/4moykaOkonPosle',
        title: { et: 'Akna ja aknalaua pesu', ru: 'Мойка окна и подоконника' },
        text: { et: 'Puhastati klaasid, raamid ja aknalaud.', ru: 'Очищены стёкла, рамы и подоконник.' },
    },
    'window-basement': {
        before: 'moykaOkon/2moykaOkonDo',
        after: 'moykaOkon/2moykaOkonPosle',
        title: { et: 'Keldriakna ja aknapleki pesu', ru: 'Мойка цокольного окна и отлива' },
        text: { et: 'Pesti klaas, raam ja aknaplekk.', ru: 'Вымыты стекло, рама и оконный отлив.' },
        layout: 'side',
    },
    'window-flat': {
        before: 'moykaOkon/1moykaOkonDo',
        after: 'moykaOkon/1moykaOkonPosle',
        title: { et: 'Korteri akna pesu', ru: 'Мойка окна в квартире' },
        text: { et: 'Pesti klaasid, raamid ja aknalaud.', ru: 'Вымыты стёкла, рамы и подоконник.' },
        layout: 'side',
    },
    sofa: {
        before: 'glubokayachistka/1divando',
        after: 'glubokayachistka/1divanposle',
        title: { et: 'Diivani puhastus', ru: 'Чистка дивана' },
        text: { et: 'Pehme mööbli kanga süvapuhastus.', ru: 'Глубокая чистка обивки мягкой мебели.' },
        focus: '0% 50%',
    },
    mattress: {
        before: 'glubokayachistka/matrasdo',
        after: 'glubokayachistka/matrasposle',
        title: { et: 'Madratsi puhastus', ru: 'Чистка матраса' },
        text: { et: 'Madratsi pinnalt eemaldati plekid ja mustus.', ru: 'С поверхности матраса удалены пятна и загрязнения.' },
    },
    'sofa-2': {
        before: 'glubokayachistka/2divando',
        after: 'glubokayachistka/2divanposle',
        title: { et: 'Diivani istme puhastus', ru: 'Чистка сиденья дивана' },
        text: { et: 'Istmeosa ja seljatoe puhastus.', ru: 'Чистка сиденья и спинки.' },
        layout: 'side',
    },
    'hedge-sidewalk': {
        before: 'strizhkaKustov/kustido2',
        after: 'strizhkaKustov/kustiposle2',
        title: { et: 'Heki pügamine kõnnitee ääres', ru: 'Стрижка изгороди вдоль тротуара' },
        text: { et: 'Hekk pügati ühtlaseks.', ru: 'Изгородь подстрижена ровно.' },
        layout: 'side',
    },
    hedge: {
        before: 'strizhkaKustov/kustido1',
        after: 'strizhkaKustov/kustiposle1',
        title: { et: 'Heki pügamine', ru: 'Стрижка живой изгороди' },
        text: { et: 'Heki pügamine ja korrastamine.', ru: 'Стрижка и приведение изгороди в порядок.' },
        layout: 'side',
    },
};
const BY_AGREEMENT = { et: 'Kokkuleppel', ru: 'По договорённости' };
const SERVICES = [
    {
        id: 'community',
        page: 'tood-pehme-moobli-puhastus.html',
        image: 'kartochki/chistiypodjesd',
        title: { et: 'Korteriühistute koristus', ru: 'Уборка квартирных товариществ' },
        short: {
            et: 'Trepikodade ja territooriumi koristus ning kojamehe teenused.',
            ru: 'Уборка подъездов, территории и услуги дворника.',
        },
        price: BY_AGREEMENT,
        intro: {
            et: 'Hoiame korras trepikojad ja maja ümbruse — kokkulepitud graafiku alusel.',
            ru: 'Поддерживаем порядок в подъездах и на территории дома — по согласованному графику.',
        },
        about: [
            {
                et: 'Puhas trepikoda ja hoolitsetud õu on esimene, mida elanikud ja külalised näevad. Võtame enda peale trepikodade ja territooriumi regulaarse koristuse, et ühistu juhatus ei peaks iga töö jaoks eraldi tegijat otsima.',
                ru: 'Чистый подъезд и ухоженный двор — первое, что видят жильцы и гости дома. Мы берём на себя регулярную уборку лестничных клеток и территории, чтобы правлению товарищества не приходилось искать исполнителя для каждой задачи отдельно.',
            },
            {
                et: 'Tööde loetelu ja graafiku paneme kokku koos ühistuga: näiteks trepikodade iganädalane koristus ja territooriumi hooldus vastavalt hooajale. Hind sõltub trepikodade ja korruste arvust, territooriumi suurusest ning koristuse sagedusest.',
                ru: 'Перечень работ и график составляем вместе с товариществом: например, еженедельная уборка подъездов и уход за территорией по сезону. Стоимость зависит от количества подъездов и этажей, площади территории и частоты уборки.',
            },
        ],
        includes: [
            { et: 'Treppide ja korrusemademete pühkimine ja pesemine', ru: 'Подметание и мытьё лестниц и площадок' },
            { et: 'Käsipuude, aknalaudade ja postkastide puhastamine', ru: 'Протирка перил, подоконников и почтовых ящиков' },
            { et: 'Õue, kõnniteede ja platside koristus', ru: 'Уборка двора, дорожек и площадок' },
            { et: 'Muru niitmine ja põõsaste pügamine maja ümber', ru: 'Покос травы и стрижка кустов у дома' },
            { et: 'Töö kokkulepitud graafiku alusel', ru: 'Работа по согласованному графику' },
        ],
        optionsTitle: { et: 'Mida teeme', ru: 'Что мы делаем' },
        options: [
            {
                details: 'trepikodade-koristus',
                title: { et: 'Trepikodade koristus', ru: 'Уборка подъездов' },
                text: {
                    et: 'Treppide ja korrusemademete pühkimine ja märgpuhastus, käsipuude, aknalaudade, postkastide ja uste puhastamine ning sissepääsu korrastamine.',
                    ru: 'Подметание и влажная уборка лестниц и площадок, протирка перил, подоконников, почтовых ящиков и дверей, уборка входной зоны.',
                },
                price: BY_AGREEMENT,
            },
            {
                details: 'territooriumi-koristus',
                title: { et: 'Territooriumi koristus', ru: 'Уборка территории' },
                text: {
                    et: 'Prahi, lehtede ja liiva koristamine õuest, kõnniteedelt ja platsidelt ning sissepääsude ümbruse korrastamine.',
                    ru: 'Уборка мусора, листьев и песка во дворе, на дорожках и площадках, порядок у входов в дом.',
                },
                price: BY_AGREEMENT,
            },
            {
                details: 'kojamehe-teenused',
                title: { et: 'Kojamehe teenused', ru: 'Услуги дворника' },
                text: {
                    et: 'Maja ümbruse regulaarne hooldus kokkulepitud graafiku alusel: koristus, hooajatööd, muru niitmine ja põõsaste pügamine.',
                    ru: 'Регулярный уход за территорией дома по согласованному графику: уборка, сезонные работы, покос травы и стрижка кустов.',
                },
                price: BY_AGREEMENT,
            },
        ],
        examples: ['territory-path', 'territory-yard', 'window-grille', 'window-basement', 'hedge-sidewalk'],
    },
    {
        id: 'home',
        page: 'tood-akende-pesu.html',
        image: 'kartochki/chistayakvartira',
        title: { et: 'Korteri / maja koristus', ru: 'Уборка квартиры / дома' },
        short: {
            et: 'Hooldus- ja suurpuhastus, koristus pärast remonti ja kolimist, akende pesu ning pehme mööbli puhastus.',
            ru: 'Поддерживающая и генеральная уборка, после ремонта и переезда, мытьё окон и химчистка мебели.',
        },
        price: { et: 'alates 35 €', ru: 'от 35 €' },
        intro: {
            et: 'Hooldus- ja suurpuhastus, koristus pärast remonti ja kolimist, akende pesu ning pehme mööbli puhastus.',
            ru: 'Поддерживающая и генеральная уборка, уборка после ремонта и переезда, мытьё окон и химчистка мебели.',
        },
        about: [
            {
                et: 'Aitame hoida korras kortereid ja eramuid — alates regulaarsest koristusest kuni suurpuhastuseni pärast remonti või kolimist. Lisaks peseme aknaid ja puhastame pehmet mööblit.',
                ru: 'Помогаем поддерживать порядок в квартирах и частных домах — от регулярной уборки до генеральной уборки после ремонта или переезда. Также моем окна и чистим мягкую мебель.',
            },
            {
                et: 'Enne tööd täpsustame pinna, ruumide seisukorra ja teie soovid. Lõpliku hinna lepime kokku enne koristuse algust, et teaksite hinda juba ette.',
                ru: 'Перед работой уточняем площадь, состояние помещения и ваши пожелания. Окончательную стоимость согласовываем до начала уборки, чтобы вы знали цену заранее.',
            },
        ],
        includes: [
            { et: 'Tubade, köögi ja vannitoa koristus', ru: 'Уборка комнат, кухни и санузла' },
            { et: 'Akende, raamide ja aknalaudade pesu', ru: 'Мойка окон, рам и подоконников' },
            { et: 'Diivanite, madratsite ja vaipade puhastus', ru: 'Химчистка диванов, матрасов и ковров' },
            { et: 'Koristus pärast remonti ja kolimist', ru: 'Уборка после ремонта и переезда' },
        ],
        optionsTitle: { et: 'Tööde liigid ja hinnad', ru: 'Виды работ и цены' },
        options: [
            {
                details: 'hoolduskoristus',
                title: { et: 'Hoolduskoristus', ru: 'Поддерживающая уборка' },
                text: {
                    et: 'Regulaarne koristus puhtuse hoidmiseks: tolmu pühkimine ligipääsetavatelt pindadelt, põrandad, köök ja vannituba, prügi väljaviimine.',
                    ru: 'Регулярная уборка для поддержания чистоты: пыль с доступных поверхностей, полы, кухня и санузел, вынос мусора.',
                },
                price: { et: 'alates 35 €', ru: 'от 35 €' },
            },
            {
                details: 'suurpuhastus',
                title: { et: 'Suurpuhastus', ru: 'Генеральная уборка' },
                text: {
                    et: 'Kogu korteri või maja põhjalik koristus: raskesti ligipääsetavad kohad, köögimööbel ja -tehnika väljast, sanitaartehnika, uksed, põrandaliistud ja aknalauad.',
                    ru: 'Тщательная уборка всей квартиры или дома: труднодоступные места, кухонные фасады и техника снаружи, сантехника, двери, плинтусы и подоконники.',
                },
                price: { et: 'alates 95 €', ru: 'от 95 €' },
            },
            {
                details: 'remondijargne-koristus',
                title: { et: 'Koristus pärast remonti', ru: 'Уборка после ремонта' },
                text: {
                    et: 'Ehitustolmu ja viimistlusmaterjalide jälgede eemaldamine põrandatelt, akendelt, ustelt ja pindadelt, et ruume saaks kohe kasutama hakata.',
                    ru: 'Удаление строительной пыли и следов отделочных материалов с полов, окон, дверей и поверхностей, чтобы помещением можно было сразу пользоваться.',
                },
                price: { et: 'alates 119 €', ru: 'от 119 €' },
            },
            {
                details: 'kolimiskoristus',
                title: { et: 'Koristus pärast kolimist', ru: 'Уборка после переезда' },
                text: {
                    et: 'Tühja korteri või maja koristus enne või pärast kolimist: kapid seest, köök, vannituba, põrandad ja aknalauad.',
                    ru: 'Уборка пустой квартиры или дома до или после переезда: шкафы внутри, кухня, санузел, полы и подоконники.',
                },
                price: { et: 'alates 105 €', ru: 'от 105 €' },
            },
            {
                details: 'aknapesu',
                title: { et: 'Akende pesu', ru: 'Мытьё окон' },
                text: {
                    et: 'Klaaside, raamide ja aknalaudade pesu seest ja väljast. Hind sõltub akende arvust ja suurusest.',
                    ru: 'Мойка стёкол, рам и подоконников изнутри и снаружи. Стоимость зависит от количества и размера окон.',
                },
                price: { et: 'alates 6 €', ru: 'от 6 €' },
            },
            {
                details: 'diivanite-ja-vaipade-puhastus',
                title: { et: 'Diivanite ja vaipade puhastus', ru: 'Химчистка диванов и ковровых покрытий' },
                text: {
                    et: 'Pehme mööbli ja vaipkatete süvapuhastus: tolmu, plekkide ja igapäevase mustuse eemaldamine. Tulemus sõltub kangast ja plekkide vanusest.',
                    ru: 'Глубокая чистка обивки мягкой мебели и ковровых покрытий: удаление пыли, пятен и повседневных загрязнений. Результат зависит от ткани и давности пятен.',
                },
                price: { et: 'alates 55 €', ru: 'от 55 €' },
            },
        ],
        examples: ['sofa', 'mattress', 'window-sill', 'window-flat', 'sofa-2'],
    },
    {
        id: 'yard',
        page: 'tood-hekkide-pugamine.html',
        image: 'kartochki/pokoshenayatrava',
        title: { et: 'Muru niitmine ja aia hooldus', ru: 'Покос травы и уход за участком' },
        short: {
            et: 'Muru niitmine, hekkide ja põõsaste pügamine ning aia hooldus.',
            ru: 'Покос травы, стрижка живой изгороди и кустов и уход за участком.',
        },
        price: { et: 'alates 40 €', ru: 'от 40 €' },
        intro: {
            et: 'Muru niitmine, hekkide ja põõsaste pügamine ning aia hooldus kogu hooaja vältel.',
            ru: 'Покос травы, стрижка живой изгороди и кустов и уход за участком в течение всего сезона.',
        },
        about: [
            {
                et: 'Hooldame murusid, hekke ja põõsaid eramute juures ning korteriühistute territooriumil. Regulaarne niitmine ja pügamine hoiavad krundi korras kogu hooaja.',
                ru: 'Ухаживаем за газонами, живыми изгородями и кустами у частных домов и на территориях квартирных товариществ. Регулярный покос и стрижка сохраняют участок аккуратным весь сезон.',
            },
            {
                et: 'Niitmise hind sõltub pindalast ja rohu kõrgusest, heki pügamise hind heki pikkusest ja kõrgusest. Võite tellida ühekordse töö või regulaarse hoolduse.',
                ru: 'Стоимость покоса зависит от площади и высоты травы, а стрижки изгороди — от её длины и высоты. Можно заказать разовую работу или регулярный уход.',
            },
        ],
        includes: [
            { et: 'Muru niitmine ja servade trimmerdamine', ru: 'Покос газона и обработка краёв триммером' },
            { et: 'Kõrge ja võsastunud rohu niitmine', ru: 'Покос высокой и заросшей травы' },
            { et: 'Hekkide pügamine', ru: 'Стрижка живой изгороди' },
            { et: 'Põõsaste kujundamine', ru: 'Формирование кустов' },
            { et: 'Niidetud rohu ja lõikejääkide kokkukogumine', ru: 'Сбор скошенной травы и срезанных веток' },
        ],
        optionsTitle: { et: 'Tööde liigid ja hinnad', ru: 'Виды работ и цены' },
        options: [
            {
                details: 'muru-niitmine',
                title: { et: 'Väike krunt', ru: 'Маленький участок' },
                text: {
                    et: 'Muru niitmine eramu või ridaelamu juures ning servade trimmerdamine teede ja aia ääres.',
                    ru: 'Покос газона у частного дома или таунхауса, обработка краёв триммером вдоль дорожек и забора.',
                },
                price: { et: 'alates 40 €', ru: 'от 40 €' },
            },
            {
                details: 'muru-niitmine',
                title: { et: 'Keskmine krunt', ru: 'Средний участок' },
                text: {
                    et: 'Eramu krundi niitmine koos trimmerdamisega puude, peenarde ja hoonete ümber.',
                    ru: 'Покос газона на участке частного дома с обработкой триммером вокруг деревьев, клумб и построек.',
                },
                price: { et: 'alates 60 €', ru: 'от 60 €' },
            },
            {
                details: 'muru-niitmine',
                title: { et: 'Suured ja võsastunud krundid', ru: 'Большие и заросшие участки' },
                text: {
                    et: 'Suurte alade ja kõrge rohu niitmine ning võsastunud kohtade puhastamine. Hind sõltub pindalast ja rohu kõrgusest.',
                    ru: 'Покос больших площадей и высокой травы, расчистка заросших мест. Стоимость зависит от площади и высоты травы.',
                },
                price: { et: 'alates 100 €', ru: 'от 100 €' },
            },
            {
                details: 'hekipugamine',
                title: { et: 'Madal hekk (1–1,5 m)', ru: 'Низкая изгородь (1–1,5 м)' },
                text: {
                    et: 'Heki pügamine külgedelt ja pealt ning lõikejääkide kokkukogumine.',
                    ru: 'Стрижка изгороди по бокам и сверху, сбор срезанных веток.',
                },
                price: { et: 'alates 2 €', ru: 'от 2 €' },
            },
            {
                details: 'hekipugamine',
                title: { et: 'Keskmine hekk (1,5–2,5 m)', ru: 'Средняя изгородь (1,5–2,5 м)' },
                text: {
                    et: 'Keskmise kõrgusega heki pügamine ja kuju ühtlustamine ning lõikejääkide kokkukogumine.',
                    ru: 'Стрижка изгороди средней высоты с выравниванием формы, сбор срезанных веток.',
                },
                price: { et: 'alates 3,50 €', ru: 'от 3,50 €' },
            },
            {
                details: 'hekipugamine',
                title: { et: 'Kõrge hekk (2,5–3 m)', ru: 'Высокая изгородь (2,5–3 м)' },
                text: {
                    et: 'Kõrge heki pügamine, mis nõuab tööd kõrgustes, ning lõikejääkide kokkukogumine.',
                    ru: 'Стрижка высокой изгороди, где нужна работа на высоте, сбор срезанных веток.',
                },
                price: { et: 'alates 5,50 €', ru: 'от 5,50 €' },
            },
            {
                details: 'poosaste-hooldus',
                title: { et: 'Põõsad', ru: 'Кусты' },
                text: {
                    et: 'Põõsaste kujundamine ja noorendamine, kuivade ja segavate okste eemaldamine.',
                    ru: 'Формирование и омоложение кустов, удаление сухих и мешающих веток.',
                },
                price: { et: 'alates 15 € / tund', ru: 'от 15 € / час' },
            },
        ],
        examples: ['territory-yard', 'territory-path', 'hedge-sidewalk', 'hedge'],
    },
];
/** Пояснение под ценами на страницах услуг. */
const PRICE_DISCLAIMER = {
    et: 'Hinnad on orienteeruvad. Täpne hind lepitakse kokku individuaalselt.',
    ru: 'Цены указаны ориентировочно. Точная стоимость обсуждается индивидуально.',
};
/** Блок «Как мы работаем» на страницах услуг. */
const HOW_WE_WORK = [
    {
        title: { et: 'Päring', ru: 'Заявка' },
        text: {
            et: 'Helistage või saatke päring kodulehel — kirjeldage objekti ja vajalikke töid.',
            ru: 'Позвоните или оставьте заявку на сайте — опишите объект и нужные работы.',
        },
    },
    {
        title: { et: 'Hindamine', ru: 'Оценка' },
        text: {
            et: 'Täpsustame tööde mahu, vajaduse korral fotode põhjal.',
            ru: 'Уточняем объём работ, при необходимости по фотографиям.',
        },
    },
    {
        title: { et: 'Kokkulepe', ru: 'Согласование' },
        text: {
            et: 'Lepime enne töö algust kokku hinna ja sobiva aja.',
            ru: 'До начала работ согласовываем стоимость и удобное время.',
        },
    },
    {
        title: { et: 'Töö', ru: 'Работа' },
        text: {
            et: 'Teeme töö ära ja näitame teile tulemust.',
            ru: 'Выполняем работу и показываем вам результат.',
        },
    },
];
