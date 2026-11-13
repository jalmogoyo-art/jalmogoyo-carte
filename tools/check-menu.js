#!/usr/bin/env node
/* Safety net run before every publication: if the menu file is broken
 * (typo, missing price, missing photo…) nothing is published and the
 * tablets keep the previous version.
 * Usage: node tools/check-menu.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const www = path.join(__dirname, '..', 'www');
const LANGS = ['fr', 'en', 'de', 'ko'];
const ALLERGENS = ['gluten', 'crustaceans', 'eggs', 'fish', 'peanuts', 'soy', 'milk', 'nuts', 'celery', 'mustard', 'sesame', 'sulphites', 'lupin', 'molluscs'];
const errors = [];
const err = (where, msg) => errors.push(where + ': ' + msg);

// 1. every script must at least be valid JavaScript
for (const f of ['js/menu-data.js', 'js/schedule.js', 'js/app.js', 'js/version.js', 'sw.js']) {
  try { new vm.Script(fs.readFileSync(path.join(www, f), 'utf8'), { filename: f }); }
  catch (e) { err(f, 'erreur de syntaxe — ' + e.message); }
}

// 2. menu content
let data = null;
try {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(www, 'js/menu-data.js'), 'utf8'), sandbox);
  data = sandbox.window.MENU_DATA;
} catch (e) { /* already reported above */ }

function checkPrice(where, p) {
  const parts = typeof p === 'number' ? [p] : String(p == null ? '' : p).split('/').map((s) => parseFloat(s.trim().replace(',', '.')));
  if (!parts.length || parts.some((n) => !(n > 0 && n < 1000))) err(where, 'prix invalide (' + JSON.stringify(p) + ')');
}
function checkTexts(where, t, needTitle) {
  if (!t || typeof t !== 'object') return err(where, 'textes manquants (t)');
  for (const l of LANGS) {
    if (!t[l]) err(where, 'traduction manquante : ' + l);
    else if (needTitle && !String(t[l].title || '').trim()) err(where, 'titre vide : ' + l);
  }
}

if (!data || !Array.isArray(data.categories) || !data.categories.length) {
  err('menu-data.js', 'window.MENU_DATA.categories introuvable');
} else {
  if (!data.phone || !data.address || !data.version) err('menu-data.js', 'version / phone / address manquant');
  const ids = new Set();
  const catIds = new Set();
  for (const c of data.categories) {
    const cw = 'catégorie « ' + c.id + ' »';
    if (!c.id || catIds.has(c.id)) err(cw, 'identifiant manquant ou en double');
    catIds.add(c.id);
    checkTexts(cw, c.t, true);
    if (c.onlyAt) {
      const o = c.onlyAt;
      if (o.days && !(Array.isArray(o.days) && o.days.every((d) => Number.isInteger(d) && d >= 0 && d <= 6))) err(cw, 'onlyAt.days : jours de 0 (dimanche) à 6 (samedi)');
      for (const k of ['from', 'until']) if (o[k] != null && !/^([01]\d|2[0-3]):[0-5]\d$/.test(o[k])) err(cw, 'onlyAt.' + k + ' : heure au format HH:MM');
    }
    if (!Array.isArray(c.items) || !c.items.length) { err(cw, 'aucun plat'); continue; }
    for (const d of c.items) {
      const w = cw + ' › ' + (d.id || '?');
      if (!d.id || ids.has(d.id)) err(w, 'identifiant manquant ou en double');
      ids.add(d.id);
      checkPrice(w, d.price);
      checkTexts(w, d.t, true);
      if (!c.drinks) {
        if (d.num == null || d.num === '') err(w, 'numéro manquant (num)');
        if (!d.name) err(w, 'nom manquant (name)');
        if (d.spicy != null && ![0, 1, 2].includes(d.spicy)) err(w, 'spicy doit valoir 0, 1 ou 2');
        for (const a of d.al || []) if (!ALLERGENS.includes(a)) err(w, 'allergène inconnu : ' + a);
      }
      if (d.img && !fs.existsSync(path.join(www, 'img/dishes', d.img + '.jpg'))) err(w, 'photo introuvable : img/dishes/' + d.img + '.jpg');
    }
  }
}

// 3. closed days + holiday calendar
if (data) {
  if (data.closedDays != null && !(Array.isArray(data.closedDays) && data.closedDays.every((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(new Date(d + 'T12:00:00'))))) {
    err('menu-data.js', 'closedDays : dates au format « AAAA-MM-JJ »');
  }
  try {
    const sb = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(www, 'js/schedule.js'), 'utf8'), sb);
    const S = sb.window.MENU_SCHEDULE;
    // known dates: Easter 2026 = 5 April, Easter 2027 = 28 March
    for (const d of ['2026-04-03', '2026-04-06', '2026-05-14', '2026-05-25', '2026-12-26', '2027-03-26', '2027-05-06'])
      if (!S.isHoliday(new Date(d + 'T12:00:00'))) err('schedule.js', 'jour férié non reconnu : ' + d);
    if (S.isHoliday(new Date('2026-11-13T12:00:00'))) err('schedule.js', 'faux jour férié : 2026-11-13');
  } catch (e) { err('schedule.js', e.message); }
}

if (errors.length) {
  console.error('\n✗ Menu NON publié — ' + errors.length + ' problème(s) :\n');
  for (const e of errors) console.error('  • ' + e);
  console.error('');
  process.exit(1);
}
const n = data.categories.reduce((s, c) => s + c.items.length, 0);
console.log('✓ Menu valide : ' + data.categories.length + ' catégories, ' + n + ' articles.');
