/* JALMOGOYO – when a menu section is shown (e.g. lunch menus).
 *
 * A category in menu-data.js can carry:
 *   onlyAt: { days: [2,3,4,5], until: '14:30', noHolidays: true }
 *     days        days of the week it is shown (0 = Sunday, 1 = Monday … 6 = Saturday)
 *     from/until  time window "HH:MM" (tablet's local time), both optional
 *     noHolidays  hidden on French public holidays (Alsace-Moselle calendar)
 *
 * MENU_DATA.closedDays: extra dates ("YYYY-MM-DD") treated like public holidays
 * (bridge day, exceptional closure…).
 */
(function () {
  'use strict';

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function key(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }

  // Easter Sunday (Gregorian calendar, Meeus/Jones/Butcher algorithm)
  function easter(y) {
    var a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4,
        f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3),
        h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4,
        l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451),
        month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(y, month - 1, day);
  }
  function plus(date, days) { return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days); }

  var cache = {};
  // French public holidays + the two extra ones of Alsace-Moselle (Good Friday, 26 December)
  function holidays(y) {
    if (cache[y]) return cache[y];
    var e = easter(y), list = {};
    [
      [new Date(y, 0, 1), "Jour de l'an"],
      [plus(e, -2), 'Vendredi saint'],
      [plus(e, 1), 'Lundi de Pâques'],
      [new Date(y, 4, 1), 'Fête du Travail'],
      [new Date(y, 4, 8), 'Victoire 1945'],
      [plus(e, 39), 'Ascension'],
      [plus(e, 50), 'Lundi de Pentecôte'],
      [new Date(y, 6, 14), 'Fête nationale'],
      [new Date(y, 7, 15), 'Assomption'],
      [new Date(y, 10, 1), 'Toussaint'],
      [new Date(y, 10, 11), 'Armistice'],
      [new Date(y, 11, 25), 'Noël'],
      [new Date(y, 11, 26), 'Saint-Étienne']
    ].forEach(function (h) { list[key(h[0])] = h[1]; });
    return (cache[y] = list);
  }

  function isHoliday(date, closedDays) {
    var k = key(date);
    return !!holidays(date.getFullYear())[k] || (closedDays || []).indexOf(k) >= 0;
  }

  function minutes(hhmm) { var p = String(hhmm).split(':'); return (+p[0]) * 60 + (+p[1] || 0); }

  function isShown(rule, date, closedDays) {
    if (!rule) return true;
    date = date || new Date();
    if (rule.days && rule.days.indexOf(date.getDay()) < 0) return false;
    if (rule.noHolidays && isHoliday(date, closedDays)) return false;
    var now = date.getHours() * 60 + date.getMinutes();
    if (rule.from && now < minutes(rule.from)) return false;
    if (rule.until && now >= minutes(rule.until)) return false;
    return true;
  }

  window.MENU_SCHEDULE = { isShown: isShown, isHoliday: isHoliday, holidays: holidays, key: key };
})();
