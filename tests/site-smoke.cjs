// Static structural checks for the Jyotish Darshan learning site.
// Run: node tests/site-smoke.cjs
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
const seen = new Set();
for (const id of ids) {
  assert(!seen.has(id), 'Duplicate HTML id: ' + id);
  seen.add(id);
}
const cards = [...html.matchAll(/class="[^"]*\bchapter-card\b[^"]*"[^>]*data-chapter="(\d+)"/g)]
  .map(match => Number(match[1])).sort((a, b) => a - b);
assert.deepEqual(cards, Array.from({length: 13}, (_, i) => i + 1), 'Expected one chapter card per chapter');
const block = js.match(/const exams=\[([\s\S]*?)\];/);
assert(block, 'Assessment dashboard configuration missing');
const entries = [...block[1].matchAll(/\{chapter:(\d+),[^}]*?total:(\d+),threshold:(\d+),anchor:'([^']+)'/g)];
assert.equal(entries.length, 13, 'Expected exactly 13 assessment definitions');
for (const [_, ch, total, target, anchor] of entries) {
  assert(seen.has(anchor), 'Missing assessment target for chapter ' + ch + ': #' + anchor);
  assert(Number(total) > 0 && Number(target) > 0 && Number(target) <= Number(total),
    'Invalid assessment total/target in chapter ' + ch);
  const storage = Number(ch) === 1 ? 'jd-chapter1-v05' : 'jyotisha-chapter' + ch + '-score';
  assert(js.includes(storage), 'Missing saved-score key for chapter ' + ch);
}
assert.deepEqual(entries.map(e => Number(e[1])), Array.from({length: 13}, (_, i) => i + 1),
  'Assessment chapters are missing or out of order');
assert(html.includes('app.js?v='), 'Versioned application script reference missing');

const chapter7 = entries.find(e => Number(e[1]) === 7);
assert.equal(Number(chapter7[2]), 8, 'Chapter 7 dashboard must reflect all eight questions');
const chapter7Bank = js.match(/\/\* v4\.2: Chapter 7[\s\S]*?const questions=\[([\s\S]*?)\];/);
assert(chapter7Bank, 'Chapter 7 question bank missing');
assert.equal([...chapter7Bank[1].matchAll(/\{q:/g)].length, 8, 'Chapter 7 bank size changed');
const chapter8 = entries.find(e => Number(e[1]) === 8);
assert.equal(Number(chapter8[2]), 8, 'Chapter 8 dashboard must reflect eight questions');
const chapter8Bank = js.match(/\/\* Chapter 8[\s\S]*?const questions=\[([\s\S]*?)\];/);
assert(chapter8Bank, 'Chapter 8 question bank missing');
assert.equal([...chapter8Bank[1].matchAll(/\{q:/g)].length, 8, 'Chapter 8 bank size changed');
const ch8Change = js.match(/form\.addEventListener\('change',e=>\{if\(!e\.target\.matches\('input\[type="radio"\]'\)\)[\s\S]*?\}\);/);
assert(ch8Change && ch8Change[0].includes("localStorage.removeItem('jyotisha-chapter8-score')"),
  'Chapter 8 must invalidate saved results when answers change');

console.log('PASS: 13 chapter cards, 13 assessment targets, unique HTML IDs, valid score configuration.');
