/* JALMOGOYO – tablet menu app (no framework, works offline). */
(function () {
  'use strict';

  var DATA = window.MENU_DATA;
  var IDLE_SECONDS = 120;          // back to the welcome screen after 2 min without touch
  var LANGS = ['fr', 'en', 'de', 'ko'];
  var LANG_LABEL = { fr: 'Français', en: 'English', de: 'Deutsch', ko: '한국어' };

  /* ------------------------------------------------------------------ */
  /* Interface texts                                                    */
  /* ------------------------------------------------------------------ */
  var UI = {
    fr: {
      perPerson: '/ pers.', perPersonLong: 'par personne', spicyOnly: 'Piquant',
      allergens_btn: 'Allergènes', alTitle: 'Allergies ou intolérances ?', alSub: 'Touchez ce que vous ne pouvez pas manger : les plats qui en contiennent seront masqués.',
      alWarn: 'Information indicative. Les recettes, sauces et petits mets peuvent contenir d’autres allergènes ou des traces. En cas d’allergie, signalez-la toujours à votre serveur.',
      alClear: 'Tout effacer', alOk: 'Voir les plats', alHidden: 'Plats masqués car ils contiennent :', alReset: 'Effacer le filtre',
      alDish: 'Allergènes (indicatif)',
      veg: 'Végétarien', notSpicy: 'Non piquant', spicy: 'Piquant', slightly: 'Légèrement piquant',
      two: 'Pour 2 pers. minimum', twoShort: '2 pers.', rice: 'Riz & petits mets inclus',
      details: 'Détails', korean: 'Corée', home: 'Accueil',
      order: 'Pour commander, indiquez simplement le numéro <b>{n}</b> à votre serveur.',
      allergens: 'Tableau des allergènes disponible sur demande.',
      none: 'Aucun plat ne correspond à ce filtre. Demandez conseil à notre équipe : certains plats peuvent parfois être adaptés.',
      infoHoursT: 'Horaires', infoHours: 'Du mardi au samedi<br>Midi 12h00 – 14h00 · Soir 19h00 – 22h00<br>Fermé le dimanche et le lundi',
      infoRiceT: 'Riz & petits mets', infoRice: 'Les « banchan » sont de petits accompagnements coréens servis avec les plats, à partager. Bol de riz supplémentaire : 3 €.',
      infoAllergT: 'Allergènes', infoAllerg: 'Tableau des allergènes sur demande. N’hésitez pas à demander conseil à notre équipe.',
      infoTakeT: 'À emporter', infoTake: 'Commandes à emporter par téléphone : {phone}<br>{address}',
      welcomeHours: 'Ouvert du mardi au samedi · 12h00 – 14h00 · 19h00 – 22h00'
    },
    en: {
      perPerson: '/ person', perPersonLong: 'per person', spicyOnly: 'Spicy',
      allergens_btn: 'Allergens', alTitle: 'Allergies or intolerances?', alSub: 'Tap what you cannot eat: dishes containing it will be hidden.',
      alWarn: 'For guidance only. Recipes, sauces and side dishes may contain other allergens or traces. If you have an allergy, always tell your waiter.',
      alClear: 'Clear all', alOk: 'Show dishes', alHidden: 'Dishes hidden because they contain:', alReset: 'Clear filter',
      alDish: 'Allergens (for guidance)',
      veg: 'Vegetarian', notSpicy: 'Not spicy', spicy: 'Spicy', slightly: 'Slightly spicy',
      two: 'Minimum 2 persons', twoShort: '2 pers.', rice: 'Rice & side dishes included',
      details: 'Details', korean: 'Korea', home: 'Home',
      order: 'To order, simply tell your waiter number <b>{n}</b>.',
      allergens: 'Allergen information available on request.',
      none: 'No dish matches this filter. Please ask our team: some dishes can sometimes be adapted.',
      infoHoursT: 'Opening hours', infoHours: 'Tuesday to Saturday<br>Lunch 12:00 – 14:00 · Dinner 19:00 – 22:00<br>Closed on Sunday and Monday',
      infoRiceT: 'Rice & side dishes', infoRice: '“Banchan” are small Korean side dishes served with your meal, to share. Extra bowl of rice: €3.',
      infoAllergT: 'Allergens', infoAllerg: 'Allergen chart available on request. Feel free to ask our team for advice.',
      infoTakeT: 'Take-away', infoTake: 'Take-away orders by phone: {phone}<br>{address}',
      welcomeHours: 'Open Tuesday to Saturday · 12:00 – 14:00 · 19:00 – 22:00'
    },
    de: {
      perPerson: '/ Pers.', perPersonLong: 'pro Person', spicyOnly: 'Scharf',
      allergens_btn: 'Allergene', alTitle: 'Allergien oder Unverträglichkeiten?', alSub: 'Tippen Sie an, was Sie nicht essen dürfen: Gerichte, die es enthalten, werden ausgeblendet.',
      alWarn: 'Angaben ohne Gewähr. Rezepte, Saucen und Beilagen können weitere Allergene oder Spuren enthalten. Bitte informieren Sie bei einer Allergie immer Ihre Bedienung.',
      alClear: 'Alles löschen', alOk: 'Gerichte anzeigen', alHidden: 'Ausgeblendet, da enthalten:', alReset: 'Filter löschen',
      alDish: 'Allergene (ohne Gewähr)',
      veg: 'Vegetarisch', notSpicy: 'Nicht scharf', spicy: 'Scharf', slightly: 'Leicht scharf',
      two: 'Ab 2 Personen', twoShort: '2 Pers.', rice: 'Reis & Beilagen inklusive',
      details: 'Details', korean: 'Korea', home: 'Start',
      order: 'Zum Bestellen nennen Sie Ihrer Bedienung einfach die Nummer <b>{n}</b>.',
      allergens: 'Allergenliste auf Anfrage erhältlich.',
      none: 'Kein Gericht entspricht diesem Filter. Fragen Sie unser Team: Manche Gerichte können angepasst werden.',
      infoHoursT: 'Öffnungszeiten', infoHours: 'Dienstag bis Samstag<br>Mittags 12:00 – 14:00 · Abends 19:00 – 22:00<br>Sonntag und Montag Ruhetag',
      infoRiceT: 'Reis & Beilagen', infoRice: '„Banchan“ sind kleine koreanische Beilagen zum Teilen, die zu den Gerichten serviert werden. Extra Schale Reis: 3 €.',
      infoAllergT: 'Allergene', infoAllerg: 'Allergenliste auf Anfrage. Unser Team berät Sie gerne.',
      infoTakeT: 'Zum Mitnehmen', infoTake: 'Bestellungen zum Mitnehmen per Telefon: {phone}<br>{address}',
      welcomeHours: 'Geöffnet Dienstag bis Samstag · 12:00 – 14:00 · 19:00 – 22:00'
    },
    ko: {
      perPerson: '/ 1인', perPersonLong: '1인 기준', spicyOnly: '매운 메뉴',
      allergens_btn: '알레르기', alTitle: '알레르기나 못 드시는 음식이 있나요?', alSub: '드실 수 없는 재료를 선택하면 해당 재료가 들어간 메뉴가 숨겨집니다.',
      alWarn: '참고용 정보입니다. 양념, 소스, 반찬에 다른 알레르기 유발 성분이 들어 있을 수 있습니다. 알레르기가 있으시면 꼭 직원에게 말씀해 주세요.',
      alClear: '모두 지우기', alOk: '메뉴 보기', alHidden: '다음 성분이 들어 있어 숨긴 메뉴:', alReset: '필터 해제',
      alDish: '알레르기 성분 (참고용)',
      veg: '채식', notSpicy: '안 매운 메뉴', spicy: '매운맛', slightly: '약간 매운맛',
      two: '2인 이상 주문', twoShort: '2인', rice: '공기밥 · 반찬 포함',
      details: '자세히', korean: '한국', home: '처음으로',
      order: '주문하실 때 직원에게 <b>{n}</b>번이라고 말씀해 주세요.',
      allergens: '알레르기 정보는 요청 시 제공됩니다.',
      none: '조건에 맞는 메뉴가 없습니다. 직원에게 문의해 주세요. 일부 메뉴는 조정이 가능할 수 있습니다.',
      infoHoursT: '영업시간', infoHours: '화요일 ~ 토요일<br>점심 12:00 – 14:00 · 저녁 19:00 – 22:00<br>일요일 · 월요일 휴무',
      infoRiceT: '공기밥 · 반찬', infoRice: '식사에는 함께 나눠 드시는 반찬이 제공됩니다. 공기밥 추가: 3€.',
      infoAllergT: '알레르기', infoAllerg: '알레르기 정보표는 요청 시 보여 드립니다. 편하게 직원에게 문의해 주세요.',
      infoTakeT: '포장 주문', infoTake: '전화 포장 주문: {phone}<br>{address}',
      welcomeHours: '화~토 영업 · 12:00 – 14:00 · 19:00 – 22:00'
    }
  };

  var ALLERGENS = ['gluten', 'crustaceans', 'eggs', 'fish', 'peanuts', 'soy', 'milk', 'nuts', 'celery', 'mustard', 'sesame', 'sulphites', 'lupin', 'molluscs'];
  var AL_NAMES = {
    fr: { gluten: 'Gluten (blé)', crustaceans: 'Crustacés (crevettes…)', eggs: 'Œufs', fish: 'Poissons', peanuts: 'Arachides', soy: 'Soja', milk: 'Lait', nuts: 'Fruits à coque', celery: 'Céleri', mustard: 'Moutarde', sesame: 'Sésame', sulphites: 'Sulfites', lupin: 'Lupin', molluscs: 'Mollusques (seiche, calamar…)' },
    en: { gluten: 'Gluten (wheat)', crustaceans: 'Crustaceans (shrimp…)', eggs: 'Eggs', fish: 'Fish', peanuts: 'Peanuts', soy: 'Soy', milk: 'Milk', nuts: 'Tree nuts', celery: 'Celery', mustard: 'Mustard', sesame: 'Sesame', sulphites: 'Sulphites', lupin: 'Lupin', molluscs: 'Molluscs (squid…)' },
    de: { gluten: 'Gluten (Weizen)', crustaceans: 'Krebstiere (Garnelen…)', eggs: 'Eier', fish: 'Fisch', peanuts: 'Erdnüsse', soy: 'Soja', milk: 'Milch', nuts: 'Schalenfrüchte', celery: 'Sellerie', mustard: 'Senf', sesame: 'Sesam', sulphites: 'Sulfite', lupin: 'Lupinen', molluscs: 'Weichtiere (Tintenfisch…)' },
    ko: { gluten: '글루텐 (밀)', crustaceans: '갑각류 (새우 등)', eggs: '달걀', fish: '생선', peanuts: '땅콩', soy: '대두 (콩)', milk: '우유', nuts: '견과류', celery: '셀러리', mustard: '겨자', sesame: '참깨', sulphites: '아황산염', lupin: '루핀', molluscs: '연체류 (오징어 등)' }
  };
  function alName(k) { return (AL_NAMES[state.lang] || AL_NAMES.fr)[k]; }

  /* ------------------------------------------------------------------ */
  /* Icons (inline SVG)                                                 */
  /* ------------------------------------------------------------------ */
  var ICONS = {
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    dumpling: '<path d="M3 15c0-5 4-9 9-9s9 4 9 9H3z"/><path d="M8 7.5c.5 1 .5 2 0 3M12 6c.5 1.2.5 2.5 0 3.7M16 7.5c.5 1 .5 2 0 3"/><path d="M3 15h18"/>',
    bowl: '<path d="M3 11h18a9 9 0 01-18 0z"/><path d="M9 20h6"/><path d="M14 3l5 6M17 3l3 5"/>',
    fire: '<path d="M12 3c1 3 5 5 5 10a5 5 0 01-10 0c0-2 1-3.5 2-4.5 0 1.5.5 2.5 1.5 3 0-3 .5-6 1.5-8.5z"/><path d="M4 21h16"/>',
    stone: '<path d="M4 10h16l-1.5 8a3 3 0 01-3 2.5h-7a3 3 0 01-3-2.5z"/><path d="M8 10c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5"/><circle cx="12" cy="6" r="1.4"/>',
    pot: '<path d="M4 9h16v6a5 5 0 01-5 5H9a5 5 0 01-5-5z"/><path d="M2 11h2M20 11h2M9 5c0-1 1-1 1-2M13 5c0-1 1-1 1-2"/>',
    glass: '<path d="M7 3h10l-1 8a4 4 0 01-8 0z"/><path d="M12 15v6M8.5 21h7"/>',
    cup: '<path d="M4 8h13v5a6 6 0 01-6 6h-1a6 6 0 01-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 010 5H17"/><path d="M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.star) + '</svg>';
  }
  var SVG_CHILI = '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="ic-chili" d="M15.5 6.2c2.6.6 4.4 2.9 4 5.7-.6 4.9-6.3 9.4-13.3 9.6-2 .1-3.4-.7-2.8-1.3 4-1.3 7-4.4 8.1-8.6.6-2.3 1.7-4.8 4-5.4z"/><path d="M15 6.5c0-1.6.8-3 2.5-3.8" stroke="#4f7a3a" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
  var SVG_LEAF = '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="ic-leaf" d="M20 4C10 4 4 9 4 16c0 1.4.3 2.6.8 3.6C7 13 11 10 15 8.5 11.5 11 8.6 14.6 6.6 20.4 8 21 9.5 21 11 21c6 0 9-6 9-17z"/></svg>';
  var SVG_TWO = '<svg viewBox="0 0 24 24" aria-hidden="true"><g class="ic-two"><circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="8" r="3"/><path d="M2.5 20c0-3.3 2.5-6 5.5-6s5.5 2.7 5.5 6M11.5 15c1.2-.7 2.9-1 4-.9 3 0 5.5 2.6 5.5 5.9"/></g></svg>';
  var SVG_RICE = '<svg viewBox="0 0 24 24" aria-hidden="true"><g class="ic-rice"><path d="M3 12h18a9 8 0 01-18 0z"/><path d="M6 12c0-3 2.7-5 6-5s6 2 6 5"/><path d="M9 21h6"/></g></svg>';

  /* ------------------------------------------------------------------ */
  /* State & helpers                                                    */
  /* ------------------------------------------------------------------ */
  var state = { lang: 'fr', filter: { veg: false, notSpicy: false, spicy: false }, allergens: {} };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function tr(obj) {
    if (!obj) return null;
    return obj[state.lang] || obj.fr || obj.en;
  }
  function ui(key) { return UI[state.lang][key] || UI.fr[key] || ''; }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* 15.9 -> "15,90 €" (fr/de) | "€15.90" (en) | "15.90€" (ko); also handles "5 / 17,50" */
  function fmtOne(n) {
    var hasCents = Math.round(n * 100) % 100 !== 0;
    var euros = Math.floor(n);
    var cents = ('0' + Math.round((n - euros) * 100)).slice(-2);
    if (state.lang === 'en') return '€' + euros + (hasCents ? '.' + cents : '');
    if (state.lang === 'ko') return euros + (hasCents ? '.' + cents : '') + '€';
    return euros + (hasCents ? ',' + cents : '') + ' €';
  }
  function fmtPrice(p) {
    if (typeof p === 'number') return fmtOne(p);
    return String(p).split('/').map(function (part) {
      return fmtOne(parseFloat(part.trim().replace(',', '.')));
    }).join(' / ');
  }

  function priceHtml(d) {
    return fmtPrice(d.price) + (d.two ? '<span class="per">' + esc(ui('perPerson')) + '</span>' : '');
  }
  function activeAllergens() { return ALLERGENS.filter(function (k) { return state.allergens[k]; }); }

  function imgUrl(name) { return 'img/dishes/' + name + '.jpg'; }

  /* ------------------------------------------------------------------ */
  /* Rendering                                                          */
  /* ------------------------------------------------------------------ */
  function renderNav() {
    var html = DATA.categories.map(function (c) {
      return '<button class="nav-btn" data-target="sec-' + c.id + '">' + icon(c.icon) + '<span>' + esc(tr(c.t).title) + '</span></button>';
    }).join('');
    html += '<button class="nav-btn" data-target="info">' + icon('info') + '<span>Infos</span></button>';
    $('#nav').innerHTML = html;

    $('#side-langs').innerHTML = LANGS.map(function (l) {
      return '<button class="side-lang' + (l === state.lang ? ' is-active' : '') + '" data-lang="' + l + '" aria-label="' + LANG_LABEL[l] + '">' +
        '<span class="flag flag--sm flag--' + l + '"></span><span class="lbl">' + l.toUpperCase() + '</span></button>';
    }).join('');
  }

  function renderToolbar() {
    var nAl = activeAllergens().length;
    $('#filters').innerHTML =
      '<button class="chip' + (state.filter.veg ? ' is-on' : '') + '" data-filter="veg">' + SVG_LEAF + esc(ui('veg')) + '</button>' +
      '<button class="chip' + (state.filter.spicy ? ' is-on' : '') + '" data-filter="spicy">' + SVG_CHILI + esc(ui('spicyOnly')) + '</button>' +
      '<button class="chip' + (state.filter.notSpicy ? ' is-on' : '') + '" data-filter="notSpicy">' + esc(ui('notSpicy')) + '</button>' +
      '<button class="chip chip--al' + (nAl ? ' is-on' : '') + '" id="al-open">' + esc(ui('allergens_btn')) + (nAl ? ' <span class="chip__count">' + nAl + '</span>' : '') + '</button>';
    $('#legend').innerHTML =
      '<span>' + SVG_CHILI + esc(ui('spicy')) + '</span>' +
      '<span>' + SVG_LEAF + esc(ui('veg')) + '</span>' +
      '<span>' + SVG_TWO + esc(ui('two')) + '</span>' +
      '<span>' + SVG_RICE + esc(ui('rice')) + '</span>';
  }

  function tagsHtml(d, withText) {
    var out = '';
    if (d.spicy) out += '<span class="tag">' + SVG_CHILI + (d.spicy > 1 ? SVG_CHILI : '') + (withText ? esc(d.spicy > 1 ? ui('spicy') : ui('slightly')) : '') + '</span>';
    if (d.veg) out += '<span class="tag">' + SVG_LEAF + (withText ? esc(ui('veg')) : '') + '</span>';
    if (d.two) out += '<span class="tag">' + SVG_TWO + (withText ? esc(ui('two')) : '') + '</span>';
    if (withText && d.rice) out += '<span class="tag">' + SVG_RICE + esc(ui('rice')) + '</span>';
    return out;
  }

  function cardHtml(d) {
    var t = tr(d.t);
    var img = d.img ? '<div class="card__img" style="background-image:url(\'' + imgUrl(d.img) + '\')">'
                    : '<div class="card__img card__img--none">';
    return '<button class="card" data-dish="' + d.id + '">' +
      img + '<span class="num">' + esc(d.num) + '</span><span class="card__tags">' + tagsHtml(d, false) + '</span></div>' +
      '<div class="card__body">' +
        '<div class="card__name">' + esc(d.name) + ' <span class="card__ko" lang="ko">' + esc(d.ko) + '</span></div>' +
        '<div class="card__title">' + esc(d._cat.showDesc ? t.title + ' — ' + t.desc : t.title) + '</div>' +
        '<div class="card__foot"><span class="price">' + priceHtml(d) + '</span>' +
        (d.rice ? '<span class="more">' + SVG_RICE + '</span>' : '<span class="more"></span>') + '</div>' +
      '</div></button>';
  }

  function drinkHtml(d) {
    var t = tr(d.t);
    return '<div class="drink"><div class="drink__main">' +
      '<span class="drink__title">' + esc(t.title) + '</span>' +
      (d.size ? '<span class="drink__size">' + esc(d.size) + '</span>' : '') +
      (d.korean ? '<span class="k-badge">' + esc(ui('korean')) + '</span>' : '') +
      (t.desc ? '<div class="drink__desc">' + esc(t.desc) + '</div>' : '') +
      '</div><span class="price">' + fmtPrice(d.price) + '</span></div>';
  }

  function matches(d) {
    if (state.filter.veg && !d.veg) return false;
    if (state.filter.notSpicy && d.spicy) return false;
    if (state.filter.spicy && !d.spicy) return false;
    var al = d.al || [];
    for (var i = 0; i < al.length; i++) if (state.allergens[al[i]]) return false;
    return true;
  }

  function renderSections() {
    var filtering = state.filter.veg || state.filter.notSpicy || state.filter.spicy;
    var html = DATA.categories.map(function (c) {
      var t = tr(c.t);
      var body;
      if (c.drinks) {
        if (filtering) return '';
        body = '<div class="drinks">' + c.items.map(drinkHtml).join('') + '</div>';
      } else {
        var items = c.items.filter(matches);
        if (!items.length) return '';
        body = '<div class="grid">' + items.map(cardHtml).join('') + '</div>';
      }
      return '<section class="section" id="sec-' + c.id + '">' +
        '<h2 class="section__title">' + esc(t.title) + '</h2>' +
        (t.sub ? '<p class="section__sub">' + esc(t.sub) + '</p>' : '') +
        (c.intro ? '<p class="section__intro">' + esc(tr(c.intro)) + '</p>' : '') +
        body +
        (c.note ? '<p class="section__note">' + esc(tr(c.note)) + '</p>' : '') +
        '<div class="divider"></div></section>';
    }).join('');
    if (!html) html = '<p class="section section__sub">' + esc(ui('none')) + '</p>';
    $('#sections').innerHTML = html;

    var act = activeAllergens();
    $('#banner').innerHTML = act.length
      ? '<div class="banner"><span>' + esc(ui('alHidden')) + ' <b>' + act.map(function (k) { return esc(alName(k)); }).join(', ') + '</b>. ' + esc(ui('alWarn')) + '</span>' +
        '<button id="al-reset">' + esc(ui('alReset')) + '</button></div>'
      : '';

    // hide nav entries whose section is filtered out
    $$('.nav-btn').forEach(function (b) {
      var id = b.getAttribute('data-target');
      b.hidden = id !== 'info' && !document.getElementById(id);
    });
  }

  function renderInfo() {
    function sub(s) { return s.replace('{phone}', esc(DATA.phone)).replace('{address}', esc(DATA.address)); }
    $('#info').innerHTML = '<div class="info__grid">' +
      '<div><h3>' + esc(ui('infoHoursT')) + '</h3><p>' + ui('infoHours') + '</p></div>' +
      '<div><h3>' + esc(ui('infoRiceT')) + '</h3><p>' + esc(ui('infoRice')) + '</p></div>' +
      '<div><h3>' + esc(ui('infoAllergT')) + '</h3><p>' + esc(ui('infoAllerg')) + '</p></div>' +
      '<div><h3>' + esc(ui('infoTakeT')) + '</h3><p>' + sub(ui('infoTake')) + '</p></div>' +
      '</div><img class="info__crane" src="img/brand/crane-cream.png" alt="">';
  }

  function renderAll() {
    document.documentElement.lang = state.lang;
    renderNav();
    renderToolbar();
    renderSections();
    renderInfo();
    updateActiveNav();
  }

  /* ------------------------------------------------------------------ */
  /* Dish detail                                                        */
  /* ------------------------------------------------------------------ */
  var dishIndex = {};
  DATA.categories.forEach(function (c) { c.items.forEach(function (d) { d._cat = c; dishIndex[d.id] = d; }); });

  function openDish(id) {
    var d = dishIndex[id];
    if (!d) return;
    var t = tr(d.t);
    var cat = tr(d._cat.t);
    var imgEl = $('#modal-img');
    if (d.img) { imgEl.style.backgroundImage = "url('" + imgUrl(d.img) + "')"; imgEl.hidden = false; }
    else imgEl.hidden = true;
    $('#modal-body').innerHTML =
      '<div class="m-num"><span class="num">' + esc(d.num) + '</span>' + esc(cat.title) + '</div>' +
      '<h2 class="m-name">' + esc(d.name) + '</h2>' +
      '<div class="m-ko" lang="ko">' + esc(d.ko) + '</div>' +
      '<div class="m-title">' + esc(t.title) + '</div>' +
      '<p class="m-desc">' + esc(t.desc) + '</p>' +
      '<div class="m-tags">' + tagsHtml(d, true) + '</div>' +
      '<div class="price m-price">' + priceHtml(d) + '</div>' +
      (d.al && d.al.length ? '<div class="m-al"><b>' + esc(ui('alDish')) + '</b>' + d.al.map(function (k) { return '<span class="al-tag">' + esc(alName(k)) + '</span>'; }).join('') + '</div>' : '') +
      '<div class="m-order"><div><span class="num">' + esc(d.num) + '</span><span>' + ui('order').replace('{n}', esc(d.num)) + '</span></div>' +
      '<p class="m-allerg">' + esc(ui('allergens')) + '</p></div>';
    $('#modal').hidden = false;
  }
  function closeDish() { $('#modal').hidden = true; }

  function renderAllergenPanel() {
    $('#al-title').textContent = ui('alTitle');
    $('#al-sub').textContent = ui('alSub');
    $('#al-warn').textContent = ui('alWarn');
    $('#al-clear').textContent = ui('alClear');
    $('#al-ok').textContent = ui('alOk');
    $('#al-grid').innerHTML = ALLERGENS.map(function (k) {
      return '<button class="al-btn' + (state.allergens[k] ? ' is-on' : '') + '" data-al="' + k + '"><span class="box">' + (state.allergens[k] ? '✓' : '') + '</span>' + esc(alName(k)) + '</button>';
    }).join('');
  }
  function openAllergens() { renderAllergenPanel(); $('#allergen-panel').hidden = false; }
  function closeAllergens() {
    $('#allergen-panel').hidden = true;
    renderToolbar(); renderSections(); updateActiveNav();
  }

  /* ------------------------------------------------------------------ */
  /* Navigation & scroll spy                                            */
  /* ------------------------------------------------------------------ */
  function scrollToSection(id) {
    var el = document.getElementById(id);
    var main = $('#main');
    if (!el) return;
    var top = el.offsetTop - ($('#toolbar').offsetHeight || 0) + 4;
    if (id === 'info') top = el.offsetTop;
    if (main.scrollTo) main.scrollTo({ top: top, behavior: 'smooth' }); else main.scrollTop = top;
  }

  function updateActiveNav() {
    var main = $('#main');
    var probe = main.scrollTop + ($('#toolbar').offsetHeight || 0) + 40;
    var current = null;
    $$('.section, #info').forEach(function (s) { if (s.id && s.offsetTop <= probe) current = s.id; });
    if (main.scrollTop + main.clientHeight >= main.scrollHeight - 4) current = 'info';
    $$('.nav-btn').forEach(function (b) {
      var on = b.getAttribute('data-target') === current;
      if (on && !b.classList.contains('is-active') && b.scrollIntoView && window.matchMedia('(orientation: portrait), (max-width: 900px)').matches) {
        b.scrollIntoView({ inline: 'center', block: 'nearest' });
      }
      b.classList.toggle('is-active', on);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Welcome screen & idle reset                                        */
  /* ------------------------------------------------------------------ */
  function start(lang) {
    state.lang = LANGS.indexOf(lang) >= 0 ? lang : 'fr';
    state.filter.veg = state.filter.notSpicy = state.filter.spicy = false;
    state.allergens = {};
    renderAll();
    $('#app').hidden = false;
    $('#main').scrollTop = 0;
    var w = $('#welcome');
    w.classList.add('is-leaving');
    setTimeout(function () { w.hidden = true; w.classList.remove('is-leaving'); updateActiveNav(); }, 450);
  }

  function goHome() {
    closeDish();
    $('#allergen-panel').hidden = true;
    $('#welcome').hidden = false;
    $('#main').scrollTop = 0;
  }

  var idleTimer = null;
  function resetIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { if ($('#welcome').hidden) goHome(); }, IDLE_SECONDS * 1000);
  }

  /* ------------------------------------------------------------------ */
  /* Events                                                             */
  /* ------------------------------------------------------------------ */
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('button, [data-close], [data-close-al]') : null;
    if (!el) return;
    if (el.hasAttribute('data-close')) { closeDish(); return; }
    if (el.hasAttribute('data-close-al')) { closeAllergens(); return; }
    if (el.id === 'al-open') { openAllergens(); return; }
    if (el.id === 'al-clear') { state.allergens = {}; renderAllergenPanel(); return; }
    if (el.id === 'al-reset') { state.allergens = {}; renderToolbar(); renderSections(); updateActiveNav(); return; }
    if (el.classList.contains('al-btn')) {
      var k = el.getAttribute('data-al');
      state.allergens[k] = !state.allergens[k];
      renderAllergenPanel();
      return;
    }
    if (el.classList.contains('lang-btn')) { start(el.getAttribute('data-lang')); return; }
    if (el.classList.contains('side-lang')) {
      var y = $('#main').scrollTop;
      state.lang = el.getAttribute('data-lang');
      renderAll();
      $('#main').scrollTop = y;
      return;
    }
    if (el.id === 'home-btn') { goHome(); return; }
    if (el.classList.contains('nav-btn')) { scrollToSection(el.getAttribute('data-target')); return; }
    if (el.classList.contains('chip')) {
      var f = el.getAttribute('data-filter');
      state.filter[f] = !state.filter[f];
      if (f === 'spicy' && state.filter.spicy) state.filter.notSpicy = false;
      if (f === 'notSpicy' && state.filter.notSpicy) state.filter.spicy = false;
      renderToolbar(); renderSections(); updateActiveNav();
      return;
    }
    if (el.classList.contains('card')) { openDish(el.getAttribute('data-dish')); }
  });

  $('#main').addEventListener('scroll', function () {
    if (this._raf) return;
    var self = this;
    self._raf = requestAnimationFrame(function () { self._raf = null; updateActiveNav(); });
  }, { passive: true });

  ['touchstart', 'pointerdown', 'scroll', 'keydown'].forEach(function (ev) {
    document.addEventListener(ev, resetIdle, { passive: true, capture: true });
  });

  document.addEventListener('contextmenu', function (e) { e.preventDefault(); });

  // Android back button (called by the native wrapper)
  window.handleBack = function () {
    if (!$('#modal').hidden) { closeDish(); return true; }
    if (!$('#allergen-panel').hidden) { closeAllergens(); return true; }
    if ($('#welcome').hidden) { goHome(); return true; }
    return true; // never leave the app from the welcome screen
  };

  /* ------------------------------------------------------------------ */
  /* Boot                                                               */
  /* ------------------------------------------------------------------ */
  $('#welcome-hours').textContent = UI.fr.welcomeHours;
  resetIdle();

  // Pre-load photos so they show instantly
  setTimeout(function () {
    Object.keys(dishIndex).forEach(function (k) { if (dishIndex[k].img) { var i = new Image(); i.src = imgUrl(dishIndex[k].img); } });
  }, 800);

  // Offline cache when served over http(s) (PWA install). Not used inside the Android app.
  if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(function (reg) {
      if (reg.update) reg.update();
    }).catch(function () {});
    // when a new version of the app takes over, reload once to show it
    var reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (reloaded) return;
      reloaded = true;
      location.reload();
    });
  }
})();
