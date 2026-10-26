"use strict";
// ============================================================================
//  ПОДРОБНЫЕ СТРАНИЦЫ ВИДОВ РАБОТ («Подробнее» у каждой карточки на странице услуги)
//  Каждая запись → отдельная страница tood-<slug>.html (создаётся командой npm run build).
//  Файл нужен только при сборке — в браузер он не загружается.
//
//   service  — к какой услуге относится (community / home / yard).
//   about    — описание работы (абзацы).
//   includes — что входит в работу.
//   process  — как проходит работа, по шагам.
//   notes    — от чего зависит цена и что полезно знать.
//   prices   — цены; label нужен, если цен несколько.
//  Связь с карточкой: в SERVICES → options укажите details: '<slug>'.
// ============================================================================
const SERVICE_DETAILS = [
    // ---------------------------------------------------------------- Товарищества
    {
        slug: 'trepikodade-koristus',
        service: 'community',
        title: { et: 'Trepikodade koristus', ru: 'Уборка подъездов' },
        intro: {
            et: 'Kortermaja trepikodade, korrusemademete ja sissepääsu regulaarne koristus.',
            ru: 'Регулярная уборка лестничных клеток, площадок и входной зоны многоквартирного дома.',
        },
        about: [
            {
                et: 'Trepikoda on ühine ruum, mida kasutavad iga päev kõik elanikud. Regulaarne koristus ei lase koguneda tolmul, liival ja tänavalt sisse kantud mustusel ning hoiab maja korras.',
                ru: 'Подъезд — общее пространство, которым каждый день пользуются все жильцы. Регулярная уборка не даёт скапливаться пыли, песку и уличной грязи и поддерживает аккуратный вид дома.',
            },
            {
                et: 'Koristame ühistuga kokkulepitud graafiku alusel: näiteks kord nädalas või sügis-talvisel perioodil, kui tänavalt kantakse sisse rohkem mustust, sagedamini.',
                ru: 'Убираем по графику, согласованному с товариществом: например, раз в неделю или чаще в осенне-зимний период, когда с улицы заносят больше грязи.',
            },
        ],
        includes: [
            { et: 'Treppide ja korrusemademete pühkimine ja märgpuhastus', ru: 'Подметание и влажная уборка лестниц и площадок' },
            { et: 'Käsipuude puhastamine', ru: 'Протирка перил и поручней' },
            { et: 'Aknalaudade, postkastide ja uste puhastamine', ru: 'Протирка подоконников, почтовых ящиков и дверей' },
            { et: 'Sissepääsu ja tuulekoja koristus', ru: 'Уборка входной зоны и тамбура' },
            { et: 'Ämblikuvõrkude ja tolmu eemaldamine ligipääsetavatelt pindadelt', ru: 'Удаление паутины и пыли с доступных поверхностей' },
        ],
        process: [
            { et: 'Vaatame trepikojad üle ning lepime kokku tööde loetelu ja graafiku.', ru: 'Осматриваем подъезды и согласовываем перечень работ и график.' },
            { et: 'Kõigepealt eemaldame kuiva prahi ja tolmu, liikudes ülevalt alla.', ru: 'Сначала убираем сухой мусор и пыль, двигаясь сверху вниз.' },
            { et: 'Pühime üle käsipuud, aknalauad, postkastid ja uksed.', ru: 'Протираем перила, подоконники, почтовые ящики и двери.' },
            { et: 'Peseme treppide ja korrusemademete põrandad, viimasena sissepääsu.', ru: 'Моем лестницы и площадки, в конце — входную зону.' },
        ],
        notes: [
            { et: 'Hind sõltub trepikodade ja korruste arvust, koristuse sagedusest ja trepikodade seisukorrast.', ru: 'Стоимость зависит от количества подъездов и этажей, частоты уборки и состояния подъездов.' },
            { et: 'Tööde loetelu ja graafikut saab vajaduse korral muuta.', ru: 'Перечень работ и график можно изменить при необходимости.' },
        ],
        prices: [{ price: { et: 'Kokkuleppel', ru: 'По договорённости' } }],
    },
    {
        slug: 'territooriumi-koristus',
        service: 'community',
        title: { et: 'Territooriumi koristus', ru: 'Уборка территории' },
        intro: {
            et: 'Kortermaja õue, kõnniteede ja platside koristus.',
            ru: 'Уборка двора, дорожек и площадок вокруг многоквартирного дома.',
        },
        about: [
            {
                et: 'Puhas maja ümbrus on elanikele mugav ja lastele ohutu. Koristame prahi, lehed, liiva ja mustuse õuedest, kõnniteedelt ja platsidelt ning korrastame sissepääsude ümbruse.',
                ru: 'Чистая территория вокруг дома удобна для жильцов и безопасна для детей. Убираем мусор, листья, песок и грязь с дворов, дорожек и площадок, наводим порядок у входов.',
            },
            {
                et: 'Tööde maht muutub aasta jooksul: kevadel talvest jäänud liiv ja praht, suvel regulaarne koristus, sügisel lehed. Graafiku lepime kokku ühistuga.',
                ru: 'Объём работ меняется в течение года: весной — песок и мусор после зимы, летом — регулярная уборка, осенью — листья. График согласовываем с товариществом.',
            },
        ],
        includes: [
            { et: 'Prahi koristamine territooriumilt', ru: 'Сбор мусора на территории' },
            { et: 'Kõnniteede, platside ja trepiesiste pühkimine', ru: 'Подметание дорожек, площадок и крылец' },
            { et: 'Lehtede koristus sügisel', ru: 'Уборка листьев осенью' },
            { et: 'Liiva ja kruusa koristamine pärast talve', ru: 'Уборка песка и гравия после зимы' },
            { et: 'Korra hoidmine prügikonteinerite ja sissepääsude juures', ru: 'Порядок у мусорных контейнеров и входов' },
        ],
        process: [
            { et: 'Vaatame territooriumi üle ja lepime kokku tööde mahu.', ru: 'Осматриваем территорию и согласовываем объём работ.' },
            { et: 'Korjame kokku suurema prahi.', ru: 'Собираем крупный мусор.' },
            { et: 'Pühime kõnniteed ja platsid ning riisume lehed.', ru: 'Подметаем дорожки и площадки, сгребаем листья.' },
            { et: 'Kogutud prahi paneme kottidesse või veame kokkuleppel ära.', ru: 'Собранный мусор складываем в мешки или вывозим по договорённости.' },
        ],
        notes: [
            { et: 'Hind sõltub territooriumi suurusest, katte liigist ja koristuse sagedusest.', ru: 'Стоимость зависит от площади территории, вида покрытия и частоты уборки.' },
            { et: 'Kogutud prahi äravedu lepitakse kokku eraldi.', ru: 'Вывоз собранного мусора обсуждается отдельно.' },
        ],
        prices: [{ price: { et: 'Kokkuleppel', ru: 'По договорённости' } }],
    },
    {
        slug: 'kojamehe-teenused',
        service: 'community',
        title: { et: 'Kojamehe teenused', ru: 'Услуги дворника' },
        intro: {
            et: 'Maja ümbruse regulaarne hooldus kokkulepitud graafiku alusel.',
            ru: 'Регулярный уход за территорией дома по согласованному графику.',
        },
        about: [
            {
                et: 'Kojamehe teenus sobib ühistutele, kes vajavad territooriumi hooldamiseks püsivat tegijat. Tuleme regulaarselt kokkulepitud graafiku alusel ja hoiame õue korras.',
                ru: 'Услуга дворника подходит товариществам, которым нужен постоянный исполнитель для ухода за территорией. Мы регулярно приезжаем по согласованному графику и поддерживаем порядок во дворе.',
            },
            {
                et: 'Sõltuvalt hooajast kuuluvad töö hulka prahi ja lehtede koristus, muru niitmine ning põõsaste ja hekkide pügamine maja ümber. Tööde loetelu paneme kokku koos ühistu juhatusega.',
                ru: 'В зависимости от сезона в работу входят уборка мусора и листьев, покос травы и стрижка кустов и изгороди у дома. Перечень работ составляем вместе с правлением товарищества.',
            },
        ],
        includes: [
            { et: 'Regulaarsed käigud graafiku alusel', ru: 'Регулярные выезды по графику' },
            { et: 'Prahi koristamine ja pühkimine', ru: 'Уборка мусора и подметание' },
            { et: 'Lehtede koristus', ru: 'Уборка листьев' },
            { et: 'Muru niitmine maja ümber', ru: 'Покос травы у дома' },
            { et: 'Põõsaste ja hekkide pügamine', ru: 'Стрижка кустов и живой изгороди' },
        ],
        process: [
            { et: 'Arutame ühistu juhatusega läbi, milliseid töid on vaja.', ru: 'Обсуждаем с правлением товарищества, какие работы нужны.' },
            { et: 'Paneme kokku tööde loetelu ja käikude graafiku.', ru: 'Составляем перечень работ и график выездов.' },
            { et: 'Teeme töid graafiku alusel.', ru: 'Выполняем работы по графику.' },
            { et: 'Vajaduse korral muudame tööde loetelu vastavalt hooajale.', ru: 'При необходимости корректируем перечень работ по сезону.' },
        ],
        notes: [
            { et: 'Hind sõltub territooriumi suurusest, tööde loetelust ja käikude sagedusest.', ru: 'Стоимость зависит от площади территории, состава работ и частоты выездов.' },
        ],
        prices: [{ price: { et: 'Kokkuleppel', ru: 'По договорённости' } }],
    },
    // ---------------------------------------------------------------- Квартира / дом
    {
        slug: 'hoolduskoristus',
        service: 'home',
        title: { et: 'Hoolduskoristus', ru: 'Поддерживающая уборка' },
        intro: {
            et: 'Korteri või maja regulaarne koristus, et kodu oleks alati puhas.',
            ru: 'Регулярная уборка квартиры или дома, чтобы дома всегда было чисто.',
        },
        about: [
            {
                et: 'Hoolduskoristus sobib, kui kodu on üldiselt korras ja regulaarselt on vaja tolmu pühkida, põrandaid pesta ning kööki ja vannituba koristada. Seda on mugav tellida kord nädalas või kord kahe nädala jooksul.',
                ru: 'Поддерживающая уборка подходит, если квартира в целом в порядке и нужно регулярно убирать пыль, мыть полы, кухню и санузел. Её удобно заказывать раз в неделю или раз в две недели.',
            },
            {
                et: 'Tuleme kokkulepitud ajal ja koristame kõik ruumid sama loetelu järgi, et tulemus oleks iga kord ühtlane.',
                ru: 'Приезжаем в согласованное время и убираем все помещения по одному и тому же списку, чтобы результат каждый раз был одинаково хорошим.',
            },
        ],
        includes: [
            { et: 'Tolm ligipääsetavatelt pindadelt ja mööblilt', ru: 'Пыль с доступных поверхностей и мебели' },
            { et: 'Põrandate tolmuimemine ja märgpuhastus', ru: 'Пылесос и влажная уборка полов' },
            { et: 'Köök: tööpinnad, pliit, valamu ja kapiuksed väljast', ru: 'Кухня: столешницы, плита, мойка и фасады снаружи' },
            { et: 'Vannituba: valamu, WC-pott, vann või dušš ja peeglid', ru: 'Санузел: раковина, унитаз, ванна или душ, зеркала' },
            { et: 'Prügi väljaviimine', ru: 'Вынос мусора' },
        ],
        process: [
            { et: 'Täpsustame korteri suuruse ja teie soovid.', ru: 'Уточняем площадь квартиры и ваши пожелания.' },
            { et: 'Pühime tolmu, liikudes ülevalt alla.', ru: 'Убираем пыль, двигаясь сверху вниз.' },
            { et: 'Koristame köögi ja vannitoa.', ru: 'Убираем кухню и санузел.' },
            { et: 'Lõpuks imeme ja peseme põrandad.', ru: 'В конце пылесосим и моем полы.' },
        ],
        notes: [
            { et: 'Hind sõltub pinnast ning tubade ja vannitubade arvust.', ru: 'Стоимость зависит от площади, количества комнат и санузлов.' },
            { et: 'Tugeva mustuse puhul on mõistlik alustada suurpuhastusest.', ru: 'При сильных загрязнениях лучше начать с генеральной уборки.' },
        ],
        prices: [{ price: { et: 'alates 35 €', ru: 'от 35 €' } }],
    },
    {
        slug: 'suurpuhastus',
        service: 'home',
        title: { et: 'Suurpuhastus', ru: 'Генеральная уборка' },
        intro: {
            et: 'Kogu korteri või maja põhjalik koristus koos raskesti ligipääsetavate kohtadega.',
            ru: 'Тщательная уборка всей квартиры или дома, включая труднодоступные места.',
        },
        about: [
            {
                et: 'Suurpuhastust on vaja siis, kui tavalisest koristusest enam ei piisa: enne pühi, pärast pikemat pausi, kevadel või enne korteri müüki või üürile andmist.',
                ru: 'Генеральная уборка нужна, когда обычной уборки уже недостаточно: перед праздниками, после долгого перерыва, весной или перед продажей и сдачей квартиры.',
            },
            {
                et: 'Koristame mitte ainult nähtavaid pindu, vaid ka kohti, milleni tavakoristusel ei jõuta: põrandaliistud, uksed, lülitid, kappide pealsed, köögimööbli uksed ja sanitaartehnika.',
                ru: 'Убираем не только видимые поверхности, но и места, до которых при обычной уборке не доходят руки: плинтусы, двери, выключатели, верх шкафов, кухонные фасады и сантехнику.',
            },
        ],
        includes: [
            { et: 'Tolm kõikidelt pindadelt, ka kappide pealt', ru: 'Пыль со всех поверхностей, включая верх шкафов' },
            { et: 'Põrandaliistud, uksed, ukselingid ja lülitid', ru: 'Плинтусы, двери, дверные ручки и выключатели' },
            { et: 'Aknalauad ja radiaatorid', ru: 'Подоконники и радиаторы' },
            { et: 'Köök: kapiuksed, tööpinnad, pliit ja tehnika väljast', ru: 'Кухня: фасады, столешницы, плита и техника снаружи' },
            { et: 'Vannituba: sanitaartehnika, plaadid ja peeglid', ru: 'Санузел: сантехника, плитка и зеркала' },
            { et: 'Põrandate tolmuimemine ja pesemine', ru: 'Пылесос и мытьё полов' },
        ],
        process: [
            { et: 'Täpsustame pinna, ruumide seisukorra ja erisoovid.', ru: 'Уточняем площадь, состояние помещений и особые пожелания.' },
            { et: 'Koristame ülevalt alla: laenurgad, mööbli pealsed ja seinad.', ru: 'Убираем сверху вниз: потолочные углы, верх мебели, стены.' },
            { et: 'Koristame põhjalikult köögi ja vannitoa.', ru: 'Подробно убираем кухню и санузел.' },
            { et: 'Peseme põrandad ja vaatame tulemuse koos teiega üle.', ru: 'Моем полы и проверяем результат вместе с вами.' },
        ],
        notes: [
            { et: 'Hind sõltub pinnast, ruumide seisukorrast ja vannitubade arvust.', ru: 'Стоимость зависит от площади, состояния помещений и количества санузлов.' },
            { et: 'Akende pesu ja pehme mööbli puhastuse saab tellida lisaks.', ru: 'Мытьё окон и химчистку мебели можно заказать дополнительно.' },
        ],
        prices: [{ price: { et: 'alates 95 €', ru: 'от 95 €' } }],
    },
    {
        slug: 'remondijargne-koristus',
        service: 'home',
        title: { et: 'Koristus pärast remonti', ru: 'Уборка после ремонта' },
        intro: {
            et: 'Ehitustolmu ja viimistlustööde jälgede eemaldamine, et ruume saaks kohe kasutama hakata.',
            ru: 'Удаление строительной пыли и следов отделочных работ, чтобы помещением можно было сразу пользоваться.',
        },
        about: [
            {
                et: 'Pärast remonti settib peen ehitustolm kõikidele pindadele — ka kappidesse, aknalaudadele ja radiaatoritele. Tavalise koristusega seda ei eemalda: tolm tõuseb ikka ja jälle üles.',
                ru: 'После ремонта мелкая строительная пыль оседает на всех поверхностях — в том числе внутри шкафов, на подоконниках и радиаторах. Обычной уборкой её не убрать: пыль поднимается снова и снова.',
            },
            {
                et: 'Eemaldame tolmu mitmes etapis professionaalse tehnikaga ning puhastame ligipääsetavatelt pindadelt värvi-, pahtli- ja liimijäägid.',
                ru: 'Убираем пыль в несколько этапов с помощью профессиональной техники и удаляем следы краски, шпаклёвки и клея с доступных поверхностей.',
            },
        ],
        includes: [
            { et: 'Ehitustolmu eemaldamine kõikidelt pindadelt', ru: 'Удаление строительной пыли со всех поверхностей' },
            { et: 'Värvi-, pahtli- ja liimijääkide puhastamine', ru: 'Очистка следов краски, шпаклёвки и клея' },
            { et: 'Aknad, raamid ja aknalauad', ru: 'Окна, рамы и подоконники' },
            { et: 'Kapid ja riiulid seest', ru: 'Шкафы и полки внутри' },
            { et: 'Sanitaartehnika ja plaadid', ru: 'Сантехника и плитка' },
            { et: 'Põrandate korduv pesemine', ru: 'Многократное мытьё полов' },
        ],
        process: [
            { et: 'Hindame tööde mahu fotode või kirjelduse põhjal.', ru: 'Оцениваем объём работ по фотографиям или описанию.' },
            { et: 'Eemaldame prahijäägid ja kuiva tolmu professionaalse tolmuimejaga.', ru: 'Убираем остатки мусора и сухую пыль профессиональным пылесосом.' },
            { et: 'Pühime kõik pinnad niiskelt üle ja eemaldame viimistlusmaterjalide jäljed.', ru: 'Протираем все поверхности влажным способом и удаляем следы отделочных материалов.' },
            { et: 'Peseme aknad, sanitaartehnika ja põrandad.', ru: 'Моем окна, сантехнику и полы.' },
        ],
        notes: [
            { et: 'Hind sõltub pinnast ja ehitustolmu hulgast.', ru: 'Стоимость зависит от площади и количества строительной пыли.' },
            { et: 'Suurema ehitusprahi äravedu lepitakse kokku eraldi — see on mõistlik teha enne koristust.', ru: 'Вывоз крупного строительного мусора обсуждается отдельно — его лучше вывезти до уборки.' },
        ],
        prices: [{ price: { et: 'alates 119 €', ru: 'от 119 €' } }],
    },
    {
        slug: 'kolimiskoristus',
        service: 'home',
        title: { et: 'Koristus pärast kolimist', ru: 'Уборка после переезда' },
        intro: {
            et: 'Tühja korteri või maja koristus enne või pärast kolimist.',
            ru: 'Уборка пустой квартиры или дома до или после переезда.',
        },
        about: [
            {
                et: 'Tühja korterit on lihtsam ja põhjalikumalt koristada: pääseb ligi kohtadele, mis on tavaliselt mööbliga kaetud. Sellist koristust on vaja korteri omanikule üleandmisel, enne uute elanike sissekolimist või pärast müüki.',
                ru: 'Пустую квартиру убрать проще и тщательнее: можно добраться до мест, которые обычно закрыты мебелью. Такая уборка нужна при сдаче квартиры владельцу, перед въездом новых жильцов или после продажи.',
            },
            {
                et: 'Peseme kapid seest, köögi, vannitoa, põrandad ja aknalauad, et korter oleks valmis üleandmiseks või sissekolimiseks.',
                ru: 'Моем шкафы внутри, кухню, санузел, полы и подоконники, чтобы квартира была готова к передаче или заселению.',
            },
        ],
        includes: [
            { et: 'Kapid ja riiulid seest ja väljast', ru: 'Шкафы и полки внутри и снаружи' },
            { et: 'Köök koos tehnikaga väljast', ru: 'Кухня, включая технику снаружи' },
            { et: 'Vannituba ja sanitaartehnika', ru: 'Санузел и сантехника' },
            { et: 'Aknalauad, radiaatorid ja uksed', ru: 'Подоконники, радиаторы и двери' },
            { et: 'Põrandate pesemine kõikides ruumides', ru: 'Мытьё полов во всех помещениях' },
        ],
        process: [
            { et: 'Lepime kokku kuupäeva — kõige parem on siis, kui asjad on juba välja viidud.', ru: 'Согласовываем дату — лучше всего, когда вещи уже вывезены.' },
            { et: 'Koristame kapid ja riiulid seest.', ru: 'Убираем шкафы и полки внутри.' },
            { et: 'Koristame köögi ja vannitoa.', ru: 'Убираем кухню и санузел.' },
            { et: 'Peseme põrandad ja vaatame tulemuse üle.', ru: 'Моем полы и проверяем результат.' },
        ],
        notes: [
            { et: 'Hind sõltub pinnast ja ruumide seisukorrast.', ru: 'Стоимость зависит от площади и состояния помещений.' },
            { et: 'Akende pesu saab tellida lisaks.', ru: 'Мытьё окон можно заказать дополнительно.' },
        ],
        prices: [{ price: { et: 'alates 105 €', ru: 'от 105 €' } }],
    },
    {
        slug: 'aknapesu',
        service: 'home',
        title: { et: 'Akende pesu', ru: 'Мытьё окон' },
        intro: {
            et: 'Klaaside, raamide ja aknalaudade pesu seest ja väljast.',
            ru: 'Мойка стёкол, рам и подоконников изнутри и снаружи.',
        },
        about: [
            {
                et: 'Puhtad aknad lasevad tuppa rohkem valgust ja muudavad korteri või maja kohe korrektsemaks. Eriti palju mustust koguneb esimese korruse ja tee ääres asuvate akende peale.',
                ru: 'Чистые окна пропускают больше света и сразу делают квартиру или дом опрятнее. Особенно много грязи собирается на окнах первых этажей и у дороги.',
            },
            {
                et: 'Peseme klaasid, raamid ja aknalauad seest ja väljast — seal, kus aknale on ohutu ligipääs. Hind sõltub akende arvust, suurusest ja tüübist.',
                ru: 'Моем стёкла, рамы и подоконники изнутри и снаружи — там, где к окну есть безопасный доступ. Стоимость зависит от количества, размера и типа окон.',
            },
        ],
        includes: [
            { et: 'Klaasid seest ja väljast', ru: 'Стёкла изнутри и снаружи' },
            { et: 'Raamid ja aknatiivad', ru: 'Рамы и створки' },
            { et: 'Aknalauad ja aknaplekid', ru: 'Подоконники и отливы' },
            { et: 'Tihendid ja raaminurgad', ru: 'Уплотнители и уголки рам' },
        ],
        process: [
            { et: 'Täpsustame akende arvu ja tüübi.', ru: 'Уточняем количество и тип окон.' },
            { et: 'Eemaldame tolmu ja mustuse raamidelt ja aknalaudadelt.', ru: 'Убираем пыль и грязь с рам и подоконников.' },
            { et: 'Peseme klaasid ja kuivatame need triibuvabaks.', ru: 'Моем стёкла и вытираем их насухо без разводов.' },
            { et: 'Pühime raamid ja aknalauad lõplikult puhtaks.', ru: 'Окончательно протираем рамы и подоконники.' },
        ],
        notes: [
            { et: 'Hind sõltub akende arvust, suurusest ja tüübist.', ru: 'Стоимость зависит от количества, размера и типа окон.' },
            { et: 'Aknad, millele väljast ohutut ligipääsu pole, arutame eraldi läbi.', ru: 'Окна, к которым нет безопасного доступа снаружи, обсуждаем отдельно.' },
        ],
        prices: [{ price: { et: 'alates 6 €', ru: 'от 6 €' } }],
    },
    {
        slug: 'diivanite-ja-vaipade-puhastus',
        service: 'home',
        title: { et: 'Diivanite ja vaipade puhastus', ru: 'Химчистка диванов и ковровых покрытий' },
        intro: {
            et: 'Pehme mööbli ja vaipkatete süvapuhastus.',
            ru: 'Глубокая чистка обивки мягкой мебели и ковровых покрытий.',
        },
        about: [
            {
                et: 'Pehme mööbel ja vaibad imavad aja jooksul endasse tolmu, plekke ja lõhnu, mida tolmuimejaga ei eemalda. Süvapuhastus värskendab kangast ja muudab mööbli taas korrektseks.',
                ru: 'Мягкая мебель и ковры со временем впитывают пыль, пятна и запахи, которые не убираются пылесосом. Глубокая чистка освежает ткань и возвращает мебели аккуратный вид.',
            },
            {
                et: 'Puhastame professionaalse tehnikaga, sealhulgas Kärcheri pesuimuriga: kangale kantakse puhastuslahus, mis imetakse seejärel koos mustusega välja.',
                ru: 'Чистим профессиональной техникой, в том числе моющим пылесосом Kärcher: на ткань наносится чистящий раствор, который затем извлекается вместе с грязью.',
            },
        ],
        includes: [
            { et: 'Diivanid ja tugitoolid', ru: 'Диваны и кресла' },
            { et: 'Madratsid', ru: 'Матрасы' },
            { et: 'Vaibad ja vaipkatted', ru: 'Ковры и ковровые покрытия' },
            { et: 'Plekkide eemaldamine', ru: 'Выведение пятен' },
        ],
        process: [
            { et: 'Hindame kanga tüüpi ja mustuse ulatust.', ru: 'Оцениваем тип ткани и степень загрязнения.' },
            { et: 'Imeme pinna tolmust puhtaks.', ru: 'Пылесосим поверхность.' },
            { et: 'Töötleme plekke ja teeme süvapuhastuse pesuimuriga.', ru: 'Обрабатываем пятна и выполняем глубокую чистку моющим пылесосом.' },
            { et: 'Jätame mööbli kuivama — tavaliselt mõneks tunniks.', ru: 'Оставляем мебель сохнуть — обычно на несколько часов.' },
        ],
        notes: [
            { et: 'Hind sõltub mööbli suurusest või vaiba pindalast.', ru: 'Стоимость зависит от размера мебели или площади ковра.' },
            { et: 'Tulemus sõltub kanga tüübist ja plekkide vanusest — vanu plekke ei õnnestu alati täielikult eemaldada.', ru: 'Результат зависит от типа ткани и давности пятен — старые пятна не всегда удаётся вывести полностью.' },
        ],
        prices: [{ price: { et: 'alates 55 €', ru: 'от 55 €' } }],
    },
    // ---------------------------------------------------------------- Участок
    {
        slug: 'muru-niitmine',
        service: 'yard',
        title: { et: 'Muru niitmine', ru: 'Покос травы' },
        intro: {
            et: 'Murude ja võsastunud alade niitmine koos servade trimmerdamisega.',
            ru: 'Покос газонов и заросших участков с обработкой краёв триммером.',
        },
        about: [
            {
                et: 'Regulaarne niitmine muudab muru tihedaks ja hoolitsetuks ning krundi korrektseks. Niidame murusid eramute juures ja korteriühistute territooriumil ning korrastame ka võsastunud alasid.',
                ru: 'Регулярный покос делает газон густым и ухоженным, а участок — аккуратным. Косим газоны у частных домов и на территориях квартирных товариществ, а также приводим в порядок заросшие участки.',
            },
            {
                et: 'Tasased alad niidame muruniidukiga, aedade, teede, puude ja peenarde ääres trimmerdame servad.',
                ru: 'Ровные площади косим газонокосилкой, а вдоль заборов, дорожек, деревьев и клумб обрабатываем края триммером.',
            },
        ],
        includes: [
            { et: 'Muru niitmine', ru: 'Покос газона' },
            { et: 'Servade trimmerdamine', ru: 'Обработка краёв триммером' },
            { et: 'Kõrge ja võsastunud rohu niitmine', ru: 'Покос высокой и заросшей травы' },
            { et: 'Niidetud rohu kokkukogumine soovi korral', ru: 'Сбор скошенной травы по желанию' },
        ],
        process: [
            { et: 'Täpsustame pindala ja rohu kõrguse, vajaduse korral fotode põhjal.', ru: 'Уточняем площадь и высоту травы, при необходимости по фотографиям.' },
            { et: 'Enne niitmist kontrollime murult prahti ja kive.', ru: 'Перед покосом проверяем газон на мусор и камни.' },
            { et: 'Niidame muru ja trimmerdame servad.', ru: 'Косим газон и обрабатываем края триммером.' },
            { et: 'Korjame niidetud rohu kokku, kui see on kokku lepitud.', ru: 'Собираем скошенную траву, если это согласовано.' },
        ],
        notes: [
            { et: 'Hind sõltub pindalast ja rohu kõrgusest.', ru: 'Стоимость зависит от площади и высоты травы.' },
            { et: 'Regulaarse niitmise korral ei jõua rohi kõrgeks kasvada ja töö võtab vähem aega.', ru: 'При регулярном покосе трава не успевает вырасти, и работа занимает меньше времени.' },
        ],
        prices: [
            { label: { et: 'Väike krunt', ru: 'Маленький участок' }, price: { et: 'alates 40 €', ru: 'от 40 €' } },
            { label: { et: 'Keskmine krunt', ru: 'Средний участок' }, price: { et: 'alates 60 €', ru: 'от 60 €' } },
            { label: { et: 'Suured ja võsastunud krundid', ru: 'Большие и заросшие участки' }, price: { et: 'alates 100 €', ru: 'от 100 €' } },
        ],
    },
    {
        slug: 'hekipugamine',
        service: 'yard',
        title: { et: 'Hekkide pügamine', ru: 'Стрижка живой изгороди' },
        intro: {
            et: 'Hekkide pügamine külgedelt ja pealt ning kuju ühtlustamine.',
            ru: 'Стрижка живой изгороди по бокам и сверху с выравниванием формы.',
        },
        about: [
            {
                et: 'Hekk näeb ilus välja ainult regulaarse pügamise korral: muidu kasvab see laiaks, kaotab kuju ja ulatub kõnniteele või naabri krundile.',
                ru: 'Живая изгородь красиво выглядит только при регулярной стрижке: иначе она разрастается, теряет форму и выходит на тротуар или соседний участок.',
            },
            {
                et: 'Pügame heki küljed ja pealse, ühtlustame kuju ja korjame lõikejäägid kokku. Hind sõltub heki kõrgusest ja pikkusest.',
                ru: 'Стрижём изгородь по бокам и сверху, выравниваем форму и собираем срезанные ветки. Стоимость зависит от высоты и длины изгороди.',
            },
        ],
        includes: [
            { et: 'Külgede pügamine', ru: 'Стрижка боковых сторон' },
            { et: 'Pealse pügamine ja kuju ühtlustamine', ru: 'Стрижка верха и выравнивание формы' },
            { et: 'Töö kõrgustes kõrgete hekkide puhul', ru: 'Работа на высоте для высоких изгородей' },
            { et: 'Lõikejääkide kokkukogumine', ru: 'Сбор срезанных веток' },
        ],
        process: [
            { et: 'Täpsustame heki pikkuse ja kõrguse.', ru: 'Уточняем длину и высоту изгороди.' },
            { et: 'Pügame heki küljed.', ru: 'Стрижём боковые стороны.' },
            { et: 'Ühtlustame heki pealse.', ru: 'Выравниваем верх изгороди.' },
            { et: 'Korjame lõikejäägid kokku.', ru: 'Собираем срезанные ветки.' },
        ],
        notes: [
            { et: 'Hind sõltub heki kõrgusest, pikkusest ja seisukorrast.', ru: 'Стоимость зависит от высоты, длины и состояния изгороди.' },
            { et: 'Tugevalt vohanud hekki hindame eraldi.', ru: 'Сильно разросшуюся изгородь оцениваем отдельно.' },
        ],
        prices: [
            { label: { et: 'Madal hekk (1–1,5 m)', ru: 'Низкая изгородь (1–1,5 м)' }, price: { et: 'alates 2 €', ru: 'от 2 €' } },
            { label: { et: 'Keskmine hekk (1,5–2,5 m)', ru: 'Средняя изгородь (1,5–2,5 м)' }, price: { et: 'alates 3,50 €', ru: 'от 3,50 €' } },
            { label: { et: 'Kõrge hekk (2,5–3 m)', ru: 'Высокая изгородь (2,5–3 м)' }, price: { et: 'alates 5,50 €', ru: 'от 5,50 €' } },
        ],
    },
    {
        slug: 'poosaste-hooldus',
        service: 'yard',
        title: { et: 'Põõsaste pügamine ja kujundamine', ru: 'Стрижка и формирование кустов' },
        intro: {
            et: 'Põõsaste kujundamine, noorendamine ning kuivade ja segavate okste eemaldamine.',
            ru: 'Формирование и омоложение кустов, удаление сухих и мешающих веток.',
        },
        about: [
            {
                et: 'Põõsad vajavad regulaarset hooldust: ilma pügamiseta muutuvad need liiga tihedaks, kaotavad kuju ja kasvavad halvemini.',
                ru: 'Кусты нуждаются в регулярном уходе: без стрижки они загущаются, теряют форму и хуже растут.',
            },
            {
                et: 'Kujundame võra, eemaldame kuivad, murdunud ja segavad oksad ning teeme vajaduse korral noorendava lõikuse. Tasu arvestatakse tunnipõhiselt.',
                ru: 'Формируем крону, удаляем сухие, сломанные и мешающие ветки, при необходимости делаем омолаживающую обрезку. Работа оплачивается по часам.',
            },
        ],
        includes: [
            { et: 'Kujundav pügamine', ru: 'Формирующая стрижка' },
            { et: 'Kuivade ja murdunud okste eemaldamine', ru: 'Удаление сухих и сломанных веток' },
            { et: 'Noorendav lõikus', ru: 'Омолаживающая обрезка' },
            { et: 'Lõikejääkide kokkukogumine', ru: 'Сбор срезанных веток' },
        ],
        process: [
            { et: 'Vaatame põõsad üle ja lepime kokku, kuidas neid pügada.', ru: 'Осматриваем кусты и согласовываем, как их подстричь.' },
            { et: 'Eemaldame kuivad ja kahjustatud oksad.', ru: 'Удаляем сухие и повреждённые ветки.' },
            { et: 'Kujundame võra.', ru: 'Формируем крону.' },
            { et: 'Korjame oksad kokku.', ru: 'Собираем срезанные ветки.' },
        ],
        notes: [
            { et: 'Tasu arvestatakse tegelikult kulunud aja järgi.', ru: 'Работа оплачивается по фактически затраченному времени.' },
            { et: 'Kujundava pügamise parim aeg sõltub põõsa liigist — anname nõu.', ru: 'Лучшее время для формирующей стрижки зависит от вида куста — подскажем.' },
        ],
        prices: [{ price: { et: 'alates 15 € / tund', ru: 'от 15 € / час' } }],
    },
];
