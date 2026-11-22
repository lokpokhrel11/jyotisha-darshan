// Run: node tests/chapter8-house-counting.test.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const app = fs.readFileSync('app.js','utf8');
const html = fs.readFileSync('index.html','utf8');
const house = (base, count) => ((base + count - 2) % 12) + 1;
for (let base = 1; base <= 12; base++) {
 for (let count = 1; count <= 12; count++) {
  const result = house(base, count);
  assert(result >= 1 && result <= 12);
  assert.equal(result, ((base - 1 + count - 1) % 12) + 1);
  if (count === 1) assert.equal(result, base);
  if (count === 12) assert.equal(result, base === 1 ? 12 : base - 1);
 }
}
assert.equal(house(4,3),6, 'Maternal uncle');
assert.equal(house(7,2),8, 'Spouse family');
assert.equal(house(5,5),9, 'Grandchild');
assert.equal(house(4,9),12, 'Sun in fourth, ninth from Sun');
assert.equal(house(7,4),10, 'Spouse mother');
assert.equal(house(11,4),2, 'Wrap-around example');
assert.equal(house(6,3),8, 'Third from Mars in sixth');
assert(app.includes('((a+b-2)%12)+1'), 'Main calculator formula changed');
assert(app.includes('((a+n-2)%12)+1'), 'Sibling calculator formula changed');
for (const key of ['mother:[4,3]','spouse:[7,2]','grandchild:[5,5]','father:[4,9]']) {
 assert(app.includes(key), 'Missing or changed example: ' + key);
}
for (const id of ['ch8Base','ch8Steps','ch8Result','ch8Quiz','ch8SiblingResult']) {
 assert(html.includes('id="'+id+'"'), 'Missing UI element: ' + id);
}
console.log('Chapter 8: 144 counting cases and seven worked examples passed.');
