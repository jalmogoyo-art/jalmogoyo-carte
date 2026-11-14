#!/usr/bin/env node
/* Stamps www/ with a build number before publication:
 *   - js/version.js + version.json : how a tablet knows a newer menu is online
 *   - sw.js                        : list of every file to keep for offline use
 * Usage: node tools/stamp.js <build-number>
 */
const fs = require('fs');
const path = require('path');

const build = String(process.argv[2] || 'dev');
const www = path.join(__dirname, '..', 'www');
const date = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
const info = { build, date };

function walk(dir, base) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const rel = base ? base + '/' + e.name : e.name;
    return e.isDirectory() ? walk(path.join(dir, e.name), rel) : [rel];
  });
}

fs.writeFileSync(path.join(www, 'version.json'), JSON.stringify(info) + '\n');
fs.writeFileSync(path.join(www, 'js', 'version.js'),
  '/* Replaced automatically at each publication (tools/stamp.js). */\n' +
  'window.APP_VERSION = ' + JSON.stringify(info) + ';\n');

const skip = new Set(['sw.js', 'version.json', 'install.html', 'kiosque.html']);
const files = walk(www, '').filter((f) => !skip.has(f) && !f.startsWith('img/install/')).sort();
const swPath = path.join(www, 'sw.js');
let sw = fs.readFileSync(swPath, 'utf8');
const before = sw;
sw = sw.replace(/var CACHE = '[^']*';/, "var CACHE = 'jalmogoyo-menu-" + build + "';");
sw = sw.replace(/var FILES = \[[\s\S]*?\];/, 'var FILES = ' + JSON.stringify(files, null, 2) + ';');
if (sw === before && build !== 'dev') throw new Error('sw.js: CACHE / FILES markers not found');
fs.writeFileSync(swPath, sw);

console.log('Stamped build ' + build + ' (' + files.length + ' files for offline use)');
