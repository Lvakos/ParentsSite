"use strict";
// ============================================================================
//  НАСТРОЙКИ САЙТА PVL Teenused OÜ — здесь меняются цены, работы и слайдер.
//  После правок выполните:  npm run build
// ============================================================================
/** Язык, который открывается по умолчанию. */
const DEFAULT_LANG = 'et';
const PRICE_GROUPS = [
    {
        title: { et: 'Territooriumi hooldus', ru: 'Уход за территорией' },
        items: [
            {
                name: { et: 'Muru niitmine', ru: 'Покос травы' },
                unit: { et: 'm²', ru: 'м²' },
                from: 0.044,
                note: { et: 'Minimaalne tellimus 56 €', ru: 'Минимальный заказ 56 €' },
            },
            {
                name: { et: 'Territooriumi ja lehtede koristus', ru: 'Уборка территории и листьев' },
                unit: { et: 'töötund (1 töötaja)', ru: 'час работы (1 работник)' },
                from: 34,
            },
            {
                name: { et: 'Hekkide ja põõsaste pügamine', ru: 'Стрижка живой изгороди и кустов' },
            },
        ],
    },
    {
        title: { et: 'Prügivedu', ru: 'Вывоз мусора' },
        items: [
            {
                name: { et: 'Niidetud rohu ja lehtede äravedu', ru: 'Вывоз скошенной травы и листьев' },
                unit: { et: 'm³', ru: 'м³' },
                from: 28,
            },
            {
                name: { et: 'Prügi ja mittevajalike esemete äravedu', ru: 'Вывоз мусора и ненужных вещей' },
                unit: { et: 'm³', ru: 'м³' },
                from: 40,
            },
        ],
    },
    {
        title: { et: 'Ruumide koristus', ru: 'Уборка помещений' },
        items: [
            {
                name: { et: 'Suurpuhastus', ru: 'Генеральная уборка' },
                unit: { et: 'm² põrandapinda', ru: 'м² площади пола' },
                from: 2.8,
            },
            {
                name: { et: 'Akende pesu', ru: 'Мойка окон' },
                unit: { et: 'm² klaasipinda', ru: 'м² стекла' },
                from: 0.8,
            },
            {
                name: { et: 'Pehme mööbli puhastus', ru: 'Химчистка мягкой мебели' },
                unit: { et: 'istekoht', ru: 'посадочное место' },
                from: 14,
            },
            {
                name: { et: 'Hoolduskoristus', ru: 'Поддерживающая уборка' },
            },
        ],
    },
];
const HERO_SLIDE_OPTIONS = {
    'thumbnail/pokostravi': {
        focus: '35% 50%',
        alt: { et: 'Muru niitmine trimmeri ja muruniidukiga eramu aias', ru: 'Покос травы триммером и газонокосилкой на участке частного дома' },
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
const WORK_CATEGORIES = [
    {
        page: 'tood-territooriumi-koristus.html',
        formService: 'cleanup',
        title: { et: 'Territooriumi koristus', ru: 'Уборка территории' },
        short: {
            et: 'Teede, platside ja krundi puhastamine prahist, liivast ja mustusest.',
            ru: 'Очистка дорожек, площадок и участков от мусора, песка и грязи.',
        },
        intro: {
            et: 'Puhastame kõnniteid, platse ja kõvakattega alasid prahist, liivast, lehtedest ja mustusest.',
            ru: 'Очищаем пешеходные дорожки, площадки и участки с твёрдым покрытием от мусора, песка, листьев и грязи.',
        },
        paragraphs: [
            {
                et: 'Korras territoorium jätab hea mulje nii elanikele, klientidele kui ka külalistele. Töö võib olla ühekordne, näiteks kevadkoristus pärast talve, või korduv — sageduse lepime kokku.',
                ru: 'Чистая территория производит хорошее впечатление на жильцов, клиентов и гостей. Работа может быть разовой — например, весенняя уборка после зимы — или регулярной: периодичность согласовываем.',
            },
            {
                et: 'Enne töö algust täpsustame ala suuruse, katte tüübi ja selle, kas kogutud praht tuleb ära vedada.',
                ru: 'Перед началом уточняем площадь, тип покрытия и нужно ли вывозить собранный мусор.',
            },
        ],
        includes: [
            { et: 'Prahi, liiva ja kruusa eemaldamine', ru: 'Уборка мусора, песка и гравия' },
            { et: 'Lehtede ja okste kokkuriisumine', ru: 'Сбор листьев и веток' },
            { et: 'Plaatide ja kõnniteede puhastamine', ru: 'Очистка плитки и пешеходных дорожек' },
            { et: 'Kogutud prahi äravedu kokkuleppel', ru: 'Вывоз собранного мусора по договорённости' },
        ],
        works: [
            {
                before: 'uborkaTerritory/territorydo',
                after: 'uborkaTerritory/territoryposle',
                title: { et: 'Kõnnitee puhastus', ru: 'Очистка пешеходной дорожки' },
                text: {
                    et: 'Plaaditud tee puhastati mustusest ja prahist.',
                    ru: 'Дорожку из плитки очистили от грязи и мусора.',
                },
                featured: true,
            },
            {
                before: 'uborkaTerritory/territory2do',
                after: 'uborkaTerritory/territory2posle',
                title: { et: 'Platsi koristus', ru: 'Уборка площадки' },
                text: {
                    et: 'Kattelt eemaldati liiv, kruus ja muu praht.',
                    ru: 'С покрытия убрали песок, гравий и прочий мусор.',
                },
            },
        ],
    },
    {
        page: 'tood-akende-pesu.html',
        formService: 'windows',
        title: { et: 'Akende pesu', ru: 'Мойка окон' },
        short: {
            et: 'Klaaside, raamide, aknalaudade ja võrede pesu.',
            ru: 'Мойка стёкол, рам, подоконников и решёток.',
        },
        intro: {
            et: 'Peseme aknaid seest ja väljast: klaasid, raamid, aknalauad ja vajaduse korral dekoratiivsed võred.',
            ru: 'Моем окна изнутри и снаружи: стёкла, рамы, подоконники и при необходимости декоративные решётки.',
        },
        paragraphs: [
            {
                et: 'Kõige rohkem mustust koguneb keldri- ja esimese korruse akendele, mis asuvad tänava või kõnnitee lähedal. Puhtad aknad lasevad ruumidesse rohkem valgust ja muudavad hoone välisilme korrektsemaks.',
                ru: 'Больше всего грязи скапливается на цокольных окнах и окнах первого этажа рядом с улицей или тротуаром. Чистые окна пропускают больше света и делают внешний вид здания аккуратнее.',
            },
            {
                et: 'Hind arvestatakse klaasipinna ruutmeetrite järgi. Täpse pakkumise teeme, kui oleme akende arvu ja ligipääsu täpsustanud.',
                ru: 'Стоимость считается по квадратным метрам стекла. Точное предложение подготовим, когда уточним количество окон и доступ к ним.',
            },
        ],
        includes: [
            { et: 'Klaaside pesu seest ja väljast', ru: 'Мойка стёкол изнутри и снаружи' },
            { et: 'Raamide ja aknalaudade puhastamine', ru: 'Очистка рам и подоконников' },
            { et: 'Dekoratiivsete võrede pesu', ru: 'Мойка декоративных решёток' },
            { et: 'Keldri- ja esimese korruse aknad', ru: 'Цокольные окна и окна первого этажа' },
        ],
        works: [
            {
                before: 'moykaOkon/3moykaOkonDo',
                after: 'moykaOkon/3moykaOkonPosle',
                title: { et: 'Keldriakna pesu', ru: 'Мойка цокольного окна' },
                text: {
                    et: 'Pesti klaas, raam ja dekoratiivne võre.',
                    ru: 'Вымыты стекло, рама и декоративная решётка.',
                },
                featured: true,
            },
            {
                before: 'moykaOkon/4moykaOkonDo',
                after: 'moykaOkon/4moykaOkonPosle',
                title: { et: 'Akna ja aknalaua pesu', ru: 'Мойка окна и подоконника' },
                text: {
                    et: 'Puhastati klaasid, raamid ja aknalaud.',
                    ru: 'Очищены стёкла, рамы и подоконник.',
                },
            },
            {
                before: 'moykaOkon/2moykaOkonDo',
                after: 'moykaOkon/2moykaOkonPosle',
                title: { et: 'Keldriakna ja aknalaua pesu', ru: 'Мойка цокольного окна и отлива' },
                text: {
                    et: 'Pesti klaas, raam ja aknaplekk.',
                    ru: 'Вымыты стекло, рама и оконный отлив.',
                },
                layout: 'side',
            },
            {
                before: 'moykaOkon/1moykaOkonDo',
                after: 'moykaOkon/1moykaOkonPosle',
                title: { et: 'Korteri akna pesu', ru: 'Мойка окна в квартире' },
                text: {
                    et: 'Pesti klaasid, raamid ja aknalaud.',
                    ru: 'Вымыты стёкла, рамы и подоконник.',
                },
                layout: 'side',
            },
        ],
    },
    {
        page: 'tood-pehme-moobli-puhastus.html',
        formService: 'upholstery',
        title: { et: 'Pehme mööbli puhastus', ru: 'Химчистка мягкой мебели' },
        short: {
            et: 'Diivanite ja madratsite süvapuhastus.',
            ru: 'Глубокая чистка диванов и матрасов.',
        },
        intro: {
            et: 'Puhastame diivaneid ja madratseid, eemaldades kangast tolmu, plekke ja igapäevast mustust.',
            ru: 'Чистим диваны и матрасы: удаляем из ткани пыль, пятна и повседневные загрязнения.',
        },
        paragraphs: [
            {
                et: 'Pehme mööbel kogub aja jooksul tolmu ja mustust, mis tavalise koristusega ei kao. Süvapuhastus värskendab kangast ja muudab mööbli välimuse korrektsemaks.',
                ru: 'Со временем мягкая мебель накапливает пыль и грязь, которые не уходят при обычной уборке. Глубокая чистка освежает обивку и возвращает мебели аккуратный вид.',
            },
            {
                et: 'Tulemus sõltub kanga tüübist ja plekkide vanusest, seepärast hindame enne tööd mööbli seisukorda.',
                ru: 'Результат зависит от типа ткани и давности пятен, поэтому перед работой оцениваем состояние мебели.',
            },
        ],
        includes: [
            { et: 'Diivanite süvapuhastus', ru: 'Глубокая чистка диванов' },
            { et: 'Madratsite puhastus', ru: 'Чистка матрасов' },
            { et: 'Plekkide eemaldamine', ru: 'Выведение пятен' },
            { et: 'Hind istekoha järgi', ru: 'Стоимость за посадочное место' },
        ],
        works: [
            {
                before: 'glubokayachistka/1divando',
                after: 'glubokayachistka/1divanposle',
                title: { et: 'Diivani puhastus', ru: 'Чистка дивана' },
                text: {
                    et: 'Pehme mööbli kanga süvapuhastus.',
                    ru: 'Глубокая чистка обивки мягкой мебели.',
                },
                focus: '0% 50%',
                featured: true,
            },
            {
                before: 'glubokayachistka/matrasdo',
                after: 'glubokayachistka/matrasposle',
                title: { et: 'Madratsi puhastus', ru: 'Чистка матраса' },
                text: {
                    et: 'Madratsi pinnalt eemaldati plekid ja mustus.',
                    ru: 'С поверхности матраса удалены пятна и загрязнения.',
                },
            },
            {
                before: 'glubokayachistka/2divando',
                after: 'glubokayachistka/2divanposle',
                title: { et: 'Diivani puhastus', ru: 'Чистка дивана' },
                text: {
                    et: 'Istmeosa ja seljatoe puhastus.',
                    ru: 'Чистка сиденья и спинки.',
                },
                layout: 'side',
            },
        ],
    },
    {
        page: 'tood-hekkide-pugamine.html',
        formService: 'hedges',
        title: { et: 'Hekkide pügamine', ru: 'Стрижка живой изгороди' },
        short: {
            et: 'Hekkide ja põõsaste pügamine ning lõikejääkide koristus.',
            ru: 'Стрижка живой изгороди и кустов, уборка срезанных веток.',
        },
        intro: {
            et: 'Pügame hekke ja põõsaid, et need oleksid korras ega kasvaks kõnniteele.',
            ru: 'Подстригаем живые изгороди и кусты, чтобы они выглядели аккуратно и не разрастались на тротуар.',
        },
        paragraphs: [
            {
                et: 'Korrapärane pügamine aitab hekil püsida tiheda ja ühtlasena ning muudab krundi ümbruse hoolitsetuks.',
                ru: 'Регулярная стрижка помогает изгороди оставаться густой и ровной, а территории вокруг участка — ухоженной.',
            },
            {
                et: 'Hind sõltub heki pikkusest, kõrgusest ja seisukorrast, seepärast teeme pakkumise päringu põhjal.',
                ru: 'Стоимость зависит от длины, высоты и состояния изгороди, поэтому предложение готовим по запросу.',
            },
        ],
        includes: [
            { et: 'Hekkide pügamine', ru: 'Стрижка живой изгороди' },
            { et: 'Põõsaste kujundamine', ru: 'Формирование кустов' },
            { et: 'Lõikejääkide koristus', ru: 'Уборка срезанных веток' },
            { et: 'Äravedu kokkuleppel', ru: 'Вывоз по договорённости' },
        ],
        works: [
            {
                before: 'strizhkaKustov/kustido2',
                after: 'strizhkaKustov/kustiposle2',
                title: { et: 'Heki pügamine kõnnitee ääres', ru: 'Стрижка изгороди вдоль тротуара' },
                text: {
                    et: 'Hekk pügati ühtlaseks.',
                    ru: 'Изгородь подстрижена ровно.',
                },
                layout: 'side',
                featured: true,
            },
            {
                before: 'strizhkaKustov/kustido1',
                after: 'strizhkaKustov/kustiposle1',
                title: { et: 'Heki pügamine', ru: 'Стрижка живой изгороди' },
                text: {
                    et: 'Heki pügamine ja korrastamine.',
                    ru: 'Стрижка и приведение изгороди в порядок.',
                },
                layout: 'side',
            },
        ],
    },
];
