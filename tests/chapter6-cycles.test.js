// Run: node tests/chapter6-cycles.test.js
// Regression tests execute Chapter 6 functions extracted from the deployed app.js.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('app.js', 'utf8');
function extract(start, end) {
  const a = source.indexOf(start);
  const b = source.indexOf(end, a + start.length);
  assert(a >= 0 && b > a, 'Missing application segment: ' + start);
  return source.slice(a, b);
}
const planets = [
  ['ketu', 7], ['venus', 20], ['sun', 6], ['moon', 10],
  ['mars', 7], ['rahu', 18], ['jupiter', 16], ['saturn', 19], ['mercury', 17]
];
const elements = {};
function el(tag = 'div') {
  return {
    tag, children: [], textContent: '', value: '',
    append(...children) { this.children.push(...children); },
    replaceChildren(...children) { this.children = children; },
    addEventListener() {}
  };
}
for (const id of ['triLord', 'triOutput', 'triCalculate', 'ygNak']) elements[id] = el();
const ctx = vm.createContext({
  $: id => elements[id],
  document: { createElement: el }
});
vm.runInContext(extract('const cyclePlanets=', '// Chapter 6: 27 nakshatras'), ctx);
vm.runInContext(extract('function renderTribhagi()', '// Chapter 6.4:'), ctx);
const readRows = () => elements.triOutput.children[1].children.slice(1)
  .map(row => row.children.map(cell => cell.textContent));
function months(label) {
  const m = /^(\\d+) वर्ष (\\d+) महिना$/.exec(label);
  assert(m, 'Unexpected period format: ' + label);
  return Number(m[1]) * 12 + Number(m[2]);
}
for (let start = 0; start < planets.length; start++) {
  elements.triLord.value = planets[start][0];
  vm.runInContext('renderTribhagi()', ctx);
  const rows = readRows();
  assert.equal(rows.length, 9);
  let cumulative = 0;
  for (let i = 0; i < 9; i++) {
    const expected = planets[(start + i) % 9][1] * 8;
    cumulative += expected;
    assert.equal(months(rows[i][1]), expected);
    assert.equal(months(rows[i][2]), cumulative);
  }
  assert.equal(cumulative, 960, 'Tribhagi must total 80 years');
  assert.match(elements.triOutput.children[0].textContent, /८० वर्ष/);
}
elements.triLord.value = 'invalid';
vm.runInContext('renderTribhagi()', ctx);
assert.match(elements.triOutput.textContent, /मान्य ग्रह/);

vm.runInContext(extract('const yoginis=', 'function yoginiCycle()'), ctx);
const yoginiYears = [1, 2, 3, 4, 5, 6, 7, 8];
for (let n = 1; n <= 27; n++) {
  elements.ygNak.value = String(n);
  const result = vm.runInContext('yoginiSelection()', ctx);
  assert.equal(result.n, n);
  assert.equal(result.index, (n + 2) % 8);
  let sum = 0;
  for (let i = 0; i < 8; i++) sum += yoginiYears[(result.index + i) % 8];
  assert.equal(sum, 36);
}
elements.ygNak.value = '4';
assert.equal(vm.runInContext('yoginiSelection().index', ctx), 6, 'Rohini selects Siddha');
for (const invalid of ['0', '28', '1.5', 'abc', '']) {
  elements.ygNak.value = invalid;
  assert.equal(vm.runInContext('yoginiSelection()', ctx), null, 'Invalid nakshatra: ' + invalid);
}
console.log('Chapter 6 cycle checks passed: 9 Tribhagi starts, 27 Yogini selections, boundaries.');
